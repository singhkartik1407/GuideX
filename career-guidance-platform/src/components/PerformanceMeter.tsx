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
  Activity
} from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'

interface PerformanceMeterProps {
  categoryScores: {
    cognitive: number
    personality: number
    technical: number
    leadership: number
    communication: number
    creativity: number
    analytical: number
    practical: number
  }
  overallScore: number
}

interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
  delay?: number
}

const CircularProgress = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 8, 
  color = '#3b82f6',
  label,
  delay = 0
}: CircularProgressProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [percentage, delay])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  const getColorClass = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-blue-500'
    if (score >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-secondary-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-2000 ease-out ${getColorClass(animatedPercentage)}`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${getColorClass(animatedPercentage)}`}>
          {Math.round(animatedPercentage)}%
        </span>
        {label && (
          <span className="text-xs text-secondary-600 font-medium">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}

export default function PerformanceMeter({ categoryScores, overallScore }: PerformanceMeterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Prepare data for radar chart
  const radarData = Object.entries(categoryScores).map(([category, score]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    score: Math.round((score / 40) * 100), // Normalize to 0-100
    fullMark: 100
  }))

  // Prepare data for bar chart
  const barData = Object.entries(categoryScores).map(([category, score]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    score: Math.round((score / 40) * 100),
  }))

  const categoryDetails = {
    cognitive: {
      icon: Brain,
      title: 'Cognitive Abilities',
      description: 'Your analytical thinking and problem-solving capabilities',
      color: 'from-blue-500 to-blue-600'
    },
    personality: {
      icon: Users,
      title: 'Personality Traits',
      description: 'Your interpersonal skills and work style preferences',
      color: 'from-green-500 to-green-600'
    },
    technical: {
      icon: Zap,
      title: 'Technical Skills',
      description: 'Your ability to learn and apply technical knowledge',
      color: 'from-purple-500 to-purple-600'
    },
    leadership: {
      icon: Target,
      title: 'Leadership',
      description: 'Your potential to guide and inspire others',
      color: 'from-orange-500 to-orange-600'
    },
    communication: {
      icon: Users,
      title: 'Communication',
      description: 'Your ability to express ideas and connect with others',
      color: 'from-pink-500 to-pink-600'
    },
    creativity: {
      icon: Award,
      title: 'Creativity',
      description: 'Your innovative thinking and creative problem-solving',
      color: 'from-yellow-500 to-yellow-600'
    },
    analytical: {
      icon: BarChart3,
      title: 'Analytical',
      description: 'Your data analysis and critical thinking skills',
      color: 'from-indigo-500 to-indigo-600'
    },
    practical: {
      icon: Activity,
      title: 'Practical Skills',
      description: 'Your implementation and execution capabilities',
      color: 'from-red-500 to-red-600'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981' // green-500
    if (score >= 60) return '#3b82f6' // blue-500
    if (score >= 40) return '#f59e0b' // orange-500
    return '#ef4444' // red-500
  }

  return (
    <div className="space-y-8">
      {/* Overall Performance Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Performance Analysis</h2>
        <p className="text-secondary-600 text-lg mb-8">
          Comprehensive assessment of your skills and potential across multiple dimensions
        </p>
        
        {/* Overall Score */}
        <div className="inline-flex items-center justify-center p-8 bg-white rounded-2xl shadow-lg border border-primary-100">
          <CircularProgress 
            percentage={overallScore}
            size={160}
            strokeWidth={12}
            label="Overall Score"
            delay={500}
          />
        </div>
      </motion.div>

      {/* Category Performance Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {Object.entries(categoryScores).map(([category, score], index) => {
          const details = categoryDetails[category as keyof typeof categoryDetails]
          const Icon = details.icon
          const normalizedScore = Math.round((score / 40) * 100)
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${details.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {details.title}
                </h3>
                
                <div className="mb-4">
                  <CircularProgress 
                    percentage={normalizedScore}
                    size={80}
                    strokeWidth={6}
                    delay={800 + index * 100}
                  />
                </div>
                
                <p className="text-sm text-secondary-600 leading-relaxed">
                  {details.description}
                </p>
                
                {selectedCategory === category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 bg-primary-50 rounded-lg"
                  >
                    <p className="text-xs text-primary-700">
                      <strong>Raw Score:</strong> {score}/40
                    </p>
                    <p className="text-xs text-primary-700">
                      <strong>Percentile:</strong> {normalizedScore}th percentile
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
            Skills Radar
          </h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dataKey="category"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#94a3b8', fontSize: 10 }}
              />
              <Radar 
                name="Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
            Performance Comparison
          </h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis 
                dataKey="category" 
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={{ stroke: '#e2e8f0' }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="score"
                radius={[4, 4, 0, 0]}
              >
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-primary-600" />
          Performance Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">
              {Math.max(...Object.values(categoryScores))}
            </div>
            <div className="text-sm text-secondary-600">Highest Category Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {Object.values(categoryScores).filter(score => (score / 40) * 100 >= 70).length}
            </div>
            <div className="text-sm text-secondary-600">Strong Areas</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {Object.values(categoryScores).filter(score => (score / 40) * 100 < 50).length}
            </div>
            <div className="text-sm text-secondary-600">Growth Areas</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
