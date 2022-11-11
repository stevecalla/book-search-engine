const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
    // if (context.user) {
      return User.find().populate('books');
    // }
    //   throw new AuthenticationError('You need to be logged in!');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('books');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    // me: async (parent, args, context) => {
    //   console.log(context, context.user);
    //   // if (context.user) {
    //     // return User.findOne({ _id: "636c6732dd1ce92e610cd132" }).populate('books');
    //     return User.findOne({ _id: context.user._id }).populate('books');
    //   // }
    //   // throw new AuthenticationError('You need to be logged in!');
    // },
    me: async (parent, { _id }, context) => {
        return User.find({ _id }).populate('books');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBook: async (parent, { _id, bookId, authors, description, image, title }, context) => {
      // if (context.user) {
        return User.findOneAndUpdate(
          { _id },
          { $addToSet: {
              savedBooks: {
                bookId: bookId,
                authors,
                description,
                image,
                title,
              },
            },
          },
          { new: true }
        );
     },
    removeBook: async (parent, { _id, bookId }, context) => {
      // if (context.user) {
        //todo
        return User.findOneAndUpdate(
          { _id },
          { $pull: {
              savedBooks: {
                bookId: bookId
              },
            },
          },
          { new: true }
        );
     },
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};

module.exports = resolvers;
