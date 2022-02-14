require('dotenv').config();
const userModel = require('../../../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const resetPassword = async (req, res) => {

    const {id, password, token} = req.body;

    const user = await userModel.findOne({ id });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid user id' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const secret = process.env.JWT_SECRET_TOKEN + user.password;
    
    try{
        jwt.verify(token, secret);

        await userModel.updateOne({ id: id, email: user.email}, { $set: { password: hashedPassword}})

        return res.json({ status: 'ok' });
    }catch(error){
        return res.json({ status: 'error', error: 'Password reset link expired' });
    }
}

module.exports = resetPassword;