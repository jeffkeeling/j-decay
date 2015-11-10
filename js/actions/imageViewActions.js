var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var controlsActions = {
    updateSourceImage: function(file) {

        AppDispatcher.handleAction({
            actionType: appConstants.UPDATE_IMAGE,
            data:file
        });
    }
};

module.exports = controlsActions;