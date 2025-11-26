import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    body: string;
    rating: number;
  }) => void;
};

export default function AddReviewModal({ open, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState<number>(0);

  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [ratingError, setRatingError] = useState("");

  function handleSubmit() {
    let valid = true;
    
    valid = validateData(valid);

    if (!valid) return;

    onSubmit({ title, body, rating });
    onClose();

    setTitle("");
    setBody("");
    setRating(0);
  }

  function validateData(valid: boolean) {
    if (!title.trim()) {
      setTitleError("Title is required");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!body.trim()) {
      setBodyError("Description is required");
      valid = false;
    } else {
      setBodyError("");
    }

    if (!rating) {
      setRatingError("Please select a rating");
      valid = false;
    } else {
      setRatingError("");
    }
    return valid;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Review</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={title}
          error={Boolean(titleError)}
          helperText={titleError}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError("");
          }}
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          margin="normal"
          value={body}
          error={Boolean(bodyError)}
          helperText={bodyError}
          onChange={(e) => {
            setBody(e.target.value);
            setBodyError("");
          }}
        />

        <Box sx={{ mt: 2 }}>
          <Rating
            value={rating}
            onChange={(_, value) => {
              setRating(value ?? 0);
              setRatingError("");
            }}
            size="large"
          />
          {ratingError && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: "block", mt: 0.5 }}
            >
              {ratingError}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
