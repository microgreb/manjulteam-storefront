<template>
    <menu class="main-menu">
        <router-link v-for="link in links" :key="link.id" :to="link.url" v-on:click.native="hideBurger()">
            {{link.name}}
        </router-link>
    </menu>
</template>

<script>
    import {EventBus} from "../../../bootstrap/EventBus";

    export default {
        name: "Menu",
        data() {
            return {
                links: [
                    {name: 'Все товары', url: {name: 'category', params: {name: 'all'}}},
                    {name: 'Мужчины', url: {name: 'category', params: {name: 'men'}}},
                    {name: 'Женщины', url: {name: 'category', params: {name: 'women'}}},
                    {name: 'Look book', url: {name: 'lookBook'}},
                    {name: 'Контакты', url: {name: 'contact'}},
                ]
            }
        },
        methods: {
            changeStatus: function () {
                this.$emit('changeMenuStatus');
            },
            hideBurger: function () {
                EventBus.$emit('burger-hide')
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../src/assets/scss/variables";

    menu.main-menu {
        width: 100%;
        box-sizing: border-box;
        /*border: $vw_3 solid black;*/
        border-top: none;
        background-color: black;
        display: flex;
        height: $vw_178;

        transition: .4s;

        position: fixed;

        left: 0;
        /* top: - calc(#{$vw_233} + #{$vw_55}); */
        top: - $vw_233;
        z-index: 10;
        overflow: hidden;
        a {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            /*border-right: $vw_3 solid $c_black;*/
            color: $c_white;
            opacity:0.8;
            font-weight: normal;
            text-decoration: none;
            text-transform: uppercase;
            font-size: $vw_21;
            -webkit-transition: all .2s ease;
            -moz-transition: all .2s ease;
            -ms-transition: all .2s ease;
            -o-transition: all .2s ease;
            transition: all .2s ease;
            background-color: rgba(0, 0, 0, 0);
            &:last-child {
                border-right: none;
            }
            &:hover {
                opacity:1 !important;
                background-color: rgba(0, 0, 0, 0);
                font-weight: bold;
            }
        }
        .menu-open & {
            top: $vw_55;
            transition: .4s;
        }
    }

    /* Desktop */
    @media only screen and (min-width: 768px) {

        menu.main-menu {
            a {
                width: 20%;
            }
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        menu.main-menu {

            flex-direction: column;
            align-items: center;
            padding-top: var( --vw_110 );
            padding-bottom: var( --vw_110 );
            a {
                font-size: var( --vw_55 );
            }

            .menu-open & {
                height: 100vh;
            }
        }
    }
</style>
