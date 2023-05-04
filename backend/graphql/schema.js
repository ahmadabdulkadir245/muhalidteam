const { buildSchema } = require('graphql');
module.exports = buildSchema(`

    type User {
        id: ID!
        name: String!
        email: String!
        password: String
        examPassword: String
        isAdmin: Boolean
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type Answer {
    id: Int
    exam: String!
    subject: String!
    answer: String
    userId: Int!
}

type UserUpdate {
    isAdmin: Boolean
    examPassword: String
}

    type UserData {
        users: [User]
        totalPages: Int
    }

    type AnswerData {
    answers: [Answer!]!
    totalPages: Int!
    }

    input AnswerInputData {
    exam: String!
    subject: String!
    answer: String!
    userId: Int!
}

    input UserUpdateInputData {
        isAdmin: Boolean
        examPassword: String
    }


    input UserInputData {
        email: String!
        password: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        answer(id: Int): Answer!
        answers(page: Int, perPage: Int): AnswerData!
        users(page: Int, perPage: Int): UserData!
        user: User!
    }

    type RootMutation {
        deleteAnswer(id: Int): Boolean
        deleteUser(id: Int): Boolean
        createUser(userInput: UserInputData): User!
        createAnswer(answerInput: AnswerInputData): Answer!
        updateAnswer(id: Int!, answerInput: AnswerInputData): Answer!
        updateUser(id: Int!, userInput: UserUpdateInputData): User!
        updateStatus(status: String!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
