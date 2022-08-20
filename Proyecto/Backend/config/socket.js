
const express =require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors:{
        origin: true,
        credentials: true,
        methods: ['GET', 'POST']
    }
});

io.on('connection',(socket)=>{
    //colocar lo que pasará cuando dicho usuario se conecte
    console.log('Nueco usuario conectado')
    socket.on('test', ()=>{
        console.log('evento test')
    });
});

module.exports = io;

