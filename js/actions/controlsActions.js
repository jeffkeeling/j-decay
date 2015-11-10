var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var controlsActions = {
    updateLine: function(value) {

        AppDispatcher.handleAction({
            actionType: appConstants.UPDATE_LINE,
            data:value
        });
    }
};

module.exports = controlsActions;