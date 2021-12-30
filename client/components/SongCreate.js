import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";
import { useHistory } from "react-router-dom";

const SongCreate = () => {
  const mutation = gql`
    mutation ($title: String) {
      AddSong(title: $title) {
        title
        _id
      }
    }
  `;

  const [makeSong, { loading, error, data }] = useMutation(mutation);

  const history = useHistory();
  useEffect(() => {
    console.log("loading", loading);
    console.log("error", error);
    console.log("data", data);
    makeSong();
  }, [loading]);

  const submit = (e) => {
    e.preventDefault();
    console.log(title);
    makeSong({ variables: { title } });
    history.push("/");
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
