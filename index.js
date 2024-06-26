const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const helmet = require("helmet");
const xssClean = require("xss-clean");
const cors = require("cors");

const fileUpload = require("express-fileupload");

app.use(helmet());
app.use(xssClean());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const profileRoutes = require("./routes/profile.routes");
const modulRoutes = require("./routes/modul.routes");
const authUser = require("./routes/auth.routes");
const kegiatanRoutes = require("./routes/kegiatan.routes");

app.use(profileRoutes);
app.use(modulRoutes);
app.use(authUser);
app.use(kegiatanRoutes);

const port = process.env.PORT || 3000;
app.get("/", function (req, res) {
  res.send("Api is running Well!");
});
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port " + port);
});
