import React, { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./ManageCategories.css";
import CategoryList from "../../components/CategoryList/CategoryList";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

const ManageCategories = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <Box className="manage-categories-container" sx={{ p: 2 }}>
      {/* Top row: Search + Add Button */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              size="small"
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                bgcolor: "#1565c0",
              color: "#fff",
              "&:hover": { bgcolor: "#0d47a1" },
                height: "40px",
                whiteSpace: "nowrap",
                minWidth: "80px",
              }}
            >
              Search
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleOpen}
            sx={{
              height: "40px",
              bgcolor: "#1565c0",
              color: "#fff",
              "&:hover": { bgcolor: "#0d47a1" },
            }}
          >
            ➕ Add Category
          </Button>
        </Grid>
      </Grid>

      {/* View Categories Section */}
      <Box
        sx={{
          mt: 3,
          backgroundColor: "#2C3335",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #115293",
          color: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom>
          📋 View Categories
        </Typography>
        <CategoryList searchQuery={searchQuery} />
      </Box>

      {/* Add Category Dialog */}
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            bgcolor: "#1565c0",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add New Category
          <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            bgcolor: "#2C3335",
            color: "#fff",
            p: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CategoryForm />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ManageCategories;
