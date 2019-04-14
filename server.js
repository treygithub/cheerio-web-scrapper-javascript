const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3005;
const axios = require('axios');
const request = require('request-promise');
const cheerio = require('cheerio');
const proxy = 'https://bypasscors.herokuapp.com/api/?url=';
const url = `${proxy}https://www.imdb.com/title/tt4154664/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=740b2354-425b-4cd3-947b-7f9cb4349875&pf_rd_r=DFRWPM57QBF3QXD0RV1M&pf_rd_s=right-7&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_cht_t4`;


//controllers
//const routeController = require('./routes/gigs');

//const db = require('./config/database');

//test db
//  db
//  .authenticate()
//  .then(() => {
//    console.log('Connection has been established successfully.');
//  })
//  .catch(err => {
//    console.error('Unable to connect to the database:', err);
//  });

const app = express();

app.get('/', async (req,res)=>{
        const response = await request(url);
        let $ = cheerio.load(response);
        let title = $('div[class="title_wrapper"] > h1').text();
        console.log('title', title)
        res.status(200).send(title);
}); 

//endpoints
//app.use('/gigs',routeController);

app.listen(PORT,()=>{console.log(`Server Running on Port: ${PORT}`)});