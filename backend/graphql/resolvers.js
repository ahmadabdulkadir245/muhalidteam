const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Answer = require('../models/answer')


module.exports = {
  createUser: async function({ userInput }, req, res) {
    // if (!validator.isEmail(userInput.email)) {
    //   errors.push({ message: 'E-Mail is invalid.' });
    // }
    // if (
    //   validator.isEmpty(userInput.password) ||
    //   !validator.isLength(userInput.password, { min: 5 })
    // ) {
    //   errors.push({ message: 'Password too short!' });
    // }
    // if (errors.length > 0) {
    //   const error = new Error('Invalid input.');
    //   error.data = errors;
    //   error.code = 422;
    //   throw error;
    // }

    const userExist = await User.userExist(userInput.email).then(([user]) => {
      return user[0]
    })
    .catch(err => console.log(err))

    if(userExist) {
      // const error = new Error('user has been created with this email');
      // error.code = 401;
      // throw error;

      return  {
        id: '',
        email: false,
        password: '',
        isAdmin: '',
      }
    }
  
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User(null, userInput.email,
     hashedPw, '', null);

    await user.save();

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin
    };
  },
  login: async function({ email, password }) {
    const user = await User.userExist(email).then(([user]) => {
      return user[0]
    })
    .catch(err => console.log(err))
    if (!user) {
      const error = new Error('Email has  not been register.');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Email or Password is incorrect.');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    );
    return { token: token, userId: user.id };
  },
  createAnswer: async function({ answerInput }, req) {
    const answer = new Answer(null, answerInput.exam, answerInput.subject, answerInput.answer, answerInput.userId)
    await answer.save()
    return {
      id: answer.id,
      exam: answer.exam,
      subject: answer.subject,
      answer: answer.answer,
      userId: answer.userId
    }
},
  updateAnswer: async function({ id, answerInput }, req) {
    const answer = new Answer(null, answerInput.exam, answerInput.subject, answerInput.answer, answerInput.userId)
    await answer.updateById(id)
    return {
      id: id,
      exam: answer.exam,
      subject: answer.subject,
      answer: answer.answer,
      userId: answer.userId
    }
},
answers: async function({ page, perPage }, req) {
  if (!page) {
    page = 1;
  }
  // const productPerPage = perPage
  const offset =  (page - 1 ) * perPage 
  const answers = await Answer.findAndCountAll(perPage, offset).then(([rows, fieldData]) => {
    return rows
  })
  .catch(err => console.log(err));

  const totalAnswers = await Answer.fetchAll().then(([rows, fieldData]) => {
    return rows
  })
  .catch(err => console.log(err));

  const totalPages = Math.ceil(totalAnswers.length / perPage);

  return {
    answers: answers.map(answer => {
      return {
        id: answer.id,
        exam: answer.exam,
        subject: answer.subject,
        userId: answer.userId,
        answer: answer.answer
      }
    }),
    totalPages: totalPages
  }
},
answer: async function({ id }, req) {
  const answer = await Answer.findById(id)
  .then(([answer]) => {
    return answer[0]
  })
  .catch(err => console.log(err))
  return {
    id: answer.id,
    exam: answer.exam,
    subject: answer.subject,
    answer: answer.answer
  }
},
users: async function({ page, perPage }, req) {
  if (!page) {
    page = 1;
  }
  // const productPerPage = perPage
  const offset =  (page - 1 ) * perPage 
  const users = await User.findAndCountAll(perPage, offset).then(([rows, fieldData]) => {
    return rows
  })
  .catch(err => console.log(err));

  const totalUsers = await User.fetchAll().then(([rows, fieldData]) => {
    return rows
  })
  .catch(err => console.log(err));

  const totalPages = Math.ceil(totalUsers.length / perPage);

  return {
    users: users.map(user => {
      return {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        examPassword: user.examPassword,
      }
    }),
    totalPages: totalPages
  }
},
updateUser: async function({ id, userInput }, req) {
  const user = new User(id, null, null, userInput.isAdmin, userInput.examPassword)
  await user.updateById(id)
  return {
    id: id,
    isAdmin: user.isAdmin,
    examPassword: user.examPassword,
  }
},
deleteAnswer: async function( {id}, req) {
  Answer.deleteById(id);
 return true
},
deleteUser: async function( {id}, req) {
  User.deleteById(id);
 return true
},
}