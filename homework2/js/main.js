class ProductList {
    #container;
    #goods;
    #productObjects;

    constructor(container = '.products') {
        this.#container = container;
        this.#goods = [];
        this.#productObjects = [];

        this.fetchGoodsData();
        this.render();
    }

    fetchGoodsData() {
        this.#goods = [
            {id: 1, title: 'Notebook', price: 1000},
            {id: 2, title: 'Mouse', price: 100},
            {id: 3, title: 'Keyboard', price: 250},
            {id: 4, title: 'Gamepad', price: 150},
        ];
    }

    render() {
        const catalogBlock = document.querySelector(this.#container);

        for (let product of this.#goods) {
            const productObject = new ProductItem(product);
            console.log(productObject)
            this.#productObjects.push(productObject);
            catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
}

// class ProductList {
//     constructor(container = '.products') {
//         this._container = container;
//         this._goods = [];
//         this._productObjects = [];
//
//         this._fetchGoodsData();
//         this._render();
//     }
//
//     _fetchGoodsData() {
//         this._goods = [
//             {id: 1, title: 'Notebook', price: 1000},
//             {id: 2, title: 'Mouse', price: 100},
//             {id: 3, title: 'Keyboard', price: 250},
//             {id: 4, title: 'Gamepad', price: 150},
//         ];
//     }
//
//     _render() {
//         const catalogBlock = document.querySelector(this._container);
//
//         for (let product of this._goods) {
//             const productObject = new ProductItem(product);
//             console.log(productObject)
//             this._productObjects.push(productObject);
//             catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
//         }
//     }
// }

class ProductItem {
    constructor(product, img='https://via.placeholder.com/200x150') {
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

// const products = [
//     {id: 1, title: 'Notebook', price: 1000},
//     {id: 2, title: 'Mouse', price: 100},
//     {id: 3, title: 'Keyboard', price: 250},
//     {id: 4, title: 'Gamepad', price: 150},
// ];
//
// const renderProduct = ({title, price}, img='https://via.placeholder.com/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//                <div class="desc">
//                    <h3>${title}</h3>
//                   <p>${price} \u20bd</p>
//                    <button class="buy-btn">Купить</button>
//               </div>
//            </div>`;
//
// const renderCatalog = (list) => {
//     // const productList = list.map(good => renderProduct(good.title, good.price)).join('');
//     // console.log(productList);
//     //
//     // document.querySelector('.products').innerHTML = productList;
//     const productsBlock = document.querySelector('.products');
//
//     list.forEach(good => {
//         productsBlock.insertAdjacentHTML('beforeend', renderProduct(good));
//     });
// };
//
// renderCatalog(products);

const catalog = new ProductList();
