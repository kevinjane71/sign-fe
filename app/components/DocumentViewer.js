'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download, Loader2 } from 'lucide-react'

const DocumentViewer = ({ 
  fileUrl, 
  mimeType, 
  onPageLoad, 
  onDocumentLoad,
  className = '',
  showControls = false, // Default to false for clean view
  zoom = 1,
  onZoomChange,
  onClick,
  children // For field overlays
}) => {
  const [numPages, setNumPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [pages, setPages] = useState([])
  const [pageOffsets, setPageOffsets] = useState([])
  
  const containerRef = useRef(null)
  const pagesContainerRef = useRef(null)
  const pdfDocRef = useRef(null)
  const pageRefs = useRef([])

  const isPDF = mimeType === 'application/pdf' || fileUrl?.toLowerCase().includes('.pdf')
  const isImage = mimeType?.startsWith('image/') || /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileUrl)

  // Load PDF.js dynamically
  const loadPdfJs = useCallback(async () => {
    if (typeof window === 'undefined') return null
    
    try {
      const pdfjsLib = await import('pdfjs-dist')
      
      // Set worker
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.js',
          import.meta.url,
        ).toString()
      }
      
      return pdfjsLib
    } catch (error) {
      console.error('Failed to load PDF.js:', error)
      return null
    }
  }, [])

  // Calculate page offsets for field positioning
  const calculatePageOffsets = useCallback(() => {
    if (pageRefs.current.length === 0) return

    const offsets = []
    let currentOffset = 0

    pageRefs.current.forEach((pageRef, index) => {
      if (pageRef) {
        offsets.push(currentOffset)
        const pageHeight = pageRef.offsetHeight
        currentOffset += pageHeight + 24 // 24px spacing between pages
      }
    })

    setPageOffsets(offsets)
  }, [])

  // Load and render document
  const loadDocument = useCallback(async () => {
    if (!fileUrl) return

    console.log('DocumentViewer: Loading document:', fileUrl, 'mimeType:', mimeType)
    setLoading(true)
    setError(null)
    setPages([])

    try {
      if (isPDF) {
        await loadPdfDocument()
      } else if (isImage) {
        await loadImageDocument()
      } else {
        setError('Unsupported document type')
        setLoading(false)
      }
    } catch (error) {
      console.error('DocumentViewer: Error loading document:', error)
      setError('Failed to load document')
      setLoading(false)
    }
  }, [fileUrl, mimeType, isPDF, isImage])

  // Load PDF document and render all pages
  const loadPdfDocument = async () => {
    const pdfjsLib = await loadPdfJs()
    if (!pdfjsLib) {
      setError('Failed to load PDF library')
      setLoading(false)
      return
    }

    try {
      const loadingTask = pdfjsLib.getDocument(fileUrl)
      const pdf = await loadingTask.promise
      pdfDocRef.current = pdf
      
      setNumPages(pdf.numPages)
      console.log('DocumentViewer: PDF loaded with', pdf.numPages, 'pages')
      
      // Render all pages
      const renderedPages = []
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const pageData = await renderPdfPage(pdf, pageNum)
        renderedPages.push(pageData)
      }
      
      setPages(renderedPages)
      
      if (onDocumentLoad) {
        onDocumentLoad({ numPages: pdf.numPages, fileUrl, mimeType })
      }
      
      setLoading(false)
    } catch (error) {
      console.error('DocumentViewer: PDF loading error:', error)
      setError('Failed to load PDF document')
      setLoading(false)
    }
  }

  // Load image document
  const loadImageDocument = async () => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        setNumPages(1)
        
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        // Calculate dimensions with zoom - increased base scale for better visibility
        const baseScale = 1.8 // Increased from 1.5 for better default size
        const width = img.width * baseScale * zoom
        const height = img.height * baseScale * zoom
        
        canvas.width = width
        canvas.height = height
        
        // Draw image
        if (rotation !== 0) {
          context.save()
          context.translate(width / 2, height / 2)
          context.rotate((rotation * Math.PI) / 180)
          context.drawImage(img, -width / 2, -height / 2, width, height)
          context.restore()
        } else {
          context.drawImage(img, 0, 0, width, height)
        }
        
        const pageData = {
          pageNumber: 1,
          canvas: canvas,
          width: width,
          height: height
        }
        
        setPages([pageData])
        
        if (onDocumentLoad) {
          onDocumentLoad({ numPages: 1, fileUrl, mimeType })
        }
        
        if (onPageLoad) {
          onPageLoad({
            pageNumber: 1,
            width: width,
            height: height,
            scale: baseScale * zoom
          })
        }
        
        setLoading(false)
        resolve()
      }
      
      img.onerror = () => {
        setError('Failed to load image')
        setLoading(false)
        reject(new Error('Failed to load image'))
      }
      
      img.src = fileUrl
    })
  }

  // Render PDF page to canvas and return page data
  const renderPdfPage = async (pdf, pageNum) => {
    try {
      const page = await pdf.getPage(pageNum)
      
      // Create canvas for this page
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      
      // Calculate viewport with increased scale for better visibility
      const baseScale = 2.0 // Increased from 1.5 for better default size
      const viewport = page.getViewport({ scale: baseScale * zoom, rotation })
      
      // Set canvas dimensions
      canvas.width = viewport.width
      canvas.height = viewport.height
      
      // Render page
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }
      
      await page.render(renderContext).promise
      
      const pageData = {
        pageNumber: pageNum,
        canvas: canvas,
        width: viewport.width,
        height: viewport.height
      }
      
      if (onPageLoad) {
        onPageLoad({
          pageNumber: pageNum,
          width: viewport.width,
          height: viewport.height,
          scale: baseScale * zoom
        })
      }
      
      return pageData
    } catch (error) {
      console.error(`DocumentViewer: Error rendering page ${pageNum}:`, error)
      throw error
    }
  }

  // Re-render when zoom or rotation changes
  useEffect(() => {
    if (!loading && !error && (isPDF || isImage)) {
      loadDocument()
    }
  }, [zoom, rotation])

  // Load document when fileUrl changes
  useEffect(() => {
    loadDocument()
  }, [loadDocument])

  // Calculate page offsets when pages change
  useEffect(() => {
    if (pages.length > 0) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(calculatePageOffsets, 100)
    }
  }, [pages, calculatePageOffsets])

  // Expose page offsets to parent component
  useEffect(() => {
    if (window.documentViewerPageOffsets !== pageOffsets) {
      window.documentViewerPageOffsets = pageOffsets
    }
  }, [pageOffsets])

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom * 1.2, 3)
    if (onZoomChange) onZoomChange(newZoom)
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom / 1.2, 0.5)
    if (onZoomChange) onZoomChange(newZoom)
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileUrl.split('/').pop() || 'document'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scrollToPage = (pageNumber) => {
    const pageIndex = pageNumber - 1
    const pageElement = pageRefs.current[pageIndex]
    if (pageElement && containerRef.current) {
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const pageRect = pageElement.getBoundingClientRect()
      
      // Calculate the scroll position to center the page
      const scrollTop = container.scrollTop + pageRect.top - containerRect.top - (containerRect.height - pageRect.height) / 2
      
      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      })
    }
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-96 bg-gray-50 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-96 bg-gray-50 rounded-lg ${className}`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`document-viewer h-full ${className}`}>
      {/* Clean Document Content - No Headers */}
      <div 
        ref={containerRef}
        className="relative bg-gray-50 h-full overflow-y-auto overflow-x-auto"
        style={{ 
          scrollBehavior: 'smooth'
        }}
      >
        <div 
          ref={pagesContainerRef}
          className="flex flex-col items-center py-6 px-4 min-h-full"
          style={{ 
            paddingBottom: '4rem',
            maxWidth: '100%'
          }}
          onClick={onClick}
        >
          {pages.map((page, index) => (
            <div
              key={page.pageNumber}
              ref={(el) => (pageRefs.current[index] = el)}
              data-page-number={page.pageNumber}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden mb-6 last:mb-0"
              style={{
                width: `${Math.min(page.width, window.innerWidth - 32)}px`, // Responsive width
                height: `${page.height * (Math.min(page.width, window.innerWidth - 32) / page.width)}px`, // Maintain aspect ratio
                maxWidth: '100%',
              }}
            >
              {/* Canvas */}
              <canvas
                width={page.width}
                height={page.height}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  maxWidth: '100%'
                }}
                ref={(canvas) => {
                  if (canvas && page.canvas) {
                    const ctx = canvas.getContext('2d')
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(page.canvas, 0, 0)
                  }
                }}
              />
              
              {/* Field Overlays for this page */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="relative w-full h-full pointer-events-auto">
                  {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.props.pageNumber === page.pageNumber) {
                      return child
                    }
                    return null
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DocumentViewer 