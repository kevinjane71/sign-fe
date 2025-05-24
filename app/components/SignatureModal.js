'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X, PenTool, Upload, RotateCcw, Check, Palette } from 'lucide-react'

const SignatureModal = ({ isOpen, onClose, onSave, fieldId }) => {
  const [activeTab, setActiveTab] = useState('draw') // 'draw' or 'upload'
  const [isDrawing, setIsDrawing] = useState(false)
  const [signatureData, setSignatureData] = useState(null)
  const [penColor, setPenColor] = useState('#000000')
  const [penWidth, setPenWidth] = useState(2)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const penColors = ['#000000', '#0066cc', '#cc0000', '#009900', '#663399', '#cc6600']
  const penWidths = [1, 2, 3, 4, 5]

  useEffect(() => {
    if (isOpen && activeTab === 'draw') {
      initializeCanvas()
    }
  }, [isOpen, activeTab])

  const initializeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 200
    
    // Set canvas background to white
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Set drawing properties
    ctx.strokeStyle = penColor
    ctx.lineWidth = penWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const startDrawing = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = penColor
    ctx.lineWidth = penWidth
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

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
      if (!canvas) return
      signatureDataUrl = canvas.toDataURL('image/png')
    } else if (activeTab === 'upload' && signatureData) {
      signatureDataUrl = signatureData
    }

    if (signatureDataUrl) {
      onSave(fieldId, signatureDataUrl)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <PenTool className="w-6 h-6 mr-2 text-blue-600" />
            Add Signature
          </h3>
          <button
            onClick={onClose}
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
        <div className="p-6">
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <canvas
                  ref={canvasRef}
                  className="w-full border border-gray-200 rounded bg-white cursor-crosshair"
                  style={{ maxHeight: '200px' }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
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
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
              >
                {signatureData ? (
                  <div className="space-y-4">
                    <img
                      src={signatureData}
                      alt="Uploaded signature"
                      className="max-w-full max-h-32 mx-auto rounded"
                    />
                    <p className="text-sm text-gray-600">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Upload signature image</p>
                      <p className="text-sm text-gray-500">PNG, JPG, or GIF up to 5MB</p>
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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveSignature}
            disabled={
              (activeTab === 'draw' && !canvasRef.current) ||
              (activeTab === 'upload' && !signatureData)
            }
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Save Signature</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignatureModal 