# Twitter Sentiment Collector

A node.js script for mining and viewing twitter sentiment on your local machine. 

[![Video demo](https://blog.graniteapps.co/content/images/2016/09/Screenshot-from-2016-09-28-00-01-07-1.png)](https://www.youtube.com/watch?v=VsPk9lWuktg)

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

The first script will continue mining 100 tweets a minute. You can also open multiple tabs and run multiple searches simeltaniously. 

You can experiment with increasing the speed at which tweets are requested from Twitter. I don't know at which point twitter restricts api access.
