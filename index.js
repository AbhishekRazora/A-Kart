import { config } from 'dotenv'
import app from './app.js';
import { connectToDatabase } from './db/connection.js';
import path from 'path';
import express from 'express'
config()


const __dirname=path.resolve()
app.use(express.static(path.join(__dirname,'/dist')))

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname,'dist', 'index.html'))
);


const port=process.env.port || 8080;



connectToDatabase().then(()=>{

    app.listen(port,()=>{
        console.log(`server is running on port :${port} and connect to database ✌️`)
    })
}).catch(err=>console.log(err))