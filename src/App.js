import logo from "./logo.svg";
import "./App.css";
import { Client } from "twitter-api-sdk";

const client = new Client(
  "AAAAAAAAAAAAAAAAAAAAAPk7fgEAAAAAzlXf64cMtZc4Ms4wvi4Af6ggfEg%3DfyjOqDhTKZPwddaQLhsjTsQMPpurXNJJvSJi7WMeZYtwJVMgec"
);

async function main() {
  const tweet = await client.tweets.findTweetById("20");
  console.log(tweet.data.text);
}

main();

function App() {
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
