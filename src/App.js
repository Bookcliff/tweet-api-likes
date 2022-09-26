import logo from "./logo.svg";
import "./App.css";

import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useData(id) {
  const { data, error } = useSWR(`api/getApi/?id=${id}`, fetcher);

  return {
    usersNames: data,
    isLoading: !error & !data,
    isError: error,
  };
}

function App() {
  const [users, setUsers] = useState([]);
  // const [id, setId] = useState();
  console.log(users);

  const id = "1354143047324299264";

  const { usersNames } = useData(id);

  useEffect(() => {
    const getLikes = async () => {
      if (!id || !usersNames) {
        setUsers([]);
        return;
      }
      const likeUsers = usersNames.data.data;
      const userArray = likeUsers.map((user) => user.username);
      setUsers(userArray);
    };
    getLikes();
  }, [id, usersNames]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
