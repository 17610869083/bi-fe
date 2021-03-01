import React, { Component } from "react";
import { Alert, Divider, Card, Button, Row, Col } from "antd";
import styled from "styled-components";
import { getGreetByTime } from "@/utils";
import { localUserKey } from "@/config";
const Container = styled.section`
  display: flex;
  flex-direction: column;
  h1,
  h3 {
    align-self: flex-start;
  }
  .card {
    margin-bottom: 10px;
  }
  .ant-card-body {
    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    .ant-btn {
      flex: 1;
      align-self: flex-start;
      margin-left: 0;
      margin-top: 10px;
    }
  }
  .tip {
    align-self: flex-start;
  }
`;
export default class Home extends Component {
  state = {
    currUser: null
  };
  componentDidMount() {
    const localObj = JSON.parse(localStorage.getItem(localUserKey));
    const username = localObj.username;
    const menu = localObj.menu;
    this.setState({
      currUser: username,
      menu
    });
  }
  render() {
    const { currUser = [], menu = [] } = this.state;
    return (
      <Container>
        <h1>欢迎使用点点未来后台管理系统</h1>
        {currUser && <h3>{`${getGreetByTime()}，${currUser}！`}</h3>}

        <Divider />
        <Row gutter={8} type="flex">
          {menu.map(m => {
            return (
              <Col key={m.id} span={4}>
                <Card title={m.menuName} className="card">
                  {m.children.map(c => (
                    <Button key={c.id} href={`/#${c.menuHref}`}>
                      {c.menuName}
                    </Button>
                  ))}
                </Card>
              </Col>
            );
          })}
        </Row>
        <Divider />
        <Alert
          className="tip"
          message="温馨提示"
          description="为了更好的使用体验，使用过程中遇到任何问题，可以联系技术GG（手机/微信：18201385848）"
          type="info"
          showIcon
        />
      </Container>
    );
  }
}
