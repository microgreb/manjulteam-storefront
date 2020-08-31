<template>
    <main class="single-product">
        <div class="space-55"></div>
        <div class="single-product-container">

            <!-- Desktop -->
            <show-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">

                <div class="single-product-gallery"
                     v-bind:class="{'open-gallery': isOpenGallery}">
                    <div class="gallery-container clearfix" v-on:click="closeGallery()">
                        <div class="close-gallery" @click="isOpenGallery = false">
                            <span></span>
                            <span></span>
                        </div>
                        <div class="container">
                            <div class="gallery-single-img img-half">
                                <img :src="product.main_image.url" :alt="product.name" @click="openGallery()" v-img-lazy>
                            </div>

                            <div class="gallery-single-img img-half">
                                <img :src="product.hover_image.url" :alt="product.name" @click="openGallery()" v-img-lazy>
                            </div>

                            <div class="gallery-single-img" v-for="(image, index) in product.additional_images" :key="index"
                                 :class="image.class">
                                <img :src="image.url" :alt="product.name" @click="openGallery()">
                            </div>
                        </div>
                    </div>
                </div>

            </show-at>

            <!-- Mobile -->
            <hide-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                <carousel :perPageCustom="[[200, 1], [1024, 1]]">
                    <slide>
                        <div class="slide">
                            <img :src="product.main_image.url_medium" :alt="product.name" class="carousel-image">
                        </div>
                    </slide>
                    <slide>
                        <div class="slide">
                            <img :src="product.hover_image.url_medium" :alt="product.name" class="carousel-image">
                        </div>
                    </slide>
                    <slide v-for="(image, index) in product.additional_images" :key="index">
                        <div class="slide">
                            <img :src="image.url_medium" :alt="product.name" class="carousel-image">
                        </div>
                    </slide>

                </carousel>
            </hide-at>

            <div class="single-product-data">
                <div class="container">
                    <div class="space-55"></div>
                    <div class="sp-category">{{product.category_name}}</div>
                    <div class="sp-title">
                        {{product.code}} <br/>
                        {{product.name}}
                    </div>
                    <div class="sp-price-container">

                        <!-- Price -->
                        <div class="sp-price-data">{{product.price}} UAH</div>

                        <!-- Mobile -->
                        <hide-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                            <select v-model="selectedSize">
                                <option selected="selected" disabled="disabled">Выбери размер</option>
                                <option v-for="size in sizes"
                                        :key="size.id"
                                        v-if="!(!size.specific_product_variation || size.specific_product_variation.quantity <= 0)">
                                    {{size.name}}
                                </option>
                            </select>
                        </hide-at>

                        <div class="sp-price-button" :class="{'sp-price-active': selectedSize !== 'Выбери размер'}">
                            <button v-on:click="addProductToCart()">Купить</button>
                        </div>
                    </div>
                    <div class="sp-sizes" :class="{'highlight' : !isSizeValid}">
                        <div class="sp-size-title" v-if="product.variations.length">
                            Выбери размер
                        </div>
                        <div class="sp-size-title pull-right" v-if="product.variations.length">
                            Таблица размеров
                        </div>
                        <div class="sp-size-title" v-if="!product.variations.length">
                            Нет в наличии
                        </div>

                        <!-- Desktop -->
                        <show-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                            <div class="sp-size-data">
                                <div class="sp-size-data-single"
                                     v-for="size in sizes"
                                     :key="size.id"
                                     :class="{'disabled': (!size.specific_product_variation || size.specific_product_variation.quantity <= 0)}">

                                    <label :class="{ active: selectedVariation.id === size.id }"
                                           @click="size.specific_product_variation ? [isSizeValid = true, selectedVariation = size] : null">
                                        {{size.name}}
                                    </label>
                                </div>
                            </div>
                        </show-at>
                    </div>
                    <div class="sp-description">
                        <div class="sp-description-data" v-html="product.description">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-34 border-bottom"></div>
        <transition name="component-fade" mode="out-in">
            <div class="more-products" v-show="otherProducts.length">
                <div class="container">
                    <product-list title="Другие товары" :products="otherProducts"></product-list>
                </div>
            </div>
        </transition>
        <div class="space-377"></div>
    </main>
