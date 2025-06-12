'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init({
    nama: DataTypes.STRING,
    nik: DataTypes.STRING,
    alamat: DataTypes.STRING,
    map_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};