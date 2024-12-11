import React, { useEffect, useState } from "react";
import { IBook } from "../interfaces/books.interface";
import { getData } from "../api/service";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<IBook[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getData("books");
        setBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!books || books.length === 0) {
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
      {books.map((book) => (
        <Card key={book.isbn} sx={{ minWidth: 275, maxWidth: 300 }}>
          <CardContent>
            <Link
              to={`/bookDetails/${book.isbn}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6">{book.name}</Typography>
            </Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default BooksPage;
