// You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
// When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
// If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }

//HINT: Do not forget to use a body parsing middleware to handle the POST requests. 
//Also, you can use the function dns.lookup(host, cb) from the dns core module to verify a submitted URL.

const Url = require('../models/url.model');

const responseUrl = async (req, res) => {
    const url = req.body.url;

    const urlRegex = /^(http|https):\/\/[^ "]+$/;

    if (!urlRegex.test(url)) {
        return res.json({ error: 'invalid url' });
    }

    const existenceId = await Url.getIdByUrl(url);

    if (!existenceId) {
        const newUrl = await Url.addUrl(url);

        console.log(newUrl);

        return res.json({ original_url: newUrl.url, short_url: newUrl.id });
    } 

    return res.json({ original_url: url, short_url: existenceId.id });
};

const redirectToUrl = async (req, res) => {
    const shortUrl = req.params.shortUrl;

    const url = await Url.getUrlById(shortUrl);

    if (!url) {
        return res.json({ error: 'inexitence of url' });
    }

    if (url.url.includes('http')) {
        return res.redirect(url.url);
    }
}

module.exports = {
    responseUrl,
    redirectToUrl
};