const express = require("express");
const cors = require("cors");
const Pool = require("pg").Pool;
const port = 4321;

const app = express();
app.use(express.json());
app.use(cors());

const postgreSQL = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "lionot",
  database: "NodeJS_React",
});



//************** REGISTER *************//

app.post("/register", (req, res) => {
  const { Name, Email, Password } = req.body;

  const sqls = "INSERT INTO users (UserName, Password, Email) VALUES ('" + Name + "','" + Password + "','" + Email +"')";
  console.log(Name);
  console.log(Email);
  console.log(Password);
  postgreSQL.query(sqls, (err, result) => {
    if (err) {
      console.log(err);
      res.json("Misy erreur");
    } else {
      return res.status(200).json(result.rows);
    }
  });
});




//************** LOGIN **************//

app.post("/login", (req, res) => {
  const { Email, Password } = req.body;

  console.log(Email);
  console.log(Password);
  
  const sqls = "SELECT * FROM users WHERE Password = '" + Password + "' AND Email = '" + Email + "' ";
  
  postgreSQL.query(sqls, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "error", message: "Une erreur s'est produite lors de la connexion." });
    } else {
      if (data.rows.length > 0) {
        return res.status(200).json({ status: "success", message: "Connexion réussie." });
      } else {
        return res.status(401).json({ status: "error", message: "Email ou mot de passe incorrect." });
      }
    }
  });
});





//************** READ **************//

app.get("/", (req, res) => {
  const sql = "SELECT * FROM comptes";
  postgreSQL.query(sql, (err, data) => {
    
    if (err) return res.json("Error");
    return res.status(200).json(data.rows);
    
  });
});



//************** CREATE **************//

app.post('/create', (req, res) => {
  const {name, solde, status} = req.body;
  const sqls = "INSERT INTO comptes (nameClient, soldeClient, soldeStatus) VALUES ('"+ name +"','"+ solde +"','"+ status +"')"; 
  console.log(name);
  console.log(solde);
  console.log(status);
  
  postgreSQL.query(sqls, (err, result) => {
    if(err) {
      console.log(err);
      res.json("Misy erreur");
    }else{
      return res.status(200).json(result.rows);
    }
  })
});



//************** SAVE **************//

app.get('/read/:idClient', (req, res) => {
  const {name, solde, status} = req.body;
  const id = req.params.idClient;
  console.log(id);
  const sqls = "SELECT * FROM comptes  WHERE idClient = '"+id+"'"; 
  
  postgreSQL.query(sqls, (err, result) => {
    if(err) {
      console.log(err);
      res.json("Misy erreur");
    }else{
      return res.json(result.rows);
    }
  })
});



//************** SAVE **************//

app.put('/update/:idClient', (req, res) => {
  const {names, soldes, status} = req.body;
  const id = req.params.idClient;
  console.log(id);
  console.log(names);
  console.log(soldes);
  console.log(status);
  
  const sqls = "UPDATE comptes SET nameClient = '"+names+"',soldeClient = '" +soldes+ "',soldeStatus = '" +status+ "' WHERE idClient = '" +id+ "' "; 
  
  postgreSQL.query(sqls, (err, result) => {
    if(err) {
      console.log(err);
      res.json("Misy erreur");
    }else{
      // res.json(result.rows);
      res.json("Tsy misy erreur");
    }
  })
});



//************** DELETE **************//

app.delete('/delete/:idClient', (req,res) => {
  const id = req.params.idClient;
  console.log(id);
  const sqls = "DELETE FROM comptes  WHERE idClient = '"+id+"'"; 
  postgreSQL.query(sqls, (err, result) => {
    if(err) {
      console.log(err);
      res.json("Misy erreur")
    } else {
      // res.json(result.rows);
      res.json("Tsy misy erreur");
    }
  })
});



//************** DISPLAY TOTAL **************//

app.get('/total' , (req, res) => {
  const Query = "SELECT SUM(CAST(REPLACE(soldeClient, ',', '.') AS DECIMAL(50, 2))) as total FROM comptes";
  postgreSQL.query(Query, (err, data) => {
    if (err) return res.json("Error");
    return res.status(200).json(data.rows);
  });
});



//************** DISPLAY MAXIMAL **************//

app.get('/maximal' , (req, res) => {
  const Query = "SELECT MAX(CAST(REPLACE(soldeClient, ',', '.') AS DECIMAL(50, 2))) as max FROM comptes";
  postgreSQL.query(Query, (err, data) => {
    if (err) return res.json("Error");
    return res.status(200).json(data.rows);
  });
});



//************** DISPLAY MINIMAL **************//

app.get('/minimal' , (req, res) => {
  const Query = "SELECT MIN(CAST(REPLACE(soldeClient, ',', '.') AS DECIMAL(50, 2))) as min FROM comptes";
  postgreSQL.query(Query, (err, data) => {
    if (err) return res.json("Error");
    return res.status(200).json(data.rows);
  });
});



//************** SERVER **************//

app.listen(port, () => {
  console.log(`You are Connecting the Server on port http://localhost:${port}`);
});
