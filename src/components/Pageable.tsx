import React, { useState, useEffect } from 'react';
import { Pagination, Box, Typography, TextField, styled } from '@mui/material';
import type { PageableProps } from './types';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'center',
  marginTop: theme.spacing(3),
}));

export const Pageable: React.FC<PageableProps> = ({
  totalCount,
  itemsPerPage = 30,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [inputValue, setInputValue] = useState(String(itemsPerPage));
  const [inputError, setInputError] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    setInputValue(String(itemsPerPage));
  }, [itemsPerPage]);

  const pageCount = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  const validate = (raw: string) => {
    const n = parseInt(raw, 10);
    if (Number.isNaN(n) || n < 1 || n > 100) {
      setInputError(true);
      setHelperText('Max 100 per page');
      return { ok: false as const, n: NaN };
    }
    setInputError(false);
    setHelperText('');
    return { ok: true as const, n };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInputValue(v);
    validate(v);
  };

  const applyPerPage = () => {
    const { ok, n } = validate(inputValue);
    if (!ok) return;
    if (n !== itemsPerPage) {
      onItemsPerPageChange(n);
    }
  };

  return (
    <Root>
      <Typography variant="body2" color="text.secondary">
        Total: {totalCount}
      </Typography>

      <TextField
        label="Per page"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
            applyPerPage();
          }
        }}
        sx={{ width: 120 }}
        error={inputError}
        helperText={helperText}
      />

      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        showFirstButton={true}
        showLastButton
      />
    </Root>
  );
};