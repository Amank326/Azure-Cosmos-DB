import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import RefreshIcon from '@mui/icons-material/Refresh';

import { Student, SnackbarState } from './types';
import StudentTable from './components/StudentTable';
import StudentDialog from './components/StudentDialog';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import Snackbar from './components/Snackbar';

const API_URL = 'http://127.0.0.1:8000';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
    },
  });

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/students`);
      const data = response.data.students || [];
      setStudents(data);
    } catch (err) {
      setError('An error occurred while fetching students. Please ensure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleOpenDialog = (student: Student | null = null) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleOpenDeleteDialog = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleSaveStudent = async (studentData: Omit<Student, 'id'>) => {
    try {
      if (selectedStudent?.roll) {
        // Update student
        await axios.put(`${API_URL}/student/${selectedStudent.roll}`, studentData);
        setSnackbar({
          open: true,
          message: 'Student updated successfully!',
          severity: 'success',
        });
      } else {
        // Create new student
        await axios.post(`${API_URL}/student`, studentData);
        setSnackbar({
          open: true,
          message: 'Student created successfully!',
          severity: 'success',
        });
      }
      await fetchStudents();
      handleCloseDialog();
    } catch (err) {
      const message = axios.isAxiosError(err) 
        ? err.response?.data?.error || 'Failed to save student'
        : 'Failed to save student';
      setSnackbar({
        open: true,
        message,
        severity: 'error',
      });
      console.error('Error saving student:', err);
    }
  };

  const handleDeleteStudent = async () => {
    if (selectedStudent?.roll) {
      try {
        await axios.delete(`${API_URL}/student/${selectedStudent.roll}`);
        setSnackbar({
          open: true,
          message: 'Student deleted successfully!',
          severity: 'success',
        });
        await fetchStudents();
        handleCloseDeleteDialog();
      } catch (err) {
        const message = axios.isAxiosError(err) 
          ? err.response?.data?.error || 'Failed to delete student'
          : 'Failed to delete student';
        setSnackbar({
          open: true,
          message,
          severity: 'error',
        });
        console.error('Error deleting student:', err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            🎓 Student Management System
          </Typography>
          <IconButton 
            sx={{ ml: 1 }} 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            color="inherit"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton 
            sx={{ ml: 1 }} 
            onClick={fetchStudents} 
            color="inherit"
            title="Refresh"
            disabled={loading}
          >
            <RefreshIcon />
          </IconButton>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ ml: 2 }}
          >
            Add Student
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" action={
            <Button color="inherit" size="small" onClick={fetchStudents}>
              RETRY
            </Button>
          } sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : students.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              No students found. Click "Add Student" to create one.
            </Typography>
          </Paper>
        ) : (
          <Paper elevation={2}>
            <StudentTable
              students={students}
              onEdit={handleOpenDialog}
              onDelete={handleOpenDeleteDialog}
            />
          </Paper>
        )}
      </Container>
      <StudentDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveStudent}
        student={selectedStudent}
      />
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteStudent}
        studentName={selectedStudent?.name}
      />
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </ThemeProvider>
  );
};

export default App;
