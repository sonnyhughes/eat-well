const Zomato = require('zomato.js');

const keys = require('../APIkeys.js');

const express = require("express");


//const axios = require("axios");
//const express = require("express")
//const router = require("express").Router();

const zomato = new Zomato(keys.zomato)

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
module.exports = function (app){
    
    app.get("/search-city/restaurants", (req, res) => {

        console.log(req.query)
        
        zomato.cities({
            q:req.query.query,
            count: 1  
        })
        .then(function(data) {
            console.log('this is supposed to be the city id',data[0].id);
            let cityid = data[0].id
            zomato.search({
                entity_id: cityid,
                entity_type: 'city',
                count:10,
                cuisines: '308',
                sort: 'rating',
                order: 'desc'
            })
            .then(function(result) {
                console.log('hello',result);
                res.send(result.restaurants)
            })
            .catch(function(err) {
               //console.error(err);
            });
        })
        .catch(function(err) {
           //console.error(err);
        });
    });

    app.get("/search-restaurants", (req, res) => {

        console.log(req.query.lat, req.query.lon)
        zomato.search({
            q:req.body,
            count: 10,
            lat:req.query.lat,
            lon:req.query.lon,
            radius: 1500.9,
            cuisines: 308,
            sort: 'radius',
            order: 'desc'
        })
        .then(function(data) {
            console.log(data.restaurants);
            res.send(data.restaurants)
        })
        .catch(function(err) {
            console.error(err);
        });
    });
}


