const mongoose = require('mongoose')

const url = 'mongodb+srv://fullstack:fullstack@cluster0.v3rtg.mongodb.net/fullstack-note-app?retryWrites=true&w=majority'
console.log('connecting to', url)
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  date: { 
    type: Date,
    required: true
  },
  important: Boolean,
})
// const Note = mongoose.model('Note', noteSchema)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)