const router = require("express").Router();
const profileController = require("../controller/users.controller");
const middleware = require("../middleware/jwt.middleware");

router.get("/user", profileController.getUsers);

router.get("/user", middleware, profileController.getUsersById);

router.get("/user/:id", profileController.getUsersById);

router.post("/user/add-user", profileController.addUsers);

router.put("/user/:id", profileController.editUsers);

//edit photo
router.put("/user/photo/:id", middleware, profileController.editUsersPhoto);

router.delete("/user/:id", middleware, profileController.deleteUsers);

module.exports = router;
