import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';

interface AnimeStatsProps {
  score?: number;
  rank?: number;
  popularity?: number;
  members?: number;
}

const AnimeStats: React.FC<AnimeStatsProps> = ({
  score,
  rank,
  popularity,
  members
}) => {
  const stats = [
    {
      label: 'Score',
      value: score ? score.toFixed(2) : 'N/A',
      icon: <StarIcon sx={{ color: '#FFD700' }} />,
      color: '#FFF9C4'
    },
    {
      label: 'Rank',
      value: rank ? `#${rank}` : 'N/A',
      icon: <EmojiEventsIcon sx={{ color: '#673AB7' }} />,
      color: '#EDE7F6'
    },
    {
      label: 'Popularity',
      value: popularity ? `#${popularity}` : 'N/A',
      icon: <TrendingUpIcon sx={{ color: '#F44336' }} />,
      color: '#FFEBEE'
    },
    {
      label: 'Members',
      value: members ? members.toLocaleString() : 'N/A',
      icon: <PeopleIcon sx={{ color: '#2196F3' }} />,
      color: '#E3F2FD'
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Grid key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: '100%',
              backgroundColor: stat.color,
              borderRadius: 2,
              width: '150px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {stat.icon}
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                {stat.label}
              </Typography>
            </Box>
            <Typography variant="h6" component="div" fontWeight="bold">
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </>
  );
};

export default AnimeStats;
