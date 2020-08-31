<template>
    <main class="home-page">
        <show-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
            <Slider/>
        </show-at>
        <div class="container">
            <product-list :title="this.title" :products="products"></product-list>
            <div class="space-233 compensated"></div>
            <show-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                <div class="button-container">
                    <router-link :to="{name: 'category', params: {name: this.category}}"
                                 class="button"
                                 vue-wow="{ 'animation-name': 'fadeInUp','animation-duration': '.8s'}">Просмотреть все товары
                    </router-link>
                </div>
            </show-at>
            <div class="space-233"></div>
        </div>
    </main>
</template>

<script>

    import Slider from '../components/slider/Slider';
    import ProductResource from "../api/resources/ProductResource";
    import ProductList from "../components/products/ProductList";
    import {showAt, hideAt} from 'vue-breakpoints';

    export default {
        name: "Home",
        components: {ProductList, Slider, hideAt, showAt},
        data: function () {
            return {
                products: [],
                category: '',
                title: ''
            }
        },
        computed: {},
        created: function () {
            if( window.innerWidth >= 768 ) {
                this.category = 'featured';
                this.title = 'Новые товары';
            }
            else {
                this.category = 'all';
                this.title = 'Все товары';
            }
            ProductResource.getProductsByCategory( this.category ).then(res => {
                this.products = res.data;
            })
        },
        methods: {

        },
    }
</script>

<style lang="scss">

    @import "../../src/assets/scss/variables";

    .home-page {
        .slider-container {
            transition: .5s;
            overflow: hidden;
            height: 100vh;
            &.hidden-slider {
                height: $vw_55;
            }
        }
        .button-container {
            display: flex;
            justify-content: center;
        }
        .button {
            display: inline-flex;
            height: $vw_55;
            margin: 0 auto;
            align-items: center;
            color: $c_white;
            background-color: $c_black;
            text-decoration: none;
            padding: 0 $vw_34;
            font-size: $vw_21;
            font-weight: bold;
            border-radius: $vw_34;
            text-transform: uppercase;
            transition: .4s;
            &:hover {
                transition: .4s;
                background-color: $c_grey;
            }
        }
    }
</style>
