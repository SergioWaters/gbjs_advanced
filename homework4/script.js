// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

function textCorrection() {
  // регулярное выражение заменяет все указанные символы, кроме тех, которые расположены внутри слова.
  let text = document.querySelector('.original-text').innerHTML.replace(/\B'/g, '"');
  document.querySelector('.reworked-text').insertAdjacentHTML("afterbegin", text);
}
textCorrection()



let formBtn = document.querySelector('.form__button');
let $name = document.querySelector('#name');
let $tel = document.querySelector('#tel');
let $email = document.querySelector('#email');

formBtn.addEventListener('click', inputValidator);

function inputValidator() {
  //E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
  let email = /^([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,}$/gi;
  // b. Телефон имеет вид +7(000)000-0000.
  let tel = /([+7]{1})[(]([\d]{3})[)]([\d]{3})-([\d]{4})/g;
  // a. Имя содержит только буквы.
  let name = /[а-яА-ЯёЁa-zA-Z]{3,}/g

  if (!name.test($name.value)) {
    showAlert($name.id)
  }
  if (!tel.test($tel.value)) {
    showAlert($tel.id)
  }
  if (!email.test($email.value)) {
    showAlert($email.id)
  }

}

function showAlert(id) {

  let input = document.querySelector(`#${id}`);
  let label = document.querySelector(`[for="${id}"]`);

  label.classList.remove('hidden');
  input.classList.add('error')

}



