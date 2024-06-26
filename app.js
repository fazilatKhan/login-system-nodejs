const express = require('express');
const sequelize = require('./config/database'); // Verify this path is correct relative to app.js
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors());
// Example usage:
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    // Additional code here
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);


// Sync database
sequelize.sync()
  .then(() => {
      app.listen(port, () => {
          console.log(`Server running on port ${port}`);
      });
  })
  .catch(err => console.error('Unable to sync database and start server:', err));
