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



/**
 * -- Базовый класс лист --
 * @container - элемент на струнице, в который будет происходить рендер
 * @list - словарь для классов 
 * @url - адрес фейкАПИ гикбрейнс
 * @goods [] - временный массив для хранения элемента, добавленного в корзину
 * @allProducts [] - массив для хранения объектов из фейкАПИ гикбрейнс
 * @filtered [] - массив для хранения отфильтрованных товаров
 * @_init () - универсальный метод, запускающийся при инициализации класса 
 */
class List {
  constructor(url, container, list = listContext) {
    this.container = container;
    this.list = list;
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this.filtered = [];
    this._init();
  }

  /**
   * получение данных с сервера
   * @param url 
   * @returns {Promise<any | never>}
   */
  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  /**
   * обработка полученных данных
   * @param data - данные, полученные с АПИ
   */
  handleData(data) {
    this.goods = data;
    this.render();
  }

  /**
   * подсчет стоимости всех товаров
   * @returns {*|number}
   */
  calcSum() {
    return this.allProducts.reduce((accum, item) => accum + item.price, 0);
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new this.list[this.constructor.name](product);

      // альтернативаня реализация без словаря
      // let productObj = null;
      // if (this.constructor.name === 'ProductsList') productObj = new ProductItem(product);
      // if (this.constructor.name === 'Cart') productObj = new CartItem(product);
      // if (!productObj) return;

      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }

  /**
   * метод поиска товаров
   * @param value - поисковый запрос
   */
  filter(value) {
    const regexp = new RegExp(value, 'i');
    this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    this.allProducts.forEach(el => {
      const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
      if (!this.filtered.includes(el)) {
        block.classList.add('invisible');
      } else {
        block.classList.remove('invisible');
      }
    })
  }
  _init() {
    return false
  }
}

class Item {
  constructor(el, img = 'https://via.placeholder.com/200x150') {
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }
  render() {
    return ``;
  }
}

/**
 * -- Класс каталог -- 
 * наследуется от общего класса 
 */
class ProductsList extends List {
  constructor(cart, container = '.products', url = "/catalogData.json") {
    super(url, container);
    this.cart = cart;
    this.getJson()
      .then(data => this.handleData(data));
  }

  _init() {
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')) {
        this.cart.addProduct(e.target);
      }
    });
    document.querySelector('.search-form').addEventListener('submit', e => {
      e.preventDefault();
      this.filter(document.querySelector('.search-field').value);
    })
  }
}

/**
 * -- Класс товара в каталоге -- 
 * наследуется от общего класса товара
 */
class ProductItem extends Item {
  render() {
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} ₽</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
  }
}

/**
 * -- Класс Корзина --
 * Создаем класс корзины наследуясь от общего класса лист
 * в фейкАПИ гикбрейнс в корзине уже два товара, поэтому при обновлении страницы, корзина не пустая 
 */
class Cart extends List {
  constructor(container = ".cart-block", url = "/getBasket.json") {
    super(url, container);
    this.getJson()
      .then(data => {
        this.handleData(data.contents);
      });
  }

