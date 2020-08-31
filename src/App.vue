<template>
    <div id="app">
        <Header :sidebarStatus="isCartOpen"></Header>
        <transition name="component-fade" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
        <CartSidebar :isOpen="isCartOpen"/>
        <Footer></Footer>
    </div>
</template>

<script>

    import Header from './components/header/Header';
    import Footer from './components/footer/Footer';
    import CartSidebar from './components/cart/Sidebar';
    import MixinLookBook from '@/mixins/look-book'
    import MixinPoducts from '@/mixins/products'
    import { EventBus } from "./bootstrap/EventBus";
    import { mapState } from 'vuex';

    export default {
        name: 'app',
        components: {
            Header,
            CartSidebar,
            Footer
        },
        mixins: [MixinLookBook, MixinPoducts],
        data() {
            return {
                isCartOpen: false/*,
                loading: true*/
            }
        },
        created() {
            this.$store.commit('loadProducts', this.productsDemo);
            this.$store.commit('loadLookBooks', this.lookBooksDemo);
            this.$store.commit('loadProductsSizes', this.productSizes);
            this.$store.commit('loadProductMale', this.productMale);

            this.registerEvents();
        },
        methods: {
            registerEvents: function () {
                EventBus.$on('setCartVisible', () => {
                    this.isCartOpen = true;
                });
                EventBus.$on('setCartHidden', () => {
                    this.isCartOpen = false;
                });
            },
        }
    }
</script>

<style lang="scss">

    @import "./assets/scss/fonts";
    @import "./assets/scss/variables";

    html * {
        margin: 0;
        padding: 0;
        font-family: "SF Display", sans-serif;
    }

    body.disable-scroll{
        overflow-y: hidden;
    }

    #app {
        position: relative;
        /*overflow-x: hidden;*/
        min-height: 100vh;
    }

    main {
        min-height: 100vh;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .container {
        width: 100%;
        padding: 0 var( --vw_55 );
        box-sizing: border-box;
    }

    .clearfix::after {
        content: '';
        display: block;
        clear: both;
    }

    .title {
        font-size: $vw_26;
        font-weight: 600;
        padding-bottom: $vw_55;
        line-height: 1;
        padding-top: $vw_42;
    }

    .space-34 {
        height: $vw_34;
        width: 100%;
    }

    .space-55 {
        height: $vw_55;
        width: 100%;
    }

    .space-89 {
        height: $vw_89;
        width: 100%;
    }

    .space-233 {
        width: 100%;
        height: $vw_233;
        &.compensated {
            margin-top: -$vw_42;
        }
    }

    .space-377 {
        width: 100%;
        height: $vw_377;
    }

    .left-55 {
        padding-left: $vw_55;
    }

    .border-bottom {
        border-bottom: 1px solid #F0F0F0;
    }

    article {
        .article-remove {
            cursor: pointer;
            position: absolute;
            top: $vw_42;
            transition: .3s;
            right: -$vw_34;
            height: $vw_21;
            width: $vw_21;
            span {
                height: $vw_3;
                width: 100%;
                position: absolute;
                top: calc((#{$vw_26} - #{$vw_3}) / 2);
                left: 0;
                background-color: $c_grey_light;
                display: block;
                transition: .3s;
                &:first-child {
                    transform: rotate(-45deg);
                }
                &:last-child {
                    transform: rotate(45deg);
                }
            }
            &:hover span {
                transition: .3s;
                background-color: $c_grey;
            }
        }
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .4s ease;
    }

    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }

    .el-notification {
        width: auto !important;
        background-color: black !important;
        padding-left: $vw_16 !important;
        padding-right: 0 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        top: $vw_89 !important;
        border-radius: $vw_8 !important;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);
        .el-notification__icon {
            display: none;
            &.el-icon-info + .el-notification__group {
                .el-notification__content {
                    border-right: var(--vw_2) solid $c_blue;
                }
                .el-notification__closeBtn:hover {
                    background-image: url('/assets/img/cross-blue.svg');
                }
            }
            &.el-icon-success + .el-notification__group {
                .el-notification__content {
                    border-right: var(--vw_2) solid $c_green;
                }
                .el-notification__closeBtn:hover {
                    background-image: url('/assets/img/cross-green.svg');
                }
            }
            &.el-icon-error + .el-notification__group {
                .el-notification__content {
                    border-right: var(--vw_2) solid $c_red;
                }
                .el-notification__closeBtn:hover {
                    background-image: url('/assets/img/cross-red.svg');
                }
            }
        }
        .el-notification__group {
            margin-left: 0;
            margin-right: 0;
            .el-notification__title {
                display: none;
            }
            .el-notification__content {
                width: $vw_233;
                margin-top: 0;
                padding-top: $vw_16;
                padding-bottom: $vw_16;
                padding-right: $vw_16;
                float: left;
                p {
                    font-size: $vw_21;
                    line-height: $vw_26;
                    color: white;
                    text-align: left;
                }
            }
            .el-notification__closeBtn {
                position: relative;
                font-size: $vw_34;
                float: left;
                top: auto;
                right: auto;
                width: $vw_55;
                height: 100%;
                display: grid;
                align-items: center;
                justify-items: center;
                background-image: url('/assets/img/cross.svg');
                background-position: center;
                background-repeat: no-repeat;
                background-size: $vw_8;

                &:before {
                    display: none;
                }
            }
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        .el-notification {
            //width: 100% !important;
            left: var(--vw_55) !important;
            right: var(--vw_55) !important;
            top: calc( var(--vw_110) + var(--vw_55) ) !important;
            border: none !important;
            border-radius: var(--vw_21) !important;

            /* Colored lines */
            .el-notification__icon {
                &.el-icon-info + .el-notification__group {
                    .el-notification__content {
                        border-right: var(--vw_8) solid $c_blue;
                    }
                    .el-notification__closeBtn:hover {
                        background-image: url('/assets/img/cross-blue.svg');
                    }
                }
                &.el-icon-success + .el-notification__group {
                    .el-notification__content {
                        border-right: var(--vw_8) solid $c_green;
                    }
                    .el-notification__closeBtn:hover {
                        background-image: url('/assets/img/cross-green.svg');
                    }
                }
                &.el-icon-error + .el-notification__group {
                    .el-notification__content {
                        border-right: var(--vw_8) solid $c_red;
                    }
                    .el-notification__closeBtn:hover {
                        background-image: url('/assets/img/cross-red.svg');
                    }
                }
            }
            .el-notification__group {
                width: 100%;
                .el-notification__content {
                    width: 80%;
                    padding: var(--vw_42);
                    box-sizing: border-box;
                    p {
                        font-size: var(--vw_68);
                        line-height: var(--vw_89);
                    }
                }
                .el-notification__closeBtn {
                    background-size: var(--vw_42);
                    width: 20%;
                    display: inline-block;
                }
            }
        }
    }
</style>
