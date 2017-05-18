var Mongoose = require('mongoose');
var Gridfs = require('gridfs-stream');
var Stream = require('stream');
var Base64 = require('base64-stream');

Gridfs.mongo = Mongoose.mongo;

var utils = {};
utils.open = function(host, port, db){
    var connectionPromise = new Promise((resolve,reject) => {
        Mongoose.connect(`mongodb://${host}:${host}/${db}`);
        var connection = Mongoose.connection;
        connection.on('error', (error) => {reject(error)});
        connection.once('open', () => {
            resolve(connection);
        });
    });
    return connectionPromise;
}

utils.close = function(connection){
    connection.close();
}

utils.persistFile = function(connection, fileName, data, encoding){
    var gfs = Gridfs(connection.db);

    var writestream = gfs.createWriteStream({
        filename: fileName
    });

    var persistedFile;

    if(encoding.toLowerCase() !== 'base64'){
        //ToDo
    }

    var persistedFilePromise = new Promise((resolve,reject) => {
        var s = new Stream.Readable();
        s.push(data);
        s.push(null);
        s.pipe(Base64.decode()).pipe(writestream);
        writestream.on('close', (file) => {
            resolve(file);
        });

        writestream.on('error', (error) => {
            reject(error);
        })
    })

    return persistedFilePromise;
}

module.exports = utils;