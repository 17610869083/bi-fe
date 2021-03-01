import React from "react";
import ReactDOM from "react-dom";
import {
  Table,
  Input,
  Modal,
  Form,
  Icon,
  message,
  Divider,
  Button
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import "@/style/dict.less";
import {
  getParents,
  getChildrens,
  editDict,
  addDict,
  deleteDict
} from "@/actions/sys/dict";
import DictList from "./table";
const { Search } = Input;
let details;
class Children extends React.Component {
  state = {
    loading: false,
    data: []
  };
  componentDidMount() {
    console.log(this.props);
    if (this.props.dictName) {
      this.setState(
        {
          loading: true
        },
        () => {
          this.props.getChildrens(this.props.dictName, (status, response) => {
            let data = [];
            if (status === "success") {
              data = response;
            }
            this.set({
              loading: false,
              data
            });
          });
        }
      );
    }
  }
  set = (params, callback) => {
    this.setState(params, () => {
      if (callback) callback();
      details = this.state.data;
    });
  };
  addItem = () => {
    const details = this.state.data;
    console.log(this.props);
    details.push({
      key: Math.random() * 99999,
      detailName: "",
      detailContent: "",
      dictName: this.props.dictName
    });
    this.set({ data: details });
  };
  removeItem = index => {
    const details = this.state.data;
    if (index > -1) {
      details.splice(index, 1);
    }
    this.set({ data: details });
  };
  onChangeItem = (index, key, value) => {
    const details = this.state.data;
    if (index > -1) {
      details[index][key] = value;
    }
    this.set({ data: details });
  };
  up = index => {
    const details = this.state.data;
    let temp = { ...details[index] };
    if (index === 0) {
      details[index] = details[details.length - 1];
      details[details.length - 1] = temp;
    } else {
      details[index] = details[index - 1];
      details[index - 1] = temp;
    }
    this.set({ data: details });
  };
  down = index => {
    const details = this.state.data;
    let temp = { ...details[index] };
    if (index === details.length - 1) {
      details[index] = details[0];
      details[0] = temp;
    } else {
      details[index] = details[index + 1];
      details[index + 1] = temp;
    }
    this.set({ data: details });
  };
  render() {
    const dataSource = (this.state.data || []).map(res => ({
      ...res,
      key: res.id || res.key
    }));
    const columns = [
      {
        title: "序号",
        dataIndex: "",
        render: (text, record, index) => index + 1
      },
      {
        title: "唯一标识",
        dataIndex: "detailName",
        render: (text, record, index) => (
          <Input
            defaultValue={text}
            placeholder="请输入名称"
            onChange={e =>
              this.onChangeItem(index, "detailName", e.target.value)
            }
          />
        )
      },
      {
        title: "子项名称",
        dataIndex: "detailContent",
        render: (text, record, index) => (
          <Input
            defaultValue={text}
            placeholder="请输入详情"
            onChange={e =>
              this.onChangeItem(index, "detailContent", e.target.value)
            }
          />
        )
      },
      {
        title: "操作",
        dataIndex: "",
        render: (text, record, index) => (
          <span>
            <a onClick={() => this.up(index)}>
              <Icon type="arrow-up" />
            </a>
            <span style={{ paddingLeft: 5 }} />
            <a onClick={() => this.down(index)}>
              <Icon type="arrow-down" />
            </a>
            <span style={{ paddingLeft: 5 }} />
            <a onClick={() => this.removeItem(index)}>
              <Icon type="delete" />
            </a>
          </span>
        )
      }
    ];
    return (
      <Table
        size="small"
        loading={this.state.loading}
        title={() => (
          <div className="clearfix">
            <a style={{ float: "right" }} onClick={this.addItem}>
              <Icon type="plus-circle-o" />
            </a>
          </div>
        )}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    );
  }
}

function DictModal(params, index) {
  let div = document.createElement("div");
  let form;
  const cancel = () => {
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
    div = null;
  };
  const DictForm = Form.create({
    mapPropsToFields: params
      ? () => ({
          dictName: Form.createFormField({
            value: params.dictName
          }),
          dictContent: Form.createFormField({
            value: params.dictContent
          })
        })
      : null
  })(
    class wtf extends React.Component {
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form>
            <Form.Item label="唯一标识">
              {getFieldDecorator("dictName", {
                rules: [
                  {
                    required: true,
                    message: "字典唯一标识不能为空?"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="字典名称">
              {getFieldDecorator("dictContent", {
                rules: [
                  {
                    required: true,
                    message: "字典名称不能为空?"
                  }
                ]
              })(<Input.TextArea />)}
            </Form.Item>
            <Form.Item label="子项">
              {getFieldDecorator("details")(
                <Children
                  {...this.props}
                  dictName={params ? params.dictName : ""}
                  dictContent={params ? params.dictContent : ""}
                  createdUserId={params ? params.createdUserId : ""}
                  createdUserName={params ? params.createdUserName : ""}
                />
              )}
            </Form.Item>
          </Form>
        );
      }
    }
  );
  const type = params ? "edit" : "add";
  const title = params ? "编辑字典" : "创建字典";
  const okText = params ? "保存" : "创建";
  ReactDOM.render(
    <Modal
      title={title}
      visible={true}
      onCancel={cancel}
      okText={okText}
      close={cancel}
      onOk={() => {
        form.validateFields((err, values) => {
          if (!err) {
            details = details
              ? details.map(res => ({
                  ..._.pick(res, [
                    "detailName",
                    "detailContent",
                    "id",
                    "dictName"
                  ])
                }))
              : [];
            if (
              details.some(res => {
                return !(res.detailName && res.detailContent);
              })
            ) {
              message.error("子项不能为空");
              return;
            }
            switch (type) {
              case "edit":
                this.props.editDict({ ...values, details }, index, () => {
                  details = null;
                  this.getParents();
                  cancel();
                });
                break;
              default:
                this.props.addDict({ ...values, details }, () => {
                  details = null;
                  this.getParents();
                  cancel();
                });
                break;
            }
          }
        });
      }}
      ref={ref => (window.zdyModal = ref)}
    >
      <DictForm ref={ref => (form = ref)} {...this.props} />
    </Modal>,
    div
  );
}

class ManageDictTables extends React.Component {
  state = {
    parentLoading: false,
    childrenLoading: false
  };
  componentDidMount() {
    this.getParents();
  }
  componentWillUnmount() {
    window.zdyModal && window.zdyModal.props.close();
  }
  getParents = params => {
    const { pageNum = 1, dictName = "" } = this.props.parentObj;
    this.props.getParents({ pageNum, dictName, ...params });
  };
  render() {
    const { parentObj, loading, deleteDict } = this.props;

    return (
      <React.Fragment>
        <div>
          <div style={{ display: "inline-block" }}>
            <Search
              placeholder="搜索字典"
              onSearch={value => {
                console.log("search clicked");

                this.getParents({ dictName: value });
              }}
            />
          </div>
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={() => DictModal.call(this)}
          >
            添加字典
          </Button>
        </div>
        <Divider />
        <DictList
          data={parentObj.parents}
          pagination={{ pageNum: parentObj.pageNum, total: parentObj.total }}
          loading={loading}
          getParents={this.getParents}
          deleteDict={deleteDict}
          DictModal={DictModal}
          self={this}
        />
      </React.Fragment>
    );
  }
}

const mapStateToPorps = state => {
  return { ...state.dict };
};
const mapDispatchToProps = dispatch => ({
  getParents: bindActionCreators(getParents, dispatch),
  getChildrens: bindActionCreators(getChildrens, dispatch),
  editDict: bindActionCreators(editDict, dispatch),
  addDict: bindActionCreators(addDict, dispatch),
  deleteDict: bindActionCreators(deleteDict, dispatch)
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(ManageDictTables);
