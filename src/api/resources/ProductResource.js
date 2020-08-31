import ApiSettings from '../ApiSettings'

/**
 *  API Resource
 */
export default {
    /**
     * Get Areas
     * @returns {*}
     */
    getProducts: function () {
        return ApiSettings.get('products')
    },

    getProduct: function (product_id) {
        return ApiSettings.get('products/' + product_id);
    },

    getProductSizes: function (product_id) {
        return ApiSettings.get('products/' + product_id + '/sizes')
    },

    getProductsByCategory: function (category) {
        return ApiSettings.get('products/category/' + category)
    },
}
