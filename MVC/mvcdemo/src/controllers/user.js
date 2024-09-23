const User = require('../models/user.model')
const handleGetAllUser = async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.json(allUsers)
    } catch (error) {
        res.status(500).send({ message: 'Server error' })
    }
}

const handleGetUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).send({ message: 'User not found' })
        return res.json(user)
    } catch (error) {
        res.status(500).send({ message: 'Server error' })
    }
}

const handleUpdateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            username: req.body.username, email: req.body.email, gender: req.body.gender
        }, { new: true })  // This option returns the updated user
        if (!user) return res.status(404).send({ message: 'User not found' })
        return res.json({ status: "success", user })
    } catch (error) {
        res.status(500).send({ message: 'Server error' })
    }
}

const handleDeleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ status: "success", message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const handleCreateNewUser = async (req, res) => {
    const body = req.body
    if (!body || !body.username || !body.email || !body.gender) {
        return res.status(400).send({ message: 'All fields are required' })
    }

    try {
        const result = await User.create({
            username: body.username,
            email: body.email,
            gender: body.gender
        })
        return res.status(201).json({ msg: "success", id: result._id })
    } catch (error) {
        res.status(500).send({ message: 'Server error' })
    }
}


module.exports = {
    handleGetAllUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById
    , handleCreateNewUser
}