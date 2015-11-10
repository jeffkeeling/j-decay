var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _store = [
   {
        value: 5,
        active: true,
        type: 'range',
        label: 'Scan Line Height',
        className: 'scan-line-height',
        id: 0,
        min:1,
        max: 10,
        step: 1
    },
    {
        value: 1,
        active: true,
        type: 'range',
        label: 'Scan Line Gap Height',
        className: 'scan-line-gap-height',
        id: 1,
        min:0,
        max: 10,
        step: 1
    },
     {
        value: 100,
        active: true,
        type: 'range',
        label: 'Apply Color 1 to parts of image below selected (blacks)',
        className: 'darkest-range',
        id: 2,
        min:0,
        max: 255,
        step: 5
    },
    {
        value: '#000000',
        valueRgb: { r: 0, g: 0, b: 0 },
        active: true,
        type: 'color',
        label: 'Color 1',
        className: 'color1',
        id: 3
    },
    {
        value: 180,
        active: true,
        type: 'range',
        label: 'Apply Color 2 to parts of image below selected (dark grays)',
        className: 'mid-dark-range',
        id: 4,
        min:0,
        max: 255,
        step: 5
    },
    {
        value: '#52ff38',
        valueRgb: { r: 82, g: 255, b: 56 },
        active: true,
        type: 'color',
        label: 'Color 2',
        className: 'color2',
        id: 5
    },
    {
        value: 200,
        active: true,
        type: 'range',
        label: 'Apply Color 3 to parts of image below selected (light grays)',
        className: 'mid-light-range',
        id: 6,
        min:0,
        max: 255,
        step: 5
    },
    {
        value: '#4f4f50',
        valueRgb: { r: 79, g: 79, b: 80 },
        active: true,
        type: 'color',
        label: 'Color 3',
        className: 'color3',
        id: 7
    },
    {
        value: '#ffffff',
        valueRgb: { r: 255, g: 255, b: 255 },
        active: true,
        type: 'color',
        label: 'Color 4 is applied to parts of image above Color 3 (whites)',
        className: 'color4',
        id: 8
    }
];

var updateLine = function(data){

    var result = _.findWhere(_store, {'id': data.id});

    result.value = data.num;

    if(result.type === 'color') {
        result.valueRgb = hexToRgb(result.value);
    }
};

var controlsStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },

    getAllRanges: function() {

        return _store;
    },
});

var hexToRgb = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.UPDATE_LINE:

            updateLine(action.data);
            controlsStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = controlsStore;