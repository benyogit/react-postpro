const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    
  },
  skills: [String],
  github: {
    type: String
  },
  education: [
    {
      institute: { type: String, required: true },
      description: { type: String, required: true },
      from: { type: Date, default: Date.now ,required: true},
      to: { type: Date, default: Date.now }
    }
  ],
  experience: [
    {
      company: { type: String, required: true },
      title: { type: String, required: true},
      role: { type: String },
      location: {
        type: String
      },
      from: { type: Date, default: Date.now },
      to: { type: Date, default: Date.now }
    }
  ],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
