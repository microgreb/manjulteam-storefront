import ApiSettings from '../ApiSettings'

/**
 *  API Resource
 */
export default {


    getDeliveryAreas: function () {
        return ApiSettings.get('delivery/areas');
    },


    getCities: function (area, query) {
        return ApiSettings.post('delivery/areas/cities/query', {
            area: area,
            search: query
        });
    },

    getWarehouses: function (city, query) {
        return ApiSettings.post('delivery/areas/cities/warehouses', {
            city: city,
            search: query
        });
    },
}