  /**
   * добавление товара
   * @param element - 
   */
  addProduct(element) {
    this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if (find) {
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
            // При добавлении нового товара, нас интересует только он один.
            this.goods = [product];
            // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
            this.render();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * удаление товара
   * @param element
   */
  removeProduct(element) {
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          // если товара > 1, то уменьшаем количество на 1
          if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
            // удаляем
          } else {
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * Обновляем данные корзины
   * @param product - найденный в массиве корзины объект, с совпадающим ID
   * @private
   */
  _updateCart(product) {
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
  }

  _init() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(`${this.container}`).addEventListener('click', e => {

      if (e.target.classList.contains('del-btn')) {
        this.removeProduct(e.target);
      }

    })
  }
}

class CartItem extends Item {
  constructor(el, img = 'https://via.placeholder.com/50x100') {
    super(el, img);
    this.quantity = el.quantity;
  }
  render() {
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity * this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
  }
}

const listContext = {
  ProductsList: ProductItem,
  Cart: CartItem
};


let cart = new Cart();
let products = new ProductsList(cart);










//

// // получаем объект товара и делаем для него разметку
// class Product {
//   constructor(product, img = 'https://via.placeholder.com/200x150') {
//     this.title = product.product_name;
//     this.price = product.price;
//     this.id = product.id_product;
//     this.img = img;
//     this.quantity = product.quantity;
//   }
//   getHTMLStringCatalog() {
//     return `<div class="product-item" data-id="${this.id}">
//                       <img src="${this.img}" alt="Some img">
//                       <div class="desc">
//                           <h3>${this.title}</h3>
//                           <p>${this.price} \u20bd</p>
//                           <button class="buy-btn" data-id="${this.id}">Купить</button>
//                       </div>
//                   </div>`
//   }
//   getHTMLStringBasket() {
//     return `<div class="cart-item" data-id="${this.id}">
//               <div class="product-bio">
//                 <img src="${this.img}" alt="Some image">
//                 <div class="product-desc">
//                 <p class="product-title">${this.title}</p>
//                 <p class="product-quantity">Количество: ${this.quantity}</p>
//                 <p class="product-single-price">${this.price} за ед.</p>
//               </div>
//               </div>
//                 <div class="right-block">
//                 <p class="product-price">${this.quantity * this.price} ₽</p>
//                 <button class="del-btn" data-id="${this.id}">&times;</button>
//               </div>
//             </div>`
//   }
// }


// class Basket {
//   constructor(elemToInsert, urlGetFrom) {
//     this.elemToInsert = elemToInsert;
//     this.urlGetFrom = urlGetFrom;
//     this.productsArr = [];
//   }

//   render() {
//     this.productsArr.forEach(item => {

//       let product = new Product(item);
//       console.log(item);

//       let el = document.querySelector(`${this.elemToInsert}`);
//       el.innerHTML = '';
//       el.insertAdjacentHTML("afterbegin", product.getHTMLStringBasket())

//     })
//   }
// }


// //
// class Catalog {
//   constructor(elemToInsert, urlGetFrom) {
//     this.elemToInsert = elemToInsert;
//     this.urlGetFrom = urlGetFrom;
//     this.productsArr = [];
//     this.basket = new Basket;

//     this.clickHandler()
//     this.getProducts().then((data) => {
//       this.productsArr = data;
//       console.log(this.productsArr);
//       this.render(data);
//     });
//   }

//   // eventHandler(event) {
//   //   if (event.target.classList.contains('buy-btn')) {
//   //     this.addToBasket(event.target);
//   //   }
//   // }

//   clickHandler() {
//     document.querySelector(`${this.elemToInsert}`).addEventListener('click', (event) => {
//       if (event.target.classList.contains('buy-btn')) {
//         console.log(event.target)
//         this.addToBasket(event.target);
//       }
//     })
//   }

//   getJson(url) {
//     return fetch(`${API + url}`)
//       .then(result => result.json())
//       .catch(error => {
//         console.log(error)
//       })
//   }

//   getProducts() {
//     return this.getJson(this.urlGetFrom);
//   }

//   render() {
//     this.productsArr.forEach(item => {

//       let product = new Product(item);

//       let el = document.querySelector(`${this.elemToInsert}`);
//       el.insertAdjacentHTML("afterbegin", product.getHTMLStringCatalog())

//     })
//   }

//   addToBasket(element) {

//     this.getJson(`/addToBasket.json`)
//       .then(data => {
//         if (data.result === 1) {
//           let productId = +element.dataset['id'];
//           let find = this.productsArr.find(product => product.id_product === productId);
//           console.log(this.productsArr);
//           console.log(find)

//           if (find) {

//             find.quantity++;

//           } else {

//             let product = {
//               id_product: productId,
//               price: +element.dataset['price'],
//               product_name: element.dataset['name'],
//               quantity: 1
//             };

//             this.basket.productsArr.push(product);

//             console.log(this.basket.productsArr)

//             // // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
//             // // При добавлении нового товара, нас интересует только он один.
//             // this.goods = [product];
//             // // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
//             // this.basket.render();
//           }
//         } else {
//           alert('Error');
//         }

//       })
//   }
// }
// const catalog = new Catalog('.products', '/catalogData.json');





