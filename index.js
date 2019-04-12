const request = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://www.imdb.com/title/tt4154664/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=740b2354-425b-4cd3-947b-7f9cb4349875&pf_rd_r=DFRWPM57QBF3QXD0RV1M&pf_rd_s=right-7&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_cht_t4';

( async()=>{
    const res = await request(url);
    let $ = cheerio.load(res);
    let title = $('div[class="title_wrapper"] > h1').text();
    console.log('Title: ', title);
})();