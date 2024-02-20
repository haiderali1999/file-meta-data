var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static(process.cwd() + '/public'));
// app.use('/uploads', express.static(process.cwd() + '/uploads'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  debugger
  console.log(req.file)
  const { originalname, mimetype, size } = req.file
  res.json({ name: originalname, type: mimetype, size })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
