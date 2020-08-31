import ApiSettings from '../ApiSettings'

/**
 *  API Resource
 */
export default {

    getLookbooks: function () {
        return ApiSettings.get('lookbooks');
    },

    getLookbook: function(id) {
        return ApiSettings.get('lookbooks/'+id);
    }

}
