
Vue.component('productofcatalog', {
    props: ['product', 'imgCatalog'],
    template: `<div class="product-item" >
                    <img :src="imgCatalog" alt="Some img">
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}}₽</p>
                        <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                    </div>
                </div>`
})