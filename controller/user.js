const Users=require('../modals/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const max= 3* 24 * 60 *60;
const Role = require('../modals/Role');
const User = require('../modals/User');


const handlerError=(err)=>
 {
         let user={};
            if(err.message.includes('User validation failed'))
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

     if(token==null) return res.status(400);


     jwt.verify(token, process.env.ACCESS_TOKEN_SERCET, function(err, user) {
      if (err) return res.status(400).json({ auth: false, message: 'Failed to authenticate token.' });
      console.log("decoded",user)
      req.user=user;
      next();
     });
 }


    module.exports.emailexits = (req, res,next)=> {
         const{emailName}=req.body.user; 
        Users.find({ emailName: emailName }, (err, result)=>
       {
           console.log("result",result)
           if(result.length>0)
           {
               res.status(400).json({error:"Email Exits"})
            }
            else{
               next();
            }
       });
     }

     module.exports.nameExits = (req, res,next)=> {
       const{firstName}=req.body.user; 

      Users.find({ firstName: firstName }, (err, result)=>
     {
         console.log("result",result)
         if(result.length>0)
         {
             res.status(400).json({error:"Name Exits"})
          }
          else{
             next();
          }
     });
   }

   module.exports.create_user = async(req, res)=> {
    const{firstName,lastName,emailName,roleID}=req.body.user; 
    console.log(req.body.user)

  let user={};
  let userId=req.user.id
  user.firstName=firstName;
   user.lastName=lastName;
   user.emailName=emailName;
   user.password="password";
    user.roleID=roleID;
   user.created_Id=userId;
  user.activeBy=userId;
  
 let userModal=new Users(user);

 try
 {
   userModal.save(function (err, result) {
      if (result!=undefined) 
      {
           res.status(200).json({result})
       }
        else
        {
          let error=handlerError(err)
         res.status(400).json({error})
           }

      });
  }
 catch(e)
 {
    let error=handlerError(err)
   res.status(400).json({error})

  }
 };



 module.exports.userEmailIDExits = (req, res,next)=> {
  const{emailName}=req.body.cred; 
  Users.find({ emailName: emailName }, (err, result)=>
{
     if(result.length>0)
    {
      if(result[0].emailName==emailName)
      {
        return  res.status(200).json({error:"EmailID Already Created",userID:result[0]._id})
        }
       return res.status(400).json({error:"Invalid Email ID"})
        }
     
});
}

  
      

      module.exports.adminemailexits = (req, res,next)=> {
        const{emailName}=req.body.cred; 
        Users.find({ emailName: { $regex: 'admin' } }, (err, result)=>
      {
           if(result.length>0)
          {
            if(result[0].emailName==emailName)
            {
              return res.status(400).json({error:"Admin Already Created",adminId:result[0]._id})
             }
             return res.status(400).json({error:"Invalid Admin Email ID"})
              }
           else{
             next();
           }
      });
    }

      module.exports.admin_user = async(req, res)=> {
        const{emailName}=req.body.cred; 
  
        let user={};
        user.firstName="Hardeep";
         user.lastName="Singh";
         user.emailName=emailName;
         user.password="password";
           
       let userModal=new Users(user);
       try
       {
         userModal.save(function (err, result) {
            if (result!=undefined) 
            {
                 res.status(200).json({result})
             }
              else
              {
                let error=handlerError(err)
               res.status(400).json({error})
                 }
    
            });
        }
       catch(e)
       {
          let error=handlerError(err)
         res.status(400).json({error})
         }
         }


         module.exports.isAdminPasswordReset = (req, res,next)=> {
            const{id}=req.body.data; 
            const{emailName,password}=req.body.data.cred; 
 
          Users.find({ _id: id }, async(err, result)=>
        { 
             if(result[0].password_reset==true)
            {
              await bcrypt.compare(password,result[0].password,(err,res1)=>
             {
               if(res1)
               {
                let userObj;
 
                 const token =createToken(result[0]._id)
                  // res.cookie("AUTH_TOKEN", token,{httpOnly:true });
                 Role.find({ _id: result[0].roleID }, async(err, result2)=>
                {
                  console.log("result2",result2)
                  if(result2!=undefined)
                  {
                    if(result2.length>0)
                    {
                       return res.status(200).json({"firstName":result[0].firstName,"lastName":result[0].lastName,
                      "emailName":result[0].emailName,"roleID":result[0].roleID,"roleName":result2[0].rolename
                      ,"userID":result[0]._id ,"token":token})
                    }
                  }
                  else{
                    return res.status(200).json({token})
                  }
                 })
 
              }
              else{
                res.status(400).json({error:"Invalid Passowrd"})
               }
             })
               }
             else{
               next();
             }
        });
      }


         module.exports.admin_password = async(req, res,next)=> {
 
          const{emailName,password}=req.body.data.cred; 
          const{id}=req.body.data; 
 
           const saltRounds = 10

        bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) {
              return res.status(500).json({err})
          } else {
            bcrypt.hash(password, salt, async function(err, hash) {
              if (err) {
                 return res.status(500).json({err})
              } else {
                console.log(hash)
                await Users.findOneAndUpdate({'_id': id}, {'password': hash,'password_reset':true}, {upsert: true}, function(err, doc) {
                  if (err) return res.status(500).json({err})
                    const token =createToken(doc._id)

                   Role.find({ _id: doc.roleID }, async(err, result2)=>
                {
                   if(result2!=undefined)
                  {
                    if(result2.length>0)
                    {
                       return res.status(200).json({"firstName":doc.firstName,"lastName":doc.lastName,
                      "emailName":doc.emailName,"roleID":doc.roleID,"roleName":result2[0].rolename
                      ,"userID":doc._id ,"token":token})
                    }
                  }
                  else{
                    return res.status(200).json({token})
                  }
                 })
                  res.cookie("AUTH_TOKEN", token,{httpOnly:true });

                  });
      
               }
            })
          }
        })
 
        }

        module.exports.getUser = (req, res,next)=> {
          Users.find({ emailName: { $not: { $regex: "admin" } } ,isActive: true}  , (err, result)=>
         {
             if(result.length>0)
            {
                res.status(200).json({result})
            }
         });
      }

      module.exports.getCustomer = async(req, res,next)=> {
        let customerArr=[];
         Role.findOne({ isActive: true ,rolename:"Customer"},  (err, result)=>
        {
           if(result!=undefined && result!=null)
          {
                   Users.find({  isActive: true,roleID:result._id},(err, result2)=>
                {
                      if(result2.length >0)
                   {
                    res.status(200).json({result2})
                     }
                 });
                }
         })
            }

            
            module.exports.getRM = async(req, res,next)=> {
              let customerArr=[];
               Role.findOne({ isActive: true ,rolename:"Resource Manager"},  (err, result)=>
              {
                 if(result!=undefined && result!=null)
                {
                         Users.find({  isActive: true,roleID:result._id},(err, result2)=>
                      {
                            if(result2.length >0)
                         {
                          res.status(200).json({result2})
                         }
                       });
                      }
               })
                  }
       

                  module.exports.getSourcingVendor = async(req, res,next)=> {
                    let customerArr=[];
                     Role.findOne({ isActive: true ,rolename:"Sourcing Vendor"},  (err, result)=>
                    {
                        if(result!=undefined && result!=null)
                      {
                            Users.find({isActive: true,roleID:result._id},(err, result2)=>
                            {
                                if(result2.length >0)
                               {
                                res.status(200).json({result2})
                               }
                             });
                            }
                     })
                        }
             

   function alphaRandom(len, arr) {
     var ans = '';
     for (var i = len; i > 0; i--) {
         ans += 
           arr[Math.floor(Math.random() * arr.length)];
     }
     return ans;
 }

 // here the id is payload of this function 
const createToken=(id)=>
{
   // here the second arguments is be secure bec. if any knows the key it can access the data
  return jwt.sign({id},process.env.ACCESS_TOKEN_SERCET,{expiresIn: max})
}
