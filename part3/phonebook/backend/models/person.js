const mongoose = require('mongoose')

const url = `mongodb+srv://fullstack:fullstack@cluster0.v3rtg.mongodb.net/fullstack-phonebook-app?retryWrites=true&w=majority`
console.log('connecting to', url)
const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
  })
// const Person = mongoose.model('Phonebook', phonebookSchema)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

phonebookSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
}
})

module.exports = mongoose.model('Phonebook', phonebookSchema)