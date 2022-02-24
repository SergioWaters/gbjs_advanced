Vue.component('search', {
    data() {
        return {
            searchLine: '',
            filteredArr: [],
        }
    },
    methods: {
        filter(searchLine) {
            const regexp = new RegExp(searchLine, 'i');
            this.filteredArr = this.$root.$refs.catalog.products.filter(product => regexp.test(product.product_name));
        }
    },
    template: `<form action="#" class="search-form">
                <input type="text" class="search-field" v-model="searchLine">
                <button class="btn-search" type="submit" @click.prevent="filter(searchLine)">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
})