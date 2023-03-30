const { gql } = require('apollo-server-express');

module.exports = gql`
input Pagination {
      page: Int!
      items: Int!
  }
  input Filter {
      movieName: String
      descreption: String
  }
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
        getAllMovies(search:Filter,pagination:Pagination,sort:String):[Movie]
        getSingleMovie(movieId:Int!):Movie
  }
  extend type Mutation{
        createMovie(movieName:String!,descreption:String!,dirName:String!,releaseDate:String!):CreateMovieResponse
        deleteMovie(movieId:Int!):DeleteResponse
  }
  type CreateMovieResponse{
         id:Int!
         movieName:String!
         descreption:String!
         dirName:String
         releaseDate:String
         createdAt: String
  }
  type DeleteResponse{
      message:String
  }

`