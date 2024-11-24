require("dotenv").config();
const RSSParser = require("rss-parser");
const axios = require("axios");

// Load environment variables
const RSS_FEED_URL = process.env.RSS_FEED_URL;
const INDEXNOW_API_KEY = process.env.INDEXNOW_API_KEY;

// The IndexNow API endpoint
const INDEXNOW_ENDPOINT = "https://www.bing.com/indexnow";

const rssParser = new RSSParser();

async function fetchRSSFeed() {
  console.log(RSS_FEED_URL, INDEXNOW_API_KEY);

  if (!RSS_FEED_URL || !INDEXNOW_API_KEY) {
    console.error("Missing RSS_FEED_URL or INDEXNOW_API_KEY in the .env file.");
    return;
  }

  try {
    console.log("Fetching RSS feed...");
    const feed = await rssParser.parseURL(RSS_FEED_URL);

    // Extract all URLs from the RSS feed
    const urls = feed.items.map((item) => item.link);

    if (urls.length === 0) {
      console.log("No URLs found in the RSS feed.");
      return;
    }

    console.log(`Found ${urls.length} URLs. Sending to IndexNow...`);

    // Submit the URLs to IndexNow
    await submitToIndexNow(urls);
  } catch (error) {
    console.error("Error fetching RSS feed:", error.message);
  }
}

async function submitToIndexNow(urls) {
  // console.log(urls);
  try {
    const payload = {
      host: new URL(urls[0]).host, // Extract the host from the first URL
      key: INDEXNOW_API_KEY,
      keyLocation: `https://${new URL(urls[0]).host}/${INDEXNOW_API_KEY}.txt`,
      urlList: urls,
    };

    // console.log(payload);

    const response = await axios.post(INDEXNOW_ENDPOINT, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("URLs successfully submitted to IndexNow.");
    } else {
      // console.log(response);
      console.error("Failed to submit URLs to IndexNow:", response.data);
    }
  } catch (error) {
    console.error("Error submitting to IndexNow:", error.message);
  }
}

// Run the script
fetchRSSFeed();
