const { User } = require('../models');

const userController = {

    //get all users
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //get a single user bt its id
    getUserById({ params },res) {
        User.findOne({ _id: params.id} )
        .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => {
            // If no User is found, send 404
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
    
    //create a user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //update user by its id
    updateUser({ params, body }, res) {
         User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },

      // delete User
    deleteUser({ params }, res) {
       User.findOneAndDelete({ _id: params.id })
         .then(dbUserData => {
           if (!dbUserData) {
             res.status(404).json({ message: 'No User found with this id!' });
             return;
           }
           res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
     },
     addFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.id }, // changed from params.userId to params.id
          { $addToSet: { friends:params.friendId } },
          { new: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No friend found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
    
      // remove friend
      removeFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $pull: { friends:params.friendId }},
          { new: true }
        )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      }
    }
   
module.exports = userController;
      
