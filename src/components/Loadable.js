import React from "react";
import L from "react-loadable";
import { Skeleton, Button } from "antd";
import styled from "styled-components";

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  .reloadBtn {
    margin: 20px auto;
  }
`;
const RefreshBtn = () => (
  <BtnWrapper>
    <Button
      className="reloadBtn"
      size="large"
      icon={"reload"}
      onClick={() => {
        // 强刷
        window.location.reload(true);
      }}
      type="primary"
    >
      刷新试试
    </Button>
  </BtnWrapper>
);
const Loading = props => {
  if (props.error || props.timedOut) {
    console.log("loadable props", props);

    return <RefreshBtn />;
  } else {
    return <Skeleton active paragraph={{ rows: 18 }} />;
  }
};

const Loadable = props =>
  L({
    loading: Loading,
    delay: 400,
    timeout: 5000,
    ...props
  });

export default Loadable;
