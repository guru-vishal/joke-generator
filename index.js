import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.env.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded( {extended: true} ));

app.get("/", async (req, res) => {
    const name = req.query.name;

    if(!name) {
        return res.render("index.ejs", {joke: null} );
    }

    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?contains`, {
           params: {contains: name.at(0)}
        });
        res.render("index.ejs", {joke: response.data.joke || `${response.data.setup} - ${response.data.delivery}`} );
    }
    catch(error) {
        console.error("Failed to make request", error.message);
        res.status(500).send("Failed to fetch joke.");
    }
});

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`);
});
