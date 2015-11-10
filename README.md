watchify -v -o build/js/App.js js/AppTest.js

# J-Decay
J-Decay is a javascript application for deteriorating an image in a number of ways. It was built using React.js, Flux, and the canvas element.

Try out the demo [here](mylink).

For best results, use in Firefox or Chrome. 
Safari does not support the color picker and the glitching along with JPEG compression are unsatisfactory.

## Features 
- Glitch image
- Run JPEG compression degradation
- Convert image to 4 different color thresholds
- Select color for each threshold
- Mimic monitor scanline with adjustable line and gap heights
- Add grain to image

## to do add screenshot

### Hooks
The included hooks will update the update manifest and README to account for new versions of the extension as well as provide a canonical link to the extension on the gh-pages branch.

Symlink the hooks like so:

```
ln -s ../../pre-commit.sh .git/hooks/pre-commit
ln -s ../../pre-commit-file-update.py .git/hooks/pre-commit-file-update.py
ln -s ../../post-commit.sh .git/hooks/post-commit
```

The gh-pages page fetches the most up-to-date README data from the Master branch using the steps outline in [GithubDocSync](https://github.com/bradrhodes/GithubDocSync)

## Special Thanks
- Glitching function based on work done by [smackmyglitchupjs](https://github.com/Hugosslade/smackmyglitchupjs)
- Glitching inspiration from [UCNV](http://ucnv.github.io/pnglitch/)

## Version History

### 1.0
 - Most basic functionality reached
 - glitch jpeg
 - jpeg compress
 - 4 color thresholds
 - adjustable scanlines

## Author
Jeff Keeling

http://jeffkeeling.me