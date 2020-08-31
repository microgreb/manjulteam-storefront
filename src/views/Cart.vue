<template>

    <main class="cart-page">

        <div class="cart-container" :class="{ 'highlight' : !deliveryDetails.full_name && was_submitted }">

            <div class="cart-page-products" v-if="$store.getters.cart && $store.getters.cart.length">
                <div class="container">
                    <div class="title cart-title">Корзина</div>
                    <div class="products-in-cart">
                        <article class="single-product-in-cart" v-for="(entry, index) in $store.getters.cart"
                                 :key="entry.product.id">
                            <div class="left-container">
                                <img :src="entry.product.main_image.url" :alt="entry.product.name" class="product-img">
                                <div class="product-title">
                                    <div class="name">
                                        <router-link :to="{ name: 'product', params: {url: entry.product.id}}">
                                            {{entry.product.name}}
                                        </router-link>
                                    </div>
                                    <hide-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                                        <div>
                                            <div class="article">{{entry.product.code}}</div>
                                            <div class="article">{{entry.product.category_name}} / {{entry.variation.size_name}}</div>
                                            <div class="mobile-price">{{entry.product.price}} <span>UAH</span></div>
                                        </div>
                                    </hide-at>
                                </div>
                            </div>
                            <div class="right-container">
                                <div class="product-counter">
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
                                <show-at :breakpoints="{ medium: 768 }" breakpoint="mediumAndAbove">
                                    <div class="product-data">
                                        <div class="product-male">{{entry.product.category_name}}</div>
                                        <div class="product-size">{{entry.variation.size_name}}</div>
                                        <div class="product-price">{{entry.product.price}} <span>UAH</span></div>
                                    </div>
                                </show-at>
                            </div>
                            <div class="product-remove" v-on:click="removeProduct(index)">
                                <img src="@/assets/img/icons/cross.svg">
                            </div>
                        </article>
                    </div>
                    <div class="cart-buy">
                        <div class="total">
                            Итого: <span>{{$store.getters.cartTotal}}</span> UAH
                        </div>
                        <form method="POST" action="https://www.liqpay.ua/api/3/checkout"
                              accept-charset="utf-8">
                            <input type="hidden" name="data" ref="paymentData"/>
                            <input type="hidden" name="signature" ref="paymentSignature"/>
                            <button ref="submitButton"></button>
                        </form>
                        <button v-on:click="submitOrder( 'liqpay' )">Оплатить</button>

                        <form name="payment" method="post" action="https://sci.any.money/invoice" accept-charset="UTF-8">
                            <!-- ToDo -->
                            <input type="hidden" name="sign" value=""/>
                            <input type="hidden" name="merchant" value="1135"/>
                            <input type="hidden" name="amount" value="100.00"/>
                            <input type="hidden" name="in_curr" value="UAH"/>
                            <input type="hidden" name="payway" value=""/>
                            <input type="hidden" name="externalid" value="123"/>
                            <input type="hidden" name="expiry" value="600"/>
                            <input type="hidden" name="client_email" value="khmara@mail.ua"/>
                            <input type="hidden" name="callback_url" value="http://mjt.grebola.com/order_handler"/>
                            <input type="hidden" name="redirect_url" value="http://mjt.grebola.com/order_page/"/>
                            <!-- ToDo uncomment for AnyMoney -->
                            <!--<button ref="submitButtonAnymoney"></button>-->
                        </form>

                        <!-- ToDo uncomment for AnyMoney -->
                        <!--<button v-on:click="submitOrder( 'anymoney' )">Оплатить AnyMoney</button>-->

                    </div>

                </div>
            </div>

            <empty v-else></empty>

            <div class="cart-page-sidebar" >
                <div class="container">
                    <div class="title cart-title">Доставка</div>
                    <div class="form">
                        <div class="field-container">
                            <label for="form-name" :class="{ 'highlight' : !deliveryDetails.full_name && was_submitted }">получатель</label>
                            <input id="form-name" autocomplete="off" v-model="deliveryDetails.full_name">
                        </div>
                        <div class="form-row field-count-2">
                            <div class="field-container">
                                <label for="form-phone" :class="{ 'highlight' : !deliveryDetails.phone && was_submitted }">телефон</label>
                                <input id="form-phone" autocomplete="off" v-model="deliveryDetails.phone">
                            </div>
                            <div class="field-container">
                                <label for="form-country" :class="{ 'highlight' : !deliveryDetails.country && was_submitted }">страна</label>
                                <v-select v-on:input="countryChange" v-model="deliveryDetails.country" id="form-country" :options="countries"></v-select>
                            </div>
                        </div>

                        <div class="field-container" v-if="deliveryDetails.area">
                            <label :class="{ 'highlight' : !deliveryDetails.city && was_submitted }">город</label>
                            <input v-model="deliveryDetails.city"
                                   v-on:input="debounceSearch($event.target.value)"
                                   autocomplete="off"
                                   class="form-place">
                            <div class="field-suggestions" v-if="deliveryDetails.search_visible">
                                <div class="field-suggestion"
                                     @click="selectCity(city)"
                                     v-for="city in cities">
                                    {{city.DescriptionRu}}
                                </div>
                            </div>
                        </div>


                        <div class="field-container">
                            <label v-if="deliveryDetails.country !== 'Украина'" :class="{ 'highlight' : !deliveryDetails.address && was_submitted }">адрес</label>
                            <label v-if="deliveryDetails.country === 'Украина'" :class="{ 'highlight' : !deliveryDetails.address && was_submitted }">адрес или отделение Новой почты</label>
                            <input v-model="deliveryDetails.address"
                                   autocomplete="off"
                                   class="form-place">
                        </div>


                        <!--<div class="field-container" v-if="deliveryDetails.city && deliveryDetails.country === 'Украина'">
                            <label>№ отделения новой почты</label>
                            <input v-model="deliveryDetails.warehouse_search"
                                   v-on:input="debounceWarehouseSearch($event.target.value)"
                                   class="form-place">
                            <div class="field-suggestions" v-if="warehouses.length && !deliveryDetails.warehouse && deliveryDetails.country === 'Украина'">
                                <div class="field-suggestion"
                                     @click="selectWarehouse(warehouse)"
                                     v-for="warehouse in warehouses">
                                    {{warehouse.DescriptionRu}}
                                </div>
                            </div>
                        </div>-->


                        <div class="field-container">
                            <label for="form-text">примечание</label>
                            <textarea id="form-text" v-model="deliveryDetails.comment"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

    import CartEmpty from '../components/cart/CartEmpty';
    import DeliveryResource from "../api/resources/DeliveryResource";
    import OrderResource from "../api/resources/OrderResource";
    import {showAt, hideAt} from 'vue-breakpoints';

    export default {
        name: "Cart",
        data() {
            return {
                areas: [],
                cities: [],
                countries: [
                    'Украина',
                    'Россия',
                    'Беларусь',
                    'Молдова',
                    'Грузия',
                    'Казахстан',
                    'Армения',
                    'Азербайджан',
                    'Эстония',
                    'Латвия',
                    'Литва',
                    'Австралия',
                    'Австрия',
                    'Албания',
                    'Алжир',
                    'Ангола',
                    'Андорра',
                    'Антигуа и Барбуда',
                    'Аргентина',
                    'Афганистан',
                    'Багамские Острова',
                    'Бангладеш',
                    'Барбадос',
                    'Бахрейн',
                    'Белиз',
                    'Бельгия',
                    'Бенин',
                    'Болгария',
                    'Боливия',
                    'Босния и Герцеговина',
                    'Ботсвана',
                    'Бразилия',
                    'Бруней',
                    'Буркина-Фасо',
                    'Бурунди',
                    'Бутан',
                    'Вануату',
                    'Великобритания',
                    'Венгрия',
                    'Венесуэла',
                    'Восточный Тимор',
                    'Вьетнам',
                    'Габон',
                    'Гаити',
                    'Гайана',
                    'Гамбия',
                    'Гана',
                    'Гватемала',
                    'Гвинея',
                    'Гвинея-Бисау',
                    'Германия',
                    'Гондурас',
                    'Гренада',
                    'Греция',
                    'Дания',
                    'Джибути',
                    'Доминика',
                    'Доминиканская Республика',
                    'Египет',
                    'Замбия',
                    'Зимбабве',
                    'Израиль',
                    'Индия',
                    'Индонезия',
                    'Иордания',
                    'Ирак',
                    'Иран',
                    'Ирландия',
                    'Исландия',
                    'Испания',
                    'Италия',
                    'Йемен',
                    'Кабо-Верде',
                    'Камбоджа',
                    'Камерун',
                    'Канада',
                    'Катар',
                    'Кения',
                    'Кипр',
                    'Киргизия',
                    'Кирибати',
                    'Китай',
                    'Колумбия',
                    'Коморы',
                    'Республика Конго',
                    'Демократическая Республика Конго',
                    'КНДР',
                    'Республика Корея',
                    'Косово',
                    'Коста-Рика',
                    'Кот-д’Ивуар',
                    'Куба',
                    'Кувейт',
                    'Лаос',
                    'Лесото',
                    'Либерия',
                    'Ливан',
                    'Ливия',
                    'Лихтенштейн',
                    'Люксембург',
                    'Маврикий',
                    'Мавритания',
                    'Мадагаскар',
                    'Малави',
                    'Малайзия',
                    'Мали',
                    'Мальдивы',
                    'Мальта',
                    'Марокко',
                    'Маршалловы Острова',
                    'Мексика',
                    'Мозамбик',
                    'Монако',
                    'Монголия',
                    'Мьянма',
                    'Намибия',
                    'Науру',
                    'Непал',
                    'Нигер',
                    'Нигерия',
                    'Нидерланды',
                    'Никарагуа',
                    'Новая Зеландия',
                    'Норвегия',
                    'ОАЭ',
                    'Оман',
                    'Пакистан',
                    'Палау',
                    'Панама',
                    'Папуа — Новая Гвинея',
                    'Парагвай',
                    'Перу',
                    'Польша',
                    'Португалия',
                    'Руанда',
                    'Румыния',
                    'Сальвадор',
                    'Самоа',
                    'Сан-Марино',
                    'Сан-Томе и Принсипи',
                    'Саудовская Аравия',
                    'Северная Македония',
                    'Сейшельские Острова',
                    'Сенегал',
                    'Сент-Винсент и Гренадины',
                    'Сент-Китс и Невис',
                    'Сент-Люсия',
                    'Сербия',
                    'Сингапур',
                    'Сирия',
                    'Словакия',
                    'Словения',
                    'США',
                    'Соломоновы Острова',
                    'Сомали',
                    'Судан',
                    'Суринам',
                    'Сьерра-Леоне',
                    'Таджикистан',
                    'Таиланд',
                    'Танзания',
                    'Того',
                    'Тонга',
                    'Тринидад и Тобаго',
                    'Тувалу',
                    'Тунис',
                    'Туркмения',
                    'Турция',
                    'Уганда',
                    'Узбекистан',
                    'Уругвай',
                    'Федеративные Штаты Микронезии',
                    'Фиджи',
                    'Филиппины',
                    'Финляндия',
                    'Франция',
                    'Хорватия',
                    'Центральноафриканская Республика',
                    'Чад',
                    'Черногория',
                    'Чехия',
                    'Чили',
                    'Швейцария',
                    'Швеция',
                    'Шри-Ланка ',
                    'Эквадор',
                    'Экваториальная Гвинея',
                    'Эритрея',
                    'Эсватини',
                    'Эфиопия',
                    'ЮАР',
                    'Южный Судан',
                    'Ямайка',
                    'Япония'
                ],
                deliveryDetails: {
                    full_name: null,
                    phone: null,
                    area: 'Одесская',
                    country: 'Украина',
                    city: null,
                    address: null,
                    np_department: null,
                    comment: null,
                },
                payment: {
                    data: null,
                    signature: null,
                },
                was_submitted: false
            }
        },
        components: {
            'empty': CartEmpty,
            showAt,
            hideAt
        },
        created: function () {
            this.fetchInitialData();
            this.preloadData();
        },
        methods: {

            preloadData: function () {
                //  this.deliveryDetails = this.$store.getters.deliveryDetails;
            },
            fetchInitialData: function () {
                this.fetchAreas();
                this.fetchCities();
            },
            fetchAreas: function () {
                DeliveryResource.getDeliveryAreas().then(res => {
                    this.areas = res.data.data;
                })
            },
            submitOrder: function ( paysystem ) {
                this.was_submitted = true;
                OrderResource.submitOrder({
                  paysystem: paysystem,
                  deliveryDetails: this.deliveryDetails,
                  order_items: this.$store.getters.cart
                }).then(res => {
                  this.$store.commit('clearCart');
                  this.$store.commit('setDeliveryDetails', this.deliveryDetails);

                  console.log( res.data );

                  this.$refs.paymentData.value = res.data.data;
                  this.$refs.paymentSignature.value = res.data.signature;
                  this.payment = res.data;

                  /* ToDo before sending to paysystem */
                  ///this.$refs.submitButton.click();
                  alert('Спасибо. Ваш заказ принят');

                }).catch(error => {
                  this.$notify({
                    message: 'Необходимо заполнить поля доставки',
                    type: 'error'
                  })
                })
            },
            fetchCities: function (query) {
                if (query || query !== '') {
                    DeliveryResource.getCities(this.deliveryDetails.area, query).then(res => {
                        this.cities = res.data;
                    })
                }
            },
            /*fetchWarehouses: function (query) {
                if (query || query !== '') {
                    DeliveryResource.getWarehouses(this.deliveryDetails.city, query).then(res => {
                        this.deliveryDetails.wh_search_visible = true;
                        this.deliveryDetails.warehouse_search = ' ';
                        this.warehouses = res.data;
                    })
                }
            },*/
            removeProduct: function (entry_index) {
                this.$store.commit('removeVariationFromCart', entry_index);
            },
            selectCity: function (city) {
                //this.deliveryDetails.city_search = city.DescriptionRu;
                this.deliveryDetails.city = city.DescriptionRu;
                this.deliveryDetails.search_visible = false;

                //this.fetchWarehouses(city);
            },
            /*selectWarehouse: function (warehouse) {
                this.deliveryDetails.warehouse_search = warehouse.DescriptionRu;
                this.deliveryDetails.warehouse = warehouse;
                this.warehouses = [];
                this.deliveryDetails.wh_search_visible = false;
            },*/
            debounceSearch(val) {
                if( this.deliveryDetails.country === 'Украина' ) {
                    if (val || val !== '') {
                        this.deliveryDetails.search_visible = true;
                    }

                    if (this.search_timeout) clearTimeout(this.search_timeout);
                    var that = this;
                    this.search_timeout = setTimeout(function () {
                        that.fetchCities(val);
                    }, 500);
                }
            },
            /*debounceWarehouseSearch(val) {
                if (val || val !== '') {
                    this.deliveryDetails.wh_search_visible = true;
                }

                if (this.search_timeout) clearTimeout(this.search_timeout);
                var that = this;
                this.search_timeout = setTimeout(function () {
                    that.fetchWarehouses(val);
                }, 500);
            },*/
            countryChange( country ) {
                this.deliveryDetails.city = '';
                this.deliveryDetails.city = '';
            },
            incQtyProductInCart: function (entry_index) {
                this.$store.commit('addQuantity', entry_index);
            },
            decQtyProductInCart: function (entry_index) {
                this.$store.commit('removeQuantity', entry_index);
            },
        },
    }
