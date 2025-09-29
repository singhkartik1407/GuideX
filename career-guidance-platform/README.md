# Digital Career Guidance Platform

A comprehensive web and mobile responsive platform designed to increase student enrollment in government degree colleges through AI-driven career guidance, aptitude assessment, and college discovery.

## 🚀 Features

### Core Modules

1. **User Profiles & Personalization**
   - Student signup/login with comprehensive profile creation
   - AI-driven recommendation engine for subject streams and career paths
   - Personalized dashboard with progress tracking

2. **Aptitude & Interest Quiz**
   - Interactive assessment with 5 key categories
   - Real-time scoring and stream recommendations
   - Detailed career path suggestions based on results

3. **Course-to-Career Path Mapping**
   - Visual mapping of degree programs to career opportunities
   - Industry and government exam information
   - Salary expectations and job demand analysis

4. **Government College Directory**
   - Location-based college listings
   - Detailed college information (courses, cut-offs, facilities)
   - Advanced search and filtering options

5. **Timeline Tracker**
   - Notification system for important dates
   - Event management for admissions, scholarships, and exams
   - Priority-based organization

6. **Scholarship Portal**
   - Comprehensive scholarship database
   - Searchable and filterable scholarship listings
   - Application tracking and deadline management

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks + Zustand
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Date Handling**: date-fns

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interactions
- Offline functionality support

## 🎨 UI/UX Features

- Modern, clean interface with gradient backgrounds
- Smooth animations and transitions
- Interactive cards and hover effects
- Consistent color scheme and typography
- Accessibility considerations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd career-guidance-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
career-guidance-platform/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── AuthModal.tsx
│       ├── Dashboard.tsx
│       ├── AptitudeQuiz.tsx
│       ├── CourseMapping.tsx
│       ├── CollegeDirectory.tsx
│       ├── TimelineTracker.tsx
│       └── ScholarshipPortal.tsx
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## 🎯 Key Components

### AuthModal
- User registration and login
- Comprehensive student profile creation
- Form validation and error handling

### Dashboard
- Personalized welcome section
- AI recommendations display
- Quick actions and progress tracking
- Upcoming events overview

### AptitudeQuiz
- Interactive question interface
- Real-time progress tracking
- Comprehensive results analysis
- Career and college recommendations

### CourseMapping
- Course catalog with filtering
- Detailed career path information
- Visual career path mapping
- Industry and exam information

### CollegeDirectory
- College listings with search
- Advanced filtering options
- Detailed college information
- Contact and application details

### TimelineTracker
- Event management system
- Priority-based organization
- Notification system
- Deadline tracking

### ScholarshipPortal
- Scholarship database
- Search and filtering
- Application tracking
- Statistics and analytics

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Gray (#64748B)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold weights
- Body: Regular weights
- Responsive sizing

### Components
- Cards with shadows and borders
- Buttons with hover states
- Form inputs with focus states
- Modal dialogs with animations

## 🔧 Customization

### Adding New Colleges
Edit the `colleges` array in `CollegeDirectory.tsx` to add new institutions.

### Adding New Scholarships
Edit the `scholarships` array in `ScholarshipPortal.tsx` to add new opportunities.

### Modifying Quiz Questions
Edit the `questions` array in `AptitudeQuiz.tsx` to customize the assessment.

### Updating Course Information
Edit the `courses` array in `CourseMapping.tsx` to modify course details.

## 📊 Analytics & Tracking

The platform includes built-in analytics for:
- User engagement metrics
- Quiz completion rates
- College application tracking
- Scholarship application success

## 🔒 Security Features

- Form validation and sanitization
- Secure authentication flow
- Data privacy considerations
- Input sanitization

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings
3. Deploy automatically on push

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Impact Goals

- **Increase Awareness**: Improve understanding of graduation importance
- **Boost Enrollment**: Increase government college admissions
- **Reduce Dropouts**: Prevent post-Class 10/12 dropouts
- **Career Guidance**: Provide clear career pathways
- **Accessibility**: Make education information widely available

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ for empowering students and increasing government college enrollment.
