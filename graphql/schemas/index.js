const { gql } = require('apollo-server-express');
const userType = require('./user');
const movieType = require('./movie');
const reviewType = require('./review');
const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType,userType,movieType,reviewType];