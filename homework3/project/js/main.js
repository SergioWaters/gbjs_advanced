const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

// перевести на Promise НЕ ИСПОЛЬЗОВАТЬ fetch!!!
let getRequest = (url) => {

  return new Promise((resolve, reject) => {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error!');
        } else {
          resolve(xhr.responseText);
        }
      }
    }
    xhr.send();
  })
};




class ProductList {
  constructor(cart, container = '.products') {
    this.cart = cart;
    this._container = container;
    this._goods = [];
    this._productObjects = [];
    this.getProducts().then((data) => {
      this._goods = data;
      this._render();
      console.log(this.sum());
    });

    // this._fetchGoodsData();
  }

  addToCart(id) {
    // some code get good by id

    // this.cart.add(goodData);
  }

  // _fetchGoodsData() {
  //   getRequest(`${API}/catalogData.json`, (response) => {
  //     console.log(response);
  //     this._goods = JSON.parse(response);
  //     console.log(this._goods);
  //     this._render();
  //   });
  // }

  async getProducts() {
    try {
      let response = await fetch(`${API}/catalogData.json`);
      return await response.json();
    } catch (err) {
      return console.log(err);
    }
  }

  sum() {
    return this._productObjects.reduce((sum, { price }) => sum + price, 0);
  }

  _render() {
    const catalogBlock = document.querySelector(this._container);

    for (let product of this._goods) {
      const productObject = new ProductItem(product);
      console.log(productObject)
      this._productObjects.push(productObject);
      catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn">Купить</button>
                      </div>
                  </div>`;
  }
}

const cart = new Cart();
const catalog = new ProductList(cart);
