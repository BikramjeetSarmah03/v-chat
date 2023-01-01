const {
  loginUser,
  registerUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

router.route("/").get(protect, allUsers);

module.exports = router;
