'use client';
import { useState, useEffect, useRef } from 'react';
import { Star, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function FeedbackWidget() {
  const [open, setOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [pricingFair, setPricingFair] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const timerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Get or create session ID
    let sid = sessionStorage.getItem('feedbackSessionId');
    if (!sid) {
      sid = uuidv4();
      sessionStorage.setItem('feedbackSessionId', sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    // Minimize after 10 seconds
    if (open && !minimized) {
      timerRef.current = setTimeout(() => {
        setMinimized(true);
        setOpen(false);
      }, 10000);
    }
    return () => clearTimeout(timerRef.current);
  }, [open, minimized]);

  // Flat, sharp, compact widget styles
  const widgetStyle = {
    position: 'fixed',
    bottom: 18,
    right: 18,
    zIndex: 9999,
    width: 'min(320px, 95vw)',
    maxWidth: 340,
    minWidth: 180,
    height: 'auto',
    boxShadow: '0 2px 12px 0 rgba(80,0,120,0.10)',
    borderRadius: 10,
    background: '#fff',
    border: '1.5px solid #e5e7eb',
    display: open ? 'block' : 'none',
    transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
    overflow: 'hidden',
    padding: 0,
  };

  const stripStyle = {
    position: 'fixed',
    bottom: 60,
    right: 0,
    zIndex: 9999,
    height: 100,
    width: 32,
    background: 'linear-gradient(135deg, #6366f1 60%, #a78bfa 100%)',
    color: '#fff',
    borderRadius: '10px 0 0 10px',
    display: minimized ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 2,
    cursor: 'pointer',
    boxShadow: '0 2px 12px 0 rgba(80,0,120,0.10)',
    userSelect: 'none',
    transition: 'opacity 0.3s',
  };

  // Step transitions
  const stepClass = 'transition-all duration-300 ease-in-out';

  const handleNext = () => {
    if (step === 1 && rating > 0) {
      // Move to next step immediately
      setStep(2);
      
      // Make API call in background
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/feedback/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          rating
        })
      }).catch(error => console.error('Error submitting rating:', error));
      
    } else if (step === 2) {
      // Move to next step immediately
      setStep(3);
      
      // Make API call in background
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/feedback/pricing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          pricingFeedback: pricingFair ? 'Fair' : 'Not Fair'
        })
      }).catch(error => console.error('Error submitting pricing feedback:', error));
    }
  };

  // Step 1: Star rating
  const Step1 = (
    <div className={`flex flex-col items-center px-4 py-4 ${stepClass}`} style={{minHeight: 110}}>
      <span className="font-semibold text-gray-800 text-base mb-2">How's your experience?</span>
      <div className="flex items-center gap-1 mb-2">
        {[1,2,3,4,5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
            className="focus:outline-none"
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill={(hoverRating || rating) >= star ? '#facc15' : 'none'}
            />
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={rating === 0}
        onClick={handleNext}
        className="mt-2 flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white rounded-md text-xs font-semibold shadow-sm hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{borderRadius: 6, minWidth: 60, justifyContent: 'center'}}
      >
        Next <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2.2} />
      </button>
    </div>
  );

  // Step 2: Pricing fairness
  const Step2 = (
    <div className={`flex flex-col items-center px-4 py-4 ${stepClass}`} style={{minHeight: 110}}>
      <span className="font-semibold text-gray-800 text-base mb-3 text-center">Do you feel our pricing is fair?</span>
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setPricingFair(true)}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold border ${pricingFair === true ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50'} transition-all`}
          style={{borderRadius: 6}}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setPricingFair(false)}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold border ${pricingFair === false ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50'} transition-all`}
          style={{borderRadius: 6}}
        >
          No
        </button>
      </div>
      <div className="flex w-full justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-800"
          style={{borderRadius: 6}}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.2} /> Back
        </button>
        <button
          type="button"
          disabled={pricingFair === null}
          onClick={handleNext}
          className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white rounded-md text-xs font-semibold shadow-sm hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{borderRadius: 6, minWidth: 60, justifyContent: 'center'}}
        >
          Next <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );

  // Step 3: Book demo call
  const Step3 = (
    <div className={`flex flex-col items-center px-4 py-4 ${stepClass}`} style={{minHeight: 110}}>
      <span className="font-semibold text-gray-800 text-base mb-3 text-center">Thank you! Want a personal demo?</span>
      <button
        type="button"
        onClick={() => router.push('/demo')}
        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-xs font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all"
        style={{borderRadius: 6, minWidth: 120, justifyContent: 'center'}}
      >
        Book a Demo Call <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2.2} />
      </button>
      <button
        type="button"
        onClick={() => setStep(2)}
        className="flex items-center gap-1 px-2 py-1 mt-2 text-xs text-gray-500 hover:text-gray-800"
        style={{borderRadius: 6}}
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2.2} /> Back
      </button>
    </div>
  );

  return (
    <>
      {/* Feedback Widget */}
      <div style={widgetStyle} className={`feedback-widget animate-fade-in-up ${open ? '' : 'hidden'} shadow border border-gray-200`}> 
        <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-gray-100">
          <span className="text-xs font-bold text-gray-700 tracking-wide uppercase">Feedback</span>
          <button onClick={() => { setOpen(false); setMinimized(true); }} className="text-gray-400 hover:text-gray-700 p-1 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Steps */}
        {step === 1 && Step1}
        {step === 2 && Step2}
        {step === 3 && Step3}
      </div>
      {/* Minimized Feedback Strip */}
      <div
        style={stripStyle}
        className="feedback-strip cursor-pointer select-none"
        onClick={() => { setOpen(true); setMinimized(false); }}
      >
        Feedback
      </div>
    </>
  );
} 