const express = require("express")
const dotenv = require('dotenv').config();
const cors = require('cors');

port = process.env.PORT || 5000
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/urlRoutes"));
app.listen(port, () => console.log(`Server started on port: ${port}`));
