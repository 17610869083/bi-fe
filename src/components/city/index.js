import React from "react";
import { Select, Input, Row, Col } from "antd";
import { request } from "@/axios/tools";
import _ from "lodash";

const Option = Select.Option;
let cityKey = 1;
let townKey = 1;

const getProvinceHttp = () =>
  new Promise(resole => {
    request({
      type: "get",
      url: "region",
      end: (status, response) => {
        if (status === "success") {
          const province = response.map(res => {
            return (
              <Option key={res.id} value={res.id}>
                {res.name}
              </Option>
            );
          });
          resole(province);
        }
      }
    });
  });

const getCityHttp = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `region/city/${id}`,
      end: (status, response) => {
        if (status === "success") {
          const city = response.map(res => {
            return (
              <Option key={res.id} value={res.id}>
                {res.name}
              </Option>
            );
          });
          resole(city);
        }
      }
    });
  });

const getTownHttp = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `region/province/${id}`,
      end: (status, response) => {
        if (status === "success") {
          const town = response.map(res => {
            return (
              <Option key={res.id} value={res.id}>
                {res.name}
              </Option>
            );
          });
          resole(town);
        }
      }
    });
  });

class City extends React.Component {
  constructor(props) {
    super(props);
    const { townId, cityId, provinceId, address } = this.props.value || {};
    this.state = {
      town: [],
      city: [],
      province: [],
      townId,
      cityId,
      provinceId,
      address,
      showItem: this.props.showItem || [
        "townId",
        "cityId",
        "provinceId",
        "address"
      ]
    };
  }
  async componentDidMount() {
    const { provinceId, cityId } = this.state;
    let province = [],
      city = [],
      town = [];
    province = await getProvinceHttp();
    if (provinceId) {
      city = await getCityHttp(provinceId);
      if (cityId) {
        town = await getTownHttp(cityId);
      }
    }
    this.setState({ province, city, town });
  }
  //获取省/直辖市
  getProvince = async () => {
    const province = await getProvinceHttp();
    this.setState({ province });
    console.log(province);
  };
  getCity = id => {
    //存储选取省/直辖市
    //获取市/区
    this.setState({ provinceId: id }, async () => {
      if (this.state.showItem.indexOf("cityId") > -1) {
        const city = await getCityHttp(id);
        cityKey++;
        this.setState({ city, town: [], cityId: undefined }, () => {
          console.log(this.state);
        });
      }
    });
  };
  getTown = id => {
    this.setState({ cityId: id }, () => {
      //存储选取市/区
      //获取区/县
      this.setState({ cityId: id }, async () => {
        console.log(this.state.showItem.indexOf("townId"));
        if (this.state.showItem.indexOf("townId") > -1) {
          const town = await getTownHttp(id);
          this.setState({ town, townId: undefined });
        }
      });
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    const arr = ["town", "city", "province"];
    const ids = ["townId", "cityId", "provinceId", "address"];
    //更新id
    const currentIds = _.pick(this.state, ids);
    const nextIds = _.pick(nextState, ids);
    if (!_.isEqual(currentIds, nextIds)) {
      this.props.onChange && this.props.onChange(nextIds);
    }
    //更新数据
    const current = _.pick(this.state, arr);
    const next = _.pick(nextState, arr);
    const isRed = !_.isEqual(current, next);
    if (isRed) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const {
      town,
      city,
      province,
      townId,
      cityId,
      provinceId,
      address,
      showItem
    } = this.state;
    console.log(typeof provinceId);
    return (
      <Row gutter={10}>
        {showItem.indexOf("provinceId") > -1 ? (
          province.length > 0 ? (
            <Col span={8}>
              <Select
                placeholder="请选择"
                defaultValue={provinceId || undefined}
                onSelect={value => {
                  this.getCity(value);
                }}
              >
                {province}
              </Select>
            </Col>
          ) : null
        ) : null}
        {showItem.indexOf("cityId") > -1 ? (
          city.length > 0 ? (
            <Col span={8}>
              <Select
                placeholder="请选择"
                defaultValue={cityId || undefined}
                onSelect={value => {
                  this.getTown(value);
                }}
                key={cityKey}
              >
                {city}
              </Select>
            </Col>
          ) : null
        ) : null}
        {showItem.indexOf("townId") > -1 ? (
          town.length > 0 ? (
            <Col span={5}>
              <Select
                placeholder="请选择"
                defaultValue={townId || undefined}
                onSelect={value => {
                  this.setState({ townId: value });
                }}
                key={townKey}
              >
                {town}
              </Select>
            </Col>
          ) : null
        ) : null}
        {showItem.indexOf("address") > -1 ? (
          <Col span={9}>
            <Input
              key={`address`}
              defaultValue={address}
              onChange={e => {
                this.setState({ address: e.target.value }, () => {
                  this.props.onChange &&
                    this.props.onChange(
                      _.pick(this.state, [
                        "townId",
                        "cityId",
                        "provinceId",
                        "address"
                      ])
                    );
                });
              }}
            />
          </Col>
        ) : null}
      </Row>
    );
  }
}

export default City;
