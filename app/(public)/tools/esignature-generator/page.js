'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  PenTool,
  Type,
  Download,
  RotateCcw,
  Palette,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  FileText,
  Mail,
  ClipboardList,
  File,
  Briefcase,
  Receipt,
} from 'lucide-react'
import Link from 'next/link'

const fontStyles = [
  {
    name: 'Classic',
    style: 'italic',
    fontFamily: 'Georgia, serif',
    transform: 'rotate(-3deg)',
    fontWeight: 'normal',
  },
  {
    name: 'Bold',
    style: 'italic',
    fontFamily: 'Times New Roman, serif',
    transform: 'rotate(-2deg) skewX(-5deg)',
    fontWeight: 'bold',
  },
  {
    name: 'Elegant',
    style: 'italic',
    fontFamily: 'Palatino, serif',
    transform: 'rotate(-4deg)',
    fontWeight: '300',
  },
  {
    name: 'Modern',
    style: 'normal',
    fontFamily: 'Verdana, sans-serif',
    transform: 'skewX(-8deg)',
    fontWeight: '600',
  },
  {
    name: 'Script',
    style: 'italic',
    fontFamily: 'cursive',
    transform: 'rotate(-5deg) skewX(-3deg)',
    fontWeight: 'normal',
  },
]

const inkColors = [
  { label: 'Black', value: '#000000' },
  { label: 'Blue', value: '#1d4ed8' },
  { label: 'Red', value: '#dc2626' },
  { label: 'Green', value: '#16a34a' },
]

const lineWidths = [
  { label: 'Thin', value: 2 },
  { label: 'Medium', value: 3 },
  { label: 'Thick', value: 5 },
]

const useCases = [
  { icon: FileText, label: 'Contracts' },
  { icon: Mail, label: 'Letters' },
  { icon: ClipboardList, label: 'Forms' },
  { icon: File, label: 'PDFs' },
  { icon: Briefcase, label: 'Proposals' },
  { icon: Receipt, label: 'Invoices' },
]

const faqs = [
  {
    q: 'Is this signature generator free?',
    a: 'Yes, 100% free. There are no hidden charges, no watermarks, and no limits on how many signatures you can create. Use it as many times as you want.',
  },
  {
    q: 'Can I use my signature on legal documents?',
    a: 'Yes. Electronic signatures are legally valid and enforceable in most countries, including under the U.S. ESIGN Act, UETA, and the EU eIDAS regulation. Your downloaded signature can be placed on contracts, agreements, and other legal documents.',
  },
  {
    q: 'What format is the download?',
    a: 'Your signature is downloaded as a transparent PNG image. This format works perfectly for placing your signature on top of documents, PDFs, and other files without a white background box.',
  },
  {
    q: 'Do you store my signature?',
    a: 'No. Everything is processed entirely in your browser. Your signature data never leaves your device, and nothing is uploaded to any server. Your privacy is fully protected.',
  },
  {
    q: 'Can I sign PDFs with this?',
    a: 'This tool generates a signature image you can paste into documents. For a complete PDF signing experience — upload a PDF, place your signature, and send for countersigning — try our free PDF signer tool.',
  },
]

