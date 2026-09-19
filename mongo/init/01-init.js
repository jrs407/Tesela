// Se ejecuta automáticamente SOLO la primera vez que arranca Mongo con el volumen vacío.
// Para volver a ejecutarlo: docker compose down -v && docker compose up -d
//
// Aquí van: colecciones con validación, índices y datos semilla.
// La estructura "real" de los documentos se define en las clases @Document de Java.

db = db.getSiblingDB('tesela');

// Ejemplo (descomenta y adapta cuando tengas tu modelo):
//
// db.createCollection('usuarios', {
//   validator: {
//     $jsonSchema: {
//       bsonType: 'object',
//       required: ['email', 'nombre'],
//       properties: {
//         email:  { bsonType: 'string' },
//         nombre: { bsonType: 'string' }
//       }
//     }
//   }
// });
// db.usuarios.createIndex({ email: 1 }, { unique: true });
//
// db.usuarios.insertOne({ email: 'admin@tesela.com', nombre: 'Admin' });
