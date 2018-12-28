import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import ProductScanRNCamera from './components/ProductScanRNCamera';
import ProductDetail from './components/ProductDetail';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" initial />
        </Scene>
        <Scene key="main">
          <Scene
          rightTitle="Add"
          leftTitle="Scan"
          onLeft={() => Actions.ProductScanRNCamera()}
          onRight={() => Actions.employeeCreate()}
          key="employeeList"
          component={EmployeeList}
          title="Products"
          initial
          />
          <Scene
          key="ProductScanRNCamera"
          component={ProductScanRNCamera}
          title="Scanner"
          />
          <Scene
          key="employeeCreate"
          component={EmployeeCreate}
          title="Add Product"
          />
          <Scene
          key="employeeEdit"
          component={EmployeeEdit}
          title="Edit Product"
          />
          <Scene
          key="productDetail"
          component={ProductDetail}
          title="Product Detail"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
