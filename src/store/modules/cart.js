export default {
    state: {
        cart: [],
        deliveryDetails: {
            full_name: null,
            phone: null,
            country: 'Украина',
            area: 'Одесская',
            city: null,
            np_department: null,
            comment: null,
        },
    },
    getters: {
        cart: state => {
            return state.cart;
        },
        deliveryDetails: state => state.deliveryDetails,
        cartTotal: state => {
            let total = 0;

            state.cart.forEach((entry) => {
                return total += entry.product.price * entry.quantity;
            });

            return total;
        },
    },
    mutations: {
        addVariationToCart: function (state, data) {
            if (state.cart.filter(entry => entry.variation.id === data.variation.id).length === 0) {
                state.cart.push(data);
            }
        },
        removeVariationFromCart: function (state, entry_index) {
            state.cart.splice(entry_index, 1)
        },
        addQuantity: function (state, entry_index) {
            state.cart[entry_index].quantity = state.cart[entry_index].quantity + 1;

            if (state.cart[entry_index].quantity > state.cart[entry_index].variation.quantity) {
                state.cart[entry_index].quantity = state.cart[entry_index].variation.quantity;
            }
        },
        removeQuantity: function (state, entry_index) {
            state.cart[entry_index].quantity = state.cart[entry_index].quantity - 1;

            if (state.cart[entry_index].quantity < 1) {
                state.cart[entry_index].quantity = 1;
            }
        },
        clearCart: function (state) {
            state.cart = [];
        },
        setDeliveryDetails: function (state, data) {
            state.deliveryDetails.phone = data.phone;
            state.deliveryDetails.full_name = data.full_name;
        }
    },
    actions: {
        addVariationToCart: function (context, data) {
            context.commit('addVariationToCart', data)
        },
        removeVariationFromCart: function (context, entry_index) {
            context.commit('removeVariationFromCart', entry_index)
        },
        addQuantity: function (context, entry_index) {
            context.commit('addQuantity', entry_index)
        },
        removeQuantity: function (context, entry_index) {
            context.commit('removeQuantity', entry_index)
        },
        setDeliveryDetails: function (context, data) {
            context.commit('setDeliveryDetails', data)
        },
        clearCart: function (context) {
            context.commit('clearCart');
        }
    },
}
