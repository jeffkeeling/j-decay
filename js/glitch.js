var glitch = function(image, args) {
    var jpgHeaderLength;
    var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var base64Map = base64Chars.split("");
    
    var detectJpegHeaderSize = function (data) {
        var jpgHeaderLength = 417;
        for (var i = 0, l = data.length; i < l; i++) {
            if (data[i] == 0xFF && data[i+1] == 0xDA) {
                //console.log("xxxxxxx<<<<", data[i], data[i+1], i, l);
               return jpgHeaderLength = i + 2;
            }
        }
    }; 
     
    // base64 is 2^6, byte is 2^8, every 4 base64 values create three bytes
    var base64ToByteArray= function (str, reverseBase64Map) {
        var result = [], digitNum, cur, prev;
        for (var i = 23, l = str.length; i < l; i++) {
            cur = reverseBase64Map[str.charAt(i)];
            digitNum = (i-23) % 4;
            switch(digitNum){
                //case 0: first digit - do nothing, not enough info to work with
                case 1: //second digit
                    result.push(prev << 2 | cur >> 4);
                    break;
                case 2: //third digit
                    result.push((prev & 0x0f) << 4 | cur >> 2);
                    break;
                case 3: //fourth digit
                    result.push((prev & 3) << 6 | cur);
                    break;
            }
            prev = cur;
        }
        return result;
    };
    
    var byteArrayToBase64= function (arr, base64Map) {
       var result = ["data:image/jpeg;base64,"], byteNum, cur, prev;
        for (var i = 0, l = arr.length; i < l; i++) {
            cur = arr[i];
            byteNum = i % 3;
            switch (byteNum) {
                case 0: //first byte
                    result.push(base64Map[cur >> 2]);
                    break;
                case 1: //second byte
                    result.push(base64Map[(prev & 3) << 4 | (cur >> 4)]);
                    break;
                case 2: //third byte
                    result.push(base64Map[(prev & 0x0f) << 2 | (cur >> 6)]);
                    result.push(base64Map[cur & 0x3f]);
                    break;
            }
            prev = cur;
        }
        if (byteNum == 0) {
            result.push(base64Map[(prev & 3) << 4]);
            result.push("==");
        } else if (byteNum == 1) {
            result.push(base64Map[(prev & 0x0f) << 2]);
            result.push("="); 
        }
        return result.join("");
    };
    
    var glitchJpegBytes = function (strArr, jpgHeaderLength) {
        var rnd = Math.floor(jpgHeaderLength + Math.random() * (strArr.length - jpgHeaderLength - 4));
        strArr[rnd] = Math.floor(Math.random() * 256);
    };
    
    var glitchJpeg = function (imgDataArr, jpgHeaderLength, base64Map) {
        var glitchCopy = imgDataArr.slice();
        for (var i = 0; i < 10; i++) {
            glitchJpegBytes(glitchCopy, jpgHeaderLength);
        }
        
        return byteArrayToBase64(glitchCopy, base64Map);
    };
    
    var reverseBase64Map = {}; base64Map.forEach(function(val, key) { reverseBase64Map[val] = key} );
    
    var imgDataArr = base64ToByteArray(image, reverseBase64Map);
    var jpgHeaderLength = detectJpegHeaderSize(imgDataArr);
    var glitchedImage =  glitchJpeg(imgDataArr, jpgHeaderLength, base64Map);
    return glitchedImage;
};

module.exports = glitch; 