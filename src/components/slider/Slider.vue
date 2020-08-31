<template>
    <div class="carousel-wrapper" :class="{ collapsed: slider_collapse }" ref="slider">
        <!--<div class="tint"></div>-->

        <div class="video-background">
            <div class="video-foreground">
                <!--<iframe :src="videoUrl" frameborder="0" allowfullscreen></iframe>-->
                <video-bg :sources="['/assets/video/biosphere.mp4']">

                </video-bg>
            </div>
        </div>
        <div class="mouse">
            <div class="mouse-wheel"></div>
        </div>
        <!--<carousel :items="1" :loop="true" :nav="false" :autoplay="true" class="slider-container slider-animation" id="slider-container">-->
        <!--<div v-for="(lookBook, index) in lookBooksDemo" :key="index" class="single-slide">-->
        <!--<img :src="'/look_book/' + lookBook.data.thumbnail" :alt="lookBook.title">-->
        <!--<router-link :to="{ name: 'lookBookSingle', params: {url: lookBook.id}}"><h4>{{lookBook.title}}</h4></router-link>-->
        <!--<div class="mouse">-->
        <!--<div class="mouse-wheel"></div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</carousel>-->
        <div ref="slider_bottom"></div>
    </div>
</template>

<script>

    import carousel from 'vue-owl-carousel'
    import MixinLookBook from '@/mixins/look-book'
    import VideoSlider from "./VideoSlider";

    export default {
        name: "Slider",
        mixins: [MixinLookBook],
        components: {VideoSlider, carousel},
        data: function () {
            return {
                slider_collapse: false,
                videoUrl: 'https://www.youtube.com/embed/0WT7sYhmM0w?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&version=3&enablejsapi=1&mute=1&playlist=0WT7sYhmM0w'
            }
        },
        created() {
            this.listenScroll();
        },
        methods: {
            listenScroll() {
                // window.onscroll = () =>  {
                //     if( !this.slider_collapse ) {
                //         this.slider_collapse = true;
                //     }
                //     else {
                //         if( window.pageYOffset === 0 ){
                //             this.slider_collapse = false;
                //         }
                //     }
                // };
            },
        }
    }
</script>

<style lang="scss">

    @import "../../../src/assets/scss/variables";

    .carousel-wrapper {
        transition: max-height 1s ease-out;
        max-height: 100vh;
        height: 100vh;
        overflow: hidden;
        position: relative;
        margin-bottom: $vw_68;
        .tint {
            position: absolute;
            left: 0;
            top: 0;
            height: 1000vh;
            width: 100vw;
          //  background: rgba(0, 0, 0, 0.8);
            background-color: rgba(0,0,0,0.35);
            opacity:1;

         //   background-image: url(data:image/png;base64,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);
            z-index:1;
        }
        .mouse {
            margin: auto;
            height: 3.14vw;
            width: 1.94vw;
            border: 2px solid #fff;
            border-radius: 1.57vw;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding-top: .46vw;
            opacity: .62;
            position: absolute;
            bottom: $vw_89;
            z-index: 14;
            right: 0;
            left: 0;
            .mouse-wheel {
                height: .74vw;
                width: .277vw;
                border-radius: 0.1385vw;
                background-color: #fff;
                margin: auto;
                -webkit-animation-name: mouseMove;
                animation-name: mouseMove;
                -webkit-animation-duration: 2.2s;
                animation-duration: 2.2s;
                -webkit-animation-timing-function: ease-in;
                animation-timing-function: ease-in;
                -webkit-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
            }
        }

        &.collapsed {
            max-height: 15vh;
        }
        .owl-carousel.owl-theme {
            position: relative;
            .single-slide {
                height: 100%;
                position: relative;
                h4 {
                    position: absolute;
                    bottom: $vw_178;
                    font-size: $vw_42;
                    left: 0;
                    right: 0;
                    text-align: center;
                    color: $c_white;
                    font-weight: normal;
                    text-transform: uppercase;
                }

            }
            .owl-dots {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                margin-top: 0;
                margin-bottom: $vw_55;
                button {
                    outline: none;
                    span {
                        width: $vw_55;
                        height: $vw_5;
                        border-radius: $vw_5;
                        margin: 0 $vw_13;
                        background-color: #ECECEC;
                        opacity: .38;
                        transition: .3s;
                    }
                    &.active {
                        span {
                            transition: .3s;
                            opacity: 1;
                        }
                    }
                }
            }
        }
        .owl-stage-outer {
            height: 100vh;
            .owl-stage {
                height: 100%;
                .owl-item {
                    height: 100%;
                    img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    }

    .container {
        background:white;
    }

    @keyframes mouseMove {
        0% {
            opacity: 0;
        }
        10% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(15px);
            transform: translateY(15px);
            opacity: 0;
        }
    }

    .video-background {
        background: #000;
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
        z-index: -99;
    }
    .video-foreground,
    .video-background iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    .video-foreground {
        /*opacity: .8;
        background: url('/assets/img/background.jpg') top center no-repeat;
        background-size: cover;*/
    }
    #vidtop-content {
        top: 0;
        color: #fff;
    }
    .vid-info { position: absolute; top: 0; right: 0; width: 33%; background: rgba(0,0,0,0.3); color: #fff; padding: 1rem; font-family: Avenir, Helvetica, sans-serif; }
    .vid-info h1 { font-size: 2rem; font-weight: 700; margin-top: 0; line-height: 1.2; }
    .vid-info a { display: block; color: #fff; text-decoration: none; background: rgba(0,0,0,0.5); transition: .6s background; border-bottom: none; margin: 1rem auto; text-align: center; }
    @media (min-aspect-ratio: 16/9) {
        /*.video-foreground { height: 300%; top: -100%; }*/
    }
    @media (max-aspect-ratio: 16/9) {
        /*.video-foreground { width: 300%; left: -100%; }*/
    }
    @media all and (max-width: 600px) {
        .vid-info { width: 50%; padding: .5rem; }
        .vid-info h1 { margin-bottom: .2rem; }
    }
    @media all and (max-width: 500px) {
        .vid-info .acronym { display: none; }
    }
</style>
