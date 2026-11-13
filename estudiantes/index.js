// Microservicio de ESTUDIANTES: lista estudiantes (datos en memoria)
import express from 'express';

const PORT = process.env.PORT ?? 5000;
const app = express();

const estudiantes = [
  { id: 1, nombre: 'Leonor Molina' },
  { id: 2, nombre: 'Ana Pérez' },
  { id: 3, nombre: 'Luis Gómez' },
];

app.get('/', (_req, res) => res.json({ servicio: 'estudiantes', estado: 'ok' }));
app.get('/estudiantes', (_req, res) => res.json(estudiantes));

app.listen(PORT, () => console.log(`Servicio estudiantes escuchando en el puerto ${PORT}`));