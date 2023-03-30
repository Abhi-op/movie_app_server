const {Movie} = require("../../database/models")

const { AuthenticationError, ApolloError } = require('apollo-server-express');

module.exports={
        Mutation: {
             async createReview(_,{movieId,rating,comment},{user=null}){
                if (!user) {
                        throw new AuthenticationError('You must login to create a comment');
                      }
                const movie = await Movie.findByPk(movieId);
                if(movie){
                    return    movie.createReview({userId:user.id,rating,comment});
                }

                throw new ApolloError('Unable to create a Review');

             },
        },
        Review:{
            user(review){
                return review.getUser();
            },
            movie(review){
                return review.getMovie();
            }    
        }
}
