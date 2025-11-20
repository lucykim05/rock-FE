import express from 'express';
import cors from 'cors';
import { getAttendance } from './attendance.service.js';
import { getTopStudyUsers } from './stats.service.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/guild/:guildId/attendance', async (req, res) => {
  try {
    const data = await getAttendance(req.params.guildId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/guild/:guildId/stats', async (req, res) => {
  try {
    const data = await getTopStudyUsers(req.params.guildId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () =>
  console.log('Express API Server: http://localhost:3000')
);
