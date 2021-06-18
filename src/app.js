import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dayjs from "dayjs";
import "dayjs/locale/pt-br.js";
// import joi from 'joi';

pg.types.setTypeParser(1082, str => str);

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
    responseGame = await connection.query(`
      SELECT games.*, categories.name AS "categoryName" 
      FROM games 
      JOIN categories
      ON games."categoryId" = categories.id
      WHERE games.name iLIKE $1`,[name + '%']);
  } else {
    responseGame = await connection.query(`
    SELECT games.*, categories.name AS "categoryName" 
    FROM games 
    JOIN categories
    ON games."categoryId" = categories.id`);
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
    responseCustomers = await connection.query(`SELECT * FROM customers WHERE cpf iLIKE $1`, [cpf.replace(/\D+/g,'') + '%']);
  } else {
    responseCustomers = await connection.query('SELECT * FROM customers');
  }
  
  res.send(responseCustomers.rows);
})

app.get('/customers/:id', async (req, res) => {
  const { id } = req.params;
  let responseCustomer = '';

  responseCustomer = await connection.query('SELECT * FROM customers WHERE id = $1', [id]);

  if(responseCustomer.rows.length === 0) {
    return res.sendStatus(404);
  }
  res.send(responseCustomer.rows);
})

const regexCpf = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/;
const regexPhone = /^[0-9]{10,11}$/;

app.post('/customers', async (req, res) => {
  const {name, phone, cpf, birthday} = req.body;

  const cpfFormat = regexCpf.test(cpf);
  const phoneFormat = regexPhone.test(phone);
  
  if(!name || name.length === 0 || !cpfFormat || !phoneFormat || !birthday || !Date.parse(birthday) || Date.parse(birthday) > Date.now()) {
    return res.sendStatus(400);
  }

  const checkCpf = await connection.query('SELECT * FROM customers WHERE cpf iLIKE $1',[cpf.replace(/\D+/g,'')])
  if(checkCpf.rows[0]) return res.sendStatus(409);

  await connection.query(`
    INSERT INTO customers (name, phone, cpf, birthday) 
    VALUES ($1, $2, $3, $4)`,
    [name, phone, cpf.replace(/\D+/g, ''), birthday]);
  
    return res.sendStatus(201);
});

app.put('/customers/:id', async (req, res) => {

  const { id } = req.params;
  const {name, phone, cpf, birthday} = req.body;

  const cpfFormatCustomer = regexCpf.test(cpf);
  const phoneFormatCustomer = regexPhone.test(phone);
  
  if(!name || name.length === 0 || !cpfFormatCustomer || !phoneFormatCustomer || !birthday || !Date.parse(birthday) || Date.parse(birthday) > Date.now()) {
    return res.sendStatus(400);
  }

  const checkCpfCustomer = await connection.query(`
    SELECT * 
    FROM customers 
    WHERE cpf iLIKE $1 AND id <> $2`,[cpf.replace(/\D+/g,''), id]);
  if(checkCpfCustomer.rows[0]) return res.sendStatus(409);

  await connection.query(`
    UPDATE customers 
    SET name = $1, phone = $2, cpf = $3, birthday = $4 
    WHERE id = $5`,
    [name, phone, cpf.replace(/\D+/g, ''), birthday, id]);
  
    return res.sendStatus(200);
})

//----

app.get('/rentals', async (req, res) => {
  
  const rentalsRows = await connection.query(`select * from rentals`);
  res.send(rentalsRows.rows)
})

app.post('/rentals', async (req, res) => {
  const {customerId, gameId, daysRented} = req.body;
  let gameRented = '';
  const today = dayjs().format(`YYYY`) + "-" + dayjs().format(`MM`) + "-" + dayjs().format(`DD`);
  const g = await connection.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
  const c = await connection.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);

  if(g.rows[0]) gameRented = g.rows[0]; 
  
  const array = await connection.query(`select * from rentals where "gameId" = $1`, [gameId]);
  const stockRented = array.rows.length;
  
  if(!customerId || !gameId || !daysRented || !gameRented || !c.rows[0] || daysRented < 1 || stockRented >= gameRented.stockTotal) return res.sendStatus(400);

  await connection.query(`
    INSERT INTO rentals ("customerId","gameId","daysRented", "rentDate", "originalPrice")
    VALUES ($1, $2, $3, $4, $5)
  `,[customerId, gameId, daysRented, today, daysRented*gameRented.pricePerDay])
  res.sendStatus(201);
})

console.log('rodando')

app.listen(4000);






app.delete('/rentals', async (req, res) => {
  await connection.query('delete from rentals where id = 4');
  res.sendStatus(200);
})

// app.delete('/games', async (req, res) => {
//   await connection.query('delete from games where id = 3');
//   res.sendStatus(200);
// })