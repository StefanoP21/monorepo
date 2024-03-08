import { Grid, Typography } from '@mui/material';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { sm: 450 },
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" textAlign="left" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
