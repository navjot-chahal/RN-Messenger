const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getAllLists, postList } = require('../controllers/list');

router.route('/getAll').get(protect, getAllLists);
router.route('/add').post(protect, postList);
// router.route('/isSitter/').patch(protect, setIsSitter);

module.exports = router;
