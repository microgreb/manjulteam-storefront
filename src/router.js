import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Shop from './views/Shop'
import LookBook from './views/LookBook'
import LookBookSingle from './views/LookBookSingle'
import Contact from './views/Contact';
import Cart from './views/Cart';
import Product from './views/Product';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', component: Home, name: 'home'},
        { path: '/product/:url', component: Product, name: 'product' },
        { path: '/shop/:name', component: Shop, name: 'category' },
        { path: '/look-book/', component: LookBook, name: 'lookBook' },
        { path: '/look-book/:url', component: LookBookSingle, name: 'lookBookSingle' },
        { path: '/contact', component: Contact, name: 'contact' },
        { path: '/cart', component: Cart, name: 'cart' },

    ],
    mode: 'history',
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})
