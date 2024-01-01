import { Paper, Box } from "@mui/material";
import BlogCard from "../../components/Card/BlogCard";

export default function Homepage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box component={Paper} elevation={8} sx={{ m: 2, p: 2 }}>
        <BlogCard />
      </Box>
    </Box>
  );
}
