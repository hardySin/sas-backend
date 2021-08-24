const Role = require('../modals/Role');
  
const jwt = require('jsonwebtoken');

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

    module.exports.authenticateToken = (req, res,next)=> {
      const authHeader= req.headers['authorization'];
      console.log("authHeader",authHeader)
     const token= authHeader && authHeader.split(' ')[1]
     console.log("token",token)

     if(token==null) return res.status(401);


     jwt.verify(token, process.env.ACCESS_TOKEN_SERCET, function(err, user) {
      if (err) return res.status(400).json({ auth: false, message: 'Failed to authenticate token.' });
      console.log("decoded",user)
      req.user=user;
      next();
     });
 }


    module.exports.roleExist = (req, res,next)=> {
         const{rolename,description}=req.body.userRole; 
         console.log("role exits middleware",rolename,description)
           
        Role.find({ rolename: rolename }, (err, result)=>
       {
           console.log("result",result)
           if(result.length>0)
           {
               res.status(400).json({error:"Role Exits"})
            }
            else{
               next();
            }
       });
     }

     module.exports.getRoles = (req, res,next)=> {
       Role.find({ }, (err, result)=>
      {
          if(result.length>0)
         {
             res.status(200).json({result})
         }
      });
   }
  
module.exports.create_role = async(req, res)=> {
   const{rolename,description}=req.body.userRole; 
      console.log(rolename,description)
   console.log("userId",req.body.userRole)

     let userId=req.user.id
     console.log("userId",typeof userId)
     let roleObj={};
     roleObj.rolename=rolename;
     roleObj.roledescription=description;
     roleObj.created_Id=userId;
     roleObj.activeBy=userId;
     let rolemodal=new Role(roleObj);

   try
   {
    rolemodal.save(function (err, result) {
           if (result!=undefined) 
           {
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
   };

 