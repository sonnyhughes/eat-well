
var mongoose = require("mongoose");
var axios = require("axios");

const db = require("../models");
// Routes
module.exports = function (app){

    app.post("/posting-recipe", function(req, res) {
       
        console.log(req.body.query)

        let resObj = {
            title: req.body.query.title,
            link:req.body.query.link,
            instructions:req.body.query.intr
        }

        let ingrs = req.body.query.ingr
        console.log(ingrs)
        console.log(resObj)


        db.Recipes.create(resObj).then(function(resp){
            let UserID = req.body.id
            //console.log("1 recipe document inserted");
            res.send(resp)
            console.log(resp)
            let recid = resp._id
            //console.log(recid)
            for(let i = 0; i < ingrs.length; i++){
                db.Ingredients.create(ingrs[i]).then(function(ingredient){
                     // console.log("1 ingredient adeded document inserted");
                      //console.log(ingredient._id)
                    let ingredientID = ingredient._id
                    db.Recipes.findOneAndUpdate({_id: recid}, { $push: { ingredients: ingredientID } }, { new: true })
                    .then(function(Recipe) {
                      
                        console.log(Recipe)
                        console.log("recipe updated with ingredient")
                    })
                })
              }
            console.log(UserID)
            db.Users.findOneAndUpdate({id: UserID}, { $push: { postedrec: recid } }, { new: true })
            .then(function(User){
                console.log(User)
            })
        })
    })



    app.post("/posting-user", function(req, res) {
    
        console.log(req.body)

        db.Users.create(req.body[0]).then(function(resp){
              console.log("1 user document inserted");
              res.send("1 user document inserted")
        }) 
    })

    app.post("/posting-restsearch", function(req, res) {
        //console.log('this is working',JSON.stringify(req.body, null, '   '))
        //res.send("... adding results to restaurant search")
        //console.log('this is working',JSON.stringify(req.body.query.data, null, '   '))

        let userRest;
        let restaurants = req.body.query.data
        //console.log('this is the restuarants array',restaurants)
        
        let userID = req.body.id


        
        for(let i = 0; i < restaurants.length; i ++){
            //console.log('\n restaurant ' + i + restaurants[i] + '\n \n \n')
            console.log(JSON.stringify(restaurants[i], null, '   '))
            //let responseObject = restaurants[i]
            let restObj ={
                id:restaurants[i].id,
                info: {
                    name: restaurants[i].name,
                    url:restaurants[i].url,
                    loc: restaurants[i].location,
                    img:restaurants[i].photos_url,
                    menu: restaurants[i].menu_url
                }
            }

           // console.log(restObj)

            let restObjStrg = JSON.stringify(restObj.info, null, '   ')
            //console.log(restObjStrg)


           /* db.Restaurants.create({resID: restObj.id, restaurantinfo: restObjStrg }).then(function(restaurant){
               // console.log("1 restaurant document inserted\n");
                //console.log(restaurant._id +'\n')*/
          
              //console.log("upsert")
            db.Restaurants.findOneAndUpdate({resID: restObj.id}, {restaurantinfo: restObjStrg }, { resID: restObj.id, restaurantinfo: restObjStrg }, { upsert: true })
            .then(function(restaurant){
            })
        }
  
    })


    
    /*app.post("/posting-recsearch", function(req, res) {

        //console.log(req.body)
        
        let recipes = req.body.query.data
        console.log(recipes)

        let recAppArr =[];



        let userID = req.body.id
        //console.log(userID)

        for(let i = 0; i < recipes.length; i ++){
             
            //console.log(JSON.stringify(recipes[i], null, '   '))
                

                let recname = recipes[i].recipe.label
                let image = recipes[i].recipe.image
                let source = recipes[i].recipe.source
                let url = recipes[i].recipe.url

                //console.log('\n recipe' + i, recname, image,source,url +'\n')


           // let recObjStr = JSON.stringify(recObj, null, '   ')
            //console.log(recObjStr)

           // db.SearchedRecipes.findOneAndUpdate({recipeinfo: recObjStr},{recipeinfo: recObjStr },{ upsert: true }).then(function(recipe){
               // console.log(recipe)
                //console.log("1 recipe document inserted\n");
                //console.log(recipe._id +'\n')
                //recAppArr.push(recipe)
                //console.log(i,recAppArr)
                //if(i == 9){
                   // console.log(recAppArr)
                   // res.json(recAppArr)
                //}
            //}).catch(function(err){
                 // console.log(err)
            //});
        }
    })*/

      app.post("/saving-recipe", function(req, res) {

        console.log(req.body)

        let user = req.body.uid
        let name = req.body.id
        let url = req.body.url
        let image = req.body.image
        let recid =""
        //check recipes and get id then check user to see if this id is saved in user refs
        db.SearchedRecipes.findOneAndUpdate({name: name}, {$set: {name: name, image: image, url: url}}, { upsert: true, new: true })
        .then(function(recipe) {

            console.log('this is supposed to be the response = ' + recipe)

            recid = recipe._id

            if(req.body.query=='save'){


                db.Users.findOne({id: user})
                .then(function(results) {
                    console.log('\n this is the user \n'+results.savedrec)
         

                    if(results.savedrec.indexOf(recid) == -1){
                        console.log("not in saved recipes")
                        db.Users.findOneAndUpdate({id: user},{ $push: { savedrec: recid } }, { new: true })
                        .then(function(resultu){
                                console.log(resultu.savedrec)
                        })
                    }
                    else{
                            console.log('user already saved this')
                    }

                })
            }


            else if(req.body.query =='unsave'){
                db.Users.findOneAndUpdate({id: user}, { $pull: { savedrec: recid } }, { new: true })
                .then(function(User) {
                    console.log(User)
                })
            }
        })
    })


    app.get("/getrest", function(req,res){
        db.Restaurants
            .findOne({})
            .sort({x:-1})
            .then(function(result){
                console.log(result)
                res.send(result)
            })
            .catch(function(err){
                res.json(err)
        })
    })


    app.get("/getrec", function(req,res){
        db.Recipes
            .findOne({})
            .sort({x:-1})
            .then(function(result){
                console.log(result)
                res.send(result)
            })
            .catch(function(err){
                res.json(err)
        })
    })



    app.get("/savedrecipes", function(req,res){
        //console.log(req.query.id)
        db.Users
            .findOne({id:req.query.id})
            .populate("savedrec")
            .then(function(result){
                console.log(result)
                res.send(result)
            })
            .catch(function(err){
                res.json(err)
        })
    })


    app.get("/search-postedrecipes", function(req,res){
        console.log(req.query[0])
        db.Users
            .findOne({id:req.query[0]})
            .populate({
                path: "postedrec",
                populate:{
                    path: "ingredients"
                }
                })
            .sort({_id:-1})
            .then(function(result){
                //console.log(result)
                res.json(result)
            })
            .catch(function(err){
                res.json(err)
        })
    })

}





