var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');

var glitch = require('./glitch');
var filterImage = require('./filter');

var imageViewStore = require('./stores/imageViewStore');
var imageViewActions = require('./actions/imageViewActions');
var controlsStore = require('./stores/controlsStore');

var ImageViewer = React.createClass({

    getInitialState: function() {
        return { 
            hover: false,
            sourceImage: imageViewStore.getSourceImage(),
            controls: controlsStore.getAllRanges(),
            imageObject: new Image(),
            sourceImageObject: '',
            filterSource: false,
            filterCanvas: true,
            applyFilter: false
        }
    },

    componentDidMount: function() {
        imageViewStore.addChangeListener(this._onChange);
        controlsStore.addChangeListener(this.reloadSource);
    },

    componentWillUnmount: function() { 
        imageViewStore.removeChangeListener(this._onChange);
        controlsStore.removeChangeListener(this.reloadSource);
    },

    _onChange: function() {
        this.setState({
            sourceImage: imageViewStore.getSourceImage(),
            sourceImageObject: URL.createObjectURL(imageViewStore.getSourceImage())
        });
    },

    onDrop: function (e) {
        e.preventDefault();
        var file = e.nativeEvent.dataTransfer.files[0];
        this.dragEnd();
        this.updateImageInStore(file);
    },

    fileInputChanged: function(e) {
        var file = e.nativeEvent.target.files[0];
        this.updateImageInStore(file);
    },

    updateImageInStore: function(file) {
        imageViewActions.updateSourceImage(file);
    },

    dragEnter: function(e) {
        e.preventDefault();
        
        // add border styling
        this.setState({
            hover: true
        });
    },

    dragOver: function(e) {
        // necessary for drop to function in react
        e.preventDefault();
    },

    dragEnd: function() {
        // remove border styling
        this.setState({
            hover: false
        });
    },

    componentDidUpdate: function() {
        //run canvas after dom updated
        this.processCanvas();
    },

    processCanvas: function() {
        if (this.state.sourceImage){
            var that = this;

            var canvas = document.getElementsByTagName("canvas")[0];

            var ctx = canvas.getContext("2d");

            // ajust canvas on image load
            this.state.imageObject.onload = function() {
                //set canvas size to scale image correctly
                var MAX_HEIGHT = 225;
                var MAX_WIDTH = 300;
                if(this.height > MAX_HEIGHT) {
                    this.width *= MAX_HEIGHT / this.height;
                    this.height = MAX_HEIGHT;
                } else if(this.width > MAX_WIDTH) {
                    this.width = MAX_WIDTH;
                    this.height *= MAX_WIDTH / this.width;
                }
                canvas.width = this.width;
                canvas.height = this.height;

                ctx.drawImage(that.state.imageObject, 0, 0, this.width, this.height);

                if(that.state.applyFilter) {

                    that.state.applyFilter = false;
                    that.applyFilter();
                }
            }; 
 

            this.state.imageObject.src = URL.createObjectURL(this.state.sourceImage);
                        
        }
    },
    
    filterCheck: function (e) {

        if(e.target.value === 'source') {
            this.setState({
                filterSource: true,
                filterCanvas : false
            });
           
        } else {
            this.setState({
                filterSource: false,
                filterCanvas : true
            });
        }
        
    },

    reloadSource: function() {
        if (this.state.filterSource) {
            this.setState({
                applyFilter: true
            });
            this.processCanvas();
        }else {
            this.applyFilter();
        }
        
    },

    applyFilter: function() {
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext("2d");
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var filteredImage = filterImage(imageData, this.state.controls)
        ctx.putImageData(filteredImage, 0, 0);
    },

    glitchImage: function() {
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext("2d");
        var imgData = canvas.toDataURL("image/jpeg");
        var result = glitch(imgData); 
        this.state.imageObject.src = result;
    },
    
    reEncodeImage: function() {
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext("2d");
        var dataURL = canvas.toDataURL('image/jpeg', 0.0);
        this.state.imageObject.src = dataURL;
    },

    saveImage : function() {
        var button = document.getElementsByClassName('saveImage')[0];
        var canvas = document.getElementsByTagName("canvas")[0];
        var dataURL = canvas.toDataURL('image/png');
        button.href = dataURL;
    },

    resetImage: function() {
        this.state.imageObject.src = this.state.sourceImageObject;
    },

    render: function() {
        //set canvas class
        var canvasClass = classNames('image-processor', {'hovered': this.state.hover}, {'empty': !this.state.sourceImageObject});
        var dropMessageClass = classNames('drop-message', {'hidden': this.state.sourceImageObject});
        //set canvas image
        return (
            <div>
                <h1>J-Decay</h1>
                <div className="canvas-container" >
                    <div className={dropMessageClass}>Drop Image Here</div>
                    <canvas className={canvasClass} width="300" height="225" onDrop={this.onDrop} onDragOver={this.dragOver}  onDragEnter={this.dragEnter}  onDragLeave={this.dragEnd} ></canvas>
                    
                    <div className="primary-buttons">
                        <input type="file" onChange={this.fileInputChanged} />
                        <button className="reset" onClick={this.resetImage}>Reset Image</button>
                        <button className="glitchImage" onClick={this.glitchImage}>Glitch Image</button>
                        <button className="jpegCompress" onClick={this.reEncodeImage}>JPEG Compress</button>
                        <a href="#" className="saveImage" onClick={this.saveImage}><button>Download</button></a>
                    </div>
                </div>
                <div className="filter-top-level">
                    <h2>Inky Xerox Controls</h2>
                    <p>automatically applies when controls are adjusted</p>
                    <input type="radio" name="filterCheck" value="source" onChange={this.filterCheck} checked={this.state.filterSource} /><span className="radio-label">Apply to original image</span>
                    <input type="radio" name="filterCheck" value="canvas" onChange={this.filterCheck} checked={this.state.filterCanvas} /><span className="radio-label">Apply to current image</span>
                    <button className="applyFilter" onClick={this.reloadSource}>Apply Xeroxy</button>
                </div>
            </div>
        );
    }
});

module.exports = ImageViewer;