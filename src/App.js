import { useEffect, useState, useRef } from "react";

import { Table, Input, Layout, Row, PageHeader, Col } from "antd";

// const people = require("./data");

const { Header, Footer, Content } = Layout;

function App() {
  const [users, setUsers] = useState([]);
  const [pagedUsers, setPagedUsers] = useState([]);
  const [pageToken, setPageToken] = useState();
  const [id, setId] = useState();
  const inputRef = useRef(null);

  // const id = "1564962773284446208";

  // console.log(users);
  // console.log(pageToken);

  // const { usersNames } = useData(id);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await fetch(`api/getApi/?id=${id}`);
  //     const dataList = await data.json();

  //     // console.log(dataList?.data.meta.next_token);

  //     const likeUsers = dataList.data.data;
  //     const userArray = likeUsers?.map((user) => user.username);
  //     setUsers(userArray);
  //     setPageToken(dataList?.data.meta.next_token);
  //   };
  //   getData();
  // }, [id]);

  // useEffect(() => {
  //   const getPagedData = async () => {
  //     const page = true;
  //     const pagedDataArray = [];

  //     while (page === true) {
  //       const pagedData = await fetch(
  //         `api/getPagesApi/?id=${id}&paginationToken=${pageToken}`
  //       );
  //       const pagedDataList = await pagedData.json();
  //       console.log(pagedDataList);

  //       // const updatedArray = pagedDataArray.concat(pagedDataList);
  //       setPageToken(pagedDataList?.data.meta.next_token);
  //     }
  //     if (!pageToken) {
  //       const page = false;
  //       return page;
  //     }
  //   };
  //   getPagedData();
  // }, [id, pageToken]);

  // const importantPeople = people.map((person) => person.username);

  // const intersectionUsername = users.filter((element) =>
  //   importantPeople.includes(element)
  // );

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
          title="Pre-Identified Users Tweet-Like List"
        >
          Enter a tweet id below to see the list of pre-identified users that
          liked it.{" "}
        </PageHeader>

        <div style={{ background: "#fff", padding: 24 }}>
          <div>
            <Input
              placeholder="Tweet ID"
              value={""}
              onChange={(event) => {
                setId(event.target.value);
              }}
              ref={inputRef}
            />
          </div>

          {/* Added math.random() because the keys were not unique which was messing with the blockNumber sorting */}
          {id && (
            <Table
            // style={{ marginTop: 24 }}
            // pagination={false}
            // rowKey={(record, index) =>
            //   record.logIndex + Math.random() * index
            // }
            // columns={createColumns(filter)}
            // dataSource={updatedEventsTime}
            // loading={isLoading}
            // scroll={{ x: 400 }}
            />
          )}
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default App;
