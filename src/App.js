import { useEffect, useState, useRef } from "react";

import { Table, Input, Layout, Row, PageHeader, Col } from "antd";

const people = require("./data");

const { Header, Footer, Content } = Layout;

function App() {
  const [users, setUsers] = useState([]);
  const [pagedUsers, setPagedUsers] = useState([]);
  // const [id, setId] = useState();
  const inputRef = useRef(null);

  const id = "1564962773284446208";

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
      render: (intersectionUsername) => {
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={intersectionUsername.address}
          >
            {intersectionUsername.address}
          </a>
        );
      },
    },
  ];

  useEffect(() => {
    const getPagedData = async () => {
      let pagedDataArray = [];
      let morePagesAvailable = true;

      const originalData = await fetch(`api/getApi/?id=${id}`);
      const dataList = await originalData.json();
      let pageToken = dataList?.data?.meta.next_token;

      const likeUsers = dataList.data.data;
      const userArray = likeUsers?.map((user) => user.username);
      setUsers(userArray);

      while (morePagesAvailable) {
        const response = await fetch(
          `api/getPagesApi/?id=${id}&paginationToken=${pageToken}`
        );
        const { data } = await response.json();
        const fullData = data.data;
        if (!fullData) {
          setPagedUsers(pagedDataArray);
        } else {
          fullData.forEach((e) => pagedDataArray.push(e));
        }
        pageToken = data?.meta.next_token;
        console.log(pageToken);
        if (!pageToken) {
          morePagesAvailable = false;
        }
      }
    };
    getPagedData();
  }, [id]);

  //Get usernames from twitter data

  const pagesTwitterUsers = pagedUsers.map((user) => user.username);

  //Combine both twitter datasets

  const fullLikesArray = users.concat(pagesTwitterUsers);
  console.log({ pagedUsers, fullLikesArray });

  //Pull out the usernames of the pre-defined people list

  // const importantPeople = people.map((person) => person.username);

  //Create array of pre-defined people who liked the tweet

  const intersectionUsername = people.filter((element) =>
    fullLikesArray.includes(element.username)
  );

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
          title="Pre-Identified Users who Liked a Tweet"
        >
          Enter a tweet id below to see the list of pre-identified users that
          liked it. The tweet id is the string of numbers within the tweet's URL
          on twitter (e.g., https://twitter.com/GoGoPool_/status/TWEET_ID)
        </PageHeader>

        <div style={{ background: "#fff", padding: 24 }}>
          <div>
            <Input
              placeholder="Tweet ID"
              value={""}
              // onChange={(event) => {
              //   setId(event.target.value);
              // }}
              ref={inputRef}
            />
          </div>

          {/* Added math.random() because the keys were not unique which was messing with the blockNumber sorting */}
          {id && (
            <Table
              style={{ marginTop: 24 }}
              pagination={false}
              rowKey={(record) => record.logIndex}
              columns={createColumns()}
              dataSource={intersectionUsername}
              scroll={{ x: 400 }}
            />
          )}
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default App;
