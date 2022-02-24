Vue.component('productincart', {
    props: ['product', 'imgCart'],
    template: `<div>
              <div class="product-bio">
                  <img :src="imgCart" alt="Some image">
                  <div class="product-desc">
                      <p class="product-title">{{product.product_name}}</p>
                      <p class="product-quantity">Количество: {{product.quantity}}</p>
                      <p class="product-single-price">{{product.price}} за ед.</p>
                  </div>
              </div>
              <div class="right-block">
                  <p class="product-price">
                      {{ product.quantity * product.price }} ₽
                  </p>
                  <button class="del-btn" @click="$root.$refs.cart.deleteProduct(product)">
                      &times;
                  </button>
              </div>
          </div>`
})