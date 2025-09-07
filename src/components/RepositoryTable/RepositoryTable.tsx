import * as React from 'react';
import {
  Paper,  
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import type { RepositoryTableProps } from './types';
import { buildColumns } from '../helpers';
import { StatusRow } from '../commons';

export const RepositoryTableMemo: React.FC<RepositoryTableProps> = ({ repositories, status, onRowClick }) => {
  const showStatusRow = !!status && repositories.length === 0;
  const columns = React.useMemo(() => buildColumns(), []);

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
      <Table size="small" aria-label="GitHub repositories">
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableCell key={c.id} sx={{ width: c.width }}>{c.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {showStatusRow ? (
            <StatusRow colSpan={columns.length} status={status} />
          ) : (
            repositories.map((repo) => (
              <TableRow
                key={repo.id}
                hover
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                onClick={() => onRowClick?.(repo)}
              >
                {columns.map((c) => (
                  <TableCell key={c.id}>{c.render(repo)}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const RepositoryTable = React.memo(
  RepositoryTableMemo,
  (prev, next) => {
    if (prev.status !== next.status) return false;
    if (prev.onRowClick !== next.onRowClick) return false;
    if (prev.repositories.length !== next.repositories.length) return false;
    for (let i = 0; i < prev.repositories.length; i++) {
      if (prev.repositories[i].id !== next.repositories[i].id) return false;
    }
    return true;
  }
);
