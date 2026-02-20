'use client'

import { useRouter, usePathname } from 'next/navigation'
import { FileText, User, LogIn, LogOut, Menu, X, FileIcon, RotateCcw, PenTool, CreditCard, ChevronDown, Users, BookOpen, Building2, Briefcase, Scale, Heart, Store, Palette, Wrench, PenLine, Sparkles, ArrowRight, GraduationCap, Landmark, ShieldCheck, HardHat, HeartHandshake, Car, Home, Calculator, UserPlus, Truck, ShoppingBag, Cpu, Factory, Hotel, FileSignature } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import useAuth from '../hooks/useAuth'

const solutionCategories = [
  {
    title: 'Professional Services',
    items: [
      { icon: Scale, label: 'Legal', path: '/solutions/legal', color: 'bg-amber-100 text-amber-600' },
      { icon: Heart, label: 'Healthcare', path: '/solutions/healthcare', color: 'bg-rose-100 text-rose-600' },
      { icon: Landmark, label: 'Finance & Banking', path: '/solutions/finance', color: 'bg-emerald-100 text-emerald-600' },
      { icon: Calculator, label: 'Accountants & CPAs', path: '/solutions/accounting', color: 'bg-green-100 text-green-600' },
      { icon: ShieldCheck, label: 'Insurance', path: '/solutions/insurance', color: 'bg-sky-100 text-sky-600' },
    ],
  },
  {
    title: 'Industries',
    items: [
      { icon: Building2, label: 'Real Estate', path: '/solutions/real-estate', color: 'bg-blue-100 text-blue-600' },
      { icon: HardHat, label: 'Construction', path: '/solutions/construction', color: 'bg-yellow-100 text-yellow-600' },
      { icon: GraduationCap, label: 'Education', path: '/solutions/education', color: 'bg-blue-100 text-blue-600' },
      { icon: Landmark, label: 'Government', path: '/solutions/government', color: 'bg-slate-100 text-slate-600' },
      { icon: Cpu, label: 'Technology', path: '/solutions/technology', color: 'bg-cyan-100 text-cyan-600' },
    ],
  },
  {
    title: 'Business Size',
    items: [
      { icon: Store, label: 'Small Business', path: '/solutions/small-business', color: 'bg-emerald-100 text-emerald-600' },
      { icon: Palette, label: 'Freelancers', path: '/solutions/freelancers', color: 'bg-pink-100 text-pink-600' },
      { icon: Briefcase, label: 'HR & Recruiting', path: '/solutions/hr', color: 'bg-violet-100 text-violet-600' },
      { icon: UserPlus, label: 'Recruitment', path: '/solutions/recruitment', color: 'bg-purple-100 text-purple-600' },
      { icon: Factory, label: 'Manufacturing', path: '/solutions/manufacturing', color: 'bg-gray-100 text-gray-600' },
    ],
  },
]

const useCaseItems = [
  { icon: FileSignature, label: 'NDA Signing', desc: 'Sign NDAs online instantly', path: '/use-cases/nda-signing', color: 'bg-blue-100 text-blue-600' },
  { icon: Home, label: 'Lease Agreements', desc: 'Electronic lease signing', path: '/use-cases/lease-agreements', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Briefcase, label: 'Employment Contracts', desc: 'Sign offer letters & contracts', path: '/use-cases/employment-contracts', color: 'bg-violet-100 text-violet-600' },
  { icon: FileText, label: 'Sales Contracts', desc: 'E-sign sales contracts', path: '/use-cases/sales-contracts', color: 'bg-emerald-100 text-emerald-600' },
  { icon: ShieldCheck, label: 'Consent Forms', desc: 'Digital consent form signing', path: '/use-cases/consent-forms', color: 'bg-rose-100 text-rose-600' },
  { icon: FileText, label: 'Waivers', desc: 'Sign waivers electronically', path: '/use-cases/waivers', color: 'bg-amber-100 text-amber-600' },
]

