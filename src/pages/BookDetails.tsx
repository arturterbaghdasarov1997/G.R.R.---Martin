import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBook } from "../interfaces/books.interface";
import fetchDetails from "../api/service";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

const BookDetails: React.FC = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [bookDetails, setBookDetails] = useState<IBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!isbn) return;

      try {
        const data = await fetchDetails(isbn, "book");
        console.log("Fetched Book Data:", data);
        setBookDetails(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [isbn]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!bookDetails) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
        No book details found.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ minWidth: 275, maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h2">
            <strong>{bookDetails.name}</strong>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Authors: {bookDetails.authors.join(", ")}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            ISBN: {bookDetails.isbn}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Number of Pages: {bookDetails.numberOfPages}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Publisher: {bookDetails.publisher}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Country: {bookDetails.country}
          </Typography>
          {bookDetails.publishedDate && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Published Date: {bookDetails.publishedDate}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookDetails;
