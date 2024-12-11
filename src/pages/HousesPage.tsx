import React, { useEffect, useState } from "react";
import { IHouse } from "../interfaces/houses.interface";
import { getData } from "../api/service";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const HousesPage: React.FC = () => {
  const [houses, setHouses] = useState<IHouse[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const houses = await getData("houses");
        setHouses(houses);
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHouses();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!houses) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
        No data found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        mt: 4,
      }}
    >
      {houses.map((house) => (
        <Card key={house.name} sx={{ minWidth: 275, maxWidth: 300 }}>
          <CardContent>
            <Link
              to={`/houses/${house.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6">{house.name}</Typography>
            </Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default HousesPage;
