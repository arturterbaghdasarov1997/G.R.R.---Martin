import React, { useEffect, useState } from "react";
import { ICharacter } from "../interfaces/characters.interface";
import { getData } from "../api/service";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const allCharacters = await getData("characters");
        const filteredCharacters = allCharacters.filter(
          (character: ICharacter) => character.name && character.name.trim() !== ""
        );
        setCharacters(filteredCharacters);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!characters || characters.length === 0) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
        No characters found.
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
      {characters.map((character) => (
        <Card key={character.id} sx={{ minWidth: 275, maxWidth: 300 }}>
          <CardContent>
            <Link
              to={`/characters/${character.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6">{character.name}</Typography>
            </Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CharactersPage;
