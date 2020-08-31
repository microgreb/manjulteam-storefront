<template>
    <section class="empty-logo">
        <div class="logo-container">
            <img src="@/assets/img/icons/empty_cart.svg" class="logo">

            <div class="empty-title">Пустая корзина</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "CartEmpty",
    }
</script>

<style lang="scss">

    // ToDo make in normal mode
    @import "../../assets/scss/variables";

    /* Desktop + mobile */
    .empty-logo {
        height: var( --screen_height_without_header );
        align-items: center;
        color: $c_inactive;
        display: grid;
        .logo-container {
            display: inline-block;
            text-align: center;
            .logo {
                width: $vw_68;
            }
            .empty-title {
                font-weight: 400;
                font-size: $vw_26;
                margin-top: $vw_21;
            }
        }
    }
    .cart-sidebar {
        .empty-logo {
            width: $one_third;
        }
    }

    /* Desktop */
    @media only screen and (min-width: 768px) {
        .empty-logo {
            width: $two_thirds;
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        .empty-logo {
            .logo-container {
                .logo {
                    width: var( --vw_233 );
                }
                .empty-title {
                    font-size: var( --vw_55 );
                }
            }
            & + .cart-page-sidebar {
                display: none !important;
            }
        }
    }
</style>
