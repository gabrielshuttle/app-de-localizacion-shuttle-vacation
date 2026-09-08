/* ==========================================================================
   SHUTTLE VACATION — prototipo funcional
   Un solo estado compartido entre Pasajero / Conductor / Administrador.
   Las acciones del conductor actualizan, en vivo, lo que ve el pasajero
   y lo que ve el administrador (igual que en un producto real).
   ========================================================================== */

/* ------------------------------- ICONOS SVG ------------------------------- */
const ICO = {
  back:      `<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>`,
  bell:      `<svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z"/><path d="M9.5 18a2.5 2.5 0 0 0 5 0"/></svg>`,
  chevron:   `<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>`,
  phone:     `<svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.6 21 3 12.4 3 2c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z"/></svg>`,
  msg:       `<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 1 1-3.4-6.5L21 4l-1 4.2A8 8 0 0 1 21 12Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>`,
  pin:       `<svg viewBox="0 0 24 24"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/></svg>`,
  check:     `<svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>`,
  van:       `<svg viewBox="0 0 24 24"><path d="M3 16V9a1 1 0 0 1 1-1h9l4 4h2a1 1 0 0 1 1 1v3h-2M3 16h2m0 0a2 2 0 1 0 4 0m-4 0h8m0 0a2 2 0 1 0 4 0m-4 0h2"/></svg>`,
  star:      `<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6L12 3Z"/></svg>`,
  close:     `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  list:      `<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>`,
  user:      `<svg viewBox="0 0 24 24"><path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4 0-8 2-8 4.5V21h16v-2.5c0-2.5-4-4.5-8-4.5Z"/></svg>`,
  wallet:    `<svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3M3 7v11a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-4a2.2 2.2 0 0 0 0 4.4H21"/></svg>`,
  grid:      `<svg viewBox="0 0 24 24"><path d="M4 19V10m5 9V5m5 14v-7m5 7V8"/></svg>`,
  table:     `<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  drivers:   `<svg viewBox="0 0 24 24"><path d="M5 11 6.6 6.2A2 2 0 0 1 8.5 5h7a2 2 0 0 1 1.9 1.2L19 11m-14 0h14m-14 0a2 2 0 0 0-2 2v5h2m14-7a2 2 0 0 1 2 2v5h-2M7 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-10 0h10"/></svg>`,
  plane:     `<svg viewBox="0 0 24 24"><path d="M10.5 21l1.5-5 5-1.5M3 13.5L21 6l-7.5 18-2-7-7-2Z"/></svg>`,
  bag:       `<svg viewBox="0 0 24 24"><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-9 0h12l-1 13H6L5 7Z"/></svg>`,
  water:     `<svg viewBox="0 0 24 24"><path d="M9 2h6v3.5l2 3v11a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5v-11l2-3V2Z"/></svg>`,
  juice:     `<svg viewBox="0 0 24 24"><path d="M5 4h14v5l-5 3v8H10v-8L5 9V4Z"/></svg>`,
  can:       `<svg viewBox="0 0 24 24"><rect x="7" y="4" width="10" height="16" rx="3"/></svg>`,
  towel:     `<svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="4" rx="1"/><rect x="4" y="12" width="16" height="4" rx="1"/></svg>`,
  beer:      `<svg viewBox="0 0 24 24"><path d="M7 3h7v3h1.5A1.5 1.5 0 0 1 17 7.5v11A1.5 1.5 0 0 1 15.5 20h-7A1.5 1.5 0 0 1 7 18.5V3Z"/></svg>`,
  logout:    `<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>`,
};

/* --------------------------------- ETAPAS --------------------------------- */
const STEPS = [
  { key:'confirmed',      label:'Reserva confirmada' },
  { key:'assigned',       label:'Conductor asignado' },
  { key:'enroute_pickup', label:'Conductor en camino' },
  { key:'arrived',        label:'Conductor ha llegado' },
  { key:'onboard',        label:'Viaje en curso' },
  { key:'completed',      label:'Llegada a tu destino' },
];
const NEXT_ACTION_LABEL = {
  confirmed:      'Aceptar viaje',
  assigned:       'Iniciar recorrido al punto de encuentro',
  enroute_pickup: 'Confirmar llegada — pasajero notificado',
  arrived:        'Pasajero a bordo · iniciar viaje',
  onboard:        'Finalizar viaje',
};

