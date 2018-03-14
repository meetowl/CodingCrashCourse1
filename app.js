const express = require('express')
var bodyParser = require("body-parser")
const app = express()

let colour = '#ffff00'

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/getColour', (req, res) => {
  res.send(colour)
})

app.post('/setColour', (req, res) => {
  colour = req.body.colour
})

app.listen(8000, () => {
  console.log('REST app listening on port 8000!')
})
