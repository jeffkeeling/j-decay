var React = require('react');
var ImageViewer = require('./ImageViewer');
var Controls = require('./Controls');

var App = React.createClass({
    render: function() {
        return (
            <div> <ImageViewer />  <Controls /> </div>
        )
    }
});

module.exports= App;