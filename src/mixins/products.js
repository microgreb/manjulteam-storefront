export default {
    data() {
        return {
            productSizes: [
                {id: 1, label: 'S'},
                {id: 2, label: 'M'},
                {id: 3, label: 'L'},
                {id: 4, label: 'XL'},
                {id: 5, label: '2XL'},
                {id: 6, label: '3XL'},
            ],
            productMale: [
                {id: 1, title: 'Women'},
                {id: 2, title: 'Men'},
                {id: 3, title: 'Children'}
            ],

        }
    },
    methods: {
        getProductSizeData(size_id) {
            let result = 'Size not found';

            // this.$store.state.productsSizes.forEach(function (el) {
            //     if (el.id === size_id) result = el;
            // });

            return result
        },
        getProductSizeDataInCart(product_id) {
            let that = this;
            let result = 'Size not found';

            // this.$store.state.cart.products.forEach(function (el) {
            //     if (el.product_id === product_id) result = that.getProductSizeData(el.size_id);
            // });

            return result;
        },
        isProductInCart: function (product_id) {
            let result = false;

            // this.$store.state.cart.products.forEach((el) => {
            //     if (el.product_id === product_id) result = true;
            // });

            return result;
        },
        removeProduct: function (product_id) {
            let products = [];

            // this.$store.state.cart.products.forEach((el) => {
            //     if (el.product_id !== product_id) products.push(el);
            // });

            this.$store.commit('setCartProducts', products);
        }
    }
}
