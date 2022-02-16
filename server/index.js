const axios = require('axios');
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require('cors');

dotenv.config();

//middleware
app.use(express.json());
app.use(cors())
app.use(helmet());

const PORT = process.env.PORT || 5000;


app.post('/api/complierun', async(req,res) => {
  await axios.post("https://api.jdoodle.com/v1/execute", {
    script : req.body.code,
    language: req.body.language,
    versionIndex: "0",
    stdin: req.body.inputs,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }).then(resp => {
    console.log(resp.data)
    res.status(200).json(resp.data);
  })
  
})



app.listen(PORT, () => {
  console.log("Server running on port 5000...");
});