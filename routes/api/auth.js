import { Router } from 'express';
import bcryptjs from 'bcryptjs';
import User from "../../models/User.js";

const router = Router();

router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username })
      .then(user => {
        if (user) {
          res.status(409).json({
            message: 'User already exists'
          });
        } else {
          bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(password, salt, (err, hash) => {
              const newUser = new User({
                username: username,
                password: hash
              });
              newUser.save()
                .then(() => {
                  res.status(201).json({
                    message: 'User created',
                    username: username,
                    password: password
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  
  

export default router;
