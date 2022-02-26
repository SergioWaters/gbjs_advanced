Vue.component('cart', {
    data() {
        return {
            cartUrl: '/api/cart',
            imgCart: 'https://via.placeholder.com/50x100',
            cartArr: [],
            isVisibleCart: false,
        }
    },
    methods: {
        deleteProduct(product) {
            let productId = product.id_product;
            let find = this.cartArr.find(product => product.id_product === productId);
            let findIndex = this.cartArr.findIndex(product => product.id_product === productId);
            if (+find.quantity <= 0) {
                this.$parent.deleteJson(`${this.cartUrl}/${productId}`, product)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartArr.splice(findIndex, 1);
                        } else {
                            alert('Error');
                        }
                    })
            } else {
                let prodRemove = Object.assign({ quantity: -1 }, product);
                this.$parent.putJson(`${this.cartUrl}/${productId}`, prodRemove)
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity--;
                        } else {
                            alert('Error');
                        }
                    })
            }
        },
        addProduct(product) {
            this.$parent.getJson(this.cartUrl)
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
        removeProduct(product) {
            this.$parent.getJson(`${this.addProductToBasket}`)
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
                                quantity: -1
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
        this.$parent.getJson(`${this.cartUrl}`)
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

})
