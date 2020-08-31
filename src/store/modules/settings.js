export default {
    state: {
        loading: 0,
        products: [],
        productsSizes: [],
        productMale: [],
        cart: {
            products: [],
            isOpenSidebar: false
        },
        currency: 'UAH'
    },
    mutations: {
        loadProducts(state, payload){
            state.products = payload;
        },
        loadProductsSizes(state, payload) {
            state.productsSizes = payload;
        },
        changeSidebarStatus(state, payload) {
            state.cart.isOpenSidebar = payload;
        },
        setCartProducts(state, payload) {
            state.cart.products = payload;
        },
        loadLookBooks(state, payload) {
            state.lookbooks = payload;
        },
        loadProductMale(state, payload) {
            state.productMale = payload;
        },
        startGlobalLoading(state) {
            ++state.loading;
        },
        stopGlobalLoading(state) {
            --state.loading;
        }
    },
    getters: {
        getProductsInCart: state => {
            let products = [];

            // state.products.forEach(function (el) {
            //     state.cart.products.forEach((el2) => {
            //         if (el.id === el2.product_id) products.push(el);
            //     });
            // });
            return products;

        },
    },
    actions: {
        startGlobalLoading(context) {
            context.commit('startGlobalLoading')
        },
        stopGlobalLoading(context) {
            context.commit('stopGlobalLoading')
        },
    }
}
