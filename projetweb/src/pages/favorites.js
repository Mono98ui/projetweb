
/* eslint react/no-multi-comp : 0 */
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/favorites.css';
import { StyleButton } from './loginAndSignIn';
import { getUserId, setProductId } from '../utils/common';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const URL = 'https://localhost:44384/api/';

export class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      tabs: [],
      tabPanel: (<ProductList products={[]} />),
      prodList: [],
      activeList: '',
      listNames: [],
    };
  }

  componentDidMount() {
    this.fetchProductsData().then(data => {
      this.setState({ prodList: data });

      const favList = data.map(row => ({ list: row.ListName, row: row }));
      let favBuckets = new Set(favList.map(f => f.list));
      favBuckets = Array.from(favBuckets).sort();
      this.setState({ listNames: favBuckets });

      favBuckets.forEach(bucket => {
        this.setState(prevState => ({
          tabs: [
            ...prevState.tabs, <Tab label={bucket} key={prevState.tabs.length} />,
          ],
        }));
      });

      this.setState({ activeList: favBuckets[0] });

      this.setState({
        tabPanel: <ProductList products={data.filter(row => row.ListName === this.state.activeList)} />,
      });

      return data;
    });
  }

  fetchProductsData() {
    const query = `${URL}Favorites/${getUserId()}`;

    return fetch(query)
      .then(response => response.ok ? response : Promise.reject(response))
      .then(response => response.json());
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
      activeList: this.state.listNames[newValue],
    });

    this.setState({
      tabPanel: <ProductList products={this.state.prodList.filter(row => row.ListName === this.state.listNames[newValue])} />,
    });
  };

  render() {
    return (this.state.tabs.length > 0
      ? <div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            {this.state.tabs}
          </Tabs>
        </AppBar>
        {this.state.tabPanel}
      </div>
      : <h1 style={{ color: 'white', height: '77vh' }}>
        {getUserId() ? 'Nothing to show' : 'Please log in'}
      </h1>
    );
  }
}

function ProductList(props) {
  const list = props.products;

  return (
    <div className="favorites-div">
      <ProductCategory
        products={list.filter(row => row.Product.Type === 'CPU')}
        type='Processor'
      />
      <ProductCategory
        products={list.filter(row => row.Product.Type === 'GPU')}
        type='Graphics card'
      />
      <ProductCategory
        products={list.filter(row => row.Product.Type === 'MOBO')}
        type='Motherboard'
      />
      <ProductCategory
        products={list.filter(row => row.Product.Type === 'RAM')}
        type='Memory'
      />
      <ProductCategory
        products={list.filter(row => row.Product.Type === 'STORAGE')}
        type='Storage'
      />
    </div>);
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

export class ProductCategory extends React.Component {
  calcRating(reviews) {
    let totalRating = 0;
    reviews.forEach(review => {
      totalRating += review.Rating;
    });
    return totalRating / reviews.length;
  }

  getLowestPrice(prices) {
    const priceArray = prices.map(price => +price.Amount);
    return priceArray.length > 0 ? Math.min(...priceArray) : 1000;
  }

  handleRemoveProduct(productId, listName) {
    const query = `${URL}Favorites/${getUserId()}/${productId}/${listName}`;

    fetch(query, { method: 'DELETE' })
      .then(() => {
        window.location.reload(false);
      });
  }

  render() {
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);

    const components = [];

    this.props.products
      .forEach(row => {
        components.push(
          <Product
            listName={row.ListName}
            price={this.getLowestPrice(row.Product.Prices)} description={row.Product.Model}
            imgSrc={row.Product.Image}
            sellerLogoSrc="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flogok.org%2Fwp-content%2Fuploads%2F2015%2F01%2FAmazon-logo.png&f=1&nofb=1"
            productId={row.ProductId}
            stars={this.calcRating(row.Product.Reviews)}
            onRemoveProduct={this.handleRemoveProduct}
            key={row.ProductId}
          />);
      });
    return (
      <div className="favorites-productcategory-div">
        <div className="favorites-productcategory">
          <h3 className="favorites-productcategory-header">{this.props.type}</h3>
          {components.length > 0 &&
            (<div className="favorites-productcategory-table-container">
              <div className="favorites-productcategory-table-columns">
                <span />
                <span>Description</span>
                <span>Rating</span>
                <span>Price</span>
                <span className="favorites-seller-column">Seller</span>
                <span />
              </div>
              {components}
            </div>)
          }
        </div>
      </div>
    );
  }
}

ProductCategory.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
};

function RatingStar(props) {
  const starArray = [];
  for (let i = 0; i < 5; i++) {
    let starIconClassName = 'fa fa-star';
    if (i < props.fullstars) {
      starIconClassName += ' yellow';
    } else {
      starIconClassName += ' grey';
    }
    starArray.push(<i className={starIconClassName} />);
  }
  return starArray;
}

export function Product(props) {
  return (
    <div className="favorites-product favorites-product-body">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      <div className="favorites-product-image-div" /* improve this with cropping */>
        <img src={props.imgSrc} alt="Product-img" className="favorites-product-image" />
      </div>
      <div>
        <span>{props.description}</span>
      </div>
      <div className="star">
        <RatingStar fullstars={props.stars} />
      </div>
      <div>
        <span>{props.price} $</span>
      </div>
      <div className="favorites-seller-column">
        <img src={props.sellerLogoSrc} alt="vendor-img" className="favorites-product-logo" />
      </div>
      <div>
        <StyleButton
          onClick={() => {
            setProductId(props.productId);
            window.location.replace('/products');
          }}
        >
          See product
        </StyleButton>
        <StyleButton
          onClick={() => {
            props.onRemoveProduct(props.productId, props.listName);
          }} className="favorites-product-cross favorites-product-cross:hover"
        >
          Remove
        </StyleButton>
      </div>
    </div>);
}

Product.propTypes = {
  listName: PropTypes.string,
  stars: PropTypes.number,
  price: PropTypes.number,
  description: PropTypes.string,
  imgSrc: PropTypes.string,
  sellerLogoSrc: PropTypes.string,
  productId: PropTypes.number,
  onRemoveProduct: PropTypes.func,
};

Product.defaultProps = {
  stars: 5,
};

export default Favorites;
