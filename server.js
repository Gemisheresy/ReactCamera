const express = require('express');
const app =express();
const currDir = __dirname;
app.use("/lib",express.static(`${currDir}/lib`))
app.get("/",(req,res)=>{
    res.sendFile(`${currDir}/index.html`)
})
app.listen(8080)