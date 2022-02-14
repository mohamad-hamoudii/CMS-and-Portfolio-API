require('dotenv').config();
const userModel = require('../../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
    const { email, password } = req.body;

    // changeAdmin(res, email, password);
    
    const user = await userModel.findOne({ email: email });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.json({ status: 'error', error: 'Wrong password' });
    }

    const secret = process.env.JWT_SECRET_TOKEN;
    const token = jwt.sign({ email }, secret)
    return res.json({ status: 'ok', token })
}

const addAdmin = async (res, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await userModel.create({ email, password: hashedPassword });
        console.log(user);
        return res.json({ status: 'ok' });
    } catch (error) {
        return res.json({ status: 'error', error: error.message });
    }
}

module.exports = signIn;