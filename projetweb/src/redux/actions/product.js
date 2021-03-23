/* eslint-disable handle-callback-err */
import React from 'react';
import SearchPageImage from '../../components/searchPageImage';

export const fetchProductCpuAsync = (cpu) => {
  return {
    type: 'FETCHPRODUCTCPU',
    value: cpu,
  };
};
export const fetchProductGpuAsync = (gpu) => {
  return {
    type: 'FETCHPRODUCTGPU',
    value: gpu,
  };
};
export const fetchProductRamAsync = (ram) => {
  return {
    type: 'FETCHPRODUCTRAM',
    value: ram,
  };
};
export const fetchProductMoboAsync = (mobo) => {
  return {
    type: 'FETCHPRODUCTMOBO',
    value: mobo,
  };
};
export const fetchProductStorageAsync = (storage) => {
  return {
    type: 'FETCHPRODUCTSTORAGE',
    value: storage,
  };
};

export const fetchProductCpu = (id) => {
  return (dispatch) => {
    fetch(`https://localhost:44384/api/Products/${id}`)
      .then((response) => response.text())
      .then((json) => {
        var obj = JSON.parse(json);
        let item = {};
        switch (obj.Type) {
          case 'CPU':
            item = objectData(obj);
            dispatch(fetchProductCpuAsync(item));
            break;
          case 'GPU':
            item = objectData(obj);
            dispatch(fetchProductGpuAsync(item));
            break;
          case 'RAM':
            item = objectData(obj);
            dispatch(fetchProductRamAsync(item));
            break;
          case 'STORAGE':
            item = objectData(obj);
            dispatch(fetchProductStorageAsync(item));
            break;
          case 'MOBO':
            item = objectData(obj);
            dispatch(fetchProductMoboAsync(item));
            break;
          default:
        }
      })
      .catch((err) => {});
  };
};

function objectData(data) {
  let descriptionArray = {};
  descriptionArray = parseDescription(data);
  const object = {
    productId: data.ProductId,
    image: data.Image,
    manufacturer: data.Manufacturer,
    type: data.Type,
    model: data.Model,
    description: descriptionArray,
    favorites: data.Favorites,
    prices: data.Prices,
    reviews: data.Reviews,
  };
  return object;
}

function parseDescription(data) {
  const descriptionObj = JSON.parse(data.Description);

  let currentProduct = {};
  switch (data.Type) {
    case 'CPU':
      currentProduct = {
        NumberOfCores: Object.values(descriptionObj)[0],
        NumberOfThreads: Object.values(descriptionObj)[1],
        CoreClock: Object.values(descriptionObj)[2],
        BoostClock: Object.values(descriptionObj)[3],
        TDP: Object.values(descriptionObj)[4],
        Series: Object.values(descriptionObj)[5],
        Microarchitecture: Object.values(descriptionObj)[6],
        Lithography: Object.values(descriptionObj)[7],
        Socket: Object.values(descriptionObj)[8],
      };
      break;
    case 'GPU':
      currentProduct = {
        Provider: Object.values(descriptionObj)[0],
        Series: Object.values(descriptionObj)[1],
        Chipset: Object.values(descriptionObj)[2],
        CoreClock: Object.values(descriptionObj)[3],
        BoostClock: Object.values(descriptionObj)[4],
        Memory: Object.values(descriptionObj)[5],
        MemoryType: Object.values(descriptionObj)[6],
        FrameSync: Object.values(descriptionObj)[7],
        TDP: Object.values(descriptionObj)[8],
        RGB: Object.values(descriptionObj)[9],
      };
      break;
    case 'MOBO':
      currentProduct = {
        Socket: Object.values(descriptionObj)[0],
        Chipset: Object.values(descriptionObj)[1],
        FormFactor: Object.values(descriptionObj)[2],
        MemoryType: Object.values(descriptionObj)[3],
        WifiSupport: Object.values(descriptionObj)[4],
        RGB: Object.values(descriptionObj)[5],
      };
      break;
    case 'RAM':
      currentProduct = {
        Frequency: Object.values(descriptionObj)[0],
        CASLatency: Object.values(descriptionObj)[1],
        Modules: Object.values(descriptionObj)[2],
        RGB: Object.values(descriptionObj)[3],
      };
      break;
    case 'STORAGE':
      currentProduct = {
        Type: Object.values(descriptionObj)[0],
        Capacity: Object.values(descriptionObj)[1],
        Cache: Object.values(descriptionObj)[2],
        FormFactor: Object.values(descriptionObj)[3],
      };
      break;
    default:
      break;
  }
  return currentProduct;
}
