'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Presensi.belongsTo(models.Admin, {
        foreignKey: 'admins_id',
      });
    }
  }
  Presensi.init({
    admins_id: DataTypes.INTEGER,
    tgl: DataTypes.DATE,
    kehadiran: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Presensi',
  });
  return Presensi;
};