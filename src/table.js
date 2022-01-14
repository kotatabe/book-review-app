import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, form) {
  return { name, form };
}

const rows = [
  createData('タイトル', 159),
  createData('URL', 159),
  createData('詳細', 159),
  createData('レビューや感想', 159),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{  }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
								component="th"
								sx={{
									width: 200,
									bgcolor: "grey.100",
								}}
							>
                {row.name}
              </TableCell>
              <TableCell>{row.form}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}