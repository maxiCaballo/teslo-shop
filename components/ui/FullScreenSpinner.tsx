import { Box, Typography, CircularProgress } from '@mui/material';

export const FullScreenSpinner = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      gap={2}
    >
      <Typography variant="h2">Loading...</Typography>
      <CircularProgress thickness={2} color="secondary" />
    </Box>
  );
};
