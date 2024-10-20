const mysql = require("mysql");
const express = require("express");

var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
const server = app.listen(3001, () => console.log("Serveri valmiina"));

const conn = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "urheilijalista",
  multipleStatements: true,
});

conn.connect((err) => {
  if (err) {
    console.log("Tapahtui virhe yhdistettäessä tietokantaan");
    return;
  }
  console.log("Yhteys muodostettu");
});

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from rest API!"); // Testaa toimiiko serveri osoitteessa http://localhost:3001/  
});

app.get("/urheilijat", (req, res) => {
  conn.query("SELECT * FROM urheilijat", (err, rows) => {
    if (err) throw err;
    return res.status(200).json(rows);
  });
});

app.get("/urheilijat/:id", (req, res) => {
  const id = Number(req.params.id);
  //const id = req.params.id;
  conn.query("SELECT * FROM urheilijat WHERE id=?", id, (err, rows) => {
    if (err) throw err;
    res.end(JSON.stringify(rows[0]));
  });
});

app.put("/urheilijat/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;
  conn.query(
    "UPDATE urheilijat SET ? WHERE id = ?;",
    [updatedUser, req.params.id],
    function (error, results) {
      if (error) throw error;
      conn.query("SELECT * FROM urheilijat WHERE id=?", id, (err, rows) => {
        if (err) throw err;
        res.end(JSON.stringify(rows[0]));
      });
    }
  );
});

// DELETE yksi urheilija

app.delete("/urheilijat/:id", (req, res) => {
 
    const sql = "DELETE FROM urheilija WHERE ID = ?";
    const id = req.params.id;
    conn.query(sql, [id], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);  
    })
  
})

app.post("/create", (req, res) => {
const sql = "INSERT INTO urheilijat (`Nimi`, `Syntymäpäivä`, `Paino`, `Kuva`, `Laji`, `Saavutukset`) VALUES (?)"; 
const values = [
  req.body.nimi, 
  req.body.syntymäpäivä, 
  req.body.paino, 
  req.body.kuva, 
  req.body.laji, 
  req.body.saavutukset
];
conn.query(sql, [values], (err, data) => {  
  if (err) return res.json("Error");
  return res.json(data);  
}); 

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE urheilijat SET `Nimi` = ?, `Syntymäpäivä` = ?, `Paino` = ?, `Kuva` = ?, `Laji` = ?, `Saavutukset` = ? WHERE ID = ?"; 
  const values = [
    req.body.nimi, 
    req.body.syntymäpäivä, 
    req.body.paino, 
    req.body.kuva, 
    req.body.laji, 
    req.body.saavutukset
  ];
  
  const id = req.params.id;

  conn.query(sql, [...values, id], (err, data) => {  
    if (err) return res.json("Error");
    return res.json(data);  
  });
});



conn.query(
  "INSERT INTO urheilijat SET ? ",
  urheilija,
  function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify({ id: results.insertId, ...urheilija }));
  }
);
conn.listen(3001, () => { 
  console.log("listening"); 
});   

module.exports = app;
