'use client'

import React, { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, PenTool, Upload, RotateCcw, Check, Palette } from 'lucide-react'
import toast from 'react-hot-toast'

const SignatureModal = ({ isOpen = true, onClose, onSave, maxSizeMB = 30 }) => {
  const [activeTab, setActiveTab] = useState('draw') // 'draw' or 'upload'
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [signatureData, setSignatureData] = useState(null)
  const [penColor, setPenColor] = useState('#000000')
  const [penWidth, setPenWidth] = useState(8)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const MAX_SIZE_BYTES = maxSizeMB * 1024 * 1024;
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const penColors = ['#000000', '#0066cc', '#cc0000', '#009900', '#663399', '#cc6600']
  const penWidths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  useEffect(() => {
    if (isOpen && activeTab === 'draw') {
      initializeCanvas()
      setHasDrawn(false)
    }
    if (activeTab === 'upload') {
      setSignatureData(null)
      setErrorMsg("")
    }
    // Fix passive event listener for touchmove
    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('touchmove', draw, { passive: false })
      return () => {
        canvas.removeEventListener('touchmove', draw)
      }
    }
  }, [isOpen, activeTab, penColor, penWidth])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const initializeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 200
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = penColor
    ctx.lineWidth = penWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  // Unified event handlers for mouse/touch
  const getXY = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    if (e.touches && e.touches.length > 0) {
      return [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top]
    } else {
      return [e.clientX - rect.left, e.clientY - rect.top]
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    setIsDrawing(true)
    setHasDrawn(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const [x, y] = getXY(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const [x, y] = getXY(e)
    ctx.strokeStyle = penColor
    ctx.lineWidth = penWidth
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select an image file')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setErrorMsg(`File is too large. Max size is 30MB.`)
      return
    }
    setErrorMsg("")
    setUploadedFile(file)
    const reader = new FileReader()
    reader.onload = (event) => {
      setSignatureData(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  const saveSignature = () => {
    let signatureDataUrl = null
    if (activeTab === 'draw') {
      const canvas = canvasRef.current
      if (!canvas || !hasDrawn) return
      signatureDataUrl = canvas.toDataURL('image/png')
      onSave(null, signatureDataUrl, null)
      onClose()
      return
    } else if (activeTab === 'upload' && signatureData) {
      signatureDataUrl = signatureData
      onSave(null, signatureDataUrl, uploadedFile)
      onClose()
      return
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[95vh] mx-2 sm:mx-auto z-[9999] flex flex-col"
        style={{
          maxWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? '95vw' : undefined,
          width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : undefined,
          maxHeight: '95vh',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <PenTool className="w-6 h-6 mr-2 text-blue-600" />
            Add Signature
          </h3>
          <button
            onClick={() => { console.log('SignatureModal: Close (X) clicked'); onClose(); }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'draw'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <PenTool className="w-4 h-4 inline mr-2" />
            Draw Signature
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Upload Image
          </button>
        </div>
        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
          {activeTab === 'draw' && (
            <div className="space-y-4">
              {/* Drawing Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Color:</span>
                    <div className="flex space-x-1">
                      {penColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setPenColor(color)}
                          className={`w-6 h-6 rounded-full border-2 ${
                            penColor === color ? 'border-gray-400' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Width:</span>
                    <select
                      value={penWidth}
                      onChange={(e) => setPenWidth(parseInt(e.target.value))}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      {penWidths.map((width) => (
                        <option key={width} value={width}>{width}px</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={clearCanvas}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
              {/* Canvas */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-4 bg-gray-50">
                <canvas
                  ref={canvasRef}
                  className="w-full border border-gray-200 rounded bg-white cursor-crosshair"
                  style={{ maxHeight: '200px', touchAction: 'none' }}
                  width={typeof window !== 'undefined' && window.innerWidth < 500 ? 300 : 400}
                  height={typeof window !== 'undefined' && window.innerWidth < 500 ? 150 : 200}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Draw your signature above
                </p>
              </div>
            </div>
          )}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
              >
                {signatureData ? (
                  <div className="space-y-4">
                    <img
                      src={signatureData}
                      alt="Uploaded signature"
                      className="max-w-full max-h-32 mx-auto rounded object-contain"
                    />
                    <p className="text-sm text-gray-600">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Upload signature image</p>
                      <p className="text-sm text-gray-500">PNG, JPG, or GIF up to 30MB</p>
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {errorMsg && <div className="text-red-500 text-sm text-center">{errorMsg}</div>}
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50" style={{ pointerEvents: 'auto' }}>
          <button
            onClick={() => { console.log('SignatureModal: Cancel clicked'); onClose(); }}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            style={{ pointerEvents: 'auto' }}
          >
            Cancel
          </button>
          <button
            onClick={saveSignature}
            disabled={
              (activeTab === 'draw' && !hasDrawn) ||
              (activeTab === 'upload' && !signatureData)
            }
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{ pointerEvents: 'auto' }}
          >
            <Check className="w-4 h-4" />
            <span>Save Signature</span>
          </button>
        </div>
      </div>
    </div>
  )

  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body)
  } else {
    return null
  }
}

export default SignatureModal 