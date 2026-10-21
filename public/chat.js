(() => {
  'use strict';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const CHAT_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.9A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 9.5c.7 2 2 3.3 4.5 4.5"/></svg>';
  const SEARCH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>';
  const SEND_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
  const PHONE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.8L7.7 9.6a16 16 0 0 0 6.7 6.7l1.3-1.3a2 2 0 0 1 1.8-.6l2.8.5a2 2 0 0 1 1.7 2Z"/></svg>';
  const VIDEO_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>';
  const CLIP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m21.4 11.1-8.7 8.7a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/></svg>';
  const EMOJI_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.3 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>';
  const groups = {
    staff: {
      id:'staff', name:'Мой Маркет Сотрудники', subtitle:'Группа · 28 участников', avatar:'С', admin:false,
      preview:'Айдана: Инвентаризация эртең 09:00дө', time:'23:10', unread:3,
      messages:[
        {sender:'Айдана · Бишкек 1', initials:'А', text:'Саламатсыздарбы! Эртең инвентаризация саат 09:00дө башталат.', time:'09:12'},
        {sender:'Бакыт · Склад', initials:'Б', text:'Кабыл алдым. Складдын калдыктарын даярдап жатам.', time:'09:15'},
        {sender:'Азамат Исаев', initials:'АИ', text:'Рахмат! Баарыбыз отчетту смена бүткөнгө чейин жаңылайлы.', time:'09:18', own:true},
        {sender:'Нурбек · Ауэзова 17', initials:'Н', text:'Жаңы келген товарлар кабыл алынды. Документти да коштум.', time:'09:24'},
        {sender:'Азамат Исаев', initials:'АИ', text:'Түшүнүктүү. Кайсы товар аз калса, ушул топко жазыңыздар.', time:'09:26', own:true}
      ]
    },
    admins: {
      id:'admins', name:'Мой Маркет Администраторы', subtitle:'Администраторлор тобу · 5 катышуучу', avatar:'А', admin:true,
      preview:'Эрмек: Кассалык отчет даяр', time:'22:48', unread:1,
      messages:[
        {sender:'Эрмек · Администратор', initials:'Э', text:'Бүгүнкү кассалык отчет даяр. Филиалдар боюнча көрсөткүчтөр текшерилди.', time:'22:31'},
        {sender:'Азамат Исаев', initials:'АИ', text:'Рахмат. Эртеңкиге чейин айырмачылыктарды белгилеп коюңуз.', time:'22:35', own:true},
        {sender:'Айгүл · Администратор', initials:'А', text:'Бир филиалда складдагы калдыктарды кайра санап жатабыз.', time:'22:42'},
        {sender:'Эрмек · Администратор', initials:'Э', text:'Кассалык отчет даяр ✅', time:'22:48'}
      ]
    }
  };
  let activeGroup = 'staff';
  let pendingFile = null;
  let pendingObjectUrl = '';
  const activityItems = [
    {icon:'box', color:'blue', title:'Товар кабыл алынды', detail:'Бейшеналиева 20 · 12 позиция складга кошулду', time:'5 мүн.'},
    {icon:'trend', color:'green', title:'Сатуу жыйынтыгы жаңырды', detail:'Жибек-Жолу 671 · кассалык смена жабылды', time:'18 мүн.'},
    {icon:'warehouse', color:'gold', title:'Калдыгы аз товар белгиленди', detail:'Ауэзова 17 · 3 позиция текшерүүнү күтөт', time:'32 мүн.'},
    {icon:'users', color:'purple', title:'Кызматкер профили жаңырды', detail:'Токтогул 259/10 · байланыш маалыматы өзгөрдү', time:'1 саат'}
  ];
  function activityIcon(name){
    const icons={box:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/>',trend:'<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>',warehouse:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>'};
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]||icons.box}</svg>`;
  }
  function activityMarkup(){return `<article class="activity-panel"><header class="activity-head"><div><h2>Акыркы активдүүлүк</h2><p>Филиалдардагы акыркы өзгөрүүлөр · демо маалымат</p></div><button class="text-link" data-chat-open="staff">Чатка өтүү →</button></header><div class="activity-list">${activityItems.map(item=>`<div class="activity-row"><span class="activity-icon ${item.color}">${activityIcon(item.icon)}</span><span class="activity-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></span><time class="activity-time">${escapeHtml(item.time)}</time></div>`).join('')}</div></article>`}
  function patchNavigation(){
    ['#nav','#mobileNav'].forEach(selector=>{
      const root=$(selector); if(!root)return;
      $$('[data-page="orders"]',root).forEach(button=>{
        button.dataset.page='chat';
        const iconSpan=button.querySelector('.nav-icon')||button.querySelector('span');
        if(iconSpan && iconSpan.dataset.chatIcon!=='1'){iconSpan.innerHTML=CHAT_ICON;iconSpan.dataset.chatIcon='1'}
        const spans=$$('span',button); const label=spans.at(-1); if(label && label.textContent.trim()!=='Чат')label.textContent='Чат';
        const badge=button.querySelector('.nav-count'); if(badge)badge.remove();
        button.setAttribute('aria-label','Чат');
      });
    });
  }
  function replaceLatestOrders(){
    const headings=$$('#content h2');
    const target=headings.find(h=>h.textContent.trim()==='Акыркы заказдар');
    if(!target)return;
    const panel=target.closest('article.panel');
    if(panel){panel.outerHTML=activityMarkup();}
  }
  function updateActiveNav(){
    $$('#nav [data-page],#mobileNav [data-page]').forEach(button=>{
      button.classList.toggle('active',button.dataset.page==='chat');
    });
  }
  function timeNow(){return new Intl.DateTimeFormat('ru-RU',{hour:'2-digit',minute:'2-digit'}).format(new Date())}
  function contactMarkup(){return Object.values(groups).map(g=>`<button class="chat-contact ${activeGroup===g.id?'active':''}" data-group="${g.id}"><span class="chat-avatar ${g.admin?'admin':''}">${escapeHtml(g.avatar)}</span><span class="chat-contact-copy"><span class="chat-contact-row"><strong>${escapeHtml(g.name)}</strong><time>${escapeHtml(g.time)}</time></span><span class="chat-contact-preview">${escapeHtml(g.preview)}</span></span>${g.unread?`<span class="chat-unread">${g.unread}</span>`:''}</button>`).join('')}
  function renderChat(){
    const content=$('#content'); if(!content)return;
    content.innerHTML=`<section class="chat-page"><header class="chat-page-head"><div><h1>Корпоративный чат</h1><p>Команда MOI MARKET PRO · общение по филиалам</p></div><span class="chat-demo-pill"><i class="online-dot"></i> Интерфейс · демо-режим</span></header><div class="chat-layout" id="chatLayout"><aside class="chat-list"><div class="chat-list-head"><h2>Сообщения <span style="color:#75bfff;font-weight:500">2 группы</span></h2><label class="chat-search">${SEARCH_ICON}<input id="chatSearch" placeholder="Поиск группы..."></label></div><div class="chat-contacts" id="chatContacts">${contactMarkup()}</div></aside><section class="chat-conversation"><header class="chat-conv-head"><button class="chat-icon-btn chat-back" id="chatBack" aria-label="К списку">←</button><span class="chat-avatar ${groups[activeGroup].admin?'admin':''}" id="activeChatAvatar">${escapeHtml(groups[activeGroup].avatar)}</span><span class="chat-conv-title"><strong id="activeChatName">${escapeHtml(groups[activeGroup].name)}</strong><small id="activeChatSubtitle">${escapeHtml(groups[activeGroup].subtitle)}</small></span><div class="chat-head-actions"><button id="chatCallBtn" aria-label="Аудиозвонок" title="Аудиозвонок">${PHONE_ICON}</button><button id="chatVideoBtn" aria-label="Видеозвонок" title="Видеозвонок">${VIDEO_ICON}</button></div></header><div class="chat-messages" id="chatMessages"></div><div class="chat-composer-wrap"><div id="chatAttachPreview"></div><div class="chat-composer"><button id="chatEmojiBtn" class="chat-icon-btn" title="Эмодзи" aria-label="Эмодзи">${EMOJI_ICON}</button><button id="chatAttachBtn" class="chat-icon-btn" title="Сүрөт же видео тиркөө" aria-label="Тиркеме">${CLIP_ICON}</button><input id="chatFileInput" type="file" accept="image/*,video/*" hidden><textarea id="chatTextInput" rows="1" placeholder="Сообщение... Enter — отправить"></textarea><button id="chatSendBtn" class="chat-send" aria-label="Жөнөтүү">${SEND_ICON}</button></div><p class="chat-composer-note">Демо: билдирүүлөр ушул браузерде гана көрүнөт; топтук реалдуу синхрондоштуруу сервер кошулганда иштейт.</p></div></section></div></section>`;
    renderMessages();
    $('#chatContacts').addEventListener('click',event=>{const b=event.target.closest('[data-group]');if(!b)return;activeGroup=b.dataset.group;groups[activeGroup].unread=0;renderChat();$('#chatLayout')?.classList.add('conversation-open');});
    $('#chatSearch').addEventListener('input',event=>{const q=event.target.value.toLocaleLowerCase();$$('.chat-contact').forEach(b=>b.hidden=!b.innerText.toLocaleLowerCase().includes(q))});
    $('#chatBack').addEventListener('click',()=>$('#chatLayout').classList.remove('conversation-open'));
    $('#chatSendBtn').addEventListener('click',sendMessage);
    $('#chatTextInput').addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMessage()}});
    $('#chatEmojiBtn').addEventListener('click',()=>{const input=$('#chatTextInput');input.value+=`${input.value?' ':''}😊`;input.focus()});
    $('#chatAttachBtn').addEventListener('click',()=>$('#chatFileInput').click());
    $('#chatFileInput').addEventListener('change',event=>{const file=event.target.files&&event.target.files[0];if(!file)return;if(!file.type.startsWith('image/')&&!file.type.startsWith('video/')){showToast('Сүрөт же видео файл тандаңыз');return;}pendingFile=file;if(pendingObjectUrl)URL.revokeObjectURL(pendingObjectUrl);pendingObjectUrl=URL.createObjectURL(file);$('#chatAttachPreview').innerHTML=`<div class="chat-attach-preview"><span>${file.type.startsWith('video/')?'🎬':'🖼️'} ${escapeHtml(file.name)} · ${formatBytes(file.size)}</span><button type="button" id="removeAttachment" aria-label="Тиркемени алып салуу">×</button></div>`;$('#removeAttachment').addEventListener('click',clearPendingFile)});
    ['chatCallBtn','chatVideoBtn'].forEach(id=>$('#'+id).addEventListener('click',()=>showToast('Аудио/видео чалуу үчүн сервердик байланыш кийинки этапта кошулат.')));
    $$('.chat-contact').forEach(b=>b.classList.toggle('active',b.dataset.group===activeGroup));
    patchNavigation();updateActiveNav();
    if(window.matchMedia('(max-width: 700px)').matches)$('#chatLayout').classList.add('conversation-open');
  }
  function renderMessages(){
    const root=$('#chatMessages');if(!root)return;root.replaceChildren();
    const divider=document.createElement('div');divider.className='chat-day-divider';divider.textContent='Бүгүн';root.append(divider);
    groups[activeGroup].messages.forEach(message=>{
      const row=document.createElement('article');row.className='chat-message'+(message.own?' own':'');
      if(!message.own){const sender=document.createElement('span');sender.className='chat-sender';sender.textContent=message.sender;row.append(sender)}
      const bubble=document.createElement('div');bubble.className='chat-message-bubble';
      if(message.file){const media=document.createElement('div');media.className='chat-media'+(message.file.type.startsWith('image/')||message.file.type.startsWith('video/')?' preview':'');if(message.file.type.startsWith('image/')){const img=document.createElement('img');img.src=message.file.url;img.alt=message.file.name;media.append(img)}else if(message.file.type.startsWith('video/')){const video=document.createElement('video');video.src=message.file.url;video.controls=true;video.playsInline=true;media.append(video)}else{const ico=document.createElement('div');ico.className='chat-media-icon';ico.innerHTML=CLIP_ICON;media.append(ico)}const inf=document.createElement('div');inf.className='chat-media-info';const strong=document.createElement('strong');strong.textContent=message.file.name;const small=document.createElement('small');small.textContent=formatBytes(message.file.size);inf.append(strong,small);media.append(inf);bubble.append(media)}
      if(message.text){const p=document.createElement('p');p.className='chat-message-text';p.textContent=message.text;bubble.append(p)}
      const meta=document.createElement('div');meta.className='chat-message-meta';const time=document.createElement('time');time.textContent=message.time||timeNow();meta.append(time);if(message.own){const ticks=document.createElement('span');ticks.className='chat-checks';ticks.textContent='✓✓';meta.append(ticks)}bubble.append(meta);row.append(bubble);root.append(row);
    });
    root.scrollTop=root.scrollHeight;
  }
  function formatBytes(bytes){if(bytes<1024)return `${bytes} B`;if(bytes<1024*1024)return `${(bytes/1024).toFixed(1)} KB`;return `${(bytes/1024/1024).toFixed(1)} MB`}
  function clearPendingFile(){pendingFile=null;if(pendingObjectUrl){URL.revokeObjectURL(pendingObjectUrl);pendingObjectUrl=''}const preview=$('#chatAttachPreview');if(preview)preview.replaceChildren();const file=$('#chatFileInput');if(file)file.value=''}
  function sendMessage(){const input=$('#chatTextInput');const text=input.value.trim();if(!text&&!pendingFile)return;const message={sender:'Азамат Исаев',initials:'АИ',text,time:timeNow(),own:true};if(pendingFile){message.file={name:pendingFile.name,type:pendingFile.type,size:pendingFile.size,url:pendingObjectUrl};pendingObjectUrl='';pendingFile=null;$('#chatFileInput').value='';$('#chatAttachPreview').replaceChildren()}groups[activeGroup].messages.push(message);groups[activeGroup].time=message.time;groups[activeGroup].preview=message.file?(message.file.type.startsWith('video/')?'Видео':'Фото'):(text.length>36?text.slice(0,36)+'…':text);input.value='';renderMessages();const contacts=$('#chatContacts');if(contacts)contacts.innerHTML=contactMarkup();}
  function showToast(message){const toast=$('#toast');if(!toast){alert(message);return}toast.textContent=message;toast.classList.add('show');window.setTimeout(()=>toast.classList.remove('show'),2600)}
  function openChat(group='staff'){activeGroup=groups[group]?group:'staff';renderChat();updateActiveNav()}
  function handleClicks(event){
    const chatButton=event.target.closest('button[data-page="chat"]');
    if(chatButton){event.preventDefault();event.stopImmediatePropagation();openChat(activeGroup);return}
    const activityButton=event.target.closest('[data-chat-open]');
    if(activityButton){event.preventDefault();event.stopImmediatePropagation();openChat(activityButton.dataset.chatOpen||'staff')}
  }
  document.addEventListener('click',handleClicks,true);
  const navObserver=new MutationObserver(()=>patchNavigation());
  const contentObserver=new MutationObserver(()=>{
    patchNavigation();
    replaceLatestOrders();
  });
  function init(){
    patchNavigation();
    const nav=$('#nav'),mobile=$('#mobileNav'),content=$('#content');
    if(nav)navObserver.observe(nav,{childList:true,subtree:true});
    if(mobile)navObserver.observe(mobile,{childList:true,subtree:true});
    if(content)contentObserver.observe(content,{childList:true,subtree:true});
    replaceLatestOrders();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
