var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient; //Importo la libreria mongodb


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

router.get('/movie_from_title/:title', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    title = req.params.title;
    const uri = "mongodb+srv://aguayo_dennise:aguayo_dennise@nranboy-sample.k2iuw.mongodb.net/test"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieTitle);
    
    function getMovieTitle(err){
        if (err) console.log("Connessione al db non riuscita"); 
        else{
            const collection = client.db("sample_mflix").collection("movies");
            collection.find({ 'title': `${title}` }).toArray(callBackQuery);
        }
    }    
    
    function callBackQuery(err,result){
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }  


});
router.get('/list/:num', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    let num = parseInt(req.params.num);;
    const uri = "mongodb+srv://aguayo_dennise:aguayo_dennise@nranboy-sample.k2iuw.mongodb.net/test"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieNumber);

    function getMovieNumber(err){
        if (err) console.log("Connessione al db non riuscita"); 
        else{
          const collection = client.db("sample_mflix").collection("movies");
         collection.find().limit(num).toArray(callBackQuery);
        }
    }

    function callBackQuery(err,result){
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }  


});

router.get('/movie_from_year/:year', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    year = parseInt(req.params.year);
    const uri = "mongodb+srv://aguayo_dennise:aguayo_dennise@nranboy-sample.k2iuw.mongodb.net/test"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieYear);

    function getMovieYear(err){
        if (err) console.log("Connessione al db non riuscita"); 
        else{
            const collection = client.db("sample_mflix").collection("movies");
        collection.find({ 'year': year}).toArray(callBackQuery);
        }
    }

    function callBackQuery(err,result){
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }   

    
});
router.get('/movie_from_rating/:rating', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    rating = parseFloat(req.params.rating);
    const uri = "mongodb+srv://aguayo_dennise:aguayo_dennise@nranboy-sample.k2iuw.mongodb.net/test"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieRating);
    
    function getMovieRating(err){
        if (err) console.log("Connessione al db non riuscita"); 
        else{
            const collection = client.db("sample_mflix").collection("movies");
            collection.find({"imdb.rating":rating}).toArray(callBackQuery);
        }
    }
    function callBackQuery(err,result){
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }   
});