/* --------------------------------- DATOS DEMO --------------------------------- */
const DATA = {
  trips: [
    {
      id:'SV-1042', live:true,
      passenger:{ name:'Marta Jiménez', phone:'+52 998 123 4567', pax:3, luggage:4 },
      route:{ from:'Aeropuerto Internacional de Cancún (CUN)', to:'Hotel Xcaret Arte · Riviera Maya' },
      flight:{ airline:'Aeroméxico', code:'AM 442', origin:'Ciudad de México (MEX)', eta:'14:35', terminal:'Terminal 3', status:'A tiempo', delayed:false },
      vehicle:{ type:'Suburban Premium', plate:'RVX-44-71', color:'Negro', capacity:'Hasta 6 pasajeros' },
      driver:{ name:'Carlos Peña', initials:'CP', rating:4.9, trips:812, phone:'+52 998 555 2210' },
      amenities:['water','juice','can','beer','towel'],
      stepIndex:2, etaMinutes:8,
      timeline:{ confirmed:'12:40', assigned:'12:41', enroute_pickup:'12:55' },
    },
    { id:'SV-1039', live:false, stepIndex:5,
      passenger:{ name:'Robert Klein', pax:2 },
      route:{ from:'Aeropuerto de Cancún (CUN)', to:'Hyatt Ziva · Puerto Morelos' },
      driver:{ name:'Ana Torres' }, vehicle:{ type:'Suburban' },
      flight:{ code:'DL 1220' },
      timeline:{}, },
    { id:'SV-1044', live:false, stepIndex:0,
      passenger:{ name:'Familia Ortega', pax:5 },
      route:{ from:'Hotel Riu Cancún', to:'Aeropuerto de Cancún (CUN)' },
      driver:{ name:'Sin asignar' }, vehicle:{ type:'Van Premium' },
      flight:{ code:'—' }, timeline:{}, },
    { id:'SV-1051', live:false, stepIndex:4,
      passenger:{ name:'Julie Bennett', pax:2 },
      route:{ from:'Aeropuerto de Cancún (CUN)', to:'Tulum Bay Hotel' },
      driver:{ name:'Jorge Ek' }, vehicle:{ type:'SUV Confort' },
      flight:{ code:'UA 1875' }, timeline:{}, },
    { id:'SV-1028', live:false, stepIndex:5,
      passenger:{ name:'Sophie Laurent', pax:1 },
      route:{ from:'Aeropuerto de Cancún (CUN)', to:'Grand Velas · Riviera Maya' },
      driver:{ name:'Luis Nava' }, vehicle:{ type:'SUV Confort' },
      flight:{ code:'AF 224' }, timeline:{}, },
  ],
  drivers: [
    { name:'Carlos Peña', initials:'CP', rating:4.9, trips:812, status:'busy',  note:'En viaje · SV-1042' },
    { name:'Ana Torres',  initials:'AT', rating:4.95,trips:1190,status:'free',  note:'Disponible' },
    { name:'Luis Nava',   initials:'LN', rating:4.8, trips:640, status:'busy',  note:'En viaje · SV-1028' },
    { name:'Gaby Ruiz',   initials:'GR', rating:4.97,trips:305, status:'free',  note:'Disponible' },
    { name:'Jorge Ek',    initials:'JE', rating:4.85,trips:1032,status:'busy',  note:'En viaje · SV-1051' },
  ],
};

/* --------------------------------- ESTADO --------------------------------- */
const STATE = {
  role:'client',
  clientScreen:'tracking',     // trips | tracking | rating
  driverScreen:'active',       // today | active
  adminScreen:'overview',      // overview | reservations | drivers
  activeTripId:'SV-1042',
  adminDrawerTripId:null,
  notifSheetOpen:false,
  driverSheetOpen:false,
  notifications:[
    { text:'Reserva confirmada. ¡Gracias por elegir Shuttle Vacation!', time:'12:40', icon:'check' },
    { text:'Carlos Peña fue asignado como tu conductor.', time:'12:41', icon:'pin' },
  ],
};

const getTrip = id => DATA.trips.find(t => t.id === id);
const activeTrip = () => getTrip(STATE.activeTripId);

