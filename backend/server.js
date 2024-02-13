const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const qr = require("qr-image");
//body-parser para poder leer json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//conectando el servidor en el puerto 3000
try {
  app.listen(3000, () => {
    console.log("Servidor conectado en el puerto 3000");
  });
} catch (error) {
  console.error(error);
}

//configurando cors para permitir comunicación entre el backend y el frontend
const CorsConfig = {
  origin: "http://localhost:5173",
  methods: "GET,POST",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(CorsConfig));

//estableciendo que la carpeta pueda servir imagenes en la ruta "/" y que el cache no exista
app.use("/", express.static(path.join(__dirname, "images"), { maxAge: 0 }));

//recibiendo url del frontend y creando la imagen en la carpeta images
app.post("/", (req, res) => {
  const { url } = req.body;

  try {
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("images/QrCode.png"));
    res.json({ created: true });
  } catch (error) {
    console.error("Error al generar el código QR:", error);
    res.status(500).json({ error: "Error al generar el código QR" });
  }
});
