'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, Download, PenTool, RotateCcw, ArrowRight, FileText, Shield, Zap, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    q: 'Is this PDF signer really free?',
    a: 'Yes, completely free with no hidden costs. You can upload a PDF, draw your signature, and use this tool as many times as you want. No credit card, no trial period — just free PDF signing.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account is needed to use this free PDF signing tool. Just open the page, upload your PDF, draw your signature, and you are done. For advanced features like multi-signer workflows and templates, you can create a free eSignTap account.',
  },
  {
    q: 'Is my PDF data secure?',
    a: 'Absolutely. Your PDF is processed entirely in your browser. Your files are never uploaded to any server. Everything happens locally on your device, so your documents remain completely private.',
  },
  {
    q: 'What file formats are supported?',
    a: 'This free tool supports PDF files up to 10MB. If you need to sign Word documents (DOCX), images, or other formats, create a free eSignTap account to access our full document signing platform.',
  },
  {
    q: 'Can I add multiple signatures to a PDF?',
    a: 'With this free tool you can place one signature per session. For multiple signatures, multi-page signing, and sending documents to others for signature, create a free eSignTap account — it takes just 30 seconds.',
  },
]

export default function SignPdfFreePage() {
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfDataUrl, setPdfDataUrl] = useState(null)
  const [signatureDataUrl, setSignatureDataUrl] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showSignPad, setShowSignPad] = useState(false)
  const [signed, setSigned] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [fileName, setFileName] = useState('')

  const signCanvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  // Handle file upload
  const handleFile = useCallback((file) => {
    if (!file || file.type !== 'application/pdf') return
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be under 10MB')
      return
    }
    setPdfFile(file)
    setFileName(file.name)
    setSigned(false)
    setSignatureDataUrl(null)
    setShowSignPad(false)
    const reader = new FileReader()
    reader.onload = (e) => setPdfDataUrl(e.target.result)
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDraggingOver(false)
      const file = e.dataTransfer.files[0]
      handleFile(file)
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false)
  }, [])

  // Signature drawing
  const getCoords = (e) => {
    const canvas = signCanvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    const canvas = signCanvasRef.current
    const ctx = canvas.getContext('2d')
    const { x, y } = getCoords(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e) => {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = signCanvasRef.current
    const ctx = canvas.getContext('2d')
    const { x, y } = getCoords(e)
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#000'
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = (e) => {
    if (e) e.preventDefault()
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = signCanvasRef.current
    setSignatureDataUrl(canvas.toDataURL())
  }

  const clearSignature = () => {
    const canvas = signCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignatureDataUrl(null)
  }

  const applySignature = () => {
    if (!signatureDataUrl) return
    setSigned(true)
    setShowSignPad(false)
  }

  const resetAll = () => {
    setPdfFile(null)
    setPdfDataUrl(null)
    setSignatureDataUrl(null)
    setSigned(false)
    setShowSignPad(false)
    setFileName('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Initialize signature canvas with white background
  useEffect(() => {
    if (showSignPad && signCanvasRef.current) {
      const canvas = signCanvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [showSignPad])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Header */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            100% Free &mdash; No Signup Required
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Sign PDF Online Free
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Upload your PDF, draw your signature, and download the signed document. Your files never leave your browser.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-16 px-4 -mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 md:gap-4 py-5 px-4 bg-gray-50 border-b border-gray-100">
              <StepIndicator number="1" label="Upload PDF" active={!pdfFile} done={!!pdfFile} />
              <div className="w-8 h-px bg-gray-300" />
              <StepIndicator number="2" label="Draw Signature" active={!!pdfFile && !signed} done={signed} />
              <div className="w-8 h-px bg-gray-300" />
              <StepIndicator number="3" label="Download" active={signed} done={false} />
            </div>

            <div className="p-6 md:p-10">
              {/* Step 1: Upload */}
              {!pdfFile && (
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer ${
                    isDraggingOver
                      ? 'border-purple-400 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/30'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xl font-bold text-gray-800 mb-2">Drop your PDF here or click to browse</p>
                  <p className="text-gray-500 text-sm">Supports PDF files up to 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files[0])}
                  />
                </div>
              )}

              {/* Step 2: PDF Preview + Signature */}
              {pdfFile && !signed && (
                <div>
                  {/* File info bar */}
                  <div className="flex items-center justify-between mb-6 bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-800 text-sm truncate max-w-[200px] md:max-w-none">
                        {fileName}
                      </span>
                    </div>
                    <button
                      onClick={resetAll}
                      className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  {/* PDF Preview */}
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-6" style={{ height: '500px' }}>
                    <object
                      data={pdfDataUrl}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <FileText className="w-12 h-12 mb-3 text-gray-400" />
                        <p className="font-medium">PDF preview not available in this browser</p>
                        <p className="text-sm mt-1">Your file has been loaded successfully</p>
                      </div>
                    </object>
                    {/* Signature overlay when applied but not yet finalized */}
                    {signatureDataUrl && !showSignPad && (
                      <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200">
                        <img src={signatureDataUrl} alt="Your signature" className="h-12" />
                      </div>
                    )}
                  </div>

                  {/* Signature Pad */}
                  {showSignPad ? (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Draw your signature below:</p>
                      <canvas
                        ref={signCanvasRef}
                        width={600}
                        height={200}
                        className="w-full bg-white rounded-xl border-2 border-gray-200 cursor-crosshair touch-none"
                        style={{ maxHeight: '200px' }}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                      />
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={clearSignature}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Clear
                        </button>
                        <button
                          onClick={applySignature}
                          disabled={!signatureDataUrl}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Apply Signature
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowSignPad(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      <PenTool className="w-5 h-5" />
                      Draw Your Signature
                    </button>
                  )}
                </div>
              )}

              {/* Step 3: Signed - Download CTA */}
              {signed && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Your PDF Has Been Signed!</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    To download your signed PDF with the signature embedded, create a free eSignTap account. It takes just 30 seconds.
                  </p>

                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-4"
                  >
                    <Download className="w-5 h-5" />
                    Download Signed PDF &mdash; Free Account
                  </Link>
                  <p className="text-gray-400 text-sm mb-6">No credit card required</p>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 max-w-lg mx-auto border border-blue-100">
                    <p className="font-semibold text-gray-800 mb-3">With a free account you also get:</p>
                    <ul className="text-sm text-gray-600 space-y-2 text-left max-w-xs mx-auto">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Download signed PDFs
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Send documents for others to sign
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Legally binding audit trail
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Reusable signature saved to your account
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={resetAll}
                    className="mt-8 text-sm text-gray-500 hover:text-purple-600 font-medium transition-colors"
                  >
                    Sign another PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            How to Sign a PDF Online for Free
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">Three simple steps. No software to install.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Your PDF</h3>
              <p className="text-gray-500">Drag and drop your PDF file or click to browse. Files stay in your browser and are never uploaded to any server.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Draw Your Signature</h3>
              <p className="text-gray-500">Use your mouse or finger to draw your signature on the canvas. Clear and redraw as many times as you need.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Download Signed PDF</h3>
              <p className="text-gray-500">Apply your signature and download the completed document. It is that easy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Why Use eSignTap&apos;s Free PDF Signer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Free</h3>
              <p className="text-gray-600 leading-relaxed">
                No hidden costs, no trial limits, no watermarks. Sign as many PDFs as you need, completely free of charge.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Account Needed</h3>
              <p className="text-gray-600 leading-relaxed">
                Start signing immediately. No registration, no email verification, no password to remember. Just open and sign.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Browser-Based Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Your files never leave your device. All processing happens locally in your browser, keeping your documents completely private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-10 md:p-14 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Need More Features?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Unlock unlimited signing, multi-signer workflows, reusable templates, and legally binding audit trails with a free eSignTap account.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/60 mt-4 text-sm">No credit card required. Set up in 30 seconds.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-gray-900 text-lg list-none">
                  {faq.q}
                  <span className="ml-4 text-purple-500 group-open:rotate-45 transition-transform duration-200 text-2xl font-light">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Sign Your PDF?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Use the free tool above or create an account for the full e-signature experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Sign a PDF Now <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  )
}

function StepIndicator({ number, label, active, done }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
          done
            ? 'bg-green-500 text-white'
            : active
            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {done ? <CheckCircle className="w-4 h-4" /> : number}
      </div>
      <span
        className={`text-sm font-medium hidden sm:inline ${
          active || done ? 'text-gray-800' : 'text-gray-400'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
