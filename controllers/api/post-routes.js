// import express routes
const router = require('express').Router();
// import Post and USer model
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// -------------------------------- get all posts --------------------------------//
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      // Query configuration
    //   need to decide what column to populate
    attributes: [
      'id', 
      'title',
      'post_text',
      'created_at',
      ],
    order: [['created_at', 'DESC']],
    // make it an array so if there were ever multiple joins we would be ready
    include: [ 
      // Comment model to get comments associated with posts
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          // also includes the user model so it can attach the username to the comment
          model: User,
          attributes: ['username']
        }
      },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
      // turn our array of posts into a variable and use map() to post.get to serialize each post and save into a new array
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts);
      res.render('homepage', { posts });
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// -------------------------------- find one post --------------------------------//
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }

        // serialize the data
        const post = dbPostData.get({ plain: true });

        // pass data to template
        res.render('single-post', { post });
        console.log(post)
        res.json(post)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
// -------------------------------- create Post --------------------------------//
router.post('/', withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,

    user_id: req.session.user_id
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
     console.log(err);
    res.status(500).json(err);
  });
});


// -------------------------------- update a post --------------------------------//
// add withAuth back in here
router.put('/:id', withAuth, (req, res) => {
    Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// -------------------------------- Delete a post --------------------------------//
// add withAuth back in here  
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// expose api end points
module.exports = router;