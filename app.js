// hotel-scraper.js

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write Headers
writeStream.write(`Title,Link,Review \n`);

request('https://www.booking.com/searchresults.en-us.html?aid=376363&label=bdot-a5ry4TIU_Hc5n8qCVC158QS267777916453%3Apl%3Ata%3Ap1%3Ap22%2C356%2C000%3Aac%3Aap1t1%3Aneg%3Afi%3Atiaud-297601666035%3Akwd-334108349%3Alp9073676%3Ali%3Adec%3Adm&sid=d1239d5cc1926bbfc75a86007c0500d6&tmpl=searchresults&checkin_month=5&checkin_monthday=13&checkin_year=2019&checkout_month=6&checkout_monthday=6&checkout_year=2019&class_interval=1&dest_id=-2258110&dest_type=city&dtdisc=0&from_sf=1&group_adults=2&group_children=0&inac=0&index_postcard=0&label_click=undef&no_rooms=1&postcard=0&raw_dest_type=city&room1=A%2CA&sb_price_type=total&shw_aparth=1&slp_r_match=0&src_elem=sb&srpvid=b72a4aee5e7f00fa&ss=Naivasha&ss_all=0&ssb=empty&sshis=0&ssne=Naivasha&ssne_untouched=Naivasha&order=price', (error, response, html) => {
  if (!error && response.statusCode == 200) {

     //load html using cheerio module and store it in variable $ 

     const $ = cheerio.load(html);

     $('#search_results_table').each((i, el) => {
         const title = $(el)
           .find('.sr-hotel__title')
           .text()
           .replace(/\s\s+/g, '');
         const link = $(el)
           .find('a')
           .attr('href');
         const review = $(el)
           .find('.sr_item_review_block')
           .text()

      // Write Row To CSV
      writeStream.write(`${title}, ${link}, ${review} \n`);
    });

    console.log('Scraping Done...');
  }
});