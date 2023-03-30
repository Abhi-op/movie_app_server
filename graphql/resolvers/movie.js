const {Movie} = require('../../database/models')
const {AuthenticationError} = require('apollo-server-express');


module.exports={
    Mutation:{
        async createMovie(_,{movieName,descreption,dirName,releaseDate},{user=null}){
                if (!user) {
                        throw new AuthenticationError('You must login to create a post');
                      }
                return Movie.create({
                        movieName,
                        descreption,
                        dirName,
                        releaseDate  
                })
        }
    },
    Query:{
        async getAllMovies(_,args,context){
                return Movie.findAll();
        },
        async getSingleMovie(_,{movieId},context){
                return Movie.findByPk(movieId);
        }
    },

    Movie:{
        reviews(movie){
              return movie.getReviews();
        }
    }

}