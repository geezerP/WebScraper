// travel-scraper.js

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


let baseUrl = "https://www.booking.com/";


let uri = "https://www.booking.com/hotel/ke/lake-naivasha-resort-naivasha.html?label=gen173nr-1FCAEoggI46AdIM1gEaHaIAQGYATG4ARfIAQzYAQHoAQH4AQKIAgGoAgO4Av6d0OYFwAIB&sid=d1239d5cc1926bbfc75a86007c0500d6&all_sr_blocks=117228005_119816204_0_1_0&checkin=2019-05-13&checkout=2019-06-10&dest_id=-2258110&dest_type=city&hapos=1&highlighted_blocks=117228005_119816204_0_1_0&hpos=1&sr_order=popularity&srepoch=1557403198&srpvid=bc2a545e038c015a&ucfs=1&from=searchresults;highlight_room=#hotelTmpl/";
let url = baseUrl + uri;

request(url, (error, response, html) => {

    //check for no errors and status success i.e website has loaded successfully and return some response

    if (!error && response.statusCode == 200) {

        //load html using cheerio module and store it in variable $ 

        const $ = cheerio.load(html);

        //Finally define the variable you want to scrap. 
        var name, hotelRating;

        //to store hotel details together
        var hotel = {};

        let title = $('.hp__hotel-title');

        name = title.children('h2').text().trim();

      


        let rating = $('.hp__hotel_ratings');

        hotelRating = rating.children().children().text();

        hotel.name = name;
        
        hotel.hotelRating = hotelRating;

    }
    console.log("File ", JSON.stringify(hotel));
    fs.writeFile("result.json", JSON.stringify(hotel, null, 4), function (err) {

        console.log('File successfully written');

    })
})