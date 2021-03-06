# J-Decay
J-Decay is a javascript application for deteriorating an image in a number of ways. It was built using React.js, Flux, and the canvas element.

Try out the demo [here](http://jeffkeeling.github.io/j-decay/).

For best results, use in Firefox or Chrome. 
Safari does not support the color picker and the glitching along with JPEG compression are unsatisfactory.

## Features 
- Glitch image
- Run JPEG compression degradation
- Convert image to 4 different color thresholds
- Select color for each threshold
- Mimic monitor scanline with adjustable line and gap heights
- Add grain to image

## Build
1. Install watchify globally
```npm install -g watchify```

2. Install other project dependencies
```npm install```

3. listen for updates
```watchify -v -o build/js/App.js js/AppTest.js```

## Special Thanks
- Glitching function based on work done by [smackmyglitchupjs](https://github.com/Hugosslade/smackmyglitchupjs)
- Glitching inspiration from [UCNV](http://ucnv.github.io/pnglitch/)

## Author
Jeff Keeling

http://jeffkeeling.me