import express from 'express';
import cors from 'cors';
import pg from 'pg';

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


console.log('rodando')

app.listen(4000);