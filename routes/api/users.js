const User = require('../../models/User')
const express = require('express')

const asyncHandler = require('../../middlewares/async')
const ErrorResponse = require('../../utils/ErrorResponse');
const mailer = require('../../utils/mailer');


const router = express.Router();


router.post('/', asyncHandler( async (req, res, next) => {
    
    const { email } = req.body;

    let user = await User.findOne(({ email }))

    if (user) {
        return next(new ErrorResponse('Email already exists.', 422))
    } else if (!email || !email.includes('@')) {
        return next(new ErrorResponse('Enter @ address.', 422))
    }


    user = new User({
        email
    });
    
    await mailer(email).catch(console.error);

    await user.save();

    
    res.json({ email })
}));


module.exports = router;