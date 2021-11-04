const socketPool=[];

 
 
    // add user to socketPool
   function userJoin(id,userId,roleName)
    {
        const user={id,userId,roleName}
        socketPool.push(user);
        console.log("socketPool",socketPool)

         return socketPool;
    }

    //get user from socket
   function getUser(userId)
    {
       return socketPool.find(user=> user.userId===userId);
    }

   function removeUser(socketId)
    {
       const index= socketPool.findIndex(user=>  user.id=== socketId);
       if(index!==-1)
       {
            return socketPool.splice(index, 1);
       }
        }

        function getSocketId(userId)
        {
            return socketPool.find(user=> user.userId===userId);
        }

    function isSocketExist(socketId)
    {
        for (let index in socketPool) {
             if(socketPool[index].id===socketId)
            {
                 return true;
             }
           }
           return false;
     }

module.exports={userJoin,getUser,removeUser,getSocketId};