const toolsItems = [
  { icon: PenLine, label: 'Sign PDF Free', desc: 'Upload and sign any PDF instantly', path: '/tools/sign-pdf-free', color: 'bg-blue-100 text-blue-600' },
  { icon: Sparkles, label: 'E-Signature Generator', desc: 'Create your digital signature', path: '/tools/esignature-generator', color: 'bg-purple-100 text-purple-600' },
  { icon: FileText, label: 'Fill PDF Free', desc: 'Fill PDF forms online for free', path: '/tools/fill-pdf-free', color: 'bg-emerald-100 text-emerald-600' },
  { icon: ShieldCheck, label: 'NDA Generator', desc: 'Create free NDA templates', path: '/tools/nda-generator', color: 'bg-amber-100 text-amber-600' },
]

const resourceItems = [
  { icon: BookOpen, label: 'Guides', desc: 'E-signature guides & tutorials', path: '/guides', color: 'bg-blue-100 text-blue-600' },
  { icon: FileText, label: 'Templates', desc: 'Free document templates', path: '/templates', color: 'bg-purple-100 text-purple-600' },
  { icon: BookOpen, label: 'Glossary', desc: 'E-signature terms explained', path: '/glossary', color: 'bg-emerald-100 text-emerald-600' },
  { icon: BookOpen, label: 'Blog', desc: 'Tips, news & insights', path: '/blog', color: 'bg-pink-100 text-pink-600' },
]

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isLoading, isRefreshing, logout: handleLogout } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [useCasesOpen, setUseCasesOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const profileRef = useRef(null)
  const solutionsRef = useRef(null)
  const useCasesRef = useRef(null)
  const toolsRef = useRef(null)
  const resourcesRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
      if (solutionsRef.current && !solutionsRef.current.contains(event.target)) {
        setSolutionsOpen(false)
      }
      if (useCasesRef.current && !useCasesRef.current.contains(event.target)) {
        setUseCasesOpen(false)
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setToolsOpen(false)
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setResourcesOpen(false)
      }
    }
    if (profileOpen || solutionsOpen || useCasesOpen || toolsOpen || resourcesOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileOpen, solutionsOpen, useCasesOpen, toolsOpen, resourcesOpen])

  const handleLogin = () => {
    router.push('/login')
  }

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  const handleNavigation = (path) => {
    setMobileMenuOpen(false)
    setSolutionsOpen(false)
    setUseCasesOpen(false)
    setToolsOpen(false)
    setResourcesOpen(false)
    if (pathname === '/login') {
      window.location.href = path
    } else {
      router.push(path)
    }
  }

  const handleLogoClick = () => {
    if (pathname === '/') {
      router.push('/')
    } else if (pathname === '/login') {
      window.location.href = '/'
    } else {
      const targetPath = user ? '/dashboard' : '/'
      router.push(targetPath)
    }
  }

  const handleProfile = () => {
    setProfileOpen(false)
    router.push('/profile')
  }

  const handleLogoutAndRedirect = () => {
    setProfileOpen(false)
    handleLogout()
    router.push('/')
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <header className="sticky top-0 z-50">
        <div className="h-[3px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
          <div className="w-full px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-18">
              <div className="flex items-center">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
                      eSignTap
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Colorful gradient accent line */}
      <div className="h-[3px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                onClick={handleLogoClick}
                className="flex items-center space-x-2 md:space-x-3 group focus:outline-none"
              >
                <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-105">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <span className="hidden sm:block text-xl md:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
                  eSignTap
                </span>
              </button>
            </div>

            {/* Right Side - Navigation and User */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {user ? (
                <>
                  {/* Desktop navigation - Logged In */}
                  <nav className="hidden md:flex items-center space-x-1">
                    <button
                      onClick={() => handleNavigation('/dashboard')}
                      className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-100 hover:text-emerald-600 transition-all duration-200"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={() => handleNavigation('/your-sign')}
                      className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-100 hover:text-teal-600 transition-all duration-200"
                    >
                      <PenTool className="w-4 h-4" />
                      <span>Your Sign</span>
                    </button>
                    <button
                      onClick={() => handleNavigation('/billing')}
                      className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-100 hover:text-cyan-600 transition-all duration-200"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Billing</span>
                    </button>
                    <button
                      onClick={() => handleNavigation('/blog')}
                      className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-100 hover:text-emerald-600 transition-all duration-200"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Blog</span>
                    </button>
                  </nav>

                  {/* Mobile menu button */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                    aria-label="Open menu"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>

                  {/* Profile dropdown */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen((v) => !v)}
                      className="flex items-center space-x-1.5 px-2 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl focus:outline-none border border-gray-200 transition-all duration-200"
                      aria-label="Open profile menu"
                    >
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="Profile" className="w-7 h-7 rounded-full object-cover ring-2 ring-teal-200" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <ChevronDown className={`w-4 h-4 text-gray-500 hidden md:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center space-x-3 mb-2 px-3 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt="Profile" className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-200" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-gray-900 text-sm truncate">{user.name || user.email}</span>
                            <span className="text-xs text-gray-500 truncate">{user.email}</span>
                          </div>
                        </div>
                        <button
                          onClick={handleProfile}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 text-sm font-semibold transition-all duration-200 flex items-center space-x-2"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </button>
                        <button
                          onClick={() => { handleNavigation('/contacts'); setProfileOpen(false); }}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-gray-700 hover:bg-teal-50 hover:text-teal-700 text-sm font-semibold transition-all duration-200 flex items-center space-x-2"
                        >
                          <Users className="w-4 h-4" />
                          <span>Contacts</span>
                        </button>
                        <div className="my-1 border-t border-gray-100" />
                        <button
                          onClick={handleLogoutAndRedirect}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 text-sm font-semibold transition-all duration-200 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Desktop navigation - Logged Out */}
                  <nav className="hidden md:flex items-center space-x-1">
                    {/* Solutions mega-menu */}
                    <div
                      className="relative"
                      ref={solutionsRef}
                      onMouseEnter={() => setSolutionsOpen(true)}
                      onMouseLeave={() => setSolutionsOpen(false)}
                    >
                      <button
                        onClick={() => setSolutionsOpen((v) => !v)}
                        className="flex items-center space-x-1 px-3 py-2 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-all duration-200"
                      >
                        <span>Solutions</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {solutionsOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="grid grid-cols-3 gap-6">
                            {solutionCategories.map((cat) => (
                              <div key={cat.title}>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">{cat.title}</h4>
                                <div className="space-y-0.5">
                                  {cat.items.map((item) => (
                                    <button
                                      key={item.path}
                                      onClick={() => handleNavigation(item.path)}
                                      className="flex items-center space-x-2.5 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 text-left group w-full"
                                    >
                                      <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                                        <item.icon className="w-4 h-4" />
                                      </div>
                                      <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors">{item.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <button
                              onClick={() => handleNavigation('/solutions')}
                              className="flex items-center space-x-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors px-2"
                            >
                              <span>View all solutions</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Use Cases dropdown */}
                    <div
                      className="relative"
                      ref={useCasesRef}
                      onMouseEnter={() => setUseCasesOpen(true)}
                      onMouseLeave={() => setUseCasesOpen(false)}
                    >
                      <button
                        onClick={() => setUseCasesOpen((v) => !v)}
                        className="flex items-center space-x-1 px-3 py-2 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-all duration-200"
                      >
                        <span>Use Cases</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${useCasesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {useCasesOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="grid grid-cols-2 gap-0.5">
                            {useCaseItems.map((item) => (
                              <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className="flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left group"
                              >
                                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-gray-700 group-hover:text-teal-600 transition-colors">{item.label}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <button
                              onClick={() => handleNavigation('/use-cases')}
                              className="flex items-center space-x-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors px-2"
                            >
                              <span>View all use cases</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Free Tools dropdown */}
                    <div
                      className="relative"
                      ref={toolsRef}
                      onMouseEnter={() => setToolsOpen(true)}
                      onMouseLeave={() => setToolsOpen(false)}
                    >
                      <button
                        onClick={() => setToolsOpen((v) => !v)}
                        className="flex items-center space-x-1 px-3 py-2 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-all duration-200"
                      >
                        <span>Free Tools</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {toolsOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                          {toolsItems.map((item) => (
                            <button
                              key={item.path}
                              onClick={() => handleNavigation(item.path)}
                              className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left group w-full"
                            >
                              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                                <item.icon className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{item.label}</div>
                                <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Resources dropdown */}
                    <div
                      className="relative"
                      ref={resourcesRef}
                      onMouseEnter={() => setResourcesOpen(true)}
                      onMouseLeave={() => setResourcesOpen(false)}
                    >
                      <button
                        onClick={() => setResourcesOpen((v) => !v)}
                        className="flex items-center space-x-1 px-3 py-2 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-all duration-200"
                      >
                        <span>Resources</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {resourcesOpen && (
                        <div className="absolute right-0 mt-2 w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                          {resourceItems.map((item) => (
                            <button
                              key={item.path}
                              onClick={() => handleNavigation(item.path)}
                              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left group w-full"
                            >
                              <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-gray-700 group-hover:text-teal-600 transition-colors">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleNavigation('/pricing')}
                      className="px-3 py-2 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-all duration-200"
                    >
                      Pricing
                    </button>
                  </nav>

                  {/* Start Free CTA */}
                  <button
                    onClick={handleLogin}
                    className="hidden md:flex items-center space-x-1.5 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
                  >
                    <span>Start Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Mobile: Login button + menu toggle */}
                  <button
                    onClick={handleLogin}
                    className="md:hidden flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-bold shadow-md"
                  >
                    <span>Start Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                    aria-label="Open menu"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu - Logged In */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen && user ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-t border-gray-200/60 py-3 space-y-1">
              <button
                onClick={() => { handleNavigation('/dashboard'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <FileIcon className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-semibold text-sm">Dashboard</span>
              </button>
              <button
                onClick={() => { handleNavigation('/your-sign'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-teal-600" />
                </div>
                <span className="font-semibold text-sm">Your Sign</span>
              </button>
              <button
                onClick={() => { handleNavigation('/billing'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-cyan-600" />
                </div>
                <span className="font-semibold text-sm">Billing</span>
              </button>
              <button
                onClick={() => { handleNavigation('/blog'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-semibold text-sm">Blog</span>
              </button>
              <button
                onClick={() => { handleNavigation('/contacts'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <span className="font-semibold text-sm">Contacts</span>
              </button>
              <button
                onClick={() => { handleProfile(); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-semibold text-sm">Profile</span>
              </button>
              <div className="mx-4 border-t border-gray-200/60" />
              <button
                onClick={() => { handleLogoutAndRedirect(); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <span className="font-semibold text-sm">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Logged Out */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen && !user ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-t border-gray-200/60 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {/* Solutions section */}
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Solutions</span>
                <button onClick={() => { handleNavigation('/solutions'); setMobileMenuOpen(false); }} className="text-xs font-semibold text-emerald-600">View all</button>
              </div>
              {solutionCategories[0].items.slice(0, 3).concat(solutionCategories[1].items.slice(0, 2)).map((item) => (
                <button
                  key={item.path}
                  onClick={() => { handleNavigation(item.path); setMobileMenuOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-left text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              ))}

              <div className="mx-4 border-t border-gray-200/60 my-2" />

              {/* Use Cases section */}
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Use Cases</span>
                <button onClick={() => { handleNavigation('/use-cases'); setMobileMenuOpen(false); }} className="text-xs font-semibold text-emerald-600">View all</button>
              </div>
              {useCaseItems.slice(0, 4).map((item) => (
                <button
                  key={item.path}
                  onClick={() => { handleNavigation(item.path); setMobileMenuOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-left text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              ))}

              <div className="mx-4 border-t border-gray-200/60 my-2" />

              {/* Free Tools section */}
              <div className="px-4 py-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Free Tools</span>
              </div>
              {toolsItems.slice(0, 3).map((item) => (
                <button
                  key={item.path}
                  onClick={() => { handleNavigation(item.path); setMobileMenuOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-left text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              ))}

              <div className="mx-4 border-t border-gray-200/60 my-2" />

              {/* Resources section */}
              <div className="px-4 py-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Resources</span>
              </div>
              {resourceItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { handleNavigation(item.path); setMobileMenuOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-left text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              ))}

              <div className="mx-4 border-t border-gray-200/60 my-2" />

              <button
                onClick={() => { handleNavigation('/pricing'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-semibold text-sm">Pricing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
