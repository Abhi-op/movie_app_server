const {Movie,Review} = require("../../database/models")


const { AuthenticationError, ApolloError } = require('apollo-server-express');

module.exports={
        Mutation: {
             async createReview(_,{movieId,rating,comment},{user=null}){
                if (!user) {
                        throw new AuthenticationError('You must login to create a Review');
                      }
                const movie = await Movie.findByPk(movieId);
                if(movie){
                    return movie.createReview({userId:user.id,rating,comment});
                }

                throw new ApolloError('Unable to create a Review');

             },
             async updateReview(_,{reviewId,rating,comment},{user=null}){
                if (!user) {
                        throw new AuthenticationError('You must login to update a Review');
                      }
                 const {userId} = await Review.findByPk(reviewId);
                 console.log(userId);
                 console.log("And")
                 console.log(user.id)
                 if(userId==user.id){
                   const response =  await Review.update({ rating,comment }, {
                                where: {
                                  id:reviewId
                                }
                        });
                        if(response){
                                return "Review has been updated";
                        }
                 }
                 throw new AuthenticationError("User does not have permission to update Review")

             },
             async deleteReview(_,{reviewId},{user=null}){
                  if (!user) {
                        throw new AuthenticationError('You must login to Delete a Review');
                      }
                      const {userId} = await Review.findByPk(reviewId);
                      if(userId==user.id){
                       const response= await Review.destroy({
                                where:{
                                   id:reviewId
                                }   
                           })
                           if(response){
                                return "Review has been deleted successfully"
                           }
                      }
                      throw new AuthenticationError("User does not have permission to Delete Review") 

             }
        },
        Query:{
              async getReviewsByMovie(_,{movieId},context){
                    return await  Review.findAll({
                        where:{
                                movieId:movieId
                        }
                    })        
                   
              }
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
