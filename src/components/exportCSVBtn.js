import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import pick from "lodash/pick";
import { connect } from "react-redux";
const getDictValue = (val, dict) => {
  let currVal = val;
  const typeObj =
    dict.find(item => {
      return item.detailName == currVal;
    }) || {};
  return typeObj.detailContent || "暂无";
};
const transformData = (data, dicts) => {
  const {
    school_status = [],
    maid_status = [],
    school_open_status = [],
    is_paid = [],
    contract: isContract = [],
    school_transform = [],
    finance_invoice = []
  } = dicts;
  const transformed = data.map(d => {
    let keys = Object.keys(d);
    console.log("keys", keys);
    const {
      isPaid,
      maidStatus,
      status,
      openStatus,
      transformStatus,
      contract,
      financeInvoice,
      withdrawStatus
    } = d;
    keys.forEach(k => {
      let currKey = k;
      if (typeof d[currKey] == "number") {
        d[currKey] = String(d[currKey]);
      }
      switch (currKey) {
        case "agentName":
          d.agentName = d.agentName ? d.agentName : "暂无代理";
          break;
        case "contract":
          d.contract = getDictValue(contract, isContract);
          break;
        case "isPaid":
          d.isPaid = getDictValue(isPaid, is_paid);
          break;
        case "maidStatus":
          d.maidStatus = getDictValue(maidStatus, maid_status);
          break;
        case "status":
          d.status = getDictValue(status, school_status);
          break;
        case "openStatus":
          d.openStatus = getDictValue(openStatus, school_open_status);
          break;
        case "transformStatus":
          d.transformStatus = getDictValue(transformStatus, school_transform);
          break;
        case "financeInvoice":
          d.financeInvoice = getDictValue(financeInvoice, finance_invoice);
          break;
        case "withdrawStatus":
          d.withdrawStatus = withdrawStatus == 1 ? `是` : `否`;
          break;
        default:
          break;
      }
    });
    return d;
  });
  return transformed;
};
class ExportCSVBtn extends Component {
  render() {
    const {
      data = [],
      headers = [],
      dicts = {},
      isDownload = false
    } = this.props;

    const keys = headers.map(h => h.key);
    let newData = [];
    data.forEach(item => {
      let tmp = pick(item, keys);
      newData.push(tmp);
    });
    console.log("log before", newData);
    newData = transformData(newData, dicts);
    console.log("log", newData);

    return isDownload ? (
      <CSVDownload {...this.props} data={newData} target="_blank">
        {this.props.children}
      </CSVDownload>
    ) : (
      <CSVLink {...this.props} data={newData}>
        {this.props.children}
      </CSVLink>
    );
  }
}
export default connect(store => ({ dicts: store.common.dicts }))(ExportCSVBtn);
