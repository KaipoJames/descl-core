// import Parser from "./src/parser.js";
// Parser.init();

// DEPENDENCIES
import express from 'express';
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
import pkg from 'mongodb';
const { MongoClient } = pkg;

const app = express();
const __dirname = path.resolve();
import router from "./backend/routes/router.js" ;

// Middleware
app.set("views", path.join(__dirname, "./public/views"));
app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true })); // Enable our form data to be accessed by the 'req' variable in our routes
app.use(express.json());
app.use("/", router);


app.listen(process.env.PORT || 5000, (err, res) => {
    if (err) console.log(err);
    console.log("Server is listening on port 5000 at: http://localhost:5000");

    const mongoClient = new MongoClient(process.env.MONGO_CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect((err, client) => {
        if (err) { console.error(err); }
        console.log("Connected To MongoDB");
    });

});