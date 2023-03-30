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
        getReviewsByMovie(movieId:Int!):[Movie!]
   }
   extend type Mutation{
        createReview(movieId:Int!,rating:Int!,comment:String!):createReviewResponse
   }
   type createReviewResponse{
        id:Int!
        rating:Int!
        comment:String!
        createdAt:String
   }
`