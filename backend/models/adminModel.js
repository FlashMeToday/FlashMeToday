const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
});

// Method to check if entered password matches the hashed password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  const pepperedPassword = enteredPassword + (process.env.PASSWORD_PEPPER || '');
  return await bcrypt.compare(pepperedPassword, this.password);
};

// Hook to encrypt password before saving
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const pepperedPassword = this.password + (process.env.PASSWORD_PEPPER || '');
  this.password = await bcrypt.hash(pepperedPassword, salt);
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
