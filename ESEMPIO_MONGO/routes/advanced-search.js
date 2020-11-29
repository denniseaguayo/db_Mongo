var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;


router.get('/', function (req, res, next) {
    const uri = "mongodb+srv://aguayo_dennise:aguayo_dennise@nranboy-sample.k2iuw.mongodb.net/test"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovie);
        

    function getMovie(err){
        if (err) console.log("Connessione al db non riuscita"); 
        else{
            const collection = client.db("sample_mflix").collection("movies");
            collection.find().limit(10).toArray(callBackQuery);
        }
    } 

    function callBackQuery(err,result){
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }  

});
module.exports = router;
router.get('/actors/:actor', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    actor = req.params.actor;
    const uri = "mongodb+srv://aguayo_dennise:aguayo_dennise@nranboy-sample.k2iuw.mongodb.net/test"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieActor);

    function getMovieActor(err){
        if (err) console.log("Connessione al db non riuscita"); 
        else{
            const collection = client.db("sample_mflix").collection("movies"); 
            collection.find({ 'cast': `${actor}` }).toArray(callBackQuery);
        }
    }


    function callBackQuery(err,result){
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }  
  
});

router.get('/length_year/:length/:year', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    let num = parseInt(req.params.length);
    let num2 = parseInt(req.params.year);
    const uri = "mongodb+srv://aguayo_dennise:aguayo_dennise@nranboy-sample.k2iuw.mongodb.net/test"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieLengthYear);
        

    function getMovieLengthYear(err){
        if (err) console.log("Connessione al db non riuscita"); 
        else{
            const collection = client.db("sample_mflix").collection("movies");
            collection.find({$and:[{'runtime': num},{'year': num2}]}).toArray(callBackQuery);
        }
    }    

    function callBackQuery(err,result){
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }  
    
});