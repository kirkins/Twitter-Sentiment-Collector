# Twitter Sentiment Collector

A node.js script for mining and viewing twitter sentiment on your local machine. 

## Configuration
1. Go to apps.twitter.com and create an application.
2. Record your consumer key, consumer secret, access token, and access secret.
3. open '/config/config.js' and update values with the credentials from step 2.

## usage
    git clone https://github.com/kirkins/Twiiter-Sentiment-Collector.git
    cd Twitter-Sentiment-Collector
    npm install
    node mine.js "search term"
    
open another tab (ctrl+shift+t)
    
    node graph.js

You'll now be able to see a list of search data in your browser at localhost:3000

![graph picture](http://imgur.com/a/uTxur)

![graph picture](http://imgur.com/a/9RxLU)
