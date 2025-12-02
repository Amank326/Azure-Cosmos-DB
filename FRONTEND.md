# Frontend Documentation

## Overview

The frontend is a professional React application built with TypeScript and Material-UI, providing a complete user interface for the Student Management System. It communicates with the Flask backend API through RESTful endpoints.

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.0+ | Type Safety |
| Material-UI | 5.15.0 | Component Library |
| Vite | 5.0+ | Build Tool & Dev Server |
| Axios | 1.6.2 | HTTP Client |

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx                    # Root component (193+ lines)
│   ├── types.ts                   # TypeScript interfaces
│   ├── index.css                  # Global styles
│   └── components/
│       ├── StudentTable.tsx       # 220+ lines - Display students
│       ├── StudentDialog.tsx      # 200+ lines - Create/Edit form
│       ├── DeleteConfirmationDialog.tsx  # 50+ lines - Delete confirmation
│       └── Snackbar.tsx           # Toast notifications
├── package.json                   # Dependencies
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
└── index.html                     # HTML entry point
```

## Installation & Setup

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager
- Backend API running on `http://127.0.0.1:8000`

### Installation Steps

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

## Components Documentation

### 1. App.tsx (Root Component)

**Purpose**: Main application component managing state and API calls

**Key Features**:
- Material-UI theme configuration (light/dark mode)
- Student state management (CRUD operations)
- Loading and error state handling
- API error handling with Axios
- Theme toggle button
- Dialog management (create, edit, delete)

**State Management**:
```typescript
interface AppState {
  students: Student[]
  loading: boolean
  selectedStudent: Student | null
  dialogOpen: boolean
  deleteDialogOpen: boolean
  snackbar: SnackbarState
}
```

**API Configuration**:
```typescript
const API_URL = 'http://127.0.0.1:8000'
```

**Main Functions**:
- `fetchStudents()` - Fetch all students from backend
- `handleCreateStudent()` - Create new student
- `handleUpdateStudent()` - Update existing student
- `handleDeleteStudent()` - Delete student with confirmation
- `handleThemeToggle()` - Switch between light/dark theme

### 2. StudentTable.tsx

**Purpose**: Display students in a professional table with sorting and pagination

