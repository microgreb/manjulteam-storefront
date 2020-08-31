<template>
    <main class="contact-page">
        <div class="contact-page-container">
            <div class="sidebar">
                <div class="container">
                    <div class="description-container">
                        <div class="align-center">
                            <div class="description-block">
                                <div class="description-title">Адрес</div>
                                <div class="description-data">Украина, г. Одесса <br/> ул. Бунина 22</div>
                            </div>
                            <div class="description-block">
                                <div class="description-title">Связь</div>
                                <div class="description-data">manjulteam1@gmail.com <br/>+38 (093) 079 23 47</div>
                            </div>
                            <div class="description-block">
                                <div class="description-title">Сети</div>
                                <div class="description-data">
                                    <a href="https://www.facebook.com/manjulteamofficial/" target="_blank">Facebook</a>
                                    <a href="https://www.instagram.com/manjulteam/?hl=ru" target="_blank">Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="map">
                <iframe src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJj0MKp5kxxkAR2g5_oHiVSy4&key=AIzaSyCmPvk9rzI52f_ujAjw6bdfV865EBEWq8Q" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: "Contact"
    }
</script>

<style lang="scss">

    @import "../../src/assets/scss/variables";
    .place-card {
        display:none !important;
    }

    /* Desktop + Mobile */
    .contact-page{
        .title {
            margin-top:$vw_110;
        }
        overflow: hidden;
        .contact-page-container{
            min-height: 100vh;
            box-sizing: border-box;
            display: flex;
        }
        .sidebar{
            width: $vw_610;
            height: 100%;
        }
        .map{
            width: calc(100vw - #{$vw_610});
        }
        iframe{
            filter: grayscale(1);
        }

        .container{
            height: 100%;
        }

        .description-container{
            height: calc(100% - #{$vw_110} - #{$vw_110});
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .description-block{
                width: 100%;
                padding-bottom: $vw_68;
            }
            .description-title{
                font-size: $vw_21;
                line-height: 1;
                padding-bottom: $vw_16;
            }
            .description-data{
                font-size: $vw_26;
            }
            a{
                display: block;
                color: $c_black;
                font-size: $vw_26;
                text-decoration: none;
            }
        }
    }

    /* Desktop */
    @media only screen and (min-width: 768px) {
        .contact-page {
            .contact-page-container {
                padding-top: var(--header_height);
                .description-container {
                    padding-top: var( --vw_110 );
                }
            }
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        .contact-page {
            .contact-page-container {
                flex-direction: column;
                .sidebar {
                    width: 100%;
                    order: 2;
                    .container {
                        .description-container {
                            padding-top: var( --vw_110 );
                            .description-block {
                                .description-title {
                                    color: #c8c8c8;
                                    font-size: var( --vw_55 );
                                }
                                .description-data {
                                    &, a {
                                        font-size: var( --vw_55 );
                                        font-weight: bold;
                                    }
                                }
                            }
                        }
                    }
                }
                .map {
                    width: 100%;
                    order: 1;
                    height: 100vw;
                }
            }
        }
    }
</style>
