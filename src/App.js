import { useEffect, useState, useRef } from "react";

import { Table, Input, Layout, Row, PageHeader, Col, Statistic } from "antd";

// const people = require("./data");

const { Header, Footer, Content } = Layout;

function App() {
  const [people, setPeople] = useState();
  const [users, setUsers] = useState([]);
  const [pagedUsers, setPagedUsers] = useState([]);
  const [retweetUsers, setRetweetUsers] = useState([]);
  const [retweetUsersPaged, setRetweetUsersPaged] = useState([]);
  const [likeError, setLikeError] = useState(false);
  const [retweetError, setRetweetError] = useState(false);
  const [id, setId] = useState();
  const inputRef = useRef(null);

  // const id = "1564962773284446208";

  const createColumns = () => [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Twitter Address",
      key: "address",
      render: (fullArray) => {
        return (
          <a target="_blank" rel="noopener noreferrer" href={fullArray.address}>
            {fullArray.address}
          </a>
        );
      },
    },
    {
      title: "Interaction",
      key: "like",
      render: (fullArray) => {
        const interaction = [];
        if (fullArray.like === true) {
          interaction.push("like");
        } else if (fullArray.retweet === true) {
          interaction.unshift("retweet");
        }
        return interaction;
      },
    },
  ];

  useEffect(() => {
    const getLikeData = async () => {
      if (!id) {
        setUsers([]);
        return;
      }

      let pagedDataArray = [];
      let morePagesAvailable = true;

      const originalData = await fetch(`api/getApi/?id=${id}`);
      const dataList = await originalData.json();
      if (originalData.status === 429) {
        setLikeError(true);
      }

      let pageToken = dataList?.data?.meta.next_token;

      const likeUsers = dataList.data.data;
      const userArray = likeUsers?.map((user) => user.username);
      setUsers(userArray);

      while (morePagesAvailable) {
        const response = await fetch(
          `api/getApi/?id=${id}&paginationToken=${pageToken}`
        );

        const { data } = await response.json();

        const fullData = data.data;
        if (!fullData) {
          setPagedUsers(pagedDataArray);
        } else {
          fullData.forEach((e) => pagedDataArray.push(e));
        }
        pageToken = data?.meta.next_token;
        if (!pageToken) {
          morePagesAvailable = false;
        }
      }
    };
    const getRetweetData = async () => {
      if (!id) {
        setRetweetUsers([]);
        return;
      }

      let pagedDataArray = [];
      let morePagesAvailable = true;

      const originalData = await fetch(`api/getRetweets/?id=${id}`);
      if (originalData.status === 429) {
        setRetweetError(true);
      }
      const dataList = await originalData.json();
      let pageToken = dataList?.data?.meta.next_token;

      const retweetUsers = dataList.data.data;
      const userArray = retweetUsers?.map((user) => user.username);
      setRetweetUsers(userArray);

      while (morePagesAvailable) {
        const response = await fetch(
          `api/getRetweets/?id=${id}&paginationToken=${pageToken}`
        );

        const { data } = await response.json();
        const fullData = data.data;
        if (!fullData) {
          setRetweetUsersPaged(pagedDataArray);
        } else {
          fullData.forEach((e) => pagedDataArray.push(e));
        }
        pageToken = data?.meta.next_token;
        if (!pageToken) {
          morePagesAvailable = false;
        }
      }
    };
    getLikeData();
    getRetweetData();
  }, [id]);

  useEffect(() => {
    const getPeople = async () => {
      if (!id) {
        setPeople([]);
        return;
      }

      const peopleData = await fetch("api/getPeople");
      const peopleList = await peopleData.json();
      const peopleArray = peopleList.people;
      setPeople(peopleArray);
    };
    getPeople();
  }, [id]);

  //Get usernames from twitter data

  const pagesTwitterUsers = pagedUsers.map((user) => user.username);

  const pagesRetweetUsers = retweetUsersPaged.map((user) => user.username);

  //Combine both twitter datasets

  const fullLikesArray = users.concat(pagesTwitterUsers);
  const fullRetweetArray = retweetUsers.concat(pagesRetweetUsers);

  //Create array of pre-defined people who liked the tweet

  const likeIntersectionUsername = people?.filter((element) =>
    fullLikesArray.includes(element.username)
  );

  const updatedLikesArray = likeIntersectionUsername?.map((user) => ({
    ...user,
    like: true,
  }));

  const retweetIntersctionUsername = people?.filter((element) =>
    fullRetweetArray.includes(element.username)
  );

  const updatedRetweetArray = retweetIntersctionUsername?.map((user) => ({
    ...user,
    retweet: true,
  }));

  const fullArray = updatedLikesArray?.concat(updatedRetweetArray);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Row justify="space-between">
          <Col></Col>
          <Col> </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 24px", marginTop: 16 }}>
        <PageHeader
          style={{ backgroundColor: "#fff" }}
          title="Notable Users who Liked a Tweet"
        >
          Enter a tweet id below to see the list of pre-identified users that
          liked it. The tweet id is the string of numbers within the tweet's URL
          on twitter (e.g., https://twitter.com/GoGoPool_/status/TWEET_ID). The
          Twitter API only allows 75 API requests per minute. Due to the
          pagination of their API, if you get an error/the data won't load, it
          is likely because you reached the rate limit. Wait 15 minutes and try
          again. Update{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1P9UiHQkm_NIOg5WieiDfOzsewNC89_vjz127maF7_R0/edit#gid=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            this spreadsheet
          </a>{" "}
          to add or remove notable persons.
        </PageHeader>

        <Row style={{ background: "#fff", padding: 24 }}>
          <Input
            placeholder="Tweet ID"
            value={id}
            onChange={(id) => {
              setId(id.target.value);
            }}
            ref={inputRef}
          />
          <Col align="center" justify="center">
            {id && (
              <Statistic
                title="Total Likes"
                value={likeError ? "Error" : likeIntersectionUsername?.length}
              />
            )}
          </Col>
          <Col span={1}></Col>
          <Col align="center" justify="center">
            {id && (
              <Statistic
                title="Total Retweets"
                value={
                  retweetError ? "Error" : retweetIntersctionUsername?.length
                }
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {id && (
              <Table
                style={{ marginTop: 24 }}
                pagination={false}
                rowKey={(record) => record.logIndex}
                columns={createColumns()}
                dataSource={fullArray}
                scroll={{ x: 400 }}
              />
            )}
          </Col>
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default App;
