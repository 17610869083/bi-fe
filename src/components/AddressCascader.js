import React, { Component } from "react";
import { Cascader } from "antd";
import { address } from "@/utils";
function filter(inputValue, path) {
  return path.some(
    option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );
}
export default class AddressCascader extends Component {
  render() {
    const { province = [], city = [], town = [] } = address;
    console.log("addr", address);

    const { depth = 2 } = this.props;
    const options = province.map(p => {
      return {
        key: p.id,
        value: p.id,
        label: p.name,
        children:
          depth >= 2
            ? city.filter(c => c.parentId == p.id).map(c => {
                return {
                  key: c.id,
                  value: c.id,
                  label: c.name,
                  children:
                    depth >= 3
                      ? town.filter(t => t.parentId == c.id).map(t => {
                          return {
                            key: t.id,
                            value: t.id,
                            label: t.name
                          };
                        })
                      : null
                };
              })
            : null
      };
    });
    return (
      <Cascader
        placeholder={"请选择地址"}
        options={options}
        showSearch={{ filter }}
        {...this.props}
      />
    );
  }
}
