//kode dari file member.route.js

//import controller admin.controller.js 
const memberController = require('../controllers/member.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();

//membuat member baru route
route.post('/admin/member/create', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
memberController.createMember); //controller

//mendapatkan semua data member route
route.get('/admin/member/get', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
memberController.getMember); //controller

 //melihat data member berdasarkan id route
route.get('/admin/member/get/:id', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
memberController.getMemberById); //controller

 //mengupdate member berdasarkan id route
 route.put('/admin/member/update/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 memberController.updateMember); //controller

 //menghapus member berdasarkan id route
 route.delete('/admin/member/delete/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 memberController.deleteMember); //controller

module.exports = route;