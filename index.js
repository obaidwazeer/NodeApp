import express from "express";

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("The server is up and running");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`App is running on port ${PORT}`);
});