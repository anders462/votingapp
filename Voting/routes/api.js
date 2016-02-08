"use strict"
var Account = require(process.cwd() + '/models/account.js');
var Poll = require(process.cwd() + '/models/poll.js');


module.exports = function(app,passport) {


   // **** API Calls ****

   //Get all polls for all. Need to be Authenticated as user
   app.route('/api/poll/all')
    .get(function(req,res){
      Poll.find({}, function(err,result){
        if (err) {
          throw(err);
        }
        console.log(result);
        res.status(200).json(result);
      });
   });

   // Create/Post new poll. Need to be Authenticated as user
   app.route('/api/poll')
   //add a poll
    .post(function(req, res){
      if (req.user){
        console.log("valid user");
        // create new poll
        var poll = new Poll({'pollname': req.body.pollname,'username': req.user.username, 'options': req.body.options});
        //save poll to mongodb
        poll.save(function(err,result){
            if (err) {
              throw(err);
            }
            res.status(200).json(result);
        });

      }
      else {
        console.log("invalid user");
        res.status(401).json("not authenticated")
      }

    })
    //Read/Get all polls for specific user. Need to be Authenticated as user
    .get(function(req,res){
      if (req.user){
      console.log("valid user");
      console.log(req.user);
      Poll.find({username: req.user.username}, function(err,result){
        if (err) {
          throw(err);
        }
        console.log(result);
        res.status(200).json(result);
      });

      } else {
        console.log("invalid user");
        res.status(401).json("not authenticated")
      }
   });


   // Read/Get a poll with a specific id. For all users Authenticated and Not Authenticated
   app.route('/api/poll/:id')
       .get(function(req,res){
         console.log(req.user);
         Poll.find({id:req.params.id}, function(err,result){
           if (err) {
             throw(err);
           }
           console.log(result);
           if (result.length === 1){
           res.status(200).json(result);
         } else {
             res.status(404).json("No Poll found for this URL")
          }
         });

  })
  //fix so not can delete other users polls
      .delete(function(req,res){
        if (req.user){
        console.log("valid user");
        console.log(req.params.id);
        Poll.remove({id: req.params.id}, function(err,result){
          if (err) {
            throw(err);
          }
          console.log(result);
          res.status(200).json(result.result);
        });

        } else {
          console.log("invalid user");
          res.status(401).json("not authenticated")
        }
     })
     //increment counter on poll option. For all users Authenticated and Not Authenticated
     .put(function(req,res){
       console.log(req.body.option);

       Poll.findOneAndUpdate({id: req.params.id, 'options.no': req.body.option},{$inc: {'options.$.count': 1}}, {new: true}, function(err,poll){
         if (err) {
           throw(err);
         }
         //console.log(poll.options);
         res.status(200).json(poll);
         //poll[0].options[req.body.option].count +=1;

      });

      });

      app.route('/api/poll/add/:id')
      .put(function(req,res){
        if (req.user){
        console.log(req.body);
        Poll.findOneAndUpdate({id: req.params.id},{$addToSet: {options: req.body.option}}, {new: true}, function(err,poll){
          if (err) {
            throw(err);
          }
         res.status(200).json(poll);
       });

       } else {
         console.log("invalid user");
         res.status(401).json("not authenticated")
       }

     });

};

//{no: 1, optionName:"", count: 0},{no:2, optionName:"", count: 0}
/*
old put

 */