**Features**:
- **Column Sorting**: Sort by Name, Branch, Roll Number, GPA
- **Pagination**: 5, 10, 25, 50 rows per page
- **GPA Color Coding**: 
  - Green (#4caf50) for GPA ≥ 8
  - Yellow (#ffc107) for GPA < 8
- **Row Actions**: Edit and Delete buttons
- **Hover Effects**: Professional UI interactions
- **Loading State**: Skeleton loaders during data fetch

**Props**:
```typescript
interface StudentTableProps {
  students: Student[]
  loading: boolean
  onEdit: (student: Student) => void
  onDelete: (roll: string) => void
}
```

**Styling**: Full-width, professional borders, alternating row colors

### 3. StudentDialog.tsx

**Purpose**: Form for creating and editing students

**Form Fields**:
1. **Roll Number** (required, unique, disabled during edit)
2. **Name** (required)
3. **Branch** (dropdown: CSE, ECE, ME, EE)
4. **GPA** (number, 0-10 range)

**Validation**:
- Roll number: Required and must be unique
- Name: Required and non-empty
- Branch: Must select valid option
- GPA: Must be between 0 and 10

**Error Handling**:
- Real-time error display
- Error messages clear on input change
- Validation feedback per field

**Props**:
```typescript
interface StudentDialogProps {
  open: boolean
  student: Student | null
  onClose: () => void
  onSave: (student: Student) => void
}
```

### 4. DeleteConfirmationDialog.tsx

**Purpose**: Confirm student deletion before performing the action

**Features**:
- Warning icon for emphasis
- Student information display
- Confirmation required before deletion
- Cancel option

**Props**:
```typescript
interface DeleteConfirmationDialogProps {
  open: boolean
  studentName: string
  onConfirm: () => void
  onCancel: () => void
}
```

### 5. Snackbar.tsx

**Purpose**: Toast notifications for user feedback

**Notification Types**:
- **Success** (green) - Operation completed
- **Error** (red) - Operation failed
- **Warning** (orange) - Important warnings
- **Info** (blue) - Information messages

**Features**:
- Auto-dismiss after 5 seconds
- Bottom-right positioning
- Close button
- Customizable message and severity

**Props**:
```typescript
interface SnackbarProps {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
  onClose: () => void
}
```

## TypeScript Interfaces (types.ts)

### Student Interface
```typescript
interface Student {
  id?: string                 // Auto-generated by Cosmos DB
  roll: string               // Student roll number (unique key)
  name: string               // Student full name
  branch: string             // Branch: CSE, ECE, ME, EE
  gpa: number                // GPA (0-10 range)
}
```

### API Response Interface
```typescript
interface ApiResponse {
  success: boolean
  students?: Student[]
  student?: Student
  error?: string
  message?: string
}
```

### Form State Interface
```typescript
interface FormState {
  roll: string
  name: string
  branch: string
  gpa: string
  errors: FormErrors
}

interface FormErrors {
  roll?: string
  name?: string
  branch?: string
  gpa?: string
}
```

### Snackbar State Interface
```typescript
interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
}
```

## API Integration

### Endpoints Called

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/students` | Fetch all students |
| POST | `/student` | Create new student |
| PUT | `/student/<roll>` | Update student |
| DELETE | `/student/<roll>` | Delete student |

### Axios Configuration

```typescript
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

// Fetch students
const response = await axios.get(`${API_URL}/students`)
const students = response.data.students || []

// Create student
await axios.post(`${API_URL}/student`, studentData)

// Update student
await axios.put(`${API_URL}/student/${roll}`, updates)

// Delete student
await axios.delete(`${API_URL}/student/${roll}`)
```

### Error Handling

```typescript
try {
  // API call
} catch (err) {
  let message = 'An error occurred'
  
  if (axios.isAxiosError(err)) {
    message = err.response?.data?.error || err.message
  }
  
  setSnackbar({
    open: true,
    message,
    severity: 'error'
  })
}
```

## Styling & Theme

### Material-UI Theme Configuration

**Colors**:
- Primary: `#1976d2` (Blue)
- Secondary: `#dc004e` (Pink)

**Typography**:
- Font Family: Roboto (Material Design default)
- Responsive sizing for all screen sizes

**Dark Mode**:
- Automatic switching based on user preference
- Smooth transitions
- Persisted user preference

### Global Styles (index.css)

```css
/* Custom scrollbar styling */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }

/* Fade-in animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## Development Commands

```bash
# Start development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

## Building for Production

### Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

### Deployment

For deployment to production servers:

1. **Build the project**
```bash
npm run build
```

2. **Deploy `dist/` directory** to your hosting provider

3. **Update API URL** in production:
   - Change `API_URL` in `App.tsx` to your production backend URL
   - Rebuild and redeploy

## Performance Optimizations

- ✅ Code splitting with Vite
- ✅ Lazy loading of components
- ✅ Material-UI tree shaking
- ✅ Optimized re-renders with React hooks
- ✅ Efficient state management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Backend Connection Issues

**Problem**: "Cannot reach backend at http://127.0.0.1:8000"

**Solution**:
1. Ensure backend is running: `python app.py`
2. Check backend URL in `App.tsx`
3. Verify CORS is enabled in Flask backend
4. Check network in browser DevTools

### Port Already in Use

**Problem**: "Port 5173 already in use"

**Solution**:
```bash
# Use different port
npm run dev -- --port 5174
```

### Module Not Found

**Problem**: "Cannot find module '@mui/material'"

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

**Problem**: Type errors during development

**Solution**:
```bash
# Check all types
npm run type-check

# Or run TypeScript compiler
npx tsc --noEmit
```

## Contributing

### Adding New Features

1. Create component in `src/components/`
2. Define types in `types.ts`
3. Import and use in `App.tsx`
4. Test thoroughly
5. Commit and push

### Code Style

- Use TypeScript for all new code
- Follow Material-UI component patterns
- Use functional components with hooks
- Add JSDoc comments for functions

## Performance Monitoring

### Development

Vite HMR (Hot Module Replacement) provides:
- Instant feedback on changes
- State preservation during refresh
- Fast compilation

### Production

- Vite generates source maps for debugging
- Material-UI components are tree-shaken
- Minimal bundle size

## Related Documentation

- Backend: See `students-CRUD-mockAPIs/README.md`
- Full Project: See main `README.md`
- API Details: See `API_DOCUMENTATION.md`

## Support & Questions

For issues or questions:
1. Check this documentation
2. Review console errors in browser DevTools
3. Check backend logs
4. Open an issue on GitHub

---

**Last Updated**: December 2025  
**Status**: ✅ Production Ready
