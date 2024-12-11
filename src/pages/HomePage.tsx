import React from "react";
import { getData } from "../api/service";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const HomePage: React.FC = () => {
  const Array = ["books", "characters", "houses"];

  const handleClick = (param: string) => {
    getData(param);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {Array.map((item) => (
        <Button
          key={item}
          component={Link}
          to={item}
          variant="contained"
          color="primary"
          sx={{ mb: 2, mx: 1 }}
        >
          <Typography variant="h6">{item.toUpperCase()}</Typography>
        </Button>
      ))}
    </Box>
  );
};

export default HomePage;
