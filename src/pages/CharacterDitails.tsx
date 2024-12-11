import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { ICharacter } from "../interfaces/characters.interface";
import fetchDetails from "../api/service";

const CharacterDetails: React.FC = () => {
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await fetchDetails("all", "character");

        if (data && data.length > 1) {
          setCharacter(data[1]);
        } else {
          setCharacter(null);
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  if (!character) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Card sx={{ minWidth: 275, maxWidth: 600, mb: 2 }}>
        <CardContent>
          <Typography variant="h2">
            <strong>{character.name || "Unnamed Character"}</strong>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Gender: {character.gender || "Unknown"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Played By: {character.playedBy.length > 0 ? character.playedBy.join(", ") : "Not Played"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CharacterDetails;
