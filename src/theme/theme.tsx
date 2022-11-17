import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const PMTheme = createTheme({
  typography: {
    fontFamily: 'Inter',
    fontSize: 14,
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: grey[900],
    },
  },
});

export default PMTheme;
