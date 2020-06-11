const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

// database
let CONTACTS = [{
  id: v4(), name: 'Adam', value: '8-800-2000-600', marked: false
}]

// to work with requests
app.use(express.json())

// on GET request return CONTACTS
app.get('/api/contacts', (req, res) => {
  // simulate loading
  setTimeout(() => {
    res.status(200).json(CONTACTS)
  }, 1500);
})

// POST
app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false}
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
  res.status(200).json({message: 'Contact was deleted'}) // status 200 is not necessary for express
})

// PUT
app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(c => c.id === req.params.id)
  CONTACTS[idx] = req.body
  res.json(CONTACTS[idx])
})

// use static folder
app.use(express.static(path.resolve(__dirname, 'client')))

// any GET request return index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server running!'))