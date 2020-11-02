const express = require('express'),
      path = require('path'),
      app = express();

const public = path.join(__dirname, '../public')
app.use(express.static(public))       //For the directory that serves our the static files(CSS and js)

app.get("*", (req, res) => {
    res.sendFile(path.join(public, 'index.html'))
})

app.listen(process.env.PORT || 8080, (done) => {
    console.log("Listening to port 8080")
})