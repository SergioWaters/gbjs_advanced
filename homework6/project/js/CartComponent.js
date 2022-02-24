Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            addProductToBasket: '/addToBasket.json',
            deleteProductFromBasket: '/deleteFromBasket.json',
            imgCart: 'https://via.placeholder.com/50x100',
            cartArr: [],
            isVisibleCart: false,
        }
    },
    methods: {
        deleteProduct(product) {
            this.$parent.getJson(`${API + this.deleteProductFromBasket}`)
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
        addProduct(product) {
            this.$parent.getJson(`${API + this.addProductToBasket}`)
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
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartArr.push(el);
                }
            });
    },
    template: `<div>                    
                    <button class="btn-cart" type="button" @click="isVisibleCart =! isVisibleCart">Корзина</button>
                    <div class="cart-block" v-show="isVisibleCart">
                    <p class="empty-msg" v-if="cartArr.length == 0">
                        Корзина пуста
                    </p>                
                        <productincart 
                        ref="productincart" 
                        class="cart-item" 
                        v-for="product of cartArr" 
                        :key="product.id_product"
                        :product="product" 
                        :imgCart="imgCart"
                        ></productincart>
                    </div>
                </div>`,
});

