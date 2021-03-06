const requestPromise = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const proxy = 'https://bypasscors.herokuapp.com/api/?url=';
const fs = require('fs');
const { Parser } = require('json2csv');
const urls = [
{url:`${proxy}https://www.imdb.com/title/tt4154664/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=740b2354-425b-4cd3-947b-7f9cb4349875&pf_rd_r=DFRWPM57QBF3QXD0RV1M&pf_rd_s=right-7&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_cht_t4`},
{url:`${proxy}https://www.imdb.com/title/tt0137523/?ref_=nv_sr_3?ref_=nv_sr_3`}];

( async () => {
    let moviesData = [];
    // LOOP
    for(let movie of urls) {
        const res = await request({
            uri:movie.url,
            // SPOOF THEM HEADERS
            headers: {
                "authority": "www.imdb.com",
                "method": "GET",
                "path": "/title/tt4154664/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=740b2354-425b-4cd3-947b-7f9cb4349875&pf_rd_r=DFRWPM57QBF3QXD0RV1M&pf_rd_s=right-7&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_cht_t4",
                "scheme": "https",
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "max-age=0",
                "dnt": "1",
                "referer": "https://www.imdb.com/",
                "upgrade-insecure-requests": "1",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
            },
        });
        let $ = cheerio.load(res);
        let title = $('div[class="title_wrapper"] > h1').text().trim();
        let rating = $('span[itemprop="ratingValue"]').text();
        let poster = $('div[class="poster"] > a > img').attr('src');
        let ratingValue = $('div[class="imdbRating"] > a > span').text();
        let genra =[];
        $('div[class=subtext] a[href^="/search/"]').each((i,item)=>{
            let items = $(item).text();
            genra.push(items);
        })
        moviesData.push({
            title,
            rating,
            ratingValue,
            poster,
            genra
        })
}
        //synchronous
        const fields = ['title', 'rating', 'ratingValue', 'poster', 'genra'];
        const opts = { fields };
        
        try {
        const parser = new Parser(opts);
        const csv = parser.parse(moviesData);
        console.log(csv);
        fs.writeFileSync('./movie-data.csv', csv, 'utf-8');
        } catch (err) {
        console.error(err);
        }

})();