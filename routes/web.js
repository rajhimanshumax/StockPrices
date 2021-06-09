const fetchController=require('../app/http/controllers/fetchController');
function initRoutes(app){
    app.get('/',fetchController().display);
    app.post('/getstockprices',fetchController().getData);

}

module.exports=initRoutes;