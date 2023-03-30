const { gql } = require('apollo-server-express');

module.exports = gql`
  type Movie{
        id:Int!
        movieName:String!
        descreption:String
        dirName:String
        releaseDate:String
        reviews:[Review!]
        createdAt: String
  }
  extend type Query{
        getAllMovies:[Movie!]
        getSingleMovie(movieId:Int!):Movie
  }
  extend type Mutation{
        createMovie(movieName:String!,descreption:String!,dirName:String!,releaseDate:String!):CreateMovieResponse
  }
  type CreateMovieResponse{
         id:Int!
         movieName:String!
         descreption:String!
         dirName:String
         releaseDate:String
         createdAt: String
  }

`