import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Alert,
} from '@mui/material';
import { Student, FormState } from '../types';

interface StudentDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, 'id'>) => void;
  student: Student | null;
}

const initialFormState: FormState = {
  roll: '',
  name: '',
  branch: 'CSE',
  gpa: '',
};

const branches = ['CSE', 'ECE', 'ME', 'IT', 'CE'];

const StudentDialog: React.FC<StudentDialogProps> = ({ open, onClose, onSave, student }) => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  useEffect(() => {
    if (student) {
      setFormData({
        roll: student.roll,
        name: student.name,
        branch: student.branch,
        gpa: student.gpa?.toString() || '',
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [student, open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!formData.roll.trim()) {
      newErrors.roll = 'Roll number is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }
    if (!formData.gpa) {
      newErrors.gpa = 'GPA is required';
    } else {
      const gpaNum = parseFloat(formData.gpa);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 10) {
        newErrors.gpa = 'GPA must be between 0 and 10';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const submissionData: Omit<Student, 'id'> = {
      roll: formData.roll.trim(),
      name: formData.name.trim(),
      branch: formData.branch as 'CSE' | 'ECE' | 'ME' | 'IT' | 'CE',
      gpa: parseFloat(formData.gpa),
    };

    onSave(submissionData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1.3rem' }}>
        {student ? '✏️ Edit Student' : '➕ Add New Student'}
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextField
              name="roll"
              label="Roll Number"
              placeholder="e.g., U001"
              value={formData.roll}
              onChange={handleChange}
              fullWidth
              required
              disabled={!!student}
              error={!!errors.roll}
              helperText={errors.roll}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Student Name"
              placeholder="e.g., Aman Sharma"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="branch"
              label="Branch"
              value={formData.branch}
              onChange={handleChange}
              fullWidth
              required
              select
              error={!!errors.branch}
              helperText={errors.branch}
              variant="outlined"
            >
              {branches.map((branch) => (
                <MenuItem key={branch} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="gpa"
              label="GPA"
              placeholder="0.0 - 10.0"
              type="number"
              value={formData.gpa}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ step: '0.1', min: '0', max: '10' }}
              error={!!errors.gpa}
              helperText={errors.gpa}
              variant="outlined"
            />
          </Grid>
          {Object.values(errors).some(e => e) && (
            <Grid item xs={12}>
              <Alert severity="error">
                Please fix all errors before saving.
              </Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {student ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDialog;
