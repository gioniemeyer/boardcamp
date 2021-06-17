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
    const response = await connection.query('select * from categories')
    res.send(response.rows);
})

app.post('/categories', async (req, res) => {
  const { name } = req.body;

  if(name.length === 0) {
    return res.sendStatus(400);
  }

  const checkName = await connection.query('select * from categories where name ilike $1',[name])
  if(checkName.rows[0]) return res.sendStatus(409) 

  await connection.query('insert into categories ("name") values ($1)',[name]);
  return res.sendStatus(201);
})

app.delete('/categories', async (req, res) => {
  await connection.query('delete from categories where id = 5');
  res.sendStatus(200);
})
console.log('rodando')

app.listen(4000);