const Contact = require("../models/contact");

const getContact = async (req, res, next) => {
  let contact;

  try {
    contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.contact = contact;
  next();
};

module.exports = { getContact };
