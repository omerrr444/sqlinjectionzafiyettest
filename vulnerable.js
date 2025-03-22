const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 5000;

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

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

app.get('/api/users', (req, res) => {
  const username = req.query.username;
  
  const query = `SELECT id, username, email FROM users WHERE username = '${username}'`;
  
  console.log('Executing query:', query);
  
  db.all(query, (err, rows) => {
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
  console.log(`SQL Injection vulnerable server running at http://0.0.0.0:${port}`);
  console.log(`Arayüz: http://0.0.0.0:${port}/`);
  console.log(`API: http://0.0.0.0:${port}/api/users?username=admin' OR '1'='1`);
});
