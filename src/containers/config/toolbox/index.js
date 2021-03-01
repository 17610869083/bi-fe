import React from "react";
import { Divider, Button, Alert, InputNumber, message, Card } from "antd";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class Toolbox extends React.Component {
  state = {
    currMobile: "",
    code: ""
  };
  handleBtnClick = () => {
    const { currMobile } = this.state;
    if (currMobile.toString().length) {
      const currDay = Number(moment().format("YYYYMMDD"));
      console.log("currday", currDay);

      const code = (currMobile % currDay).toString().substring(0, 4);
      this.setState({
        code
      });
    } else {
      message.warning("请输入正确的手机号");
    }
  };
  handleMobileChange = val => {
    this.setState({
      currMobile: val
    });
  };
  render() {
    const { currMobile, code, copied } = this.state;
    return (
      <React.Fragment>
        <Card title="万能验证码生成器" style={{ width: 300 }}>
          <InputNumber
            placeholder="手机号"
            value={currMobile}
            onChange={this.handleMobileChange}
            style={{ width: 200 }}
          />
          <Divider />

          <Button onClick={this.handleBtnClick}>获取验证码</Button>
          {code ? (
            <React.Fragment>
              <Divider type="vertical" />
              <CopyToClipboard
                text={code}
                onCopy={() => {
                  this.setState({
                    copied: true
                  });
                }}
              >
                <Button size="small">一键复制</Button>
              </CopyToClipboard>
            </React.Fragment>
          ) : null}
          <Divider />
          {code ? <Alert message={code} type="success" /> : null}
          {copied ? message.success("已复制！") : null}
        </Card>
      </React.Fragment>
    );
  }
}
