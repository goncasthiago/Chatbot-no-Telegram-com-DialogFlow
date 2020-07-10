const YouTube = require('youtube-node')
const config = require('./token/yt-config.json');

const youtube = new YouTube();
youtube.setKey(config.key);

function searchVideoURL(message, queryText){
    return new Promise((resolve, reject) => {

        youtube.search(`Treino de piano com ${queryText}`, 2, function(error, result) {
            if(!error){
                const videoIds = result.items.map( (item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`)
                console.log(youtubeLinks.join(`, `))
                resolve(`${message} ${youtubeLinks.join(`, `)}`)
                //console.log(JSON.stringify(result, null, 2))
            }else{
                reject('Deu erro')
            }

        })


    })

}

module.exports.searchVideoURL = searchVideoURL;