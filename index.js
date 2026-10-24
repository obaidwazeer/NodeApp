import express from "express";
const app = express();

app.get("/", (req, res)=>{
    res.send("The server is up and running")
})

app.listen("8080", () => {
    console.log("App is running")
})