</template>

<script>

    import ProductList from "../components/products/ProductList";
    import ProductResource from "../api/resources/ProductResource";
    import { Notification } from 'element-ui';
    import { Carousel, Slide } from 'vue-carousel';
    import {showAt, hideAt} from 'vue-breakpoints';

    export default {
        name: "Product",
        components: {ProductList, Notification, Carousel, Slide, showAt, hideAt },
        data() {
            return {
                picked: '',
                isOpenGallery: false,
                otherProducts: [],
                selectedVariation: {},
                selectedSize: "Выбери размер",
                product: {
                    variations: [],
                    category_name: '',
                    main_image: {
                      url: {},
                      url_medium: {}
                    },
                    hover_image: {url: {}},
                    additional_images: [],
                },
                isSizeValid: true,
                sizes: [],
            }
        },
        created() {
            this.fetchInitialData();

            // this.picked = this.pickedSelected();
        },
        mounted() {
            let productInfoElements = document.querySelectorAll('.single-product .single-product-data .container > *');
            for (var i = 0; i < productInfoElements.length; i++) {
                productInfoElements[i].style.opacity = '0';
                productInfoElements[i].style.transition = 'opacity 0.7s linear';
            }
        },
        updated() {
            let productInfoElements = document.querySelectorAll('.single-product .single-product-data .container > *');
            for (var i = 0; i < productInfoElements.length; i++) {
                setTimeout(function () {
                    this.style.opacity = '1';
                }.bind(productInfoElements[i]), (100 * i) / 2)
            }
        },
        methods: {
            fetchInitialData: function () {
                this.fetchProduct();
                //this.fetchProducts();
                this.fetchProductSizes();
            },
            fetchProduct: function () {
                ProductResource.getProduct(this.$route.params.url).then(res => {
                    this.product = res.data;
                    this.fetchProducts();
                })
            },
            fetchProducts: function () {
                ProductResource.getProductsByCategory(this.product.category_name).then(res => {
                    if (this.product.id) {
                        this.otherProducts = [];
                        for (var i in res.data) {
                            var product = res.data[i];
                            if (product.id !== this.product.id) {
                                this.otherProducts.push(product);
                            }
                        }
                    } else {
                        this.otherProducts = res.data;
                    }
                })
            },
            fetchProductSizes: function () {
                ProductResource.getProductSizes(this.$route.params.url).then(res => {
                    this.sizes = res.data;
                })
            },

            addProductToCart() {
                if (this.selectedVariation.id || this.selectedSize !== "Выбери размер" ) {

                    let productVariation = '';

                    /* If size was choosed on desktop */
                    if( this.selectedVariation.id ) {
                      productVariation = this.selectedVariation.specific_product_variation;
                      console.log( productVariation );
                    }

                    /* If size was choosed on mobile */
                    else {
                      this.sizes.forEach( ( size ) => {
                        if( size.name === this.selectedSize ) {
                          productVariation = size.specific_product_variation;
                          console.log( productVariation );
                        }
                      });
                    }


                    if (0 === this.$store.getters.cart.filter(entry => entry.variation.id === productVariation.id).length) {
                        this.$store.commit('addVariationToCart', {
                            product: this.product,
                            variation: productVariation,
                            quantity: 1,
                        });
                        this.$notify({
                            message: 'Товар добавлен в корзину',
                            type: 'success'
                        });
                    } else {
                        this.$notify({
                            message: 'Товар уже в корзине',
                            type: 'info'
                        });
                    }
                }
                else {
                    this.isSizeValid = false;
                    this.$notify({
                        message: 'Необходимо выбрать размер',
                        type: 'error'
                    });
                }
            },
            openGallery() {
                if (!this.isOpenGallery) {
                    setTimeout(() => {
                        this.isOpenGallery = true
                        document.body.classList.add('disable-scroll');
                    }, 50)
                }
            },
            closeGallery() {
                if (this.isOpenGallery) {
                    this.isOpenGallery = false

                }
                document.body.classList.remove('disable-scroll');
            },
        },

    }
