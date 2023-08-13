const express =require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

// cors permite que te conectes a otro servidor
dotenv.config();
const cors =require('cors')
const MONGO_DB_CONNECTION_STRING='mongodb+srv://krisnarocabado:zoharrama@cluster0.e09pjtt.mongodb.net/?retryWrites=true&w=majority'
// Elimina el warning
mongoose.set('strictQuery', false);
//conectar mongoose
mongoose.connect(MONGO_DB_CONNECTION_STRING)
    .then(() => console.log('DB connected'))
    .catch((error) => console.error('DB connection error:', error));

// crear el servidor
const app = express();

// habilitar bodyparser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilitar cors
app.use(cors());

// Rutas de la app
app.use('/api', routes());

// carpeta publica
app.use(express.static('uploads'));


// puerto

const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// Socket.io
const { Server } = require("socket.io");

// Crear un servidor de sockets y configurar opciones
const io = new Server(servidor, {
  pingTimeout: 60000, // Configurar el tiempo máximo de espera de ping (opcional)
  cors: {
    origin: process.env.FRONTEND_URL, // Configurar la política CORS (permisos de origen)
  },
});

// Manejar eventos de conexión
io.on("connection", (socket) => {
  console.log("Conectado a socket.io");

  // Aquí puedes definir el manejo de otros eventos de socket
  // por ejemplo: socket.on("evento", (data) => { ... });
});
