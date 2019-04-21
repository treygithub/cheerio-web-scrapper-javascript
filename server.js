// Server 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3005;
const axios = require('axios');
const dotenv = require('dotenv').config();

// Scraper library
const request = require('request-promise');
const cheerio = require('cheerio');
const proxy = 'https://bypasscors.herokuapp.com/api/?url=';
const url = `${proxy}https://www.imdb.com/title/tt4154664/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=740b2354-425b-4cd3-947b-7f9cb4349875&pf_rd_r=DFRWPM57QBF3QXD0RV1M&pf_rd_s=right-7&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_cht_t4`;

// Database Connection
const mysql = require('mysql');
const db = require('./config/connection');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//////////////////////////////////////////

app.get('/1', async (req,res)=>{
        const response = await request(url);
        let $ = cheerio.load(response);
        let title = $('div[class="title_wrapper"] > h1').text();
        console.log('title', title)
        res.status(200).send(title);
}); 

//controllers
const routeController = require('./routes/gigs');

// Endpoints
app.use('/gigs',routeController);

app.get('/zz', (req, res) => {
    let q = 'SELECT title AS title FROM books';
    db.query(q, function (error, results) {
    if (error) throw error;
    //var msg = "We have " + results[0].title + " books";
    res.send(results);
    });
   });

app.listen(PORT, () => console.log(`REST API listening on port: ${PORT}!`));