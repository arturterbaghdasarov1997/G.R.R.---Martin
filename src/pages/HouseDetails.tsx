import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchDetails from "../api/service";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

interface IHouse {
  name: string;
  region: string;
  coatOfArms: string;
}

const HouseDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [house, setHouse] = useState<IHouse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const data = await fetchDetails(name, "house");
        console.log("Fetched House Data:", data);
        setHouse(data || null);
      } catch (error) {
        console.error("Error fetching house details:", error);
        setHouse(null);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchHouse();
    }
  }, [name]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!house) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
        House not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ minWidth: 275, maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h2" component="div" sx={{ mb: 2 }}>
            <strong>{house.name || "Unknown House"}</strong>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Region:</strong> {house.region || "Unknown Region"}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Coat of Arms:</strong> {house.coatOfArms || "No Coat of Arms"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HouseDetails;
