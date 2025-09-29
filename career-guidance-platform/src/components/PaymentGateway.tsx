'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, 
  Shield, 
  Lock, 
  CheckCircle, 
  X, 
  Loader,
  Crown,
  ArrowLeft,
  AlertCircle
} from 'lucide-react'

interface PaymentGatewayProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  selectedPlan: 'monthly' | 'annual'
}

interface PaymentFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  email: string
  billingAddress: string
  city: string
  zipCode: string
  country: string
}

export default function PaymentGateway({ isOpen, onClose, onSuccess, selectedPlan }: PaymentGatewayProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'United States'
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({})

  const plans = {
    monthly: {
      name: 'Premium Monthly',
      price: '$9.99',
      period: 'per month',
      originalPrice: null,
      savings: null
    },
    annual: {
      name: 'Premium Annual',
      price: '$79.99',
      period: 'per year',
      originalPrice: '$119.88',
      savings: 'Save 33%'
    }
  }

  const currentPlan = plans[selectedPlan]

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {}

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number'
    }

    if (!formData.expiryDate || formData.expiryDate.length < 5) {
      newErrors.expiryDate = 'Please enter a valid expiry date'
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV'
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter cardholder name'
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Please enter billing address'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter city'
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Please enter zip code'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    let formattedValue = value

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/gi, '').substring(0, 4)
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)
    setPaymentStatus('processing')

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate payment success (80% success rate for demo)
      const isSuccess = Math.random() > 0.2
      
      if (isSuccess) {
        setPaymentStatus('success')
        setTimeout(() => {
          onSuccess()
          onClose()
        }, 2000)
      } else {
        setPaymentStatus('error')
      }
    } catch (error) {
      setPaymentStatus('error')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-3">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Complete Your Purchase</h2>
                <p className="text-sm text-secondary-600">Secure payment powered by Stripe</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Payment Status */}
          <AnimatePresence>
            {paymentStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-green-50 border-b border-green-200 p-6"
              >
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Payment Successful!</h3>
                    <p className="text-green-700">Welcome to Premium Analytics. Redirecting...</p>
                  </div>
                </div>
              </motion.div>
            )}

            {paymentStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border-b border-red-200 p-6"
              >
                <div className="flex items-center">
                  <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900">Payment Failed</h3>
                    <p className="text-red-700">Please check your payment information and try again.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-6">
            {/* Plan Summary */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mb-6 border border-primary-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{currentPlan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-primary-600">{currentPlan.price}</span>
                    <span className="text-secondary-600 ml-2">{currentPlan.period}</span>
                  </div>
                  {currentPlan.originalPrice && (
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-secondary-500 line-through mr-2">{currentPlan.originalPrice}</span>
                      <span className="text-sm font-semibold text-green-600">{currentPlan.savings}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-green-600 mb-1">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Instant Access
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Cancel Anytime
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-6">
              {/* Card Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary-600" />
                  Payment Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                      maxLength={19}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                      }`}
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.cvv ? 'border-red-300' : 'border-gray-300'
                      }`}
                      maxLength={4}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.cardholderName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardholderName && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      placeholder="123 Main Street"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.billingAddress ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.billingAddress && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="New York"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.city ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="10001"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.zipCode ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Secure Payment</h4>
                    <p className="text-sm text-secondary-600">
                      Your payment information is encrypted and processed securely by Stripe. 
                      We never store your card details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="pt-4">
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Complete Payment • {currentPlan.price}
                    </div>
                  )}
                </button>
                
                <p className="text-xs text-secondary-500 text-center mt-3">
                  By completing this payment, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
