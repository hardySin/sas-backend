var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoleSchema = new Schema(
  {
    rolename: 
    {
       type: String,
       required:[true,'Please Enter the Valid Role Name'] ,
       minlength:[2,"Please Enter the Valid Role Name"], 
       maxlength: 500
     },
     
    roledescription:
     {
      type: String,
      required:[true,'Please Enter the Valid Role Description Name'] ,
      minlength:[5,"Please Enter the Valid Role Description Name"], 
      maxlength: 500
    },
  
     created_On: 
    {
        type: Date,
        default: Date.now
    },

    created_Id:
    {
     type: String,
     default: 0
     },
    
    modified_On:
     {
        type: Date,
        default: Date.now
     },

    modified_Id:
     {
      type: String,
      default: 0
      },
     isActive: 
     {
        type: Boolean,
        default: true
    },

    activeBy: 
     {
        type: String,
        default: 0
       },
     
    isDeleted:
      {
        type: Boolean,
        default: false
     },
 
     deleteBy: 
      {
        type: String,
        default: 0
    },

      deleted_date: 
      {
        type: Date,
        default: Date.now
     },
  
     }
);

module.exports = mongoose.model('Role', RoleSchema);
