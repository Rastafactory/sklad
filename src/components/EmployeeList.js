import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import { SearchBar } from 'react-native-elements'

class EmployeeList extends Component {
    componentDidMount() {
      const { employeesFetch } = this.props
      employeesFetch()
    }
    
    render() {
      return (
        <View>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={value => console.log(value)}
            onClearText
            placeholder='search'
            lightTheme
            clearIcon
          />
          
          <FlatList
            data={this.props.employees}
            renderItem={employee => <ListItem employee={employee.item} />}
            keyExtractor={employee => employee.uid}
          />
        </View>
      )
    }
  }
   
  const mapStateToProps = (state) => {
    const employees = _.map(state.employees, (values, uid) => ({ ...values, uid }))
    return { employees }
  }
   
  export default connect(mapStateToProps, { employeesFetch })(EmployeeList)
