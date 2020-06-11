const express = require('express')
const path = require('path')
const app = express()

// use static folder
app.use(express.static(path.resolve(__dirname, 'client')))

// any GET request return index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server running!'))