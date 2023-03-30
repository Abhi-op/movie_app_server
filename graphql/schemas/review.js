const { gql } = require('apollo-server-express');

module.exports = gql`
   type Review{
        id:Int!
        movie:Movie!
        user:User!
        rating:Int!
        comment:String
        createdAt:String
   }
   extend type Query{
        getReviewsByMovie(movieId:Int!):[Review!]
   }
   extend type Mutation{
        createReview(movieId:Int!,rating:Int!,comment:String!):createReviewResponse
        updateReview(reviewId:Int!,rating:Int!,comment:String!):String!
        deleteReview(reviewId:Int!):String!
   }
   type createReviewResponse{
        id:Int!
        rating:Int!
        comment:String!
        createdAt:String
   }
`