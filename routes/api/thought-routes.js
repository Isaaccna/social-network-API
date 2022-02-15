const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// GET all and POST at /api/thoughts

router
  .route('/')
  .get(getAllThoughts)
  .post(addThought); 

// /api/thoughts/<userId>
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:thoughtId/reactions')
  .put(addReaction) 

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router
  .route('/:id/reactions/:reactionId')
  .delete(removeReaction);


module.exports = router;