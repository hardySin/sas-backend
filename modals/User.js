var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    firstName: 
    {
       type: String,
       required:[true,'Please Enter the Valid First Name'] ,
       minlength:[4,"Please Enter the Valid First Name"], 
       maxlength: 500
     },
     
    lastName:
     {
      type: String,
      required:[true,'Please Enter the Valid Last Name'] ,
      minlength:[4,"Please Enter the Valid Last Name"], 
      maxlength: 500
    },
     emailName: 
     {
       type: String,
       required:[true,'Please Enter the Valid Email'] ,
       minlength:[6,"Please Enter the Valid Email"], 
       maxlength: 500
      }, 

      password: 
      {
        type: String,
        required:[true,'Please Enter the Password'] ,
        minlength:[6,"Please Enter the Password"], 
        maxlength: 500
       }, 
       password_reset: 
       {
        type: Boolean,
        default: false
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
 
     roleID: 
      {
        type: String,
        default: 0
     }
     }
);

module.exports = mongoose.model('User', UserSchema);
