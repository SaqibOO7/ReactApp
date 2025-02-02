// Import the required modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Initialize the express app
const app = express();
const port = 3000; // You can change this if needed

// Route to handle the API request
app.get("/api", (req, res) => {
  // Get the names from the query parameters
  const names = req.query.name;

  // Read the JSON data from the file
  const filePath = path.join(__dirname, "q-vercel-python.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // If no names are provided, return an error
  if (!names || names.length === 0) {
    return res.status(400).json({ error: "No names provided." });
  }

  // Filter the marks based on the names provided
  const marks = names.map((name) => {
    const student = data.find((student) => student.name === name);
    return student ? student.marks : null; // Return marks or null if not found
  }).filter((mark) => mark !== null); // Filter out any null values

  // If no valid marks were found, return an error
  if (marks.length === 0) {
    return res.status(404).json({ error: "No valid students found." });
  }

  // Return the marks as a JSON response
  res.status(200).json({ marks });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
