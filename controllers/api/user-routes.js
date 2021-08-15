const router = require('express').Router();
const { User, Post, Comment } = require("../../models");
// const withAuth = require('../../utils/auth');

// GET /api/users
router.get('/', (req, res) => {
// Access our User model and run .findAll() method)
  User.findAll(
      {
    attributes: {exclude: ['password']}
  }
  )
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
          id: req.params.id
        },
        attributes: {exclude: ['password']},
          // replace the existing `include` with this
        include: [
          {
             model: Post,
             attributes: ['id', 'title', 'created_at']
           },
           // include the Comment model here:
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'created_at'],
              include: {
                // including the Post model on the comment model so we can see which posts the user commented
                model: Post,
                attributes: ['title']
              }
            }
         ]
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// POST /api/users
// add withAuth back in here
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json(dbUserData);
    });
  })
  .catch(err => {
     console.log(err);
     res.status(500).json(err);
  });

});

// find user by id POST is standard for for login because it is more secure
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

// POST logout route destroy session and reset cookies
router.post('/logout',(req, res) => {
  console.log(`===== 1st =====`)
  if(req.session.loggedIn) {
    console.log(`===== log out =====`)
    req.session.destroy(() => {
      // successfully destroyed 
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT /api/users/1
// add withAuth back in here
router.put('/:id', (req, res) => {
// expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    // add this to make beforeUpdate in User model work -the hashing of new password
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
// add withAuth back in here
router.delete('/:id',  (req, res) => {
  User.destroy({
    where: {
       id: req.params.id
    }
  })
    .then(dbUserData => {
       if (!dbUserData) {
         res.status(404).json({ message: 'No user found with this id' });
         return;
      }
       res.json(dbUserData);
     })
    .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
});


module.exports = router;