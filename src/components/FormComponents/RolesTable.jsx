import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein};
}

const rows = [
  createData(159, 'Java Drinker', 6.0, 24, 4.0),
  createData(237, 'Ice cream Taster', 9.0, 37, 4.3),
  createData(262, 'Sausage Muncher', 16.0, 24, 6.0),
  createData(305, 'Cupcake Icer', 3.7, 67, 4.3),
  createData(356, 'Gingerbread Man', 16.0, 49, 3.9),
];

const RolesTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Role ID</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="right">Total Applications</TableCell>
            <TableCell align="right">Hiring Manager</TableCell>
            <TableCell align="right">Action Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RolesTable;
