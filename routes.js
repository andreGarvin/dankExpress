const scrape = require('./scrape.js');


module.exports.getHome = ( req, resp ) => {
    
    scrape.search(`https://www.google.com/search?q=memes&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiW7orfqpvTAhWDz4MKHQm3D3cQ_AUIBigB&biw=555&bih=618`, 'memes', (err, data) => {
        if (err) {
            console.log( err );
            return;
        }
        
        resp.json( data );
    });
    
};

module.exports.search = ( req, resp ) => {
    
    var query = req.params.query;
    
    scrape.search(`https://www.google.com/search?q=${ query }+memes&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiW7orfqpvTAhWDz4MKHQm3D3cQ_AUIBigB&biw=555&bih=618`, query, (err, data) => {
        if (err) {
            console.log( err );
            return;
        }
        
        resp.json( data );
    });
    
};