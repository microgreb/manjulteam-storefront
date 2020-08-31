<template>
    <main class="shop-page">
        <div class="space-55"></div>
        <div class="container">
            <product-list :title="titleData.title" :products="products"/>
        </div>
        <div class="space-377"></div>
    </main>
</template>

<script>
    import ProductList from '../components/products/ProductList';
    import Mixins from '@/mixins/main'
    import MixinProducts from '@/mixins/products'
    import ProductResource from "../api/resources/ProductResource";

    export default {
        name: "Home",
        components: {ProductList},
        mixins: [Mixins, MixinProducts],
        data: function () {
            return {
                products: [],
                titles: {
                    men: {title: 'Мужчины'},
                    women: {title: 'Женщины'},
                    featured: {title: 'Все Товары'},
                    all: {title: 'Все Товары'}
                }
            }
        },
        created: function () {
            this.fetchInitialData();
        },
        methods: {
            fetchInitialData: function () {
                this.fetchProducts();
            },
            fetchProducts: function () {
                ProductResource.getProductsByCategory(this.$route.params.name).then(res => {
                    this.products = res.data;
                })
            },
        },
        computed: {
            titleData: function () {
                return this.titles[this.$route.params.name];
            },
        }
    }
</script>

<style>

</style>
