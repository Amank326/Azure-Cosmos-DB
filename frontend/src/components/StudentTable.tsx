import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Typography,
  TableSortLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Student } from '../types';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  loading?: boolean;
}

type OrderType = 'asc' | 'desc';

const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<OrderType>('asc');
  const [orderBy, setOrderBy] = useState<keyof Student>('roll');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof Student) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedStudents = [...students].sort((a, b) => {
    const aValue = a[orderBy] ?? '';
    const bValue = b[orderBy] ?? '';

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();

    if (order === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });

  const displayedStudents = sortedStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (students.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          📚 No Students Found
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Click the "Add Student" button to get started.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="student table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleRequestSort('name')}
              >
                <strong>Name</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'branch'}
                direction={orderBy === 'branch' ? order : 'asc'}
                onClick={() => handleRequestSort('branch')}
              >
                <strong>Branch</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'roll'}
                direction={orderBy === 'roll' ? order : 'asc'}
                onClick={() => handleRequestSort('roll')}
              >
                <strong>Roll Number</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'gpa'}
                direction={orderBy === 'gpa' ? order : 'asc'}
                onClick={() => handleRequestSort('gpa')}
              >
                <strong>GPA</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedStudents.map((student, index) => (
            <motion.tr
              key={student.id || student.roll}
              component="tr"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              as={TableRow}
            >
              <TableCell component="th" scope="row">
                <motion.div
                  whileHover={{ color: '#0066ff' }}
                  transition={{ duration: 0.2 }}
                >
                  {student.name}
                </motion.div>
              </TableCell>
              <TableCell>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    {student.branch}
                  </Box>
                </motion.div>
              </TableCell>
              <TableCell>{student.roll}</TableCell>
              <TableCell align="right">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    sx={{
                      display: 'inline-block',
                      minWidth: '50px',
                      p: 1,
                      background: student.gpa >= 8 
                        ? 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)'
                        : 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
                      borderRadius: '6px',
                      fontWeight: 600,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {student.gpa?.toFixed(1)}
                  </Box>
                </motion.div>
              </TableCell>
              <TableCell align="center">
                <Box>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Tooltip title="Edit Student">
                      <IconButton
                        onClick={() => onEdit(student)}
                        color="primary"
                        size="small"
                        sx={{
                          '&:hover': {
                            backgroundColor: '#e3f2fd',
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Tooltip title="Delete Student">
                      <IconButton
                        onClick={() => onDelete(student)}
                        color="error"
                        size="small"
                        sx={{
                          '&:hover': {
                            backgroundColor: '#ffebee',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </motion.div>
                </Box>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default StudentTable;
