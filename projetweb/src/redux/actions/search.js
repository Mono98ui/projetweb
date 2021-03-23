/* eslint-disable handle-callback-err */
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import SearchPageImage from '../../components/searchPageImage';

export const fetchCpusAsync = (items) => {
  return {
    type: 'FETCHCPUS',
    value: items,
  };
};

export const fetchCpus = () => {
  return (dispatch) => {
    fetch('https://localhost:44384/api/Products')
      .then((response) => response.text())
      .then((json) => {
        const items = fetchSpecifiedParts(json, 'CPU');
        dispatch(fetchCpusAsync(items));
      })
      .catch((err) => { });
  };
};

export const fetchGpusAsync = (items) => {
  return {
    type: 'FETCHGPUS',
    value: items,
  };
};

export const fetchGpus = () => {
  return (dispatch) => {
    fetch('https://localhost:44384/api/Products')
      .then((response) => response.text())
      .then((json) => {
        const items = fetchSpecifiedParts(json, 'GPU');
        dispatch(fetchGpusAsync(items));
      })
      .catch((err) => { });
  };
};

export const fetchMobosAsync = (items) => {
  return {
    type: 'FETCHMOBOS',
    value: items,
  };
};

export const fetchMobos = () => {
  return (dispatch) => {
    fetch('https://localhost:44384/api/Products')
      .then((response) => response.text())
      .then((json) => {
        const items = fetchSpecifiedParts(json, 'MOBO');
        dispatch(fetchMobosAsync(items));
      })
      .catch((err) => { });
  };
};

export const fetchRamsAsync = (items) => {
  return {
    type: 'FETCHRAMS',
    value: items,
  };
};

export const fetchRams = () => {
  return (dispatch) => {
    fetch('https://localhost:44384/api/Products')
      .then((response) => response.text())
      .then((json) => {
        const items = fetchSpecifiedParts(json, 'RAM');
        dispatch(fetchRamsAsync(items));
      })
      .catch((err) => { });
  };
};

export const fetchStoragesAsync = (items) => {
  return {
    type: 'FETCHSTORAGES',
    value: items,
  };
};

export const fetchStorages = () => {
  return (dispatch) => {
    fetch('https://localhost:44384/api/Products')
      .then((response) => response.text())
      .then((json) => {
        const items = fetchSpecifiedParts(json, 'STORAGE');
        dispatch(fetchStoragesAsync(items));
      })
      .catch((err) => { });
  };
};

function fetchSpecifiedParts(json, partType) {
  const obj = JSON.parse(json);
  const items = [];

  for (let i = 0; i < obj.length; i++) {
    const element = obj[i];

    const descriptionObj = JSON.parse(element.Description);
    if (element.Type === partType) {
      const overallRating = getProductRating(element);
      const cheapestPrice = getProductCheapestPrice(element);

      const image = <SearchPageImage url={element.Image} />;
      const rating = (
        <StarRatingComponent name="rating" value={overallRating} />
      );

      switch (partType) {
        case 'CPU':
          items.push({
            id: element.ProductId,
            image: image,
            name: element.Model,
            coreCount: descriptionObj.NumberOfCores,
            coreClock: descriptionObj.CoreClock,
            rating: rating,
            price: cheapestPrice,
          });
          break;
        case 'GPU':
          items.push({
            id: element.ProductId,
            image: image,
            name: descriptionObj.Series,
            chipset: descriptionObj.Chipset,
            memory: descriptionObj.Memory,
            coreClock: descriptionObj.CoreClock,
            rating: rating,
            price: cheapestPrice,
          });
          break;
        case 'MOBO':
          items.push({
            id: element.ProductId,
            image: image,
            name: element.Model,
            socket: descriptionObj.Socket,
            formFactor: descriptionObj.FormFactor,
            memoryType: descriptionObj.MemoryType,
            rating: rating,
            price: cheapestPrice,
          });
          break;
        case 'RAM':
          items.push({
            id: element.ProductId,
            image: image,
            name: element.Model,
            speed: descriptionObj.Frequency,
            casLatency: descriptionObj.CASLatency,
            modules: descriptionObj.Modules,
            rating: rating,
            price: cheapestPrice,
          });
          break;
        case 'STORAGE':
          items.push({
            id: element.ProductId,
            image: image,
            name: element.Model,
            capacity: descriptionObj.Capacity,
            cache: descriptionObj.Cache,
            formFactor: descriptionObj.FormFactor,
            rating: rating,
            price: cheapestPrice,
          });
          break;
        default:
          break;
      }
    }
  }

  return items;
}

function getProductRating(product) {
  const reviews = product.Reviews;
  let finalRating = 0;
  if (reviews !== undefined) {
    reviews.map((d) => (finalRating += d.Rating));

    return finalRating / reviews.length;
  }

  return 0;
}

function getProductCheapestPrice(product) {
  const prices = product.Prices;
  let cheapestPrice = Number.MAX_SAFE_INTEGER;

  if (prices.length > 0) {
    for (let i = 0; i < prices.length; i++) {
      if (prices[i].Amount < cheapestPrice) {
        cheapestPrice = prices[i].Amount;
      }
    }

    return `${cheapestPrice} $`;
  }

  return '250 $';
}

// TODO: replace hardcoded localhost
