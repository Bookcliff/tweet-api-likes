import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";

// const people = require("./data");

function App() {
  const [users, setUsers] = useState([]);
  const [pagedUsers, setPagedUsers] = useState([]);
  const [pageToken, setPageToken] = useState();
  // const [id, setId] = useState();

  const id = "1564962773284446208";

  // console.log(users);
  console.log(pageToken);

  // const { usersNames } = useData(id);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`api/getApi/?id=${id}`);
      const dataList = await data.json();

      // console.log(dataList?.data.meta.next_token);

      const likeUsers = dataList.data.data;
      const userArray = likeUsers?.map((user) => user.username);
      setUsers(userArray);
      setPageToken(dataList?.data.meta.next_token);
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getPagedData = async () => {
      const page = true;
      const pagedDataArray = [];

      while (page === true) {
        const pagedData = await fetch(
          `api/getPagesApi/?id=${id}&paginationToken=${pageToken}`
        );
        const pagedDataList = await pagedData.json();
        console.log(pagedDataList);

        // const updatedArray = pagedDataArray.concat(pagedDataList);
        setPageToken(pagedDataList?.data.meta.next_token);
      }
      if (!pageToken) {
        const page = false;
        return page;
      }
    };
    getPagedData();
  }, [id, pageToken]);

  // const importantPeople = people.map((person) => person.username);

  // const intersectionUsername = users.filter((element) =>
  //   importantPeople.includes(element)
  // );

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
