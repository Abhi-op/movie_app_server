const userResolver = require("../resolvers/user")
const movieResolver = require("../resolvers/movie")
const reviewResolver = require("../resolvers/review")

module.exports = [userResolver,movieResolver,reviewResolver];