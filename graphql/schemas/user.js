const { gql } = require('apollo-server-express');

module.exports = gql`

 type User {
     id: Int!
     name: String!
     email: String!
     password: String!
     reviews: [Review!]
 }

 extend type Mutation {
     register(input: RegisterInput!): RegisterResponse
     login(input: LoginInput!): LoginResponse
     changePassword(input:ChangePasswordInput!):ChangePasswordResponse
 }

 type RegisterResponse {
    id: Int!
    name: String!
    email: String!
 }

 input RegisterInput {
     name: String!
     email: String!
     password: String!
 }

input LoginInput {
     email: String!
     password: String!
 }
 input ChangePasswordInput{
    email: String!
    oldPassword:String!
    newPassword:String!
 }

  type LoginResponse {
    id: Int!
    name: String!
    email: String!
    token: String!
 }
 type ChangePasswordResponse{
     id:Int!
     name:String!
     email:String!
 }
`;