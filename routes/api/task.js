import { Router } from 'express';
import mongoose from 'mongoose';
import Task from "../../models/Task.js";

const router = Router();

router.get('/tasks', (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user._id)
      .populate('tasks')
      .exec((err, user) => {
        if (err) { console.log(err); }
        res.json(user.tasks);
      });
  } else {
    res.redirect('/login');
  }
});

router.post('/tasks', (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    user: req.user._id
  });
  newTask.save()
    .then(() => {
      User.findByIdAndUpdate(req.user._id, { $push: { tasks: newTask._id } })
        .then(() => {
          res.redirect('/tasks');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updates = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed
  };
  Task.findByIdAndUpdate(taskId, updates)
    .then(() => {
      res.redirect('/tasks');
    })
    .catch(err => console.log(err));
});

router.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  Task.findByIdAndRemove(taskId)
    .then(() => {
      User.findByIdAndUpdate(req.user._id, { $pull: { tasks: taskId } })
        .then(() => {
          res.redirect('/tasks');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

export default router;
