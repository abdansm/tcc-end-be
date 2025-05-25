//import route admin pada routes\admin.route.js
const adminRoute = require('./admin.route');

//import route item pada routes\item.route.js
const itemRoute = require('./item.route');

//import route member pada routes\member.route.js
const memberRoute = require('./member.route');

//import route member pada routes\presensi.route.js
const presensiRoute = require('./presensi.route');

module.exports = function(app,urlApi){
    //route admin
    app.use(urlApi,adminRoute);

    //route item
    app.use(urlApi,itemRoute);

    //route member
    app.use(urlApi,memberRoute);

    //route presensi
    app.use(urlApi,presensiRoute);
}