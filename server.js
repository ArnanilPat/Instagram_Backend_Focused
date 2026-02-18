require('dotenv').config(); //First line



const app = require("./src/app");
const connectDB = require("./src/config/database");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
