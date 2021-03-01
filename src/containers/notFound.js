import React from "react";
import img from "@/style/imgs/404.jpg";
import styled, { createGlobalStyle } from "styled-components";
import { Button, Divider } from "antd";

const HideBreadcrumb = createGlobalStyle`
  .ant-layout-content .ant-tag{
    display:none
  }
`;
const Container = styled.section`
  height: 90vh;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  align-items: end;
  .crying {
    height: 90%;
  }
  .tip {
    height: 90%;
    padding: 60px 0;
    .title {
      font-size: 2.5rem;
    }
    .desc {
      font-size: 1.5rem;
      margin-top: 6rem;
    }
  }
`;
class NotFound extends React.Component {
  render() {
    return (
      <Container>
        <HideBreadcrumb />
        <img className="crying" src={img} alt="404" />
        <div className="tip">
          <h1 className="title">哎呀！页面没找到~</h1>
          <p className="desc">您可以返回：</p>
          <Button
            size="large"
            type="dashed"
            onClick={() => {
              history.go(-1);
            }}
          >
            上一页
          </Button>
          <Divider type="vertical" />
          <Button size="large" type="primary" href="/">
            首页
          </Button>
        </div>
      </Container>
    );
  }
}

export default NotFound;
