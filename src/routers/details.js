const express = require("express");
const router = new express.Router();

const Details = require("../models/Details");
const auth = require("../middleware/Auth");

router.post("/details", auth, async (req, res) => {
  // const details = new Details(req.body)
  const details = new Details({
    ...req.body,
    owner: req.user._id,
  });
  details
    .save()
    .then(() => {
      res.send(details);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/details/me",auth, async (req, res) => {
  try {
    const details = await Details.find({ owner: req.user._id});
    res.send(details);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
