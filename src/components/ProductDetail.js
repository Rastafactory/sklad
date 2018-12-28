import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input } from './common';
import { View, Image, TextArea } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { employeeUpdate } from '../actions'

class ProductDetail extends Component {
  state = { showModal: false };

  render() {
    return (
      <Card>
        <View>
          <CardSection>
            <Input
              label="Name"
              multiline={true}
              placeholder="Jane"
              defaultValue={this.props.productDetail[0].name}
              onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
            />
          </CardSection>

          <CardSection>

          <Image
            style={styles.imageStyle}
            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
          />
          </CardSection>

          <CardSection>
            <Input
              label="Barcode"
              multiline={true}
              placeholder="Jane"
              value={this.props.productDetail[0].barcode}
              onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
            />
          </CardSection>

          <TextArea
          placeholder="Type product description"
          value={this.props.description}
          onChangeText={value => this.props.employeeUpdate({ prop: 'description', value })}
          editable="false"
        />

          <CardSection style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <NumericInput 
            onChange={value => this.props.employeeUpdate({ prop: 'stock', value })}
            initValue={this.props.stock}
            minValue={0}
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={1}
            rounded
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#87bdd8' 
            leftButtonBackgroundColor='#f7cac9'
          />
        </CardSection>
        </View>
      </Card>
    );
  }
}

const styles = {
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

const mapStateToProps = (state) => {

  const productDetail = _.map(state.productDetail, (val, uid) => {
    return { ...val, uid }; //End result looks like {id: afsjj4jb324b12j, name: 'Rasto', shift 'Monday'}
  });
  console.log('toto je productDetail' + JSON.stringify(productDetail, null, 2));
  return { productDetail };
};

export default connect(mapStateToProps)(ProductDetail);
