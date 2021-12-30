const mongoose = require("mongoose");
const users = require("../fakedata");
const a = require("../models");

const Lyric = require("../models/lyric");
const Song = require("../models/song");

const resolvers = {
  Query: {
    async GetAllSongs() {
      console.log(a);
      return await Song.find({});
    },
  },
  Mutation: {
    async AddSong(parent, { title }) {
      const newSong = new Song({ title });
      await newSong.save();
      return newSong;
    },
  },
};

module.exports = resolvers;
