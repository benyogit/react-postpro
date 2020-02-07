const express = require("express");
const router = express.Router();
const auth = require("./midlleware/auth");
const Profile = require("../model/Profiles");

const { check, validationResult } = require("express-validator");

router.get("/self", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      res.status(400).json({ msg: "This is not the User's profile" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put(
  "/self/education/delete",
  auth, async (req, res) => {
    

    const errors = validationResult(req);
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      
      if (!profile) {
        res.status(400).json({ msg: errors});
      } else {
        const index= profile.education.find(edu => edu._id==req.body.id);
        profile.education.splice(index,1);
        profile.save();
        console.log(profile.education);
        res.status(200).json({ education:profile.education });
      }
      
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);


router.put(
  "/self/education",
  auth,
  [
    check("institute", "Must contain 3 letterrs at least").isLength({ min: 3 }),
    check("description", "Must contain 3 letterrs at least").isLength({
      min: 3
    }),

    check("from", "should be a valid date form").custom(isValidDate)
  ],
  async (req, res) => {
    

    const errors = validationResult(req);
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      
      if (!profile) {
        res.status(400).json({ msg: errors});
      } else {
        profile.education.push(req.body);
        profile.save();
        
        res.status(200).json({ education:profile.education });
      }
      
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

router.put(
  "/self/experience/delete",
  auth, async (req, res) => {
    

    const errors = validationResult(req);
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      
      if (!profile) {
        res.status(400).json({ msg: errors});
      } else {
        const index= profile.experience.find(exp => exp._id==req.body.id);
        profile.experience.splice(index,1);
        profile.save();
        
        res.status(200).json({ experience:profile.experience });
      }
      
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);
router.put(
  "/self/experience",
  auth,
  [
    check("company", "Must contain 3 letterrs at least").isLength({ min: 3 }),
    check("title", "Must contain 3 letterrs at least").isLength({
      min: 3
    }),

    check("from", "should be a valid date form").custom(isValidDate)
  ],
  async (req, res) => {
    

    const errors = validationResult(req);
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      
      if (!profile) {
        res.status(400).json({ msg: errors});
      } else {
        profile.experience.push(req.body);
        profile.save();
        
        res.status(200).json({ experience:profile.experience });
      }
      
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);


function isValidDate(value) {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

 

  const date = new Date(value);
  
  if (!date.getTime()) {
    
    return false;
  }
  
  const check= date.toISOString().slice(0, 10) === value;
  
  return date.toISOString().slice(0, 10) === value;
}

module.exports = router;
