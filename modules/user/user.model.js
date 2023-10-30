import { Schema, model } from "mongoose"

const UserSchema =  new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true, startAt: 1},
  name: {type: String, required: true, maxlength: 50},
  address: {type: String, required: true, maxlength: 50},
  email: {type: String, required: true, maxlength: 100, unique: true},
  password: {type: String, required: true}
})

module.exports = model('User', UserSchema);

