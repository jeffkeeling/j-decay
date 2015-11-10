var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _store = {
    sourceImage: '',
    editedImage: '',
    canvasImg: ''
};

var updateImage = function(data){

    _store.sourceImage = data;

};

var controlsStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },

    getSourceImage: function() {

        return _store.sourceImage;
    },
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.UPDATE_IMAGE:

            updateImage(action.data);
            controlsStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = controlsStore;