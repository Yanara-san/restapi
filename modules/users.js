const Users = require('../models/users.model');
const { encrypt } = require('./helpers');
const uid = require('uid');

exports.userList = (_, res) => {
    Users.find({}, (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.json({ result });
    }).select('-password -salt');
}

exports.getUserById = (req, res) =>
    Users.findOne({ _id: req.parms.id }, (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.json({ result });
    }).select('-password -salt');

exports.addUser = (req, res) => {
    const salt = uid(10);
    req.body.password = encrypt(req.body.password, salt);
    req.body.salt = salt;
    Users.create(req.body, (error, _) => {
        if (error) return res.status(500).json({ error });
        return res.json({ result: 'success' });
    });
};

exports.editUser = (req, res) => {
    if (req.body.password) delete req.body.password;
    if (req.body.salt) delete req.body.salt;
    Users.findOneAndUpdate({
        _id: req.params.id
    }, req.body, { new: true }, (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.json({ result });
    });
};

exports.deleteUser = (req, res) =>
    Users.deleteOne({ _id: req.params.id }, (error, _) => {
        if (error) return res.status(500).json({ error });
        return res.json({ result: 'success deleted' });
    });