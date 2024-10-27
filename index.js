const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 8080;

app.listen(PORT, (e) => {
    console.log(`Conectado en el puerto ${PORT}`);
  });
  


//*Concexion a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "cocina_ia",
});


connection.connect((err) => {
  if (err) {
    console.log("Error de conexion " + err.stack);
    return;
  }
  console.log("Conectado con exito a la base de datos " + connection.threadId);
});


app.get("/", (req, res) => {
    res.send("Bienvendios al himalaya")
})



app.get("/postres", (req, res) => {
  connection.query("SELECT * FROM recetas WHERE categorias LIKE '%postre%'", (err, result, fields) => {
    if (err) {
      res.status(500).send("Error al obtener las recetas");
      console.error(err);
      return;
    }
    res.json(result);
  });
});


app.get("/recomendaciones", (req, res) => {
  connection.query("SELECT * FROM recetas WHERE categorias LIKE '%española%' OR categorias LIKE '%arroces%' ", (err, result, fields) => {
    if (err) {
      res.status(500).send("Error al obtener las recetas");
      console.error(err);
      return;
    }
    res.json(result);
  });
});

 

 




