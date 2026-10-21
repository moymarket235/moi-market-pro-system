(() => {
  'use strict';
  const stores = [
    { id: 1, name: 'Бейшеналиева 20', label: '1-магазин', color: '#1bbfff' },
    { id: 2, name: 'Жибек-Жолу 671', label: '2-магазин', color: '#13dba3' },
    { id: 3, name: 'Токтогул 259/10', label: '3-магазин', color: '#ffbd38' },
    { id: 4, name: 'Ауэзова 17', label: '4-магазин', color: '#bd83ff' },
    { id: 5, name: 'Жибек-Жолу 679', label: '5-магазин', color: '#ff5e89' }
  ];
  const roles = [
    { id:'manager', name:'Руководитель', icon:'crown', color:'#1bbfff', subtitle:'Полный контроль над сетью', desc:'Общая выручка, магазины, сотрудники и сводные отчёты.', modules:[['Обзор сети','Сводные показатели и динамика'],['Магазины','Показатели всех филиалов'],['Сотрудники','Список сотрудников и роли'],['Отчёты','Общие отчёты по сети'],['Настройки доступа','Роли и разрешения']],metrics:[['Общий доход','1 256 800 KGS','↗ +12%'],['Всего магазинов','5','Активны'],['Сотрудники','28','В сети'],['Товаров','1 342','Каталог сети']]},
    { id:'accounting', name:'Бухгалтерия', icon:'calculator', color:'#13dba3', subtitle:'Финансы и отчёты', desc:'Доходы, расходы, финансовые документы и расчёты.', modules:[['Финансовые отчёты','Доходы и расходы'],['Документы','Счета и первичные документы'],['Налоги','Налоговые сводки'],['Зарплаты','Расчёт оплаты труда'],['Платежи','Платёжные операции']],metrics:[['Доход','1 256 800 KGS','↗ +12%'],['Расходы','420 300 KGS','↗ +5%'],['Прибыль','836 500 KGS','↗ +18%'],['Документы','124','За период']]},
    { id:'admin', name:'Администратор', icon:'shield', color:'#ffbd38', subtitle:'Управление магазином', desc:'Товары, склад, заказы, сотрудники и параметры магазина.', modules:[['Товары','Каталог и цены'],['Склад','Остатки и движения'],['Заказы','Список и статусы заказов'],['Сотрудники','Профили и роли'],['Отчёты','Отчёты текущего магазина'],['Настройки магазина','Контакты и параметры']],metrics:[['Сегодняшняя выручка','245 600 KGS','↗ +12%'],['Товаров','1 342','В каталоге'],['Заказы','86','За день'],['Остатки','18','Требуют внимания']]},
    { id:'cashier', name:'Кассир', icon:'calculator', color:'#bd83ff', subtitle:'Продажи и чеки', desc:'Продажа товаров, кассовая смена, чеки и возвраты.', modules:[['Новая продажа','Добавить позиции в чек'],['История чеков','Найти прошлую продажу'],['Возвраты','Оформление возврата'],['Смена','Открыть или закрыть смену'],['Товары','Поиск цены и наличия']],metrics:[['Продажи сегодня','86 500 KGS','↗ +8%'],['Чеки','24','Сегодня'],['Кассовая смена','Открыта','Демо-статус'],['Возвраты','2','За период']]},
    { id:'sales', name:'Продавец-консультант', icon:'shopping-bag', color:'#ff5e89', subtitle:'Работа с товарами и покупателями', desc:'Консультации, поиск товаров, наличие и клиентские заказы.', modules:[['Каталог товаров','Поиск товаров и характеристики'],['Наличие на складе','Проверка остатков'],['Консультации','Заметки по клиентам'],['Мои продажи','Личная статистика продаж'],['Заказы клиентов','Заявки и статусы']],metrics:[['Мои продажи','42 300 KGS','↗ +10%'],['Консультации','18','За сегодня'],['Заказы клиентов','7','В работе'],['Товаров в каталоге','1 342','Для поиска']]}
  ];
  const iconPaths = {
    crown:'<path d="m2.8 7 5.1 4 4.1-7 4.1 7 5.1-4-2 12H4.8L2.8 7Z"/><path d="M5 22h14"/>',
    calculator:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8v3H8zM8 14h1m3 0h1m3 0h1M8 17h1m3 0h1m3 0h1"/>',
    shield:'<path d="M12 3 20 6v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
    'shopping-bag':'<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    'cash-register':'<rect x=\'3\' y=\'4\' width=\'18\' height=\'9\' rx=\'2\'/><path d=\'M5 13v7h14v-7M7 8h2m3 0h2m3 0h1M8 17h8\'/><path d=\'M7 2h10\'/>' ,
    store:'<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/>',
    package:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/>',
    warehouse:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/><path d="M7 11h10"/>',
    'shopping-cart':'<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h2l2.5 12.5a2 2 0 0 0 2 1.5h9.7a2 2 0 0 0 2-1.6L22 8H5"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    'chart-line':'<path d="M3 3v18h18"/><path d="m7 14 4-4 4 3 5-7"/>',
    'file-text':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    receipt:'<path d="M4 3h16v18l-4-2-4 2-4-2-4 2Z"/><path d="M8 8h8M8 12h8M8 16h4"/>',
    wallet:'<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M16 14h2"/><path d="M7 5V3h9"/>',
    'credit-card':'<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>',
    undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'package-search':'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 4-2"/><circle cx="17" cy="17" r="3"/><path d="m19.2 19.2 2 2"/>',
    'message-circle':'<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
    'users-round':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z"/>',
    'building-2':'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21v-4h6v4M8 7h2m4 0h2M8 11h2m4 0h2"/>',
    'lock-keyhole':'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1"/>',
    'user-round':'<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    'badge-dollar':'<path d="M12 2 15 4l4-.2.7 3.8L22 11l-2 3.3.2 4L16.4 19 12 22l-3-2-4 .2-.7-3.8L2 13l2-3.3-.2-4L7.6 5 12 2Z"/><path d="M15 9.5c-.5-1-1.5-1.5-3-1.5-1.4 0-2.5.7-2.5 1.8 0 3 5.5 1.2 5.5 4.2 0 1.1-1.1 2-2.8 2-1.5 0-2.7-.6-3.2-1.7M12 6.5v11"/>',
    'clipboard-check':'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4.5V3h6v1.5M8 13l2.5 2.5L16 10"/>',
    'eye':'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    'pencil':'<path d="m15 5 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15l0 5Z"/>',
    check:'<path d="m5 12 4 4L19 6"/>'
  };
  const svgIcon = (name) => `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${iconPaths[name] || iconPaths.grid}</svg>`;
  const iconForModule = (title) => {
    const t = title.toLowerCase();
    if (t.includes('магаз') || t.includes('филиал')) return 'store';
    if (t.includes('товар') || t.includes('каталог')) return 'package';
    if (t.includes('склад') || t.includes('остат')) return 'warehouse';
    if (t.includes('заказ') || t.includes('продаж')) return 'shopping-cart';
    if (t.includes('сотрудник') || t.includes('клиент') || t.includes('консультац')) return 'users-round';
    if (t.includes('отч') || t.includes('обзор')) return 'chart-line';
    if (t.includes('документ')) return 'file-text';
    if (t.includes('налог')) return 'badge-dollar';
    if (t.includes('зарплат') || t.includes('доход') || t.includes('прибыл')) return 'wallet';
    if (t.includes('платеж')) return 'credit-card';
    if (t.includes('чек')) return 'receipt';
    if (t.includes('возврат')) return 'undo';
    if (t.includes('смен')) return 'clock';
    if (t.includes('настрой') || t.includes('доступ')) return 'settings';
    if (t.includes('финанс')) return 'chart-line';
    return 'grid';
  };
  const iconForMetric = (label) => {
    const t = label.toLowerCase();
    if (t.includes('доход') || t.includes('выруч') || t.includes('прибыл')) return 'wallet';
    if (t.includes('расход') || t.includes('документ')) return 'file-text';
    if (t.includes('магаз')) return 'store';
    if (t.includes('сотруд') || t.includes('консультац')) return 'users-round';
    if (t.includes('товар') || t.includes('каталог')) return 'package';
    if (t.includes('заказ') || t.includes('продаж')) return 'shopping-cart';
    if (t.includes('остат')) return 'warehouse';
    if (t.includes('чек')) return 'receipt';
    if (t.includes('смен')) return 'clock';
    if (t.includes('возврат')) return 'undo';
    return 'chart-line';
  };

  const state = { role:null, store:1, pendingStore:1, user:{ firstName:'Азамат', lastName:'Исаев', phone:'+996 700 123 456', email:'demo@moimarket.kg' } };
  const $ = id => document.getElementById(id);
  const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const currentRole = () => roles.find(r => r.id === state.role) || roles[0];
  const currentStore = () => stores.find(s => s.id === state.store) || stores[0];
  function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2600)}
  function show(id){document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));$(id).classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'})}
  function storeOptions(selected){return stores.map(s=>`<option value="${s.id}" ${s.id===Number(selected)?'selected':''}>${s.label} · ${s.name}</option>`).join('')}
  function initials(){return `${state.user.firstName.slice(0,1)}${state.user.lastName.slice(0,1)}`.toUpperCase()}
  function storeCards(){ $('storesGrid').innerHTML=stores.map(s=>`<button class="store-card ${s.id===state.pendingStore?'selected':''}" data-store="${s.id}"><span class="store-number">${s.id}</span><span class="store-text"><strong>${escapeHtml(s.name)}</strong><small>${s.label} · г. Бишкек</small></span><span class="radio"></span></button>`).join('');$('storesGrid').querySelectorAll('[data-store]').forEach(b=>b.addEventListener('click',()=>{state.pendingStore=Number(b.dataset.store);storeCards()})); }
  function renderRoles(){ $('roleGrid').innerHTML=roles.map(r=>`<button class="role-card ${r.id} ${state.role===r.id?'selected':''}" data-role="${r.id}"><span class="checkmark">✓</span><span class="role-icon">${svgIcon(r.icon)}</span><strong>${r.name}</strong><small>${r.desc}</small></button>`).join('');$('roleGrid').querySelectorAll('[data-role]').forEach(b=>b.addEventListener('click',()=>{state.role=b.dataset.role;renderRoles();$('continueBtn').disabled=false;$('roleHint').textContent=`Выбрана роль: ${currentRole().name}`}));$('storeSelect').innerHTML=storeOptions(state.store); }
  function renderDashboard(){const r=currentRole(),s=currentStore();document.body.dataset.role=r.id;$('dashTitle').textContent=r.name;$('dashSubtitle').textContent=r.desc;$('userFullName').textContent=`${state.user.firstName} ${state.user.lastName}`;$('userRoleLabel').textContent=r.name;$('avatar').textContent=initials();$('dashStore').textContent=s.name;$('summaryPhone').textContent=state.user.phone;$('summaryEmail').textContent=state.user.email;$('summaryStore').textContent=s.name;
    $('metricGrid').innerHTML=r.metrics.map(m=>`<article class="metric ${r.id}"><div class="metric-title"><span class="metric-icon">${svgIcon(iconForMetric(m[0]))}</span><small>${m[0]}</small></div><strong>${m[1]}</strong><div class="delta">${m[2]}</div></article>`).join('');$('moduleGrid').innerHTML=r.modules.map(m=>`<article class="module-card" style="--role-color:${r.color};--role-bg:${r.color}20"><span class="module-icon">${svgIcon(iconForModule(m[0]))}</span><span><b>${m[0]}</b><small>${m[1]}</small></span><span class="arrow" aria-hidden="true">›</span></article>`).join('');$('profileAvatar').textContent=initials();$('profileNamePreview').textContent=`${state.user.firstName} ${state.user.lastName}`;$('profileRolePreview').textContent=r.name; }
  function fillProfile(){['firstName','lastName','phone','email'].forEach(k=>$(k).value=state.user[k]);$('profileStore').innerHTML=storeOptions(state.store);$('newPassword').value='';$('confirmPassword').value='';$('profileMessage').textContent='';renderDashboard()}
  function go(action){if(action==='roles'){renderRoles();show('roleView')}else if(action==='dashboard'){renderDashboard();show('dashboardView')}else if(action==='profile'){fillProfile();show('profileView')}else if(action==='stores'){state.pendingStore=state.store;storeCards();show('storesView')}else if(action==='logout'){state.role=null;show('loginView')}}
  $('loginForm').addEventListener('submit',e=>{e.preventDefault();renderRoles();show('roleView');toast('Демо-вход: выберите роль для просмотра панели')});
  $('forgotBtn').addEventListener('click',()=>toast('В демо-режиме восстановление пароля не подключено'));
  document.querySelectorAll('[data-toggle]').forEach(b=>b.addEventListener('click',()=>{const inp=$(b.dataset.toggle);const showPassword=inp.type==='password';inp.type=showPassword?'text':'password';b.setAttribute('aria-label',showPassword?'Скрыть пароль':'Показать пароль');b.title=showPassword?'Скрыть пароль':'Показать пароль';b.style.color=showPassword?'var(--cyan)':''}));
  $('storeSelect').addEventListener('change',e=>{state.store=Number(e.target.value)});
  $('continueBtn').addEventListener('click',()=>{
  if(!state.role)return;
  state.store=Number($('storeSelect').value||state.store);
  if(state.role==='manager')return;
  renderDashboard();
  show('dashboardView');
});
  $('profileForm').addEventListener('submit',e=>{e.preventDefault();const firstName=$('firstName').value.trim(),lastName=$('lastName').value.trim(),phone=$('phone').value.trim(),email=$('email').value.trim(),p1=$('newPassword').value,p2=$('confirmPassword').value;if(!firstName||!lastName||!phone||!email){$('profileMessage').textContent='Заполните все обязательные поля';return}if(p1||p2){if(p1.length<8){$('profileMessage').textContent='Пароль должен содержать не менее 8 символов';return}if(p1!==p2){$('profileMessage').textContent='Пароли не совпадают';return}}state.user={firstName,lastName,phone,email};state.store=Number($('profileStore').value||state.store);try{localStorage.setItem('mmp-demo-profile',JSON.stringify(state.user));localStorage.setItem('mmp-demo-store',String(state.store))}catch{}$('profileMessage').textContent='Данные демо-профиля сохранены';renderDashboard();toast('Профиль обновлён (демо)')});
  $('saveStoreBtn').addEventListener('click',()=>{state.store=state.pendingStore;try{localStorage.setItem('mmp-demo-store',String(state.store))}catch{}renderDashboard();show('dashboardView');toast(`Выбран магазин: ${currentStore().name}`)});
  document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.action)));
  try{const saved=JSON.parse(localStorage.getItem('mmp-demo-profile')||'null');if(saved&&typeof saved==='object')state.user={...state.user,...saved};const st=Number(localStorage.getItem('mmp-demo-store'));if(st>=1&&st<=5)state.store=st}catch{}
  renderRoles();
show('roleView');
})();
