<template>
    <div class="cart-container">

        <!-- Basket icon -->
        <img class="cart-icon basket"
             src="@/assets/img/icons/cart.svg"
             :class="{ 'highlight' : cartTotal, 'in_cart' : $route.name === 'cart' }"
             @mouseover="displayCart()"
             @click.prevent="closeAndRedirectToCheckout()">

        <!-- Close cross -->
        <img class="cart-icon close"
             src="@/assets/img/icons/cross.svg"
             v-if="$route.name === 'cart'"
             @click.prevent="$router.go(-1)">

        <!-- Total sum -->
        <div class="cart-total"
             @mouseover="displayCart()">
             {{cartTotal}}
        </div>
    </div>
</template>

<script>
    import {EventBus} from "../../../bootstrap/EventBus";

    export default {
        name: "Cart",
        data: function () {
            return {
                cartVisible: false,
                cartModeOpen: false,
            }
        },
        created: function () {
            EventBus.$on('sidebar-mouse-out', () => {
                this.cartModeOpen = false;
            });
        },
        methods: {
            displayCart: function () {
                console.log('display cart');
                if (!this.cartModeOpen || this.$route.name === 'cart') {
                    this.cartModeOpen = true;
                    EventBus.$emit('setCartVisible');
                }
            },
            closeAndRedirectToCheckout: function () {
                if (this.$route.name === 'cart') {
                    this.cartModeOpen = false;
                    return EventBus.$emit('setCartHidden');
                }

                EventBus.$emit('setCartHidden');
                this.$router.push('/cart');
                this.cartVisible = false;
            }
        },
        computed: {
            cartTotal: function () {
                if (this.$store.getters.cart.length) {
                    return this.$store.getters.cartTotal + ' UAH'
                }

                return '';
            },
        }
    }
</script>

<style lang="scss">

    @import "../../../../src/assets/scss/variables";

    header {
        .cart-container {
            height: 1.093vw;
            display: flex;
            align-items: center;
            width: 100%;
            max-width: 7.5vw;
            justify-content: flex-end;
            cursor: pointer;
            .cart-total {
                color: $c_white;
                font-size: $vw_21;
                font-weight: 600;
                padding-left: $vw_8;
                width: max-content;
                min-width: fit-content;
            }
            .cart-icon {
                position: relative;
                cursor: pointer;
                height: 100%;
                transition: .3s;
                left: 0;
                top: 0;
                width: auto;
                opacity: 1;
                &:hover {
                    //    filter: invert(.3);
                    transition: .3s;
                }
            }
        }
        &.cart-sidebar-open {
            .cart-icon-close {
                display: none;
                position: relative;
                z-index: 1;
                height: 100%;
                width: $vw_26;
                span {
                    position: absolute;
                    height: $vw_2;
                    width: 100%;
                    background-color: $c_white;
                    top: calc(50% - #{$vw_1});
                    transition: .3s;
                    &:first-child {
                        transform: rotate(45deg);
                    }
                    &:last-child {
                        transform: rotate(-45deg);
                    }
                }
            }
            .cart-container {
                .cart-icon img {
                    opacity: 1;
                    transition: .3s;
                }
            }
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        header {
            .cart-container {
                height: var( --vw_55 );
                img.cart-icon {
                    position: relative;
                    &.close {
                        filter: invert(100%);
                    }
                    &.basket.in_cart {
                        display: none;
                    }
                    &.highlight {
                        filter: invert(27%) sepia(51%) saturate(2878%);
                    }
                }
                .cart-total {
                    display: none;
                }
            }
        }
    }
</style>
