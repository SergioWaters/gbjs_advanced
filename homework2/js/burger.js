// *Некая сеть фастфуда предлагает несколько видов гамбургеров:
// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий).
// ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий).
// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).
// ### Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

class Hamburger {

  constructor(inputs, size, topping, price, kcal, html) {
    this.inputs = inputs;
    this.topping = topping;
    this.price = price;
    this.kcal = kcal;
    this.html = html;
    this.size = size;
  }

  getInputs() {
    this.inputs = document.querySelectorAll('input:checked');
  }
  getSize() {              // Узнать размер гамбургера 
    this.size = '';
    this.size = document.querySelector('.burger__size:checked').dataset.size
  }
  getToppings() {         // Получить список добавок 
    this.topping = [];
    this.inputs.forEach(input => {
      if (input.dataset.topping != undefined) {
        this.topping.push(input.dataset.topping);
      }
    });
  }
  calculatePrice() {       // Узнать цену 
    this.price = 0;
    this.inputs.forEach(input => {
      this.price += +input.dataset.price
    });
  }
  calculateCalories() {    // Узнать калорийность 
    this.kcal = 0;
    this.inputs.forEach(input => {
      this.kcal += +input.dataset.kcal
    });
  }
  generateResultHtml() {
    this.html
    this.html = `<ul class="burger__created"><li> ${this.size} burger</li> <li>with ${this.topping.join(', ')} </li>  <li>Price: ${this.price} </li> <li>Calories: ${this.kcal} </li></ul>`;
  }
  createNewBurger() {
    this.getInputs();
    this.calculateCalories();
    this.calculatePrice();
    this.getSize();
    this.getToppings();
    this.generateResultHtml();
  }

}

btnPriceKcal = document.querySelector('.burger__count');
burgerResult = document.querySelector('.burger__result');


btnPriceKcal.addEventListener('click', function () {
  const burger = new Hamburger;
  burger.createNewBurger();
  burgerResult.insertAdjacentHTML('afterbegin', burger.html)
})