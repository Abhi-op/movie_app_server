'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.Review,{foreignKey:'movieId',as:'reviews'})
    }
  }
  Movie.init({
    movieName: DataTypes.STRING,
    descreption: DataTypes.STRING,
    dirName: DataTypes.STRING,
    releaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};