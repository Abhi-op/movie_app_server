const {Movie,Review} = require('../../database/models')
const {AuthenticationError,ApolloError} = require('apollo-server-express');
const { Op } = require("sequelize");



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
        },
        async deleteMovie(_,{movieId},{user=null}){
                if (!user) {
                        throw new AuthenticationError('You must login to delete a movie');
                      }
                const {count} = await Review.findAndCountAll({
                        where:{
                                movieId:movieId
                        }
                });
                if(count){
                        await Review.destroy({
                                where:{
                                   movieId:movieId
                                }   
                           })
                }
                
                
                 const response =await Movie.destroy({
                                where:{
                                   id:movieId
                                }   
                           })
                           if(response){
                                return {message:"Movie has been deleted Successfully"};
                           }
                           
                
                    throw new ApolloError("Error While deleting movie");

        },
    },
    Query:{
        async getAllMovies(_,args,{user=null}){
                if(!user) throw new Error('You are not authenticated!')
                const {search,pagination,sort} =args;
                var query={
                        offset:0,
                        limit:5,
                        raw: true,
                        }
                        if(pagination){
                                query.limit=pagination.items;
                                query.offset=pagination.items*(pagination.page-1)
                        }
                        if(search){
                                query.where={
                                    [Op.or]: [
                                        search.movieName?{ movieName: search.movieName }:null,
                                        search.descreption?{ descreption: search.descreption}:null
                                    ] 
                                }
                            }
                            if(sort){
                                query.order= [
                                    [sort, 'ASC'],
                                ];
                            }
                            return await Movie.findAll(query);

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