const router = require("express").Router();
const bukuController = require("../controller/modul.controller");
const middleware = require("../middleware/jwt.middleware");


router.get("/modul", bukuController.getBuku);

router.get("/modul/:id", bukuController.getBukuById);

router.get("/modulbyuser", middleware, bukuController.getBukuByUser);
router.post("/modul", middleware, bukuController.insertBukuData);
router.put("/modul/:id", middleware, bukuController.editBukuData);
router.delete("/modul/:id", middleware, bukuController.deleteBukuData);
router.put("/modul/photo/:id", middleware, bukuController.editCover);

module.exports = router;
