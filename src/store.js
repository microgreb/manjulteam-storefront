import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        productsSizes: [],
        productMale: [],
        lookbooks: [],
        cart: {
            products: [],
            isOpenSidebar: false
        },
        currency: 'UAH'
    },
    mutations:{
        loadProducts(state, payload){
            state.products = payload;
        },
        loadProductsSizes(state, payload){
            state.productsSizes = payload;
        },
        changeSidebarStatus(state, payload){
            state.cart.isOpenSidebar = payload;
        },
        setCartProducts(state, payload){
            state.cart.products = payload;
        },
        loadLookBooks(state, payload){
            state.lookbooks = payload;
        },
        loadProductMale(state, payload){
            state.productMale = payload;
        }
    },
    getters:{
        cartTotal: state => {
            let total = 0;

            state.products.forEach(function (el) {
                state.cart.products.forEach((el2)=>{
                    if(el.id === el2.product_id) total += el.price;
                });
            });

            return total;
        },
        getProductsInCart: state => {
            let products = [];

            state.products.forEach(function (el) {
                state.cart.products.forEach((el2)=>{
                    if(el.id === el2.product_id) products.push(el);
                });
            });
            return products;

        }
    }
})