/* --------------------------------- UTILIDADES --------------------------------- */
function nowTime(){
  const d = new Date();
  return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');
}
function statusChip(trip){
  const s = STEPS[trip.stepIndex].key;
  if(s === 'completed') return `<span class="status-chip chip-done"><span class="dot"></span>Viaje completado</span>`;
  if(s === 'confirmed')  return `<span class="status-chip chip-yellow"><span class="dot"></span>Buscando conductor</span>`;
  return `<span class="status-chip"><span class="dot"></span>${STEPS[trip.stepIndex].label}</span>`;
}
function pushToast(text, icon='check'){
  const stack = document.getElementById('toastStack');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="t-ico">${ICO[icon]||ICO.check}</span><span>${text}</span>`;
  stack.appendChild(el);
  setTimeout(()=>{ el.classList.add('leaving'); setTimeout(()=>el.remove(),250); }, 4200);
}
function pushNotification(text, icon='check'){
  STATE.notifications.unshift({ text, time: nowTime(), icon });
  pushToast(text, icon);
}

/* ==========================================================================
   RENDER RAÍZ
   ========================================================================== */
function render(){
  document.querySelectorAll('.role-btn').forEach(b=>b.classList.toggle('is-active', b.dataset.role===STATE.role));
  document.getElementById('view-client').classList.toggle('is-active', STATE.role==='client');
  document.getElementById('view-driver').classList.toggle('is-active', STATE.role==='driver');
  document.getElementById('view-admin').classList.toggle('is-active', STATE.role==='admin');

  renderClient();
  renderDriver();
  renderAdmin();
}

/* ==========================================================================
   VISTA: PASAJERO
   ========================================================================== */
function renderClient(){
  const root = document.getElementById('clientScreen');
  if(STATE.clientScreen === 'trips')     root.innerHTML = clientTripsScreen();
  if(STATE.clientScreen === 'tracking')  root.innerHTML = clientTrackingScreen(activeTrip());
  if(STATE.clientScreen === 'rating')    root.innerHTML = clientRatingScreen(activeTrip());
}

function clientTripsScreen(){
  const upcoming = DATA.trips.filter(t=>t.stepIndex<5);
  const past = DATA.trips.filter(t=>t.stepIndex===5);
  const row = (t,label)=>`
    <div class="trip-item" onclick="App.openTrip('${t.id}')">
      <div class="trip-item-ico">${ICO.van}</div>
      <div class="trip-item-body">
        <div class="trip-item-route">${t.route.from.split('(')[0].trim()} → ${t.route.to.split('·')[0].trim()}</div>
        <div class="trip-item-date">${label}</div>
      </div>
      <div class="trip-item-chev">${ICO.chevron}</div>
    </div>`;
  return `
    <div class="scr-header">
      <div style="flex:1">
        <div class="scr-title">Hola, Marta</div>
      </div>
      <button class="icon-btn" onclick="App.toggleNotif(true)">${ICO.bell}<span class="badge">${STATE.notifications.length}</span></button>
    </div>
    <div class="scr-body">
      <div class="eyebrow">Viaje activo</div>
      ${row(getTrip('SV-1042'),'Hoy · en curso')}
      <div class="eyebrow" style="margin-top:18px">Viajes anteriores</div>
      ${past.map(t=>row(t,'Completado')).join('')}
    </div>
    ${bottomNav('client','trips')}
    ${notifSheet()}
  `;
}

function clientTrackingScreen(trip){
  const pct = Math.round((trip.stepIndex/(STEPS.length-1))*100);
  return `
    <div class="scr-header">
      <button class="scr-back" onclick="App.goClient('trips')">${ICO.back}</button>
      <div class="scr-title" style="font-size:18px">Viaje ${trip.id}</div>
      <div class="scr-header-actions">
        <button class="icon-btn" onclick="App.toggleNotif(true)">${ICO.bell}<span class="badge">${STATE.notifications.length}</span></button>
      </div>
    </div>
    <div class="scr-body">
      ${statusChip(trip)}
      <div style="margin-top:14px">${routeMap(trip, pct)}</div>

      <div class="card">
        <div class="eyebrow">Ruta</div>
        <div style="font-size:13.5px;font-weight:600;line-height:1.5">
          ${trip.route.from}<br>→ ${trip.route.to}
        </div>
        ${trip.stepIndex<4 ? `<div style="margin-top:8px;font-size:12px;color:var(--text-soft)">Llega en aprox. <b style="color:var(--ink)">${trip.etaMinutes} min</b></div>` : ''}
      </div>

      <div class="card" onclick="App.toggleDriverSheet(true)" style="cursor:pointer">
        <div class="driver-row">
          <div class="avatar">${trip.driver.initials}</div>
          <div>
            <div class="driver-name">${trip.driver.name}</div>
            <div class="driver-meta">${ICO.star.replace('viewBox="0 0 24 24"','viewBox="0 0 24 24" style="width:12px;height:12px;fill:var(--yellow-dim);stroke:none"')} ${trip.driver.rating} · ${trip.driver.trips} viajes</div>
          </div>
          <div class="driver-actions">
            <button class="round-btn" onclick="event.stopPropagation()">${ICO.phone}</button>
            <button class="round-btn" onclick="event.stopPropagation()">${ICO.msg}</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="veh-row">
          <div class="veh-icon">${ICO.van}</div>
          <div>
            <div style="font-weight:700;font-size:14px">${trip.vehicle.type}</div>
            <div style="font-size:12px;color:var(--text-soft)">${trip.vehicle.color} · ${trip.vehicle.capacity||''}</div>
            <div class="veh-plate">${trip.vehicle.plate||'—'}</div>
          </div>
        </div>
        ${trip.amenities ? `<div class="amenity-row">${trip.amenities.map(a=>amenityChip(a)).join('')}</div>` : ''}
      </div>

      <div class="card">
        <div class="flight-row">
          <div>
            <div class="eyebrow">Tu vuelo</div>
            <div class="flight-code">${trip.flight.code}</div>
            <div class="flight-sub">${trip.flight.airline} · desde ${trip.flight.origin}</div>
            <div class="flight-sub">Llegada estimada ${trip.flight.eta} · ${trip.flight.terminal}</div>
          </div>
          <div class="flight-status ${trip.flight.delayed?'delay':''}">${trip.flight.status}</div>
        </div>
      </div>

      <div class="card">
        <div class="eyebrow" style="margin-bottom:12px">Seguimiento del viaje</div>
        ${timelineHTML(trip)}
      </div>

      ${trip.stepIndex===5 ? `<button class="btn btn-accent" onclick="App.goClient('rating')">Calificar mi viaje</button>` : ''}
    </div>
    ${driverSheet(trip)}
    ${notifSheet()}
  `;
}

function amenityChip(key){
  const map = { water:['Agua',ICO.water], juice:['Jugo',ICO.juice], can:['Sodas',ICO.can], beer:['Cerveza',ICO.beer], towel:['Toallas',ICO.towel] };
  const [label,ico] = map[key];
  return `<div class="amenity"><div class="a-ico">${ico}</div>${label}</div>`;
}

function routeMap(trip, pct){
  return `
  <div class="route-map">
    <div style="position:relative;width:100%;height:100%;padding:0 22px;display:flex;align-items:center;">
      <div style="position:relative;width:100%;height:2px;">
        <div style="position:absolute;left:0;right:0;top:0;border-top:2px dashed #C9C2AE;"></div>
        <div style="position:absolute;left:0;right:0;top:0;border-top:2px solid var(--ink);width:${pct}%;transition:width .6s ease;"></div>
        <div style="position:absolute;left:-6px;top:-6px;width:13px;height:13px;border-radius:50%;background:var(--aqua);border:2px solid #fff;"></div>
        <div style="position:absolute;right:-6px;top:-6px;width:13px;height:13px;border-radius:50%;background:var(--yellow);border:2px solid #fff;"></div>
        <div style="position:absolute;left:calc(${pct}% - 15px);top:-22px;width:30px;height:30px;border-radius:50%;background:var(--ink);color:var(--yellow);display:flex;align-items:center;justify-content:center;transition:left .6s ease;box-shadow:0 4px 10px rgba(0,0,0,.3)">
          <span style="width:15px;height:15px;display:block">${ICO.van}</span>
        </div>
        <div class="route-pin-label" style="left:0;top:16px;">Origen</div>
        <div class="route-pin-label" style="right:0;top:16px;">Destino</div>
      </div>
    </div>
  </div>`;
}

function timelineHTML(trip){
  return `<div class="timeline">
    ${STEPS.map((s,i)=>{
      const state = i < trip.stepIndex ? 'done' : (i===trip.stepIndex ? 'active' : 'pending');
      const time = trip.timeline[s.key] || '';
      const icon = state==='done' ? ICO.check : (state==='active' ? ICO.pin : '');
      return `<div class="tl-step ${state}">
        <div class="tl-line"></div>
        <div class="tl-marker">${icon}</div>
        <div>
          <div class="tl-label">${s.label}</div>
          <div class="tl-time">${time}</div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function clientRatingScreen(trip){
  return `
    <div class="scr-header">
      <button class="scr-back" onclick="App.goClient('tracking')">${ICO.back}</button>
      <div class="scr-title" style="font-size:18px">Califica tu viaje</div>
    </div>
    <div class="scr-body" style="text-align:center;padding-top:30px">
      <div class="avatar" style="margin:0 auto 14px;width:64px;height:64px;font-size:22px">${trip.driver.initials}</div>
      <div style="font-weight:700;font-size:16px">${trip.driver.name}</div>
      <div style="font-size:12.5px;color:var(--text-soft);margin-top:2px">${trip.vehicle.type} · ${trip.vehicle.plate||''}</div>
      <div class="rate-stars" id="rateStars">
        ${[1,2,3,4,5].map(n=>`<span onclick="App.setRating(${n})">${ICO.star}</span>`).join('')}
      </div>
      <textarea placeholder="Cuéntanos cómo fue tu experiencia (opcional)" style="width:100%;min-height:90px;border-radius:14px;border:1px solid var(--line-soft);padding:14px;font-family:inherit;font-size:13px;resize:none;margin-bottom:16px"></textarea>
      <button class="btn btn-primary" onclick="App.submitRating()">Enviar calificación</button>
    </div>
  `;
}

function notifSheet(){
  return `
  <div class="sheet-overlay ${STATE.notifSheetOpen?'is-open':''}" onclick="if(event.target===this) App.toggleNotif(false)">
    <div class="sheet">
      <div class="sheet-handle"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <div class="scr-title" style="font-size:18px">Notificaciones</div>
        <button class="icon-btn" onclick="App.toggleNotif(false)">${ICO.close}</button>
      </div>
      ${STATE.notifications.map(n=>`
        <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--line-soft)">
          <div class="avatar sm" style="background:var(--cream);color:var(--ink);border:1px solid var(--line-soft)">${ICO[n.icon]||ICO.check}</div>
          <div>
            <div style="font-size:13px;font-weight:600;line-height:1.4">${n.text}</div>
            <div style="font-size:11px;color:var(--text-soft);margin-top:3px">${n.time}</div>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

function driverSheet(trip){
  return `
  <div class="sheet-overlay ${STATE.driverSheetOpen?'is-open':''}" onclick="if(event.target===this) App.toggleDriverSheet(false)">
    <div class="sheet">
      <div class="sheet-handle"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div class="scr-title" style="font-size:18px">Tu conductor</div>
        <button class="icon-btn" onclick="App.toggleDriverSheet(false)">${ICO.close}</button>
      </div>
      <div style="text-align:center">
        <div class="avatar" style="margin:0 auto 12px;width:74px;height:74px;font-size:24px">${trip.driver.initials}</div>
        <div style="font-weight:700;font-size:18px">${trip.driver.name}</div>
        <div class="driver-meta" style="justify-content:center;margin-top:4px">${trip.driver.rating} ★ · ${trip.driver.trips} viajes con Shuttle Vacation</div>
      </div>
      <div class="card" style="margin-top:18px">
        <div class="eyebrow">Vehículo</div>
        <div style="font-weight:700">${trip.vehicle.type} — ${trip.vehicle.color}</div>
        <div class="veh-plate">${trip.vehicle.plate}</div>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-primary">${ICO.phone} Llamar</button>
        <button class="btn btn-ghost">${ICO.msg} Mensaje</button>
      </div>
    </div>
  </div>`;
}

/* ==========================================================================
   VISTA: CONDUCTOR
   ========================================================================== */
function renderDriver(){
  const root = document.getElementById('driverScreen');
  if(STATE.driverScreen === 'today') root.innerHTML = driverTodayScreen();
  if(STATE.driverScreen === 'active') root.innerHTML = driverActiveScreen(getTrip(STATE.activeTripId));
}

function driverTodayScreen(){
  const mine = DATA.trips.filter(t=>t.driver.name==='Carlos Peña' || t.id==='SV-1042');
  return `
    <div class="scr-header">
      <div style="flex:1"><div class="scr-title">Hola, Carlos</div></div>
      <button class="icon-btn">${ICO.bell}</button>
    </div>
    <div class="scr-body">
      <div class="card-dark">
        <div class="eyebrow" style="color:var(--yellow)">Ganancias de hoy</div>
        <div style="font-family:var(--ff-display);font-size:34px;letter-spacing:.5px">$1,840 MXN</div>
        <div style="font-size:12px;color:#bbb;margin-top:2px">3 viajes completados · 1 en curso</div>
      </div>
      <div class="eyebrow" style="margin-top:6px">Viaje asignado</div>
      ${mine.map(t=>`
        <div class="trip-item" onclick="App.goDriver('active')">
          <div class="trip-item-ico">${ICO.van}</div>
          <div class="trip-item-body">
            <div class="trip-item-route">${t.route.from.split('(')[0].trim()} → ${t.route.to.split('·')[0].trim()}</div>
            <div class="trip-item-date">${t.passenger.name} · ${t.passenger.pax} pax · ${STEPS[t.stepIndex].label}</div>
          </div>
          <div class="trip-item-chev">${ICO.chevron}</div>
        </div>`).join('')}
    </div>
    ${bottomNav('driver','today')}
  `;
}

function driverActiveScreen(trip){
  const nextLabel = NEXT_ACTION_LABEL[STEPS[trip.stepIndex].key];
  const finished = trip.stepIndex === 5;
  return `
    <div class="scr-header">
      <button class="scr-back" onclick="App.goDriver('today')">${ICO.back}</button>
      <div class="scr-title" style="font-size:18px">${trip.id}</div>
      <div class="scr-header-actions"><button class="icon-btn">${ICO.bell}</button></div>
    </div>
    <div class="scr-body">
      ${statusChip(trip)}
      <div style="margin-top:14px">${routeMap(trip, Math.round((trip.stepIndex/(STEPS.length-1))*100))}</div>

      <div class="card">
        <div class="driver-row">
          <div class="avatar">${trip.passenger.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
          <div>
            <div class="driver-name">${trip.passenger.name}</div>
            <div class="driver-meta">${trip.passenger.pax} pasajeros · ${trip.passenger.luggage||2} maletas</div>
          </div>
          <div class="driver-actions">
            <button class="round-btn">${ICO.phone}</button>
            <button class="round-btn">${ICO.msg}</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flight-row">
          <div>
            <div class="eyebrow">Vuelo del pasajero</div>
            <div class="flight-code">${trip.flight.code}</div>
            <div class="flight-sub">${trip.flight.airline} · ${trip.flight.terminal}</div>
          </div>
          <div class="flight-status">${trip.flight.status}</div>
        </div>
      </div>

      <div class="card">
        <div class="eyebrow">Ruta</div>
        <div style="font-size:13.5px;font-weight:600;line-height:1.5">${trip.route.from}<br>→ ${trip.route.to}</div>
      </div>

      <div class="card">
        <div class="eyebrow" style="margin-bottom:12px">Etapas del viaje</div>
        ${timelineHTML(trip)}
      </div>
    </div>

    <div class="phone-bottom-bar">
      ${finished
        ? `<button class="btn btn-ghost" disabled>Viaje finalizado</button>`
        : `<button class="btn btn-accent" onclick="App.advanceTrip('${trip.id}')">${nextLabel}</button>`}
    </div>
  `;
}

/* ==========================================================================
   BARRA INFERIOR (cliente / conductor)
   ========================================================================== */
function bottomNav(role, active){
  const items = role==='client'
    ? [['trips','Viajes',ICO.list],['tracking','Seguimiento',ICO.pin],['rating','Perfil',ICO.user]]
    : [['today','Viajes',ICO.list],['active','En curso',ICO.pin]];
  return `<div class="bottom-nav">
    ${items.map(([key,label,ico])=>`
      <button class="bn-item ${active===key?'is-active':''}" onclick="App.go${role==='client'?'Client':'Driver'}('${key}')">
        <span style="width:19px;height:19px;display:block">${ico}</span>${label}
      </button>`).join('')}
  </div>`;
}

/* ==========================================================================
   VISTA: ADMINISTRADOR
   ========================================================================== */
function renderAdmin(){
  const root = document.getElementById('adminShell');
  root.innerHTML = `
    <aside class="admin-side">
      <div class="admin-side-title">Shuttle Vacation</div>
      ${adminNavItem('overview','Resumen',ICO.grid)}
      ${adminNavItem('reservations','Reservas',ICO.table)}
      ${adminNavItem('drivers','Conductores',ICO.drivers)}
      <div style="margin-top:auto"></div>
    </aside>
    <div class="admin-main">
      ${STATE.adminScreen==='overview' ? adminOverview() : ''}
      ${STATE.adminScreen==='reservations' ? adminReservations() : ''}
      ${STATE.adminScreen==='drivers' ? adminDrivers() : ''}
    </div>
  `;
  renderAdminDrawer();
}

function adminNavItem(key,label,ico){
  return `<button class="admin-nav-item ${STATE.adminScreen===key?'is-active':''}" onclick="App.goAdmin('${key}')">
    <span style="width:17px;height:17px;display:block">${ico}</span>${label}
  </button>`;
}

function adminOverview(){
  const inProgress = DATA.trips.filter(t=>t.stepIndex>0 && t.stepIndex<5);
  const completed = DATA.trips.filter(t=>t.stepIndex===5).length;
  return `
    <div class="admin-head">
      <div><div class="admin-h1">Resumen operativo</div><div class="admin-sub">Cancún · Riviera Maya · Tulum — hoy</div></div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="kpi-label">Viajes hoy</div><div class="kpi-value">${DATA.trips.length}</div><div class="kpi-trend">+12% vs. ayer</div></div>
      <div class="kpi-card"><div class="kpi-label">En curso</div><div class="kpi-value">${inProgress.length}</div><div class="kpi-trend">Sincronizado en vivo</div></div>
      <div class="kpi-card"><div class="kpi-label">Completados</div><div class="kpi-value">${completed}</div><div class="kpi-trend">100% a tiempo</div></div>
      <div class="kpi-card"><div class="kpi-label">Ingresos estimados</div><div class="kpi-value">$18.4K</div><div class="kpi-trend">MXN</div></div>
    </div>
    <div class="admin-grid-2">
      <div class="panel-block">
        <div class="panel-block-head"><div class="panel-block-title">Viajes en curso</div></div>
        ${inProgress.map(t=>`
          <div class="driver-card-admin" style="cursor:pointer" onclick="App.openAdminDrawer('${t.id}')">
            <div class="avatar sm">${(t.driver.initials)||t.driver.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:13.5px">${t.id} — ${t.passenger.name}</div>
              <div style="font-size:11.5px;color:var(--text-soft);margin-top:2px">${STEPS[t.stepIndex].label} · conductor ${t.driver.name}</div>
            </div>
            ${pill(t.stepIndex)}
          </div>`).join('')}
      </div>
      <div class="panel-block">
        <div class="panel-block-head"><div class="panel-block-title">Mapa de operación</div></div>
        <div class="mini-map">
          ${DATA.trips.filter(t=>t.stepIndex>0&&t.stepIndex<5).map((t,i)=>`
            <div style="position:absolute;left:${18+i*22}%;top:${30+((i*17)%40)}%;width:11px;height:11px;border-radius:50%;background:var(--aqua);box-shadow:0 0 0 5px rgba(0,201,167,.18);"></div>
          `).join('')}
          <div style="position:absolute;bottom:12px;left:12px;font-size:11px;color:var(--text-soft)">Zona: Cancún – Riviera Maya – Tulum</div>
        </div>
      </div>
    </div>
  `;
}

function pill(stepIndex){
  if(stepIndex===5) return `<span class="pill pill-done"><span class="dot"></span>Completado</span>`;
  if(stepIndex===0) return `<span class="pill pill-wait"><span class="dot"></span>En espera</span>`;
  return `<span class="pill pill-progress"><span class="dot"></span>En curso</span>`;
}

function adminReservations(){
  return `
    <div class="admin-head">
      <div><div class="admin-h1">Reservas</div><div class="admin-sub">${DATA.trips.length} reservas registradas hoy</div></div>
      <button class="btn btn-accent btn-sm">+ Nueva reserva</button>
    </div>
    <div class="panel-block">
      <table class="data-table">
        <thead><tr><th>ID</th><th>Pasajero</th><th>Ruta</th><th>Conductor</th><th>Vuelo</th><th>Estado</th></tr></thead>
        <tbody>
          ${DATA.trips.map(t=>`
            <tr class="clickable" onclick="App.openAdminDrawer('${t.id}')">
              <td style="font-weight:700">${t.id}</td>
              <td>${t.passenger.name}</td>
              <td style="color:var(--text-soft)">${t.route.from.split('(')[0].trim()} → ${t.route.to.split('·')[0].trim()}</td>
              <td>${t.driver.name}</td>
              <td>${t.flight.code}</td>
              <td>${pill(t.stepIndex)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function adminDrivers(){
  return `
    <div class="admin-head">
      <div><div class="admin-h1">Conductores</div><div class="admin-sub">${DATA.drivers.filter(d=>d.status==='free').length} disponibles ahora</div></div>
    </div>
    <div class="panel-block">
      ${DATA.drivers.map(d=>`
        <div class="driver-card-admin">
          <div class="avatar sm">${d.initials}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13.5px">${d.name}</div>
            <div style="font-size:11.5px;color:var(--text-soft);margin-top:2px">${d.rating} ★ · ${d.trips} viajes · ${d.note}</div>
          </div>
          <div class="dca-status ${d.status==='free'?'free':'busy'}"></div>
        </div>`).join('')}
    </div>
  `;
}

function renderAdminDrawer(){
  const overlay = document.querySelector('.admin-drawer-overlay');
  if(overlay) overlay.remove();
  if(!STATE.adminDrawerTripId) return;
  const t = getTrip(STATE.adminDrawerTripId);
  const div = document.createElement('div');
  div.className = 'admin-drawer-overlay is-open';
  div.onclick = (e)=>{ if(e.target===div) App.openAdminDrawer(null); };
  div.innerHTML = `
    <div class="admin-drawer">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <div>
          <div class="admin-h1" style="font-size:24px">${t.id}</div>
          ${t.live?'<div style="font-size:11.5px;color:var(--aqua);font-weight:700;margin-top:2px">● Sincronizado en vivo con el conductor</div>':''}
        </div>
        <button class="icon-btn" style="background:var(--panel-2);border-color:var(--line);color:var(--text-on-dark)" onclick="App.openAdminDrawer(null)">${ICO.close}</button>
      </div>
      ${pill(t.stepIndex)}
      <div style="margin:16px 0;color:var(--text-on-dark)">
        <div class="eyebrow">Pasajero</div>
        <div style="font-weight:700">${t.passenger.name}</div>
        <div style="font-size:12px;color:var(--text-soft)">${t.passenger.pax||1} pasajeros</div>
      </div>
      <div style="margin:16px 0;color:var(--text-on-dark)">
        <div class="eyebrow">Ruta</div>
        <div style="font-size:13px;line-height:1.5">${t.route.from}<br>→ ${t.route.to}</div>
      </div>
      <div style="margin:16px 0;color:var(--text-on-dark)">
        <div class="eyebrow">Conductor y vehículo</div>
        <div style="font-size:13px">${t.driver.name} · ${t.vehicle.type}</div>
      </div>
      <div style="margin:20px 0 0;color:var(--text-on-dark)">
        <div class="eyebrow" style="margin-bottom:10px">Etapas</div>
        ${timelineHTML(t)}
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

/* ==========================================================================
   SIMULACIÓN — el conductor avanza el viaje, todo se sincroniza
   ========================================================================== */
function advanceTrip(id){
  const t = getTrip(id);
  if(t.stepIndex >= 5) return;
  t.stepIndex += 1;
  t.timeline[STEPS[t.stepIndex].key] = nowTime();
  t.etaMinutes = t.stepIndex===2 ? 8 : (t.stepIndex===4 ? 22 : t.etaMinutes);

  const msgs = {
    assigned:'Conductor asignado.',
    enroute_pickup:'Tu conductor Carlos va en camino.',
    arrived:'¡Tu conductor ha llegado! Te espera en la zona de encuentro.',
    onboard:'Viaje iniciado. ¡Buen viaje!',
    completed:'Has llegado a tu destino. ¡Gracias por viajar con Shuttle Vacation!',
  };
  const key = STEPS[t.stepIndex].key;
  if(msgs[key]) pushNotification(msgs[key], key==='arrived'?'pin':'check');

  render();
}

/* ticker: baja el ETA del viaje activo cuando está en tránsito */
setInterval(()=>{
  const t = getTrip('SV-1042');
  if(!t) return;
  const key = STEPS[t.stepIndex].key;
  if((key==='enroute_pickup' || key==='onboard') && t.etaMinutes>1){
    t.etaMinutes -= 1;
    if(STATE.role==='client' && STATE.clientScreen==='tracking') renderClient();
  }
}, 4000);

/* ==========================================================================
   API PÚBLICA (usada por los atributos onclick del HTML)
   ========================================================================== */
window.App = {
  goClient(screen){ STATE.clientScreen = screen; STATE.notifSheetOpen=false; STATE.driverSheetOpen=false; renderClient(); },
  goDriver(screen){ STATE.driverScreen = screen; renderDriver(); },
  goAdmin(screen){ STATE.adminScreen = screen; STATE.adminDrawerTripId=null; renderAdmin(); },
  openTrip(id){ STATE.activeTripId = id; STATE.clientScreen='tracking'; renderClient(); },
  openAdminDrawer(id){ STATE.adminDrawerTripId = id; renderAdminDrawer(); },
  toggleNotif(open){ STATE.notifSheetOpen = open; renderClient(); },
  toggleDriverSheet(open){ STATE.driverSheetOpen = open; renderClient(); },
  advanceTrip,
  setRating(n){ document.querySelectorAll('#rateStars svg').forEach((s,i)=>s.classList.toggle('on', i<n)); STATE._rating=n; },
  submitRating(){ pushNotification('¡Gracias por calificar tu viaje!','star'); STATE.clientScreen='trips'; renderClient(); },
};

/* --------------------------------- ARRANQUE --------------------------------- */
document.getElementById('roleSwitch').addEventListener('click', (e)=>{
  const btn = e.target.closest('.role-btn');
  if(!btn) return;
  STATE.role = btn.dataset.role;
  render();
});

render();
