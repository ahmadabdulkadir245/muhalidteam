const { buildSchema } = require('graphql');
module.exports = buildSchema(`

    type User {
        id: ID!
        name: String!
        email: String!
        password: String
        isAdmin: String!
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

    input BannerInputData {
        image: String!
        category: String!
        userId: ID
    }

    input UserInputData {
        email: String!
        password: String!
    }



    type RootQuery {
        login(email: String!, password: String!): AuthData!
        answer(id: Int): Answer!
        answers(page: Int, perPage: Int): AnswerData!
        user: User!
    }

    type RootMutation {
        deleteAnswer(id: Int): Boolean
        createUser(userInput: UserInputData): User!
        createAnswer(answerInput: AnswerInputData): Answer!
        updateAnswer(id: Int!, answerInput: AnswerInputData): Answer!
        updateStatus(status: String!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
