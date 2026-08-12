const https = require('https');
const http = require('http');

module.exports = async function handler(req, res) {
  const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  const targetUrl = `http://152.136.62.34:80/tts/audio${qs}`;

  res.setHeader('Access-Control-Allow-Origin', '*');

  return new Promise((resolve, reject) => {
    const proxy = http.get(targetUrl, (upstream) => {
      res.status(upstream.statusCode);
      res.setHeader('Content-Type', upstream.headers['content-type'] || 'audio/mpeg');
      upstream.pipe(res);
      upstream.on('end', resolve);
    });
    proxy.on('error', (err) => {
      res.status(502).send('TTS proxy error: ' + err.message);
      resolve();
    });
  });
};
