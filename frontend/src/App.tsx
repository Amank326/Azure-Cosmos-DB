import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
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
        main: '#0066ff',
        light: '#4d9fff',
        dark: '#0052cc',
      },
      secondary: {
        main: '#ff0080',
        light: '#ff4daa',
        dark: '#cc0066',
      },
      background: {
        default: isDarkMode ? '#0a0e27' : '#f5f7fa',
        paper: isDarkMode ? '#1a1f3a' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.5px',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0, 102, 255, 0.4)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: '12px',
          },
        },
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AppBar 
          position="static" 
          elevation={4}
          sx={{
            background: isDarkMode 
              ? 'linear-gradient(135deg, #1a1f3a 0%, #2d2e5f 100%)'
              : 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, fontSize: '1.3rem' }}>
              🎓 Student Management System
            </Typography>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton 
                sx={{ ml: 1 }} 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                color="inherit"
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <IconButton 
                sx={{ ml: 1 }} 
                onClick={fetchStudents} 
                color="inherit"
                title="Refresh"
                disabled={loading}
              >
                <RefreshIcon />
              </IconButton>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{ ml: 2 }}
              >
                Add Student
              </Button>
            </motion.div>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <CircularProgress />
                </motion.div>
              </Box>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Alert severity="error" action={
                  <Button color="inherit" size="small" onClick={fetchStudents}>
                    RETRY
                  </Button>
                } sx={{ mb: 2 }}>
                  {error}
                </Alert>
              </motion.div>
            ) : students.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" color="textSecondary">
                    No students found. Click "Add Student" to create one.
                  </Typography>
                </Paper>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Paper elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <StudentTable
                    students={students}
                    onEdit={handleOpenDialog}
                    onDelete={handleOpenDeleteDialog}
                    loading={loading}
                  />
                </Paper>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </motion.div>
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
