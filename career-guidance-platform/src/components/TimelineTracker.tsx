'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Bell, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Plus,
  Filter,
  Search,
  ArrowRight,
  ArrowLeft,
  Star,
  BookOpen,
  Award,
  GraduationCap
} from 'lucide-react'

interface TimelineEvent {
  id: string
  title: string
  type: 'admission' | 'scholarship' | 'exam' | 'counseling' | 'deadline'
  date: string
  time?: string
  priority: 'high' | 'medium' | 'low'
  status: 'upcoming' | 'ongoing' | 'completed' | 'missed'
  description: string
  college?: string
  amount?: string
  requirements?: string[]
  notifications: boolean
}

export default function TimelineTracker() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  const events: TimelineEvent[] = [
    {
      id: '1',
      title: 'DU Admission Deadline',
      type: 'admission',
      date: '2024-06-15',
      time: '11:59 PM',
      priority: 'high',
      status: 'upcoming',
      description: 'Last date to submit online application for Delhi University undergraduate programs',
      college: 'Delhi University',
      notifications: true
    },
    {
      id: '2',
      title: 'Merit Scholarship Application',
      type: 'scholarship',
      date: '2024-06-20',
      time: '5:00 PM',
      priority: 'high',
      status: 'upcoming',
      description: 'Apply for government merit scholarship for economically disadvantaged students',
      amount: '₹50,000/year',
      requirements: ['Income certificate', 'Caste certificate', 'Academic records'],
      notifications: true
    },
    {
      id: '3',
      title: 'JNU Entrance Test',
      type: 'exam',
      date: '2024-06-25',
      time: '10:00 AM',
      priority: 'high',
      status: 'upcoming',
      description: 'Entrance examination for JNU undergraduate programs',
      college: 'Jawaharlal Nehru University',
      notifications: true
    },
    {
      id: '4',
      title: 'BHU Counseling Session',
      type: 'counseling',
      date: '2024-07-05',
      time: '2:00 PM',
      priority: 'medium',
      status: 'upcoming',
      description: 'Online counseling session for BHU admission process',
      college: 'Banaras Hindu University',
      notifications: false
    },
    {
      id: '5',
      title: 'Document Verification Deadline',
      type: 'deadline',
      date: '2024-07-10',
      time: '4:00 PM',
      priority: 'medium',
      status: 'upcoming',
      description: 'Submit all required documents for admission verification',
      notifications: true
    },
    {
      id: '6',
      title: 'AMU Application Start',
      type: 'admission',
      date: '2024-05-20',
      time: '9:00 AM',
      priority: 'low',
      status: 'completed',
      description: 'Application portal opened for AMU undergraduate programs',
      college: 'Aligarh Muslim University',
      notifications: false
    }
  ]

  const filters = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'admission', name: 'Admissions', icon: GraduationCap },
    { id: 'scholarship', name: 'Scholarships', icon: Award },
    { id: 'exam', name: 'Exams', icon: BookOpen },
    { id: 'counseling', name: 'Counseling', icon: Info },
    { id: 'deadline', name: 'Deadlines', icon: Clock }
  ]

  const filteredEvents = events.filter(event => {
    const matchesFilter = selectedFilter === 'all' || event.type === selectedFilter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.college && event.college.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-100 border-green-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100'
      case 'ongoing': return 'text-orange-600 bg-orange-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'missed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'admission': return GraduationCap
      case 'scholarship': return Award
      case 'exam': return BookOpen
      case 'counseling': return Info
      case 'deadline': return Clock
      default: return Calendar
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysUntil = (dateString: string) => {
    const today = new Date()
    const eventDate = new Date(dateString)
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'Past'
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `${diffDays} days`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Timeline Tracker</h1>
        <p className="text-gray-600 text-lg">
          Stay updated with important dates and deadlines for your college applications
        </p>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    selectedFilter === filter.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{filter.name}</span>
                </button>
              )
            })}
            
            <button
              onClick={() => setShowAddEvent(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredEvents.map((event) => {
          const TypeIcon = getTypeIcon(event.type)
          const daysUntil = getDaysUntil(event.date)
          
          return (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedEvent(event)}
              className={`card cursor-pointer transition-all ${
                selectedEvent?.id === event.id ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <TypeIcon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                        {event.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.college && (
                        <div className="flex items-center space-x-1">
                          <GraduationCap className="w-4 h-4" />
                          <span>{event.college}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">{daysUntil}</span>
                      {event.notifications && (
                        <Bell className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                  
                  {event.amount && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-green-600">{event.amount}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    {(() => {
                      const Icon = getTypeIcon(selectedEvent.type)
                      return <Icon className="w-6 h-6 text-primary-600" />
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
                    <p className="text-sm text-gray-600">{selectedEvent.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">{selectedEvent.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Date</span>
                    <div className="font-medium">{formatDate(selectedEvent.date)}</div>
                  </div>
                  {selectedEvent.time && (
                    <div>
                      <span className="text-sm text-gray-600">Time</span>
                      <div className="font-medium">{selectedEvent.time}</div>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-600">Priority</span>
                    <div className="font-medium capitalize">{selectedEvent.priority}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status</span>
                    <div className="font-medium capitalize">{selectedEvent.status}</div>
                  </div>
                </div>

                {selectedEvent.college && (
                  <div>
                    <span className="text-sm text-gray-600">College</span>
                    <div className="font-medium">{selectedEvent.college}</div>
                  </div>
                )}

                {selectedEvent.amount && (
                  <div>
                    <span className="text-sm text-gray-600">Amount</span>
                    <div className="font-medium text-green-600">{selectedEvent.amount}</div>
                  </div>
                )}

                {selectedEvent.requirements && selectedEvent.requirements.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600">Requirements</span>
                    <div className="mt-2 space-y-1">
                      {selectedEvent.requirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Days until event</span>
                    <span className="font-medium">{getDaysUntil(selectedEvent.date)}</span>
                  </div>
                  <button className="w-full btn-primary mt-4">
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
