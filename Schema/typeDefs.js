const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Song {
    title: String!
    lyric: [String]
    _id: String!
  }

  # Queries

  type Query {
    GetAllSongs: [Song]
  }

  # Mutations
  type Mutation {
    AddSong(title: String): Song
  }
`;

module.exports = typeDefs;
