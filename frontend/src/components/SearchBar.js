import React from 'react';
import { TableCell, TableRow, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const SearchTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default,
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const SearchBar = ({ searchTerms, handleSearchChange }) => {
  return (
    <SearchTableRow>
      <TableCell>
        <SearchInput
          placeholder="Search by name"
          name="name"
          value={searchTerms.name}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell>
        <SearchInput
          placeholder="Search by age"
          name="age"
          value={searchTerms.age}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell>
        <SearchInput
          placeholder="Search by gender"
          name="gender"
          value={searchTerms.gender}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell>
        <SearchInput
          placeholder="Search by contact"
          name="contact"
          value={searchTerms.contact}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
          size="small"
        />
      </TableCell>
    </SearchTableRow>
  );
};

export default SearchBar;
