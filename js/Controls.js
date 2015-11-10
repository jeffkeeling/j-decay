var React = require('react');
var _ = require('lodash');
var SingleControl = require('./SingleControl');
var controlsStore = require('./stores/controlsStore');
var controlsActions = require('./actions/controlsActions');
var Controls = React.createClass({

    getInitialState: function() {

        return {
            ranges: controlsStore.getAllRanges()
        }
    },

    componentDidMount: function() {
        controlsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() { 
        controlsStore.removeChangeListener(this._onChange);
    },

    rangeUpdated: function(updateObj) {

        controlsActions.updateLine(updateObj);
    },

    _onChange: function() {

        this.setState({
            ranges: controlsStore.getAllRanges()
        })
    },

    render: function() {

        var rangesControls = [];
        var that = this;

        _.forIn(this.state.ranges, function(range) {

            rangesControls.push(<SingleControl allValues={range} key={range.id} rangeUpdated={that.rangeUpdated}  />);
        });

        return (
            <div className="controls-container">
                <div>
                    {rangesControls}
                </div>
            </div>
        )
    }
});

module.exports= Controls;