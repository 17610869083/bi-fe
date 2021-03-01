import React from 'react';
import CityItem from './citychildren';
import { request } from '@/axios/tools';
import _ from 'lodash';
import '@/style/cityinfo.less';
class CheckboxList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      checkeds: {}
    };
  }

  async componentDidMount() {
    await this.getProvinceHttp();

  }

  getProvinceHttp = () => new Promise(resole => {
    console.log(resole);
    request({
        type:'get',
        url: 'region/tree',
        end: (status,response) => {
          this.setState({
            data : response
          });
        }
    });
  });

  // CheckItem事件
  handleItemChange(id, ckitem){
    const { checkeds } = this.state;
    checkeds[id] = ckitem;
    this.setState({
      checkeds
    }, () => {
      this.props.onChange(JSON.stringify(_.flattenDeep(Object.values(checkeds))));
    });
  }

  renderList(defaultCheck){
    return this.state.data.map((item,index) => {
      return <CityItem datasource={item} key={index} defaultCheck={defaultCheck} handleItemChange={this.handleItemChange.bind(this, item.id)} />;
    });
  }

  render(){
    let defaultCheck = this.props.value;
    console.log(defaultCheck);
    console.log(this.props.value);
    defaultCheck = defaultCheck ? JSON.parse(defaultCheck) : [];
    return(
      <div className="container">
        <div className="checkbox-list">
          {this.renderList(defaultCheck)}
        </div>
      </div>
    ); 
  }
}

export default CheckboxList;