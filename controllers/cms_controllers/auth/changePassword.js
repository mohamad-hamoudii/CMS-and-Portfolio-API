require('dotenv').config();
const userModel = require('../../../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {

    const { email, currentPassword, newPassword, token } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid user email' });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
        return res.json({ status: 'error', error: 'Wrong password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const secret = process.env.JWT_SECRET_TOKEN;

    try {
        jwt.verify(token, secret);

        await userModel.updateOne({ id: user.id, email }, { $set: { password: hashedPassword } })
        return res.json({ status: 'ok' });
    } catch (error) {
        return res.json({ status: 'error', error: 'Invalid token' });
    }
}

module.exports = changePassword;