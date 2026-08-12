export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const target = new URL('http://152.136.62.34:80/tts/audio' + url.search);

  const res = await fetch(target.toString(), {
    method: req.method,
    headers: { 'Content-Type': req.headers.get('Content-Type') || 'application/json' },
    body: req.method !== 'GET' ? req.body : undefined,
  });

  const headers = new Headers();
  headers.set('Content-Type', res.headers.get('Content-Type') || 'audio/mpeg');
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(res.body, { status: res.status, headers });
}
