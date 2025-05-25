//kode dari file item.controller.js

//import helper response formatter
const { INTEGER } = require('sequelize');
const { response} = require('../helpers/response.formatter');

//import model admin
const { Item } = require('../models');

//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat item
    createItem : async (req,res) => {
        try {
            
            //membuat schema untuk validasi
            const schema = {
                price :{
                    type : "number",
                    min : 0,
                },
                item_name :{
                    type: "string",
                    min: 1,
                }
                
            }

            //buat object item
            let itemCreateObj = {
                price : req.body.price,
                item_name : req.body.item_name,
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(itemCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //buat item
            let itemCreate = await Item.create(itemCreateObj);

            //response menggunakan helper response.formatter
            res.status(201).json(response(201, 'success create item', itemCreate));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data item
    getItem : async (req,res) => {
        try {
            //mendapatkan data semua item
            let itemGets = await Item.findAll({
                
                
            });

        //response menggunakan helper response.formatter
        res.status(200).json(response(200,'success get item', itemGets));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan data item berdasarkan id
    getItemById : async (req,res) => {
        try{
            //mendapatkan data item berdasarkan id
            let itemGet = await Item.findOne({
                where : {
                    id : req.params.id
                },
                
            });

            //cek jika item tidak ada
            if(!itemGet){
                res.status(404).json(response(404,'item not found'));
                return;
            }

            

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success get item by id', itemGet));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate item berdasarkan id
    updateItem : async (req, res) => {
        try {
            //mendapatkan data item untuk pengecekan
            let itemGet = await Item.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data item ada
            if(!itemGet){
                res.status(404).json(response(404,'item not found'));
                return;
            }

            

             //membuat schema untuk validasi
            const schema = {
                price :{
                    type : "number",
                    integer : true,
                    min : 0,
                },
                item_name: {
                    type: "string",
                    min: 1,
                }
            }

             //buat object item
            let itemUpdateObj = {
                price : req.body.price,
                item_name: req.body.item_name
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(itemUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update item
            await Item.update(itemUpdateObj, {
                where:{
                    id: req.params.id,
                    
                }
            })

            //mendapatkan data item setelah update
            let itemAfterUpdate = await Item.findOne({
                where:{
                    id: req.params.id,
                    
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success update item', itemAfterUpdate));
            
        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }   
    },

    //menghapus item berdasarkan id
    deleteItem: async (req, res) => {
        try {

            //mendapatkan data item untuk pengecekan
            let itemGet = await Item.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data item ada
            if(!itemGet){
                res.status(404).json(response(404,'item not found'));
                return;
            }

            

            await Item.destroy({
                where:{
                    id: req.params.id,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success delete item'));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    }
}