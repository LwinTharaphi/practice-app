import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BoxBasic() {
  return (
    <main>
      <Box 
        component="section" 
        sx={{
          border: '2px solid #4A90E2', // Blue border color
          m: 5,
          p: 4,
          borderRadius: 2,
          backgroundColor: '#f5f5f5', // Light background color
          textAlign: 'center',
          boxShadow: 2 // Subtle shadow for depth
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: '#4A90E2' }}>
          Stock Management v1.0
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#555' }}>
          Manage your products and categories with ease.
        </Typography>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mr: 2 }}
              href="/product" // Added Button functionality for Products
            >
              Products
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              href="/category" // Added Button functionality for Categories
            >
              Category
            </Button>
          </li>
        </ul>
      </Box>
    </main>
  );
}
