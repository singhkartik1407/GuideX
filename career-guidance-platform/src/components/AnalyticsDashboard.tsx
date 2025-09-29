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
  ArrowLeft,
  BookOpen,
  MapPin,
  Calendar,
  Lightbulb,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import PerformanceMeter from './PerformanceMeter'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'

interface ExtendedQuizResults {
  overallScore: number
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
  strengths: string[]
  recommendations: string[]
  careerMatches: Array<{
    career: string
    match: number
    reasoning: string
  }>
}

interface AnalyticsDashboardProps {
  quizResults: ExtendedQuizResults
  onBackToQuiz?: () => void
}

interface CareerRecommendation {
  id: string
  title: string
  match: number
  salary: {
    min: number
    max: number
    currency: string
  }
  growth: number
  description: string
  skills: string[]
  education: string[]
  companies: string[]
  icon: any
}

export default function AnalyticsDashboard({ quizResults, onBackToQuiz }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Mock data for charts and analytics
  const progressData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 72 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 78 },
    { month: 'Jun', score: quizResults.overallScore }
  ]

  const industryDistribution = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Healthcare', value: 25, color: '#10b981' },
    { name: 'Finance', value: 20, color: '#f59e0b' },
    { name: 'Education', value: 15, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' }
  ]

  const skillTrends = [
    { skill: 'Analytical Thinking', current: 85, market: 78, trend: 'up' },
    { skill: 'Communication', current: 72, market: 82, trend: 'up' },
    { skill: 'Technical Skills', current: 68, market: 85, trend: 'up' },
    { skill: 'Leadership', current: 75, market: 70, trend: 'up' },
    { skill: 'Creativity', current: 80, market: 65, trend: 'stable' }
  ]

  const careerRecommendations: CareerRecommendation[] = [
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      match: 92,
      salary: { min: 85000, max: 150000, currency: 'USD' },
      growth: 15.2,
      description: 'Analyze complex data to help organizations make better decisions',
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      education: ['Bachelor\'s in Computer Science', 'Master\'s in Data Science'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
      icon: BarChart3
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      match: 88,
      salary: { min: 90000, max: 160000, currency: 'USD' },
      growth: 12.8,
      description: 'Lead product development and strategy for digital products',
      skills: ['Strategic Planning', 'User Research', 'Analytics', 'Communication'],
      education: ['MBA', 'Business Administration', 'Computer Science'],
      companies: ['Apple', 'Google', 'Spotify', 'Uber'],
      icon: Target
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      match: 85,
      salary: { min: 70000, max: 120000, currency: 'USD' },
      growth: 18.5,
      description: 'Create intuitive and engaging user experiences for digital products',
      skills: ['User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
      education: ['Design Degree', 'HCI', 'Psychology', 'Computer Science'],
      companies: ['Adobe', 'Figma', 'Airbnb', 'Netflix'],
      icon: Users
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'careers', label: 'Career Matches', icon: Target },
    { id: 'insights', label: 'Insights', icon: Lightbulb }
  ]

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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Results</h3>
          <p className="text-secondary-600">Generating personalized insights...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-4">
            <Award className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-700 font-semibold">Premium Analytics</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Career Analytics Dashboard
          </h1>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Comprehensive insights into your strengths, career potential, and personalized recommendations
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg border border-primary-100"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{quizResults.overallScore}%</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Overall Score</h3>
                  <p className="text-secondary-600 text-sm">Your comprehensive assessment result</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-green-600">{careerRecommendations.length}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Career Matches</h3>
                  <p className="text-secondary-600 text-sm">Personalized career recommendations</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-purple-600">{quizResults.strengths.length}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Key Strengths</h3>
                  <p className="text-secondary-600 text-sm">Identified core competencies</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-orange-600">85%</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Market Demand</h3>
                  <p className="text-secondary-600 text-sm">Industry alignment score</p>
                </motion.div>
              </div>

              {/* Progress Chart */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                  Progress Over Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#progressGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Industry Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-primary-600" />
                    Industry Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={industryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {industryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
                    Skill vs Market Demand
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={skillTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="skill" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Bar dataKey="current" fill="#3b82f6" name="Your Score" />
                      <Bar dataKey="market" fill="#10b981" name="Market Avg" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <PerformanceMeter 
              categoryScores={quizResults.categoryScores}
              overallScore={quizResults.overallScore}
            />
          )}

          {activeTab === 'careers' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Recommendations</h2>
                <p className="text-secondary-600 text-lg">
                  Based on your assessment results, here are the top career paths that align with your strengths and interests
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {careerRecommendations.map((career, index) => {
                  const Icon = career.icon
                  return (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">{career.match}%</div>
                          <div className="text-sm text-secondary-600">Match</div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{career.title}</h3>
                      <p className="text-secondary-600 text-sm mb-4">{career.description}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-secondary-600">Salary Range</span>
                          <span className="text-sm font-semibold text-gray-900">
                            ${career.salary.min.toLocaleString()} - ${career.salary.max.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-secondary-600">Growth Rate</span>
                          <span className="text-sm font-semibold text-green-600">+{career.growth}%</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {career.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Top Companies</h4>
                        <div className="flex flex-wrap gap-1">
                          {career.companies.map((company, companyIndex) => (
                            <span key={companyIndex} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                        Learn More
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Personalized Insights</h2>
                <p className="text-secondary-600 text-lg">
                  AI-powered analysis of your assessment results with actionable recommendations
                </p>
              </div>

              {/* Strengths */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Your Key Strengths
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizResults.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-green-800">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary-100 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-orange-500" />
                  Development Recommendations
                </h3>
                <div className="space-y-4">
                  {quizResults.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <ArrowRight className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-blue-800">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Items */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary-600" />
                  Next Steps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Explore Courses</h4>
                    <p className="text-sm text-secondary-600">Find courses that match your career goals</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Browse Colleges</h4>
                    <p className="text-sm text-secondary-600">Discover institutions that offer your desired programs</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">Plan Timeline</h4>
                    <p className="text-sm text-secondary-600">Create a roadmap for your academic journey</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer Navigation */}
        {onBackToQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-12 pt-8 border-t border-secondary-200"
          >
            <button
              onClick={onBackToQuiz}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to Aptitude Quiz
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
