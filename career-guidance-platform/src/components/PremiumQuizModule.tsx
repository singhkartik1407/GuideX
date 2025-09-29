'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Target, 
  Users, 
  Code, 
  Palette, 
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  TrendingUp,
  Lightbulb,
  BarChart3,
  Zap
} from 'lucide-react'

interface ExtendedQuestion {
  id: number
  category: string
  subcategory: string
  question: string
  options: string[]
  weights: {
    cognitive: number
    personality: number
    technical: number
    leadership: number
    communication: number
    creativity: number
    analytical: number
    practical: number
  }
}

interface PremiumQuizModuleProps {
  onComplete: (results: ExtendedQuizResults) => void
  onBack: () => void
  onBackToQuiz: () => void
}

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

export default function PremiumQuizModule({ onComplete, onBack, onBackToQuiz }: PremiumQuizModuleProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const [quizResults, setQuizResults] = useState<ExtendedQuizResults | null>(null)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const extendedQuestions: ExtendedQuestion[] = [
    {
      id: 1,
      category: 'Cognitive Abilities',
      subcategory: 'Problem Solving',
      question: 'When faced with a complex problem, what is your preferred approach?',
      options: [
        'Break it down into smaller, manageable parts and analyze each systematically',
        'Look for patterns and connections that others might miss',
        'Seek input from others and collaborate to find solutions',
        'Use trial and error to explore different possibilities',
        'Apply established methodologies and frameworks'
      ],
      weights: { cognitive: 4, personality: 1, technical: 2, leadership: 2, communication: 1, creativity: 2, analytical: 4, practical: 3 }
    },
    {
      id: 2,
      category: 'Personality Traits',
      subcategory: 'Work Style',
      question: 'How do you prefer to structure your workday?',
      options: [
        'Deep focus sessions with minimal interruptions',
        'Flexible schedule adapting to energy levels',
        'Structured blocks with regular breaks',
        'Collaborative sessions mixed with independent work',
        'Deadline-driven with bursts of intense productivity'
      ],
      weights: { cognitive: 1, personality: 4, technical: 1, leadership: 2, communication: 2, creativity: 2, analytical: 1, practical: 3 }
    },
    {
      id: 3,
      category: 'Technical Skills',
      subcategory: 'Learning Approach',
      question: 'When learning a new technical skill, you prefer to:',
      options: [
        'Start with theoretical foundations and build up',
        'Jump into hands-on practice immediately',
        'Follow structured tutorials and documentation',
        'Experiment and learn through trial and error',
        'Learn from others through mentorship or collaboration'
      ],
      weights: { cognitive: 2, personality: 1, technical: 4, leadership: 1, communication: 2, creativity: 2, analytical: 3, practical: 3 }
    },
    {
      id: 4,
      category: 'Leadership',
      subcategory: 'Team Dynamics',
      question: 'In a team project, you naturally tend to:',
      options: [
        'Take initiative and guide the overall direction',
        'Support team members and ensure everyone contributes',
        'Focus on delivering high-quality work in your area',
        'Facilitate communication and resolve conflicts',
        'Bring innovative ideas and creative solutions'
      ],
      weights: { cognitive: 1, personality: 2, technical: 1, leadership: 4, communication: 3, creativity: 2, analytical: 1, practical: 2 }
    },
    {
      id: 5,
      category: 'Communication',
      subcategory: 'Presentation Style',
      question: 'When presenting ideas to others, you prefer to:',
      options: [
        'Use data and evidence to support your points',
        'Tell stories and use analogies to illustrate concepts',
        'Create visual aids and interactive presentations',
        'Engage in dialogue and encourage questions',
        'Focus on practical applications and real-world examples'
      ],
      weights: { cognitive: 2, personality: 2, technical: 1, leadership: 2, communication: 4, creativity: 3, analytical: 3, practical: 2 }
    },
    {
      id: 6,
      category: 'Creativity',
      subcategory: 'Innovation',
      question: 'Your approach to generating new ideas is:',
      options: [
        'Systematic brainstorming with structured techniques',
        'Free-flowing exploration without constraints',
        'Combining existing concepts in novel ways',
        'Observing problems and finding unique solutions',
        'Collaborating with diverse perspectives'
      ],
      weights: { cognitive: 2, personality: 2, technical: 2, leadership: 1, communication: 2, creativity: 4, analytical: 1, practical: 2 }
    },
    {
      id: 7,
      category: 'Analytical Thinking',
      subcategory: 'Data Processing',
      question: 'When analyzing information, you tend to:',
      options: [
        'Focus on quantitative data and statistical patterns',
        'Look for qualitative insights and underlying themes',
        'Compare multiple sources and perspectives',
        'Identify cause-and-effect relationships',
        'Synthesize information into actionable insights'
      ],
      weights: { cognitive: 3, personality: 1, technical: 2, leadership: 1, communication: 1, creativity: 1, analytical: 4, practical: 3 }
    },
    {
      id: 8,
      category: 'Practical Skills',
      subcategory: 'Implementation',
      question: 'When implementing a solution, you prioritize:',
      options: [
        'Efficiency and optimization of processes',
        'User experience and practical usability',
        'Scalability and long-term sustainability',
        'Cost-effectiveness and resource management',
        'Quality and attention to detail'
      ],
      weights: { cognitive: 1, personality: 1, technical: 3, leadership: 2, communication: 1, creativity: 1, analytical: 2, practical: 4 }
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)
    
    if (currentQuestion < extendedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateExtendedResults(newAnswers)
    }
  }

  const calculateExtendedResults = (finalAnswers: number[]) => {
    let categoryScores = {
      cognitive: 0,
      personality: 0,
      technical: 0,
      leadership: 0,
      communication: 0,
      creativity: 0,
      analytical: 0,
      practical: 0
    }
    
    finalAnswers.forEach((answer, index) => {
      const question = extendedQuestions[index]
      const weights = question.weights
      
      Object.keys(weights).forEach((category) => {
        categoryScores[category as keyof typeof categoryScores] += weights[category as keyof typeof weights]
      })
    })

    // Calculate overall score
    const totalPossible = Object.values(categoryScores).reduce((sum, score) => sum + score, 0)
    const overallScore = Math.round((Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / totalPossible) * 100)

    // Generate strengths based on top categories
    const sortedCategories = Object.entries(categoryScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
    
    const strengths = sortedCategories.map(([category]) => {
      const strengthMap: { [key: string]: string } = {
        cognitive: 'Strong analytical thinking and problem-solving abilities',
        personality: 'Excellent interpersonal skills and adaptability',
        technical: 'Advanced technical expertise and learning agility',
        leadership: 'Natural leadership qualities and team management skills',
        communication: 'Exceptional communication and presentation abilities',
        creativity: 'High creativity and innovative thinking',
        analytical: 'Superior data analysis and critical thinking skills',
        practical: 'Strong implementation and execution capabilities'
      }
      return strengthMap[category]
    })

    // Generate recommendations
    const recommendations = [
      'Consider roles that leverage your top strengths',
      'Focus on developing complementary skills',
      'Seek opportunities for continuous learning',
      'Build a professional network in your target industry'
    ]

    // Generate career matches
    const careerMatches = [
      {
        career: 'Data Scientist',
        match: Math.round((categoryScores.analytical + categoryScores.technical + categoryScores.cognitive) / 3),
        reasoning: 'Strong analytical and technical skills make you well-suited for data-driven roles'
      },
      {
        career: 'Product Manager',
        match: Math.round((categoryScores.leadership + categoryScores.communication + categoryScores.practical) / 3),
        reasoning: 'Leadership and communication abilities align well with product management'
      },
      {
        career: 'UX Designer',
        match: Math.round((categoryScores.creativity + categoryScores.communication + categoryScores.practical) / 3),
        reasoning: 'Creative thinking and practical skills are essential for user experience design'
      }
    ]

    const results: ExtendedQuizResults = {
      overallScore,
      categoryScores,
      strengths,
      recommendations,
      careerMatches
    }

    setQuizResults(results)
    setShowCompletion(true)
  }

  const currentQ = extendedQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / extendedQuestions.length) * 100

  // Show completion screen
  if (showCompletion && quizResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Assessment Complete!</h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Congratulations! You've completed the comprehensive premium assessment. Your detailed analytics are ready.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-primary-100 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">{quizResults.overallScore}%</div>
                <div className="text-sm text-secondary-600">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{quizResults.strengths.length}</div>
                <div className="text-sm text-secondary-600">Key Strengths</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{quizResults.careerMatches.length}</div>
                <div className="text-sm text-secondary-600">Career Matches</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Career Matches</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {quizResults.careerMatches.slice(0, 3).map((career, index) => (
                  <span key={index} className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {career.career} ({career.match}%)
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBackToQuiz}
                className="flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Assessment Page
              </button>
              <button
                onClick={() => onComplete(quizResults)}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Analytics Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-4">
          <Brain className="w-5 h-5 text-primary-600 mr-2" />
          <span className="text-primary-700 font-semibold">Premium Assessment</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Advanced Career Assessment
        </h1>
        <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
          This comprehensive assessment will provide detailed insights into your strengths, preferences, and career potential across multiple dimensions.
        </p>
      </div>

      {/* Progress and Timer */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-secondary-600">
              Question {currentQuestion + 1} of {extendedQuestions.length}
            </span>
            <div className="flex items-center text-sm text-secondary-600">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeElapsed)}
            </div>
          </div>
          <span className="text-sm font-medium text-primary-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-secondary-200 rounded-full h-3 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500 ease-out"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white/80 backdrop-blur-sm border border-primary-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Category Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            {currentQ.category} • {currentQ.subcategory}
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          <AnimatePresence>
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index)}
                className="group w-full text-left border-2 border-secondary-200 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-primary-300 hover:bg-primary-50/50 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-secondary-100 group-hover:bg-primary-100 rounded-full flex items-center justify-center mr-4 transition-colors duration-200">
                    <span className="text-sm font-medium text-secondary-600 group-hover:text-primary-600">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 group-hover:text-primary-900 transition-colors duration-200">
                    {option}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-3 text-secondary-600 hover:text-secondary-800 font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Preview
        </button>

        <div className="text-center">
          <div className="text-sm text-secondary-600 mb-1">Assessment Progress</div>
          <div className="flex items-center space-x-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index <= currentQuestion 
                    ? 'bg-primary-500' 
                    : 'bg-secondary-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-sm text-secondary-600">
          {extendedQuestions.length - currentQuestion - 1} questions remaining
        </div>
      </div>
    </div>
  )
}
