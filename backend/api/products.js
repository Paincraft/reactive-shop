var Product = require('../db/models/products.js');
var DBapi = require('../db/db_utils.js');

class api {
    constructor(opts){
        //console.log('api constructor', opts, typeof opts);
        if(opts && typeof opts === 'object'){
            this.dbConn = opts.dbConn;
            //console.log(this.dbConn, opts.dbConn)
        }
    }

    saveProduct(req, res) {
        var fileExtension = req.body.fileExtension;
        var type = req.body.type;
        var product = new Product();
        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        var filename = `${product.name}-${new Date().getTime()}.${fileExtension}`;
        
        //TODO add switch by type
        console.log('save', req.body, product);
        DBapi.persistFile(this.dbConn, filename, req.body.imgData, 'base64')
        .then((file) => {
            product.thumbnailId = file._id;
            var savePromise = product.save();
            savePromise.then(() => {
                res.status(200).end();
            }).catch((error) => {
                res.status(500).send(error);
            })
        }).catch((error) => {
            res.status(501).send(error);
        })
    }

    getProducts(req, res){
        var includeHidden = req.body.includeHidden || false;
        var query = Product.find({hidden: includeHidden});
        var resultsPromise = query.exec();
        resultsPromise.then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
            res.status(501).send(error);
        });
    }
}


module.exports = api;