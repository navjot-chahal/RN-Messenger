const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getAllLists, postList, deleteList } = require('../controllers/list');

router.route('/getAll').get(protect, getAllLists);
router.route('/add').post(protect, postList);
router.route('/remove').post(protect, deleteList);
// router.route('/isSitter/').patch(protect, setIsSitter);

module.exports = router;
