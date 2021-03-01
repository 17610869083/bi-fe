import Cookie from "js-cookie";
import province from "./address/province";
import city from "./address/city";
import town from "./address/town";
export const address = {
  province,
  city,
  town
};
export const getGreetByTime = (date = new Date()) => {
  const hour = date.getHours();
  if (hour < 6) {
    return "凌晨好";
  } else if (hour < 9) {
    return "早上好";
  } else if (hour < 12) {
    return "上午好";
  } else if (hour < 14) {
    return "中午好";
  } else if (hour < 17) {
    return "下午好";
  } else if (hour < 19) {
    return "傍晚好";
  } else if (hour < 22) {
    return "晚上好";
  } else {
    return "夜里好";
  }
};
// url param encode
export const qsEncode = (params = {}) => {
  let tmp = new URLSearchParams(params);
  return tmp.toString();
};
export const filterTree = (result, key) => {
  const arr = [];
  result.forEach(res => {
    if (res.value !== key) {
      const props = {
        value: res.value,
        label: res.label
      };
      //查询二级树
      if (res.children && res.children.length > 0) {
        const children = filterTree(res.children, key);
        if (children.length > 0) {
          props.children = children;
        }
      }
      arr.push(props);
    }
  });
  return arr;
};
export const tree = (result, key = [], layer) => {
  const arr = [];
  tree.layer = tree.layer ? tree.layer++ : 0;
  result.forEach(res => {
    let props = {};
    props.label = res.cnName || res.enName || "未命名";
    props.value = res.categoryId;
    props.key = [...key, props.value];
    if (res.children.length > 0 && tree.layer !== layer) {
      props.children = tree(res.children, props.key);
    }
    arr.push(props);
  });
  return arr;
};
export const queryIdsNames = (result, ids) => {
  const names = [];
  let i = 0;
  const querIdName = arr => {
    arr.find(res => {
      const abort = res.value === ids[i];
      if (abort) {
        names.push(res.label);
        i++;
        console.log(ids[i]);
        if (ids[i]) {
          querIdName(res.children);
        }
      }
      return abort;
    });
  };
  querIdName(result);
  return names;
};
// 千分数
export const splitK = num => {
  const [zhengshu, xiaoshu = ""] = String(num).split("."); //小数部分
  const tempArr = [];
  const revNumArr = zhengshu.split("").reverse(); //倒序
  for (let i in revNumArr) {
    // console.log(i);
    tempArr.push(revNumArr[i]);
    if ((i + 1) % 3 === 0 && i != revNumArr.length - 1) {
      tempArr.push(",");
    }
  }
  var zs = tempArr.reverse().join(""); //整数部分
  return xiaoshu ? zs + "." + xiaoshu : zs;
};
// 产生随机字符串
export const randomString = (len = 6) => {
  return [...Array(len)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join("");
};

export const logout = () => {
  Cookie.remove("Authorization");
  window.location.reload(true);
};
export const purifyValues = values => {
  Object.keys(values).forEach(
    key =>
      (values[key] === undefined ||
        values[key] === "" ||
        (Array.isArray(values[key]) && values[key].length === 0)) &&
      delete values[key]
  );
  return values;
};
