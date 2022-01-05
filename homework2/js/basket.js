
class ProductInTheBasket {

  constructor(id, title, description, price, image, count) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = image;
    this.count = count; //количество товара
  }

  addCount() { } //меняет количество товара 
  getProductPrice() { } //пересчитывет стоимость в зависимости от количества
  createProductHTML() { } //создает разметку карточки товара

}

class Basket {

  basketList = [];

  constructor(totalPrice, totalCount) {
    this.totalPrice = totalPrice;
    this.totalCount = totalCount;
  }

  createBasketHTML() { } //отрисовывает добавленные в корзину товары
  addCoupon() { } //применяет купоны или промокоды
  chooseDeliveryType() { } //выбрать метод доставки
  choosePaymentType() { } //выбрать тип оплаты
  checkout() { } //оплатить весь список товаров в корзине
  deleteProductFromBasket() { } //удаляет товар из корзины
  getTotalCount() { } //считает общее количество товаров в корзине

  getTotalPrice() { //рассчитывает общую стоимость всех товаров в корзине

    for (product in basketList) {
      totalPrice += product.price
    }

  }

}