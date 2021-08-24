const {userJoin,getUser,removeUser,getSocketId} = require("./helper/socketBucket");
const Requirement = require("./modals/Requirement");

 
  const intializeSocket=(io)=>
{

       io.on('connection',(socket)=>
      {
        console.log("socket initalizated",socket.id)

         
         socket.on('userJoin',({userId,roleName})=>
         {
            
        let arr= userJoin(socket.id,userId,roleName)
             });

            
   
            socket.on('requirements',({field,selectedDate,userId})=>
            {

    const {customer,rasiedBy,mandatorySkills,desirableSkills,experience,billing,positionName,quantity
    ,deploymentLocation,postalCode,requirementConfirmation,deploymentAddress,jobDescription,
    resourceManager}= field;
    console.log(typeof selectedDate ,selectedDate )

     const dueDeploymentDate= selectedDate;
     const userId2= userId;
      console.log(typeof dueDeploymentDate ,dueDeploymentDate )
      let date=new Date(dueDeploymentDate);
      console.log(typeof date ,date )

           let reqObj={};
          reqObj.created_Id=userId2;
          reqObj.activeBy=userId2;
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
  
       try
       {
          ReqModal.save(function (err, result) {
               if (result!=undefined)  
               {
                     var created_user=getSocketId(result.created_Id);
   
                    io.to(created_user.id).emit('success',{result})

                    if(getUser(result.resourceManager)!==undefined)
                   {
                    var user= getSocketId(result.resourceManager)
                      io.to(user.id).emit('reqNotification',{result})
                    }
                }
              else
              {
               console.log("error",err)
               let error=handlerError(err)
               socket.emit("error",{error})

                  }
    
            });
        }
       catch(e)
       {
         console.log("error",err)
         let error=handlerError(err)
         socket.emit("error",{error})
        }
      });
   
  
  
       

              socket.on('updateNotificationView',({userId})=>
              {
                ReqModal.findOneAndUpdate(id,{isViewed:true},  {upsert: true},(err, result)=>
                {
                    console.log("result",result)
                   //  if(result.length>0)
                   //  {
                   //    res.status(200).json({result})
                   //    }
                 });
               });

           socket.on("disconnect", () => {
            console.log("socket disconnected" ,socket.id);
            removeUser(socket.id)
           });
  
       })
 }

module.exports=intializeSocket;