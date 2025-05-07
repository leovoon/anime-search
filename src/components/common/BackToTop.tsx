import React from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface BackToTopProps {
  /**
   * Function to execute when the button is clicked
   * This will be used to focus the search input
   */
  onClick: () => void;

  /**
   * Threshold in pixels to show the button
   * Default is 100px
   */
  threshold?: number;
}

/**
 * A floating search button that appears when the user scrolls down
 * and allows them to scroll back to the top and focus the search input with a single click
 */
const BackToTop: React.FC<BackToTopProps> = ({ onClick, threshold = 100 }) => {
  // Use MUI's useScrollTrigger to determine when to show the button
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });

  const handleClick = () => {
    // Scroll to top with smooth animation
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Execute the callback (focus search input)
    onClick();
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="medium"
        aria-label="back to top and search"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 24,
          // On large screens, position relative to the 1200px container
          // On smaller screens, use a fixed margin from the edge
          right: {
            xs: 24, // Default margin on small screens
            lg: `calc((100% - 1200px) / 2 + 24px)` // Align with the 1200px container on large screens
          },
          zIndex: 1000,
        }}
      >
        <SearchIcon />
      </Fab>
    </Zoom>
  );
};

export default BackToTop;
