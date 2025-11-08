import app from "./app.js";
import express from "express";
const port = 5001;

app.listen(port, () => {
  console.log("API corriendo en puerto: ", port);
});
