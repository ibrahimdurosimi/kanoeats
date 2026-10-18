const https = require('https');
https.get('https://unsplash.com/napi/search/photos?query=morocco+architecture&per_page=1', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log(json.results[0].urls.regular);
    } catch (e) {
      console.log('Error parsing');
    }
  });
});
