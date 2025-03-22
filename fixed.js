const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 8000;

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT)");
  
  const stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?)");
  stmt.run(1, "admin", "adminpass123", "admin@example.com");
  stmt.run(2, "user1", "userpass123", "user1@example.com");
  stmt.run(3, "user2", "userpass456", "user2@example.com");
  stmt.finalize();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/users', (req, res) => {
  const username = req.query.username;
  const query = `SELECT id, username, email FROM users WHERE username = ?`;
  
  db.all(query, [username], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: rows });
  });
});

app.get('/api/allusers', (req, res) => {
  db.all('SELECT id, username, email FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: rows });
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`SQL Injection fixed server running at http://0.0.0.0:${port}`);
  console.log(`Try accessing: http://0.0.0.0:${port}/api/users?username=admin' OR '1'='1`);
  console.log(`It won't work because the query is properly parameterized!`);
});
