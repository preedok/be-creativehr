const router = require("express").Router();
const kegiatanController = require("../controller/kegiatan.controller");
const middleware = require("../middleware/jwt.middleware");

router.get("/kegiatan", kegiatanController.getKegiatan);

router.get("/kegiatan/:id", kegiatanController.getKegiatanById);

router.get("/kegiatanbyuser", middleware, kegiatanController.getKegiatanByUser);
router.post("/kegiatan", middleware, kegiatanController.insertKegiatanData);
router.put("/kegiatan/:id", middleware, kegiatanController.editKegiatanData);
router.delete("/kegiatan/:id", middleware, kegiatanController.deleteKegiatanData);
router.put("/kegiatan/cover/:id", middleware, kegiatanController.editCoverKegiatan);
router.put("/kegiatan/kodeqr/:id", middleware, kegiatanController.editGambarQrKegiatan);

module.exports = router;
