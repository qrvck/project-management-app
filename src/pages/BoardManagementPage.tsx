import { Button, Grid, Paper, styled, Typography } from '@mui/material';
import React from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  minWidth: '20rem',
}));

function BoardManagementPage() {
  return (
    <div>
      <h1>Board Management Page</h1>
      <Button variant="contained">+ create column</Button>

      <Grid container spacing={2} mt={3} wrap={'nowrap'}>
        <Grid item xs={8}>
          <Item elevation={2}>
            <Typography variant="h6" gutterBottom>
              Column 1
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item elevation={2}>
            <Typography variant="h6" gutterBottom>
              Column 2
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item elevation={2}>
            <Typography variant="h6" gutterBottom>
              Column 3
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item elevation={2}>
            <Typography variant="h6" gutterBottom>
              Column 4
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default BoardManagementPage;
