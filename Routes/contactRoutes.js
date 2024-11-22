const express = require("express");
const router = express.Router();
const {getContacts,createContact,updateContact,
    getContact,deleteContact} = require("../Controllers/contactController");
    const validateToken = require("../Middleware/validateToken");

router.use(validateToken);
router.route("/").get(getContacts).post(validateToken,createContact);

//if the is id there should be req.params.id.
router.route("/:id").get(getContact).put(updateContact)
.delete(deleteContact);

module.exports= router;