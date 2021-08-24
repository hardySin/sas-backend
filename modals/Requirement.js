var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReqSchema = new Schema(
  {
    customer: 
    {
       type: String,
       required:[true,'Please Enter the Valid Customer'] ,
      },
     
     rasiedBy:
     {
      type: String,
      required:[true,'Please Enter the Valid RasiedBy'] ,
     },
    mandatorySkills: 
     {
       type: String,
       required:[true,'Please Enter the Valid Mandatory Skills'] ,
       }, 

      desirableSkills: 
      {
        type: String,
        required:[true,'Please Enter the Desirable Skills'] ,
        }, 

        experience: 
      {
        type: String,
        required:[true,'Please Enter the Experience'] ,
        }, 

        billing: 
      {
        type: String,
        required:[true,'Please Enter the Billing'] ,
        }, 

        positionName: 
      {
        type: String,
        required:[true,'Please Enter the Position Name'] ,
        }, 
 
       quantity: 
      {
        type: String,
        required:[true,'Please Enter the Quantity'] ,
        }, 

       
       deploymentLocation: 
      {
        type: String,
        required:[true,'Please Enter the Deployment Location'] ,
        }, 

       
       postalCode: 
      {
        type: String,
        required:[true,'Please Enter the Postal Code'] ,
        }, 

       
       requirementConfirmation: 
      {
        type: String,
        required:[true,'Please Enter the Requirement Confirmation'] ,
        }, 

       dueDeploymentDate: 
       {
        type: Date
         },

        deploymentAddress: 
        {
          type: String,
          required:[true,'Please Enter the Deployment Address'] ,
          minlength:[6,"Please Enter the Deployment Address"], 
          maxlength: 500
         }, 
 
         jobDescription: 
         {
           type: String,
           required:[true,'Please Enter the Job Description'] ,
           minlength:[6,"Please Enter the Job Description"], 
           maxlength: 500
          }, 

           resourceManager: 
          {
            type: String,
            default: 0
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
     isViewed:
     {
       type: Boolean,
       default: false
    },
    isAgree:
    {
      type: Boolean,
      default: false
   }
       }
);

module.exports = mongoose.model('Requirement', ReqSchema);
