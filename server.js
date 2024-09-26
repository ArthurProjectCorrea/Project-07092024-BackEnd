const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./api/routes/userRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
