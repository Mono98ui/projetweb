export default class Columns {
  static cpu = [
    { title: 'Id', field: 'id' },
    { title: '', field: 'image' },
    { title: 'Name', field: 'name' },
    { title: 'Core Count', field: 'coreCount' },
    { title: 'Core Clock', field: 'coreClock' },
    { title: 'Rating', field: 'rating' },
    { title: 'Price', field: 'price' },
    { title: '', field: 'add' },
  ];

  static gpu = [
    { title: 'Id', field: 'id' },
    { title: '', field: 'image' },
    { title: 'Name', field: 'name' },
    { title: 'Chipset', field: 'chipset' },
    { title: 'Memory', field: 'memory' },
    { title: 'Core Clock', field: 'coreClock' },
    { title: 'Rating', field: 'rating' },
    { title: 'Price', field: 'price' },
    { title: '', field: 'add' },
  ];

  static mobo = [
    { title: 'Id', field: 'id' },
    { title: '', field: 'image' },
    { title: 'Name', field: 'name' },
    { title: 'Socket', field: 'socket' },
    { title: 'Form Factor', field: 'formFactor' },
    { title: 'Memory Type', field: 'memoryType' },
    { title: 'Rating', field: 'rating' },
    { title: 'Price', field: 'price' },
    { title: '', field: 'add' },
  ];

  static ram = [
    { title: 'Id', field: 'id' },
    { title: '', field: 'image' },
    { title: 'Name', field: 'name' },
    { title: 'Speed (MHz)', field: 'speed' },
    { title: 'CASLatency', field: 'casLatency' },
    { title: 'Modules', field: 'modules' },
    { title: 'Rating', field: 'rating' },
    { title: 'Price', field: 'price' },
    { title: '', field: 'add' },
  ];

  static storage = [
    { title: 'Id', field: 'id' },
    { title: '', field: 'image' },
    { title: 'Name', field: 'name' },
    { title: 'Capacity', field: 'capacity' },
    { title: 'Cache', field: 'cache' },
    { title: 'Form Factor', field: 'formFactor' },
    { title: 'Rating', field: 'rating' },
    { title: 'Price', field: 'price' },
    { title: '', field: 'add' },
  ]
}
