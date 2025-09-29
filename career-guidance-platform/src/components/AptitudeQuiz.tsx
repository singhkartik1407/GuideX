'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  BookOpen, 
  Target, 
  Users, 
  Code, 
  Palette, 
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
  Crown
} from 'lucide-react'
import { usePremiumStore } from '@/store/premiumStore'
import PremiumAnalyticsPreview from './PremiumAnalyticsPreview'
import PremiumQuizModule from './PremiumQuizModule'
import AnalyticsDashboard from './AnalyticsDashboard'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  weights: {
    science: number
    arts: number
    commerce: number
    vocational: number
  }
}

interface QuizResult {
  stream: string
  confidence: number
  description: string
  careers: string[]
  colleges: string[]
}

type QuizView = 'basic' | 'premium-preview' | 'premium-quiz' | 'analytics-dashboard'

export default function AptitudeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [currentView, setCurrentView] = useState<QuizView>('basic')
  const [scores, setScores] = useState({
    science: 0,
    arts: 0,
    commerce: 0,
    vocational: 0
  })

  // Premium store
  const {
    isPremiumUser,
    premiumQuizData,
    setHasCompletedBasicQuiz,
    updatePremiumQuizData,
    setShowPremiumPreview,
    setPremiumStatus
  } = usePremiumStore()

  const questions: Question[] = [
    {
      id: 1,
      category: 'Academic Interest',
      question: 'Which subject do you enjoy studying the most?',
      options: ['Mathematics and Science', 'Literature and Languages', 'Business and Economics', 'Technology and Computers'],
      weights: { science: 3, arts: 1, commerce: 2, vocational: 2 }
    },
    {
      id: 2,
      category: 'Problem Solving',
      question: 'How do you prefer to solve problems?',
      options: ['Using logical reasoning and analysis', 'Creative thinking and imagination', 'Practical solutions and planning', 'Technical and systematic approach'],
      weights: { science: 3, arts: 2, commerce: 2, vocational: 3 }
    },
    {
      id: 3,
      category: 'Work Environment',
      question: 'What type of work environment appeals to you?',
      options: ['Research labs and academic settings', 'Creative studios and artistic spaces', 'Corporate offices and business centers', 'Technical workshops and industrial settings'],
      weights: { science: 3, arts: 3, commerce: 2, vocational: 2 }
    },
    {
      id: 4,
      category: 'Future Goals',
      question: 'What is your primary career goal?',
      options: ['Research and innovation', 'Creative expression and communication', 'Business leadership and management', 'Technical expertise and craftsmanship'],
      weights: { science: 3, arts: 3, commerce: 3, vocational: 3 }
    },
    {
      id: 5,
      category: 'Learning Style',
      question: 'How do you learn best?',
      options: ['Through experiments and hands-on practice', 'Through discussion and creative projects', 'Through case studies and real-world examples', 'Through technical training and skill development'],
      weights: { science: 3, arts: 2, commerce: 2, vocational: 3 }
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults(newAnswers)
      setShowResults(true)
      setHasCompletedBasicQuiz(true)
      
      // Show premium preview after basic quiz completion
      setTimeout(() => {
        setCurrentView('premium-preview')
      }, 2000)
    }
  }

  const calculateResults = (finalAnswers: number[]) => {
    let newScores = { science: 0, arts: 0, commerce: 0, vocational: 0 }
    
    finalAnswers.forEach((answer, index) => {
      const question = questions[index]
      const weights = question.weights
      
      // Add weights based on answer
      Object.keys(weights).forEach((stream) => {
        newScores[stream as keyof typeof newScores] += weights[stream as keyof typeof weights]
      })
    })
    
    setScores(newScores)
  }

  const getResults = (): QuizResult => {
    const maxScore = Math.max(...Object.values(scores))
    const stream = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) || 'science'
    
    const results: { [key: string]: QuizResult } = {
      science: {
        stream: 'Science Stream',
        confidence: Math.round((maxScore / 15) * 100),
        description: 'You have a strong analytical mind and enjoy problem-solving. Science stream will help you develop critical thinking and research skills.',
        careers: ['Data Scientist', 'Research Scientist', 'Engineer', 'Doctor', 'Professor'],
        colleges: ['Delhi University', 'IITs', 'NITs', 'BHU', 'JNU']
      },
      arts: {
        stream: 'Arts Stream',
        confidence: Math.round((maxScore / 15) * 100),
        description: 'You have creative talents and strong communication skills. Arts stream will nurture your creativity and expression.',
        careers: ['Journalist', 'Writer', 'Designer', 'Teacher', 'Social Worker'],
        colleges: ['Delhi University', 'JNU', 'BHU', 'AMU', 'JMI']
      },
      commerce: {
        stream: 'Commerce Stream',
        confidence: Math.round((maxScore / 15) * 100),
        description: 'You have business acumen and organizational skills. Commerce stream will prepare you for business and finance careers.',
        careers: ['Accountant', 'Business Analyst', 'Banker', 'Entrepreneur', 'Financial Advisor'],
        colleges: ['Delhi University', 'BHU', 'AMU', 'JMI', 'DU Colleges']
      },
      vocational: {
        stream: 'Vocational Stream',
        confidence: Math.round((maxScore / 15) * 100),
        description: 'You prefer practical skills and hands-on learning. Vocational stream will give you specialized technical skills.',
        careers: ['Technician', 'Craftsman', 'Technologist', 'Skilled Worker', 'Technical Specialist'],
        colleges: ['ITIs', 'Polytechnics', 'Technical Institutes', 'Skill Centers']
      }
    }
    
    return results[stream]
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setCurrentView('basic')
    setScores({ science: 0, arts: 0, commerce: 0, vocational: 0 })
  }

  const handlePremiumUpgrade = () => {
    // Directly grant premium access and go to quiz
    setPremiumStatus(true)
    setCurrentView('premium-quiz')
  }

  const handlePremiumQuizComplete = (results: any) => {
    updatePremiumQuizData(results)
    setCurrentView('analytics-dashboard')
  }

  const handleSkipPremium = () => {
    setShowPremiumPreview(true)
    setCurrentView('basic')
  }

  const handleBackToBasicQuiz = () => {
    setCurrentView('basic')
    resetQuiz()
    // Reset premium state to ensure fresh start
    setPremiumStatus(false)
    updatePremiumQuizData(null)
    setHasCompletedBasicQuiz(false)
    setShowPremiumPreview(false)
  }

  // If user is premium and has completed premium quiz, show dashboard
  if (isPremiumUser && premiumQuizData && currentView === 'basic') {
    return <AnalyticsDashboard quizResults={premiumQuizData} onBackToQuiz={handleBackToBasicQuiz} />
  }

  // Handle different views
  if (currentView === 'premium-preview') {
    return (
      <PremiumAnalyticsPreview 
        onUpgrade={handlePremiumUpgrade}
        onSkip={handleSkipPremium}
      />
    )
  }

  if (currentView === 'premium-quiz') {
    return (
      <PremiumQuizModule 
        onComplete={handlePremiumQuizComplete}
        onBack={() => setCurrentView('premium-preview')}
        onBackToQuiz={handleBackToBasicQuiz}
      />
    )
  }

  if (currentView === 'analytics-dashboard' && premiumQuizData) {
    return <AnalyticsDashboard quizResults={premiumQuizData} onBackToQuiz={handleBackToBasicQuiz} />
  }


  if (showResults) {
    const result = getResults()
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Aptitude Results</h1>
          <p className="text-gray-600 text-lg">Based on your responses, here's what we recommend:</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Result */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{result.stream}</h2>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-lg font-semibold text-green-600">{result.confidence}% Match</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-center mb-6">{result.description}</p>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Recommended Careers:</h3>
              <div className="flex flex-wrap gap-2">
                {result.careers.map((career, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(scores).map(([stream, score]) => (
                <div key={stream} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 capitalize">{stream}</span>
                    <span className="text-sm text-gray-500">{score}/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        score === Math.max(...Object.values(scores)) 
                          ? 'bg-primary-600' 
                          : 'bg-gray-300'
                      }`}
                      style={{ width: `${(score / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-gray-900">Top Colleges:</h3>
              <div className="space-y-2">
                {result.colleges.map((college, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">{college}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button onClick={resetQuiz} className="btn-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retake Quiz
          </button>
          <button className="btn-primary">
            Explore Colleges
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </motion.div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Aptitude & Interest Quiz</h1>
        <p className="text-gray-600 text-lg">
          Answer these questions to discover your ideal career path and recommended colleges
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm text-gray-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="card"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            {currentQ.category}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentQ.question}</h2>
        </div>

        <div className="space-y-4">
          {currentQ.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(index)}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <span className="font-medium text-gray-900">{option}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {currentQuestion > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="btn-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Question
          </button>
        </div>
      )}
    </div>
  )
}
