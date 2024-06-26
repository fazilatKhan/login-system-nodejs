const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cors = require('cors');
const ResponseHandler = require('../util/responseHandler');
// const ResponseHandler = require('../utils/responseHandler');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password'] // Selecting id, username, and password
        });
        ResponseHandler.handleServerDataGet(res, users);
    } catch (err) {
        ResponseHandler.handleServerError(res, err);
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'username', 'password'] // Selecting id, username, and password
        });
        if (user) {
            ResponseHandler.handleServerDataGet(res, user);
        } else {
            ResponseHandler.handleServerError(res, { message: 'User not found' });
        }
    } catch (err) {
        ResponseHandler.handleServerError(res, err);
    }
});


// Login route
// router.post('/users', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Find the user by username
//         const user = await User.findOne({ where: { username: username } });

//         if (!user) {
//             // User not found
//             return res.status(400).json({ message: 'Username or password is incorrect' });
//         }

//         // Compare passwords (assuming plain text passwords, but you should use hashed passwords in production)
//         if (user.password === password) {
//             // Passwords match
//             ResponseHandler.handleServerDataGet(res, user);
//         } else {
//             // Passwords do not match
//             return res.status(400).json({ message: 'Username or password is incorrect' });
//         }
//     } catch (err) {
//         ResponseHandler.handleServerError(res, err);
//     }
// });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            // User not found
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }

        // Compare passwords (assuming plain text passwords, but you should use hashed passwords in production)
        if (user.password === password) {
            // Passwords match
            const responseData = {
                id: user.id,
                username: user.username,
                updatedAt: user.updatedAt.toISOString(),
                createdAt: user.createdAt.toISOString()
            };
            ResponseHandler.handleServerDataGet(res, responseData);
        } else {
            // Passwords do not match
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }
    } catch (err) {
        ResponseHandler.handleServerError(res, err);
    }
});
// Create a new user
router.post('/users', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const newUser = await User.create({
            username,
            password // Storing the plain text password
        });

        // Format the response to include a clear success message
        const response = {
            message: 'User created successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                password: newUser.password,
                updatedAt: newUser.updatedAt.toISOString(),
                createdAt: newUser.createdAt.toISOString()
            }
        };

        ResponseHandler.handleServerDataCreated(res, response);
    } catch (err) {
        ResponseHandler.handleServerError(res, err);
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            const { username, password } = req.body;

            if (username) {
                user.username = username;
            }

            if (password) {
                user.password = password;
            }

            await user.save();

            res.json({ message: 'User updated successfully', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        ResponseHandler.handleServerError(res, err);
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        ResponseHandler.handleServerError(res, err);
    }
});

module.exports = router;
