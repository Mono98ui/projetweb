/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-key */
/* eslint-disable react/forbid-component-props */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import '../styles/product.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import * as actionCreator from '../redux/actions/product';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  getUser,
  getProductId,
  getUserId,
  destroyProductId
} from '../utils/common';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: '95px',
    justify: 'center',
  },
  expansionRoot: {
    width: '100%',
  },
  expansionHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  expansionSecondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paperReview: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  ratings: {
    paddingTop: '5px',
    marginBottom: '5px',
  },
});

class Product extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.state = {
      expanded: false,
      title: '',
      description: '',
      rating: 0,
      userId: parseInt(getUserId()),
      favorite: false,
      favoriteList: '',
    };
    // eslint-disable-next-line react/prop-types
    this.props.fetchProductCpu(
      this.props.location.state
        ? this.props.location.state.productId
        : getProductId()
    );
  }

  componentWillUnmount() {
    destroyProductId();
  }

  handleChangePanelExpansion = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      return panel;
    } else {
      return false;
    }
  };

  handleSubmit(event) {
    event.preventDefault();

    fetch('https://localhost:44384/api/Reviews', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        Title: this.state.title,
        Rating: this.state.rating,
        Description: this.state.description,
        UserId: 4,
        ProductId: this.props.product.productId,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          const tempArray = this.props.product.reviews;
          tempArray.push({
            Title: this.state.title,
            Rating: this.state.rating,
            Description: this.state.description,
            UserId: 4,
            ProductId: this.props.product.productId,
          });

          this.props.product.reviews = tempArray;
          this.forceUpdate();
          console.log(result);
          this.setState({
            title: '',
            description: '',
            rating: 0,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleChange = (event) => {
    if (event.target.name === 'rating') {
      this.setState({
        [event.target.name]: parseInt(event.target.value),
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  renderDescription() {
    // eslint-disable-next-line react/prop-types
    const descriptions = this.props.product.description;

    if (descriptions !== undefined) {
      let newArray = [];
      newArray = Object.entries(descriptions);

      return newArray.map(([key, value]) => (
        <li key={value}>
          {key}: {value}
        </li>
      ));
    }
  }

  renderPrices() {
    let prices = [];
    prices = this.props.product.prices;
    if (prices !== undefined) {
      const array = prices.map((d) => d.Amount);
      return array[0] === undefined || array.length === 0 ? '250' : array[0];
    }
  }

  renderNewReview() {
    if (!isNaN(this.state.userId)) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="spacing-new-review">
              <TextField
                name="title"
                label="Title"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                value={this.state.title}
              />
            </div>
            <div>
              <Typography component="legend">Rate product</Typography>
              <Rating
                name="rating"
                defaultValue={0}
                precision={1}
                required
                onChange={this.handleChange}
                value={this.state.rating}
              />
            </div>
            <div className="spacing-new-review">
              <TextField
                name="description"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                onChange={this.handleChange}
                value={this.state.description}
              />
            </div>
            <div className="spacing-new-review">
              <Button variant="contained" type="submit" label="Submit">
                Post
              </Button>
            </div>
          </form>
        </div>
      );
    }
  }

  renderReviews() {
    const { classes } = this.props;
    const reviews = this.props.product.reviews;
    if (reviews !== undefined) {
      return reviews.map((r) => (
        <div className="review-box" key={r.Title}>
          <Box
            className={classes.ratings}
            component="fieldset"
            mb={3}
            borderColor="transparent"
          >
            <Typography className={classes.ratings} component="legend">
              {r.Title}
            </Typography>
            <Rating name="customer-rating" value={r.Rating} readOnly />
          </Box>
          <div className="customer-description">{r.Description}</div>
        </div>
      ));
    }
  }

  renderFavorite() {
    const favoritesArray = this.props.product.favorites;
    if (!isNaN(this.state.userId) && favoritesArray !== undefined) {
      const favoritesListNames = [];
      favoritesArray.map((x) => favoritesListNames.push(x.ListName));

      let uniqueListNames;
      fetch('https://localhost:44384/api/favorites/' + getUserId())
        .then((response) => response.text())
        .then((json) => {
          var allFavorites = JSON.parse(json);
          const currentFavoriteLists = [];
          allFavorites.map((x) => currentFavoriteLists.push(x.ListName));
          uniqueListNames = [...new Set(currentFavoriteLists)];
          console.log('uniqueListNames', uniqueListNames);
        });

      return (
        <div>
          <form onSubmit={this.handleFavorite}>
            <div className="secondary-title short-spacing">Favorite list</div>
            <input
              className="short-spacing"
              name="favoriteList"
              type="text"
              id="favoriteListNames"
              list="favoriteList"
              required
              onChange={this.handleChange}
            />
            <datalist id="favoriteList">
              {favoritesListNames.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </datalist>
            <div className="short-spacing">
              <Button
                name="favorite"
                type="submit"
                class="btn btn-primary"
                value="Submit"
              >
                Add to favorites
              </Button>
            </div>
          </form>
        </div>
      );
    }
  }

  handleFavorite(e) {
    e.preventDefault();
    this.setState((state) => ({
      favorite: !this.state.favorite,
    }));

    const favoritesArray = this.props.product.favorites;

    let alreadyFavorited = false;

    if (favoritesArray !== undefined) {
      alreadyFavorited = Boolean(
        favoritesArray.find(
          (x) =>
            x.UserId === this.state.userId &&
            x.ListName.toLowerCase() === this.state.favoriteList.toLowerCase()
        )
      );
    }
    if (alreadyFavorited) {
      alert('Product is already in that list!');
    } else {
      fetch('https://localhost:44384/api/Favorites', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          ListName: this.state.favoriteList,
          UserId: this.state.userId,
          ProductId: this.props.product.productId,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
      alert('Product added!');
    }
  }

  renderRatings() {
    const reviews = this.props.product.reviews;
    let finalRating = 0;
    if (reviews !== undefined) {
      // TODO: CAN USE ANOTHER TYPE OF FUNCTION INSTEAD OF MAP LIKE ACCUMULATE IN .NET
      reviews.map((d) => (finalRating += d.Rating));

      finalRating /= reviews.length;
    }
    return (
      <Box
        className={this.props.ratings}
        component="fieldset"
        mb={3}
        borderColor="transparent"
      >
        <Typography className={this.props.ratings} component="legend">
          Product rating
        </Typography>
        <Rating name="read-only" value={finalRating} readOnly />
      </Box>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4} justify="center">
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <img
                className="main-img"
                src={this.props.product.image}
                alt="product"
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <div className="product-title">
                {this.props.product.manufacturer} {this.props.product.model}
              </div>
              {this.renderRatings()}
              <div className="secondary-title">Price</div>
              <div>
                <span>{this.renderPrices()}$ CAD</span>
                {this.renderFavorite()}
              </div>
              <div className="secondary-title">Description</div>
              <ul>{this.renderDescription()}</ul>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          justify="center"
          className="grid-expansion-panel"
        >
          <Grid className="grid-expansion-panel">
            <div className={classes.expansionRoot}>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.expansionHeading}>
                    Reviews
                  </Typography>
                  <Typography className={classes.expansionSecondaryHeading}>
                    Expand to view reviews
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className="review-container">
                    <div className="existing-review-container">
                      {this.renderReviews()}
                    </div>
                    <div className="post-new-review-container">
                      {this.renderNewReview()}
                    </div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ product: state.product });

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductCpu: (id) => dispatch(actionCreator.fetchProductCpu(id)),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Product);
