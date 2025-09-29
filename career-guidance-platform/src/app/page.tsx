'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Award, 
  User, 
  Menu, 
  X,
  Search,
  Bell,
  Crown,
  BarChart3
} from 'lucide-react'
import { usePremiumStore } from '@/store/premiumStore'
import AptitudeQuiz from '@/components/AptitudeQuiz'
import CourseMapping from '@/components/CourseMapping'
import CollegeDirectory from '@/components/CollegeDirectory'
import TimelineTracker from '@/components/TimelineTracker'
import ScholarshipPortal from '@/components/ScholarshipPortal'
import Dashboard from '@/components/Dashboard'
import AuthModal from '@/components/AuthModal'
import PremiumAnalytics from '@/components/PremiumAnalytics'
import PaymentPage from '@/components/PaymentPage'
import PaymentGateway from '@/components/PaymentGateway'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPaymentPage, setShowPaymentPage] = useState(false)
  const [showPaymentGateway, setShowPaymentGateway] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual')
  
  // Premium store
  const { isPremiumUser, setPremiumStatus } = usePremiumStore()

  const handleNavigateToPayment = () => {
    setShowPaymentPage(true)
  }

  const handleBackFromPayment = () => {
    setShowPaymentPage(false)
    setShowPaymentGateway(false)
  }

  const handleProceedToPayment = (plan: 'monthly' | 'annual') => {
    setSelectedPlan(plan)
    setShowPaymentGateway(true)
  }

  const handlePaymentSuccess = () => {
    setPremiumStatus(true)
    setShowPaymentGateway(false)
    setShowPaymentPage(false)
    setActiveTab('premium-analytics')
  }

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: User },
    { id: 'quiz', name: 'Aptitude Quiz', icon: BookOpen },
    { id: 'premium-analytics', name: 'Premium Analytics', icon: Crown },
    { id: 'courses', name: 'Course Mapping', icon: GraduationCap },
    { id: 'colleges', name: 'College Directory', icon: MapPin },
    { id: 'timeline', name: 'Timeline', icon: Calendar },
    { id: 'scholarships', name: 'Scholarships', icon: Award },
  ]

  const renderContent = () => {
    // Show payment page if it's open
    if (showPaymentPage) {
      return (
        <PaymentPage 
          onBack={handleBackFromPayment}
          onProceedToPayment={handleProceedToPayment}
        />
      )
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigateToPayment={handleNavigateToPayment} />
      case 'quiz':
        return <AptitudeQuiz />
      case 'premium-analytics':
        return <PremiumAnalytics />
      case 'courses':
        return <CourseMapping />
      case 'colleges':
        return <CollegeDirectory />
      case 'timeline':
        return <TimelineTracker />
      case 'scholarships':
        return <ScholarshipPortal />
      default:
        return <Dashboard onNavigateToPayment={handleNavigateToPayment} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  Career Guidance Platform
                </h1>
              </motion.div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search colleges, courses..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {!isLoggedIn ? (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-primary"
                >
                  Sign In
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 ${isPremiumUser ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-primary-100'} rounded-full flex items-center justify-center`}>
                    {isPremiumUser ? (
                      <Crown className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Student</span>
                    {isPremiumUser && (
                      <span className="text-xs text-orange-600 font-semibold">Premium</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen`}>
          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        item.id === 'premium-analytics'
                          ? activeTab === item.id
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-700 border-r-2 border-orange-500'
                            : 'text-orange-600 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:text-orange-700'
                          : activeTab === item.id
                            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={() => {
          setIsLoggedIn(true)
          setIsAuthModalOpen(false)
        }}
      />

      {/* Payment Gateway */}
      <PaymentGateway
        isOpen={showPaymentGateway}
        onClose={() => setShowPaymentGateway(false)}
        onSuccess={handlePaymentSuccess}
        selectedPlan={selectedPlan}
      />
    </div>
  )
}
