'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Award, 
  Search, 
  Filter, 
  DollarSign, 
  Users, 
  BookOpen,
  Calendar,
  CheckCircle,
  Star,
  ExternalLink,
  Download,
  Bookmark,
  Share2,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  MapPin
} from 'lucide-react'

interface Scholarship {
  id: string
  name: string
  provider: string
  amount: string
  type: 'merit' | 'need' | 'caste' | 'sports' | 'academic'
  category: string
  deadline: string
  eligibility: string[]
  requirements: string[]
  description: string
  applicationLink: string
  rating: number
  applications: number
  saved: boolean
}

export default function ScholarshipPortal() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    minAmount: '',
    maxAmount: '',
    deadline: ''
  })

  const scholarships: Scholarship[] = [
    {
      id: '1',
      name: 'National Merit Scholarship',
      provider: 'Ministry of Education',
      amount: '₹50,000/year',
      type: 'merit',
      category: 'Undergraduate',
      deadline: '2024-07-15',
      eligibility: ['Class 12 with 85%+', 'Family income < ₹8 LPA', 'Indian citizen'],
      requirements: ['Income certificate', 'Academic records', 'Aadhaar card'],
      description: 'Government scholarship for meritorious students from economically disadvantaged backgrounds.',
      applicationLink: 'https://scholarships.gov.in',
      rating: 4.8,
      applications: 15420,
      saved: false
    },
    {
      id: '2',
      name: 'SC/ST Post-Matric Scholarship',
      provider: 'Ministry of Social Justice',
      amount: '₹30,000/year',
      type: 'caste',
      category: 'All Levels',
      deadline: '2024-08-20',
      eligibility: ['SC/ST category', 'Class 12 completed', 'Admitted to college'],
      requirements: ['Caste certificate', 'Income certificate', 'Admission letter'],
      description: 'Scholarship for Scheduled Castes and Scheduled Tribes students.',
      applicationLink: 'https://socialjustice.gov.in',
      rating: 4.6,
      applications: 8920,
      saved: true
    },
    {
      id: '3',
      name: 'Delhi University Merit Scholarship',
      provider: 'Delhi University',
      amount: '₹25,000/year',
      type: 'merit',
      category: 'Undergraduate',
      deadline: '2024-06-30',
      eligibility: ['DU student', 'CGPA 8.0+', 'First generation learner'],
      requirements: ['DU ID card', 'Academic transcripts', 'Family background certificate'],
      description: 'Merit-based scholarship for outstanding DU students.',
      applicationLink: 'https://du.ac.in/scholarships',
      rating: 4.7,
      applications: 3240,
      saved: false
    },
    {
      id: '4',
      name: 'Sports Excellence Scholarship',
      provider: 'Sports Authority of India',
      amount: '₹40,000/year',
      type: 'sports',
      category: 'All Levels',
      deadline: '2024-07-10',
      eligibility: ['National level sports achievement', 'Class 12 completed', 'Active in sports'],
      requirements: ['Sports certificates', 'Medical certificate', 'Recommendation letter'],
      description: 'Scholarship for students with outstanding sports achievements.',
      applicationLink: 'https://sportsauthorityofindia.gov.in',
      rating: 4.5,
      applications: 1560,
      saved: false
    },
    {
      id: '5',
      name: 'Girl Child Scholarship',
      provider: 'Ministry of Women & Child Development',
      amount: '₹35,000/year',
      type: 'need',
      category: 'Undergraduate',
      deadline: '2024-08-05',
      eligibility: ['Female student', 'Class 12 with 75%+', 'Family income < ₹6 LPA'],
      requirements: ['Gender certificate', 'Income certificate', 'Academic records'],
      description: 'Empowering girl students through education support.',
      applicationLink: 'https://wcd.gov.in/scholarships',
      rating: 4.9,
      applications: 6780,
      saved: false
    },
    {
      id: '6',
      name: 'BHU Merit Scholarship',
      provider: 'Banaras Hindu University',
      amount: '₹20,000/year',
      type: 'merit',
      category: 'Undergraduate',
      deadline: '2024-07-25',
      eligibility: ['BHU student', 'CGPA 7.5+', 'Merit list rank'],
      requirements: ['BHU ID card', 'Academic transcripts', 'Merit certificate'],
      description: 'Merit-based scholarship for BHU undergraduate students.',
      applicationLink: 'https://bhu.ac.in/scholarships',
      rating: 4.4,
      applications: 2150,
      saved: false
    }
  ]

  const types = [
    { id: 'all', name: 'All Types', color: 'bg-gray-500' },
    { id: 'merit', name: 'Merit-Based', color: 'bg-blue-500' },
    { id: 'need', name: 'Need-Based', color: 'bg-green-500' },
    { id: 'caste', name: 'Caste-Based', color: 'bg-purple-500' },
    { id: 'sports', name: 'Sports', color: 'bg-orange-500' },
    { id: 'academic', name: 'Academic', color: 'bg-red-500' }
  ]

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || scholarship.type === selectedType
    const matchesAmount = !filters.minAmount || parseFloat(scholarship.amount.replace(/[^\d]/g, '')) >= parseFloat(filters.minAmount)
    
    return matchesSearch && matchesType && matchesAmount
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysUntil = (dateString: string) => {
    const today = new Date()
    const deadline = new Date(dateString)
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'Expired'
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `${diffDays} days`
  }

  const toggleSaved = (scholarshipId: string) => {
    // In a real app, this would update the backend
    console.log('Toggle saved for scholarship:', scholarshipId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Scholarship Portal</h1>
        <p className="text-gray-600 text-lg">
          Discover and apply for scholarships to support your education
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.name}
              </button>
            ))}
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount (₹)</label>
                <input
                  type="number"
                  value={filters.minAmount}
                  onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 20000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount (₹)</label>
                <input
                  type="number"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <select
                  value={filters.deadline}
                  onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
                  className="input-field"
                >
                  <option value="">Any Deadline</option>
                  <option value="7">Within 7 days</option>
                  <option value="30">Within 30 days</option>
                  <option value="60">Within 60 days</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scholarship List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {filteredScholarships.map((scholarship) => (
              <motion.div
                key={scholarship.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedScholarship(scholarship)}
                className={`card cursor-pointer transition-all ${
                  selectedScholarship?.id === scholarship.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{scholarship.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{scholarship.provider}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-600">{scholarship.amount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-600">{scholarship.rating}</span>
                        <div className="flex">{renderStars(scholarship.rating)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaved(scholarship.id)
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        scholarship.saved ? 'text-yellow-600 bg-yellow-100' : 'text-gray-400 hover:text-yellow-600'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-gray-600 text-sm">{scholarship.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                      {scholarship.type}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {scholarship.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Deadline: {formatDate(scholarship.deadline)}</div>
                    <div className="text-xs text-gray-400">{getDaysUntil(scholarship.deadline)} left</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scholarship Details */}
        <div className="lg:col-span-1">
          {selectedScholarship ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card sticky top-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedScholarship.name}</h2>
                <button
                  onClick={() => setSelectedScholarship(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Award className="w-4 h-4" />
                  <span>{selectedScholarship.provider}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(selectedScholarship.rating)}</div>
                  <span className="text-sm text-gray-600">({selectedScholarship.rating})</span>
                  <span className="text-sm text-gray-500">• {selectedScholarship.applications} applications</span>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Amount</h3>
                  <div className="text-2xl font-bold text-green-600">{selectedScholarship.amount}</div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Eligibility</h3>
                  <div className="space-y-2">
                    {selectedScholarship.eligibility.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                  <div className="space-y-2">
                    {selectedScholarship.requirements.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Deadline</span>
                    <span className="font-medium">{formatDate(selectedScholarship.deadline)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Time remaining</span>
                    <span className="font-medium text-red-600">{getDaysUntil(selectedScholarship.deadline)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <button className="w-full btn-primary flex items-center justify-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Apply Now</span>
                    </button>
                    <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download Guide</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="card text-center text-gray-500">
              <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a scholarship to view detailed information</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Scholarship Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Scholarships</h3>
            <p className="text-2xl font-bold text-blue-600">156</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Value</h3>
            <p className="text-2xl font-bold text-green-600">₹2.5Cr</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Active Applications</h3>
            <p className="text-2xl font-bold text-purple-600">45,230</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Deadlines This Month</h3>
            <p className="text-2xl font-bold text-orange-600">23</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
