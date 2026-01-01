const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '8h' }
  );
}

module.exports = {
  Mutation: {
    register: async (
      parent,
      { registerInput: { username, password, confirmPassword } },
      context,
      info
    ) => {
      const { valid, errors } = validateRegisterInput(
        username,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username already exists.', {
          errors: {
            username: 'This username already exists.',
          },
        });
      }

      const newUser = new User({
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    login: async (parent, { username, password }, context, info) => {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username }).select('+password');

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await user.isPasswordCorrect(password, user.password);
      if (!match) {
        errors.general = 'Invalid crendetials';
        throw new UserInputError('Invalid crendetials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
