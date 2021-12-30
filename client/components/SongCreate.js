import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";

const SongCreate = (props) => {
  const query = gql`
    query ExampleQuery {
      GetAllSongs {
        title
      }
    }
  `;

  const mutation = gql`
    mutation ($title: String) {
      AddSong(title: $title) {
        title
        _id
      }
    }
  `;

  const [makeSong, { loading, error, data }] = useMutation(mutation);

  useEffect(() => {
    console.log("loading", loading);
    console.log("error", error);
    console.log("data", data);
  }, [loading]);

  const submit = (e) => {
    e.preventDefault();
    console.log(title);
    makeSong({ variables: { title } });
    console.log(data);
  };

  const [title, setTitle] = useState("");
  return (
    <div>
      <h3>Create a new song</h3>
      <form onSubmit={submit.bind(this)}>
        <label>Song title: </label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SongCreate;
