import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
  Link,
  Switch,
  IndexRoute,
  Routes,
} from "react-router-dom";
import { createMemoryHistory } from "history";
// impor ApolloClient from "apollo-client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
// import { ApolloProvider } from "react-apollo";
import SongList from "./components/SongList";
import App from "./components/App";
import SongCreate from "./components/SongCreate";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const Root = () => {
  const history = createMemoryHistory();
  return (
    <ApolloProvider client={client}>
      <App>
        <Router history={hashHistory}>
          <Link to="/">home</Link>
          <Link to="/new">Create newsong</Link>
          <Route path="/" component={SongList} exact />
          <Route path="/new" component={SongCreate} exact />
        </Router>
      </App>
      {/* <App>
        <SongCreate />
      </App> */}
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
