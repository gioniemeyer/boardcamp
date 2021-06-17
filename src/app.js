import express from 'express';
import cors from 'cors';
import pg from 'pg';
// import joi from 'joi';

const app = express();
const { Pool } = pg;

const user = 'bootcamp_role';
const password = 'senha_super_hiper_ultra_secreta_do_role_do_bootcamp';
const host = 'localhost';
const port = 5432;
const database = 'boardcamp';

const connection = new Pool({
    user,
    password,
    host,
    port,
    database
  });
  
app.use(cors());
app.use(express.json());

app.get('/categories', async (req, res) => {
    const response = await connection.query('SELECT * FROM categories')
    res.send(response.rows);
})

app.post('/categories', async (req, res) => {
  const { name } = req.body;

  if(!name || name.length === 0) {
    return res.sendStatus(400);
  }

  const checkName = await connection.query('SELECT * FROM categories WHERE name iLIKE $1',[name])
  if(checkName.rows[0]) return res.sendStatus(409) 

  await connection.query('INSERT INTO categories ("name") VALUES ($1)',[name]);
  return res.sendStatus(201);
})

// ---

app.get('/games', async (req, res) => {
  const { name } = req.query;
  let responseGame = '';

  if(name) {
    responseGame = await connection.query('SELECT * FROM games WHERE name iLIKE $1',[name + '%']);
  } else {
    responseGame = await connection.query('SELECT * FROM games');
  }
  
  res.send(responseGame.rows);

})

app.post('/games', async (req, res) => {
  const {name, image, stockTotal, categoryId, pricePerDay} = req.body;

  const checkCategoryId = await connection.query('SELECT * FROM categories WHERE id = $1',[categoryId]);

  if(!name || name.length === 0 || !stockTotal || stockTotal === 0 || !pricePerDay || pricePerDay === 0 || checkCategoryId.rows.length === 0) {
    return res.sendStatus(400);
  }

  const checkName = await connection.query('SELECT * FROM games WHERE name iLIKE $1',[name])
  if(checkName.rows[0]) return res.sendStatus(409);

  await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',[name, image, stockTotal, categoryId, pricePerDay]);
  return res.sendStatus(201);

})

//----

app.get('/customers', async (req, res) => {
  const { cpf } = req.query;
  let responseCustomers = '';

  if(cpf) {
    responseCustomers = await connection.query(`SELECT * FROM customers WHERE cpf iLIKE $1`, [cpf + '%']);
  } else {
    responseCustomers = await connection.query('SELECT * FROM customers');
  }
  
  res.send(responseCustomers.rows);

})

app.post('/customers', async (req, res) => {
  const {name, phone, cpf, birthday} = req.body;

  if(!name || name.length === 0 || !(9999999999 < cpf < 99999999999) || !(999999999 < phone < 99999999999) || !birthday || !Date.parse(birthday) || Date.parse(birthday) > Date.now()) {
    return res.sendStatus(400);
  }

  const checkCpf = await connection.query('SELECT * FROM customers WHERE cpf iLIKE $1',[cpf])
  if(checkCpf.rows[0]) return res.sendStatus(409);

  await connection.query('insert into customers (name, phone, cpf, birthday) values ($1, $2, $3, $4)',[name, phone, cpf, birthday]);
  console.log(birthday)
  return res.sendStatus(201);

})


console.log('rodando')

app.listen(4000);






// app.delete('/categories', async (req, res) => {
//   await connection.query('delete from categories where id = 5');
//   res.sendStatus(200);
// })

// app.delete('/games', async (req, res) => {
//   await connection.query('delete from games where id = 3');
//   res.sendStatus(200);
// })