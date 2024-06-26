const router = require("express").Router();
const bukuController = require("../controller/modul.controller");
const middleware = require("../middleware/jwt.middleware");

// get all data
router.get("/modul", bukuController.getBuku);
// get by id buku
router.get("/modul/:id", bukuController.getBukuById);
// get buku by user
router.get("/modulbyuser", middleware, bukuController.getBukuByUser);
router.post("/modul", middleware, bukuController.insertBukuData);
router.put("/modul/:id", middleware, bukuController.editBukuData);
router.delete("/modul/:id", middleware, bukuController.deleteBukuData);
router.put("/modul/photo/:id", middleware, bukuController.editCover);

module.exports = router;
