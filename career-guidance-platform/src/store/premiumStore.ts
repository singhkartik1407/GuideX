import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ExtendedQuizData {
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
  completedAt: string
}

export interface AnalyticsData {
  progressHistory: Array<{
    date: string
    score: number
  }>
  skillTrends: Array<{
    skill: string
    current: number
    market: number
    trend: string
  }>
  industryInsights: Array<{
    industry: string
    demand: number
    growth: number
  }>
  lastUpdated: string
}


interface PremiumStore {
  // State
  isPremiumUser: boolean
  premiumQuizData: ExtendedQuizData | null
  analyticsData: AnalyticsData | null
  showPremiumPreview: boolean
  hasCompletedBasicQuiz: boolean
  
  // Actions
  setPremiumStatus: (status: boolean) => void
  updatePremiumQuizData: (data: ExtendedQuizData | null) => void
  updateAnalyticsData: (data: AnalyticsData) => void
  setShowPremiumPreview: (show: boolean) => void
  setHasCompletedBasicQuiz: (completed: boolean) => void
  resetPremiumData: () => void
  
  // Computed values
  getPremiumFeatures: () => string[]
  getUpgradeBenefits: () => string[]
  shouldShowPremiumPreview: () => boolean
}

export const usePremiumStore = create<PremiumStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isPremiumUser: false,
      premiumQuizData: null,
      analyticsData: null,
      showPremiumPreview: false,
      hasCompletedBasicQuiz: false,

      // Actions
      setPremiumStatus: (status: boolean) => {
        set({ isPremiumUser: status })
        if (status) {
          // Generate initial analytics data when user becomes premium
          const analyticsData: AnalyticsData = {
            progressHistory: [
              { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), score: 65 },
              { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), score: 68 },
              { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), score: 72 },
              { date: new Date().toISOString(), score: 78 }
            ],
            skillTrends: [
              { skill: 'Analytical Thinking', current: 85, market: 78, trend: 'up' },
              { skill: 'Communication', current: 72, market: 82, trend: 'up' },
              { skill: 'Technical Skills', current: 68, market: 85, trend: 'up' },
              { skill: 'Leadership', current: 75, market: 70, trend: 'up' },
              { skill: 'Creativity', current: 80, market: 65, trend: 'stable' }
            ],
            industryInsights: [
              { industry: 'Technology', demand: 85, growth: 15.2 },
              { industry: 'Healthcare', demand: 78, growth: 12.8 },
              { industry: 'Finance', demand: 72, growth: 8.5 },
              { industry: 'Education', demand: 65, growth: 6.2 }
            ],
            lastUpdated: new Date().toISOString()
          }
          set({ analyticsData })
        }
      },

      updatePremiumQuizData: (data: ExtendedQuizData | null) => {
        set({ premiumQuizData: data })
      },

      updateAnalyticsData: (data: AnalyticsData) => {
        set({ analyticsData: data })
      },


      setShowPremiumPreview: (show: boolean) => {
        set({ showPremiumPreview: show })
      },

      setHasCompletedBasicQuiz: (completed: boolean) => {
        set({ hasCompletedBasicQuiz: completed })
      },

      resetPremiumData: () => {
        set({
          isPremiumUser: false,
          premiumQuizData: null,
          analyticsData: null,
          showPremiumPreview: false,
          hasCompletedBasicQuiz: false
        })
      },

      // Computed values
      getPremiumFeatures: () => {
        return [
          'Advanced Assessment (150+ questions)',
          'Detailed Performance Analytics',
          'Career Mapping & Recommendations',
          'Industry Trends & Insights',
          'Peer Comparison Analytics',
          'AI-Powered Career Guidance',
          'Priority Support',
          'Export Reports'
        ]
      },

      getUpgradeBenefits: () => {
        return [
          'Get personalized career insights',
          'Access to detailed performance metrics',
          'Industry-specific recommendations',
          'Advanced skill assessments',
          'Market trend analysis',
          'Professional development roadmap'
        ]
      },

      shouldShowPremiumPreview: () => {
        const state = get()
        return state.hasCompletedBasicQuiz && !state.isPremiumUser && !state.showPremiumPreview
      }
    }),
    {
      name: 'premium-store',
      partialize: (state) => ({
        isPremiumUser: state.isPremiumUser,
        premiumQuizData: state.premiumQuizData,
        analyticsData: state.analyticsData,
        hasCompletedBasicQuiz: state.hasCompletedBasicQuiz
      })
    }
  )
)

// Selectors for easier access to specific parts of the state
export const usePremiumStatus = () => usePremiumStore((state) => state.isPremiumUser)
export const usePremiumQuizData = () => usePremiumStore((state) => state.premiumQuizData)
export const useAnalyticsData = () => usePremiumStore((state) => state.analyticsData)
export const useShowPremiumPreview = () => usePremiumStore((state) => state.showPremiumPreview)
