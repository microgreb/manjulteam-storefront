<template>
    <section>
        <div class="burger-container" @mouseover="burgerMouseOver()" @click="burgerClick()">
            <div class="burger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </section>
</template>

<script>
    import {EventBus} from "../../../bootstrap/EventBus";

    export default {
        name: "Burger",
        data: function () {
            return {
                once: false,
                opened: false,
            }
        },
        created: function () {
            EventBus.$on('burger-hide', () => {
                this.unsuspend();
            });
        },
        methods: {
            burgerClick: function() {
                if( this.opened ) {
                  this.burgerHide();
                }
                else {
                  this.burgerShow();
                }
            },
            burgerMouseOver: function() {
              if( window.innerWidth >= 768 ) {
                this.burgerShow();
              }
            },
            burgerShow: function () {
                if (!this.once) {
                    this.once = true;
                    EventBus.$emit('burger-show');
                    this.opened = true;

                    if( window.innerWidth < 768) {

                      let fixed = document.getElementsByClassName('main-menu')[0];

                      fixed.addEventListener('touchmove', function(e) {

                        e.preventDefault();

                      }, false);
                    }
                }
            },
            burgerHide: function () {
                EventBus.$emit('burger-hide');
                this.opened = false;
            },
            unsuspend() {
                setTimeout( () => {
                  this.once = false;
                }, 500 );
            }
        }
    }
</script>

<style lang="scss">
    .burger-container {
        height: var(--vw_21);
        width: 100%;
    }

    .burger-menu {
        height: 100%;
        width: var(--vw_26);
        position: relative;
        cursor: pointer;
        span {
            height: var(--vw_2);
            width: 100%;
            background-color: white;
            position: absolute;
            transition: .3s;
            left: 0;
            top: 0;
            &:nth-child(2) {
                top: calc(50% - var(--vw_1));
            }
            &:last-child {
                top: auto;
                bottom: 0;
            }
        }
        &:hover {
            span:nth-child(2) {
                width: 70%;
            }
        }
        .menu-open & {
            span:nth-child(2) {
                width: 0;
                left: 50%;
            }
            span:first-child,
            span:last-child {
                top: calc(50% - var(--vw_1));
            }
            span:first-child {
                transform: rotate(45deg);
            }
            span:last-child {
                transform: rotate(-45deg);
            }
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        .burger-container {
            height: var(--vw_42);
            .burger-menu {
                width: var(--vw_55);
                height: var(--vw_42);
                span {
                    height: var(--vw_5);
                    &:nth-child(2) {
                        top: calc( ( 100% - var(--vw_5) ) / 2 );
                    }
                    &:last-child {
                        //top: 86%;
                        bottom: 0;
                    }
                }
            }
        }
    }
</style>
