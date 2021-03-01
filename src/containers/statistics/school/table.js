import React, { Component } from "react";
import { Table, Tag } from "antd";

const Badges = ({ items, color = "red" }) => (
  <ul style={{ listStyle: "none", lineHeight: 2, padding: 0 }}>
    {items.map(item => (
      <li key={item.txt}>
        <Tag color={color}>
          {item.txt}: {item.num}
        </Tag>
      </li>
    ))}
  </ul>
);
export default class SchoolList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "编号",
        dataIndex: "schoolId"
      },
      {
        title: "园所名称",
        dataIndex: "schoolName"
      },
      {
        title: "概况",
        dataIndex: "intro",
        render: (text, record) => {
          return (
            <Badges
              color="orange"
              items={[
                { num: record.classNum, txt: "班级数" },
                { num: record.studentNum, txt: "学生数" },
                { num: record.teacherNum, txt: "老师数" },
                { num: record.parentNum, txt: "家长数" }
              ]}
            />
          );
        }
      },
      {
        title: "每月四篇",
        dataIndex: "mobile",
        render: (text, record) => {
          return (
            <Badges
              color="geekblue"
              items={[
                { num: record.weixinArticleDownloadNum, txt: "下载" },
                { num: record.weixinArticlePublishNum, txt: "发布" },
                { num: record.weixinArticleCreateNum, txt: "自建" }
              ]}
            />
          );
        }
      },
      {
        title: "不限次数群发发布数",
        dataIndex: "batchMsgPublishNum"
      },
      {
        title: "使用地图标记",
        dataIndex: "mapSign",
        render: (txt, record) => (record.mapSign == 1 ? `使用` : `未使用`)
      },
      {
        title: "使用校园相册",
        dataIndex: "kindergartenAlbum",
        render: (txt, record) =>
          record.kindergartenAlbum == 1 ? `使用` : `未使用`
      },
      {
        title: "动态概况",
        dataIndex: "moments",
        render: (txt, record) => {
          return (
            <Badges
              color="blue"
              items={[
                { num: record.momentsTeacherNum, txt: "教师发布" },
                { num: record.momentsHeadmasterNum, txt: "园长发布" },
                { num: record.momentsParentNum, txt: "家长发布" }
              ]}
            />
          );
        }
      },
      {
        title: "通知",
        dataIndex: "notification",
        render: (txt, record) => {
          return (
            <Badges
              color="green"
              items={[
                { num: record.noticeTeacherNum, txt: "教师发布" },
                { num: record.noticeHeadmasterNum, txt: "园长发布" }
              ]}
            />
          );
        }
      },

      {
        title: "招生统计",
        dataIndex: "enrollStat",
        render: (txt, record) => {
          return (
            <Badges
              items={[
                { num: record.enrolCaidanNum, txt: "采单" },
                { num: record.enrolWanshanNum, txt: "完善" }
              ]}
            />
          );
        }
      }
    ];
  }
  render() {
    const {
      data,
      loading,
      pagination: { pageNum, total },
      updateRetriveValues,
      handlePageChange,
      retriveValues: params
    } = this.props;
    // console.log("ddddd", typeof pageNum);

    return (
      <Table
        rowKey="schoolId"
        columns={this.columns}
        dataSource={data}
        loading={loading}
        pagination={{
          pageSize: 20,
          current: Number(pageNum),
          total,
          onChange: curr => {
            console.log("curr", curr);

            updateRetriveValues({ pageNum: curr });
            handlePageChange({ ...params, pageNum: curr });
          },
          showTotal: total => `共 ${total} 条记录`
        }}
      />
    );
  }
}
