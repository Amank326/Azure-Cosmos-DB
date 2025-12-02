// Student interface matching backend
export interface Student {
  id?: string;
  roll: string;
  name: string;
  branch: 'CSE' | 'ECE' | 'ME' | 'IT' | 'CE';
  gpa: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  count?: number;
  students?: T[];
}

// Form state
export interface FormState {
  roll: string;
  name: string;
  branch: 'CSE' | 'ECE' | 'ME' | 'IT' | 'CE';
  gpa: string;
}

// Snackbar state
export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}
