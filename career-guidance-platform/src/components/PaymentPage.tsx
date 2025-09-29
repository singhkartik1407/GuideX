'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Crown, 
  Star, 
  ArrowLeft, 
  ArrowRight,
  Shield,
  Zap,
  Target,
  BarChart3,
  Users,
  TrendingUp
} from 'lucide-react'

interface PaymentPageProps {
  onBack: () => void
  onProceedToPayment: (plan: 'monthly' | 'annual') => void
}

export default function PaymentPage({ onBack, onProceedToPayment }: PaymentPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual')

  const plans = [
    {
      id: 'monthly',
      name: 'Premium Monthly',
      price: '$9.99',
      period: 'per month',
      originalPrice: null,
      savings: null,
      popular: false,
      features: [
        'Advanced Assessment (150+ questions)',
        'Detailed Performance Analytics',
        'Career Mapping & Recommendations',
        'Industry Trends & Insights',
        'Peer Comparison Analytics',
        'AI-Powered Career Guidance',
        'Email Support'
      ]
    },
    {
      id: 'annual',
      name: 'Premium Annual',
      price: '$79.99',
      period: 'per year',
      originalPrice: '$119.88',
      savings: 'Save 33%',
      popular: true,
      features: [
        'Advanced Assessment (150+ questions)',
        'Detailed Performance Analytics',
        'Career Mapping & Recommendations',
        'Industry Trends & Insights',
        'Peer Comparison Analytics',
        'AI-Powered Career Guidance',
        'Priority Support',
        'Export Reports',
        'Advanced Analytics Dashboard',
        'Career Development Tracking'
      ]
    }
  ]

  const benefits = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive performance metrics and insights'
    },
    {
      icon: Target,
      title: 'Career Mapping',
      description: 'Personalized career paths and recommendations'
    },
    {
      icon: Users,
      title: 'Peer Comparison',
      description: 'Compare with similar students and benchmarks'
    },
    {
      icon: TrendingUp,
      title: 'Market Trends',
      description: 'Real-time industry insights and growth projections'
    }
  ]

  const currentPlan = plans.find(plan => plan.id === selectedPlan)!

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center text-secondary-600 hover:text-secondary-800 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-6">
            <Crown className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-700 font-semibold">Premium Analytics</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Unlock advanced career insights with our comprehensive assessment and analytics platform
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-secondary-600 text-sm">{benefit.description}</p>
              </div>
            )
          })}
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedPlan(plan.id as 'monthly' | 'annual')}
              className={`relative cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-xl scale-105'
                  : 'border-primary-200 bg-white hover:border-primary-300 shadow-lg hover:shadow-xl'
              } ${selectedPlan === plan.id ? 'ring-4 ring-primary-200' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-primary-600">{plan.price}</span>
                  <span className="text-secondary-600 ml-2">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="flex items-center justify-center">
                    <span className="text-lg text-secondary-500 line-through mr-2">{plan.originalPrice}</span>
                    <span className="text-lg font-semibold text-green-600">{plan.savings}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-secondary-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <div className={`w-6 h-6 rounded-full border-2 mx-auto ${
                  selectedPlan === plan.id 
                    ? 'border-primary-500 bg-primary-500' 
                    : 'border-secondary-300'
                }`}>
                  {selectedPlan === plan.id && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Security & Trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100 mb-12"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure & Trusted</h3>
            <p className="text-secondary-600">Your payment information is safe and secure</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">SSL Encrypted</h4>
              <p className="text-sm text-secondary-600">256-bit encryption</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Instant Access</h4>
              <p className="text-sm text-secondary-600">Immediate activation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Cancel Anytime</h4>
              <p className="text-sm text-secondary-600">No long-term commitment</p>
            </div>
          </div>
        </motion.div>

        {/* Payment Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
              <p className="text-secondary-600">
                You'll be redirected to our secure payment gateway to complete your purchase
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBack}
                className="px-8 py-3 text-secondary-600 hover:text-secondary-800 font-medium transition-colors duration-200"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => onProceedToPayment(selectedPlan)}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Crown className="w-5 h-5 mr-3" />
                Proceed to Payment
                <ArrowRight className="w-5 h-5 ml-3" />
              </button>
            </div>
            
            <p className="text-xs text-secondary-500 mt-4">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
