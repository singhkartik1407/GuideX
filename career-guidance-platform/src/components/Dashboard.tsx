'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  BookOpen, 
  MapPin, 
  Calendar, 
  BookMarked, 
  Target,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Crown,
  BarChart3
} from 'lucide-react'

interface DashboardProps {
  onNavigateToPayment?: () => void
}

export default function Dashboard({ onNavigateToPayment }: DashboardProps = {}) {
  const [recommendations] = useState([
    {
      id: 1,
      type: 'stream',
      title: 'Science Stream',
      description: 'Based on your interests in mathematics and problem-solving',
      confidence: 85,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'college',
      title: 'Delhi University',
      description: 'Top government college with excellent BSc programs',
      confidence: 92,
      icon: MapPin,
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'career',
      title: 'Data Science',
      description: 'High-demand career path with great growth potential',
      confidence: 78,
      icon: Target,
      color: 'bg-purple-500'
    }
  ])

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'DU Admission Deadline',
      date: '2025-09-15',
      type: 'admission',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Scholarship Application',
      date: '2025-09-20',
      type: 'scholarship',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Entrance Test - JNU',
      date: '2025-09-25',
      type: 'exam',
      priority: 'high'
    }
  ])

  const [quickActions] = useState([
    { id: 1, title: 'Take Aptitude Quiz', icon: BookOpen, color: 'bg-blue-500' },
    { id: 2, title: 'Explore Colleges', icon: MapPin, color: 'bg-green-500' },
    { id: 3, title: 'Check Courses', icon: BookMarked, color: 'bg-purple-500' },
    { id: 4, title: 'View Timeline', icon: Calendar, color: 'bg-orange-500' }
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'admission': return Calendar
      case 'Courses': return BookMarked
      case 'exam': return BookOpen
      default: return Clock
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-bg rounded-xl p-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Rahul! 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Ready to explore your career path? Let's find the perfect government college for you.
        </p>
      </motion.div>

      {/* Premium Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Premium Analytics</h3>
              <p className="text-gray-600">Get detailed insights with our advanced assessment</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm text-gray-500">Advanced Assessment</div>
              <div className="text-sm font-semibold text-orange-600">150+ Questions</div>
            </div>
            <button 
              onClick={onNavigateToPayment}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Explore
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="card cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className={`${action.color} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">{action.title}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
            <TrendingUp className="w-5 h-5 text-primary-600" />
          </div>
          
          <div className="space-y-4">
            {recommendations.map((rec) => {
              const Icon = rec.icon
              return (
                <div key={rec.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`${rec.color} p-2 rounded-lg`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{rec.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-500">{rec.confidence}% match</span>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
            <Calendar className="w-5 h-5 text-primary-600" />
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const Icon = getEventIcon(event.type)
              return (
                <div key={event.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                    {event.priority}
                  </span>
                </div>
              )
            })}
          </div>
          
          <button className="w-full mt-4 btn-secondary flex items-center justify-center space-x-2">
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Profile Complete</h3>
            <p className="text-sm text-gray-600">100%</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Quiz Completed</h3>
            <p className="text-sm text-gray-600">1/1</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Colleges Shortlisted</h3>
            <p className="text-sm text-gray-600">3</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
