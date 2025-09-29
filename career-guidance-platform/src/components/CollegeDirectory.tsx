'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  GraduationCap, 
  Users, 
  Wifi, 
  BookOpen,
  Home,
  Search,
  Filter,
  Star,
  Phone,
  Mail,
  Globe,
  Calendar,
  DollarSign,
  CheckCircle,
  X
} from 'lucide-react'

interface College {
  id: string
  name: string
  location: string
  type: 'university' | 'college' | 'institute'
  courses: string[]
  cutOff: string
  eligibility: string
  medium: string
  facilities: string[]
  rating: number
  fees: string
  admissionDate: string
  contact: {
    phone: string
    email: string
    website: string
  }
  description: string
  distance: string
}

export default function CollegeDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    maxDistance: '',
    maxFees: '',
    rating: '',
  })

  const colleges: College[] = [
    {
      id: 'iitj',
      name: 'Indian Institute of Technology Jammu',
      location: 'Jammu, Jammu and Kashmir',
      type: 'university',
      courses: ['BSc', 'BA', 'B.Tech', 'BBA', 'BCA'],
      cutOff: '95-100%',
      eligibility: 'Class 12 with 75%',
      medium: 'English/Hindi',
      facilities: ['Hostel', 'Library', 'Lab', 'Internet', 'Sports'],
      rating: 4.8,
      fees: '₹1,20,000/year',
      admissionDate: 'June 2025',
      contact: {
        phone: '+91-191-2601100',
        email: 'admission@iitjammu.ac.in',
        website: 'www.iitjammu.ac.in'
      },
      description: 'Premier university offering diverse undergraduate programs with excellent faculty and infrastructure.',
      distance: '2.5 km'
    },
    {
      id: 'uk',
      name: 'University of Kashmir',
      location: 'Srinagar, Jammu and Kashmir',
      type: 'university',
      courses: ['BSc', 'BA', 'LLB', 'MBA', 'BE'],
      cutOff: '80-90%',
      eligibility: 'Class 12 with 65%',
      medium: 'English/Hindi/Kashmiri',
      facilities: ['Hostel', 'Library', 'Lab', 'Internet', 'Medical'],
      rating: 4.6,
      fees: '₹25,000-1,20,000/year',
      admissionDate: 'August 2025',
      contact: {
        phone: '+91-194-2224422',
        email: 'info@uk.ac.in',
        website: 'www.uk.ac.in'
      },
      description: 'Ancient university with modern facilities, known for quality education and research.',
      distance: '15 km'
    },
    {
      id: 'jnu',
      name: 'Jawaharlal Nehru University',
      location: 'New Delhi, Delhi',
      type: 'university',
      courses: ['BA', 'BSc', 'BCom'],
      cutOff: '90-98%',
      eligibility: 'Class 12 with 70%',
      medium: 'English',
      facilities: ['Hostel', 'Library', 'Lab', 'Internet', 'Research Center'],
      rating: 4.9,
      fees: '₹20,000-30,000/year',
      admissionDate: 'July 2024',
      contact: {
        phone: '+91-11-2670-4000',
        email: 'info@jnu.ac.in',
        website: 'www.jnu.ac.in'
      },
      description: 'Leading research university with focus on social sciences and humanities.',
      distance: '8 km'
    },
    {
      id: 'amu',
      name: 'Aligarh Muslim University',
      location: 'Aligarh, Uttar Pradesh',
      type: 'university',
      courses: ['BSc', 'BA', 'BCom', 'BBA'],
      cutOff: '75-85%',
      eligibility: 'Class 12 with 50%',
      medium: 'English/Urdu',
      facilities: ['Hostel', 'Library', 'Lab', 'Internet', 'Sports'],
      rating: 4.4,
      fees: '₹10,000-18,000/year',
      admissionDate: 'June 2024',
      contact: {
        phone: '+91-571-270-0920',
        email: 'info@amu.ac.in',
        website: 'www.amu.ac.in'
      },
      description: 'Historic university with diverse student population and quality education.',
      distance: '25 km'
    },
    {
      id: 'jmi',
      name: 'Jamia Millia Islamia',
      location: 'New Delhi, Delhi',
      type: 'university',
      courses: ['BA', 'BCom', 'BBA', 'BCA'],
      cutOff: '80-90%',
      eligibility: 'Class 12 with 60%',
      medium: 'English/Hindi/Urdu',
      facilities: ['Hostel', 'Library', 'Lab', 'Internet', 'Sports'],
      rating: 4.5,
      fees: '₹12,000-22,000/year',
      admissionDate: 'June 2024',
      contact: {
        phone: '+91-11-2698-1717',
        email: 'info@jmi.ac.in',
        website: 'www.jmi.ac.in'
      },
      description: 'Central university with focus on minority education and social inclusion.',
      distance: '5 km'
    },
    {
      id: 'ignou',
      name: 'Indira Gandhi National Open University',
      location: 'New Delhi, Delhi',
      type: 'university',
      courses: ['BA', 'BCom', 'BBA', 'BCA'],
      cutOff: 'Open Admission',
      eligibility: 'Class 12 (any percentage)',
      medium: 'English/Hindi',
      facilities: ['Study Centers', 'Online Library', 'Digital Resources'],
      rating: 4.2,
      fees: '₹6,000-12,000/year',
      admissionDate: 'Rolling Admission',
      contact: {
        phone: '+91-11-2953-1000',
        email: 'info@ignou.ac.in',
        website: 'www.ignou.ac.in'
      },
      description: 'Distance learning university providing flexible education options.',
      distance: '3 km'
    }
  ]

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'university', name: 'Universities' },
    { id: 'college', name: 'Colleges' },
    { id: 'institute', name: 'Institutes' }
  ]

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || college.type === selectedType
    const matchesDistance = !filters.maxDistance || parseFloat(college.distance) <= parseFloat(filters.maxDistance)
    const matchesRating = !filters.rating || college.rating >= parseFloat(filters.rating)
    
    return matchesSearch && matchesType && matchesDistance && matchesRating
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Government College Directory</h1>
        <p className="text-gray-600 text-lg">
          Find the perfect government college near you with detailed information
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
                placeholder="Search colleges, courses, or locations..."
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Distance (km)</label>
                <input
                  type="number"
                  value={filters.maxDistance}
                  onChange={(e) => setFilters({ ...filters, maxDistance: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Fees (₹/year)</label>
                <input
                  type="number"
                  value={filters.maxFees}
                  onChange={(e) => setFilters({ ...filters, maxFees: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 25000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                  className="input-field"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* College List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {filteredColleges.map((college) => (
              <motion.div
                key={college.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedCollege(college)}
                className={`card cursor-pointer transition-all ${
                  selectedCollege?.id === college.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{college.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{college.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{college.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-600">{college.rating}</span>
                        <div className="flex">{renderStars(college.rating)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{college.distance}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-gray-600 text-sm">{college.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {college.courses.slice(0, 3).map((course, index) => (
                      <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                        {course}
                      </span>
                    ))}
                    {college.courses.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{college.courses.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{college.fees}</div>
                    <div className="text-xs text-gray-500">Cut-off: {college.cutOff}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* College Details */}
        <div className="lg:col-span-1">
          {selectedCollege ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card sticky top-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedCollege.name}</h2>
                <button
                  onClick={() => setSelectedCollege(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedCollege.location}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(selectedCollege.rating)}</div>
                  <span className="text-sm text-gray-600">({selectedCollege.rating})</span>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Available Courses</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollege.courses.map((course, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Cut-off:</span>
                    <div className="font-medium">{selectedCollege.cutOff}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Eligibility:</span>
                    <div className="font-medium">{selectedCollege.eligibility}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Medium:</span>
                    <div className="font-medium">{selectedCollege.medium}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Fees:</span>
                    <div className="font-medium text-green-600">{selectedCollege.fees}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollege.facilities.map((facility, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedCollege.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedCollege.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span>{selectedCollege.contact.website}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Admission Date</span>
                    <span className="font-medium">{selectedCollege.admissionDate}</span>
                  </div>
                  <button className="w-full btn-primary">
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="card text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a college to view detailed information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
