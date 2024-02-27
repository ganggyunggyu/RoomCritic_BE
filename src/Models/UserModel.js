import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  displayName: String,
  phoneNumber: String,
  role: String,
  reviewCount: Number,
});

const User = mongoose.model('User', userSchema);
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default User;
