import ApiSettings from '../ApiSettings'

/**
 *  API Resource
 */
export default {
    /**
     * Get Areas
     * @returns {*}
     */
    submitOrder: function (order) {
        return ApiSettings.post('orders',order)
    },

}
