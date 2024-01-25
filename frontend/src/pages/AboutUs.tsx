import { Container, Paper, Typography } from "@mui/material";

export default function AboutUs() {
  return (
    <Container component={Paper} elevation={3} sx={{ p: 2 }}>
      <Typography textAlign="center" variant="h3">
        This is About Us Page
      </Typography>
    </Container>
  );
}
