import React, { useState } from 'react';
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
          {displayedStudents.map((student) => (
            <TableRow
              key={student.id || student.roll}
              hover
              sx={{
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                },
              }}
            >
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 2,
                    py: 0.5,
                    backgroundColor: '#e3f2fd',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                  }}
                >
                  {student.branch}
                </Box>
              </TableCell>
              <TableCell>{student.roll}</TableCell>
              <TableCell align="right">
                <Box
                  sx={{
                    display: 'inline-block',
                    minWidth: '50px',
                    p: 1,
                    backgroundColor: student.gpa >= 8 ? '#c8e6c9' : '#fff9c4',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  {student.gpa?.toFixed(1)}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box>
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
                </Box>
              </TableCell>
            </TableRow>
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
