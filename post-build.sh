perl -pi -e 's/4630EB/000000/g' web-build/index.html
perl -pi -e 's/A Neat Expo App/Media Viewer/g' web-build/index.html
perl -pi -e 's/favicon.ico/favicon.png/g' web-build/index.html
cp assets/favicon.png web-build/favicon.png