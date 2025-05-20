const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const teamMembersRoutes = require("./routes/teamMembers");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/team-members", teamMembersRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
