const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('books');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('books');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    me: async (parent, args, context) => {
      console.log(context, context.user);
      // if (context.user) {
        // return User.findOne({ _id: "636c6732dd1ce92e610cd132" }).populate('books');
        return User.findOne({ _id: context.user._id }).populate('books');
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    // me: async (parent, { _id }, context) => {
    //     return User.findOne({ _id }).populate('books');
    // },
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
    //todo
    addBook: async (parent, { bookId, authors: [], description, image, link, title }, context) => {
      if (context.user) {
        const book = await Book.create({
          //todo
          bookId,
          authors,
          description,
          image,
          link,
          title,
          username: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { books: book._id } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        //todo
        const book = await Book.findOneAndDelete({
          _id: bookId,
          username: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book._id } }
        );

        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
