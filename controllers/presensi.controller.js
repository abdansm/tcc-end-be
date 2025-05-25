//kode dari file presensi.controller.js

//import helper response formatter
const { response} = require('../helpers/response.formatter');

//import model admin
const { Admin, Presensi } = require('../models');

//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat presensi
    createPresensi : async (req,res) => {
        try {
            
            //membuat schema untuk validasi
            const schema = {
                tgl: {
                    type: "date",
                    convert: true,
                    optional : false
                },
                kehadiran: {
                    type: "string",
                    min: 1,
                }
                
            }

            //buat object presensi
            let presensiCreateObj = {
                admins_id: data.adminId,
                tgl: req.body.tgl,
                kehadiran: req.body.kehadiran,
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(presensiCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //buat presensi
            let presensiCreate = await Presensi.create(presensiCreateObj);

            //response menggunakan helper response.formatter
            res.status(201).json(response(201, 'success create presensi', presensiCreate));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data presensi
    getPresensi : async (req,res) => {
        try {
            //mendapatkan data semua presensi
            let presensiGets = await Presensi.findAll({
                //menampilkan admin yang membuat presensi, karena kita sudah membuat relasi
                include : {
                    model : Admin,
                }
            });

        //response menggunakan helper response.formatter
        res.status(200).json(response(200,'success get presensi', presensiGets));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan data presensi berdasarkan id
    getPresensiById : async (req,res) => {
        try{
            //mendapatkan data presensi berdasarkan id
            let presensiGet = await Presensi.findOne({
                where : {
                    id : req.params.id
                },
                //menampilkan admin yang membuat presensi, karena kita sudah membuat relasi 
                include : {
                    model : Admin,
                }
            });

            //cek jika presensi tidak ada
            if(!presensiGet){
                res.status(404).json(response(404,'presensi not found'));
                return;
            }

            //cek apakah admin yang akses adalah yang membuat presensinya
            if(presensiGet.admins_id != data.adminId){
                res.status(403).json(response(403,'youre not owner of this presensi'));
                return;
            }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success get presensi by id', presensiGet));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate presensi berdasarkan id
    updatePresensi : async (req, res) => {
        try {
            //mendapatkan data presensi untuk pengecekan
            let presensiGet = await Presensi.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data presensi ada
            if(!presensiGet){
                res.status(404).json(response(404,'presensi not found'));
                return;
            }

            //cek apakah admin yang akses adalah yang membuat presensinya
            if(presensiGet.admins_id != data.adminId){
                res.status(403).json(response(403,'youre not owner of this presensi'));
                return;
            }

             //membuat schema untuk validasi
            const schema = {
                
                kehadiran: {
                    type: "string",
                    min: 1,
                }
            }

             //buat object presensi
            let presensiUpdateObj = {
                kehadiran: req.body.kehadiran,
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(presensiUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update presensi
            await Presensi.update(presensiUpdateObj, {
                where:{
                    id: req.params.id,
                    admins_id: data.adminId,
                }
            })

            //mendapatkan data presensi setelah update
            let presensiAfterUpdate = await Presensi.findOne({
                where:{
                    id: req.params.id,
                    admins_id: data.adminId,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success update presensi', presensiAfterUpdate));
            
        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }   
    },

    //menghapus presensi berdasarkan id
    deletePresensi: async (req, res) => {
        try {

            //mendapatkan data presensi untuk pengecekan
            let presensiGet = await Presensi.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data presensi ada
            if(!presensiGet){
                res.status(404).json(response(404,'presensi not found'));
                return;
            }

            //cek apakah admin yang akses adalah yang membuat presensinya
            if(presensiGet.admins_id != data.adminId){
                res.status(403).json(response(403,'youre not owner of this presensi'));
                return;
            }

            await Presensi.destroy({
                where:{
                    id: req.params.id,
                    admins_id: data.adminId,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success delete presensi'));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    }
}