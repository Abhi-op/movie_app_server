const { User } = require('../../database/models');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express')
const key = process.env.JWT_KEY;
const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = await jwt.verify(token, key);
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

module.exports = async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || '';
   const user = await verifyToken(token)
  return { user };
};