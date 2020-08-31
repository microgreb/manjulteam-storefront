<template>
    <header v-bind:class="{ 'menu-open': menuStatus, 'cart-sidebar-open': sidebarStatus }" @mouseleave="hideBurger">
        <div class="header-container" :class="{ scrolledDown: isScrolledDown}">
            <Burger></Burger>
            <Logo/>
            <Cart></Cart>
        </div>
        <Menu></Menu>
        <ProgressBar v-if="isScrolledDown"></ProgressBar>
    </header>
</template>

<script>

    import Burger from './menu/Burger';
    import Logo from './menu/Logo';
    import Cart from './menu/Cart';
    import Menu from './menu/Menu';
    import ProgressBar from './loaders/ProgressBar'
    import {EventBus} from "../../bootstrap/EventBus";

    export default {
        name: "Header",
        props: ['sidebarStatus'],
        data() {
            return {
                menuStatus: false,
                scrolledDown: false,
            }
        },
        components: {
            Burger,
            Logo,
            Cart,
            Menu,
            ProgressBar
        },
        created: function () {
            this.registerEvents();
            this.listenScroll();

        },
        computed: {
            isScrolledDown() {
                return this.scrolledDown || this.$route.name !== 'home' || this.menuStatus;
            }
        },
        methods: {
            hideBurger: function () {
                EventBus.$emit('burger-hide');
            },
            registerEvents: function () {
                EventBus.$on('burger-show', () => {
                    this.menuStatus = true;
                });

                EventBus.$on('burger-hide', () => {
                    this.menuStatus = false;
                });
            },
            listenScroll() {
                window.onscroll = () => {
                    if (window.pageYOffset > 0) {
                        this.scrolledDown = true;
                    } else {
                        this.scrolledDown = false;
                    }
                };
            },
        }
    }
</script>

<style lang="scss">

    @import "../../../src/assets/scss/variables";

    header {
        .header-container {
            background: rgba(0, 0, 0, 0);
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: var(--header_height);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 15;
            width: 100%;
            padding: 0 0.833vw;
            box-sizing: border-box;
            overflow: hidden;
            transition: all 0.27s ease;
            &.scrolledDown {
                background: rgba(0, 0, 0, 1);
            }
        }
        &::after {
            position: absolute;
            top: -$vw_288;
            left: 0;
            z-index: 10;
            content: '';
            background-color: black;
            width: 100vw;
            height: $vw_288;
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        header {
            height: var(--header_height);
            .header-container {
                padding-left: var(--vw_34);
                padding-right: var(--vw_34);
                width: 100%;
                background-color: black;
            }
        }
    }
</style>
