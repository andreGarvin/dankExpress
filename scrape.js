const request = require('request'),
    cheerio = require('cheerio');

module.exports.search = ( url, arg, callback ) => {
    
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