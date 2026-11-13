// Microservicio de REPORTES: no tiene base de datos propia,
// consulta a cursos y a estudiantes por HTTP usando su NOMBRE de servicio
import express from 'express';

const PORT = process.env.PORT ?? 4000;
const CURSOS_URL = process.env.CURSOS_URL ?? 'http://localhost:3000';
const ESTUDIANTES_URL = process.env.ESTUDIANTES_URL ?? 'http://localhost:5000';

const app = express();

app.get('/', (_req, res) => res.json({ servicio: 'reportes', estado: 'ok' }));

app.get('/resumen', async (_req, res) => {
  try {
    // Pide los cursos al servicio "cursos"
    const respCursos = await fetch(`${CURSOS_URL}/cursos`);
    const cursos = await respCursos.json();
    const totalCreditos = cursos.reduce((suma, c) => suma + c.creditos, 0);

    // Pide los estudiantes al servicio "estudiantes"
    const respEstudiantes = await fetch(`${ESTUDIANTES_URL}/estudiantes`);
    const estudiantes = await respEstudiantes.json();

    res.json({
      totalCursos: cursos.length,
      totalCreditos,
      totalEstudiantes: estudiantes.length,
      generado: new Date().toISOString(),
    });
  } catch {
    res.status(503).json({ error: 'Un servicio no responde' });
  }
});

app.listen(PORT, () => console.log(`Servicio reportes escuchando en el puerto ${PORT}`));