export default function ESignatureGeneratorPage() {
  const [mode, setMode] = useState('draw')
  const [typedName, setTypedName] = useState('')
  const [fontStyle, setFontStyle] = useState(0)
  const [inkColor, setInkColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(3)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    const ctx = canvas.getContext('2d')
    ctx.scale(2, 2)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = inkColor
    ctx.lineWidth = lineWidth
    ctxRef.current = ctx
  }, [])

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = inkColor
      ctxRef.current.lineWidth = lineWidth
    }
  }, [inkColor, lineWidth])

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }, [])

  const startDrawing = useCallback(
    (e) => {
      e.preventDefault()
      const pos = getPos(e)
      ctxRef.current.beginPath()
      ctxRef.current.moveTo(pos.x, pos.y)
      setIsDrawing(true)
      setHasDrawn(true)
    },
    [getPos]
  )

  const draw = useCallback(
    (e) => {
      if (!isDrawing) return
      e.preventDefault()
      const pos = getPos(e)
      ctxRef.current.lineTo(pos.x, pos.y)
      ctxRef.current.stroke()
    },
    [isDrawing, getPos]
  )

  const stopDrawing = useCallback(() => {
    ctxRef.current.closePath()
    setIsDrawing(false)
  }, [])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const downloadSignature = () => {
    let canvas
    if (mode === 'draw') {
      canvas = canvasRef.current
      if (!hasDrawn) return
    } else {
      if (!typedName.trim()) return
      canvas = document.createElement('canvas')
      canvas.width = 600
      canvas.height = 200
      const ctx = canvas.getContext('2d')
      const s = fontStyles[fontStyle]
      ctx.font = `${s.style} ${s.fontWeight} 48px ${s.fontFamily}`
      ctx.fillStyle = inkColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.save()
      ctx.translate(300, 100)
      const angle = parseFloat(s.transform.match(/rotate\(([^)]+)deg\)/)?.[1] || 0) * (Math.PI / 180)
      ctx.rotate(angle)
      ctx.fillText(typedName, 0, 0)
      ctx.restore()
    }

    const link = document.createElement('a')
    link.download = 'my-signature.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const canDownload = mode === 'draw' ? hasDrawn : typedName.trim().length > 0

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Hero */}
        <section className="pt-16 pb-10 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            100% Free &mdash; No Signup Required
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Free E-Signature Generator
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Create a professional digital signature in seconds. Draw or type your name,
            customize the style, and download for free.
          </p>
        </section>

        {/* Tool Area */}
        <section className="max-w-2xl mx-auto px-4 pb-16">
          <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-8">
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6 bg-gray-100 rounded-full p-1 max-w-xs mx-auto">
              <button
                onClick={() => setMode('draw')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  mode === 'draw'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <PenTool className="w-4 h-4" />
                Draw
              </button>
              <button
                onClick={() => setMode('type')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  mode === 'type'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Type className="w-4 h-4" />
                Type
              </button>
            </div>

            {/* Draw Mode */}
            {mode === 'draw' && (
              <div className="mb-6">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="w-full rounded-xl border-2 border-dashed border-gray-300 bg-white cursor-crosshair touch-none"
                    style={{ height: 200 }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  {!hasDrawn && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-sm">
                      Draw your signature here
                    </div>
                  )}
                </div>
                <button
                  onClick={clearCanvas}
                  className="mt-3 flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors mx-auto"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </button>
              </div>
            )}

            {/* Type Mode */}
            {mode === 'type' && (
              <div className="mb-6">
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="Type your full name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg mb-4 transition-all"
                />
                {/* Font Style Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {fontStyles.map((fs, i) => (
                    <button
                      key={i}
                      onClick={() => setFontStyle(i)}
                      className={`p-3 rounded-xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                        fontStyle === i
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                        {fs.name}
                      </span>
                      <span
                        className="block text-xl truncate"
                        style={{
                          fontStyle: fs.style,
                          fontFamily: fs.fontFamily,
                          fontWeight: fs.fontWeight,
                          transform: fs.transform,
                          color: inkColor,
                          display: 'inline-block',
                        }}
                      >
                        {typedName || 'Your Name'}
                      </span>
                    </button>
                  ))}
                </div>
                {/* Preview */}
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 flex items-center justify-center min-h-[120px]">
                  {typedName ? (
                    <span
                      className="text-5xl"
                      style={{
                        fontStyle: fontStyles[fontStyle].style,
                        fontFamily: fontStyles[fontStyle].fontFamily,
                        fontWeight: fontStyles[fontStyle].fontWeight,
                        transform: fontStyles[fontStyle].transform,
                        color: inkColor,
                        display: 'inline-block',
                      }}
                    >
                      {typedName}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">Your signature preview will appear here</span>
                  )}
                </div>
              </div>
            )}

            {/* Color Picker */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Palette className="w-4 h-4" />
                Color:
              </div>
              <div className="flex gap-2">
                {inkColors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setInkColor(c.value)}
                    title={c.label}
                    className={`w-8 h-8 rounded-full transition-all ${
                      inkColor === c.value ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </div>

            {/* Line Width (draw mode only) */}
            {mode === 'draw' && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-500">Thickness:</span>
                <div className="flex gap-2">
                  {lineWidths.map((lw) => (
                    <button
                      key={lw.value}
                      onClick={() => setLineWidth(lw.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                        lineWidth === lw.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span
                        className="rounded-full bg-current"
                        style={{ width: lw.value * 3, height: lw.value * 3 }}
                      />
                      {lw.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Download Button */}
            <button
              onClick={downloadSignature}
              disabled={!canDownload}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-lg shadow-lg transition-all ${
                canDownload
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <Download className="w-5 h-5" />
              Download Signature (PNG)
            </button>
          </div>
        </section>

        {/* How to Create */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How to Create Your E-Signature
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: '1',
                color: 'from-blue-500 to-blue-600',
                title: 'Choose Draw or Type',
                desc: 'Draw your signature freehand on the canvas, or type your name and pick a signature font style.',
              },
              {
                num: '2',
                color: 'from-purple-500 to-purple-600',
                title: 'Customize Color & Style',
                desc: 'Select your ink color and line thickness. Preview your signature in real time until it looks perfect.',
              },
              {
                num: '3',
                color: 'from-green-500 to-green-600',
                title: 'Download as PNG',
                desc: 'Download your signature as a transparent PNG image. Use it anywhere — documents, emails, or PDFs.',
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} text-white text-xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Where to Use */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Where to Use Your E-Signature
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {useCases.map((uc) => (
              <div
                key={uc.label}
                className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <uc.icon className="w-8 h-8 text-blue-600" />
                <span className="font-semibold text-gray-800">{uc.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why Create */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Why Create a Digital Signature?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircle,
                color: 'text-blue-600 bg-blue-100',
                title: 'Professional Look',
                desc: 'Give your documents a polished, professional appearance with a consistent electronic signature.',
              },
              {
                icon: Zap,
                color: 'text-purple-600 bg-purple-100',
                title: 'Save Time',
                desc: 'No more printing, signing by hand, scanning, and emailing. Sign digitally in seconds.',
              },
              {
                icon: Shield,
                color: 'text-green-600 bg-green-100',
                title: 'Legally Valid',
                desc: 'Electronic signatures are legally binding under the ESIGN Act, UETA, and eIDAS regulations.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-3">Sign Documents with eSignTap</h2>
            <p className="text-blue-100 text-lg mb-2">
              Use your new signature to sign real documents.
            </p>
            <p className="text-blue-200 text-sm mb-8">
              Upload PDF, add your signature, send for signing &mdash; all in one place.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-xl hover:scale-105 hover:shadow-xl transition-all text-lg"
            >
              Start Signing for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 hover:text-blue-600 transition-colors list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform text-2xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
