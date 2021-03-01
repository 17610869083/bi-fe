import React from "react";
import { Breadcrumb, Tag } from "antd";
import { Link, withRouter } from "react-router-dom";

const getKeyValueMap = (objArr, objMap = {}) => {
  objArr.forEach(item => {
    objMap[item.menuHref] = item.menuName;
    if (item.children.length) {
      getKeyValueMap(item.children, objMap);
    }
  });
  return objMap;
};
const BreadcrumbCustom = withRouter(props => {
  const { location, menu } = props;
  let menuKeyValueMap = getKeyValueMap(menu);
  console.log("bread key value map", menu, menuKeyValueMap);

  const pathSnippets = location.pathname.split("/").filter(i => i);
  console.log(pathSnippets);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    // 键值对对应
    const mapKey = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return menuKeyValueMap[mapKey] ? (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{menuKeyValueMap[mapKey]}</Link>
      </Breadcrumb.Item>
    ) : null;
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);
  return (
    <Tag color="blue" style={{ position: "absolute", top: "-10px" }}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </Tag>
  );
});
export default BreadcrumbCustom;
