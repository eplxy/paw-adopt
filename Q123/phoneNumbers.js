const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    const { name, phoneNumber } = req.body;
    const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
    if (isValidPhoneNumber) {
        res.send(`YIPPEE, ${name}! Your phone number (${phoneNumber}) is correct.`);
    } else {
        res.send(`NOPE. The phone number (${phoneNumber}) is not in the correct format.`);
    }
});

function validatePhoneNumber(phoneNumber) {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    return regex.test(phoneNumber);
}


module.exports = router;
