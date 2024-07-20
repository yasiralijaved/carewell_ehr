import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/system';

const StyledTableHeadRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const TableHeader = () => {
  return (
    <StyledTableHeadRow>
      <StyledTableCell>Name</StyledTableCell>
      <StyledTableCell>Age</StyledTableCell>
      <StyledTableCell>Gender</StyledTableCell>
      <StyledTableCell>Contact</StyledTableCell>
      <StyledTableCell>Actions</StyledTableCell>
    </StyledTableHeadRow>
  );
};

export default TableHeader;
