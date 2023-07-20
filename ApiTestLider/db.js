import mongoose from 'mongoose';

// URI de conexión a MongoDB
const MONGODB_URI = 'mongodb://localhost:27017';

// Conexión a la base de datos de MongoDB
await mongoose.connect(`${MONGODB_URI}/api-rest`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => console.error('Error al conectar a MongoDB:', error));
mongoose.connection.once('open', () => console.log('Conexión a MongoDB establecida'));
