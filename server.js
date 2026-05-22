const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database(path.join(__dirname, 'nyc_311_2023.db'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', (req, res) => {
  const rows = db.prepare(`
    SELECT open_data_channel_type AS channel,
           ROUND(AVG(resolution_hours), 1) AS avg_hours,
           COUNT(*) AS count
    FROM service_requests
    WHERE resolution_hours IS NOT NULL
      AND open_data_channel_type IN ('PHONE', 'ONLINE', 'MOBILE')
    GROUP BY open_data_channel_type
    ORDER BY avg_hours ASC
  `).all();
  res.json(rows);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

