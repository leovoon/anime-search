import React from 'react';
import {
  Box,
  Pagination as MuiPagination,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack
} from '@mui/material';

interface PaginationInfo {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

interface PaginationProps {
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  paginationInfo: PaginationInfo;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  itemsPerPage = 20,
  onItemsPerPageChange,
  paginationInfo
}) => {
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    if (onItemsPerPageChange) {
      const newItemsPerPage = Number(event.target.value);
      onItemsPerPageChange(newItemsPerPage);
      // Reset to page 1 when items per page changes
      onPageChange(1);
    }
  };

  // Extract the items per page value from pagination info or use default
  const actualItemsPerPage = paginationInfo.items.per_page || itemsPerPage;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      my: 4,
      gap: 2
    }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >


        <Typography variant="body2" color="text.secondary">
          {paginationInfo.items.count > 0 ?
            `Showing ${paginationInfo.items.count} of ${paginationInfo.items.total} items` :
            `Total: ${paginationInfo.items.total} items`}
        </Typography>

        {onItemsPerPageChange && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="items-per-page-label">Items per page</InputLabel>
            <Select
              labelId="items-per-page-label"
              id="items-per-page"
              value={actualItemsPerPage}
              label="Items per page"
              onChange={handleItemsPerPageChange}
              // Note: Jikan API has a maximum limit of 25 items per page
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>

      <MuiPagination
        count={paginationInfo.last_visible_page}
        page={paginationInfo.current_page}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        siblingCount={1}
      />
    </Box>
  );
};

export default Pagination;
