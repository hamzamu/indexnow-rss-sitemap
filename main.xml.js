require("dotenv").config();
const axios = require("axios");
const { parseStringPromise } = require("xml2js");

// Load environment variables
const API_KEY = process.env.API_KEY;
const SITEMAP_URL = process.env.SITEMAP_URL;

// IndexNow API endpoint
const INDEXNOW_ENDPOINT = "https://www.bing.com/indexnow";

// Fetch and parse the XML sitemap
async function fetchAndParseSitemap() {
  try {
    if (!API_KEY || !SITEMAP_URL) {
      throw new Error("API_KEY or SITEMAP_URL is missing in the .env file.");
    }

    console.log(`Fetching sitemap from: ${SITEMAP_URL}`);
    const response = await axios.get(SITEMAP_URL);
    const xml = response.data;

    console.log("Parsing XML sitemap...");
    const parsedSitemap = await parseStringPromise(xml);

    // Extract URLs from the parsed XML
    const urls = parsedSitemap.urlset.url.map((urlObj) => urlObj.loc[0]);

    if (urls.length === 0) {
      console.log("No URLs found in the sitemap.");
      return;
    }

    console.log(`Found ${urls.length} URLs. Sending to IndexNow...`);
    await submitToIndexNow(urls);
  } catch (error) {
    console.error("Error fetching or parsing sitemap:", error.message);
  }
}

// Submit URLs to IndexNow
async function submitToIndexNow(urls) {
  try {
    const payload = {
      host: new URL(urls[0]).host, // Extract the host from the first URL
      key: API_KEY,
      keyLocation: `https://${new URL(urls[0]).host}/indexnow-key.txt`,
      urls,
    };

    const response = await axios.post(INDEXNOW_ENDPOINT, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("URLs successfully submitted to IndexNow.");
    } else {
      console.error("Failed to submit URLs to IndexNow:", response.data);
    }
  } catch (error) {
    console.error("Error submitting to IndexNow:", error.message);
  }
}

// Run the script
fetchAndParseSitemap();
