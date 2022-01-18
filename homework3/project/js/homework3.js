'use strict';

// запрос к апи, написанный на промисах
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

//адрес апи
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


// получаем объект товара и делаем для него разметку
class Product {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
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
                  </div>`
  }

}

class Catalog {
  constructor(productsEl, url) {
    this.productsEl = productsEl;
    this.url = url;
    this.productsArr = [];
    this.productObjectArr = [];

    this.getProducts().then((data) => {
      this.productsArr = data;
      console.log(this.productsArr);
      this.render(data);
      // console.log(this.sum());
    });
  }

  getJson(url) {
    return fetch(`${API + url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error)
      })
  }

  getProducts() {
    return this.getJson(this.url);
  }

  render() {
    this.productsArr.forEach(item => {
      let el = document.querySelector(`${this.productsEl}`);
      let product = new Product(item);

      console.log(item)

      el.insertAdjacentHTML("afterbegin", product.getHTMLString())
    })
  }
}

let catalog = new Catalog('.products', '/catalogData.json');


class Cart {
  constructor(productsEl = '.cart') {
    this.productsEl = productsEl;

  }
}


