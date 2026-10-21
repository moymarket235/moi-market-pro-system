const CACHE_NAME = 'moi-market-pro-shell-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/app-icon.svg', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r=e.request, u=new URL(r.url); if(r.method!=='GET'||u.origin!==self.location.origin||u.pathname.includes('/api/')) return;
  if(r.mode==='navigate') { e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',c));}return res;}).catch(()=>caches.match('./index.html').then(c=>c||caches.match('./')))); return; }
  e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{if(res.ok&&res.type==='basic'){const copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(r,copy));}return res;})));
});
