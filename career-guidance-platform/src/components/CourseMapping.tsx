'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Building, 
  Users, 
  TrendingUp, 
  BookOpen,
  Briefcase,
  ArrowRight,
  MapPin,
  DollarSign,
  Award,
  Search,
  Filter
} from 'lucide-react'

interface Course {
  id: string
  name: string
  stream: string
  duration: string
  description: string
  careerPaths: string[]
  industries: string[]
  governmentExams: string[]
  avgSalary: string
  demand: 'high' | 'medium' | 'low'
  colleges: string[]
}

export default function CourseMapping() {
  const [selectedStream, setSelectedStream] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const courses: Course[] = [
    {
      id: 'bsc',
      name: 'Bachelor of Science (BSc)',
      stream: 'science',
      duration: '3 Years',
      description: 'Comprehensive study of scientific principles and research methodology',
      careerPaths: ['Research Scientist', 'Data Analyst', 'Lab Technician', 'Teacher', 'Consultant'],
      industries: ['Healthcare', 'Technology', 'Education', 'Research', 'Pharmaceuticals'],
      governmentExams: ['UPSC', 'SSC', 'Banking', 'Teaching', 'Research'],
      avgSalary: '₹4-8 LPA',
      demand: 'high',
      colleges: ['Delhi University', 'BHU', 'JNU', 'AMU', 'IITs']
    },
    {
      id: 'ba',
      name: 'Bachelor of Arts (BA)',
      stream: 'arts',
      duration: '3 Years',
      description: 'Study of humanities, social sciences, and creative disciplines',
      careerPaths: ['Journalist', 'Writer', 'Social Worker', 'Teacher', 'Policy Analyst'],
      industries: ['Media', 'Education', 'NGOs', 'Government', 'Publishing'],
      governmentExams: ['UPSC', 'SSC', 'Teaching', 'Banking', 'State PSC'],
      avgSalary: '₹3-6 LPA',
      demand: 'medium',
      colleges: ['Delhi University', 'JNU', 'BHU', 'AMU', 'JMI']
    },
    {
      id: 'bcom',
      name: 'Bachelor of Commerce (BCom)',
      stream: 'commerce',
      duration: '3 Years',
      description: 'Study of business, finance, and commercial practices',
      careerPaths: ['Accountant', 'Financial Analyst', 'Banker', 'Business Consultant', 'Entrepreneur'],
      industries: ['Banking', 'Finance', 'Consulting', 'E-commerce', 'Manufacturing'],
      governmentExams: ['Banking', 'SSC', 'UPSC', 'State PSC', 'Railway'],
      avgSalary: '₹4-7 LPA',
      demand: 'high',
      colleges: ['Delhi University', 'BHU', 'AMU', 'JMI', 'DU Colleges']
    },
    {
      id: 'bba',
      name: 'Bachelor of Business Administration (BBA)',
      stream: 'commerce',
      duration: '3 Years',
      description: 'Professional degree in business management and administration',
      careerPaths: ['Business Analyst', 'Marketing Manager', 'HR Manager', 'Entrepreneur', 'Consultant'],
      industries: ['Corporate', 'Startups', 'Consulting', 'E-commerce', 'Manufacturing'],
      governmentExams: ['Banking', 'SSC', 'UPSC', 'State PSC', 'Railway'],
      avgSalary: '₹5-9 LPA',
      demand: 'high',
      colleges: ['Delhi University', 'BHU', 'AMU', 'JMI', 'IGNOU']
    },
    {
      id: 'bca',
      name: 'Bachelor of Computer Applications (BCA)',
      stream: 'science',
      duration: '3 Years',
      description: 'Study of computer applications and software development',
      careerPaths: ['Software Developer', 'Web Developer', 'System Analyst', 'IT Consultant', 'Database Administrator'],
      industries: ['IT', 'Software', 'E-commerce', 'Banking', 'Telecommunications'],
      governmentExams: ['SSC', 'Banking', 'Railway', 'State PSC', 'Defense'],
      avgSalary: '₹6-12 LPA',
      demand: 'high',
      colleges: ['Delhi University', 'IGNOU', 'BHU', 'AMU', 'JMI']
    },
    {
      id: 'bsw',
      name: 'Bachelor of Social Work (BSW)',
      stream: 'arts',
      duration: '3 Years',
      description: 'Study of social welfare and community development',
      careerPaths: ['Social Worker', 'Community Organizer', 'NGO Worker', 'Policy Analyst', 'Counselor'],
      industries: ['NGOs', 'Government', 'Healthcare', 'Education', 'Community Development'],
      governmentExams: ['UPSC', 'SSC', 'State PSC', 'Banking', 'Teaching'],
      avgSalary: '₹3-5 LPA',
      demand: 'medium',
      colleges: ['Delhi University', 'JNU', 'BHU', 'AMU', 'TISS']
    }
  ]

  const streams = [
    { id: 'all', name: 'All Streams', color: 'bg-gray-500' },
    { id: 'science', name: 'Science', color: 'bg-blue-500' },
    { id: 'arts', name: 'Arts', color: 'bg-purple-500' },
    { id: 'commerce', name: 'Commerce', color: 'bg-green-500' }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesStream = selectedStream === 'all' || course.stream === selectedStream
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStream && matchesSearch
  })

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Course-to-Career Path Mapping</h1>
        <p className="text-gray-600 text-lg">
          Explore degree programs and discover the career opportunities they offer
        </p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {streams.map((stream) => (
              <button
                key={stream.id}
                onClick={() => setSelectedStream(stream.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStream === stream.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stream.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCourse(course)}
                className={`card cursor-pointer transition-all ${
                  selectedCourse?.id === course.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.duration}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(course.demand)}`}>
                    {course.demand} demand
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">{course.avgSalary}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Course Details */}
        <div className="lg:col-span-1">
          {selectedCourse ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card sticky top-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedCourse.name}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Career Paths</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.careerPaths.map((career, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {career}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.industries.map((industry, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Government Exams</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.governmentExams.map((exam, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Top Colleges</h3>
                  <div className="space-y-2">
                    {selectedCourse.colleges.map((college, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{college}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Salary</span>
                    <span className="font-semibold text-green-600">{selectedCourse.avgSalary}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">Job Demand</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(selectedCourse.demand)}`}>
                      {selectedCourse.demand}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="card text-center text-gray-500">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a course to view detailed information</p>
            </div>
          )}
        </div>
      </div>

      {/* Career Path Visualization */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Career Path Visualization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Private Sector</h3>
              <p className="text-sm text-gray-600">Corporate jobs, startups, and private companies</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Government Jobs</h3>
              <p className="text-sm text-gray-600">Civil services, banking, and public sector</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Higher Studies</h3>
              <p className="text-sm text-gray-600">Masters, PhD, and specialized courses</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