</script>

<style lang="scss">

    @import "../assets/scss/variables";

    /* Desktop + mobile */
    .cart-page {
        background-color: $c_dark_white;
        .cart-title {
            margin-top: $vw_34;
        }
        .cart-container {
            display: flex;
            justify-content: space-between;
            .cart-page-products {
                .container {
                    background: transparent;
                }
            }
        }
        .cart-page-products {
            width: calc(100vw - (#{$vw_610} + #{$vw_34}));
        }
        .cart-page-sidebar {
            overflow-x: hidden;
            height: calc(100vh - #{$vw_55});
            background-color: $c_white;
            .form {

                // ToDO move it to normalize.scss
                label {
                    color: $c_black_light;
                    font-size: $vw_16;
                    display: block;
                    &.highlight {
                        color: red;
                    }
                }
                input, textarea, select {
                    outline: none;
                    font-size: $vw_21;
                    font-weight: 600;
                    display: block;
                    margin: 0;
                    border: none;
                    width: 100%;
                    box-sizing: border-box;
                    background-color: $c_dark_white;
                }
                select {
                    height: $vw_42;
                }
                input, select {
                    line-height: $vw_42;
                    padding: 0;
                    text-transform: uppercase;
                }
                .field-container {
                    margin-bottom: $vw_21;
                    position: relative;
                    background-color: $c_dark_white;
                    border-radius: $vw_3;
                    padding-top: $vw_5;
                    padding-left: $vw_8;
                    padding-right: $vw_8;
                    .field-suggestions {
                        position: absolute;
                        left: 0;
                        top: $vw_68;
                        max-height: $vw_377;
                        overflow-y: scroll;
                        background-color: $c_dark_white;
                        width: 100%;
                        z-index: 10033;
                        .field-suggestion {
                            height: $vw_34;
                            font-size: $vw_16;
                            line-height: $vw_34;
                            padding: 0 $vw_21;
                            color: $c_black;
                            cursor: pointer;
                            overflow-y: hidden;
                            &:hover {
                                background-color: $c_grey_light;
                            }
                        }
                    }
                    .v-select {
                        font-size: var(--vw_21);
                        &.vs--open {
                            .vs__selected {
                                display: none;
                            }
                        }
                        .vs__dropdown-toggle {
                            .vs__selected-options {
                                .vs__selected {
                                    position: absolute;
                                    line-height: var( --vw_42 );
                                    text-transform: uppercase;
                                }
                            }
                            .vs__actions {
                                display: none;
                            }
                        }
                        ul.vs__dropdown-menu {
                            list-style-type: none;
                            padding-top: var( --vw_21 );
                            max-height: calc( #{$vw_377} + #{$vw_8} );
                            overflow: scroll;
                            position: absolute;
                            left: 0;
                            z-index: 100;
                            background-color: $c_dark_white;
                            width: 100%;
                            border: var( --vw_2 ) solid $c_grey2;
                            box-sizing: border-box;
                            li {
                                line-height: var( --vw_42 );
                                padding-left: var( --vw_13 );
                                cursor: pointer;
                                color: $c_black_light;
                                &:hover {
                                    background-color: $c_grey_light;
                                }
                            }
                        }
                    }
                }
                .form-row {
                    width: 100%;
                }
            }
        }
        .products-in-cart {
            padding-bottom: $vw_42;
            max-height: calc(100vh - (#{$vw_55 * 7 + $vw_89}));
            margin-right: -$vw_55;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        .single-product-in-cart {
            &:first-child {
                margin-top: 0;
            }
            display: flex;
            width: calc(100% - #{$vw_55});
            border-radius: $vw_5;
            justify-content: space-between;
            align-items: center;
            background-color: $c_white;
            margin-top: $vw_21;
            box-sizing: border-box;
            position: relative;
            .left-container {
                box-sizing: border-box;
                padding: $vw_13;
                width: $vw_377;
            }
            .left-container,
            .right-container {
                height: 100%;
                display: flex;
                align-items: center;
                .product-data {
                    display: flex;
                }
            }
            .product-img {
                width: auto;
                height: 100%;
                object-fit: cover;
            }
            .product-title {
                padding-left: $vw_21;
                font-size: $vw_21;
                text-transform: uppercase;
                color: $c_grey_dark;
                .name a {
                    font-weight: bold;
                    text-decoration: none;
                    color: $c_grey_dark;
                }
            }
            .product-counter,
            .product-male,
            .product-size,
            .product-price {
                border-left: 1px solid $c_dark_white;
                font-weight: bold;
                font-size: $vw_21;
                text-transform: uppercase;
                //height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                    font-weight: normal;
                    padding-left: $vw_5;
                }
            }
            .product-counter {
                width: $vw_178;
                border-left: none;
                .article-qty {
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
                    .qty {
                        font-weight: bold !important;
                        vertical-align: text-bottom;
                    }
                }
            }
            .product-male {
                width: $vw_178;
            }
            .product-price {
                width: $vw_233;
            }
            .product-size {
                width: $vw_110;
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
        .cart-buy {
            padding-top: $vw_34;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .total {
                font-size: $vw_21;
                span {
                    font-weight: bold;
                }
            }
            button {
                font-size: $vw_21;
                font-weight: bold;
                text-transform: uppercase;
                display: block;
                background-color: $c_grey_dark;
                color: $c_white;
                padding:0 $vw_34;
                line-height: $vw_55;
                cursor: pointer;
                outline: none;
                margin: 0;
                border: none;
                transition: .3s;
                border-radius: $vw_26;
                &:hover {
                    transition: .3s;
                    background-color: $c_black;
                }
            }
        }
    }

    /* Desktop */
    @media only screen and (min-width: 768px) {
        .cart-page {
            .cart-container {
                min-height: 100vh;
                .cart-page-products {
                    .container {
                        .cart-title {
                            padding-top: var( --vw_144 );
                        }
                        .products-in-cart {
                            .single-product-in-cart {
                                height: auto;
                                .left-container {
                                    img {
                                        width: var(--vw_55);
                                    }
                                }
                            }
                        }
                    }
                }
                .cart-page-sidebar {
                    width: $one_third;
                    min-height: 100vh;
                    .container {
                        .cart-title {
                            padding-top: var( --vw_144 );
                        }
                        .form {
                            .field-count-2 {
                                display: flex;
                                justify-content: space-between;
                                .field-container {
                                    width: calc( ( 100% - var( --vw_55 ) ) / 2);
                                    textarea {
                                        line-height: var( --vw_34 );
                                        padding: var( --vw_13 );
                                        resize: none;
                                        height: var( --vw_144 );
                                    }
                                }
                            }
                            .field-container {
                                .v-select {
                                    .vs__dropdown-toggle {
                                        .vs__selected-options {
                                            .vs__selected {
                                                left: var(--vw_13);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        .cart-page {
            min-height: var(--screen_height_without_header);
            /* Products */
            .cart-container {
                display: block;
                .cart-page-products {
                    width: 100%;
                    .container {
                        position: relative;
                        padding-left: 0;
                        padding-right: 0;
                        .cart-title {
                            padding-top: var(--vw_144);
                            margin-top: 0;
                            font-size: var(--vw_55);
                            padding-left: var(--vw_55);
                            padding-right: var(--vw_55);
                            padding-bottom: var(--vw_42);
                            border-bottom: var(--vw_2) solid #ECF0F0;
                        }
                        .products-in-cart {
                            width: 100%;
                            padding-bottom: 0;
                            .single-product-in-cart {
                                width: 100%;
                                padding-right: var(--vw_55);
                                border-bottom: var(--vw_2) solid #ECF0F0;
                                .left-container {
                                    width: $two_thirds;
                                    padding-left: 0;
                                    padding-top: 0;
                                    padding-bottom: 0;
                                    img {
                                        width: var(--vw_288);
                                    }
                                    .product-title {
                                        font-size: var(--vw_42);
                                        line-height: var(--vw_68);
                                        padding-top: var(--vw_55);
                                        padding-bottom: var(--vw_55);
                                        .mobile-price {
                                            font-weight: bold;
                                        }
                                    }
                                }
                                .right-container {
                                    width: $one_third;
                                    position: absolute;
                                    right: 0;
                                    .product-counter {
                                        width: auto;
                                        position: absolute;
                                        bottom: var( --vw_68 );
                                        right: var( --vw_55 );
                                        .article-qty {
                                            .change-qty {
                                                margin-left: 0;
                                                margin-right: 0;
                                                img {
                                                    width: var(--vw_55);
                                                }
                                            }
                                            .qty {
                                                margin-left: var(--vw_42);
                                                margin-right: var(--vw_42);
                                                font-size: var(--vw_55);
                                            }
                                        }
                                    }
                                }
                                .product-remove {
                                    top: var( --vw_55 );
                                    right: var( --vw_55 );
                                    img {
                                        width: var( --vw_42 );
                                        height: var( --vw_42 );
                                    }
                                }
                            }
                        }
                        .cart-buy {
                            position: fixed;
                            height: var(--vw_233);
                            background-color: black;
                            bottom: 0;
                            right: 0;
                            left: calc(-1 * var(--vw_55));
                            z-index: 5;
                            .total {
                                font-size: var(--vw_55);
                                color: white;
                            }
                            & > button {
                                font-size: var(--vw_42);
                                height: var(--vw_110);
                                border-radius: calc( var(--vw_110) / 2 );
                                margin-right: var(--vw_55);
                                margin-left: var(--vw_55);
                                padding-left: var(--vw_55);
                                padding-right: var(--vw_55);
                                &:hover {
                                    background-color: $c_grey_dark;
                                }
                            }
                        }
                    }
                }
            }

            /* Delivery */
            .cart-container {
                .cart-page-sidebar {
                    display: block;
                    width: 100%;
                    .container {
                        padding-left: 0;
                        padding-right: 0;
                        //min-height: calc( var( --screen_height_without_header ) - var( --vw_110 ) );
                        .cart-title {
                            font-size: var(--vw_55);
                            padding-left: var(--vw_55);
                            padding-right: var(--vw_55);
                            padding-top: var(--vw_233);
                            padding-bottom: var(--vw_42);
                            background-color: $c_dark_white;
                            margin-top: 0;
                            border-bottom: var(--vw_2) solid #ECF0F0;
                        }
                        .form {
                            .field-container {
                                padding-left: var(--vw_55);
                                padding-right: var(--vw_55);
                                padding-top: var(--vw_42);
                                padding-bottom: var(--vw_42);
                                margin-bottom: 0;
                                background-color: inherit;
                                border-bottom: var(--vw_2) solid #ECF0F0;
                                label {
                                    font-size: var(--vw_42);
                                    margin-bottom: var(--vw_34);
                                }
                                input, textarea {
                                    font-size: var(--vw_55);
                                    background-color: inherit;
                                }
                                .field-suggestions {
                                    display: none;
                                }
                                .v-select {
                                    font-size: var(--vw_55);

                                    .vs__dropdown-toggle {
                                        .vs__selected-options {
                                            .vs__selected {
                                            }
                                        }
                                    }
                                    ul.vs__dropdown-menu {
                                        left: var( --vw_55 );
                                        max-height: var( --vw_610 );
                                        width: calc( 100% - var( --vw_110 ) );
                                        padding-top: var( --vw_55 );
                                        li {
                                            font-size: var( --vw_55 );
                                            line-height: var( --vw_89 );
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            & + .cart-sidebar + footer {
                display: none;
            }
        }
    }

</style>
