// Sign up

// Receive the req.body from client
// Hash the password before it gets to the database
// Check if user submitted the required values and check if what was submitted is already in the database
// If it exists, inform the user. Else save to the database
// While it saves, generate a unique token to authorize access to protected endpoints.

// Login

// Receive the req.body from the client
// Verify password provided by seeing if the password matches the hash
// If the hash matches then respond with a token
// This token must then be provided to access other routes in the application as part of future requests

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user';
import Token from '../middleware/token';

export function createUser(req, res) {
  bcrypt.hash(req.body.password, 15, (err, hash) => {
    const password = hash;
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password,
    });
		// check that user submits the required value
    if (!user.username || !user.email || !user.password) {
      return res.status(400).json({
        message: 'Please ensure you fill the username, email, and password',
      });
    }
		// verify the user isn't stored in the database
    return User.count({
      $or: [
        { username: req.body.username },
        { email: req.body.email },
      ],
    })
    .then((count) => {
      if (count > 0) {
        res.status(401).json({
          message: 'This user exists',
        });
      }
			// if user doesn't exist, create one
      return user
        .save()
        .then((newUser) => {
          const token = Token(newUser);          
          res.status(201).json({
            message: 'User signup successfully',
            newUser: {
							username: newUser.username,
							email: newUser.email,
						},      
          });
        })
        .catch(() => {
          res.status(500).json({
            message: 'Our server is in the locker room, please do try again.'
          });
        });
      });
    }); 
}

export function loginUser(req, res) {
  const { username, password } = req.body;
	console.log(req.body);
	console.log('hit');
  User.findOne({ username })
    .then((existingUser) => {
			console.log(existingUser)

      bcrypt.compare(password, existingUser.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Not authorized',
          });
        }
        if (result) {
          const token = Token(existingUser);
          return res.status(200).json({
            message: 'User authorization successful',
            existingUser: {
              username: existingUser.username,
              email: existingUser.email,
              _id: existingUser.id,
            },
            token,
          });
        }
        return res.status(401).json({
          message: 'Invalid details',
        });
      });
    })
    .catch(() => res.status(500).json({ message: 'Our server is in the locker room, please do try again.' }));
}


export default User;