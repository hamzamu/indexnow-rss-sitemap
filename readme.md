# IndexNow Script for Sitemap.xml and RSS Feed

As IndexNow becomes the trend for several Search Engines now starting with Bing.com,
It is important to submit new and updated links directly using IndexNow protocol.

- [Why IndexNow is a Must-Enable Feature for Websites After November 2024](https://medevel.com/why-indexnow-is-a-must/)
- [Surviving IndexNow - 10 Free IndexNow Plugins and Scripts to Boost Content Indexing](https://medevel.com/indexnow-must-be/)


I created this script quickly in order to automatically submit the new pages using RSS or Sitemap.xml.


### Install
```bash
git clone https://github.com/hamzamu/indexnow-rss-sitemap?tab=readme-ov-file
cd indexnow-rss-sitemap
npm install
```

### Config

The following is the .env file.
First you need to get your IndexNow key from: https://www.bing.com/indexnow

Configure yoursite.

The add the key and URL here.

```env
RSS_FEED_URL= YOUR FEED
SITEMAP_URL=
INDEXNOW_API_KEY=YOUR KEY
```
You need only your RSS feed or Sitemap.xml URL.

### Run
By then you can run the script.
`node main.js`

If everything goes as expected:

```bash
Fetching RSS feed...
Found 50 URLs. Sending to IndexNow...
URLs successfully submitted to IndexNow.
```

### License

MIT License
