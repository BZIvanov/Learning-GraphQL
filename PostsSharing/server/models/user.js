const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  createdAt: { type: String },
});

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    console.log(err);
    throw new Error('Failed user password hash');
  }
});

userSchema.methods.isPasswordCorrect = async (
  incomingPassword,
  actualPassword
) => {
  try {
    return await bcrypt.compare(incomingPassword, actualPassword);
  } catch (err) {
    throw new Error('Error with comparing passwords');
  }
};

module.exports = model('User', userSchema);
