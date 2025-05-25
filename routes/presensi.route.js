//kode dari file presensi.route.js

//import controller admin.controller.js 
const presensiController = require('../controllers/presensi.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();

//membuat presensi baru route
route.post('/admin/presensi/create', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
presensiController.createPresensi); //controller

//mendapatkan semua data presensi route
route.get('/admin/presensi/get', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
presensiController.getPresensi); //controller

 //melihat data presensi berdasarkan id route
route.get('/admin/presensi/get/:id', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
presensiController.getPresensiById); //controller

 //mengupdate presensi berdasarkan id route
 route.put('/admin/presensi/update/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 presensiController.updatePresensi); //controller

 //menghapus presensi berdasarkan id route
 route.delete('/admin/presensi/delete/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 presensiController.deletePresensi); //controller

module.exports = route;