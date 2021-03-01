import React from "react";
import { Cascader } from "antd";
import { connect } from "react-redux";

const getOptions = cates => {
  const {
    school_employ_pri,
    school_leader_sub = [],
    parent_sub = [],
    school_employ_sub = [],
    school_te_sub = []
  } = cates;
  console.log("cates in func", cates);

  const teacherOpts = school_te_sub.map(sub => ({
    value: sub.detailName,
    label: sub.detailContent
  }));
  const parentOpts = parent_sub.map(sub => ({
    value: sub.detailName,
    label: sub.detailContent
  }));
  const leaderOpts = school_leader_sub.map(sub => ({
    value: sub.detailName,
    label: sub.detailContent
  }));
  const staffOpts = school_employ_sub.map(sub => ({
    value: sub.detailName,
    label: sub.detailContent
  }));
  const mainOpts = [teacherOpts, parentOpts, leaderOpts, staffOpts];

  return school_employ_pri.map((item, idx) => {
    return {
      value: item.detailName,
      label: item.detailContent,
      children: mainOpts[idx]
    };
  });
};

class IdentiyCascader extends React.Component {
  render() {
    const {
      school_employ_pri = [],
      school_leader_sub = [],
      parent_sub = [],
      school_employ_sub = [],
      school_te_sub = []
    } = this.props;
    const options = {
      school_employ_pri,
      school_leader_sub,
      parent_sub,
      school_employ_sub,
      school_te_sub
    };
    return (
      <Cascader
        expandTrigger="hover"
        changeOnSelect={true}
        options={getOptions(options)}
        placeholder="请选择身份"
        {...this.props}
      />
    );
  }
}

export default connect(state => {
  return { ...state.common.dicts };
})(IdentiyCascader);
