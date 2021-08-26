const { response } = require('../app');
const nodeFetch = require("node-fetch");
const catchAsync = require('../utils/catchAsync');

const urlsources =[
    "https://my-json-server.typicode.com/coing-dev/photo-api/photos",
    "https://my-json-server.typicode.com/coing-dev/photo-api/images",
] 

const getImages = ((req, res) => {
    const calls = urlsources.map( (url) => nodeFetch(url).then((response)=>response.json()))
    Promise.all(calls).then((jsons) => sendResponse(res, jsons))

});



function parseApiData(data){
    return data[0].map(({albumId, id, title, url, path, thumbnailUrl}) => {
        return {
            albumId,
            id,
            description: title,
            thumbnailUrl,
            imageUrl: url || path,
        }
    })
}

function sendResponse(res, jsons){
    let parsedJsons = jsons.map(parseApiData);
    res.send([].concat(...parsedJsons))
}




module.exports = {
    getImages
};