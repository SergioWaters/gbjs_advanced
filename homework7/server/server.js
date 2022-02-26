const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use('/', express.static('./project'));

/**
 * метод реквестит содержимое файла catalog.json с сервера
 */
app.get('/api/catalog', (request, response) => {
  fs.readFile('./server/db/catalog.json', 'utf-8', (error, data) => {
    if (error) {
      response.send(JSON.stringify({ result: 0, text: error }));
    } else {
      response.send(data);
    }
  });
});

/**
 * метод реквестит содержимое файла cart.json с сервера
 */
app.get('/api/cart', (request, response) => {
  fs.readFile('./server/db/cart.json', 'utf-8', (error, data) => {
    if (error) {
      response.send(404, JSON.stringify({ result: 0, text: error }));
    } else {
      response.send(data);
    }
  });
});

/**
 * метод пушит объект в cart.json на сервере
 */
app.post('/api/cart', (request, response) => {
  fs.readFile('./server/db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      response.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      const cart = JSON.parse(data);
      cart.contents.push(request.body);
      fs.writeFile('./server/db/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          response.send('{"result": 0}');
        } else {
          response.send('{"result": 1}');
        }
      })
    }
  });
});

/**
 * метод проверяет есть ли объект в cart.json и если есть, то увеличивает его quantity
 */
app.put('/api/cart/:id', (request, response) => {
  fs.readFile('./server/db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      response.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      const cart = JSON.parse(data);
      const find = cart.contents.find(el => el.id_product === +request.params.id);
      find.quantity += request.body.quantity;
      fs.writeFile('./server/db/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          response.send('{"result": 0}');
        } else {
          response.send('{"result": 1}');
        }
      })
    }
  });
});

app.delete('/api/cart/:id', (request, response) => {
  fs.readFile('./server/db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      response.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      const cart = JSON.parse(data);
      const find = cart.contents.find(el => el.id_product === +request.params.id);
      cart.contents.splice(cart.contents.indexOf(find)) //.quantity += request.body.quantity;
      fs.writeFile('./server/db/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          response.send('{"result": 0}');
        } else {
          response.send('{"result": 1}');
        }
      })
    }
  });
});

/**
 * Запуск сервера
 * @type {string|number}
 * const port = process.env.PORT || 3000;
 * чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
*/
const port = 8080;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});