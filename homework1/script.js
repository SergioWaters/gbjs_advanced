
const products = [
  { id: 1, title: 'Notebook', price: 1000 },
  { id: 2, title: 'Mouse', price: 100 },
  { id: 3, title: 'Keyboard', price: 250 },
  { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct = (id = 0, title = 'product', price = 0, imgUrl = 'loading.gif') => {
  return `<div class="product">
            <img width="30" src="${imgUrl}" alt="prod_photo" class="product__img">
            <span class="product__title">${title}
            </span>
            <span class="product__price">${price} рублей
            </span>
            <button class="product__btn btn${id}">
            Добавить
            </button>
          </div>`;
};

const renderCatalog = (list) => {

  // .map использует метод .toString, который разделяет элементы массива запятой. Для того чтобы убрать запятую, используем метод .join(), передавая в него пустую строку ''.
  const productList = list.map(good => renderProduct(good.id, good.title, good.price)).join('');

  document.querySelector('.cart__products').innerHTML = productList;

};

renderCatalog(products);


