import app from "./app.js";
import express from "express";
import initFinancialDB from "../initDb.js";

const port = 5001;

initFinancialDB();
app.listen(port, () => {
  console.log("API corriendo en puerto: ", port);
});
