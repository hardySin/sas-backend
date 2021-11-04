
    var express = require('express');
    var router = express.Router();
    const user = require('./controller/user')
    const role = require('./controller/role')
    const requirement= require('./controller/requirement')

    router.post('/createUser',user.authenticateToken,user.nameExits,user.emailexits, user.create_user);
    router.post('/createRole', role.roleExist,role.authenticateToken, role.create_role);
    router.get('/getRoles', role.getRoles);
    router.get('/getUsers', user.getUser);
    router.get('/getCustomers', user.getCustomer);
    router.get('/getResourceManagers', user.getRM);
    router.get('/getSourcingVendor', user.getSourcingVendor);
    
    // user checking 
    router.post('/userEmailChecked',user.userEmailIDExits);
    router.post('/userLogin',user.isAdminPasswordReset, user.admin_password);
    router.post('/adminUser',user.adminemailexits, user.admin_user);
    router.post('/adminPassword',user.isAdminPasswordReset, user.admin_password);

    // save requirement
    router.post('/createRequirement',requirement.createRequirement);
    router.post('/updateNotificationView',requirement.updateNotificationView);
    router.get('/requirement', requirement.getRequirement);
    router.post('/disagreeData', requirement.getDisagreeData);
    router.post('/agreeData', requirement.getAgreeData);
    router.post('/updateAgree', requirement.updateAgree);

    

    module.exports = router;