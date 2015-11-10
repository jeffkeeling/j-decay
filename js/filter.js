var _ = require('lodash');

var addFilter = function(img, controls) {
    var analyzeImage = function (pixels, controls) {
        var d = pixels.data;
        var scanLineHeightCount = 0;
        var scanLineGapHeightCount = 0;
        var scanLineHeight = _.result(_.find(controls, {'className': 'scan-line-height'}),'value');
        var scanLineGapHeight =  _.result(_.find(controls, {'className': 'scan-line-gap-height'}),'value');
        var recolorArgs = {
            color1: _.result(_.find(controls, {'className': 'color1'}),'valueRgb'),
            color2: _.result(_.find(controls, {'className': 'color2'}),'valueRgb'),
            color3: _.result(_.find(controls, {'className': 'color3'}),'valueRgb'),
            color4: _.result(_.find(controls, {'className': 'color4'}),'valueRgb'),
            darkRange : _.result(_.find(controls, {'className': 'darkest-range'}),'value'),
            midDarkRange: _.result(_.find(controls, {'className': 'mid-dark-range'}),'value'),
            midLightRange: _.result(_.find(controls, {'className': 'mid-light-range'}),'value')
        }

        for (var i = 0; i < d.length; i += 4) {
           
            //fill scan line
            if (scanLineHeightCount < (pixels.width)*scanLineHeight ) {
                grayscale(d,i);
                reColorImage(d, i, recolorArgs);    
                scanLineHeightCount++;
            } 

            // file gap line
            else if (scanLineGapHeightCount <  (pixels.width) * scanLineGapHeight ){
                addLine(d, i, recolorArgs.color1);
                scanLineGapHeightCount++;
            } 

            //reset line count
            else {
                grayscale(d,i);
                reColorImage(d, i, recolorArgs);
                scanLineHeightCount = 1;
                scanLineGapHeightCount = 0;
            }

            addNoise(d, i);
            
        }

        return pixels;
    };

    var addLine=  function(d, k, color1) {
        
        d[k] = color1['r'];
        d[k + 1] = color1['g'];
        d[k + 2] = color1['b'];
    };


    var updateRGB = function(d, i,colorObj) {
        d[i] = colorObj['r'];
        d[i + 1] = colorObj['g'];
        d[i + 2] = colorObj['b'];
    };

    var grayscale = function(d, i) {
         //convert to grayscale
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
    };

    var reColorImage=  function(d, i, recolorArgs) {
        //Re-color in ranges
        
        if (d[i] < recolorArgs.darkRange) {
            updateRGB(d, i, recolorArgs.color1);
        } else if (d[i] < recolorArgs.midDarkRange) {
            updateRGB(d, i, recolorArgs.color2);
        } else if (d[i] < recolorArgs.midLightRange) {
            updateRGB(d, i, recolorArgs.color3);
        } else {
            updateRGB(d, i, recolorArgs.color4);
        }
    };

    var addNoise = function(d, i) {
        var num1 = Math.random();
        var num2 = Math.random();
        if (num1 > 0.8) {
            var noise = 255*num2;
            d[i] += noise;
            d[i + 1] += noise;
            d[i + 2] += noise;
        }
    };



    var filteredImage = analyzeImage(img, controls );

    return filteredImage;
};

module.exports = addFilter; 