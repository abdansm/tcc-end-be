//kode dari file admin.route.js

//import controller admin.controller.js 
const adminController = require('../controllers/admin.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//membuat admin baru route
route.post('/admin/register', //route 
adminController.createAdmin); //controller

//login admin route
route.post('/admin/login', //route
adminController.loginAdmin); //controller

//logout admin route
route.post('/admin/logout', //route
[mid.isLogin, mid.isLogout], //middleware isLogin dan isLogout digunakan untuk mengecek apakah admin sudah login atau belum atau sudah logout atau belum
adminController.logoutAdmin); //controller

module.exports = route;