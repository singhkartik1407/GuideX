'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Target, 
  Brain, 
  Users, 
  Zap, 
  Award,
  BarChart3,
  Activity,
  Star,
  ArrowRight,
  BookOpen,
  MapPin,
  Calendar,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Crown,
  ArrowLeft,
  Play
} from 'lucide-react'
import { usePremiumStore } from '@/store/premiumStore'
import PremiumAnalyticsPreview from './PremiumAnalyticsPreview'
import PremiumQuizModule from './PremiumQuizModule'
import AnalyticsDashboard from './AnalyticsDashboard'

export default function PremiumAnalytics() {
  const [currentView, setCurrentView] = useState<'overview' | 'preview' | 'quiz' | 'dashboard'>('overview')
  const [isLoading, setIsLoading] = useState(false)

  const {
    isPremiumUser,
    premiumQuizData,
    setPremiumStatus,
    updatePremiumQuizData,
    setHasCompletedBasicQuiz
  } = usePremiumStore()

  // If user has completed premium quiz, show dashboard
  useEffect(() => {
    if (isPremiumUser && premiumQuizData && currentView === 'overview') {
      setCurrentView('dashboard')
    }
  }, [isPremiumUser, premiumQuizData, currentView])

  const handleStartAssessment = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      setPremiumStatus(true)
      setIsLoading(false)
      setCurrentView('preview')
    }, 1000)
  }

  const handleUpgradeToPremium = () => {
    setCurrentView('quiz')
  }

  const handleQuizComplete = (results: any) => {
    updatePremiumQuizData(results)
    setCurrentView('dashboard')
  }

  const handleBackToOverview = () => {
    setCurrentView('overview')
  }

  const handleBackToQuiz = () => {
    setCurrentView('overview')
    // Reset premium state for fresh start
    setPremiumStatus(false)
    updatePremiumQuizData(null)
    setHasCompletedBasicQuiz(false)
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Preparing Assessment</h3>
          <p className="text-secondary-600">Setting up your premium analytics experience...</p>
        </motion.div>
      </div>
    )
  }

  // Show preview
  if (currentView === 'preview') {
    return (
      <PremiumAnalyticsPreview 
        onUpgrade={handleUpgradeToPremium}
        onSkip={handleBackToOverview}
      />
    )
  }

  // Show premium quiz
  if (currentView === 'quiz') {
    return (
      <PremiumQuizModule 
        onComplete={handleQuizComplete}
        onBack={() => setCurrentView('preview')}
        onBackToQuiz={handleBackToOverview}
      />
    )
  }

  // Show dashboard
  if (currentView === 'dashboard' && premiumQuizData) {
    return (
      <AnalyticsDashboard 
        quizResults={premiumQuizData} 
        onBackToQuiz={handleBackToQuiz}
      />
    )
  }

  // Show overview (default)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-6">
          <Crown className="w-5 h-5 text-primary-600 mr-2" />
          <span className="text-primary-700 font-semibold">Premium Analytics</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Advanced Career Analytics
        </h1>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          Unlock deep insights into your career potential with our comprehensive assessment and analytics platform
        </p>
      </motion.div>

      {/* Status Card */}
      {isPremiumUser && premiumQuizData ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-900">Assessment Complete</h3>
                <p className="text-green-700">Your premium analytics are ready to view</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              View Analytics
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900">Ready to Start</h3>
                <p className="text-primary-700">Begin your comprehensive career assessment</p>
              </div>
            </div>
            <button
              onClick={handleStartAssessment}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Assessment
            </button>
          </div>
        </motion.div>
      )}

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        {[
          {
            icon: Brain,
            title: 'Advanced Assessment',
            description: '150+ detailed questions across 8 comprehensive categories to analyze your career potential',
            color: 'from-blue-500 to-purple-600'
          },
          {
            icon: BarChart3,
            title: 'Performance Analytics',
            description: 'Detailed performance meters, progress tracking, and skill gap analysis',
            color: 'from-green-500 to-emerald-600'
          },
          {
            icon: Target,
            title: 'Career Mapping',
            description: 'Personalized career paths with industry insights and salary projections',
            color: 'from-orange-500 to-red-600'
          },
          {
            icon: TrendingUp,
            title: 'Market Trends',
            description: 'Real-time industry trends, job market analysis, and growth projections',
            color: 'from-purple-500 to-pink-600'
          },
          {
            icon: Users,
            title: 'Peer Comparison',
            description: 'Compare your profile with similar students and industry benchmarks',
            color: 'from-indigo-500 to-blue-600'
          },
          {
            icon: Zap,
            title: 'AI Recommendations',
            description: 'Smart career recommendations powered by machine learning algorithms',
            color: 'from-yellow-500 to-orange-600'
          }
        ].map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group bg-white/90 backdrop-blur-sm border border-primary-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-secondary-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100 mb-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Premium Analytics?</h2>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Get comprehensive insights that go beyond basic career guidance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              'Detailed personality and skills assessment',
              'Industry-specific career recommendations',
              'Salary projections and growth opportunities',
              'Learning path recommendations',
              'Market demand analysis'
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            {[
              'Peer comparison and benchmarking',
              'AI-powered career matching',
              'Detailed performance analytics',
              'Exportable reports and insights',
              'Ongoing career development tracking'
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      {!isPremiumUser && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Discover Your Career Potential?</h3>
            <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
              Take our comprehensive assessment and unlock detailed insights about your career path, skills, and opportunities.
            </p>
            <button
              onClick={handleStartAssessment}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Play className="w-5 h-5 mr-3" />
              Start Premium Assessment
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
