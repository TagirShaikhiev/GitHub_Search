import React, { type JSX } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, CircularProgress, FormControl, InputLabel, TextField, type SelectChangeEvent } from '@mui/material';
import { sortByOptions, sortOrderOptions, type SearchProps, type SortBy, type SortOrder } from './types';
import { optionName } from './helpers';

export const Search = ({ searchParams, onSearchParamsChange, onSearch, isLoading }: SearchProps): JSX.Element => {
  const handleSortByChange = (event: SelectChangeEvent<SortBy>) => {
    onSearchParamsChange({ ...searchParams, sort: event.target.value as SortBy, page: 1 });
  };

  const handleSortOrderChange = (event: SelectChangeEvent<SortOrder>) => {
    onSearchParamsChange({ ...searchParams, order: event.target.value as SortOrder, page: 1 });
  };

  const handleSearchStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchParamsChange({ ...searchParams, searchString: event.target.value, page: 1 });
  };
  
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
      <TextField 
        id="search-string" 
        label="Search" 
        variant="outlined" 
        value={searchParams.searchString} 
        onChange={handleSearchStringChange}
      />
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={searchParams.sort || ''}
          label="Sort by"
          onChange={handleSortByChange}
        >
          {sortByOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option === '' ? <em>None</em> : optionName(option)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Order</InputLabel>
        <Select
          value={searchParams.order || ''}
          label="Order"
          onChange={handleSortOrderChange}
        >
          {sortOrderOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option === '' ? <em>None</em> : option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button disabled={isLoading} onClick={onSearch}>Search</Button>
      {isLoading && <CircularProgress />}
    </Box>
  );
};