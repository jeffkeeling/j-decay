var React = require('react');
var classNames = require('classnames');
 
var ScanLineHeight = React.createClass({
    handleChange: function(e) {

        var updateObj = {
            id: this.props.allValues.id,
            num: e.target.value
        }
        this.props.rangeUpdated(updateObj)
    },

    render: function() {
        var inputData = this.props.allValues;
        var controlContainerClass = classNames('single-control', inputData.className + '-container');

        return (
            <div className={controlContainerClass}>
                <label htmlFor={inputData.className}>{inputData.label}</label>
                <input className={inputData.className} type={inputData.type} min={inputData.min} step={inputData.step} max={inputData.max} value={inputData.value} onChange={this.handleChange}  />
                <span className="range-control-value">{inputData.value}</span>
            </div>
        ) 
    }
});

module.exports= ScanLineHeight; 