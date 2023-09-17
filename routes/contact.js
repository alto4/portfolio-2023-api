const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

const { getContact } = require("../middleware/getContact");

// Get all contact records
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get contact record details
router.get("/:id", getContact, (req, res) => {
  res.json(res.contact);
});

// Create a new contact record
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  const contact = new Contact({
    name,
    email,
    message,
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing contact record
router.patch("/:id", getContact, async (req, res) => {
  const { name, email, message } = req.body;

  if (name) {
    res.contact.name = name;
  }

  if (email) {
    res.contact.email = email;
  }

  if (message) {
    res.contact.message = message;
  }

  try {
    const updatedContact = await res.contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a contact record
router.delete("/:id", getContact, async (req, res) => {
  try {
    await res.contact.deleteOne();
    res.json({ message: "Successfully deleted contact." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
