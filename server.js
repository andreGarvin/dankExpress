const express = require('express'),
    app = express();

const request = require('request'),
    cheerio = require('cheerio');


const port = process.env.PORT || 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin"), 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// var arg = process.argv.splice(2, process.argv.length).join('+');


function search_and_scrape( url, arg, callback ) {
    
    request(url, ( err, resp, body ) => {
        if (err) {
            return callback({
                type: 'error-request',
                status: {
                    txt: '',
                    code: 404,
                    bool: false
                },
                msg: err.message
            }, undefined);
        }
        else if (resp.statusCode !== 200) {
            return callback({
                type: 'http-request',
                status: {
                    txt: '',
                    code: 404,
                    bool: false
                },
                msg: 'request was refused website does not exist; not found.'
            }, undefined);
        }
        
        const $ = cheerio.load(body),
            pics = $('img'),
            data = {
                length: 0,
                resp: [],
                msg: `Searching for results for ${ arg } memes results`,
                status: {
                    txt: 'OK',
                    code: 200,
                    bool: true
                }
            };
        
        data['length'] = pics['length'];
        
        if ( data['length'] === 0 ) {
            
            data.msg = `No results ${ arg } memes results.`;
            
            data.status = {
                code: 404,
                bool: false,
                txt: ''
            };
            
            return callback(null, data);
        }
        
        pics.each(function( i ) {
            var url_name = pics[i].name;
                
            if ( url_name === 'img' ) {
                data.resp.push( pics[i].attribs );
            }
        });
        
        return callback(null, data);
    })
    
}

app.get('/', ( req, resp ) => {
    
    search_and_scrape(`https://www.google.com/search?q=memes&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiW7orfqpvTAhWDz4MKHQm3D3cQ_AUIBigB&biw=555&bih=618`, 'memes', (err, data) => {
        if (err) {
            console.log( err );
            return;
        }
        
        resp.json( data );
    });
    
})

app.get('/:query', ( req, resp ) => {
    
    var query = req.params.query;
    
    search_and_scrape(`https://www.google.com/search?q=${ query }+memes&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiW7orfqpvTAhWDz4MKHQm3D3cQ_AUIBigB&biw=555&bih=618`, query, (err, data) => {
        if (err) {
            console.log( err );
            return;
        }
        
        resp.json( data );
    });
    
});


// running server
app.listen( port, () => {
    console.log(`running on port: *http://${ process.env.IP }:${ port }`);
});