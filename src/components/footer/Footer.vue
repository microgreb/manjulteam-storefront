<template>
    <footer>
        <div class="top">
            <div class="w-50">
                <div class="title">Manjulteam</div>
                <div class="text w-p" >Стиль Manjulteam - это грань между минимализмом и авангардом, он включает в себя
                    функциональность и заботу о настроении клиента. Свободная посадка создает пространство между телом и
                    тканью, поэтому люди свободно носят одежду. Высокий стиль сочетается со спортивными деталями.
                </div>
            </div>
            <div class="w-50">
                <div class="w-33">
                    <div class="title">Адрес</div>
                    <div class="text">
                        Украина, г. Одесса<br>
                        ул. Бунина 22
                    </div>
                </div>
                <div class="w-33">
                    <div class="title">Правила</div>
                    <div class="text">
                        <span class="modal-open" @click="modal = 'pay'; openModal()">Оплата и доставка</span><br>
                        <span class="modal-open" @click="modal = 'back'; openModal()">Возврат товара</span>
                    </div>
                </div>
                <div class="w-33">
                    <div class="title">Связь</div>
                    <div class="text">
                        <a href="mailto:manjulteam1@gmail.com">manjulteam1@gmail.com</a><br>
                        <a href="tel:+380930792347">+38 (093) 079 23 47</a>
                    </div>
                </div>
                <hide-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                    <div class="w-33">
                        <div class="title">Социальные сети</div>
                        <div class="text">
                            <a href="https://www.facebook.com/manjulteamofficial/" target="_blank">Facebook</a><br>
                            <a href="https://www.instagram.com/manjulteam/?hl=ru" target="_blank">Instagram</a><br>
                            <a href="https://t.me/manjulteam" target="_blank">Telegram</a>
                        </div>
                    </div>
                </hide-at>
            </div>
        </div>
        <show-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
            <div class="bottom">
                <div class="w-33">© Manjulteam. All rights reserved</div>
                <div class="w-33 text-center">
                    <ul>
                        <li v-for="link in links" :key="link.id">
                            <router-link :to="link.url">
                                {{link.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="w-33 text-right">
                    <ul>
                        <li><a href="https://www.facebook.com/manjulteamofficial/" target="_blank">Facebook</a></li>
                        <li><a href="https://www.instagram.com/manjulteam/?hl=ru" target="_blank">Instagram</a></li>
                        <li><a href="https://t.me/manjulteam" target="_blank">Telegram</a></li>
                    </ul>
                </div>
            </div>
        </show-at>
        <div class="modal" v-bind:class="{'open-modal': isOpenModal}">
            <div class="close-modal" @click="closeModal()">
                <span></span>
                <span></span>
            </div>
            <div class="text" v-show="modal == 'pay'">
                <h1>ОПЛАТА и ДОСТАВКА</h1>
                <p>Вы можете оплатить заказ одним из этих способов:</p>
                <ul>
                    <li>наличными;</li>
                    <li>при помощи банковских карт Visa и MasterCard;.</li>
                </ul>
                <p>Вы также можете оплатить товар наличными:</p>
                <ul>
                <li>при курьерской доставке;</li>
                <li>при получении заказа в отделениях «Новой почты»;</li>
                <li>в нашем фирменном шоу-руме MANJULTEAM</li>
                </ul>

                <h2>Доставка заказов по Украине</h2>

                <p>Мы доставляем товары по всей Украине, с помощью курьерской службы “Нова Пошта".</p>
                <p>Доставка по Украине БЕСПЛАТНАЯ</p>
                <p>Обратите внимание, что после доставки ваш заказ будет бесплатно храниться на отделении «Новой Почты» не более 5-ти дней. По истечении указанного срока посылка возвращается отправителю.</p>
                <p>«Новая Почта» также предлагает услугу курьерской доставки по указанному вами адресу.</p>
                <p>Такая услуга платная .</p>
                <p>Курьерская доставка действует только в тех населенных пунктах, где есть отделение «Новой Почты».</p>
                <p>Заказ может получить только человек, на которого была оформлена отправка, при этом он обязательно должен иметь при себе паспорт.</p>
                <p>В обязательном порядке проверяйте ваш заказ на соответствие с товарным чеком перед оплатой в отделении «Новой Почты».</p>

                <p>В Одессе возможен самовывоз из фирменного шоу-рума MANJULTEAM по адресу ул. Бунина 22 с 9:00 до 20:00 ежедневно.</p>

                <h2>Доставка международных заказов</h2>

                <p>Мы доставляем заказы по всему миру. Обратите, пожалуйста, внимание, что стоимость доставки платная согласно тарифам логистической службы.</p>
                <p>Мы не несем ответственности за таможенные задержки. Для получения более подробной информации перед покупкой, пожалуйста, свяжитесь с нами.</p>

                <h2>Контакты</h2>
                <p>Звони: <a href="tel:+380930792347">+380930792347</a></p>
                <p>Пиши: <a href="mailto:manjulteam1@gmail.com">manjulteam1@gmail.com</a></p>

                <p><a href="https://www.instagram.com/manjulteam/?hl=ru">Instagram</a></p>
                <p><a href="https://www.facebook.com/manjulteamofficial/">Facebook</a></p>

                <h2>Приходи в гости:</h2>
                <p>ул. Бунина 22</p>
                <p>Режим работы:</p>
                <p>Ежедневно с 9:00 до 20:00</p>
            </div>
            <div class="text" v-show="modal == 'back'">
                <h1>Возврат и обмен</h1>
                <p>Обмен и возврат товара надлежащего качества производится в течение 14 календарных дней с момента получения заказа. Обмен и возврат товара производится если указанный товар не был в употреблении, сохранены его товарный вид, потребительские свойства, пломбы, фабричные ярлыки и оригинальная упаковка, а также, при наличии документа, подтверждающего факт покупки.</p>

                <p>Мы не принимаем к возврату вещи, которые не соответствуют нашим правилам возврата. Такие вещи будут отправлены обратно покупателю.</p>

                <h2>ПРОЦЕДУРА</h2>
                <p>По Одессе обмен или возврат товара можно осуществить с помощью курьерской службы “Нова пошта", или самостоятельно привезти товар к нам в шоу-рум по адресу ул. Бунина 22 ежедневно с 9:00 до 20:00</p>
                <p>По Украине обмен возможен посредством услуг “Нова пошта". Обменять или вернуть товар вы можете в течение 14 дней с момента покупки.</p>

            </div>
        </div>
    </footer>

</template>

<script>
    import {showAt, hideAt} from 'vue-breakpoints';

    export default {
        name: "Footer",
        components: {showAt,hideAt},
        data() {
            return {
                links: [
                    {name: 'Все товары', url: {name: 'category', params: {name: 'all'}}},
                    {name: 'Мужчины', url: {name: 'category', params: {name: 'men'}}},
                    {name: 'Женщины', url: {name: 'category', params: {name: 'women'}}},
                    {name: 'Look book', url: {name: 'lookBook'}},
                    {name: 'Контакты', url: {name: 'contact'}},
                ],
                isOpenModal: false,
                modal: ''
            }
        },
        methods: {

            openModal() {
                if (!this.isOpenModal) {
                    setTimeout(() => {
                        this.isOpenModal = true
                        document.body.classList.add('disable-scroll');
                    }, 50)
                }
            },
            closeModal() {
                if (this.isOpenModal) {
                    setTimeout(() => {
                        this.isOpenModal = false
                        document.body.classList.remove('disable-scroll');
                    }, 50)
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

    @import "../../../src/assets/scss/variables";

    /* Desktop + mobile */
    footer {
        padding: $vw_55 0;
        background-color: #000000;
        display: inline-block;
        .title{
            font-weight: 600;
            font-size: $vw_21;
            color: #fff;
            padding-top: 0;
            padding-bottom: $vw_26;
        }
        .text{
            color: #919696;
            font-size: $vw_21;
            a{
                color: #919696;
                text-decoration: none;
            }
            .modal-open{
                -webkit-transition: all .2s ease;
                -moz-transition: all .2s ease;
                -ms-transition: all .2s ease;
                -o-transition: all .2s ease;
                transition: all .2s ease;
            }
            .modal-open:hover{
                color: #fff!important;
                cursor: pointer;
            }
        }
        .top,
        .bottom{
            padding: 0 var(--vw_55);
        }
        .text.w-p{
            padding-right: $vw_110;
        }
        .bottom {
            padding-top: $vw_55;
            margin-top: $vw_55;
            border-top: 1px solid #111717;
            color: #919696;
            font-size: $vw_21;
            ul li{
                display: inline-block;
                a{
                    text-decoration: none;
                    color: #919696;
                    margin: 0 $vw_8;
                }
            }
        }
        a{
            -webkit-transition: all .2s ease;
            -moz-transition: all .2s ease;
            -ms-transition: all .2s ease;
            -o-transition: all .2s ease;
            transition: all .2s ease;
            &:hover{
                color: #fff!important;
            }
        }
        .text-center{
            text-align: center;
        }
        .text-right{
            text-align: right;
        }
        .modal{
            position: fixed;
            min-height: 100vh;
            min-width: 100vw;
            overflow-y: scroll;
            height: 100%;
            top: 0;
            left: 0;
            display: none;
            background: $c_white;
            z-index: 500;
            .text{
                padding: $vw_144 28vw;
                font-size: $vw_26;
            }
            p{
                margin: $vw_13 0;
            }
            ul{
                margin: $vw_5 $vw_34;
            }
            a:hover{
                color: #000!important;
            }
            a{
                color: #2f3132;
            }
            .text{
                color: #2f3132;
            }
            h2{
                margin: $vw_42 0 $vw_16;
                font-size: $vw_26;
                font-weight: 700;
            }
            h1{
                font-size: $vw_34;
                font-weight: 700;
                margin-bottom: $vw_34;
                color: #2f3132;
            }
            &.open-modal {
                background-color: #fff;
                display: block;
                .close-modal{
                    display: block;
                }
            }
        }
        .close-modal {
            position: fixed;
            right: $vw_34;
            top: $vw_34;
            width: $vw_26;
            height: $vw_26;
            cursor: pointer;
            display: none;
            span {
                width: 100%;
                height: $vw_8;
                position: absolute;
                top: calc(50% - #{$vw_1});
                background-color: $c_black;
                transition: .3s;
                &:first-child {
                    transform: rotate(45deg);
                }
                &:last-child {
                    transform: rotate(-45deg);
                }
            }
            &:hover span {
                transition: .3s;
                background-color: $c_grey;
            }
        }
    }

    /* Desktop*/
    @media only screen and (min-width: 768px) {
        footer {
            .top,
            .bottom{
                display: flex;
            }
            .w-50{
                float: left;
                width: 50%;
                display: inline-block;
            }
            .w-33{
                float: left;
                display: inline-block;
                width: 33.33%;
            }
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        footer {
            padding-top: var(--vw_110);
            padding-bottom: var(--vw_377);
            .w-50 {
                width: 100%;
            }
            .title {
                font-size: var(--vw_55);
                padding-bottom: var(--vw_42);
            }
            .text {
                font-size: var(--vw_55);
                padding-bottom: var(--vw_110);
            }
        }
    }
</style>
