const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgCart: 'https://via.placeholder.com/50x100',
    products: [],
    cartArr: [],
    filteredArr: [],
    searchLine: '',
    isVisibleCart: false,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      console.log(product.id_product);

      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let productId = product.id_product;
            let find = this.cartArr.find(product => product.id_product === productId);
            if (find) {
              find.quantity++;
            } else {
              let cartProduct = {
                id_product: product.id_product,
                price: product.price,
                product_name: product.product_name,
                quantity: 1
              };
              this.cartArr.push(cartProduct);
            }
          } else {
            alert('Error');
          }
        })
    },
    deleteProduct(product) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let productId = product.id_product;
            let find = this.cartArr.find(product => product.id_product === productId);
            let findIndex = this.cartArr.findIndex(product => product.id_product === productId);
            find.quantity--;
            if (+find.quantity <= 0) {
              this.cartArr.splice(findIndex, 1)
            }
          } else {
            alert('Error');
          }
        })
    },
    filter(searchLine) {
      const regexp = new RegExp(searchLine, 'i');
      this.filteredArr = this.products.filter(product => regexp.test(product.product_name));
    }
  },

  computed: {

  },

  beforeCreate() { },

  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filteredArr.push(el);
        }
      });
  },

  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
});
