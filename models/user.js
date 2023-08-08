import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    require: [true, 'Email is required!']
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^[\w-]{4,16}$/, 'Username invalid,it should contain 4-16 !']
  },
  image: {
    type: String
  }
})

const User = models.User || model('User', UserSchema)

export default User
