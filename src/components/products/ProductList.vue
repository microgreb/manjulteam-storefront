<template>
    <section class="products-container">
        <div class="title">{{title}}</div>
        <div class="products-archive">
            <article v-for="(product, index) in products"
                     :key="index"
                     vue-wow="{ 'animation-name': 'fadeInUp','animation-duration': '.8s'}"
                     data-wow-delay="2s">
                <div class="product-data">
                    <router-link :to="{ name: 'product', params: {url: product.id}}">
                        <div class="product-image-block">
                            <show-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                                <img :src="product.main_image.url" :alt="product.name">
                            </show-at>
                            <hide-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                                <img :src="product.main_image.url_medium" :alt="product.name">
                            </hide-at>
                            <show-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                                <img class="cover" :src="product.hover_image.url" :alt="product.name + '_cover'">
                            </show-at>
                        </div>
                        <h6>{{product.name}}</h6>
                        <div class="price">{{product.price}} UAH</div>
                    </router-link>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
    import {showAt, hideAt} from 'vue-breakpoints';

    export default {
        name: "ProductList",
        components: {showAt,hideAt},
        props: ['title', 'products']
    }
</script>

<style lang="scss">

    @import "../../../src/assets/scss/variables";

    /* Desktop + mobile */
    .products-container {
        .title {
            font-weight: 500;
        }
        .products-archive {
            display: flex;
            flex-wrap: wrap;
            margin-left: -$vw_55;
        }
        article {
            padding-left: $vw_55;
            box-sizing: border-box;
            padding-bottom: $vw_55;
            .product-image-block {
                overflow: hidden;
                position: relative;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: .3s;
                &.cover {
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
            }
            h6 {
                margin-top: -$vw_13;
                padding-top: $vw_16;
                background-color: $c_white;
                font-size: $vw_21;
                font-weight: bold;
                color: $c_black;
                position: relative;
            }
            .price {
                font-size: $vw_16;
                font-weight: normal;
                color: $c_black;
                margin-top:$vw_3;
            }
            a {
                text-decoration: none;
                &:hover {
                    img.cover {
                        transition: .5s;
                        opacity: 1;
                        /*transform: scale(1.2);*/
                    }
                }
            }
        }
    }

    /* Desktop*/
    @media only screen and (min-width: 768px) {
        .products-container {
            padding-top: var(--vw_89);
            article {
                width: 33.333%;
                .product-image-block {
                    height: calc(#{$vw_610} + #{$vw_233});
                }
            }
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        .products-container {
            padding-top: var(--vw_144);
            .title {
                font-size: var(--vw_55);
                font-weight: bold;
            }
            .products-archive {
                article .product-data a {
                    h6 {
                        font-size: var(--vw_42);
                        font-weight: bold;
                    }
                    .price {
                        font-size: var(--vw_42);
                    }
                }
            }
        }
    }
</style>
