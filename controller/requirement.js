const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const max= 3* 24 * 60 *60;
const Requirement = require('../modals/Requirement');


const handlerError=(err)=>
 {
         let user={};
            if(err.message.includes('Users validation failed'))
       {
           Object.values(err.errors).forEach(({properties})=>
         {
            user[properties.path]=properties.message
              })
              return user;
       }
    }

    
module.exports.createRequirement = (req, res,next)=> {
      console.log(req.body.field)
      console.log(req.body.selectedDate)
      console.log("req.body.userId", req.body.userId)
 
   const {customer,rasiedBy,mandatorySkills,desirableSkills,experience,billing,positionName,quantity
   ,deploymentLocation,postalCode,requirementConfirmation,deploymentAddress,jobDescription,
   resourceManager}=req.body.field;
    const {dueDeploymentDate}=req.body.selectedDate;
    const userId=req.body.userId;
    console.log("req.body.userId", userId);

          let reqObj={};
         reqObj.created_Id=userId;
         reqObj.activeBy=userId;
         reqObj.customer=customer;
         reqObj.rasiedBy=rasiedBy;
         reqObj.mandatorySkills=mandatorySkills;
         reqObj.desirableSkills=desirableSkills;
         reqObj.experience=experience;
         reqObj.billing=billing;
         reqObj.positionName=positionName;
         reqObj.quantity=quantity;
         reqObj.deploymentLocation=deploymentLocation;
         reqObj.postalCode=postalCode;
         reqObj.requirementConfirmation=requirementConfirmation;
         reqObj.deploymentAddress=deploymentAddress;
         reqObj.jobDescription=jobDescription;
         reqObj.resourceManager=resourceManager;
         reqObj.dueDeploymentDate=dueDeploymentDate;
          
           
         let ReqModal=new Requirement(reqObj);
         console.log("ReqModal",ReqModal) 

      try
      {
         ReqModal.save(function (err, result) {
              if (result!=undefined) 
              {
                console.log("Result :"+result)
                res.status(200).json({result})
              }
             else
             {
              console.log("error",err)
              let error=handlerError(err)
              res.status(400).json({error})
                }
   
           });
       }
      catch(e)
      {
        console.log("error",err)
        let error=handlerError(err)
        res.status(400).json({error})
       }
      }

    
       module.exports.getRequirement = (req, res,next)=> {
         const userId=req.body.userId;
           
         Requirement.find({isActive:true, created_Id: userId }, (err, result)=>
      {
          console.log("result",result)
          if(result.length>0)
          {
            res.status(200).json({result})
            }
       });
      }

       module.exports.updateNotificationView = (req, res,next)=> {
           const filter = { _id: req.body.userId };
          const doc = { $set: {"isViewed":true}};
          const options = { new: true };

         try
        {
          Requirement.findOneAndUpdate(filter, doc, options,(err, result)=>
          {
              console.log("result",result)
              if(result!=undefined)
              {
                res.status(200).json({result})
              }
           });
        }
         catch(err)
        {
          console.log("error",err)
           res.status(400).json({err})
         }
      }


      module.exports.updateAgree = (req, res,next)=> {
        const filter = { _id: req.body.userId };
       const doc = { $set: {"isAgree":true}};
       const options = { new: true };

       try
     {
       Requirement.findOneAndUpdate(filter, doc, options,(err, result)=>
       {
           console.log("result",result)
           if(result!=undefined)
           {
             res.status(200).json({result})
           }
        });
     }
      catch(err)
     {
       console.log("error",err)
        res.status(400).json({err})
      }
   }
  

     
 