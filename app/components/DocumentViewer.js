'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Loader2 } from 'lucide-react'

const DocumentViewer = React.forwardRef(({ 
  documentFile, 
  zoom = 1,
  onZoomChange,
  className = '',
  onClick,
  children // For field overlays
}, ref) => {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [originalPages, setOriginalPages] = useState([]) // Store original high-quality renders
  
  const containerRef = useRef(null)

  // Load document based on type - render at high quality once
  const loadDocument = useCallback(async () => {
    if (!documentFile) return

    setLoading(true)
    setError(null)

    try {
      if (documentFile.type === 'application/pdf') {
        await loadPdfDocument()
      } else if (documentFile.type.startsWith('image/')) {
        await loadImageDocument()
      } else {
        setError('Unsupported file type')
      }
    } catch (err) {
      console.error('Error loading document:', err)
      setError('Failed to load document')
    } finally {
      setLoading(false)
    }
  }, [documentFile])

  // Load PDF using PDF.js - render at high quality
  const loadPdfDocument = async () => {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      
      const pdf = await pdfjsLib.getDocument(documentFile.data || documentFile.url).promise
      const pagePromises = []
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pagePromises.push(renderPdfPage(pdf, pageNum))
      }
      
      const renderedPages = await Promise.all(pagePromises)
      setOriginalPages(renderedPages)
      setPages(renderedPages)
    } catch (error) {
      throw new Error('Failed to load PDF')
    }
  }

  // Render PDF page to canvas at high quality
  const renderPdfPage = async (pdf, pageNum) => {
    const page = await pdf.getPage(pageNum)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    // Render at high DPI for crisp quality
    const scale = 3.0 // High quality base scale
    const viewport = page.getViewport({ scale })
    
    canvas.width = viewport.width
    canvas.height = viewport.height
    
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise
    
    return {
      pageNumber: pageNum,
      canvas,
      width: viewport.width,
      height: viewport.height,
      originalWidth: viewport.width / scale, // Store original dimensions
      originalHeight: viewport.height / scale
    }
  }

  // Load image document at high quality
  const loadImageDocument = async () => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        // Render at original size for maximum quality
        const scale = 2.0 // High quality scale
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        const pageData = [{
          pageNumber: 1,
          canvas,
          width: canvas.width,
          height: canvas.height,
          originalWidth: img.width,
          originalHeight: img.height
        }]
        
        setOriginalPages(pageData)
        setPages(pageData)
        resolve()
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = documentFile.data || documentFile.url
    })
  }

  useEffect(() => {
    loadDocument()
  }, [loadDocument])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={ref || containerRef}
      className={`document-viewer w-full h-full overflow-auto bg-gray-100 ${className}`}
      onClick={onClick}
      style={{
        scrollBehavior: 'smooth'
      }}
    >
      {pages.map((page) => {
        // Calculate display dimensions to use full available width when zoomed
        const isMobile = window.innerWidth < 768
        
        // Use full available width, accounting for sidebar
        let availableWidth
        if (isMobile) {
          availableWidth = window.innerWidth - 16 // Small margin
        } else {
          availableWidth = window.innerWidth - 320 - 16 // Sidebar + small margin
        }
        
        // Calculate display width based on zoom and available space
        const baseWidth = Math.min(page.originalWidth, availableWidth / zoom)
        const displayWidth = baseWidth * zoom
        const displayHeight = (page.originalHeight / page.originalWidth) * displayWidth
        
        return (
          <div
            key={page.pageNumber}
            data-page-number={page.pageNumber}
            className="relative bg-white shadow-lg mx-auto my-4"
            style={{
              width: displayWidth,
              height: displayHeight,
              maxWidth: 'none' // Allow full width usage
            }}
          >
            {/* Document Canvas */}
            <canvas
              width={page.width}
              height={page.height}
              className="w-full h-full block"
              style={{
                width: '100%',
                height: '100%',
                imageRendering: 'crisp-edges' // Maintain sharpness
              }}
              ref={(canvas) => {
                if (canvas && page.canvas) {
                  const ctx = canvas.getContext('2d')
                  ctx.clearRect(0, 0, canvas.width, canvas.height)
                  ctx.drawImage(page.canvas, 0, 0)
                }
              }}
            />
            
            {/* Field Overlay Container */}
            <div className="absolute inset-0 pointer-events-none">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.props.pageNumber === page.pageNumber) {
                  return React.cloneElement(child, { 
                    containerWidth: displayWidth,
                    containerHeight: displayHeight
                  })
                }
                return null
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
})

DocumentViewer.displayName = 'DocumentViewer'

export default DocumentViewer 