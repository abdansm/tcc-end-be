//kode dari file member.controller.js

//import helper response formatter
const { INTEGER } = require('sequelize');
const { response} = require('../helpers/response.formatter');

//import model admin
const { Member } = require('../models');

//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat member
    createMember : async (req,res) => {
        try {
            
            //membuat schema untuk validasi
            const schema = {
                nama :{
                    type : "string",
                    min : 0,
                },
                nik :{
                    type: "string",
                    min: 1,
                },
                alamat :{
                    type: "string",
                    min: 1,
                },
                map_url :{
                    type: "url",
                }
                
            }

            //buat object member
            let memberCreateObj = {
                nama : req.body.nama,
                nik : req.body.nik,
                alamat : req.body.alamat,
                map_url : req.body.map_url
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(memberCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //buat member
            let memberCreate = await Member.create(memberCreateObj);

            //response menggunakan helper response.formatter
            res.status(201).json(response(201, 'success create member', memberCreate));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data member
    getMember : async (req,res) => {
        try {
            //mendapatkan data semua member
            let memberGets = await Member.findAll({
                
                
            });

        //response menggunakan helper response.formatter
        res.status(200).json(response(200,'success get member', memberGets));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan data member berdasarkan id
    getMemberById : async (req,res) => {
        try{
            //mendapatkan data member berdasarkan id
            let memberGet = await Member.findOne({
                where : {
                    id : req.params.id
                },
                
            });

            //cek jika member tidak ada
            if(!memberGet){
                res.status(404).json(response(404,'member not found'));
                return;
            }

            

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success get member by id', memberGet));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate member berdasarkan id
    updateMember : async (req, res) => {
        try {
            //mendapatkan data member untuk pengecekan
            let memberGet = await Member.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data member ada
            if(!memberGet){
                res.status(404).json(response(404,'member not found'));
                return;
            }

            

             //membuat schema untuk validasi
            const schema = {
                 nama :{
                    type : "string",
                    min : 0,
                },
                nik :{
                    type: "string",
                    min: 1,
                },
                alamat :{
                    type: "string",
                    min: 1,
                }
            }

             //buat object member
            let memberUpdateObj = {
                nama : req.body.nama,
                nik : req.body.nik,
                alamat : req.body.alamat,
                map_url : req.body.map_url
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(memberUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update member
            await Member.update(memberUpdateObj, {
                where:{
                    id: req.params.id,
                    
                }
            })

            //mendapatkan data member setelah update
            let memberAfterUpdate = await Member.findOne({
                where:{
                    id: req.params.id,
                    
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success update member', memberAfterUpdate));
            
        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }   
    },

    //menghapus member berdasarkan id
    deleteMember: async (req, res) => {
        try {

            //mendapatkan data member untuk pengecekan
            let memberGet = await Member.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data member ada
            if(!memberGet){
                res.status(404).json(response(404,'member not found'));
                return;
            }

            

            await Member.destroy({
                where:{
                    id: req.params.id,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success delete member'));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    }
}