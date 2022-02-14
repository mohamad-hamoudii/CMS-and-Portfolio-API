require('dotenv').config();
const userModel = require('../../../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const changeEmail = async (req, res) => {

    const { newEmail, currentEmail, password, token } = req.body;

    const user = await userModel.findOne({ currentEmail });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid user email' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.json({ status: 'error', error: 'Wrong password' });
    }

    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);
        await userModel.updateOne({ id: user.id, email: currentEmail }, { $set: { email: newEmail } });
        
        return res.json({ status: 'ok' });
    } catch (error) {
        return res.json({ status: 'error', error: 'Invalid token' });
    }
}

module.exports = changeEmail;