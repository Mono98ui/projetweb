/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import ProductTable from '../components/productTable';
import Columns from '../searchTableColumns';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as actionCreator from '../redux/actions/search';
import Product from '../pages/product';
import { getProductId } from '../utils/common';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
    };
  }

  componentDidMount() {
    this.props.fetchCpus();
  }

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleChangeIndex = index => {
    this.setState({ tabValue: index });
  };

  render() {
    return (
      <div>
        <Router>
          {/* first page is cpu or redirects to product if there is a product id */}
          <Redirect to={getProductId() ? '/product' : '/cpu'} />
          <AppBar position='static' color='default'>
            <Tabs
              variant='fullWidth'
              value={this.state.tabValue}
              onChange={this.handleChange}
              indicatorColor='primary'
            >
              <Tab
                label='CPUs'
                component={Link}
                to='/cpu'
                onClick={this.props.fetchCpus}
              />
              <Tab
                label='GPUs'
                component={Link}
                to='/gpu'
                onClick={this.props.fetchGpus}
              />
              <Tab
                label='Motherboards'
                component={Link}
                to='/mobo'
                onClick={this.props.fetchMobos}
              />
              <Tab
                label='RAMs'
                component={Link}
                to='/ram'
                onClick={this.props.fetchRams}
              />
              <Tab
                label='Storages'
                component={Link}
                to='/storage'
                onClick={this.props.fetchStorages}
              />
            </Tabs>
          </AppBar>

          <Route path='/cpu'>
            <ProductTable
              title='Central Processing Units'
              columns={Columns.cpu}
              products={this.props.products}
              onRowClick={this.props.onRowClick}
            />
          </Route>
          <Route path='/gpu'>
            <ProductTable
              title='Graphics Cards'
              columns={Columns.gpu}
              products={this.props.products}
            />
          </Route>
          <Route path='/mobo'>
            <ProductTable
              title='Motherboards'
              columns={Columns.mobo}
              products={this.props.products}
            />
          </Route>
          <Route path='/ram'>
            <ProductTable
              title='Rams'
              columns={Columns.ram}
              products={this.props.products}
            />
          </Route>
          <Route path='/storage'>
            <ProductTable
              title='Storages'
              columns={Columns.storage}
              products={this.props.products}
            />
          </Route>
          <Route
            path={'/product'}
            component={Product}
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.search,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCpus: () => dispatch(actionCreator.fetchCpus()),
    fetchGpus: () => dispatch(actionCreator.fetchGpus()),
    fetchMobos: () => dispatch(actionCreator.fetchMobos()),
    fetchRams: () => dispatch(actionCreator.fetchRams()),
    fetchStorages: () => dispatch(actionCreator.fetchStorages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
