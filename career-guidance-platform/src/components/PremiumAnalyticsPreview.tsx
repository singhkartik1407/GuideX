'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle,
  Crown,
  Sparkles
} from 'lucide-react'

interface PremiumAnalyticsPreviewProps {
  onUpgrade: () => void
  onSkip: () => void
}

export default function PremiumAnalyticsPreview({ onUpgrade, onSkip }: PremiumAnalyticsPreviewProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const features = [
    {
      id: 'advanced-assessment',
      icon: Brain,
      title: 'Advanced Assessment',
      description: '150+ detailed questions across 8 comprehensive categories',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'performance-analytics',
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Detailed performance meters and progress tracking',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'career-mapping',
      icon: Target,
      title: 'Career Mapping',
      description: 'Personalized career paths with industry insights',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'market-trends',
      icon: TrendingUp,
      title: 'Market Trends',
      description: 'Real-time industry trends and salary insights',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'peer-comparison',
      icon: Users,
      title: 'Peer Comparison',
      description: 'Compare your profile with similar students',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'ai-recommendations',
      icon: Zap,
      title: 'AI Recommendations',
      description: 'Smart recommendations powered by machine learning',
      color: 'from-yellow-500 to-orange-600'
    }
  ]

  const premiumBenefits = [
    'Advanced Assessment (150+ questions)',
    'Detailed Performance Analytics',
    'Career Mapping & Recommendations',
    'Industry Trends & Insights',
    'Peer Comparison Analytics',
    'AI-Powered Career Guidance'
  ]

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-secondary-50/80" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      
      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-4">
            <Crown className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-700 font-semibold">Premium Analytics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
            Unlock Your Career Potential
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Get personalized insights with our Premium Analytics Dashboard featuring advanced assessments, detailed performance metrics, and AI-powered career recommendations.
          </p>
        </motion.div>
        
        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setIsHovered(feature.id)}
                onHoverEnd={() => setIsHovered(null)}
                className="group relative bg-white/80 backdrop-blur-sm border border-primary-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
                
                {/* Hover Effect */}
                {isHovered === feature.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 rounded-2xl -z-10"
                  />
                )}
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Premium Benefits */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlock Premium Features</h3>
            <p className="text-secondary-600">Get instant access to advanced career insights</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full mb-4">
                <Crown className="w-5 h-5 mr-2" />
                Premium Analytics
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Free Access</h4>
              <p className="text-secondary-600">Experience our premium features at no cost</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {premiumBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center p-3 bg-primary-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-primary-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Premium Assessment
              </span>
            </button>
          </div>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <button
            onClick={onSkip}
            className="px-6 py-3 text-secondary-600 hover:text-secondary-800 font-medium transition-colors duration-200"
          >
            Skip for now
          </button>
          <div className="text-secondary-400">|</div>
          <button
            onClick={onUpgrade}
            className="group flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Crown className="w-5 h-5 mr-2" />
            Unlock Premium Features
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
