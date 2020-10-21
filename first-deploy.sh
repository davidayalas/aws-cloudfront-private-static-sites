npm install serverless-s3-sync
npm --prefix ./backend/login install ./backend/login
cfendpoint=`sls info --verbose | awk -F"[: ]+" '/CloudFrontDNS/{print $2}'`
sed 's/cloudfrontendpoint/'"$cfendpoint"'/g' web/auth-sample.html > web/auth.html
sls s3sync