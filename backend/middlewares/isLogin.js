const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

const isLogin = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ success: false, message: 'You have to login to create post' });
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: 'Error while Verification' });
        }

        const { id } = payload;

        User.findByPk(id).then((filteredUser) => {
            if (!filteredUser) {
                return res.status(401).json({ success: false, message: 'User not found in db' });
            }
            req.user = filteredUser;
            next();
        }).catch(e => {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        });
    });
};

module.exports = { isLogin };