</script>

<style lang="scss">

    @import "../../src/assets/scss/variables";

    .pull-right {
        float: right;
        display: inline-block;
    }

    button {
        text-transform: uppercase;
    }

    /* Desktop + mobile */
    .single-product {
        .close-gallery {
            position: fixed;
            right: $vw_34;
            top: $vw_34;
            width: $vw_26;
            height: $vw_26;
            cursor: pointer;
            display: none;
            span {
                width: 100%;
                height: $vw_2;
                position: absolute;
                top: calc(50% - #{$vw_1});
                background-color: $c_black;
                transition: .3s;
                &:first-child {
                    transform: rotate(45deg);
                }
                &:last-child {
                    transform: rotate(-45deg);
                }
            }
            &:hover span {
                transition: .3s;
                background-color: $c_grey;
            }
        }
        .single-product-container {
            display: flex;
            .single-product-gallery {
                &.open-gallery {
                    .close-gallery {
                        display: block;
                    }
                    .container{
                        padding: $vw_144 $vw_288;
                        display: inline-block;
                    }
                    .gallery-container {
                        position: fixed;
                        overflow-y: scroll;
                        top: 0;
                        height: 100%;
                        right: 0;
                        left: 0;
                        background: $c_white;
                        z-index: 500;
                        padding: 0;
                        .gallery-single-img {
                            padding-bottom: $vw_89;
                            &.img-half {
                                width: 100%;
                                padding: 0 0 $vw_89 0;
                            }
                            img {
                                cursor: default;
                            }
                        }
                    }
                }
                width: calc(100vw - (#{$vw_610} + #{$vw_26}));
            }
            .single-product-data {
                .sp-category {
                    font-size: 21px;
                    text-transform: uppercase;
                    line-height: 1;
                    padding-bottom: $vw_34;
                }
                .container {
                    position: sticky;
                    top: $vw_110;
                    padding-bottom: $vw_21;
                }
                .sp-title {
                    font-size: 16px;
                    color: $c_grey;
                    padding-bottom: $vw_42;
                }
                .sp-price-container {
                    padding-bottom: $vw_42;
                    .sp-price-data {
                        font-size: $vw_34;
                    }
                    .sp-price-button button {
                        color: $c_grey_dark;
                        background-color: $c_dark_white;
                        border: none;
                        outline: none;
                        font-weight: bold;
                        font-size: $vw_21;
                        transition: .4s;
                        padding: 0 $vw_34;
                        border-radius: $vw_42;
                        line-height: $vw_55;
                        cursor: pointer;
                        &:hover {
                            background-color: $c_grey_light;
                            transition: .4s;
                        }
                    }
                    .sp-price-active {
                        button {
                            color: $c_white;
                            background-color: $c_black;
                            &:hover {
                                background-color: $c_black;
                                transition: .4s;
                            }
                        }
                    }
                }
                .sp-size-data {
                    display: flex;
                    .sp-size-data-single {
                        width: $vw_68;
                        height: $vw_55;
                        margin-right: $vw_21;
                        &:last-child {
                            margin-right: 0;
                        }
                        input {
                            display: none;
                        }
                        label {
                            background-color: $c_dark_white;
                            border: $vw_2 solid $c_dark_white;
                            box-sizing: border-box;
                            border-radius: $vw_3;
                            width: 100%;
                            height: 100%;
                            display: block;
                            text-align: center;
                            line-height: $vw_55;
                            cursor: pointer;
                            font-size: $vw_21;
                            font-weight: 600;
                            color: $c_grey;
                            transition: .3s;
                            &:hover {
                                background-color: $c_grey_light;
                                border: $vw_2 solid $c_grey_light;
                            }
                            &.active {
                                color: $c_white;
                                transition: .3s;
                                background-color: $c_grey_dark;
                                border-color: $c_grey_dark;
                            }
                        }
                        &.disabled {
                            display: none;
                            label {
                                cursor: default;
                                background-color: transparent;
                                color: $c_grey_light;
                                opacity: .5;
                                border-color: $c_grey_light;
                            }
                        }
                    }
                }
                .sp-sizes {
                    padding-bottom: $vw_42;
                    &.highlight {
                        .sp-size-title:first-child {
                            color: $c_error_hl;
                        }
                    }
                    .sp-size-title {
                        display: inline-block;
                        font-size: $vw_16;
                        line-height: 1;
                        vertical-align: middle;
                        color: $c_grey;
                        padding-bottom: $vw_13;
                    }
                }
                .sp-description {
                    color: $c_grey;
                    .sp-description-title {
                        font-size: $vw_21;
                        padding-bottom: $vw_21;
                    }
                    .sp-description-data {
                        font-size: 1vw;
                        line-height: 1.6;
                        white-space: pre-line;
                        margin-bottom: $vw_288;
                    }
                }

            }
        }
        .gallery-container {
            padding-top: $vw_55;
            padding-left: $vw_55;
            img {
                width: 100%;
                display: block;
                height: auto;
                object-fit: cover;
                cursor: pointer;
            }
            .gallery-single-img {
                position: relative;
                z-index: 2;
                width: 100%;
                padding-bottom: $vw_21;
                float: left;
            }
            .img-half {
                width: calc((100% - #{$vw_21}) / 2);
                & ~ .img-half {
                    padding-left: $vw_21;
                    &.not-padding-left {
                        padding-left: 0;
                    }
                }
            }

        }
        .more-products {
            padding-top: $vw_89;
        }
    }

    /*Desktop*/
    @media only screen and (min-width: 768px) {
        .single-product-data {
            width: calc(#{$vw_610} + #{$vw_26});
            .sp-category {
                font-weight: bold;
            }
            .sp-price-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }

    /*Mobile*/
    @media only screen and (max-width: 767px) {
        .single-product {
            .single-product-container {
                display: block;
                .VueCarousel {
                    .VueCarousel-wrapper {
                        min-height: var(--carousel_min-height);
                        .slide {
                            .carousel-image {
                                width: 100%;
                            }
                        }
                    }
                    .VueCarousel-pagination {
                        .VueCarousel-dot-container {
                            margin-top: 0 !important;
                            button {
                                padding: 0 !important;
                                height: var(--vw_34) !important;
                                width: var(--vw_34) !important;
                                background-color: white !important;
                                margin-top: var(--vw_21) !important;
                                border: var(--vw_3) solid black;
                                margin-left: calc( var(--vw_34) / 2 );
                                margin-right: calc( var(--vw_34) / 2 );
                                &.VueCarousel-dot--active {
                                    background-color: black !important;
                                }
                            }
                        }
                    }
                }
                .single-product-data {
                    margin-top: var(--vw_34);
                    .container {
                        .sp-category, .sp-title {
                            font-size: var(--vw_55);
                            color: $c_grey;
                        }
                        .sp-price-container {
                            margin-top: var(--vw_89);
                            margin-bottom: var(--vw_89);
                            .sp-price-data {
                                font-size: var(--vw_89);
                                font-weight: bold;
                                width: 100%;
                            }
                            select {
                                width: 100%;
                                font-size: var(--vw_55);
                                -webkit-appearance: none;
                                background-image: radial-gradient(circle closest-side at 95%, #000 var(--vw_8), $c_grey2 calc( var(--vw_8) + 1px ));
                                height: var(--vw_144);
                                border: none;
                                background-repeat: no-repeat;
                                padding-left: var(--vw_42);
                                margin-top: var(--vw_144);
                                border-radius: var(--vw_8);
                            }
                            .sp-price-button {
                                margin-top: var(--vw_55);
                                button {
                                    width: 100%;
                                    font-size: var(--vw_55);
                                    height: var(--vw_144);
                                    border-radius: var(--vw_8);
                                }
                            }
                        }
                        .sp-sizes {
                            .sp-size-title {
                                display: none;
                            }
                        }
                        .sp-description {
                            .sp-description-data {
                                font-size: var(--vw_55);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
