const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../../database/models');
const key = process.env.JWT_KEY;
module.exports = {
  Mutation: {
    async register(_, args, context) {
      const { name, email, password } = args.input;
        const user= await User.findOne({where:{email}});
        console.log("user");
        console.log(args.input);
        if(user){
                throw new AuthenticationError("email Id already exists");
        }
      return User.create({ name, email, password });
    },

    async login(root, { input }, context) {
      const { email, password } = input;
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, key);
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError('Invalid credentials');
    },

    async changePassword(_,{input},context){
         const {email,oldPassword,newPassword} = input;
         const user = await User.findOne({ where: { email } });
         if(user && bcrypt.compareSync(oldPassword, user.password)){
          const hash = await bcrypt.hash(newPassword, 10);
          console.log(hash);
          const res =  await User.update({ password:hash}, {
            where: {
              email
            }
          });
          console.log(res);
          return user;
         }
         throw new AuthenticationError('Error while changing password');
    }
  },
};