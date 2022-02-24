Vue.component('catalog', {
  data() {
    return {
      catalogUrl: '/catalogData.json',
      addProductToBasket: '/addToBasket.json',
      imgCatalog: 'https://via.placeholder.com/200x150',
      products: [],
    }
  },
  mounted() {
    this.$parent.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.$root.$refs.search.filteredArr.push(el);
        }
      });
  },
  template: `<div class="products">
              <p class="empty-msg" v-if="products.length == 0 || $root.$refs.search.filteredArr == 0">
              Нет данных
              </p>
              <productofcatalog 
              ref="productofcatalog"
              v-for="product of $root.$refs.search.filteredArr" 
              :key="product.id_product" 
              :product="product"
              :imgCatalog="imgCatalog"
              >
              </productofcatalog>
              </div>`,
});
            // v-if="$root.$refs.search.filteredArr.includes(product)"


