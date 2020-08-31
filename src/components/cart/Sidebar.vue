<template>
    <section class="cart-sidebar"  v-bind:class="{ 'cart-sidebar-open': isOpen }">

        <div>
            <div class="space-55"></div>

            <div @mouseleave="sidebarMouseOut">

                <div>
                    <div class="container">
                        <div class="title cart-title" v-if="$store.getters.cart && $store.getters.cart.length">В корзине</div>
                    </div>
                    <div class="cart-container">
                        <div class="container" v-if="$store.getters.cart && $store.getters.cart.length">

                            <div>
                                <div class="article-container">
                                    <article v-for="(entry, index) in $store.getters.cart" :key="index">
                                        <div class="article-box">
                                            <div class="article-box-left">
                                                <div class="article-thumbnail">
                                                    <img :src="entry.product.main_image.url" :alt="entry.product.name">
                                                </div>
                                                <div class="article-description">
                                                    <div class="article-key">{{entry.product.code}}</div>
                                                    <div class="article-data">
                                                        Size - {{entry.variation.size_name}}
                                                    </div>
                                                </div>
                                                <div class="article-qty">
                                                    <span class="change-qty" @click="decQtyProductInCart(index)">
                                                        <img src="@/assets/img/icons/minus.svg">
                                                    </span>
                                                    <span class="qty">{{entry.quantity}}</span>
                                                    <span class="change-qty" @click="incQtyProductInCart(index)">
                                                        <img src="@/assets/img/icons/plus.svg">
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="article-box-right">
                                                <div class="article-price"><span>{{entry.product.price}}</span> UAH
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-remove" @click="removeProduct(index)">
                                            <img src="@/assets/img/icons/cross.svg">
                                        </div>
                                    </article>
                                </div>
                                <div class="total-container">
                                    <div class="total-description">Итого: <span>{{$store.getters.cartTotal}}</span>
                                        UAH
                                    </div>
                                    <router-link :to="{ name: 'cart'}" class="button" @click.native="hideCart()">Оплатить
                                    </router-link>
                                </div>
                            </div>

                        </div>
                        <empty v-else></empty>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    import Mixins from '@/mixins/main';
    import MixinsProducts from '@/mixins/products';
    import CartEmpty from '@/components/cart/CartEmpty';
    //import SidebarEmptyLogo from './empty-logo/SidebarEmptyLogo';
    import {EventBus} from "../../bootstrap/EventBus";

    export default {
        name: "Sidebar",
        props: ['isOpen'],
        mixins: [Mixins, MixinsProducts],
        components: {
            'empty': CartEmpty
        },
        methods: {
            sidebarMouseOut: function () {
                EventBus.$emit('sidebar-mouse-out');
                EventBus.$emit('setCartHidden');
            },
            hideCart: function () {
                EventBus.$emit('setCartHidden');
                //  EventBus.$emit('sidebar-mouse-out');
            },
            incQtyProductInCart: function (entry_index) {
                this.$store.commit('addQuantity', entry_index);
            },
            decQtyProductInCart: function (entry_index) {
                this.$store.commit('removeQuantity', entry_index);
            },
            removeProduct: function (entry_index) {
                this.$store.commit('removeVariationFromCart', entry_index);
            },

        }
    }
</script>

<style lang="scss">

    @import "../../../src/assets/scss/variables";

    .cart-sidebar {
        position: fixed;
        right: calc(-#{$vw_610} - #{$vw_34});
        top: 0;
        height: 100vh;
        width: calc(#{$vw_610} + #{$vw_34});
        overflow-x: hidden;
        background-color: white;
        box-sizing: border-box;
        border-left: 1px solid #f5f5f5;
        transition: .3s;
        z-index: 200;
        &:after {
            position: fixed;
            content: ' ';
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0);;
            width: 1px;
            height: 100vh;
            transition: all 0.15s ease;
        }

        .cart-title {
            margin-top: $vw_34;
        }

        .cart-container .container {
            padding-right: 0;
        }
        .article-container {
            max-height: calc( 100vh - var( --vw_377 ) );
            overflow-y: scroll;
            overflow-x: hidden;
        }
        article {
            background-color: $c_dark_white;
            border-radius: $vw_3;
            padding: $vw_13;
            margin-right: $vw_55;
            box-sizing: border-box;
            text-transform: uppercase;
            position: relative;
            margin-bottom: $vw_34;
            .article-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: $vw_21;
                .article-box-left {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 75%;
                    .article-thumbnail {
                        height: $vw_89;
                        width: $vw_68;
                        background-color: white;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                    .article-description {
                        padding-left: $vw_21;
                        .article-data {
                            font-weight: bold;
                            span {
                                font-weight: normal;
                            }
                        }
                    }
                    .article-qty {
                        margin-left: $vw_55;
                        font-size: $vw_21;
                        font-weight: 500;

                        .qty {
                            font-weight: bold;
                        }
                        .change-qty {
                            margin-left: $vw_26;
                            margin-right: $vw_26;
                            img {
                                opacity: 0.2;
                                width: $vw_16;
                                cursor: pointer;
                                &:hover {
                                    opacity: 1;
                                }
                            }
                        }
                    }
                }
                .article-box-right {
                    width: 25%;
                    .article-price {
                        padding-right: $vw_21;
                        span {
                            font-weight: bold;
                        }
                    }
                }
            }
            .product-remove {
                cursor: pointer;
                position: absolute;
                top: $vw_42;
                transition: .3s;
                right: -$vw_34;
                height: $vw_21;
                img {
                    opacity: 0.2;
                    width: $vw_13;
                    cursor: pointer;
                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }

        &.cart-sidebar-open {
            right: 0;
            transition: .3s;
            &:after {
                display: block;
                position: fixed;
                content: ' ';
                left: 0;
                top: 0;
                background: rgba(0, 0, 0, 0.46);;
                width: calc(100% - 33.50vw);
                height: 100vh;
                transition: all 0.15s ease;
            }
        }

        .total-container {
            padding-top: $vw_21;
            padding-right: $vw_55;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .button {
                display: block;
                line-height: $vw_55;
                height: $vw_55;
                padding: 0 $vw_34;
                border-radius: $vw_34;
                text-transform: uppercase;
                color: white;
                font-size: $vw_21;
                font-weight: bold;
                background-color: #303030;
                transition: .4s;
                text-decoration: none;
                &:hover {
                    background-color: black;
                    transition: .4s;
                }
            }
            .total-description {
                font-size: $vw_21;
                padding-right: $vw_42;
                span {
                    font-weight: bold;
                }
            }
        }
    }
</style>
