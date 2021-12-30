import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const SongList = () => {
  const query = gql`
    query ExampleQuery {
      GetAllSongs {
        title
      }
    }
  `;

  const { loading, error, data } = useQuery(query);
  console.log(data);
  return (
    <div>
      {loading && data.hasOwnProperty("GetAllSongs") ? (
        <h3>Loading...</h3>
      ) : (
        <ul>
          {data.GetAllSongs.map((i, k) => (
            <li key={k} className="collection-item">
              {i.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongList;
