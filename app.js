const main=document.querySelector('#mainView');
const people=[
  {name:'พ่อ',role:'ช่างซ่อมเครื่อง',icon:'👨🏻‍🔧',image:'father.png',health:92,morale:68,fatigue:22,task:'ซ่อมเครื่องกำเนิดไฟฟ้า'},
  {name:'แม่',role:'ดูแลเสบียง',icon:'👩🏻',image:'mother.png',health:88,morale:72,fatigue:28,task:'จัดเสบียง'},
  {name:'พี่ชาย',role:'สำรวจภายนอก',icon:'🧑🏻‍🚀',image:'son.png',health:85,morale:65,fatigue:35,task:'เตรียมอุปกรณ์'},
  {name:'พี่สาว',role:'ดูแลผู้ป่วย',icon:'👩🏻‍⚕️',image:'daughter.png',health:90,morale:70,fatigue:25,task:'ดูแลผู้ป่วย'},
  {name:'คุณตา',role:'รู้เส้นทางเมือง',icon:'👴🏻',image:'grandfather.png',health:95,morale:80,fatigue:15,task:'จัดของ'}
];
function bar(v,cls=''){return `<div class="bar ${cls}"><i style="width:${v}%"></i></div>`}
function avatar(p){return `<div class="avatar art"><img src="assets/characters/${p.image}" alt="${p.name}"></div>`}
function overview(){return `<div class="view-content"><div class="view-title"><div><h1>ภาพรวมหลุมหลบภัย</h1><p>จัดการครอบครัว ทรัพยากร และเตรียมรับคืนที่อุณหภูมิจะลดลง</p></div><button class="primary" onclick="advanceTime()">จบช่วงเวลา&nbsp; ▶</button></div><div class="overview-grid"><section class="panel shelter"><div class="shelter-scene"><div class="city"></div><div class="room one"><label>ห้องนอน</label><span class="person">🛏️</span></div><div class="room two"><label>ห้องเก็บของ</label><span class="person">🧍🏻</span></div><div class="room three"><label>ทางขึ้น</label><span class="person">🪜</span></div><div class="room four"><label>ห้องพยาบาล</label><span class="person">👩🏻‍⚕️</span></div><div class="room five"><label>ห้องเครื่อง</label><span class="person">👨🏻‍🔧</span></div><div class="room six"><label>ประตูทางออก</label><span class="person">🚪</span></div></div></section><aside class="panel summary"><h2>สถานะหลุมหลบภัย</h2><div class="summary-img">🏚️</div><div class="metric"><div class="metric-head"><span>♨ อุณหภูมิภายใน</span><b>28°C</b></div>${bar(52)}</div><div class="metric"><div class="metric-head"><span>🍽 อาหารเหลือ</span><b>3 วัน</b></div>${bar(72,'green')}</div><div class="metric"><div class="metric-head"><span>💧 น้ำเหลือ</span><b>2 วัน</b></div>${bar(51)}</div><div class="metric"><div class="metric-head"><span>⚡ ระบบไฟฟ้า</span><b>76%</b></div>${bar(76,'orange')}</div><div class="metric"><div class="metric-head"><span>🛡 ความปลอดภัย</span><b>82%</b></div>${bar(82,'green')}</div><div class="metric"><div class="metric-head"><span>👥 ความจุ</span><b>5/5</b></div>${bar(100)}</div></aside></div><div class="bottom-grid"><section class="panel members"><h2>สมาชิกในบ้าน (5/5)</h2>${people.map((p,i)=>`<div class="member-row"><div class="avatar">${p.icon}</div><div><strong>${p.name}</strong><small>${p.role}</small></div><div class="status-bars">${bar(p.health,'green')}${bar(p.morale,'orange')}</div><small>${p.health}% สุขภาพ<br>${p.morale}% ใจ<br>${p.fatigue}% เหนื่อย</small></div>`).join('')}</section><section class="panel tasks"><h2>งานที่กำลังทำ</h2>${[['⚙️','ซ่อมเครื่องกำเนิดไฟฟ้า','เหลือ 1 ชม. 20 นาที',62],['💧','กรองน้ำ','เหลือ 50 นาที',44],['📦','จัดเสบียง','เหลือ 1 ชม. 10 นาที',27],['🛡️','เฝ้าประตู','เหลือ 2 ชม. 30 นาที',18]].map(x=>`<div class="task"><span class="task-icon">${x[0]}</span><div><strong>${x[1]}</strong>${bar(x[3])}<small>${x[2]}</small></div><button class="secondary" onclick="notify('มอบหมายงานใหม่แล้ว')">จัดการ</button></div>`).join('')}</section></div></div>`}
function peopleView(){return `<div class="view-content"><div class="view-title"><div><h1>สมาชิกในบ้าน</h1><p>ดูสุขภาพ ความสามารถ และความสัมพันธ์ของทั้ง 5 คน</p></div><button class="secondary" onclick="notify('ยังไม่มีผู้รอดชีวิตใหม่')">ผู้รอดชีวิตใหม่</button></div><div class="cards">${people.map((p,i)=>`<article class="panel person-card">${avatar(p)}<h3>${p.name}</h3><p>${p.role}</p><span class="tag">ครอบครัว</span><span class="tag">${p.injuryStatus||'พร้อมทำงาน'}</span><div class="metric"><div class="metric-head"><span>สุขภาพ</span><b>${p.health}%</b></div>${bar(p.health,'green')}</div><div class="metric"><div class="metric-head"><span>กำลังใจ</span><b>${p.morale}%</b></div>${bar(p.morale,'orange')}</div><div class="metric"><div class="metric-head"><span>ความเหนื่อย</span><b>${p.fatigue}%</b></div>${bar(p.fatigue,'')}</div><button class="secondary" onclick="showCharacter(${i})">ดูรายละเอียด</button></article>`).join('')}</div></div>`}
const characterSkills=[['ซ่อมเครื่อง','เพิ่มประสิทธิภาพงานช่าง'],['แพทย์สนาม','รักษาบาดเจ็บได้ดีขึ้น'],['สำรวจภายนอก','ลดความเสี่ยงระหว่างออกสำรวจ'],['ดูแลเสบียง','ลดการใช้อาหารและน้ำ'],['รู้เส้นทางเมือง','เพิ่มโอกาสพบของหายาก']];
function showCharacter(index){
  const p=people[index],skill=characterSkills[index]||characterSkills[0];
  main.innerHTML=`<div class="view-content character-detail"><div class="view-title"><div><h1>ข้อมูลสมาชิก</h1><p>วันที่ ${gameState.day} · ประวัติและสถานะปัจจุบัน</p></div><button class="secondary" onclick="render('people')">← กลับรายชื่อ</button></div><section class="panel character-detail-layout"><div class="character-detail-hero"><div class="large-character"><img src="assets/characters/${p.image}" alt="${p.name}"></div><h2>${p.name}</h2><p>${p.role}</p><span class="tag">สมาชิกครอบครัว</span><button class="primary" onclick="restCharacter(${index})" ${p.task==='กำลังพักผ่อน'||p.task==='พักผ่อน'?'disabled':''}>${p.task==='กำลังพักผ่อน'||p.task==='พักผ่อน'?'พักผ่อนอยู่':'ให้พักผ่อน'}</button>${p.health<100?`<button class="secondary" onclick="startTreatment(${index})">🩹 รักษาสมาชิก</button>`:''}</div><div class="character-detail-body"><div class="detail-top"><div><h2>สถานะปัจจุบัน</h2><p>งาน: <b>${p.task}</b>${p.treatmentUntil?` · เหลือเวลารักษาประมาณ ${Math.max(1,p.treatmentUntil-gameState.day)} วัน`:''}</p></div><div class="detail-badges"><span>สุขภาพ <b>${p.health}%</b></span><span>กำลังใจ <b>${p.morale}%</b></span><span>เหนื่อย <b>${p.fatigue}%</b></span></div></div><div class="detail-bars"><div><span>สุขภาพ</span>${bar(p.health,'green')}</div><div><span>กำลังใจ</span>${bar(p.morale,'orange')}</div><div><span>ความเหนื่อย</span>${bar(p.fatigue)}</div></div><div class="detail-columns"><div class="detail-box"><h3>ทักษะเด่น</h3><div class="skill-line"><b>★ ${skill[0]}</b><small>${skill[1]}</small></div><div class="skill-line"><b>ความชำนาญระดับ ${Math.max(1,Math.round((p.health+p.morale)/35))}</b><small>ประสบการณ์จากการเอาตัวรอด</small></div></div><div class="detail-box"><h3>ความสัมพันธ์</h3><p>ผูกพันกับครอบครัว <b class="good">ดี</b></p><p>ความไว้ใจทีม <b class="good">${Math.max(45,p.morale-5)}%</b></p><p>พร้อมร่วมภารกิจ <b class="${p.fatigue>70?'warning':'good'}">${p.fatigue>70?'ควรพัก':'พร้อม'}</b></p></div></div></div></section></div>`;
}
function assignCharacter(index,task){people[index].task=task;persistGame();notify(`${people[index].name} ได้รับมอบหมายงาน: ${task}`);showCharacter(index)}
function restCharacter(index){const p=people[index];if(!p||p.task==='กำลังพักผ่อน'||p.task==='พักผ่อน'||endState)return;p.task='พักผ่อน';p.fatigue=Math.max(0,p.fatigue-15);p.morale=Math.min(100,p.morale+3);persistGame();showRoom('bedroom',index);notify(p.name+' กำลังพักผ่อนอยู่ · กดจบวันเมื่อพร้อม')}
function treatmentRange(p){const severity=p.health>=80?'น้อย':p.health>=50?'ปานกลาง':'หนัก';return {severity,range:{น้อย:[1,2],ปานกลาง:[2,3],หนัก:[3,7]}[severity]}}
function treatmentPlan(p){const {severity,range}=treatmentRange(p);const specialist=p?.role?.includes('ผู้ป่วย')?1:0, damagePenalty=facilityCondition('medical')<60?1:0;const days=Math.max(1,range[0]+Math.floor(Math.random()*(range[1]-range[0]+1))-(gameState.facilities?.medical||0)-specialist+damagePenalty);return {severity,days}}
function startTreatment(index){const p=people[index];if(!p||!isAlive(p)||p.health>=100){notify('สมาชิกคนนี้ยังไม่ต้องรักษา');return}if(p.treatmentUntil){notify(`${p.name} กำลังรักษาอยู่ · เหลือประมาณ ${Math.max(1,p.treatmentUntil-gameState.day)} วัน`);return}if(!(gameState.facilities?.medical>0)){notify('ต้องสร้างห้องพยาบาลก่อนจึงจะรักษาได้');showRoom('medical');return}if((gameState.medicine||0)<1){notify('ชุดปฐมพยาบาลไม่พอ');showRoom('medical');return}const plan=treatmentPlan(p);gameState.medicine--;p.treatmentUntil=gameState.day+plan.days;p.treatmentDays=plan.days;p.injuryStatus=`กำลังรักษา · เจ็บ${plan.severity}`;p.task='รักษา';persistGame();showCharacter(index);notify(`${p.name} เริ่มรักษา · เจ็บ${plan.severity} ใช้เวลาประมาณ ${plan.days} วัน`)}
function taskKeyFor(person){const t=person.task||'';return t.includes('น้ำ')?'water':t.includes('เสบียง')?'food':t.includes('ประตู')?'guard':t.includes('ซ่อม')?'generator':'food'}
overview=function(){
  const tasks=alivePeople().filter(p=>!p.expeditionStatus).slice(0,4).map(p=>({person:p,key:taskKeyFor(p),label:p.task||'พักผ่อน'}));
  return `<div class="view-content command-view"><div class="view-title"><div><h1>ภาพรวมหลุมหลบภัย</h1><p>จัดการครอบครัว ทรัพยากร และเตรียมรับคืนที่อุณหภูมิจะลดลง</p></div><button class="primary" onclick="advanceTime()">⌛ จบช่วงเวลา ▶</button></div><div class="command-layout"><section class="panel command-shelter"><div class="shelter-art"></div><div class="shelter-room room-bed" onclick="showRoom('bedroom')"><label>ห้องนอน</label><span>🛏️</span></div><div class="shelter-room room-storage" onclick="showRoom('storage')"><label>ห้องเก็บของ</label><span>📦</span></div><div class="shelter-room room-engine" onclick="showRoom('engine')"><label>ห้องเครื่อง</label><span>⚙️</span></div><div class="shelter-room room-med" onclick="showRoom('medical')"><label>ห้องพยาบาล</label><span>🩺</span></div><div class="shelter-room room-door" onclick="showRoom('exit')"><label>ประตูทางออก</label><span>🚪</span></div></section><aside class="panel command-status"><h2>สถานะหลุมหลบภัย</h2><div class="status-line"><span>♨ อุณหภูมิภายใน</span><b>28°C</b></div><div class="status-line"><span>🍽 อาหารเหลือ</span><b>${Math.ceil(gameState.food/1000)} วัน</b></div>${bar(Math.min(100,gameState.food/30),'green')}<div class="status-line"><span>💧 น้ำเหลือ</span><b>${Math.ceil(gameState.water/1000)} วัน</b></div>${bar(Math.min(100,gameState.water/30))}<div class="status-line"><span>⚡ ระบบไฟฟ้า</span><b>${gameState.energy}%</b></div>${bar(gameState.energy,'orange')}<div class="status-line"><span>🛡 ความปลอดภัย</span><b>82%</b></div>${bar(82,'green')}<div class="status-line"><span>👥 ความจุ</span><b>5/5</b></div>${bar(100,'green')}</aside></div><section class="panel command-people"><h2>สมาชิกในบ้าน (5/5)</h2><div class="character-strip">${people.map((p,i)=>`<button class="character-card" onclick="showCharacter(${i})"><div class="character-portrait"><img src="assets/characters/${p.image}" alt="${p.name}"></div><div class="character-info"><strong>${p.name}</strong><small>${p.role}</small><div class="mini-stat"><span>HP</span>${bar(p.health,'green')}<b>${p.health}</b></div><div class="mini-stat"><span>ใจ</span>${bar(p.morale,'orange')}<b>${p.morale}</b></div><div class="mini-stat"><span>เหนื่อย</span>${bar(p.fatigue)}<b>${p.fatigue}</b></div></div></button>`).join('')}</div></section><section class="panel command-tasks"><h2>งานที่กำลังทำ</h2><div class="task-strip">${tasks.map(t=>`<button class="task-card" onclick="completeTask('${t.key}','${t.label}')"><span class="task-symbol">${t.key==='water'?'💧':t.key==='generator'?'⚙️':t.key==='guard'?'🛡️':'📦'}</span><div><strong>${t.label}</strong>${avatar(t.person)}${bar(taskProgress[t.key]||0,'orange')}<small>${taskProgress[t.key]||0}% ดำเนินการ · ${t.person.name}</small></div></button>`).join('')}</div></section></div>`;
};
function expedition(){return `<div class="view-content"><div class="view-title"><div><h1>จัดทีมสำรวจ</h1><p>เลือกสมาชิก อุปกรณ์ และจุดหมายก่อนออกจากหลุมหลบภัย</p></div><button class="primary" onclick="notify('ออกสำรวจแล้ว — ระบบเหตุการณ์กำลังเตรียมผลลัพธ์')">ออกสำรวจ ▶</button></div><div class="expedition-layout"><section class="panel members"><h2>สมาชิกที่พร้อม</h2>${people.map((p,i)=>`<div class="member-row"><div class="avatar">${p.icon}</div><div><strong>${p.name}</strong><small>${p.role}</small></div><button class="secondary" onclick="this.textContent=this.textContent==='เลือก'?'เลือกแล้ว':'เลือก'">เลือก</button></div>`).join('')}</section><section class="panel destination"><h2>จุดหมายปลายทาง</h2><div class="dest-card selected"><h3>🏥 โรงพยาบาลเก่า</h3><p>อาจมีเวชภัณฑ์และเครื่องมือแพทย์หลงเหลือ</p><small>ระยะทาง 2.4 กม. · ใช้เวลา 3 ชม.</small><div class="metric"><div class="metric-head"><span>ความเสี่ยง</span><b class="warning">สูง</b></div>${bar(72,'orange')}</div></div><div class="dest-card"><h3>📡 สถานีวัดอากาศ</h3><p>ค้นหาพยากรณ์อุณหภูมิรอบถัดไป</p><small>ระยะทาง 1.8 กม. · ใช้เวลา 2 ชม.</small></div><div class="dest-card"><h3>🏪 ตลาดริมคลอง</h3><p>ของกิน น้ำ และผู้รอดชีวิตที่อาจต้องการความช่วยเหลือ</p><small>ระยะทาง 1.2 กม. · ใช้เวลา 1 ชม.</small></div></section><section class="panel summary"><h2>อุปกรณ์ติดตัว</h2>${[['🧥','ชุดกันร้อน','1 ชิ้น'],['💧','น้ำดื่ม','2 ขวด'],['🩹','ชุดปฐมพยาบาล','1 ชุด'],['🔋','แบตเตอรี่','4 ก้อน'],['📻','วิทยุฉุกเฉิน','1 เครื่อง']].map(x=>`<div class="notice"><b>${x[0]} ${x[1]}</b><br><small>${x[2]}</small></div>`).join('')}<div class="metric"><div class="metric-head"><span>น้ำหนักรวม</span><b>18/30 กก.</b></div>${bar(60,'orange')}</div></section></div></div>`}
function inventory(){return `<div class="view-content"><div class="view-title"><div><h1>คลังทรัพยากร</h1><p>ตรวจสอบสิ่งของที่ใช้ดูแลบ้านและออกสำรวจ</p></div><button class="secondary" onclick="notify('คลังเรียงตามประเภทแล้ว')">เรียงรายการ</button></div><div class="cards inventory-grid">${[['🍽️','อาหารแห้ง','32 มื้อ','เสบียง'],['💧','น้ำดื่ม','48 ขวด','เสบียง'],['⚡','แบตเตอรี่','16 ก้อน','พลังงาน'],['🩹','ชุดปฐมพยาบาล','6 ชุด','ยา'],['🧥','ชุดกันร้อน','2 ชุด','ป้องกัน'],['🧊','ชุดกันหนาว','1 ชุด','ป้องกัน'],['🔧','วัสดุซ่อมแซม','64 ชิ้น','วัสดุ'],['📻','วิทยุฉุกเฉิน','1 เครื่อง','อุปกรณ์']].map(x=>`<article class="panel item"><span class="item-icon">${x[0]}</span><h3>${x[1]}</h3><b>${x[2]}</b><p><span class="tag">${x[3]}</span></p><button class="secondary" onclick="notify('เลือก ${x[1]} แล้ว')">ใช้ / จัดการ</button></article>`).join('')}</div></div>`}
function generic(title,desc,body){return `<div class="view-content"><div class="view-title"><div><h1>${title}</h1><p>${desc}</p></div></div><section class="panel empty-state">${body}</section></div>`}
function render(view='overview'){const screens={overview,people:peopleView,expedition,inventory,production:()=>generic('การผลิตและซ่อมแซม','ใช้วัสดุและมอบหมายสมาชิกเพื่อเตรียมของจำเป็น','⚙️<h2>โรงผลิตยังทำงานอยู่</h2><p>สร้างน้ำสะอาด อาหาร ชุดป้องกัน และอะไหล่ได้จากหน้านี้</p><button class="primary" onclick="notify(\'เปิดคิวการผลิต\')">เปิดคิวการผลิต</button>'),events:()=>generic('เหตุการณ์','เรื่องราวที่กำลังเกิดขึ้นกับครอบครัว','❗<h2>มีเหตุการณ์รอการตัดสินใจ 2 รายการ</h2><div class="notice">มีเสียงเคาะประตูจากผู้รอดชีวิตด้านนอก</div><button class="primary" onclick="notify(\'เปิดเหตุการณ์แล้ว\')">ดูเหตุการณ์</button>'),weather:()=>generic('เครื่องวัดอุณหภูมิ','ดูการเปลี่ยนแปลงของอากาศและวางแผนออกสำรวจ','🌡️<h2>แนวโน้มอุณหภูมิ</h2><p>อีก 2 ชั่วโมงอากาศจะลดลงอย่างรวดเร็ว เตรียมชุดกันหนาวก่อนออกจากฐาน</p>'+bar(68,'orange')),story:()=>generic('บันทึกเรื่องราว','ความทรงจำและการตัดสินใจที่เปลี่ยนชะตาครอบครัว','📖<h2>วันที่ 1 — นิมิตก่อนเที่ยง</h2><p>ไม่มีใครเชื่อสิ่งที่คุณเห็น แต่เวลาบนหน้าปัดยังเดินต่อไป</p>'),settings:()=>generic('ตั้งค่า','ปรับการแสดงผลและการเล่นเกม','⚙️<h2>ต้นแบบ UI</h2><p>ระบบเสียง ภาษา และการบันทึกจะเพิ่มในขั้นถัดไป</p>')};main.innerHTML=screens[view]();document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));}
function advanceTime(){document.querySelector('#time').textContent='เวลา 19:00';document.querySelector('#airTemp').textContent='18°C';document.querySelector('#surfaceTemp').textContent='-6°C';notify('เข้าสู่ช่วงกลางคืนแล้ว — อุณหภูมิลดลงอย่างรวดเร็ว');}
function notify(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>render(b.dataset.view)));

// Expedition prototype state: the first playable decision loop.
let selectedMembers=[];
let selectedDestination='โรงพยาบาลเก่า';
function toggleMember(index){
  if(selectedMembers.includes(index)) selectedMembers=selectedMembers.filter(i=>i!==index);
  else if(selectedMembers.length<2) selectedMembers.push(index);
  else notify('หนึ่งภารกิจส่งสมาชิกได้สูงสุด 2 คน');
  render('expedition');
}
function chooseDestination(name){selectedDestination=name;render('expedition')}
function launchExpedition(){
  if(!selectedMembers.length){notify('เลือกสมาชิกอย่างน้อย 1 คนก่อนออกสำรวจ');return}
  const suitKey=gameState.temperature>0?'heatSuit':'coldSuit';
  const durabilityKey=gameState.temperature>0?'heatDurability':'coldDurability';
  if(gameState[suitKey]<=0||gameState[durabilityKey]<20){notify(gameState.temperature>0?'ไม่มีชุดกันร้อนที่พร้อมใช้งาน':'ไม่มีชุดกันหนาวที่พร้อมใช้งาน');return}
  gameState.activeSuit=suitKey;persistGame();notify(suitKey==='heatSuit'?'สวมชุดกันร้อนก่อนออกสำรวจ':'สวมชุดกันหนาวก่อนออกสำรวจ');
  eventScreen();
}
function expedition(){return `<div class="view-content"><div class="view-title"><div><h1>จัดทีมสำรวจ</h1><p>เลือกสมาชิก อุปกรณ์ และจุดหมายก่อนออกจากหลุมหลบภัย</p></div><button class="primary" onclick="launchExpedition()">ออกสำรวจ ▶</button></div><div class="expedition-layout"><section class="panel members"><h2>สมาชิกที่พร้อม (${selectedMembers.length}/2)</h2>${people.map((p,i)=>`<div class="member-row ${selectedMembers.includes(i)?'picked':''}"><div class="avatar art"><img src="assets/characters/${p.image}" alt="${p.name}"></div><div><strong>${p.name}</strong><small>${p.role}</small></div><button class="secondary" onclick="toggleMember(${i})">${selectedMembers.includes(i)?'เลือกแล้ว':'เลือก'}</button></div>`).join('')}</section><section class="panel destination"><h2>จุดหมายปลายทาง</h2>${[['โรงพยาบาลเก่า','🏥','อาจมีเวชภัณฑ์และเครื่องมือแพทย์หลงเหลือ','2.4 กม. · 3 ชม.','hospital.png','สูง'],['สถานีวัดอากาศ','📡','ค้นหาพยากรณ์อุณหภูมิรอบถัดไป','1.8 กม. · 2 ชม.','weather-station.png','กลาง'],['ตลาดริมคลอง','🏪','ของกิน น้ำ และผู้รอดชีวิตที่อาจต้องการความช่วยเหลือ','1.2 กม. · 1 ชม.','riverside-market.png','กลาง']].map(d=>`<div class="dest-card ${selectedDestination===d[0]?'selected':''}" onclick="chooseDestination('${d[0]}')" style="background-image:url('assets/locations/${d[4]}')"><h3>${d[1]} ${d[0]}</h3><p>${d[2]}</p><small>ระยะทาง ${d[3]}</small><div class="metric"><div class="metric-head"><span>ความเสี่ยง</span><b class="warning">${d[5]}</b></div>${bar(d[5]==='สูง'?72:45,'orange')}</div></div>`).join('')}</section><section class="panel summary"><h2>อุปกรณ์ติดตัว</h2>${[['🧥','ชุดกันร้อน','1 ชิ้น'],['💧','น้ำดื่ม','2 ขวด'],['🩹','ชุดปฐมพยาบาล','1 ชุด'],['🔋','แบตเตอรี่','4 ก้อน'],['📻','วิทยุฉุกเฉิน','1 เครื่อง']].map(x=>`<div class="notice"><b>${x[0]} ${x[1]}</b><br><small>${x[2]}</small></div>`).join('')}<div class="metric"><div class="metric-head"><span>ทีมที่เลือก</span><b>${selectedMembers.length}/2 คน</b></div>${bar(selectedMembers.length*50,'green')}</div><button class="primary" style="width:100%;margin-top:10px" onclick="launchExpedition()">ออกสำรวจ ▶</button></section></div></div>`}
function eventScreen(){
  const names=selectedMembers.map(i=>people[i].name).join(' และ ');
  const image=selectedDestination==='โรงพยาบาลเก่า'?'hospital.png':selectedDestination==='สถานีวัดอากาศ'?'weather-station.png':'riverside-market.png';
  main.innerHTML=`<div class="view-content event-screen"><div class="view-title"><div><h1>เหตุการณ์ระหว่างสำรวจ</h1><p>${selectedDestination} · ทีมของคุณคือ ${names}</p></div><button class="secondary" onclick="render('expedition')">← กลับไปวางแผน</button></div><section class="panel event-card" style="background-image:url('assets/locations/${image}')"><div class="event-overlay"><div class="event-copy"><span class="tag">${selectedDestination}</span><h2>${selectedDestination==='โรงพยาบาลเก่า'?'เสียงเครื่องกำเนิดไฟฟ้า':selectedDestination==='สถานีวัดอากาศ'?'ค่าที่ไม่ควรเป็นไปได้':'แสงไฟใต้หลังคาตลาด'}</h2><p>${selectedDestination==='โรงพยาบาลเก่า'?'ประตูห้องฉุกเฉินเปิดค้างอยู่ ด้านในยังมีไฟสีแดงกะพริบ และเสียงเครื่องจักรดังมาจากชั้นใต้ดิน':selectedDestination==='สถานีวัดอากาศ'?'หน้าปัดขนาดใหญ่กำลังวัดอุณหภูมิสองฝั่งพร้อมกัน ค่าที่แสดงทำให้คุณรู้ว่าโลกกำลังเปลี่ยนเร็วกว่าที่คิด':'ตลาดดูเหมือนถูกทิ้งร้าง แต่มีหม้อต้มอุ่น ๆ และวิทยุเปิดทิ้งไว้ในร้านริมน้ำ บางทีเจ้าของอาจยังอยู่ใกล้ ๆ'}</p><div class="event-meta"><span>🌡️ อากาศ 42°C</span><span>⏱ เหลือเวลาชุดป้องกัน 86 นาที</span><span>⚠ ความเสี่ยง ${selectedDestination==='โรงพยาบาลเก่า'?'สูง':'ปานกลาง'}</span></div><div class="event-actions"><button class="primary" onclick="resolveEvent('เสี่ยงเข้าไปค้นด้านใน')">เสี่ยงเข้าไปค้นด้านใน</button><button class="secondary" onclick="resolveEvent('ใช้เครื่องวัดตรวจพื้นที่ก่อน')">ใช้เครื่องวัดตรวจพื้นที่ก่อน</button><button class="secondary" onclick="resolveEvent('กลับหลุมหลบภัย')">กลับหลุมหลบภัย</button></div></div></div></section></div>`;
}
function resolveEvent(choice){notify(choice+' — ได้รับผลลัพธ์จากการสำรวจแล้ว');setTimeout(()=>render('expedition'),700)}

function resolveEvent(choice){
  const risky=choice.includes('เสี่ยง');
  const scan=choice.includes('เครื่องวัด');
  const retreat=choice.includes('กลับ');
  const destination=selectedDestination;
  const rewards=retreat?[['⏱','ประหยัดเวลา','ทีมกลับถึงหลุมหลบภัยอย่างปลอดภัย']]:scan?[['💊','ชุดปฐมพยาบาล x2','พบตู้เก็บยาที่ไม่มีสัญญาณอันตราย'],['📡','ข้อมูลพยากรณ์','บันทึกค่าอุณหภูมิรอบถัดไป']]:[['📦',destination==='ตลาดริมคลอง'?'อาหารแห้ง x8':'วัสดุซ่อม x12','เก็บของจากพื้นที่ด้านในได้'],['💧','น้ำดื่ม x4','พบเสบียงที่ยังใช้ได้']];
  const warning=retreat?'ไม่มีใครได้รับบาดเจ็บ':risky?'พี่สาวมีแผลถลอกเล็กน้อยจากเศษกระจก':'ทีมปลอดภัย แต่ใช้เวลาเพิ่ม 30 นาที';
  main.innerHTML=`<div class="view-content"><div class="view-title"><div><h1>ผลการสำรวจ</h1><p>${destination} · ภารกิจของ ${selectedMembers.map(i=>people[i].name).join(' และ ')}</p></div><button class="secondary" onclick="render('expedition')">จัดทีมอีกครั้ง</button></div><section class="panel result-layout"><div class="result-image" style="background-image:url('assets/locations/${destination==='โรงพยาบาลเก่า'?'hospital.png':destination==='สถานีวัดอากาศ'?'weather-station.png':'riverside-market.png'}')"><div class="result-stamp">✓ สำเร็จ</div></div><div class="result-copy"><span class="tag">${choice}</span><h2>${retreat?'กลับถึงหลุมหลบภัยก่อนอากาศเปลี่ยน':scan?'ข้อมูลสำคัญถูกบันทึกไว้':'ทีมค้นพบของที่ยังใช้ได้'}</h2><p>${retreat?'คุณตัดสินใจไม่เสี่ยงต่อ สมาชิกทุกคนกลับมาถึงฐานก่อนอุณหภูมิจะลดลง':scan?'เครื่องวัดส่งเสียงเตือนก่อนที่ทีมจะเข้าไปลึกกว่านี้ ข้อมูลที่ได้อาจช่วยวางแผนวันพรุ่งนี้':'ประตูด้านข้างเปิดออกพร้อมเสียงกระจกแตก ทีมต้องรีบเก็บของก่อนลมเย็นจะพัดเข้ามา'}</p><div class="result-warning">⚠ ${warning}</div><h3>สิ่งที่ได้รับ</h3><div class="reward-list">${rewards.map(r=>`<div class="reward"><span>${r[0]}</span><div><b>${r[1]}</b><small>${r[2]}</small></div></div>`).join('')}</div><div class="result-stats"><span>ความเหนื่อย <b>${retreat?'+5%':scan?'+18%':'+28%'}</b></span><span>เวลาที่ใช้ <b>${retreat?'30 นาที':scan?'2 ชม. 30 นาที':'3 ชั่วโมง'}</b></span><span>ความเสี่ยง <b>${retreat?'ต่ำ':scan?'ต่ำลง':'สูง'}</b></span></div><div class="result-actions"><button class="primary" onclick="render('overview');notify('สมาชิกกลับถึงหลุมหลบภัยแล้ว')">กลับหลุมหลบภัย</button><button class="secondary" onclick="eventScreen()">สำรวจต่อทันที</button></div></div></section></div>`;
}

// Persistent expedition results: choices now change survivors and supplies.
const gameState={food:3200,water:2100,materials:1400,medicine:28};
let lastChoice='';
let lastOutcomeApplied=false;
function formatCount(value){return value>=1000?(value/1000).toFixed(1)+'K':String(value)}
function updateResourceBar(){
  const map={foodValue:formatCount(gameState.food),waterValue:formatCount(gameState.water),materialsValue:formatCount(gameState.materials),medicineValue:gameState.medicine,energyValue:`${gameState.energy}%`,batteryValue:`${gameState.battery}%`};
  Object.entries(map).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.textContent=value});const airIcon=document.getElementById('airIcon'),surfaceIcon=document.getElementById('surfaceIcon');if(airIcon)airIcon.src=gameState.temperature>0?'assets/icons/heat-suit.png':'assets/icons/cold-suit.png';if(surfaceIcon)surfaceIcon.src=gameState.temperature>0?'assets/icons/heat-suit.png':'assets/icons/cold-suit.png';const peopleCount=document.querySelector('.people-count b');if(peopleCount)peopleCount.textContent=`${alivePeople().filter(p=>!p.expeditionStatus).length}/5`;
}
function applyOutcome(){
  if(lastOutcomeApplied)return;
  lastOutcomeApplied=true;
  const risky=lastChoice.includes('เสี่ยง');
  const scan=lastChoice.includes('เครื่องวัด');
  const hours=lastChoice.includes('กลับ')?0.5:scan?2.5:3;
  const fatigueGain=lastChoice.includes('กลับ')?5:scan?18:28;
  selectedMembers.forEach((index)=>{
    people[index].fatigue=Math.min(100,people[index].fatigue+fatigueGain);
    if(risky) people[index].health=Math.max(0,people[index].health-5);
  });
  gameState.water=Math.max(0,gameState.water-Math.round(hours*2));
  gameState.food=Math.max(0,gameState.food-Math.max(1,Math.round(hours/2)));
  if(!lastChoice.includes('กลับ')){
    if(scan) gameState.medicine+=2;
    else if(selectedDestination==='ตลาดริมคลอง') { gameState.food+=8; gameState.water+=4; }
    else { gameState.materials+=12; gameState.water+=4; }
  }
  updateResourceBar();
  notify(risky?'ทีมกลับถึงฐานแล้ว มีสมาชิกบาดเจ็บเล็กน้อย':`ทีมกลับถึงฐานแล้ว เหนื่อยเพิ่ม ${fatigueGain}%`);
  render('overview');
}
document.addEventListener('click',(event)=>{
  const eventButton=event.target.closest('.event-actions button');
  if(eventButton){lastChoice=eventButton.textContent.trim();lastOutcomeApplied=false;}
  if(event.target.closest('.result-actions .primary')) applyOutcome();
});
updateResourceBar();

// Multi-step narrative events: entering a location can reveal a second scene.
let eventStage=1;
const baseLaunchExpedition=window.launchExpedition;
window.launchExpedition=function(){eventStage=1;baseLaunchExpedition();};
const baseResolveEvent=window.resolveEvent;
window.resolveEvent=function(choice){
  if(eventStage===1 && choice.includes('เสี่ยง')){
    eventStage=2;
    notify('ทีมเข้าไปด้านในแล้ว — พบเหตุการณ์ใหม่');
    window.eventScreen();
    return;
  }
  baseResolveEvent(choice);
};
window.eventScreen=function(){
  const names=selectedMembers.map(i=>people[i].name).join(' และ ');
  const image=selectedDestination==='โรงพยาบาลเก่า'?'hospital.png':selectedDestination==='สถานีวัดอากาศ'?'weather-station.png':'riverside-market.png';
  const first=eventStage===1;
  const data={
    'โรงพยาบาลเก่า':first?{
      title:'เสียงเครื่องกำเนิดไฟฟ้า',
      text:'ประตูห้องฉุกเฉินเปิดค้างอยู่ ลมร้อนพัดกลิ่นยาฆ่าเชื้อและฝุ่นสนิมออกมาปะทะหน้า ด้านในยังมีไฟสีแดงกะพริบเป็นจังหวะ เสียงเครื่องจักรดังมาจากชั้นใต้ดิน ข้างป้ายประชาสัมพันธ์มีรอยขีดเขียนใหม่ เหมือนใครบางคนเพิ่งผ่านที่นี่ไปไม่นาน',
      choices:['เสี่ยงเข้าไปค้นด้านใน','ใช้เครื่องวัดตรวจพื้นที่ก่อน','กลับหลุมหลบภัย']
    }:{
      title:'สัญญาณชีพจากชั้นใต้ดิน',
      text:'เมื่อทีมผ่านโถงฉุกเฉิน ประตูเหล็กด้านหลังเลื่อนปิดลงเอง เสียงเครื่องกำเนิดไฟฟ้าหยุดไปชั่วขณะ แล้วเปลี่ยนเป็นเสียงเตือนสั้น ๆ จากชั้นใต้ดิน บนพื้นมีรอยลากของหนักและกล่องเวชภัณฑ์ที่ถูกเปิดทิ้งไว้ ขณะเดียวกันวิทยุฉุกเฉินของแม่รับสัญญาณขอความช่วยเหลือที่ขาด ๆ หาย ๆ',
      choices:['เปิดประตูชั้นใต้ดิน','เก็บเวชภัณฑ์แล้วถอย','ตอบกลับสัญญาณวิทยุ']
    },
    'สถานีวัดอากาศ':first?{
      title:'ค่าที่ไม่ควรเป็นไปได้',
      text:'หน้าปัดอุณหภูมิขนาดใหญ่แบ่งสถานีออกเป็นสองฝั่ง ฝั่งหนึ่งร้อนจนสีโลหะเปลี่ยน อีกฝั่งมีน้ำแข็งเกาะตามสายไฟ ทั้งที่พระอาทิตย์ยังไม่ตก เครื่องบันทึกข้อมูลทำงานเองและพิมพ์ตัวเลขซ้ำ ๆ บนกระดาษเปียก มีแผนที่เมืองถูกวงกลมไว้สามจุด ราวกับมีใครกำลังวางแผนเส้นทางอพยพ',
      choices:['ปีนขึ้นไปตรวจเสาอากาศ','ใช้เครื่องวัดเก็บข้อมูล','กลับหลุมหลบภัย']
    }:{
      title:'เสียงเรียกจากเสาอากาศ',
      text:'บนชั้นดาดฟ้า ทีมพบแบตเตอรี่สำรองที่ยังอุ่นและวิทยุสื่อสารซึ่งเพิ่งถูกเปิดใช้งาน หน้าจอแสดงข้อความสั้น ๆ ว่า “อย่าอยู่กลางแจ้งหลังพระจันทร์ขึ้น” ก่อนสัญญาณจะหายไป ใต้เสาอากาศมีรอยเท้าเปียกน้ำแข็งมุ่งไปทางบันไดหนีไฟ',
      choices:['ตามรอยเท้าไปทางบันไดหนีไฟ','ถอดแบตเตอรี่สำรองแล้วกลับ','ส่งพิกัดให้หลุมหลบภัย']
    },
    'ตลาดริมคลอง':first?{
      title:'แสงไฟใต้หลังคาตลาด',
      text:'ตลาดริมคลองดูเหมือนถูกทิ้งร้าง แต่หม้อต้มใบหนึ่งยังอุ่นอยู่ วิทยุเก่าบนชั้นวางกำลังเปิดเพลงเบา ๆ และมีแก้วน้ำวางอยู่สองใบ ด้านในร้านพบรอยเท้าเปื้อนโคลนลากไปตามท่าน้ำ ก่อนจะหายเข้าไปในตรอกแคบที่ถูกผ้าใบปิดบัง',
      choices:['เสี่ยงเข้าไปค้นด้านใน','ใช้เครื่องวัดตรวจพื้นที่ก่อน','กลับหลุมหลบภัย']
    }:{
      title:'คนแปลกหน้าหลังผ้าใบ',
      text:'หลังผ้าใบมีชายชราคนหนึ่งซ่อนตัวอยู่ เขายกมือห้ามไม่ให้ส่งเสียงและชี้ไปยังเรือที่ลอยนิ่งอยู่กลางคลอง บนเรือมีลังอาหารกับถังน้ำ แต่มีเงาคนเคลื่อนไหวอยู่ใต้ผ้าใบอีกชั้น ชายชราพูดเบา ๆ ว่าเขาจะช่วยบอกทาง หากทีมยอมแบ่งเสบียงให้หนึ่งส่วน',
      choices:['เข้าไปคุยกับชายชรา','หยิบเสบียงแล้วถอนตัว','ส่งสัญญาณเรียกคนในเรือ']
    }
  }[selectedDestination];
  const buttons=data.choices.map((c,i)=>`<button class="${i===0?'primary':'secondary'}" onclick="resolveEvent('${c}')">${c}</button>`).join('');
  main.innerHTML=`<div class="view-content event-screen"><div class="view-title"><div><h1>เหตุการณ์ระหว่างสำรวจ</h1><p>${selectedDestination} · ทีมของคุณคือ ${names} · ฉากที่ ${eventStage}</p></div><button class="secondary" onclick="render('expedition')">← กลับไปวางแผน</button></div><section class="panel event-card" style="background-image:url('assets/locations/${image}')"><div class="event-overlay"><div class="event-copy"><span class="tag">${selectedDestination}</span><h2>${data.title}</h2><p>${data.text}</p><div class="event-meta"><span>🌡️ อากาศ 42°C</span><span>⏱ เหลือเวลาชุดป้องกัน 86 นาที</span><span>⚠ ความเสี่ยง ${selectedDestination==='โรงพยาบาลเก่า'?'สูง':'ปานกลาง'}</span></div><div class="event-actions">${buttons}</div></div></div></section></div>`;
};

// Playable MVP rules: every expedition draws a random story variant and time advances.
let currentEventVariant=0;
const storyPools={
  'โรงพยาบาลเก่า':[
    {first:['เสียงเครื่องกำเนิดไฟฟ้า','ประตูห้องฉุกเฉินเปิดค้างอยู่ ลมร้อนพัดกลิ่นยาฆ่าเชื้อออกมา ไฟสีแดงกะพริบอยู่เหนือเคาน์เตอร์ และเสียงเครื่องจักรดังมาจากชั้นใต้ดิน ข้างป้ายประชาสัมพันธ์มีรอยขีดเขียนใหม่เหมือนใครเพิ่งผ่านไปไม่นาน',['เสี่ยงเข้าไปค้นด้านใน','ใช้เครื่องวัดตรวจพื้นที่ก่อน','กลับหลุมหลบภัย']],next:['สัญญาณชีพจากชั้นใต้ดิน','ประตูเหล็กเลื่อนปิดเอง เสียงเตือนดังจากชั้นใต้ดิน บนพื้นมีรอยลากของหนักและกล่องเวชภัณฑ์ถูกเปิดทิ้งไว้ วิทยุรับสัญญาณขอความช่วยเหลือที่ขาด ๆ หาย ๆ',['เปิดประตูชั้นใต้ดิน','เก็บเวชภัณฑ์แล้วถอย','ตอบกลับสัญญาณวิทยุ']]},
    {first:['ไฟฉุกเฉินที่ยังไม่ดับ','ในโถงผู้ป่วยมีไฟฉุกเฉินติดอยู่เพียงดวงเดียว แสงของมันสะท้อนบนพื้นน้ำขังเป็นทางยาว เสียงโลหะกระทบกันดังมาจากห้องผ่าตัด และแฟ้มคนไข้กองหนึ่งถูกวางเรียงเหมือนมีคนกำลังค้นหาอะไรบางอย่าง',['เสี่ยงเข้าไปค้นด้านใน','ใช้เครื่องวัดตรวจพื้นที่ก่อน','กลับหลุมหลบภัย']],next:['ห้องผ่าตัดที่มีคนอยู่','เมื่อประตูห้องผ่าตัดเปิดออก ทีมพบเครื่องมือที่ยังอุ่นและข้อความเขียนบนกระจกว่า “อย่าดับไฟ” จากด้านหลังม่านมีเสียงหายใจช้า ๆ ดังขึ้นหนึ่งครั้ง',['เปิดม่านดูด้านใน','เก็บอุปกรณ์แล้วถอย','เรียกถามว่ามีใครอยู่ไหม']]}
  ],
  'สถานีวัดอากาศ':[
    {first:['ค่าที่ไม่ควรเป็นไปได้','หน้าปัดอุณหภูมิแบ่งสถานีออกเป็นสองฝั่ง ฝั่งหนึ่งร้อนจนโลหะเปลี่ยนสี อีกฝั่งมีน้ำแข็งเกาะตามสายไฟ เครื่องบันทึกพิมพ์ตัวเลขซ้ำ ๆ และแผนที่เมืองถูกวงกลมไว้สามจุด',['ปีนขึ้นไปตรวจเสาอากาศ','ใช้เครื่องวัดเก็บข้อมูล','กลับหลุมหลบภัย']],next:['เสียงเรียกจากเสาอากาศ','บนดาดฟ้ามีวิทยุที่เพิ่งถูกเปิดใช้งาน หน้าจอแสดงข้อความว่า “อย่าอยู่กลางแจ้งหลังพระจันทร์ขึ้น” ก่อนสัญญาณหายไป ใต้เสาอากาศมีรอยเท้าน้ำแข็งมุ่งไปทางบันไดหนีไฟ',['ตามรอยเท้าไปทางบันไดหนีไฟ','ถอดแบตเตอรี่สำรองแล้วกลับ','ส่งพิกัดให้หลุมหลบภัย']]},
    {first:['พายุสองฤดู','เครื่องวัดลมหมุนสวนทางกันทั้งที่ไม่มีลม แผงโซลาร์เซลล์ด้านหนึ่งร้อนจัด แต่อีกด้านถูกเคลือบด้วยน้ำแข็ง เจ้าหน้าที่คนก่อนทิ้งสมุดบันทึกไว้พร้อมประโยคสุดท้ายว่า “อุณหภูมิไม่ได้เปลี่ยนตามเวลา”',['ตรวจสมุดบันทึก','ใช้เครื่องวัดเก็บข้อมูล','กลับหลุมหลบภัย']],next:['สัญญาณจากเมืองไกล','วิทยุรับเสียงคนเรียกชื่อสมาชิกในทีม ทั้งที่ไม่มีใครควรรู้ว่าพวกคุณอยู่ที่นี่ สัญญาณชี้ไปยังเขตเมืองที่ไฟดับสนิท และแบตเตอรี่สถานีกำลังลดลงอย่างรวดเร็ว',['ตอบกลับสัญญาณ','บันทึกพิกัดแล้วถอนตัว','ตัดไฟสถานี']]}
  ],
  'ตลาดริมคลอง':[
    {first:['แสงไฟใต้หลังคาตลาด','ตลาดดูเหมือนถูกทิ้งร้าง แต่หม้อต้มยังอุ่น วิทยุเก่าเปิดเพลงเบา ๆ และมีแก้วน้ำวางอยู่สองใบ รอยเท้าเปื้อนโคลนลากไปตามท่าน้ำก่อนหายเข้าไปในตรอกแคบ',['เสี่ยงเข้าไปค้นด้านใน','ใช้เครื่องวัดตรวจพื้นที่ก่อน','กลับหลุมหลบภัย']],next:['คนแปลกหน้าหลังผ้าใบ','ชายชราคนหนึ่งซ่อนตัวอยู่หลังผ้าใบ เขาชี้ไปยังเรือที่ลอยนิ่งกลางคลอง บนเรือมีลังอาหารกับถังน้ำ แต่มีเงาคนเคลื่อนไหวอยู่ใต้ผ้าใบอีกชั้น เขาขอให้ทีมแบ่งเสบียงเพื่อแลกกับข้อมูล',['เข้าไปคุยกับชายชรา','หยิบเสบียงแล้วถอนตัว','ส่งสัญญาณเรียกคนในเรือ']]},
    {first:['เสียงเคาะจากร้านปิด','หลังร้านขายของแห้งมีเสียงเคาะเป็นจังหวะสามครั้ง กล่องน้ำถูกจัดเรียงใหม่และมีผ้าห่มเปียกพาดอยู่บนเก้าอี้ ริมคลองมีเรือเล็กผูกเชือกไว้แน่นเหมือนเจ้าของเพิ่งหนีขึ้นฝั่ง',['เสี่ยงเข้าไปค้นด้านใน','ใช้เครื่องวัดตรวจพื้นที่ก่อน','กลับหลุมหลบภัย']],next:['ห้องเย็นใต้ตลาด','บันไดแคบนำลงไปยังห้องเย็นที่ยังมีไฟสำรอง กลิ่นอาหารแห้งลอยออกมา แต่ประตูด้านในถูกล็อกจากอีกฝั่ง และมีคนเคาะตอบกลับเมื่อทีมแตะลูกบิด',['ตะโกนถามคนด้านใน','เก็บของหน้าประตูแล้วถอย','เปิดล็อกเข้าไป']]}
  ]
};
const playableLaunch=window.launchExpedition;
window.launchExpedition=function(){currentEventVariant=Math.floor(Math.random()*2);playableLaunch();};
window.eventScreen=function(){
  const names=selectedMembers.map(i=>people[i].name).join(' และ '), pool=storyPools[selectedDestination]||storyPools['ตลาดริมคลอง'], story=pool[currentEventVariant]||pool[0], data=eventStage===1?story.first:story.next;
  const image=selectedDestination==='โรงพยาบาลเก่า'?'hospital.png':selectedDestination==='สถานีวัดอากาศ'?'weather-station.png':'riverside-market.png';
  const buttons=data[2].map((c,i)=>`<button class="${i===0?'primary':'secondary'}" onclick="resolveEvent('${c}')">${c}</button>`).join('');
  main.innerHTML=`<div class="view-content event-screen"><div class="view-title"><div><h1>เหตุการณ์ระหว่างสำรวจ</h1><p>${selectedDestination} · ทีมของคุณคือ ${names} · ฉากที่ ${eventStage}</p></div><button class="secondary" onclick="render('expedition')">← กลับไปวางแผน</button></div><section class="panel event-card" style="background-image:url('assets/locations/${image}')"><div class="event-overlay"><div class="event-copy"><span class="tag">เหตุการณ์สุ่ม · ${selectedDestination}</span><h2>${data[0]}</h2><p>${data[1]}</p><div class="event-meta"><span>🌡️ อากาศ 42°C</span><span>⏱ เหลือเวลาชุดป้องกัน 86 นาที</span><span>⚠ ความเสี่ยง ${selectedDestination==='โรงพยาบาลเก่า'?'สูง':'ปานกลาง'}</span></div><div class="event-actions">${buttons}</div></div></div></section></div>`;
};
const playableAdvanceTime=window.advanceTime;
window.advanceTime=function(){
  gameState.food=Math.max(0,gameState.food-12);gameState.water=Math.max(0,gameState.water-8);gameState.day+=1;
  playableAdvanceTime();const dayEl=document.querySelector('#day');if(dayEl)dayEl.textContent=`วันที่ ${gameState.day}`;updateResourceBar();notify(`เข้าสู่วันที่ ${gameState.day} — เสบียงถูกใช้ระหว่างพักอาศัย`);
};

// Command-center overview using the generated character assets.
function overview(){
  const tasks=[['⚙️','ซ่อมเครื่องกำเนิดไฟฟ้า',people[0],70],['💧','กรองน้ำ',people[1],45],['📦','จัดเสบียง',people[2],60],['🛡️','เฝ้าประตู',people[3],80]];
  return `<div class="view-content command-view"><div class="view-title"><div><h1>ภาพรวมหลุมหลบภัย</h1><p>จัดการครอบครัว ทรัพยากร และเตรียมรับคืนที่อุณหภูมิจะลดลง</p></div><button class="primary" onclick="advanceTime()">⌛ จบช่วงเวลา&nbsp; ▶</button></div><div class="command-layout"><section class="panel command-shelter"><div class="shelter-art"></div><div class="shelter-room room-bed" onclick="showRoom('bedroom')"><label>ห้องนอน</label><span>🛏️</span></div><div class="shelter-room room-storage" onclick="showRoom('storage')"><label>ห้องเก็บของ</label><span>📦</span></div><div class="shelter-room room-engine" onclick="showRoom('engine')"><label>ห้องเครื่อง</label><span>⚙️</span></div><div class="shelter-room room-med" onclick="showRoom('medical')"><label>ห้องพยาบาล</label><span>🩺</span></div><div class="shelter-room room-door" onclick="showRoom('exit')"><label>ประตูทางออก</label><span>🚪</span></div></section><aside class="panel command-status"><h2>สถานะหลุมหลบภัย</h2><div class="status-line"><span>♨ อุณหภูมิภายใน</span><b>28°C</b></div><div class="status-line"><span>🍽 อาหารเหลือ</span><b>3 วัน</b></div>${bar(72,'green')}<div class="status-line"><span>💧 น้ำเหลือ</span><b>2 วัน</b></div>${bar(51)}<div class="status-line"><span>⚡ ระบบไฟฟ้า</span><b>76%</b></div>${bar(76,'orange')}<div class="status-line"><span>🛡 ความปลอดภัย</span><b>82%</b></div>${bar(82,'green')}<div class="status-line"><span>👥 ความจุ</span><b>5/5</b></div>${bar(100,'green')}</aside></div><section class="panel command-people"><h2>สมาชิกในบ้าน (5/5)</h2><div class="character-strip">${people.map((p,i)=>`<article class="character-card"><div class="character-portrait"><img src="assets/characters/${p.image}" alt="${p.name}"></div><div class="character-info"><strong>${p.name}</strong><small>${p.role}</small><div class="mini-stat"><span>HP</span>${bar(p.health,'green')}<b>${p.health}</b></div><div class="mini-stat"><span>ใจ</span>${bar(p.morale,'orange')}<b>${p.morale}</b></div><div class="mini-stat"><span>เหนื่อย</span>${bar(p.fatigue)}<b>${p.fatigue}</b></div></div></article>`).join('')}</div></section><section class="panel command-tasks"><h2>งานที่กำลังทำ</h2><div class="task-strip">${tasks.map(t=>`<button class="task-card" onclick="notify('กำลังดำเนินการ: ${t[1]}')"><span class="task-symbol">${t[0]}</span><div><strong>${t[1]}</strong>${avatar(t[2])}${bar(t[3],'orange')}<small>${t[3]}% ดำเนินการ</small></div></button>`).join('')}</div></section></div>`;
}
// Systems 1–6: resources, time, base tasks, random base events, endings and save data.
Object.assign(gameState,{food:0,water:0,materials:0,medicine:0,energy:0,battery:0,security:0,heatSuit:0,coldSuit:0,heatDurability:0,coldDurability:0,tools:0,backpackLevel:0,facilityDamage:{storage:100,production:100,medical:100,engine:100},day:1,temperature:42,budget:10000,difficulty:'normal',prepDone:false,clockMinutes:0,balanceVersion:3,teamInventory:{water:0,medicine:0,battery:0,food:0},weapons:{pistol:0,rifle:0,sniper:0,machineGun:0,shotgun:0,melee:0},ammo:{pistol:0,rifle:0,sniper:0,machineGun:0,shotgun:0},grenades:{frag:0,smoke:0,flash:0},armor:{light:0,heavy:0},facilities:{storage:0,production:0,medical:0,generator:0}});
const eventHistory=[];
const storyFlags={chapter:0,helpedVisitors:false,radioContact:false,foundRoute:false};
const taskProgress={generator:70,water:45,food:60,guard:80};
let pendingMissionState=null,pendingMissionQueue=[];
let endState='';
function persistGame(){
  try{localStorage.setItem('last-light-save',JSON.stringify({gameState,people,eventHistory,taskProgress,baseEventQueue,productionQueue,storyFlags,missionState:typeof missionState==='undefined'?null:missionState,missionQueue:typeof missionQueue==='undefined'?[]:missionQueue,savedAt:Date.now()}))}catch(e){}
}
function loadGame(){
  try{const raw=localStorage.getItem('last-light-save');if(!raw)return;const save=JSON.parse(raw);pendingMissionState=save.missionState||null;pendingMissionQueue=Array.isArray(save.missionQueue)?save.missionQueue:[];Object.assign(gameState,save.gameState||{});gameState.facilityDamage={storage:100,production:100,medical:100,engine:100,...(gameState.facilityDamage||{})};gameState.weapons={pistol:0,rifle:0,sniper:0,machineGun:0,shotgun:0,melee:0,...(gameState.weapons||{})};gameState.ammo={pistol:0,rifle:0,sniper:0,machineGun:0,shotgun:0,...(gameState.ammo||{})};gameState.grenades={frag:0,smoke:0,flash:0,...(gameState.grenades||{})};gameState.armor={light:0,heavy:0,...(gameState.armor||{})};gameState.facilities={storage:0,production:0,medical:0,generator:0,...(gameState.facilities||{})};if(!save.gameState?.balanceVersion){gameState.food=Math.min(gameState.food,900);gameState.water=Math.min(gameState.water,700);gameState.materials=Math.min(gameState.materials,300);gameState.medicine=Math.min(gameState.medicine,6);gameState.balanceVersion=2}if(Array.isArray(save.people))save.people.forEach((p,i)=>Object.assign(people[i],p));if(Array.isArray(save.eventHistory))eventHistory.push(...save.eventHistory);Object.assign(taskProgress,save.taskProgress||{});Object.assign(storyFlags,save.storyFlags||{})}catch(e){}
}
function resetGame(){try{localStorage.removeItem('last-light-save')}catch(e){};location.reload()}
function isAlive(p){return !!p&&p.health>0&&p.expeditionStatus!=='เสียชีวิต'}
function alivePeople(){return people.filter(isAlive)}
function productionBusy(p){return String(p?.task||'').startsWith('ผลิต:')}
function availablePeople(){return people.map((p,i)=>({p,i})).filter(({p})=>isAlive(p)&&!p.expeditionStatus&&!p.treatmentUntil&&!productionBusy(p)&&p.task!=='พักผ่อน'&&p.task!=='กำลังพักผ่อน')}
function checkEndState(){
  if(endState)return true;
  if(!alivePeople().length){endState='lose';showEnd('ภารกิจล้มเหลว','ไม่มีสมาชิกคนใดเหลืออยู่ในหลุมหลบภัย');return true}
  if(gameState.food<=0&&gameState.water<=0){endState='lose';showEnd('เสบียงหมด','หลุมหลบภัยไม่เหลืออาหารและน้ำ');return true}
  if(gameState.day>=100){endState='win';const avg=Math.round(people.reduce((s,p)=>s+p.morale,0)/people.length);const fed=gameState.food>250&&gameState.water>250;const rescues=eventHistory.filter(e=>e.text&&(/ผู้รอดชีวิต|ช่วยผู้รอดชีวิต|ทีมกลับ/).test(e.text)).length;if(avg>=75&&fed&&rescues>=2)showEnd('ผู้พิทักษ์ผู้รอดชีวิต','คุณรักษาครอบครัว เสบียง และช่วยผู้รอดชีวิตไว้ได้จนถึงวันอพยพ');else if(avg>=75&&fed)showEnd('รุ่งอรุณของครอบครัว','คุณรักษาทั้งผู้คน เสบียง และความหวังไว้ได้ จนวันที่ 100 มาถึงพร้อมทุกคน');else if(avg>=55)showEnd('ผู้พิทักษ์หลุมหลบภัย','หลุมหลบภัยผ่านพ้นคืนยาวนานมาได้ แม้ทุกคนต้องแลกด้วยความเหนื่อยล้าและทรัพยากรที่เหลือไม่มาก');else showEnd('รอดชีวิตแบบบอบช้ำ','ประตูหลุมหลบภัยยังเปิดได้ในวันที่ 100 แต่ร่องรอยของการตัดสินใจตลอดทางจะอยู่กับครอบครัวไปอีกนาน');return true}
  return false;
}
function showEnd(title,desc){main.innerHTML=`<div class="view-content"><section class="panel empty-state end-state"><div class="end-icon">${endState==='win'?'★':'!'}</div><h1>${title}</h1><p>${desc}</p><p>วันที่ ${gameState.day} · อาหาร ${formatCount(gameState.food)} · น้ำ ${formatCount(gameState.water)}</p><button class="primary" onclick="resetGame()">เริ่มเกมใหม่</button></section></div>`}
function completeTask(key,label){
  if(label==='พักผ่อน')return;
  const gain={generator:['energy',8],water:['water',80],food:['food',80],guard:['security',4]}[key];
  if(!gain)return;
  taskProgress[key]=Math.min(100,taskProgress[key]+20);
  if(gain[0]==='energy')gameState.energy=Math.min(100,gameState.energy+gain[1]);
  if(gain[0]==='water')gameState.water+=gain[1];
  if(gain[0]==='food')gameState.food+=gain[1];
  const worker=people.find(p=>taskKeyFor(p)===key);if(worker){worker.fatigue=Math.min(100,worker.fatigue+5);worker.morale=Math.max(0,worker.morale-1)}
  updateResourceBar();persistGame();notify(`${label} เสร็จแล้ว — ได้รับทรัพยากรเพิ่ม`);render('overview');
}
function story(){
  const chapters=[['บทนำ','วันแรกในหลุมหลบภัย',0],['บทที่ 1','แผนที่ใต้พื้นคอนกรีต',2],['บทที่ 2','เสียงจากอีกฟากเมือง',7],['บทที่ 3','คืนที่อุณหภูมิกลับด้าน',15],['บทที่ 4','สัญญาณรุ่งอรุณ',22],['บทส่งท้าย','วันอพยพครั้งสุดท้าย',100]];
  const timeline=chapters.map(([label,title,day])=>{const unlocked=gameState.day>=day||eventHistory.some(e=>e.text&&e.text.includes(title));return `<div class="story-chapter ${unlocked?'unlocked':'locked'}"><div class="story-marker">${unlocked?'✓':'?'}</div><div><b>${label} · ${unlocked?title:'???'}</b><small>${unlocked?(day===0?'เรื่องราวเริ่มต้นในวันที่โลกเปลี่ยนไป':`ปลดล็อกในวันที่ ${day}`):'เรื่องราวนี้ยังไม่ถูกค้นพบ'}</small></div></div>`}).join('');
  const log=eventHistory.length?eventHistory.slice(-14).reverse().map(x=>`<div class="story-log-entry"><b>วันที่ ${x.day} · ${x.place}</b><span>${x.text}</span></div>`).join(''):'<p class="muted">ยังไม่มีบันทึกสำคัญ ลองจบช่วงเวลาหรือออกสำรวจเพื่อเริ่มเรื่องราว</p>';
  return `<div class="view-content story-view"><div class="view-title"><div><h1>บันทึกเรื่องราว</h1><p>การตัดสินใจทุกครั้งจะถูกเก็บไว้ และบางบทจะเปิดเผยเมื่อเวลาผ่านไป</p></div><span class="tag">วันที่ ${gameState.day}</span></div><div class="story-layout"><section class="panel story-timeline"><h2>เส้นเรื่อง</h2>${timeline}</section><section class="panel story-log"><h2>บันทึกเหตุการณ์ล่าสุด</h2>${log}</section></div></div>`;
}
const renderBeforeStory=window.render;
window.render=function(view='overview'){if(view==='story'){main.innerHTML=story();document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view==='story'));return}renderBeforeStory(view)};
const simulationAdvance=window.advanceTime;
window.advanceTime=function(){
  simulationAdvance();
  gameState.energy=Math.max(0,gameState.energy-4);gameState.temperature=gameState.day%2?42:-6;
  const dayEl=document.querySelector('#day');if(dayEl)dayEl.textContent=`วันที่ ${gameState.day}`;
  const air=document.querySelector('#airTemp');if(air)air.textContent=gameState.temperature>0?'42°C':'-6°C';
  updateResourceBar();
  if(Math.random()<0.35){const events=['มีเสียงเคาะประตูจากผู้รอดชีวิตด้านนอก','ไฟสำรองกระพริบ เตรียมซ่อมเครื่องกำเนิดไฟฟ้า','อากาศกลางคืนเย็นเร็วกว่าที่คาด'];const text=events[Math.floor(Math.random()*events.length)];eventHistory.push({day:gameState.day,place:'หลุมหลบภัย',text});notify(`เหตุการณ์ใหม่: ${text}`)}else notify(`เข้าสู่วันที่ ${gameState.day} — อุณหภูมิ ${gameState.temperature>0?'ร้อนจัด':'หนาวจัด'}`);
  persistGame();checkEndState();
};
const previousApplyOutcome=window.applyOutcome;
window.applyOutcome=function(){
  previousApplyOutcome();
  const hours=lastChoice.includes('กลับ')?.5:lastChoice.includes('เครื่องวัด')?2.5:3;
  if(gameState.activeSuit){const durabilityKey=gameState.activeSuit==='heatSuit'?'heatDurability':'coldDurability';gameState[durabilityKey]=Math.max(0,(gameState[durabilityKey]||100)-(lastChoice.includes('เสี่ยง')?28:15));if(gameState[durabilityKey]===0)gameState[gameState.activeSuit]=Math.max(0,(gameState[gameState.activeSuit]||0)-1);gameState.activeSuit='';}
  gameState.energy=Math.max(0,gameState.energy-Math.round(hours*4));gameState.battery=Math.max(0,gameState.battery-Math.round(hours*3));
  eventHistory.push({day:gameState.day,place:selectedDestination,text:`ทีมกลับจากภารกิจ: ${lastChoice}`});updateResourceBar();persistGame();checkEndState();
};
document.addEventListener('click',(event)=>{
  const task=event.target.closest('.task-card');
  if(task){const text=task.textContent;completeTask(text.includes('เครื่อง')?'generator':text.includes('กรอง')?'water':text.includes('เสบียง')?'food':'guard',text.split(/\s+/).slice(1,3).join(' '));}
});
loadGame();updateResourceBar();render('overview');

function syncOverviewStatus(){
  const lines=document.querySelectorAll('.command-status .status-line b');
  if(!lines.length)return;
  const homeCount=Math.max(1,typeof availablePeople==='function'?availablePeople().length:alivePeople().filter(p=>!p.expeditionStatus).length);
  lines[1].textContent=`${Math.max(0,Math.floor(gameState.food/(homeCount*12)))} วัน`;
  lines[2].textContent=`${Math.max(0,Math.floor(gameState.water/(homeCount*8)))} วัน`;
  lines[3].textContent=`${gameState.energy}%`;
  if(lines[4])lines[4].textContent=`${gameState.security??82}%`;
  const bars=document.querySelectorAll('.command-status .bar i');
  if(bars[0])bars[0].style.width=`${Math.min(100,gameState.food/30)}%`;
  if(bars[1])bars[1].style.width=`${Math.min(100,gameState.water/30)}%`;
  if(bars[2])bars[2].style.width=`${gameState.energy}%`;
}
const baseRenderForSync=window.render;
window.render=function(view='overview'){baseRenderForSync(view);syncOverviewStatus();};
syncOverviewStatus();

// Starting preparation shop: spend the limited budget before entering the shelter.
const inventoryIconFiles={food:'food.png',water:'water.png',material:'materials.png',medicine:'medicine.png',battery:'battery.png',heat:'heat-suit.png',cold:'cold-suit.png',radio:'radio.png',backpack:'team-pack.png',pistol:'pistol.png',rifle:'rifle.png',sniper:'sniper.png',machineGun:'machine-gun.png',shotgun:'shotgun.png',melee:'knife.png',ammo:'ammo.png',grenades:'frag-grenade.png',frag:'frag-grenade.png',smoke:'smoke-grenade.png',flash:'flash-grenade.png',armor:'facility-armor.png',heavyArmor:'facility-armor.png',storageRoom:'facility-storage.png',productionRoom:'facility-production.png',medicalRoom:'facility-medical.png',generatorRoom:'facility-generator.png'};
function shopIcon(key,fallback){const file=inventoryIconFiles[key];return file?`<img src="assets/icons/${file}" alt="" aria-hidden="true">`:`<span aria-hidden="true">${fallback}</span>`}
const shopItems={
  food:{icon:'🍽️',name:'อาหารแห้ง x1',desc:'เสบียง 1 หน่วย',cost:10,apply:()=>gameState.food+=1},
  water:{icon:'💧',name:'น้ำสะอาด x1',desc:'น้ำสำรอง 1 หน่วย',cost:10,apply:()=>gameState.water+=1},
  material:{icon:'📦',name:'วัสดุซ่อมแซม x1',desc:'วัสดุ 1 หน่วย',cost:10,apply:()=>gameState.materials+=1},
  medicine:{icon:'🩹',name:'ชุดปฐมพยาบาล x1',desc:'ยาสำหรับรักษา 1 ชุด',cost:20,apply:()=>gameState.medicine+=1},
  battery:{icon:'🔋',name:'แบตเตอรี่ x1',desc:'แบตเตอรี่ 1 หน่วย',cost:20,apply:()=>gameState.battery=Math.min(100,gameState.battery+1)},
  backpack:{icon:'🎒',name:'อัปเกรดกระเป๋าสำรวจ x1',desc:'เพิ่มน้ำหนักสัมภาระทีม +40 กก. · สูงสุดระดับ 3',cost:1200,apply:()=>gameState.backpackLevel=Math.min(3,(gameState.backpackLevel||0)+1)},
  heat:{icon:'🧥',name:'ชุดกันร้อน x1',desc:'ลดความเสี่ยงจากอากาศกลางวัน',cost:50,apply:()=>{gameState.heatSuit+=1;gameState.heatDurability+=100}},
  cold:{icon:'🧣',name:'ชุดกันหนาว x1',desc:'ลดความเสี่ยงจากอากาศกลางคืน',cost:50,apply:()=>{gameState.coldSuit+=1;gameState.coldDurability+=100}},
  radio:{icon:'📻',name:'วิทยุฉุกเฉิน x1',desc:'รับสัญญาณและเหตุการณ์พิเศษ',cost:100,apply:()=>gameState.tools+=1},
  pistol:{icon:'🔫',name:'ปืนสั้น x1',desc:'อาวุธพกสำหรับการปะทะระยะใกล้',cost:500,apply:()=>{gameState.weapons.pistol+=1;gameState.ammo.pistol+=1}},
  rifle:{icon:'🔫',name:'ปืนยาว x1',desc:'อาวุธหลักสำหรับทีมสำรวจ',cost:1000,apply:()=>{gameState.weapons.rifle+=1;gameState.ammo.rifle+=1}},
  sniper:{icon:'🎯',name:'ปืนสไนเปอร์ x1',desc:'อาวุธระยะไกล พลังโจมตีสูง',cost:1800,apply:()=>{gameState.weapons.sniper+=1;gameState.ammo.sniper+=1}},
  machineGun:{icon:'🔫',name:'ปืนกลหนัก x1',desc:'อาวุธสนับสนุน ใช้กระสุนมาก',cost:2500,apply:()=>{gameState.weapons.machineGun+=1;gameState.ammo.machineGun+=1}},
  shotgun:{icon:'🔫',name:'ปืนลูกซอง x1',desc:'อาวุธระยะใกล้ หยุดศัตรูได้ดี',cost:1500,apply:()=>{gameState.weapons.shotgun+=1;gameState.ammo.shotgun+=1}},
  melee:{icon:'🔪',name:'อาวุธประชิด x1',desc:'มีดและอุปกรณ์ต่อสู้ระยะประชิด ไม่ใช้กระสุน',cost:300,apply:()=>{gameState.weapons.melee+=1}},
  ammo:{icon:'🎯',name:'กระสุนสำรอง x1',desc:'เพิ่มกระสุนให้ปืนแต่ละชนิด 1 นัด',cost:10,apply:()=>{gameState.ammo.pistol+=1;gameState.ammo.rifle+=1;gameState.ammo.sniper+=1;gameState.ammo.machineGun+=1;gameState.ammo.shotgun+=1}},
  frag:{icon:'💣',name:'ระเบิดมือ x1',desc:'สร้างความเสียหายรุนแรงในพื้นที่',cost:40,apply:()=>{gameState.grenades.frag+=1}},
  smoke:{icon:'🌫️',name:'ระเบิดควัน x1',desc:'ช่วยถอนทีมจากสถานการณ์อันตราย',cost:20,apply:()=>{gameState.grenades.smoke+=1}},
  flash:{icon:'✨',name:'ระเบิดแสง x1',desc:'ทำให้ศัตรูเสียจังหวะชั่วคราว',cost:30,apply:()=>{gameState.grenades.flash+=1}},
  armor:{icon:'🛡️',name:'เสื้อเกราะเบา x1',desc:'ลดความเสียหายระหว่างปะทะ',cost:800,apply:()=>{gameState.armor.light+=1}},
  heavyArmor:{icon:'🛡️',name:'เสื้อเกราะหนัก x1',desc:'ลดความเสียหายได้มาก แต่น้ำหนักสูง',cost:1600,apply:()=>{gameState.armor.heavy+=1}},
  storageRoom:{icon:'🗄️',name:'สร้าง/อัปเกรดคลังเก็บของ x1',desc:'เพิ่มความจุคลัง +60 หน่วย · สูงสุดระดับ 3',cost:1500,apply:()=>gameState.facilities.storage=Math.min(3,(gameState.facilities.storage||0)+1)},
  productionRoom:{icon:'⚙️',name:'สร้าง/อัปเกรดห้องผลิต x1',desc:'เพิ่มผลผลิต 25% ต่อระดับ · สูงสุดระดับ 3',cost:2000,apply:()=>gameState.facilities.production=Math.min(3,(gameState.facilities.production||0)+1)},
  medicalRoom:{icon:'🏥',name:'สร้าง/อัปเกรดห้องพยาบาล x1',desc:'ลดเวลารักษาและเพิ่มประสิทธิภาพยา · สูงสุดระดับ 3',cost:1800,apply:()=>gameState.facilities.medical=Math.min(3,(gameState.facilities.medical||0)+1)},
  generatorRoom:{icon:'⚡',name:'สร้าง/อัปเกรดห้องเครื่อง x1',desc:'เพิ่มพลังงานเริ่มต้นและความปลอดภัย · สูงสุดระดับ 3',cost:2200,apply:()=>{gameState.facilities.generator=Math.min(3,(gameState.facilities.generator||0)+1);gameState.energy=Math.max(gameState.energy,25+(gameState.facilities.generator-1)*10);gameState.security=Math.max(gameState.security,25+(gameState.facilities.generator-1)*5)}}
};
function ownedItemCount(key){
  const map={food:'food',water:'water',material:'materials',medicine:'medicine',battery:'battery',heat:'heatSuit',cold:'coldSuit',radio:'tools',backpack:'backpackLevel',pistol:'weapons.pistol',rifle:'weapons.rifle',sniper:'weapons.sniper',machineGun:'weapons.machineGun',shotgun:'weapons.shotgun',melee:'weapons.melee',frag:'grenades.frag',smoke:'grenades.smoke',flash:'grenades.flash',armor:'armor.light',heavyArmor:'armor.heavy',storageRoom:'facilities.storage',productionRoom:'facilities.production',medicalRoom:'facilities.medical',generatorRoom:'facilities.generator'};
  const path=map[key]; if(!path)return 0; return path.split('.').reduce((v,k)=>v?.[k],gameState)||0;
}
const upgradeItemKeys=new Set(['backpack','storageRoom','productionRoom','medicalRoom','generatorRoom']);
function upgradeLevelFor(key){return key==='backpack'?(gameState.backpackLevel||0):key.endsWith('Room')?(gameState.facilities?.[{storageRoom:'storage',productionRoom:'production',medicalRoom:'medical',generatorRoom:'generator'}[key]]||0):0}
function itemCost(key,offset=0){const item=shopItems[key];if(!item)return 0;const level=upgradeLevelFor(key)+offset;return Math.max(10,Math.round(item.cost*(upgradeItemKeys?.has(key)?[1,1.5,2.25][Math.min(2,Math.max(0,level))]:1)/10)*10)}
function upgradeSummary(key){if(!upgradeItemKeys.has(key))return '';const level=upgradeLevelFor(key);if(level>=3)return `<div class="notice"><b>อัปเกรดเต็มแล้ว · ระดับ 3/3</b><small>ไม่สามารถเพิ่มระดับได้อีก</small></div>`;const next=level+1,benefit=key==='backpack'?`ความจุสัมภาระ ${80+level*40} → ${80+next*40} กก.${next===2?' · ลดความเหนื่อยจากการแบก 4%':next===3?' · ลดโอกาสของตกเมื่อรับของเกินความจุ':''}`:key==='storageRoom'?`ความจุคลัง ${160+level*60} → ${160+next*60} หน่วย`:key==='productionRoom'?`ผลผลิต ${Math.round(productionMultiplier(level)*100)}% → ${Math.round(productionMultiplier(next)*100)}%`:key==='medicalRoom'?'ลดเวลารักษาเพิ่ม 1 วันต่อระดับ':'พลังงานเริ่มต้นและความปลอดภัยเพิ่มขึ้น';return `<div class="notice"><b>ระดับ ${level}/3 → ${next}/3</b><small>${benefit} · ราคา ${itemCost(key)} เครดิต</small></div>`}
function showItemDetails(key,readOnly=false){
  const item=shopItems[key]; if(!item)return;
  const owned=ownedItemCount(key), inCart=shoppingCart[key]||0,price=itemCost(key);
  document.querySelector('.item-detail-backdrop')?.remove();
  main.insertAdjacentHTML('beforeend',`<div class="item-detail-backdrop" onclick="if(event.target===this)this.remove()"><section class="panel item-detail-modal"><button class="item-detail-close" onclick="this.closest('.item-detail-backdrop').remove()">×</button><div class="item-detail-visual"><span>${shopIcon(key,item.icon)}</span><small>ไอเท็มเอาตัวรอด</small></div><div class="item-detail-copy"><span class="tag">${owned?'มีในคลังแล้ว':'ยังไม่มีในคลัง'}</span><h2>${item.name.replace(/ x1$/,'')}</h2><p>${item.desc}</p>${upgradeSummary(key)}<div class="item-detail-stats"><span><small>ราคา</small><b>${price} เครดิต</b></span><span><small>ในคลัง</small><b>${owned} หน่วย</b></span><span><small>เลือกซื้อ</small><b>${inCart} หน่วย</b></span></div><div class="item-detail-actions"><button class="secondary" onclick="this.closest('.item-detail-backdrop').remove()">ปิด</button>${readOnly?'':`<button class="primary" onclick="buyItem('${key}');this.closest('.item-detail-backdrop').remove()">ซื้อ 1 หน่วย</button>`}</div></div></section></div>`);
}
let shoppingCart={};
function buyItem(key){const item=shopItems[key];if(!item)return;const price=itemCost(key,shoppingCart[key]||0);if(upgradeItemKeys.has(key)&&upgradeLevelFor(key)+(shoppingCart[key]||0)>=3){notify('อัปเกรดถึงระดับสูงสุดแล้ว');return}if(gameState.budget<price){notify('งบไม่พอสำหรับของชิ้นนี้');return}gameState.budget-=price;shoppingCart[key]=(shoppingCart[key]||0)+1;render('prep');}
function removeItem(key){const item=shopItems[key];if(!item||!shoppingCart[key])return;shoppingCart[key]--;gameState.budget+=itemCost(key,Math.max(0,(shoppingCart[key]||1)-1));if(shoppingCart[key]<=0)delete shoppingCart[key];render('prep');}
function enterShelter(){
  Object.entries(shoppingCart).forEach(([key,count])=>{for(let i=0;i<count;i++)shopItems[key].apply()});shoppingCart={};gameState.prepDone=true;document.body.classList.remove('prep-mode');persistGame();updateResourceBar();leaveTitleScreen?.();notify('เตรียมฐานเสร็จแล้ว — เข้าหลุมหลบภัย');window.render('overview');
}
window.enterShelter=enterShelter;
function prep(){
  const items=Object.entries(shopItems);const bought=Object.entries(shoppingCart).filter(([,n])=>n>0);
  const profile=difficultyProfile(),spent=profile.budget-gameState.budget;
  return `<div class="view-content prep-view"><div class="prep-hero"><div><span class="tag">ก่อนวันเดือด · จัดฐานด้วยตัวเอง</span><h1>เลือกเสบียงก่อนเข้าหลุมหลบภัย</h1><p>ซื้อทีละ 1 หน่วย ราคาทุกชิ้นเป็นเลขลงท้ายด้วย 0 ไม่มีเศษเครดิต</p></div><div class="prep-budget"><small>งบเริ่มต้น ${profile.budget.toLocaleString()} เครดิต · ระดับ ${profile.label}</small><b>${gameState.budget}</b><span>เหลือ · ใช้ไป ${spent}</span></div></div><div class="prep-layout"><section class="panel shop-panel"><div class="section-heading"><div><h2>ร้านค้าชั่วคราว</h2><p class="muted">ไอคอนตรงกับหน้าคลังทรัพยากร · กดซื้อแต่ละครั้งได้รับ 1 หน่วย</p></div><span class="tag">สมาชิก 5 คน</span></div><div class="shop-grid">${items.map(([key,item])=>`<article class="shop-item" data-item="${key}" title="${item.desc}"><div class="shop-icon-frame" onclick="showItemDetails('${key}')"><span class="shop-icon">${shopIcon(key,item.icon)}</span><small>ไอเท็ม</small></div><div class="shop-item-info"><h3>${item.name.replace(/ x1$/,'')}</h3><p>${item.desc}</p><div class="shop-item-meta"><b>${itemCost(key)} เครดิต</b><span>1 หน่วย</span></div></div><button class="primary shop-buy" onclick="buyItem('${key}')"><span>＋</span> ซื้อ</button></article>`).join('')}</div></section><aside class="panel cart-panel"><h2>แผนเสบียงของคุณ</h2><p class="muted">ของที่เลือกจะถูกส่งเข้าคลังเมื่อกดเข้าหลุมหลบภัย</p>${bought.length?bought.map(([key,count])=>`<div class="cart-row"><span class="cart-item-icon">${shopIcon(key,shopItems[key].icon)}</span><span>${shopItems[key].name}</span><input class="cart-qty" type="number" min="0" value="${count}" aria-label="จำนวน ${shopItems[key].name}" onchange="setCartQuantity('${key}',this.value)"><button class="secondary cart-plus" onclick="buyItem('${key}')">＋</button><button class="secondary cart-minus" onclick="removeItem('${key}')">−</button></div>`).join(''):'<p class="muted">ยังไม่ได้เลือกเสบียง</p>'}<div class="prep-tip"><b>คำแนะนำ</b><span>ชุดกันร้อนและชุดกันหนาวช่วยให้ทีมออกสำรวจได้ปลอดภัยขึ้น</span></div><div class="prep-note">เครดิตที่เหลือจะเก็บไว้เป็นทุนสำรองหลังเริ่มเกม</div><button class="primary shelter-entry" onclick="enterShelter()">เข้าหลุมหลบภัย ▶</button></aside></div></div>`;
}
const renderBeforePrep=window.render;
window.render=function(view='overview'){
  if(view==='prep'){document.body.classList.add('prep-mode');main.innerHTML=prep();document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));return} document.body.classList.remove('prep-mode');
  renderBeforePrep(view);
};
if(!gameState.prepDone)window.render('prep');
const renderWithPrep=window.render;
window.render=function(view='overview'){
  if(view==='settings'){
    main.innerHTML=`<div class="view-content"><div class="view-title"><div><h1>ตั้งค่า</h1><p>จัดการการบันทึกและเริ่มเกมใหม่</p></div></div><section class="panel empty-state"><h2>ต้นแบบ UI</h2><p>เกมบันทึกสถานะอัตโนมัติในเครื่องนี้</p><div class="save-actions"><button class="secondary" onclick="exportSave()">ส่งออกเซฟ</button><label class="secondary file-button">นำเข้าเซฟ<input type="file" accept="application/json" onchange="importSave(event)"></label><button class="primary" onclick="resetGame()">ล้างเซฟและเริ่มเกมใหม่</button></div><div class="play-stats"><b>สถิติการเล่น</b><span>วันที่ ${gameState.day}</span><span>เหตุการณ์ ${eventHistory.length}</span><span>สมาชิกที่เสียไป ${storyFlags.losses||0}</span></div></section></div>`;
    document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view==='settings'));return;
  }
  renderWithPrep(view);
};

// Keep the HUD clock in sync with expedition duration and time skips.
function formatClock(minutes){minutes=((minutes%1440)+1440)%1440;return `${String(Math.floor(minutes/60)).padStart(2,'0')}:${String(minutes%60).padStart(2,'0')}`}
function syncClock(){const timeEl=document.querySelector('#time');if(timeEl)timeEl.textContent=`เวลา ${formatClock(gameState.clockMinutes||1060)}`;const dayEl=document.querySelector('#day');if(dayEl)dayEl.textContent=`วันที่ ${gameState.day}`}
const outcomeWithClock=window.applyOutcome;
window.applyOutcome=function(){
  const hours=lastChoice.includes('กลับ')?.5:lastChoice.includes('เครื่องวัด')?2.5:3;
  outcomeWithClock();gameState.clockMinutes=(gameState.clockMinutes||1060)+Math.round(hours*60);while(gameState.clockMinutes>=1440){gameState.clockMinutes-=1440;gameState.day+=1}syncClock();persistGame();
};
const advanceWithClock=window.advanceTime;
window.advanceTime=function(){advanceWithClock();gameState.clockMinutes=(gameState.clockMinutes||1060)+90;let crossed=false;while(gameState.clockMinutes>=1440){gameState.clockMinutes-=1440;gameState.day+=1;crossed=true}if(crossed)queueStoryBeat(gameState.day);syncClock();persistGame()};
syncClock();

// Base shelter events: a real decision queue separate from expedition scenes.
const baseEventCatalog=[
  {id:'visitor',icon:'🚪',title:'เสียงเคาะประตูยามค่ำคืน',text:'มีคนสามคนยืนอยู่หน้าประตู พวกเขาขอน้ำและที่พักหนึ่งคืน แต่เครื่องวัดอุณหภูมิกำลังลดลงอย่างรวดเร็ว',choices:[['ให้เข้าพัก', 'ทีมได้สมาชิกใหม่และกำลังใจเพิ่ม แต่ใช้อาหารกับน้ำ'],['แบ่งเสบียงแล้วให้เดินทางต่อ','ช่วยพวกเขาโดยไม่เพิ่มภาระในฐาน']]},
  {id:'generator',icon:'⚙️',title:'เครื่องกำเนิดไฟฟ้าส่งเสียงผิดปกติ',text:'เสียงเครื่องยนต์ดังเป็นจังหวะและไฟกะพริบ หากไม่ซ่อมตอนนี้ อุปกรณ์กรองน้ำอาจหยุดทำงานในช่วงกลางคืน',choices:[['หยุดงานอื่นเพื่อซ่อม','ใช้วัสดุซ่อมและเพิ่มพลังงานสำรอง'],['ปล่อยให้ทำงานต่อ','ประหยัดวัสดุ แต่ระบบไฟฟ้าจะเสื่อม']]},
  {id:'water',icon:'💧',title:'ถังน้ำมีกลิ่นผิดปกติ',text:'แม่พบกลิ่นโลหะในถังน้ำสำรอง เหลือน้ำสะอาดไม่มากพอสำหรับทุกคนจนกว่าจะถึงวันพรุ่งนี้',choices:[['กรองน้ำใหม่ทั้งหมด','ใช้พลังงานเพื่อรักษาน้ำสะอาด'],['ประกาศปันส่วนน้ำ','ประหยัดพลังงาน แต่กำลังใจของทุกคนลดลง']]},
  {id:'radio',icon:'📻',title:'สัญญาณวิทยุจากเขตอพยพ',text:'วิทยุฉุกเฉินจับสัญญาณสั้น ๆ จากอีกฟากเมือง เสียงปลายสายบอกว่ามีคลังเสบียงเปิดอยู่ แต่เส้นทางจะปลอดภัยเพียงไม่กี่ชั่วโมง',choices:[['ตอบกลับและแลกพิกัด','ใช้แบตเตอรี่ แต่ช่วยเปิดเส้นทางสำรวจใหม่'],['ปิดวิทยุเพื่อประหยัดไฟ','เก็บแบตเตอรี่ไว้ใช้ในยามจำเป็น']]},
  {id:'coldfront',icon:'❄️',title:'ลมหนาวลอดเข้าหลุมหลบภัย',text:'อุณหภูมิภายนอกลดลงอย่างรวดเร็ว น้ำค้างแข็งเกาะตามช่องระบายอากาศ สมาชิกที่เฝ้าประตูเริ่มมือชาและทำงานช้าลง',choices:[['แจกชุดกันหนาวให้ทีม','ความเหนื่อยลดลง แต่ชุดกันหนาวสึกหรอ'],['ปิดห้องชั้นนอกทั้งหมด','ประหยัดอุปกรณ์ แต่กำลังใจลดลงเล็กน้อย']]},
  {id:'injury',icon:'🩹',title:'บาดแผลจากงานซ่อม',text:'ระหว่างยกอะไหล่ พ่อถูกขอบเหล็กบาดลึก แผลยังไม่อันตรายถึงชีวิต แต่ถ้าปล่อยไว้อาจติดเชื้อก่อนเช้า',choices:[['ใช้ชุดปฐมพยาบาลทันที','รักษาสุขภาพและลดความเหนื่อย'],['พันแผลด้วยผ้าเก่า','เก็บยาไว้ แต่สุขภาพลดลงเล็กน้อย']]},
  {id:'raider_ambush',icon:'⚔️',title:'ซุ่มโจมตีของกลุ่มเถ้าดำ',text:'กลุ่มโจรสวมหน้ากากโผล่จากซากรถ พวกมันต้องการเสบียงและอาวุธของครอบครัว การตัดสินใจครั้งนี้จะกำหนดว่าพวกมันจะตามรอยฐานเจอหรือไม่',choices:[['ตั้งแนวป้องกันและยิงตอบโต้','ใช้กระสุน แต่รักษาเสบียงและทำให้กลุ่มโจรถอย'],['โยนระเบิดควันแล้วถอนตัว','ลดการปะทะ หากมีระเบิดควันจะเสียหายน้อยลง'],['ยอมทิ้งเสบียงบางส่วน','เสียอาหารและน้ำ แต่ลดโอกาสบาดเจ็บ']]},
  {id:'raider_negotiation',icon:'☠️',title:'การเจรจากับหัวหน้ากลุ่มเถ้าดำ',text:'หัวหน้ากลุ่มโจรส่งคนมาขอแลกเปลี่ยน เขารู้พิกัดเส้นทางสู่ศูนย์อพยพ แต่ถ้าคุยพลาด เขาอาจนำคนกลับมาล้อมบังเกอร์',choices:[['แลกวัสดุกับข้อมูล','เสียวัสดุ แต่ได้พิกัดและลดความเสี่ยงระยะยาว'],['ข่มขู่ให้ถอยไป','ไม่เสียของ แต่ความขัดแย้งจะรุนแรงขึ้น'],['รับคนเจ็บของพวกเขาไว้','ใช้ยาและเปิดทางสู่การเป็นพันธมิตร']]},
];
const storyEventCatalog={
  4:{id:'story_signal',icon:'📻',title:'บทที่ 1: สัญญาณจากประตูปิดตาย',text:'วิทยุฉุกเฉินส่งพิกัดสั้น ๆ จากเขตอพยพหมายเลข 7 ก่อนสัญญาณจะเงียบลง คุณตาจำเสียงเตือนในข้อความได้ มันเป็นรหัสของโครงการ AURORA ที่ไม่ควรยังทำงานอยู่',choices:[['บันทึกพิกัดและตอบกลับ','ใช้แบตเตอรี่ แต่ปลดล็อกเส้นทางลับ'],['ปิดวิทยุและซ่อนตัว','เก็บแบตเตอรี่ แต่พลาดโอกาสรู้ความจริง']]},
  7:{id:'story_door',icon:'🚪',title:'บทที่ 2: คนที่อยู่นอกประตู',text:'กลุ่มผู้รอดชีวิตที่เคาะประตูเมื่อคืนกลับมาอีกครั้ง พวกเขาบอกว่าศูนย์อพยพกำลังคัดเลือกคน และคนที่ไม่ผ่านเกณฑ์จะถูกทิ้งไว้กลางพายุ',choices:[['เปิดประตูรับทุกคน','ใช้อาหารและน้ำมาก แต่ได้พันธมิตรและข้อมูล'],['ให้เสบียงแล้วปิดประตู','ลดความเสี่ยงในฐาน แต่ความสัมพันธ์กับผู้รอดชีวิตหายไป']]},
  10:{id:'story_watchtower',icon:'🛰️',title:'บทที่ 3: ห้องเฝ้าระวังใต้เมือง',text:'จากแผนที่ของคุณตา ทีมพบห้องควบคุมเก่าที่มีกล้องนับร้อยตัว ทุกจอแสดงภาพเมืองและภาพของบังเกอร์คุณเอง มีใครบางคนกำลังเฝ้าดูครอบครัวมาตั้งแต่วันแรก',choices:[['ดึงข้อมูลจากระบบ','ใช้พลังงานและเสี่ยงให้ระบบตรวจพบ แต่ได้หลักฐานสำคัญ'],['ทำลายกล้องแล้วถอยกลับ','ปลอดภัยกว่า แต่เสียโอกาสรู้ว่าใครกำลังมองอยู่']]},
  13:{id:'story_aurora',icon:'🌐',title:'บทที่ 4: ศูนย์ควบคุม AURORA',text:'ประตูเหล็กใต้สถานีรถไฟเปิดออกสู่ศูนย์ควบคุมขนาดมหึมา แผนที่โลกบนจอแสดงว่าความร้อนและความหนาวถูกปล่อยจากสถานีเหล่านี้โดยเจตนา ภัยพิบัติอาจไม่ใช่อุบัติเหตุ',choices:[['คัดลอกข้อมูลทั้งหมด','ใช้แบตเตอรี่และเวลา แต่ปลดล็อกความจริงของ AURORA'],['ปิดสัญญาณเตือนแล้วกลับ','รักษาความปลอดภัยของทีม แต่ข้อมูลจะถูกลบในไม่ช้า']]},
  16:{id:'story_storm',icon:'🌪️',title:'บทที่ 5: คืนที่อุณหภูมิกลับด้าน',text:'ทั้งเมืองกำลังร้อนเหมือนไฟไหม้ ขณะที่ด้านนอกบังเกอร์ถูกพายุหิมะกลืนกิน ระบบ AURORA กำลังสลับขั้วอากาศและจะทำให้โครงสร้างใต้ดินแตกร้าวก่อนเช้า',choices:[['ฝืนซ่อมระบบระบายอากาศ','ใช้วัสดุจำนวนมาก แต่ลดความเสียหายและช่วยสมาชิกที่อ่อนแอ'],['ปิดทุกช่องทางและรอ','ประหยัดของ แต่สมาชิกทุกคนเหนื่อยและบาดเจ็บจากความหนาว']]},
  20:{id:'story_generator',icon:'⚙️',title:'บทที่ 6: โรงงานพลังงานที่กำลังพัง',text:'ทีมพบว่าเครื่องกำเนิดของบังเกอร์เชื่อมต่อกับสถานีพลังงานเก่าของ AURORA หากปล่อยให้ทำงานต่อ ระบบจะจ่ายไฟให้ศูนย์ควบคุม แต่เครื่องจักรจะระเบิดภายในไม่กี่วัน',choices:[['ตัดไฟจาก AURORA','ใช้วัสดุซ่อมจำนวนมาก แต่หยุดการควบคุมสภาพอากาศบางส่วน'],['ปล่อยให้เครื่องทำงานต่อ','มีพลังงานใช้มากขึ้น แต่ความเสี่ยงเสียสมาชิกจะเพิ่มขึ้น']]},
  24:{id:'story_sacrifice',icon:'🚨',title:'บทที่ 7: ประตูเหล็กแห่งการเสียสละ',text:'น้ำแข็งละลายไหลเข้าทางเดินฉุกเฉิน ประตูนิรภัยจะเปิดได้เพียงครั้งเดียว และต้องมีคนอยู่ที่แผงควบคุมด้านในจนกว่าคนอื่นจะผ่านไปครบ',choices:[['ให้สมาชิกอาสาเฝ้าประตู','เสี่ยงเสียสมาชิกหนึ่งคน แต่เปิดทางให้ทุกคนหนีได้'],['ปิดประตูและอยู่รวมกัน','ไม่มีใครต้องเสียสละ แต่เสบียงและพื้นที่ปลอดภัยจะลดลงมาก']]},
  27:{id:'story_evacuation',icon:'🌅',title:'บทที่ 8: เส้นทางสู่มหานครแห่งความหวัง',text:'ระบบ AURORA ประกาศว่าศูนย์อพยพจะเปิดในอีกสามวัน แผนที่แสดงเส้นทางผ่านมหานครที่จมน้ำและช่องแช่แข็ง ไม่มีใครรู้ว่าปลายทางคือที่หลบภัยจริงหรือกับดัก',choices:[['เตรียมออกเดินทางทันที','ใช้เสบียงและวัสดุ แต่เพิ่มโอกาสไปถึงศูนย์อพยพ'],['รอให้พายุสงบกว่านี้','รักษาทรัพยากร แต่เส้นทางอาจปิดตายก่อนถึงเวลา']]}
};
function queueStoryBeat(day){const beat=storyEventCatalog[day];if(!beat||storyFlags.chapter>=day||baseEventQueue.some(e=>e.id===beat.id))return;if(baseEventQueue.length>=3)return;baseEventQueue.push({...beat,choices:beat.choices.map(c=>[...c])});storyFlags.chapter=day;eventHistory.push({day,place:'หลุมหลบภัย',text:`เริ่มบทเนื้อเรื่อง: ${beat.title}`});updateEventBadge();notify(`บทใหม่: ${beat.title}`)}
let baseEventQueue=baseEventCatalog.slice(0,2).map(e=>({...e,choices:e.choices.map(c=>[...c])}));
try{const savedEvents=JSON.parse(localStorage.getItem('last-light-save')||'null');if(savedEvents&&Array.isArray(savedEvents.baseEventQueue))baseEventQueue=savedEvents.baseEventQueue}catch(e){}
function updateEventBadge(){document.querySelectorAll('.nav-item[data-view="events"] .badge').forEach(b=>b.textContent=baseEventQueue.length)}
function resolveBaseEvent(id,choiceIndex){
  const event=baseEventQueue.find(e=>e.id===id);if(!event)return;
  if(id==='visitor'&&choiceIndex===0){gameState.food=Math.max(0,gameState.food-80);gameState.water=Math.max(0,gameState.water-80);people.forEach(p=>p.morale=Math.min(100,p.morale+4))}
  if(id==='visitor'&&choiceIndex===1){gameState.food=Math.max(0,gameState.food-35);gameState.water=Math.max(0,gameState.water-35);people.forEach(p=>p.morale=Math.min(100,p.morale+2))}
  if(id==='generator'&&choiceIndex===0){gameState.materials=Math.max(0,gameState.materials-40);gameState.energy=Math.min(100,gameState.energy+12)}
  if(id==='generator'&&choiceIndex===1){gameState.energy=Math.max(0,gameState.energy-10)}
  if(id==='water'&&choiceIndex===0){gameState.energy=Math.max(0,gameState.energy-8);gameState.water=Math.max(0,gameState.water-60)}
  if(id==='water'&&choiceIndex===1){gameState.water=Math.max(0,gameState.water-100);people.forEach(p=>p.morale=Math.max(0,p.morale-4))}
  if(id==='radio'&&choiceIndex===0){gameState.battery=Math.max(0,gameState.battery-12);gameState.materials+=20;eventHistory.push({day:gameState.day,place:'หลุมหลบภัย',text:'รับพิกัดจากสัญญาณวิทยุ — ได้วัสดุจากการแลกเปลี่ยน'})}
  if(id==='radio'&&choiceIndex===1){gameState.battery=Math.min(100,gameState.battery+2)}
  if(id==='coldfront'&&choiceIndex===0){if(gameState.coldSuit>0){gameState.coldDurability=Math.max(0,(gameState.coldDurability||100)-12)}people.forEach(p=>p.fatigue=Math.max(0,p.fatigue-8))}
  if(id==='coldfront'&&choiceIndex===1){people.forEach(p=>p.morale=Math.max(0,p.morale-3));gameState.energy=Math.max(0,gameState.energy-4)}
  if(id==='injury'&&choiceIndex===0){gameState.medicine=Math.max(0,gameState.medicine-1);people[0].health=Math.min(100,people[0].health+8);people[0].fatigue=Math.max(0,people[0].fatigue-6)}
  if(id==='injury'&&choiceIndex===1){const before=people[0].health;people[0].health=Math.max(0,people[0].health-6);people[0].fatigue=Math.min(100,people[0].fatigue+8);if(before>0&&people[0].health===0){people[0].expeditionStatus='เสียชีวิต';processDeathAftermath(people[0])}}  if(id==='raider_ambush'&&choiceIndex===0){const ammoKey='rifle';const used=Math.min(gameState.ammo[ammoKey]||0,8);gameState.ammo[ammoKey]=(gameState.ammo[ammoKey]||0)-used;gameState.security=Math.min(100,(gameState.security||82)+6);people.filter(isAlive).forEach(p=>p.morale=Math.min(100,p.morale+2));eventHistory.push({day:gameState.day,place:'แนวป้องกันบังเกอร์',text:`ยิงตอบโต้กลุ่มเถ้าดำ ใช้กระสุน ${used} นัด`})}else if(id==='raider_ambush'&&choiceIndex===1){if((gameState.grenades.smoke||0)>0){gameState.grenades.smoke--;people.filter(isAlive).forEach(p=>p.health=Math.max(1,p.health-2));gameState.security=Math.max(0,(gameState.security||82)-2)}else{gameState.food=Math.max(0,gameState.food-70);gameState.water=Math.max(0,gameState.water-45)}}else if(id==='raider_ambush'&&choiceIndex===2){gameState.food=Math.max(0,gameState.food-100);gameState.water=Math.max(0,gameState.water-80);gameState.security=Math.max(0,(gameState.security||82)-4)}
  if(id==='raider_negotiation'&&choiceIndex===0){gameState.materials=Math.max(0,gameState.materials-35);storyFlags.raiderIntel=true;gameState.security=Math.min(100,(gameState.security||82)+4)}else if(id==='raider_negotiation'&&choiceIndex===1){gameState.security=Math.max(0,(gameState.security||82)-8);people.filter(isAlive).forEach(p=>p.morale=Math.max(0,p.morale-4))}else if(id==='raider_negotiation'&&choiceIndex===2){if(gameState.medicine>0){gameState.medicine--;storyFlags.raiderAlliance=true;gameState.security=Math.min(100,(gameState.security||82)+8)}else notify('ไม่มียารักษาคนเจ็บของกลุ่มโจร')}
  if(id==='story_day2'&&choiceIndex===0){people[4].fatigue=Math.min(100,people[4].fatigue+12);storyFlags.foundRoute=true;gameState.materials+=35}else if(id==='story_day2'&&choiceIndex===1){people.forEach(p=>p.morale=Math.min(100,p.morale+3))}
  if(id==='story_day7'&&choiceIndex===0){gameState.energy=Math.max(0,gameState.energy-12);storyFlags.radioContact=true;people.forEach(p=>p.morale=Math.min(100,p.morale+5))}else if(id==='story_day7'&&choiceIndex===1){gameState.energy=Math.min(100,gameState.energy+3);people.forEach(p=>p.morale=Math.max(0,p.morale-3))}
  if(id==='story_day15'&&choiceIndex===0){gameState.energy=Math.min(100,gameState.energy+8);people.forEach(p=>p.fatigue=Math.min(100,p.fatigue+8))}else if(id==='story_day15'&&choiceIndex===1){gameState.materials=Math.max(0,gameState.materials-80);gameState.energy=Math.min(100,gameState.energy+18)}
  if(id==='story_day22'&&choiceIndex===0){people.forEach(p=>p.morale=Math.min(100,p.morale+8))}else if(id==='story_day22'&&choiceIndex===1){gameState.energy=Math.min(100,gameState.energy+5);people.forEach(p=>p.morale=Math.max(0,p.morale-5))}
  if(id==='story_signal'&&choiceIndex===0){gameState.battery=Math.max(0,gameState.battery-8);storyFlags.foundRoute=true;eventHistory.push({day:gameState.day,place:'สถานีวิทยุ',text:'ตอบรับพิกัดของ AURORA และบันทึกเส้นทางลับ'})}else if(id==='story_signal'&&choiceIndex===1){gameState.battery=Math.min(100,gameState.battery+2);people.forEach(p=>p.morale=Math.max(0,p.morale-2))}
  if(id==='story_door'&&choiceIndex===0){gameState.food=Math.max(0,gameState.food-120);gameState.water=Math.max(0,gameState.water-120);storyFlags.helpedVisitors=true;people.forEach(p=>p.morale=Math.min(100,p.morale+5))}else if(id==='story_door'&&choiceIndex===1){gameState.food=Math.max(0,gameState.food-50);gameState.water=Math.max(0,gameState.water-50);people.forEach(p=>p.morale=Math.max(0,p.morale-3))}
  if(id==='story_watchtower'&&choiceIndex===0){gameState.battery=Math.max(0,gameState.battery-10);gameState.materials+=25;storyFlags.watched=true}else if(id==='story_watchtower'&&choiceIndex===1){gameState.security=Math.min(100,(gameState.security??82)+5)}
  if(id==='story_aurora'&&choiceIndex===0){gameState.battery=Math.max(0,gameState.battery-15);storyFlags.auroraTruth=true;gameState.tools+=1}else if(id==='story_aurora'&&choiceIndex===1){gameState.energy=Math.max(0,gameState.energy-5)}
  if(id==='story_storm'&&choiceIndex===0){gameState.materials=Math.max(0,gameState.materials-70);gameState.energy=Math.min(100,gameState.energy+10);people.forEach(p=>p.fatigue=Math.max(0,p.fatigue-4))}else if(id==='story_storm'&&choiceIndex===1){gameState.energy=Math.min(100,gameState.energy+5);people.forEach(p=>{const before=p.health;p.health=Math.max(0,p.health-8);p.fatigue=Math.min(100,p.fatigue+12);if(before>0&&p.health===0){p.expeditionStatus='เสียชีวิต';processDeathAftermath(p)}})}
  if(id==='story_generator'&&choiceIndex===0){gameState.materials=Math.max(0,gameState.materials-60);gameState.energy=Math.min(100,gameState.energy+8);storyFlags.auroraDisabled=true}else if(id==='story_generator'&&choiceIndex===1){gameState.energy=Math.min(100,gameState.energy+15);gameState.security=Math.max(0,(gameState.security??82)-10)}
  if(id==='story_sacrifice'&&choiceIndex===0){const victim=people.find(p=>p.health>0&&p.name==='คุณตา')||people.find(p=>p.health>0);if(victim){victim.health=0;victim.morale=0;victim.expeditionStatus='เสียชีวิต';processDeathAftermath(victim);eventHistory.push({day:gameState.day,place:'ประตูนิรภัย',text:`${victim.name} เสียสละเพื่อเปิดประตูให้ครอบครัว`})}}else if(id==='story_sacrifice'&&choiceIndex===1){gameState.food=Math.max(0,gameState.food-100);gameState.water=Math.max(0,gameState.water-80);gameState.security=Math.max(0,(gameState.security??82)-10)}
  if(id==='story_evacuation'&&choiceIndex===0){gameState.food=Math.max(0,gameState.food-100);gameState.water=Math.max(0,gameState.water-80);storyFlags.foundRoute=true;people.forEach(p=>p.morale=Math.min(100,p.morale+5))}else if(id==='story_evacuation'&&choiceIndex===1){gameState.energy=Math.min(100,gameState.energy+5);people.forEach(p=>p.morale=Math.max(0,p.morale-4))}
  baseEventQueue=baseEventQueue.filter(e=>e.id!==id);eventHistory.push({day:gameState.day,place:'หลุมหลบภัย',text:`${event.title} — ${event.choices[choiceIndex][0]}`});updateResourceBar();updateEventBadge();persistGame();notify('จัดการเหตุการณ์แล้ว — ผลกระทบถูกบันทึก');if(typeof checkEndState==='function'&&checkEndState())return;render('events');
}
function eventsView(){
  updateEventBadge();
  return `<div class="view-content"><div class="view-title"><div><h1>เหตุการณ์</h1><p>เรื่องราวที่กำลังเกิดขึ้นกับครอบครัว · ผู้รอดชีวิต ${alivePeople().length}/5</p></div><span class="tag">เหลือ ${baseEventQueue.length} เหตุการณ์</span></div><section class="panel base-events">${baseEventQueue.length?baseEventQueue.map(e=>`<article class="base-event-card"><div class="base-event-icon">${e.icon}</div><div class="base-event-copy"><h2>${e.title}</h2><p>${e.text}</p><div class="base-event-choices">${e.choices.map((c,i)=>`<button class="${i===0?'primary':'secondary'}" onclick="resolveBaseEvent('${e.id}',${i})">${c[0]}</button><small>${c[1]}</small>`).join('')}</div></div></article>`).join(''):'<div class="empty-state"><div class="end-icon">✓</div><h2>ไม่มีเหตุการณ์ค้างอยู่</h2><p>กดจบช่วงเวลาเพื่อรอเหตุการณ์ใหม่</p></div>'}</section></div>`;
}
const renderBeforeEvents=window.render;
window.render=function(view='overview'){
  if(view==='events'){main.innerHTML=eventsView();document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view==='events'));return}
  renderBeforeEvents(view);
};
const advanceBeforeEvents=window.advanceTime;
window.advanceTime=function(){
  advanceBeforeEvents();
  if(gameState.day>=4&&baseEventQueue.length<2&&Math.random()<0.22){const source=pickContextualEvent();if(!baseEventQueue.some(e=>e.id===source.id))baseEventQueue.push({...source,choices:source.choices.map(c=>[...c])});updateEventBadge();persistGame();notify('มีเหตุการณ์ใหม่รอการตัดสินใจ')}
};
updateEventBadge();

// Production queue: recipes consume real resources and finish after in-game time passes.
const productionRecipes={
  water:{icon:'<img src="assets/icons/water.png" alt="น้ำสะอาด">',name:'น้ำสะอาด x250',desc:'กรองน้ำดิบให้ปลอดภัย · ผลิตเป็นชุดใหญ่จึงใช้เวลาเพียงวันเดียว',days:1,cost:{materials:10,energy:5},apply:()=>gameState.water+=250},
  food:{icon:'<img src="assets/icons/food.png" alt="อาหารแห้ง">',name:'อาหารแห้ง x300',desc:'แปรรูปวัตถุดิบเป็นเสบียง · ผลิตจำนวนมากช่วยลดเวลาต่อชุดเล็กน้อย',days:1,cost:{materials:15,energy:4},apply:()=>gameState.food+=300},
  battery:{icon:'<img src="assets/icons/battery.png" alt="แบตเตอรี่">',name:'แบตเตอรี่ +15%',desc:'ประกอบแบตเตอรี่สำรอง ต้องตรวจเซลล์หลายขั้นตอน',days:2,cost:{materials:20,energy:10},apply:()=>gameState.battery=Math.min(100,gameState.battery+15)},
  medicine:{icon:'<img src="assets/icons/medicine.png" alt="ชุดปฐมพยาบาล">',name:'ชุดปฐมพยาบาล x2',desc:'จัดชุดรักษาบาดแผลและฆ่าเชื้อ',days:2,cost:{materials:25,energy:3},apply:()=>gameState.medicine+=2},
  repair:{icon:'<img src="assets/icons/facility-generator.png" alt="ซ่อมเครื่องกำเนิดไฟฟ้า">',name:'ซ่อมเครื่องกำเนิดไฟฟ้า',desc:'ถอดชิ้นส่วน ตรวจระบบ และคืนพลังงานให้ฐาน',days:3,cost:{materials:30,energy:0},apply:()=>gameState.energy=Math.min(100,gameState.energy+20)}
};
let productionQueue=[];
try{const savedProduction=JSON.parse(localStorage.getItem('last-light-save')||'null');if(savedProduction&&Array.isArray(savedProduction.productionQueue))productionQueue=savedProduction.productionQueue}catch(e){}
function currentAbsoluteMinute(){return (gameState.day-1)*1440+(gameState.clockMinutes||1060)}
function formatProductionDays(days){return `${Math.max(1,Math.ceil(days))} วัน`}
function productionLevel(){return Math.max(0,Math.min(3,Number(gameState.facilities?.production)||0))}
function facilityCondition(key){return Math.max(0,Math.min(100,Number(gameState.facilityDamage?.[key]??100)))}
function productionMultiplier(level=productionLevel()){const base=[0.25,0.5,0.75,1][Math.max(0,Math.min(3,level))];return base*(0.75+facilityCondition('production')/400)}
function productionOutputLabel(key){const amount=productionOutputAmount(key);return key==='battery'?`+${amount}%`:key==='repair'?`+${amount}%`:`${amount} หน่วย`}
function productionOutputAmount(key,level=productionLevel()){const mult=productionMultiplier(level);return key==='water'?Math.round(250*mult):key==='food'?Math.round(300*mult):key==='medicine'?Math.max(1,Math.round(2*mult)):key==='battery'?Math.round(15*mult):key==='repair'?Math.round(20*mult):0}
function productionStorageFits(key,level=productionLevel()){const amount=productionOutputAmount(key,level);if(!amount||key==='repair')return true;const units=key==='medicine'?amount:Math.ceil(amount/10);return storageLoad()+units<=storageCapacityForCart()}
function applyProductionResult(job){const level=job.productionLevel??productionLevel(),amount=Math.round(productionOutputAmount(job.key,level)*(job.specialist?1.1:1));if(job.key==='water')gameState.water+=amount;else if(job.key==='food')gameState.food+=amount;else if(job.key==='battery')gameState.battery=Math.min(100,gameState.battery+amount);else if(job.key==='medicine')gameState.medicine+=amount;else if(job.key==='repair')gameState.energy=Math.min(100,gameState.energy+amount)}
function startProduction(key){
  const recipe=productionRecipes[key];if(!recipe)return;
  if(productionQueue.length>=5){notify('คิวการผลิตเต็มแล้ว');return}
  if(gameState.materials<recipe.cost.materials||gameState.energy<recipe.cost.energy){notify('วัสดุหรือพลังงานไม่พอ');return}
  gameState.materials-=recipe.cost.materials;gameState.energy-=recipe.cost.energy;
  const finishDay=gameState.day+Math.max(1,recipe.days||1);productionQueue.push({key,startedDay:gameState.day,finishDay});persistGame();updateResourceBar();notify(`เริ่มผลิต ${recipe.name} · ใช้เวลา ${formatProductionDays(recipe.days)}`);render('production');
}
function cancelProduction(index){const job=productionQueue[index];if(!job)return;const recipe=productionRecipes[job.key];gameState.materials+=Math.floor(recipe.cost.materials/2);if(job.worker!==undefined&&people[job.worker]&&productionBusy(people[job.worker]))people[job.worker].task='จัดของ';productionQueue.splice(index,1);persistGame();updateResourceBar();render('production');notify('ยกเลิกการผลิตและคืนวัสดุบางส่วนแล้ว')}
function processProductionQueue(){
  let changed=false;
  productionQueue=productionQueue.filter(job=>{if(!job.finishDay){job.startedDay=gameState.day;job.finishDay=gameState.day+Math.max(1,productionRecipes[job.key]?.days||1)}if(job.finishDay<=gameState.day){applyProductionResult(job);if(job.worker!==undefined&&people[job.worker]&&productionBusy(people[job.worker]))people[job.worker].task='จัดของ';eventHistory.push({day:gameState.day,place:'โรงผลิต',text:`ผลิตสำเร็จ: ${productionRecipes[job.key].name}`});changed=true;return false}return true});
  if(changed){updateResourceBar();persistGame();notify('มีของผลิตเสร็จแล้ว')}
}
function productionView(){
  const now=currentAbsoluteMinute();
  return `<div class="view-content"><div class="view-title"><div><h1>การผลิตและซ่อมแซม</h1><p>งานทุกชิ้นนับเป็นวัน · งานยากใช้เวลาหลายวัน และไม่มีงานใดใช้เวลาต่ำกว่า 1 วัน</p></div><span class="tag">วันที่ ${gameState.day} · คิว ${productionQueue.length}/5</span></div><div class="production-layout"><section class="panel recipe-panel"><h2>สูตรการผลิต</h2><div class="recipe-grid">${Object.entries(productionRecipes).map(([key,r])=>`<article class="recipe-card"><span class="recipe-icon">${r.icon}</span><div><h3>${r.name}</h3><p>${r.desc}</p><small>🧱 ${r.cost.materials} · ⚡ ${r.cost.energy} · ⏱️ ${formatProductionDays(r.days)}</small><small>ผลผลิตระดับนี้: <b>${productionOutputLabel(key)}</b> · ผู้ถนัดงานได้โบนัส +10%</small></div><button class="primary" onclick="startProduction('${key}')">ผลิต</button></article>`).join('')}</div></section><aside class="panel queue-panel"><h2>คิวการผลิต</h2>${productionQueue.length?productionQueue.map((job,i)=>{const r=productionRecipes[job.key];if(!job.finishDay){job.startedDay=gameState.day;job.finishDay=gameState.day+Math.max(1,r.days||1)}const total=Math.max(1,(job.finishDay-job.startedDay)||r.days||1),remaining=Math.max(0,job.finishDay-gameState.day),progress=Math.min(100,Math.round(((total-remaining)/total)*100));return `<div class="queue-row"><span>${r.icon}</span><div><b>${r.name}</b>${bar(progress,'orange')}<small>เหลือ ${remaining} วัน · เสร็จวันที่ ${job.finishDay}</small></div><button class="secondary" onclick="cancelProduction(${i})">ยกเลิก</button></div>`}).join(''):'<p class="muted">ยังไม่มีงานในคิว</p>'}<div class="production-stock"><b>🧱 ${formatCount(gameState.materials)}</b><b>⚡ ${gameState.energy}%</b></div></aside></div></div>`;
}
function inventoryDetailKey(icon){return ({food:'food',water:'water',materials:'material',medicine:'medicine',battery:'battery','heat-suit':'heat','cold-suit':'cold',radio:'radio',pistol:'pistol',rifle:'rifle',sniper:'sniper',shotgun:'shotgun',machineGun:'machineGun',melee:'melee',ammo:'ammo',grenades:'frag', 'facility-armor':'armor','team-pack':'backpack'})[icon]}
function inventoryView(){
  const items=[
    ['food','อาหารแห้ง',formatCount(gameState.food),'เสบียง','food'],['water','น้ำดื่ม',formatCount(gameState.water),'เสบียง','water'],['energy','พลังงาน',`${gameState.energy}%`,'ระบบฐาน','energy'],['materials','วัสดุซ่อมแซม',formatCount(gameState.materials),'วัสดุ','materials'],['medicine','ชุดปฐมพยาบาล',gameState.medicine,'ยา','medicine'],['battery','แบตเตอรี่',`${gameState.battery}%`,'พลังงาน','battery'],['heat-suit','ชุดกันร้อน',`${gameState.heatSuit} ชุด · ${gameState.heatDurability}%`,'ป้องกัน','heat'],['cold-suit','ชุดกันหนาว',`${gameState.coldSuit} ชุด · ${gameState.coldDurability}%`,'ป้องกัน','cold'],['radio','วิทยุฉุกเฉิน',gameState.tools,'อุปกรณ์','tools'],['pistol','ปืนสั้น',gameState.weapons.pistol+' กระบอก · '+gameState.ammo.pistol+' นัด','อาวุธ','weapon'],['rifle','ปืนยาว',gameState.weapons.rifle+' กระบอก · '+gameState.ammo.rifle+' นัด','อาวุธ','weapon'],['sniper','ปืนสไนเปอร์',gameState.weapons.sniper+' กระบอก · '+gameState.ammo.sniper+' นัด','อาวุธ','weapon'],['shotgun','ปืนลูกซอง',gameState.weapons.shotgun+' กระบอก · '+gameState.ammo.shotgun+' นัด','อาวุธ','weapon'],['machineGun','ปืนกลหนัก',gameState.weapons.machineGun+' กระบอก · '+gameState.ammo.machineGun+' นัด','อาวุธ','weapon'],['melee','อาวุธประชิด',gameState.weapons.melee+' ชิ้น','อาวุธ','weapon'],['ammo','กระสุนรวม',`สั้น ${gameState.ammo.pistol} · ยาว ${gameState.ammo.rifle} · สไน ${gameState.ammo.sniper}`,'อาวุธ','weapon'],['grenades','ระเบิด',`มือ ${gameState.grenades.frag} · ควัน ${gameState.grenades.smoke} · แสง ${gameState.grenades.flash}`,'อาวุธ','weapon'],['facility-armor','เสื้อเกราะ',`เบา ${gameState.armor.light} · หนัก ${gameState.armor.heavy}`,'ป้องกัน','armor'],['team-pack','กระเป๋าสำรวจ',`ระดับ ${gameState.backpackLevel||0}/3 · ความจุ ${expeditionCapacity()} กก.`,'ภารกิจ','backpack'],['team-pack','ของติดทีม',`น้ำ ${gameState.teamInventory.water} · ยา ${gameState.teamInventory.medicine}`,'ภารกิจ','team']];
  return `<div class="view-content inventory-screen"><div class="view-title"><div><h1>คลังทรัพยากร</h1><p>ตรวจสอบของที่ใช้ดูแลฐานและออกสำรวจ</p></div><span class="tag">อัปเดตตามสถานะจริง</span></div><div class="inventory-real-grid">${items.map(x=>`<article class="panel inventory-real-card" title="กดเพื่อดูรายละเอียด ${x[1]}" onclick="${inventoryDetailKey(x[0])?`showItemDetails('${inventoryDetailKey(x[0])}',true)`:''}"><span class="inventory-real-icon"><img src="assets/icons/${x[0]}.png" alt="${x[1]}"></span><div><h3>${x[1]}</h3><b>${x[2]}</b><small>${x[3]}</small></div></article>`).join('')}</div></div>`;
}
function useInventory(key){
  if(key==='medicine'&&!(gameState.facilities?.medical>0)){notify('ต้องซื้อห้องพยาบาลก่อนจึงจะใช้ยาได้');return}
  if(key==='medicine'&&gameState.medicine>0){const target=people.find(p=>p.health<100);if(target){target.health=Math.min(100,target.health+10);gameState.medicine--;notify(`ใช้ยารักษา ${target.name} แล้ว`) }else notify('ทุกคนมีสุขภาพเต็มแล้ว')}
  else if(key==='battery'&&gameState.battery>0){gameState.energy=Math.min(100,gameState.energy+8);gameState.battery=Math.max(0,gameState.battery-5);notify('ใช้แบตเตอรี่เพิ่มพลังงานฐานแล้ว')}
  else if(key==='heat'&&gameState.heatSuit>0){notify('ชุดกันร้อนพร้อมใช้งานในการสำรวจครั้งถัดไป')}
  else if(key==='cold'&&gameState.coldSuit>0){notify('ชุดกันหนาวพร้อมใช้งานในการสำรวจครั้งถัดไป')}
  else notify('ไอเทมนี้ไม่มีเหลืออยู่');updateResourceBar();persistGame();render('inventory');
}
const renderBeforeProduction=window.render;
window.render=function(view='overview'){if(view==='production'){main.innerHTML=productionView();document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view==='production'));return}if(view==='inventory'){main.innerHTML=inventoryView();document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view==='inventory'));return}renderBeforeProduction(view)};
const advanceBeforeProduction=window.advanceTime;
window.advanceTime=function(){advanceBeforeProduction();processProductionQueue()};
processProductionQueue();

// Long-form expeditions: teams leave for full days, the destination stays hidden until return.
let missionState=pendingMissionState;let missionQueue=pendingMissionQueue;
const weaponCatalog={none:{name:'ไม่ใช้อาวุธ',ammo:null,power:0,weight:0},pistol:{name:'ปืนสั้น',ammo:'pistol',power:8,weight:5},rifle:{name:'ปืนยาว',ammo:'rifle',power:13,weight:5},sniper:{name:'ปืนสไนเปอร์',ammo:'sniper',power:20,weight:5},machineGun:{name:'ปืนกลหนัก',ammo:'machineGun',power:22,weight:5},shotgun:{name:'ปืนลูกซอง',ammo:'shotgun',power:16,weight:5},melee:{name:'อาวุธประชิด',ammo:null,power:5,weight:1}};
const armorCatalog={none:{name:'ไม่ใส่เกราะ',protection:0,weight:0},light:{name:'เสื้อเกราะเบา',protection:7,weight:2},heavy:{name:'เสื้อเกราะหนัก',protection:14,weight:4}};
const grenadeCatalog={none:{name:'ไม่พกระเบิด',weight:0},frag:{name:'ระเบิดมือ',weight:1,power:12},smoke:{name:'ระเบิดควัน',weight:1,power:4},flash:{name:'ระเบิดแสง',weight:1,power:7}};
let expeditionPlan={days:1,risk:'กลาง',gear:{rations:true,medical:false,scanner:false,weapon:'rifle',armor:'light',grenade:'smoke'},useHeatSuit:false,useColdSuit:false,supplyFood:0,supplyWater:0,medicalCount:0,scannerCount:0,ammoCount:0};
function normalizeCombatGear(g){g=g||{};const ownedWeapons=Object.keys(weaponCatalog).filter(k=>k!=='none'&&(gameState.weapons?.[k]||0)>0);g.weapon=weaponCatalog[g.weapon]&&(g.weapon==='none'||ownedWeapons.includes(g.weapon))?g.weapon:(ownedWeapons[0]||'none');const ownedArmor=Object.keys(armorCatalog).filter(k=>k==='none'||(gameState.armor?.[k]||0)>0);g.armor=armorCatalog[g.armor]&&ownedArmor.includes(g.armor)?g.armor:'none';const ownedGrenades=Object.keys(grenadeCatalog).filter(k=>k==='none'||(gameState.grenades?.[k]||0)>0);g.grenade=grenadeCatalog[g.grenade]&&ownedGrenades.includes(g.grenade)?g.grenade:'none';return g}
function combatLoadout(){const g=normalizeCombatGear(expeditionPlan.gear),w=weaponCatalog[g.weapon],a=armorCatalog[g.armor],n=grenadeCatalog[g.grenade];return {gear:g,weapon:w,armor:a,grenade:n}}
function combatControls(gear){const w=Object.entries(weaponCatalog).map(([k,v])=>`<option value="${k}" ${gear.weapon===k?'selected':''}>${v.name} · ${v.weight} กก.</option>`).join('');const a=Object.entries(armorCatalog).map(([k,v])=>`<option value="${k}" ${gear.armor===k?'selected':''}>${v.name}</option>`).join('');const n=Object.entries(grenadeCatalog).map(([k,v])=>`<option value="${k}" ${gear.grenade===k?'selected':''}>${v.name}${k==='none'?'':` · ${gameState.grenades[k]||0} ลูก`}</option>`).join('');const ammo=gear.weapon==='melee'||gear.weapon==='none'?'ไม่ใช้กระสุน':`${gameState.ammo[weaponCatalog[gear.weapon].ammo]||0} นัด`;return `<div class="combat-loadout"><h3>อาวุธและการปะทะ</h3><label>อาวุธ<select onchange="setCombatLoadout('weapon',this.value)">${w}</select></label><small>กระสุน: ${ammo}</small><label>เกราะ<select onchange="setCombatLoadout('armor',this.value)">${a}</select></label><label>ระเบิด<select onchange="setCombatLoadout('grenade',this.value)">${n}</select></label></div>`}
function setCombatLoadout(key,value){normalizeCombatGear(expeditionPlan.gear)[key]=value;persistGame();render('expedition')}
function expeditionCarryBonus(){return selectedMembers.reduce((total,index)=>{const role=people[index]?.role||'';return total+(role.includes('สำรวจ')?8:role.includes('ช่าง')?6:role.includes('เส้นทาง')?5:0)},0)}
function expeditionCapacity(){return 80+(gameState.backpackLevel||0)*40+expeditionCarryBonus()}
function baseAbsenceEffects(){return ''}
function teamSynergy(indices){
  const team=indices.map(i=>people[i]).filter(Boolean),roles=team.map(p=>p.role||'');
  if(team.length<2)return 0;
  let score=new Set(roles).size===team.length?2:0;
  if(roles.some(r=>r.includes('สำรวจ'))&&roles.some(r=>r.includes('เส้นทาง')))score+=4;
  if(roles.some(r=>r.includes('แพทย์')||r.includes('ผู้ป่วย')))score+=2;
  if(roles.some(r=>r.includes('ช่าง'))&&roles.some(r=>r.includes('เสบียง')))score+=2;
  return Math.min(8,score);
}
function expeditionWeight(){const c=combatLoadout();return 2+Math.ceil((expeditionPlan.supplyFood||0)/10)+Math.ceil((expeditionPlan.supplyWater||0)/10)+(expeditionPlan.medicalCount||0)*2+(expeditionPlan.scannerCount||0)+(expeditionPlan.useHeatSuit?3:0)+(expeditionPlan.useColdSuit?3:0)+c.weapon.weight+c.armor.weight+c.grenade.weight}
function setExpeditionDays(days){expeditionPlan.days=Number(days);expeditionPlan.risk=days>=3?'สูง':days===2?'กลาง':'ต่ำ';persistGame();render('expedition')}
function toggleExpeditionGear(key){expeditionPlan.gear[key]=!expeditionPlan.gear[key];persistGame();render('expedition')}
function toggleExpeditionSuit(kind){const key=kind==='heat'?'useHeatSuit':'useColdSuit',other=kind==='heat'?'useColdSuit':'useHeatSuit';expeditionPlan[key]=!expeditionPlan[key];if(expeditionPlan[key])expeditionPlan[other]=false;persistGame();render('expedition')}
function missionIntel(){return gameState.day<4?'เหตุการณ์จะเริ่มสุ่มหลังวันที่ 3':`อากาศและกลุ่มเถ้าดำอาจเปลี่ยนผลภารกิจ · ความปลอดภัย ${gameState.security||0}%`}
function expedition(){const roster=availablePeople(),selected=selectedMembers.map(i=>people[i]).filter(isAlive),gear=normalizeCombatGear(expeditionPlan.gear),weight=expeditionWeight(),capacity=expeditionCapacity();const plans=[{days:1,risk:'ต่ำ',desc:'กลับเร็ว ความเสี่ยงต่ำ'},{days:2,risk:'กลาง',desc:'มีโอกาสเจอของดีและการปะทะ'},{days:3,risk:'สูง',desc:'ของรางวัลมาก แต่ศัตรูแข็งแกร่ง'}];return `<div class="view-content expedition-plan"><div class="view-title"><div><h1>จัดทีมออกสำรวจ</h1><p>เลือกคน เสบียง อาวุธ และจำนวนวันที่ยอมให้ทีมออกไป</p></div><span class="tag">สมาชิกพร้อม ${roster.length} คน</span></div><div class="expedition-plan-grid"><section class="panel plan-roster"><h2>สมาชิกที่พร้อม (${selectedMembers.length}/2)</h2>${roster.map(({p,i})=>`<article class="roster-pick ${selectedMembers.includes(i)?'picked':''}">${avatar(p)}<div class="roster-person"><b>${p.name}</b><small>${p.role} · สุขภาพ ${p.health}% ${p.injuryStatus?`· ${p.injuryStatus}`:''}</small></div><button class="secondary" onclick="toggleMember(${i})">${selectedMembers.includes(i)?'ถอดออก':'เลือก'}</button></article>`).join('')||'<p class="muted">ไม่มีสมาชิกที่พร้อมออกสำรวจ</p>'}</section><section class="panel plan-options"><h2>แผนการเดินทาง</h2><div class="duration-options">${plans.map(p=>`<button class="duration-option ${expeditionPlan.days===p.days?'selected':''}" onclick="setExpeditionDays(${p.days})"><b>${p.days} วัน</b><span>ความเสี่ยง ${p.risk}</span><small>${p.desc}</small></button>`).join('')}</div><div class="plan-gear"><h3>เสบียง</h3>${[['rations','food','เสบียงเพิ่ม','อาหาร 30 · น้ำ 20'],['medical','medicine','ชุดปฐมพยาบาล','ใช้ยา 1 ชุด'],['scanner','radio','เครื่องสแกน/วิทยุ','ใช้แบตเตอรี่ 8%']].map(([k,icon,label,cost])=>`<button class="gear-toggle ${gear[k]?'on':''}" onclick="toggleExpeditionGear('${k}')"><b>${label}</b><small>${cost}</small><strong>${gear[k]?'ใส่แล้ว':'ไม่ใส่'}</strong></button>`).join('')}</div>${combatControls(gear)}<div class="pack-loadout"><b>น้ำหนักสัมภาระ ${weight}/${capacity} กก.</b><span>${weight>capacity?'เกินขีดจำกัด':'พื้นที่เหลือ '+(capacity-weight)+' กก.'}</span></div><button class="primary" onclick="launchLongExpedition()" ${weight>capacity?'disabled':''}>ส่งทีมออกสำรวจ ${expeditionPlan.days} วัน ▶</button></section></div></div>`}

function resetExpeditionPlan(){if(missionQueue.length){const q=missionQueue.shift();gameState.food+=q.supplyFood||0;gameState.water+=q.supplyWater||0;gameState.medicine+=q.medicalCount||0;gameState.battery+=(q.scannerCount||0)*8;const qAmmoType=weaponCatalog[q.gear?.weapon]?.ammo;if(qAmmoType)gameState.ammo[qAmmoType]=(gameState.ammo[qAmmoType]||0)+(q.ammoCount||0);q.members.forEach(i=>{people[i].expeditionStatus='';people[i].task='จัดของ'});notify('ยกเลิกทีมสำรองและคืนอุปกรณ์แล้ว')}selectedMembers=[];expeditionPlan.days=1;expeditionPlan.risk='ต่ำ';expeditionPlan.gear={rations:true,medical:false,scanner:false,weapon:'rifle',armor:'light',grenade:'none'};expeditionPlan.useHeatSuit=false;expeditionPlan.useColdSuit=false;expeditionPlan.supplyFood=0;expeditionPlan.supplyWater=0;expeditionPlan.medicalCount=0;expeditionPlan.scannerCount=0;expeditionPlan.ammoCount=0;expeditionPlan._suppliesReserved=false;persistGame();render('expedition')}
function queueSecondExpedition(){
  if(!missionState||missionQueue.length){notify('มีทีมสำรองอยู่แล้วหรือยังจัดส่งไม่ได้');return}
  if(!selectedMembers.length){notify('เลือกสมาชิกสำหรับทีมสำรองก่อน');return}
  if(selectedMembers.some(i=>people[i].health<20||people[i].fatigue>90)){notify('สมาชิกทีมสำรองสุขภาพต่ำหรือเหนื่อยเกินไป');return}
  const overlap=missionState.members.some(i=>selectedMembers.includes(i));if(overlap){notify('สมาชิกหนึ่งคนอยู่ในทีมหลักแล้ว');return}
  const gear={...expeditionPlan.gear},queuedFood=Math.max(0,Math.min(gameState.food,Math.floor(expeditionPlan.supplyFood||0))),queuedWater=Math.max(0,Math.min(gameState.water,Math.floor(expeditionPlan.supplyWater||0))),queuedMedical=Math.max(0,Math.min(gameState.medicine,Math.floor(expeditionPlan.medicalCount||0))),queuedScanner=Math.max(0,Math.min(Math.floor((gameState.battery||0)/8),Math.floor(expeditionPlan.scannerCount||0))),ammoType=weaponCatalog[gear.weapon]?.ammo,queuedAmmo=ammoType?Math.max(0,Math.min(gameState.ammo?.[ammoType]||0,Math.floor(expeditionPlan.ammoCount||0))):0;gear.rations=queuedFood>0||queuedWater>0;gear.medical=queuedMedical>0;gear.scanner=queuedScanner>0;
  gameState.food-=queuedFood;gameState.water-=queuedWater;gameState.medicine-=queuedMedical;gameState.battery-=queuedScanner*8;if(ammoType)gameState.ammo[ammoType]=Math.max(0,(gameState.ammo[ammoType]||0)-queuedAmmo);
  missionQueue.push({members:[...selectedMembers],days:expeditionPlan.days,risk:expeditionPlan.risk,gear,supplyFood:expeditionPlan.supplyFood||0,supplyWater:expeditionPlan.supplyWater||0,medicalCount:expeditionPlan.medicalCount||0,scannerCount:expeditionPlan.scannerCount||0,ammoCount:queuedAmmo,useHeatSuit:!!expeditionPlan.useHeatSuit,useColdSuit:!!expeditionPlan.useColdSuit,reserved:true});selectedMembers.forEach(i=>{people[i].expeditionStatus='รอออกสำรวจ';people[i].task='รอทีมหลักกลับ'});selectedMembers=[];persistGame();render('overview');notify('จัดทีมสำรองเข้าคิวแล้ว จะออกเดินทางเมื่อทีมหลักกลับถึงฐาน')
}
function dispatchQueuedMission(){const q=missionQueue.shift();if(!q||missionState)return false;selectedMembers=[...q.members];expeditionPlan.days=q.days;expeditionPlan.risk=q.risk;expeditionPlan.gear={...q.gear};expeditionPlan.supplyFood=q.supplyFood||0;expeditionPlan.supplyWater=q.supplyWater||0;expeditionPlan.medicalCount=q.medicalCount||0;expeditionPlan.scannerCount=q.scannerCount||0;expeditionPlan.ammoCount=q.ammoCount||0;expeditionPlan.useHeatSuit=!!q.useHeatSuit;expeditionPlan.useColdSuit=!!q.useColdSuit;expeditionPlan._suppliesReserved=!!q.reserved;q.members.forEach(i=>{people[i].expeditionStatus='';people[i].task='เตรียมออกสำรวจ'});launchLongExpedition();return true}
function launchLongExpedition(){
  if(missionState){queueSecondExpedition();return}if(expeditionWeight()>expeditionCapacity()){notify(`สัมภาระเกินขีดจำกัด ${expeditionWeight()}/${expeditionCapacity()} กก. · ถอดอุปกรณ์บางชิ้นก่อนออกเดินทาง`);return}if(!selectedMembers.length){notify('เลือกสมาชิกอย่างน้อย 1 คนก่อนออกสำรวจ');return}
  if(selectedMembers.some(i=>people[i].health<20||people[i].fatigue>90)){notify('สมาชิกที่สุขภาพต่ำหรือเหนื่อยมากควรพักก่อน');return}
  const selectedSuit=expeditionPlan.useHeatSuit?'heatSuit':expeditionPlan.useColdSuit?'coldSuit':'';if(selectedSuit){const durabilityKey=selectedSuit==='heatSuit'?'heatDurability':'coldDurability';if((gameState[selectedSuit]||0)<1||(gameState[durabilityKey]||0)<20){notify(selectedSuit==='heatSuit'?'ชุดกันร้อนหมดหรือชำรุดเกินไป':'ชุดกันหนาวหมดหรือชำรุดเกินไป');return}}
  const gear=normalizeCombatGear(expeditionPlan.gear),loadout=combatLoadout();if(gear.weapon!=='none'&&(gameState.weapons[gear.weapon]||0)<1){notify('อาวุธชนิดนี้ไม่มีในคลัง');return}const selectedAmmo=loadout.weapon.ammo?(expeditionPlan._suppliesReserved?Math.max(0,Math.floor(expeditionPlan.ammoCount||0)):Math.max(0,Math.min(gameState.ammo?.[loadout.weapon.ammo]||0,Math.floor(expeditionPlan.ammoCount||0)))):0;if(gear.armor!=='none'&&(gameState.armor[gear.armor]||0)<1){notify(`ไม่มี${armorCatalog[gear.armor].name}ในคลัง`);return}if(gear.grenade!=='none'&&(gameState.grenades[gear.grenade]||0)<1){notify(`ไม่มี${grenadeCatalog[gear.grenade].name}ในคลัง`);return}gameState.activeSuit=selectedSuit;const supplyFood=Math.max(0,Math.min(gameState.food,Math.floor(expeditionPlan.supplyFood||0))),supplyWater=Math.max(0,Math.min(gameState.water,Math.floor(expeditionPlan.supplyWater||0))),medicalCount=Math.max(0,Math.min(gameState.medicine,Math.floor(expeditionPlan.medicalCount||0))),scannerCount=Math.max(0,Math.min(Math.floor((gameState.battery||0)/8),Math.floor(expeditionPlan.scannerCount||0)));if(!expeditionPlan._suppliesReserved){gameState.food-=supplyFood;gameState.water-=supplyWater;gameState.medicine-=medicalCount;gameState.battery-=scannerCount*8}if(loadout.weapon.ammo&&!expeditionPlan._suppliesReserved)gameState.ammo[loadout.weapon.ammo]=Math.max(0,(gameState.ammo[loadout.weapon.ammo]||0)-selectedAmmo);expeditionPlan._suppliesReserved=false;
  const possible=['โรงพยาบาลเก่า','สถานีวัดอากาศ','ตลาดริมคลอง','โรงงานร้าง','โกดังเสบียง','สถานีรถไฟใต้ดิน'];const location=possible[Math.floor(Math.random()*possible.length)];
  missionState={members:[...selectedMembers],days:expeditionPlan.days,risk:expeditionPlan.risk,gear:{...gear},location,departDay:gameState.day,returnDay:gameState.day+expeditionPlan.days,fortune:scannerCount?12:0,synergy:teamSynergy(selectedMembers),carryCapacity:expeditionCapacity(),carryWeight:expeditionWeight(),backpackLevel:gameState.backpackLevel||0,backpackRelief:(gameState.backpackLevel||0)>=2?((gameState.backpackLevel||0)-1)*4:0,encounterSeen:false,supplyFood,supplyWater,medicalCount,scannerCount,ammoCount:selectedAmmo,usedSuit:selectedSuit,supplyPenalty:(supplyFood<30?0.12:0)+(supplyWater<20?0.12:0)+(selectedSuit?'':0.1)};
  missionState.members.forEach(i=>{people[i].expeditionStatus='ออกสำรวจ';people[i].task='กำลังออกสำรวจ';people[i].fatigue=Math.min(100,people[i].fatigue+5)});
  selectedMembers=[];eventHistory.push({day:gameState.day,place:'หลุมหลบภัย',text:`ส่งทีม ${missionState.members.map(i=>people[i].name).join(' และ ')} ออกสำรวจแบบ ${missionState.days} วัน ความเสี่ยง${missionState.risk} โดยยังไม่ทราบจุดหมาย`});
  updateResourceBar();persistGame();render('overview');notify(`ทีมออกเดินทางแล้ว คาดว่าจะกลับวันที่ ${missionState.returnDay}`)
}
function resolveMissionEncounter(id,choice){if(!missionState)return;missionState.encounterSeen=true;if(choice===0){missionState.fortune+=12;eventHistory.push({day:gameState.day,place:'ระหว่างสำรวจ',text:'ทีมเลือกช่วยผู้รอดชีวิตและได้รับเบาะแสเส้นทาง'})}else{missionState.fortune-=5;eventHistory.push({day:gameState.day,place:'ระหว่างสำรวจ',text:'ทีมหลีกเลี่ยงการปะทะและเดินทางต่อ'})}baseEventQueue=baseEventQueue.filter(e=>e.id!==id);updateEventBadge();persistGame();render('events');notify(choice===0?'ทีมได้รับเบาะแสเพิ่ม แต่เสียเวลาเล็กน้อย':'ทีมเลี่ยงอันตรายและเดินทางต่อ')}
const enemyCatalog=[{name:'หน่วยลาดตระเวนเถ้าดำ',power:8,threshold:28,injury:4},{name:'มือปืนเถ้าดำ',power:14,threshold:38,injury:7},{name:'หน่วยจู่โจมเกราะหนัก',power:21,threshold:50,injury:11}];
function resolveCombatEncounter(m,team){const gear=normalizeCombatGear(m.gear);const weapon=weaponCatalog[gear.weapon],armor=armorCatalog[gear.armor],grenade=grenadeCatalog[gear.grenade];const c={gear,weapon,armor,grenade};const forecast=typeof weatherFor==='function'?weatherFor(0):null;const profile=difficultyProfile(),unarmed=c.gear.weapon==='none',baseCombatChance=m.risk==='สูง'||m.days>=2?0.62:0.24;const happens=Math.random()<Math.min(.97,baseCombatChance*profile.combatChance);if(!happens)return {happened:false,delta:0,deathBonus:0,text:''};const enemy=enemyCatalog[Math.min(enemyCatalog.length-1,Math.floor((gameState.day+(m.risk==='สูง'?4:0))/8))];let ammoUsed=0;let fire=weapon.power;if(weapon.ammo){ammoUsed=weapon.ammo==='machineGun'?10:weapon.ammo==='sniper'?2:weapon.ammo==='rifle'?5:4;const have=Math.min(m.ammoCount||0,ammoUsed);if(have<ammoUsed){fire=Math.max(3,weapon.power-7);ammoUsed=have;m.ammoCount=0}else m.ammoCount-=ammoUsed}if(c.gear.grenade!=='none'&&(gameState.grenades[c.gear.grenade]||0)>0){gameState.grenades[c.gear.grenade]--;fire+=grenade.power}if(forecast?.tone==='storm')fire-=3;const teamPower=team.reduce((n,p)=>n+(p.role.includes('สำรวจ')?5:2)+Math.max(0,p.morale-50)/20,0);const roll=fire+armor.protection+teamPower+Math.random()*18;let outcome=roll>=enemy.threshold?'ชนะการปะทะ':roll>=enemy.threshold-10?'ถอยร่นจากการปะทะ':'ถูกกดดันจนต้องแตกกระเจิง';let delta=outcome==='ชนะการปะทะ'?12:outcome==='ถอยร่นจากการปะทะ'?-4:-14;let deathBonus=outcome==='ถูกกดดันจนต้องแตกกระเจิง'?.14:outcome==='ถอยร่นจากการปะทะ'?.05:0;if(unarmed)deathBonus+=.12;team.forEach(p=>{if(outcome!=='ชนะการปะทะ'){p.health=Math.max(1,p.health-(outcome==='ถอยร่นจากการปะทะ'?enemy.injury:enemy.injury+4));p.injuryStatus=outcome==='ถอยร่นจากการปะทะ'?'บาดเจ็บ':'บาดเจ็บสาหัส'}p.morale=Math.max(0,p.morale+(outcome==='ชนะการปะทะ'?2:-7))});gameState.security=Math.max(0,Math.min(100,(gameState.security||82)+(outcome==='ชนะการปะทะ'?3:-5)));let loot='';if(outcome==='ชนะการปะทะ'){gameState.ammo.pistol+=Math.random()<.45*profile.lootChance?6:0;gameState.ammo.rifle+=Math.random()<.6*profile.lootChance?10:0;gameState.materials+=8;loot=' · ยึดกระสุนและวัสดุจากศัตรู';if(gameState.day>=8&&Math.random()<.22*profile.rareLootChance){const found=gameState.day>=16?'sniper':'shotgun';gameState.weapons[found]=(gameState.weapons[found]||0)+1;loot+=` · ยึด${weaponCatalog[found].name}ได้ 1 กระบอก`}}eventHistory.push({day:gameState.day,place:'การปะทะกับกลุ่มเถ้าดำ',text:`ทีม ${outcome} ต่อ${enemy.name} ด้วย${weapon.name}${ammoUsed?` ใช้กระสุน ${ammoUsed} นัด`:''}${c.gear.grenade!=='none'?' และใช้ระเบิด':''}${loot}`});return {happened:true,delta,deathBonus,text:`${outcome} · ${enemy.name} · ${weapon.name}${ammoUsed?` ใช้กระสุน ${ammoUsed} นัด`:''}${forecast?.tone==='storm'?' · พายุลดทัศนวิสัย':''}`}}
function processDeathAftermath(dead){if(!dead)return;storyFlags.losses=(storyFlags.losses||0)+1;storyFlags.lastLoss=dead.name;alivePeople().forEach(p=>{p.morale=Math.max(0,p.morale-8)});productionQueue.forEach(j=>{if(j.worker===people.indexOf(dead)){j.worker=null;j.finishDay+=1}});eventHistory.push({day:gameState.day,place:'ห้องรำลึก',text:`ครอบครัวจัดห้องรำลึกให้ ${dead.name} · สมาชิกที่เหลือต้องแบ่งงานและประคองกำลังใจกันต่อ`});notify(`${dead.name} เสียชีวิต · สมาชิกที่เหลือต้องปรับตัว`)}
function trimExpeditionRewards(before,capacity){const weights={food:1,water:1,medicine:2,battery:.1,materials:.1},gained={};Object.keys(weights).forEach(key=>{gained[key]=Math.max(0,(gameState[key]||0)-(before[key]||0))});let weight=Object.entries(weights).reduce((total,[key,unit])=>total+gained[key]*unit,0),dropped=0;for(const key of ['materials','battery','medicine','water','food']){if(weight<=capacity)break;const unit=weights[key],remove=Math.min(gained[key],Math.ceil((weight-capacity)/unit));if(remove>0){gameState[key]-=remove;gained[key]-=remove;weight-=remove*unit;dropped+=remove*unit}}return {weight,dropped}}
function returnExpedition(){if(!missionState)return;const m=missionState,team=m.members.map(i=>people[i]),carriedAmmo=m.ammoCount||0,rewardBefore={food:gameState.food,water:gameState.water,materials:gameState.materials,medicine:gameState.medicine,battery:gameState.battery};const combat=resolveCombatEncounter(m,team),missionAmmoType=weaponCatalog[normalizeCombatGear(m.gear).weapon]?.ammo;if(missionAmmoType&&m.ammoCount){gameState.ammo[missionAmmoType]=(gameState.ammo[missionAmmoType]||0)+m.ammoCount;m.ammoCount=0}const forecast=typeof weatherFor==='function'?weatherFor(0):null;const weatherDelta=forecast?.tone==='calm'?6:forecast?.tone==='storm'?-9:forecast?.tone==='cold'?-5:0;let score=56+(m.days===1?-5:m.days===2?0:8)-difficultyProfile().lootPenalty+(m.risk==='สูง'?-24:m.risk==='ต่ำ'?10:0)+m.fortune+(m.synergy||0)+((m.supplyFood||0)>=30&&(m.supplyWater||0)>=20?0:-12)+(m.gear.medical?0:-4)+(m.gear.scanner?6:0)+Math.floor(Math.random()*31)-15+(combat.delta||0)+weatherDelta;
  const skills=team.reduce((n,p)=>n+(p.role.includes('สำรวจ')||p.role.includes('เส้นทาง')?7:0)+(p.role.includes('แพทย์')?5:0)+(p.role.includes('ช่าง')?3:0),0);score+=skills+(m.gear.scanner?6:0);score-=Math.round(team.reduce((s,p)=>s+p.fatigue,0)/team.length*.12);
  const place=m.location;let rewards=[];if(score>=35){if(place==='โรงพยาบาลเก่า'){const amount=score>68?3:1;gameState.medicine+=amount;gameState.materials+=score>68?30:10;rewards=[`เวชภัณฑ์ x${amount}`,'วัสดุซ่อม']}else if(place==='สถานีวัดอากาศ'){gameState.battery=Math.min(100,gameState.battery+(score>68?20:8));gameState.materials+=score>68?25:8;rewards=['แบตเตอรี่','ข้อมูลอากาศ']}else if(place==='โรงงานร้าง'){gameState.materials+=score>68?55:25;gameState.energy=Math.min(100,gameState.energy+(score>68?12:5));rewards=['วัสดุช่าง','ชิ้นส่วนเครื่องจักร']}else if(place==='โกดังเสบียง'){gameState.food+=score>68?130:60;gameState.water+=score>68?100:45;rewards=['อาหาร','น้ำสะอาด']}else if(place==='สถานีรถไฟใต้ดิน'){gameState.battery=Math.min(100,gameState.battery+(score>68?28:12));gameState.materials+=score>68?35:15;rewards=['แบตเตอรี่','อะไหล่สำรวจ']}else{gameState.food+=score>68?100:45;gameState.water+=score>68?80:35;rewards=['อาหาร','น้ำสะอาด']}}
  const capacity=m.carryCapacity||8,loadRatio=(m.carryWeight||0)/capacity,loadFatigue=loadRatio>=1?12:loadRatio>=.8?6:0,rewardCapacity=capacity*(m.backpackLevel>=3?1.15:1),trimmed=trimExpeditionRewards(rewardBefore,rewardCapacity),rewardWeight=trimmed.weight;if(trimmed.dropped>0){rewards.push(`ของบางส่วนถูกทิ้งเพราะน้ำหนักเกิน ${trimmed.dropped.toFixed(1)} กก.`);score-=8}else if(m.backpackLevel>=3&&rewardWeight>capacity){rewards.push('กระเป๋าระดับ 3 ช่วยรักษาของที่เกินความจุไว้ได้')}
  let lost=[],lostDetails=[];team.forEach((p,i)=>{p.expeditionStatus='';p.task=['ซ่อมเครื่องกำเนิดไฟฟ้า','จัดเสบียง','เตรียมอุปกรณ์','ดูแลผู้ป่วย','จัดของ'][m.members[i]];p.fatigue=Math.min(100,p.fatigue+Math.max(8,m.days*9+loadFatigue-(m.backpackRelief||0)));const exposure=(m.risk==='สูง'?0.08:m.days>=3?0.04:0);const deathChance=Math.min(.95,(score<22?(m.gear.medical?0.10:0.32):score<35?(m.gear.medical?0.03:0.12):0)+exposure+(m.supplyPenalty||0)+difficultyProfile().deathBonus);if(Math.random()<deathChance){p.health=0;lost.push(p.name);lostDetails.push(`${p.name} · ${m.gear.medical?'บาดเจ็บรุนแรงระหว่างทาง':'ไม่มีชุดแพทย์ช่วยเหลือทัน'}${m.risk==='สูง'?' · เส้นทางความเสี่ยงสูง':''}`);processDeathAftermath(p)}else if((score<45||Math.random()<(m.gear.medical?0.06:0.18))&&p.health>0){p.health=Math.max(1,p.health-(m.gear.medical?4:8))}});
  if(gameState.activeSuit){const key=gameState.activeSuit==='heatSuit'?'heatDurability':'coldDurability';gameState[key]=Math.max(0,(gameState[key]||100)-m.days*12);if(!gameState[key])gameState[gameState.activeSuit]=Math.max(0,gameState[gameState.activeSuit]-1);gameState.activeSuit=''}
  eventHistory.push({day:gameState.day,place,text:lost.length?`ทีมกลับจาก ${place} แต่ ${lostDetails.join(' | ')}`:score<35?`ทีมกลับจาก ${place} โดยไม่ได้เสบียง สุขภาพทีมเสียหาย`: `ทีมกลับจาก ${place} พร้อม ${rewards.join(' และ ')}`});
  if(combat.happened&&baseEventQueue.length<3){const aftermath=combat.delta>0?{id:`combat_after_${gameState.day}`,icon:'🩸',title:'ร่องรอยจากการปะทะ',text:'ทีมกลับมาพร้อมอาวุธและเสบียง แต่กลุ่มเถ้าดำอาจจำเส้นทางของคุณได้ เสียงวิทยุแปลก ๆ ดังขึ้นหลังประตูบังเกอร์',choices:[['เพิ่มเวรยาม','ใช้กำลังใจบางส่วน แต่ลดโอกาสถูกติดตาม'],['เก็บของแล้วพัก','ไม่เสียทรัพยากร แต่ความปลอดภัยยังเท่าเดิม']]}:{id:`combat_after_${gameState.day}`,icon:'⚠️',title:'สัญญาณขอความช่วยเหลือ',text:'หลังทีมถอยจากการปะทะ วิทยุจับสัญญาณผู้รอดชีวิตที่ติดอยู่ใกล้จุดปะทะ พวกเขาอาจรู้เส้นทางปลอดภัย แต่การกลับไปช่วยอาจเสี่ยงเกินไป',choices:[['ส่งสัญญาณตอบกลับ','เพิ่มความหวัง แต่เปิดเผยตำแหน่งฐาน'],['ปิดวิทยุ','ลดความเสี่ยงและเก็บแบตเตอรี่ไว้']]} ;baseEventQueue.push(aftermath);updateEventBadge()}
  const result={place,score,rewards,lost,lostDetails,members:[...m.members],days:m.days,synergy:m.synergy||0,carryCapacity:capacity,carryWeight:m.carryWeight||0,supplyFood:m.supplyFood||0,supplyWater:m.supplyWater||0,medicalCount:m.medicalCount||0,scannerCount:m.scannerCount||0,ammoCount:carriedAmmo,rewardWeight,combat};missionState=null;window.lastMissionResult=result;updateResourceBar();persistGame();if(typeof checkEndState==='function'&&checkEndState())return;render('mission-result')
}
function missionResultView(){const r=window.lastMissionResult;if(!r)return `<div class="view-content"><section class="panel empty-state"><h2>ไม่มีผลสำรวจล่าสุด</h2><button class="primary" onclick="render('overview')">กลับภาพรวม</button></section></div>`;const art={โรงพยาบาลเก่า:'hospital.webp',สถานีวัดอากาศ:'weather-station.webp',ตลาดริมคลอง:'riverside-market.webp',โรงงานร้าง:'factory.webp',โกดังเสบียง:'warehouse.webp',สถานีรถไฟใต้ดิน:'subway.webp'}[r.place]||'riverside-market.webp';return `<div class="view-content"><div class="view-title"><div><h1>ทีมกลับจากการสำรวจ</h1><p>ภารกิจ ${r.days} วัน · ทีม ${r.members.map(i=>people[i].name).join(' และ ')}</p></div></div><section class="panel mission-result"><div class="mission-result-art" style="background-image:url('assets/locations/${art}')"></div><div><span class="tag">จุดหมายที่ค้นพบ: ${r.place}</span><h2>${r.lost.length?'ทีมกลับมาไม่ครบ':r.rewards.length?'พบของที่ยังใช้ได้':'ทีมกลับมาโดยไม่พบเสบียง'}</h2><p>${r.combat?.happened?`<b>การปะทะ:</b> ${r.combat.text} · `:''}${r.lost.length?`${r.lostDetails?.join(' · ')||r.lost.join(' และ ') }`:r.rewards.length?`หลังหายไป ${r.days} วัน ทีมกลับมาพร้อม ${r.rewards.join(' และ ')} ความเหนื่อยและสภาพอากาศทำให้การเดินทางครั้งนี้หนักกว่าที่คาด`:'ทีมกลับมามือเปล่า แต่ข้อมูลที่ได้จะช่วยวางแผนครั้งต่อไป'}</p><p class="mission-carry-summary">สัมภาระขาไป ${r.carryWeight||0} กก. · อาหาร ${r.supplyFood||0} · น้ำ ${r.supplyWater||0} · ปฐมพยาบาล ${r.medicalCount||0} · สแกน ${r.scannerCount||0} · กระสุน ${r.ammoCount||0} นัด</p><div class="result-stats"><span>คะแนนภารกิจ <b>${r.score}</b></span><span>น้ำหนักขาไป <b>${r.carryWeight||0}/${r.carryCapacity} กก.</b></span><span>ของที่นำกลับ <b>${r.rewardWeight} กก.</b></span><span>ความสัมพันธ์ทีม <b>${r.synergy>0?'เข้ากันได้ดี':r.synergy<0?'ตึงเครียด':'ปกติ'}</b></span><span>สัมภาระ <b>${r.rewardWeight}/${r.carryCapacity} กก.</b></span><span>สถานะทีม <b>${r.lost.length?'สูญเสียสมาชิก':'กลับถึงฐาน'}</b></span>${r.combat?.happened?`<span>ผลปะทะ <b>${r.combat.delta>0?'ชนะ':'ถอย/เสียหาย'}</b></span>`:''}</div><button class="primary" onclick="window.lastMissionResult=null;dispatchQueuedMission();render('overview')">กลับหลุมหลบภัย</button></div></section></div>`}
const renderBeforeLongMission=window.render;
window.render=function(view='overview'){if(view==='expedition'){main.innerHTML=expedition();document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view==='expedition'));return}if(view==='mission-result'){main.innerHTML=missionResultView();document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));return}renderBeforeLongMission(view)};
window.launchExpedition=launchLongExpedition;
const oldAdvanceDaily=window.advanceTime;
window.advanceTime=function(){
  if(endState)return;let missionReturned=false;const profile=difficultyProfile(),residents=Math.max(1,alivePeople().filter(p=>!p.expeditionStatus).length);gameState.food=Math.max(0,gameState.food-Math.ceil(residents*12*profile.foodUse));gameState.water=Math.max(0,gameState.water-Math.ceil(residents*8*profile.waterUse));gameState.energy=Math.max(0,gameState.energy-4);gameState.day+=1;gameState.clockMinutes=480;gameState.temperature=gameState.day%2?42:-6;
  const awayCount=people.filter(p=>p.expeditionStatus).length;
  if(awayCount){
    const missingEngineer=people[0]?.expeditionStatus,missingCook=people[1]?.expeditionStatus,missingMedic=people[3]?.expeditionStatus;
    if(missingEngineer)gameState.energy=Math.max(0,gameState.energy-3);
    if(missingCook){gameState.food=Math.max(0,gameState.food-3);gameState.water=Math.max(0,gameState.water-2)}
    if(missingMedic){const patient=people.find(p=>!p.expeditionStatus&&p.health<70);if(patient)patient.health=Math.max(1,patient.health-2)}
    gameState.security=Math.max(0,(gameState.security??82)-(awayCount>1?3:2));
  }else gameState.security=Math.min(100,(gameState.security??82)+1);
  alivePeople().filter(p=>!p.expeditionStatus).forEach(p=>{p.fatigue=Math.max(0,p.fatigue-3);if(p.treatmentUntil){if(gameState.day>=p.treatmentUntil){p.health=100;p.injuryStatus='';p.treatmentUntil=0;p.treatmentDays=0;p.task='พักผ่อน';notify(`${p.name} รักษาหายแล้ว`)}else p.health=Math.min(100,p.health+Math.ceil(40/(p.treatmentDays||2)))}else if(p.injuryStatus){p.health=Math.min(100,p.health+2);if(p.health>=70)p.injuryStatus=''}});
  if(missionState){missionState.members.forEach(i=>{const p=people[i];p.fatigue=Math.min(100,p.fatigue+7);if(gameState.temperature<0&&gameState.coldSuit<=0)p.health=Math.max(1,p.health-2)});if(gameState.day>=4&&gameState.day<missionState.returnDay&&!missionState.encounterSeen&&Math.random()<.32&&baseEventQueue.length<3){const ping={id:'mission_ping',icon:'📻',title:'สัญญาณขาดหายจากทีมสำรวจ',text:'วิทยุมีเสียงรบกวน ก่อนหัวหน้าทีมจะรายงานว่าพบคนบาดเจ็บข้างเส้นทางและมีทางลัดที่อาจช่วยให้กลับเร็วขึ้น',choices:[['หยุดช่วยและรับข้อมูลเส้นทาง','เพิ่มโอกาสพบของ แต่สมาชิกเหนื่อยขึ้น'],['ให้ทีมเดินทางต่อทันที','ลดความเสี่ยงและไม่เสียเวลา'] ]};baseEventQueue.push(ping);updateEventBadge();notify('มีสัญญาณจากทีมสำรวจ')}if(gameState.day>=missionState.returnDay){returnExpedition();missionReturned=true}}
  if(typeof queueStoryBeat==='function'&&gameState.day>=4)queueStoryBeat(gameState.day);if(gameState.day>=4&&Math.random()<.24&&baseEventQueue.length<3&&!baseEventQueue.some(e=>e.id==='mission_ping')){const pool=baseEventCatalog.filter(e=>!baseEventQueue.some(q=>q.id===e.id));if(pool.length){const e=pool[Math.floor(Math.random()*pool.length)];baseEventQueue.push({...e,choices:e.choices.map(c=>[...c])});updateEventBadge()}}
  processProductionQueue();updateResourceBar();syncClock();persistGame();if(typeof checkEndState==='function'&&checkEndState())return;if(missionReturned){render('mission-result');return}render('overview');notify(`วันที่ ${gameState.day} เริ่มแล้ว · อุณหภูมิ ${gameState.temperature}°C`)
};
const resolveBaseEventLong=window.resolveBaseEvent;
window.resolveBaseEvent=function(id,choiceIndex){if(id==='mission_ping'){resolveMissionEncounter(id,choiceIndex);return}resolveBaseEventLong(id,choiceIndex)};
peopleView=function(){const home=availablePeople(),alive=alivePeople();return `<div class="view-content"><div class="view-title"><div><h1>สมาชิกในบ้าน</h1><p>สมาชิกที่ยังมีชีวิต ${alive.length}/5 · อยู่ฐาน ${home.length} คน · ออกสำรวจ ${alive.length-home.length} คน</p></div></div><div class="cards">${home.map(({p,i})=>`<article class="panel person-card">${avatar(p)}<h3>${p.name}</h3><p>${p.role}</p><span class="tag">${p.injuryStatus||'พร้อมทำงาน'}</span><div class="metric"><div class="metric-head"><span>สุขภาพ</span><b>${p.health}%</b></div>${bar(p.health,'green')}</div><div class="metric"><div class="metric-head"><span>กำลังใจ</span><b>${p.morale}%</b></div>${bar(p.morale,'orange')}</div><div class="metric"><div class="metric-head"><span>ความเหนื่อย</span><b>${p.fatigue}%</b></div>${bar(p.fatigue)}</div><button class="secondary" onclick="showCharacter(${i})">ดูรายละเอียด</button></article>`).join('')||'<section class="panel empty-state"><h2>ไม่มีสมาชิกที่อยู่ในฐาน</h2><p>สมาชิกที่เหลือกำลังออกสำรวจหรือไม่สามารถปฏิบัติหน้าที่ได้</p></section>'}</div>${missionState?`<section class="panel away-banner"><b>สมาชิกที่ออกไปสำรวจ</b><span>${missionState.members.filter(i=>isAlive(people[i])).map(i=>people[i].name).join(' และ ')||'ไม่มีสมาชิกที่ยังกลับมาได้'} · คาดว่าจะกลับวันที่ ${missionState.returnDay}</span></section>`:''}</div>`};
const overviewBeforeAway=overview;
overview=function(){let html=overviewBeforeAway().replace(/สมาชิกในบ้าน \(5\/5\)/,'สมาชิกในบ้าน ('+availablePeople().length+'/5)').replace('จบช่วงเวลา','จบวัน');if(missionState){missionState.members.forEach(i=>{html=html.replace(new RegExp(`<button class="character-card" onclick="showCharacter\\(${i}\\)">[\\s\\S]*?<\\/button>`),'')});html=html.replace('</section><section class="panel command-tasks">',`</section><div class="away-banner"><b>🧭 ทีมออกสำรวจ</b><span>${missionState.members.map(i=>people[i].name).join(' และ ')} · คาดว่าจะกลับวันที่ ${missionState.returnDay}</span><small>จุดหมายและผลการสำรวจยังเป็นความลับ</small></div>${baseAbsenceEffects()}<section class="panel command-tasks">`)}return html};
if(missionState)render('overview');

// Final polish: live shelter numbers, richer intel, and visible base consequences.
function liveShelterOverview(){
  let html=overviewBeforeAway().replace(/สมาชิกในบ้าน \(5\/5\)/,'สมาชิกในบ้าน ('+availablePeople().length+'/5)').replace('จบช่วงเวลา','จบวัน');
  people.forEach((p,i)=>{if(!isAlive(p)){html=html.replace(new RegExp(`<button class="character-card" onclick="showCharacter\\(${i}\\)">[\\s\\S]*?<\\/button>`),'')}});
  const home=Math.max(1,availablePeople().length), foodDays=Math.floor((gameState.food||0)/(home*12)), waterDays=Math.floor((gameState.water||0)/(home*8));
  html=html.replace(/(<span>🍽 อาหารเหลือ<\/span><b>)[^<]*/,(_,prefix)=>prefix+foodDays+' วัน').replace(/(<span>💧 น้ำเหลือ<\/span><b>)[^<]*/,(_,prefix)=>prefix+waterDays+' วัน').replace(/(<span>⚡ ระบบไฟฟ้า<\/span><b>)[^<]*/,(_,prefix)=>prefix+(gameState.energy||0)+'%').replace(/(<span>🛡 ความปลอดภัย<\/span><b>)[^<]*/,(_,prefix)=>prefix+(gameState.security??82)+'%');
  html=html.replace('<div class="command-layout">',`<div class="daily-objective"><b>ภารกิจประจำวัน</b><span>${dailyObjective()}</span></div><div class="command-layout">`);  if(storyFlags.losses){html=html.replace('</div><div class="command-layout">',`</div><div class="memorial-banner"><b>ห้องรำลึก</b><span>${storyFlags.losses} คนจากครอบครัวจากไป${storyFlags.lastLoss?` · ล่าสุด: ${storyFlags.lastLoss}`:''}</span></div><div class="command-layout">`)}
  html=html.replace(/<button class="task-card" onclick="completeTask\('[^']+','พักผ่อน'\)">[\s\S]*?<\/button>/g,(_,card)=>`<div class="task-card task-resting" aria-label="กำลังพักผ่อน"><span class="task-symbol">🛏️</span><div><strong>กำลังพักผ่อน</strong><small>สมาชิกอยู่ในห้องนอน · ไม่ใช่งานผลิต</small></div></div>`);
  if(missionState){missionState.members.forEach(i=>{html=html.replace(new RegExp(`<button class="character-card" onclick="showCharacter\\(${i}\\)">[\\s\\S]*?<\\/button>`),'')});html=html.replace('</section><section class="panel command-tasks">',`</section><div class="away-banner"><b>🧭 ทีมออกสำรวจ</b><span>${missionState.members.map(i=>people[i].name).join(' และ ')} · คาดว่าจะกลับวันที่ ${missionState.returnDay}</span><small>จุดหมายและผลการสำรวจยังเป็นความลับ</small></div>${baseAbsenceEffects()}<section class="panel command-tasks">`)}
  html=html.replace(/<section class="panel command-tasks">[\s\S]*?<\/section>/,'');
  return html;
}
overview=liveShelterOverview;

const missionIntelEvents=[
  {id:'mission_signal',icon:'📻',title:'สัญญาณฉุกเฉินจากทีมสำรวจ',text:'วิทยุจับสัญญาณผู้รอดชีวิตที่ขอความช่วยเหลือ เส้นทางอ้อมปลอดภัยกว่าแต่ใช้เวลานานขึ้น',choices:[['ช่วยตามสัญญาณ','เพิ่มโอกาสพบของ แต่ทีมเหนื่อยขึ้น'],['ปิดวิทยุและเดินต่อ','ลดความเสี่ยง ไม่เสียเวลา']]},
  {id:'mission_shortcut',icon:'🧭',title:'ทีมพบทางแยกที่ไม่มีในแผนที่',text:'ทางหนึ่งมีร่องรอยรถขนของ อีกทางมีสัญญาณไฟฉุกเฉินจากอาคารร้าง',choices:[['ตามรอยรถขนของ','เพิ่มโอกาสได้วัสดุและอาหาร'],['ตามสัญญาณไฟ','เพิ่มโอกาสได้ยา แต่เสี่ยงบาดเจ็บ']]},
  {id:'mission_weather',icon:'🌨️',title:'สภาพอากาศเปลี่ยนกะทันหัน',text:'เครื่องสแกนเตือนว่าความเย็นจะลงเร็วกว่าคาด ทีมต้องเลือกระหว่างพักรอหรือเร่งกลับ',choices:[['พักหลบลม','ลดความเสี่ยง แต่เสียเวลา'],['เร่งเดินทางต่อ','กลับเร็วขึ้น แต่เพิ่มความเหนื่อย']]}
];
const advanceDailyWithSystems=window.advanceTime;
window.advanceTime=function(){
  const awayBefore=people.filter(p=>p.expeditionStatus).length;
  const absentDelay=awayBefore?Math.max(15,awayBefore*20):0;
  if(absentDelay)productionQueue.forEach(job=>{if(job.finishDay)job.finishDay+=awayBefore>1?1:0});
  advanceDailyWithSystems();
  if(missionState&&gameState.day>=4&&gameState.day<missionState.returnDay&&!missionState.encounterSeen&&baseEventQueue.length<3&&Math.random()<.45){
    const source=missionIntelEvents[Math.floor(Math.random()*missionIntelEvents.length)];
    if(!baseEventQueue.some(e=>e.id.startsWith('mission_'))){baseEventQueue.push({...source,choices:source.choices.map(c=>[...c])});updateEventBadge();persistGame();notify('ทีมส่งสัญญาณกลับมาให้ตัดสินใจ');if(!window.lastMissionResult)render('overview')}
  }
};
const resolveMissionChoice=resolveMissionEncounter;
resolveMissionEncounter=function(id,choice){
  // A saved game can contain a mission event after the expedition state has
  // already been cleared.  Always consume the event so its buttons never
  // become no-op controls.
  if(!missionState){
    baseEventQueue=baseEventQueue.filter(e=>e.id!==id);
    updateEventBadge();
    persistGame();
    render('events');
    notify('จัดการเหตุการณ์ค้างแล้ว');
    return;
  }
  if(id==='mission_shortcut')missionState.fortune+=choice===0?8:-2;
  else if(id==='mission_weather')missionState.fortune+=choice===0?3:-4;
  resolveMissionChoice(id,choice);
};
window.resolveBaseEvent=function(id,choiceIndex){if(id.startsWith('mission_')){resolveMissionEncounter(id,choiceIndex);return}resolveBaseEventLong(id,choiceIndex)};
const eventImageFor=e=>{const s=`${e.id} ${e.title}`;if(s.includes('สอบสวน')||s.includes('interrogation'))return 'assets/events/raider-interrogation.png';if(s.includes('เจรจา')||s.includes('เรเวน')||s.includes('negotiation'))return 'assets/events/raider-negotiation.png';if(s.includes('ค่ายโจร')||s.includes('สอดแนม')||s.includes('raider_camp'))return 'assets/events/raider-camp.png';if(s.includes('ล้อมบังเกอร์')||s.includes('ป้อมปราการ')||s.includes('siege'))return 'assets/events/bunker-siege.png';if(s.includes('บุก')||s.includes('ทะลวง')||s.includes('assault'))return 'assets/events/bunker-assault.png';if(s.includes('แนวป้องกัน')||s.includes('ครั้งสุดท้าย')||s.includes('final_defense'))return 'assets/events/final-defense.png';if(s.includes('ซุ่มโจมตี')||s.includes('สมรภูมิ')||s.includes('เถ้าดำ')||s.includes('ambush'))return 'assets/events/raider-ambush.png';if(s.includes('นครจมน้ำ')||s.includes('encounter'))return 'assets/events/city-encounter.png';if(s.includes('ปะทะหน้าป้อม')||s.includes('aurora_battle'))return 'assets/events/aurora-battle.png';if(s.includes('อพยพ')||s.includes('evacuation'))return 'assets/events/combat-evacuation.png';if(s.includes('aurora')||s.includes('AURORA')||s.includes('ศูนย์ควบคุม')||s.includes('ศูนย์บัญชาการ'))return 'assets/events/aurora-command.png';if(s.includes('เสียสละ')||s.includes('sacrifice'))return 'assets/events/sacrifice-door.png';if(s.includes('mission_signal')||s.includes('วิทยุ')||s.includes('สัญญาณ')||s.includes('เฝ้าระวัง'))return 'assets/events/radio-signal.png';if(s.includes('door')||s.includes('เคาะประตู')||s.includes('ผู้รอดชีวิต'))return 'assets/events/door-survivors.png';if(s.includes('injury')||s.includes('บาดเจ็บ'))return 'assets/events/injured-survivor.png';if(s.includes('generator')||s.includes('เครื่องกำเนิด')||s.includes('โรงงานพลังงาน'))return 'assets/events/generator-failure.png';if(s.includes('machine')||s.includes('ซ่อมเครื่องจักร'))return 'assets/events/machine-crisis.png';if(s.includes('shortcut')||s.includes('ทางแยก'))return 'assets/events/tunnel-team.png';if(s.includes('พายุแม่เหล็ก')||s.includes('แม่เหล็ก')||s.includes('กลับด้าน')||s.includes('magnetic'))return 'assets/events/magnetic-storm.png';if(s.includes('ผู้ลี้ภัย')||s.includes('refugee'))return 'assets/events/refugees.png';return ''};
eventsView=function(){return `<div class="view-content"><div class="view-title"><div><h1>เหตุการณ์</h1><p>เรื่องราวที่กำลังเกิดขึ้นกับครอบครัว · ผู้รอดชีวิต ${alivePeople().length}/5</p></div><span class="tag">เหลือ ${baseEventQueue.length} เหตุการณ์</span></div><section class="base-events">${baseEventQueue.length?baseEventQueue.map(e=>`<article class="base-event-card">${eventImageFor(e)?`<div class="event-art" style="background-image:url('${eventImageFor(e)}')"></div>`:''}<div class="base-event-icon">${e.icon}</div><div class="base-event-copy"><h2>${e.title}</h2><p>${e.text}</p><div class="base-event-choices">${e.choices.map((c,i)=>`<button type="button" class="${i===0?'primary':'secondary'}" onclick="resolveBaseEvent('${e.id}',${i})">${c[0]}</button><small>${c[1]}</small>`).join('')}</div></div></article>`).join(''):'<div class="empty-state"><div class="end-icon">✓</div><h2>ไม่มีเหตุการณ์ค้างอยู่</h2><p>กดจบวันเพื่อรอเหตุการณ์ใหม่</p></div>'}</section></div>`};
showEnd=function(title,desc){const bg=endState==='win'?'assets/events/final-evacuation.png':'assets/events/generator-failure.png';main.innerHTML=`<div class="view-content"><section class="panel empty-state end-state" style="background-image:linear-gradient(180deg,#07131ccc,#07131cf2),url('${bg}');background-size:cover;background-position:center"><div class="end-icon">${endState==='win'?'★':'!'}</div><h1>${title}</h1><p>${desc}</p><p>วันที่ ${gameState.day} · อาหาร ${formatCount(gameState.food)} · น้ำ ${formatCount(gameState.water)}</p><button class="primary" onclick="resetGame()">เริ่มเกมใหม่</button></section></div>`};
function applyOptimizedArtwork(){document.querySelectorAll('[style*="assets/"]').forEach(el=>{if(el.style.backgroundImage)el.style.backgroundImage=el.style.backgroundImage.replace(/\.png/g,'.webp')})}
const renderWithArtwork=window.render;window.render=function(view='overview'){renderWithArtwork(view);applyOptimizedArtwork()};
const showEndWithArtwork=showEnd;showEnd=function(title,desc){showEndWithArtwork(title,desc);applyOptimizedArtwork()};
const launchMissionBase=launchLongExpedition;launchLongExpedition=function(){launchMissionBase();if(missionState&&Math.random()<.55){const hidden=['อุโมงค์ทางแยก','มหานครร้าง','โรงงานร้าง','โกดังเสบียง','สถานีรถไฟใต้ดิน'];missionState.location=hidden[Math.floor(Math.random()*hidden.length)];persistGame()}};window.launchExpedition=launchLongExpedition;
const missionResultBase=missionResultView;missionResultView=function(){let html=missionResultBase();if(window.lastMissionResult?.place==='อุโมงค์ทางแยก')html=html.replace(/riverside-market\.(?:png|webp)/g,'underground-crossroads.webp');if(window.lastMissionResult?.place==='มหานครร้าง')html=html.replace(/riverside-market\.(?:png|webp)/g,'ruined-city.webp');return html};
const checkEndStateBase=checkEndState;checkEndState=function(){return checkEndStateBase()};
const showEndLong=showEnd;showEnd=function(title,desc){showEndLong(title,gameState.day>=100?desc.replace(/วันที่ 30/g,`วันที่ ${gameState.day}`).replace(/วันที่ 100/g,`วันที่ ${gameState.day}`):desc)};
let audioCtx=null;function playUiTone(kind='click'){try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();osc.type=kind==='combat'?'sawtooth':'sine';osc.frequency.value=kind==='death'?180:kind==='combat'?250:kind==='alert'?620:kind==='success'?460:320;gain.gain.setValueAtTime(kind==='combat'?.045:.035,audioCtx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+(kind==='death'?.28:.12));osc.connect(gain).connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+(kind==='death'?.28:.12))}catch(e){}}
const notifyWithSound=notify;notify=function(msg){notifyWithSound(msg);const kind=/เสียชีวิต|สูญเสีย/.test(msg)?'death':/ปะทะ|ยิงตอบโต้|โจมตี/.test(msg)?'combat':/สำเร็จ|กลับ|ได้รับ|เริ่ม/.test(msg)?'success':'alert';playUiTone(kind)};document.addEventListener('click',e=>{if(e.target.closest('button'))playUiTone('click')});

// Production assignment: a family member is attached to each job and can shorten suitable work.
function productionWorkerBonus(key,index){const p=people[index];if(!p)return 0;const role=p.role||'';const match=(key==='repair'&&role.includes('ช่าง'))||(key==='medicine'&&role.includes('ผู้ป่วย'))||((key==='food'||key==='water')&&role.includes('เสบียง'))||(key==='battery'&&(role.includes('ช่าง')||role.includes('สำรวจ')));return match?1:0}
function productionWorkerLabel(index){return index===undefined||index===null||index===''?'ยังไม่ระบุ':people[Number(index)]?.name||'ไม่ทราบชื่อ'}
function productionWorkerOptions(key){return people.map((p,i)=>!isAlive(p)?`<option value="${i}" disabled>${p.name} · เสียชีวิต</option>`:p.expeditionStatus?`<option value="${i}" disabled>${p.name} · ออกสำรวจ</option>`:p.treatmentUntil?`<option value="${i}" disabled>${p.name} · กำลังรักษา</option>`:productionBusy(p)?`<option value="${i}" disabled>${p.name} · กำลังผลิต</option>`:p.injuryStatus?`<option value="${i}" disabled>${p.name} · ${p.injuryStatus}</option>`:`<option value="${i}">${p.name} · ${p.role}${productionWorkerBonus(key,i)?' · ถนัดงานนี้':''}</option>`).join('')}
startProduction=function(key,workerIndex){const recipe=productionRecipes[key];if(!recipe)return;if(productionQueue.length>=5){notify('คิวการผลิตเต็มแล้ว');return}const available=people.map((p,i)=>({p,i})).filter(x=>isAlive(x.p)&&!x.p.expeditionStatus&&!x.p.injuryStatus&&!x.p.treatmentUntil&&!productionBusy(x.p)&&x.p.task!=='พักผ่อน'&&x.p.task!=='กำลังพักผ่อน');let index=Number(workerIndex);if(!Number.isInteger(index)||!people[index]||!available.some(x=>x.i===index)){index=available.find(x=>productionWorkerBonus(key,x.i))?.i??available[0]?.i}if(index===undefined){notify('ไม่มีสมาชิกว่างสำหรับรับงานนี้');return}if(gameState.materials<recipe.cost.materials||gameState.energy<recipe.cost.energy){notify('วัสดุหรือพลังงานไม่พอ');return}if(!productionStorageFits(key)){notify('คลังเต็ม · ใช้ของหรืออัปเกรดคลังก่อนรับผลผลิต');return}const duration=Math.max(1,(recipe.days||1)-productionWorkerBonus(key,index));gameState.materials-=recipe.cost.materials;gameState.energy-=recipe.cost.energy;people[index].task=`ผลิต: ${recipe.name}`;people[index].fatigue=Math.min(100,people[index].fatigue+4);productionQueue.push({key,worker:index,specialist:productionWorkerBonus(key,index)>0,productionLevel:productionLevel(),startedDay:gameState.day,finishDay:gameState.day+duration});persistGame();updateResourceBar();notify(`เริ่มผลิต ${recipe.name} โดย${people[index].name} · ใช้เวลา ${duration} วัน`);render('production')};
productionView=function(){const available=alivePeople().filter(p=>!p.expeditionStatus&&!p.treatmentUntil&&!productionBusy(p)&&p.task!=='พักผ่อน'&&p.task!=='กำลังพักผ่อน');return `<div class="view-content"><div class="view-title"><div><h1>การผลิตและซ่อมแซม</h1><p>ผลิตได้ตั้งแต่ระดับเริ่มต้น · ผลผลิต ${Math.round(productionMultiplier()*100)}% · สูงสุดระดับ 3 ได้ 100%</p></div><span class="tag">ระดับ ${productionLevel()}/3 · วันที่ ${gameState.day} · คิว ${productionQueue.length}/5</span></div><div class="production-layout"><section class="panel recipe-panel"><h2>สูตรการผลิต</h2><div class="recipe-grid">${Object.entries(productionRecipes).map(([key,r])=>`<article class="recipe-card"><span class="recipe-icon">${r.icon}</span><div><h3>${r.name}</h3><p>${r.desc}</p><small>🧱 ${r.cost.materials} · ⚡ ${r.cost.energy} · ⏱️ ${formatProductionDays(r.days)}</small><small>ผลผลิตระดับนี้: <b>${productionOutputLabel(key)}</b> · ผู้ถนัดงานได้โบนัส +10%</small><label class="production-assignee">ผู้รับผิดชอบ<select id="worker-${key}">${productionWorkerOptions(key)}</select></label></div><button class="primary" onclick="startProduction('${key}',document.getElementById('worker-${key}').value)">ผลิต</button></article>`).join('')}</div></section><aside class="panel queue-panel"><h2>คิวการผลิต</h2>${productionQueue.length?productionQueue.map((job,i)=>{const r=productionRecipes[job.key];if(!r)return '';const total=Math.max(1,(job.finishDay-job.startedDay)||r.days||1),remaining=Math.max(0,job.finishDay-gameState.day),progress=Math.min(100,Math.round(((total-remaining)/total)*100));return `<div class="queue-row"><span>${r.icon}</span><div><b>${r.name}</b><small>ผู้รับผิดชอบ: ${productionWorkerLabel(job.worker)}</small>${bar(progress,'orange')}<small>${remaining>0?`กำลังผลิต · เหลือ ${remaining} วัน · เสร็จวันที่ ${job.finishDay}`:'เสร็จแล้ว · รอรับของ'}</small></div><button class="secondary" onclick="cancelProduction(${i})">ยกเลิก</button></div>`}).join(''):'<p class="muted">ยังไม่มีงานในคิว</p>'}<div class="production-stock"><b>สมาชิกว่าง ${available.length}/5</b><b>🧱 ${formatCount(gameState.materials)}</b><b>⚡ ${gameState.energy}%</b></div></aside></div></div>`};

// Production incidents make long jobs meaningful and give the player a decision before the next day.
const advanceWithProductionIncidents=window.advanceTime;
window.advanceTime=function(){
  advanceWithProductionIncidents();
  if(endState||gameState.day<4||!productionQueue.length||baseEventQueue.length>=3||Math.random()>.28)return;
  const job=productionQueue[0],recipe=productionRecipes[job.key];
  const incident=job.key==='repair'
    ? {id:'production_overheat',icon:'🔥',title:'เครื่องจักรร้อนเกินไป',text:`งาน${recipe.name}มีความร้อนสะสม ช่างต้องตัดสินใจว่าจะหยุดพักเพื่อความปลอดภัย หรือฝืนทำต่อเพื่อให้เสร็จเร็ว`,choices:[['หยุดพักเครื่อง','งานช้าลง 1 วัน แต่ไม่เสียพลังงานเพิ่ม'],['ฝืนทำต่อ','เสียพลังงาน 8% และลดความปลอดภัยของฐาน']]}
    : {id:'production_quality',icon:'⚠️',title:'วัตถุดิบมีปัญหา',text:`สมาชิกพบว่าวัตถุดิบบางส่วนของ${recipe.name}ปนเปื้อน ต้องเลือกว่าจะคัดทิ้งหรือใช้เครื่องมือตรวจสอบก่อน`,choices:[['คัดทิ้งและเริ่มชุดใหม่','เสียวัสดุเพิ่มเล็กน้อย แต่คุณภาพปลอดภัย'],['ตรวจสอบอย่างละเอียด','ใช้เวลาเพิ่ม 1 วัน แต่ไม่เสียวัสดุเพิ่ม']]};
  baseEventQueue.push({...incident,jobKey:job.key,choices:incident.choices.map(c=>[...c])});updateEventBadge();persistGame();notify(`เหตุการณ์การผลิต: ${incident.title}`);render('events')
};
const resolveBaseEventWithProduction=window.resolveBaseEvent;
window.resolveBaseEvent=function(id,choiceIndex){
  if(id==='production_overheat'||id==='production_quality'){
    const event=baseEventQueue.find(e=>e.id===id),job=productionQueue.find(j=>j.key===event?.jobKey);
    if(job){if(id==='production_overheat'&&choiceIndex===0)job.finishDay+=1;if(id==='production_overheat'&&choiceIndex===1){gameState.energy=Math.max(0,gameState.energy-8);gameState.security=Math.max(0,(gameState.security??82)-3)}if(id==='production_quality'&&choiceIndex===0)gameState.materials=Math.max(0,gameState.materials-5);if(id==='production_quality'&&choiceIndex===1)job.finishDay+=1}
    baseEventQueue=baseEventQueue.filter(e=>e.id!==id);updateEventBadge();persistGame();updateResourceBar();render('production');notify(choiceIndex===0?'จัดการเหตุการณ์การผลิตแล้ว':'ตัดสินใจดำเนินงานต่อแล้ว');return;
  }
  resolveBaseEventWithProduction(id,choiceIndex)
};
// Keep stockpiles readable and prevent production rewards from growing without bound.
function clampBalancedResources(){gameState.food=Math.min(2400,Math.max(0,gameState.food));gameState.water=Math.min(1800,Math.max(0,gameState.water));gameState.materials=Math.min(700,Math.max(0,gameState.materials));gameState.energy=Math.min(100,Math.max(0,gameState.energy));gameState.battery=Math.min(100,Math.max(0,gameState.battery))}
const renderWithBalance=window.render;window.render=function(view='overview'){clampBalancedResources();renderWithBalance(view)};
const roomDetails={bedroom:{title:'ห้องนอน',image:'bedroom.webp',text:'พื้นที่พักผ่อนของสมาชิกในบ้าน ความเหนื่อยจะลดลงเมื่อจบวัน',action:'พักสมาชิก',target:'people'},storage:{title:'ห้องเก็บของ',image:'storage.webp',text:'คลังอาหาร น้ำ วัสดุ และอุปกรณ์ทั้งหมดของหลุมหลบภัย',action:'เปิดคลังทรัพยากร',target:'inventory'},engine:{title:'ห้องเครื่อง',image:'engine.webp',text:'ศูนย์กลางพลังงานและงานซ่อมแซมของฐาน งานผลิตจะใช้เวลาหลายวัน',action:'เปิดการผลิต',target:'production'},medical:{title:'ห้องพยาบาล',image:'medical.webp',text:'ห้องรักษาผู้บาดเจ็บและเตรียมชุดปฐมพยาบาล',action:'ดูสมาชิกและสุขภาพ',target:'people'},exit:{title:'ประตูทางออก',image:'exit.webp',text:'ประตูเหล็กชั้นนอกสำหรับออกสำรวจ รับผู้รอดชีวิต และเฝ้าระวังภัยจากภายนอก',action:'จัดทีมสำรวจ',target:'expedition'}};
function showRoom(key,focusIndex=null){const r=roomDetails[key]||roomDetails.bedroom;const resting=people.filter(p=>p.task==='พักผ่อน'||p.task==='กำลังพักผ่อน');const injured=people.filter(p=>isAlive(p)&&p.health<100);const extra=key==='bedroom'?`<div class="room-member-list"><h3>สถานะการพักผ่อน</h3>${resting.length?resting.map(p=>`<div class="room-member-row"><span>🛏️ ${p.name}</span><b>กำลังพักผ่อน</b></div>`).join(''):'<p>ห้องนอนพร้อมใช้งาน · ยังไม่มีสมาชิกกำลังพักผ่อน</p>'}</div>`:key==='medical'?`<div class="room-member-list"><h3>สถานีพยาบาล</h3><div class="room-member-row"><span>🧰 ชุดปฐมพยาบาล</span><b>${gameState.medicine||0} ชุด</b></div>${injured.length?`<div class="room-member-row"><span>🩹 สมาชิกที่ต้องรักษา</span><b>${injured.length} คน</b></div><div class="room-injured-list">${injured.map(p=>`<div class="room-member-row"><span>${p.name} <small>เจ็บ${treatmentRange(p).severity} · ใช้เวลาประมาณ ${treatmentRange(p).range[0]}–${treatmentRange(p).range[1]} วัน</small></span><b>สุขภาพ ${p.health}%</b>${p.treatmentUntil?`<em>รักษาอยู่ · เหลือ ${Math.max(1,p.treatmentUntil-gameState.day)} วัน</em>`:`<button class="secondary" onclick="startTreatment(${people.indexOf(p)})">รักษา</button>`}</div>`).join('')}</div>`:'<p>ยังไม่มีสมาชิกบาดเจ็บ ห้องพยาบาลพร้อมใช้งาน</p>'}<p>ใช้ชุดปฐมพยาบาลจากคลังเพื่อฟื้นฟูสุขภาพสมาชิก</p></div>`:'';main.innerHTML=`<div class="view-content room-detail-view"><div class="view-title"><div><h1>${r.title}</h1><p>ห้องภายในหลุมหลบภัย · วันที่ ${gameState.day}</p></div><button class="secondary" onclick="render('overview')">← กลับภาพรวม</button></div><section class="panel room-detail-panel"><div class="room-detail-art" style="background-image:url('assets/rooms/${r.image}')"></div><div class="room-detail-copy"><span class="tag">ห้อง${r.title}</span><h2>${r.title}</h2><p>${r.text}</p><div class="room-detail-stats"><span>สมาชิกในฐาน <b>${availablePeople().length}/5</b></span><span>พลังงาน <b>${gameState.energy}%</b></span><span>ความปลอดภัย <b>${gameState.security??82}%</b></span></div>${extra}<button class="primary" onclick="render('${r.target}')">${r.action} ▶</button></div></section></div>`;applyOptimizedArtwork()}
// Context-aware event selection keeps random events tied to the current run.
function pickContextualEvent(){
  const queued=new Set(baseEventQueue.map(e=>e.id));
  let preferred=[];
  if(gameState.food<350||gameState.water<300)preferred.push('water','visitor');
  if(gameState.energy<35)preferred.push('generator');
  if(gameState.temperature<0||gameState.coldSuit<=0)preferred.push('coldfront');
  if(gameState.medicine<=2)preferred.push('injury');
  if(gameState.tools>0)preferred.push('radio');
  const candidates=baseEventCatalog.filter(e=>!queued.has(e.id));
  const focused=candidates.filter(e=>preferred.includes(e.id));
  const pool=focused.length?focused:candidates;
  return pool[Math.floor(Math.random()*pool.length)]||baseEventCatalog[Math.floor(Math.random()*baseEventCatalog.length)];
}
function showDaySummary(before){
  if(endState||before.day===gameState.day)return false;
  const delta=(now,old)=>now-old;
  const lines=[
    `อาหาร ${delta(gameState.food,before.food)>=0?'+':''}${delta(gameState.food,before.food)}`,
    `น้ำ ${delta(gameState.water,before.water)>=0?'+':''}${delta(gameState.water,before.water)}`,
    `พลังงาน ${delta(gameState.energy,before.energy)>=0?'+':''}${delta(gameState.energy,before.energy)}%`,
    `วัสดุ ${delta(gameState.materials,before.materials)>=0?'+':''}${delta(gameState.materials,before.materials)}`
  ];
  main.innerHTML=`<div class="view-content"><section class="panel day-summary"><span class="tag">สรุปการเปลี่ยนวัน</span><h1>เข้าสู่วันที่ ${gameState.day}</h1><p>ตรวจสอบผลจากการจัดการของเมื่อวานก่อนเริ่มวางแผนต่อ</p><div class="day-summary-grid">${lines.map(x=>`<div>${x}</div>`).join('')}</div><div class="day-summary-alerts">${dailyAlerts().map(x=>`<p>${x}</p>`).join('')}</div><button class="primary" onclick="render('overview')">วางแผนวันที่ ${gameState.day} ▶</button></section></div>`;
  return true;
}
function dailyAlerts(){const a=[];if(gameState.food<250)a.push('⚠ อาหารใกล้หมด ควรเตรียมทีมออกหาเสบียง');if(gameState.water<250)a.push('⚠ น้ำใกล้หมด ควรเปิดงานกรองน้ำ');if(gameState.energy<25)a.push('⚠ พลังงานฐานต่ำ ควรตรวจห้องเครื่อง');if(people.some(p=>p.health<50))a.push('⚠ สมาชิกบางคนบาดเจ็บ ควรใช้ห้องพยาบาล');if(productionQueue?.length)a.push(`งานผลิตค้างอยู่ ${productionQueue.length} งาน`);return a.length?a:['✓ ฐานยังอยู่ในสถานะพร้อมรับวันใหม่'];}
function dailyObjective(){if(gameState.day<=3)return 'ตั้งหลักให้ครบ 3 วัน · จัดงานพื้นฐานและสะสมเสบียง';if(gameState.food<350||gameState.water<300)return 'เป้าหมายวันนี้ · รักษาอาหารและน้ำให้พอถึงวันถัดไป';if(gameState.energy<35)return 'เป้าหมายวันนี้ · ฟื้นพลังงานและตรวจห้องเครื่อง';if(people.some(p=>p.health<60))return 'เป้าหมายวันนี้ · รักษาสมาชิกที่บาดเจ็บ';if(!missionState&&gameState.day%3===0)return 'เป้าหมายวันนี้ · เตรียมทีมสำรวจหาอุปกรณ์จำเป็น';return 'เป้าหมายวันนี้ · ผลิตของจำเป็นและรักษาความปลอดภัยของฐาน';}
function applyScarcityHazards(){
  const residents=alivePeople().filter(p=>!p.expeditionStatus);
  if(!residents.length)return false;
  let hit=false;
  if(gameState.food<=0){residents.forEach(p=>{p.health=Math.max(0,p.health-10);p.morale=Math.max(0,p.morale-5)});hit=true}
  if(gameState.water<=0){residents.forEach(p=>{p.health=Math.max(0,p.health-14);p.morale=Math.max(0,p.morale-7)});hit=true}
  if(gameState.energy<=0){gameState.security=Math.max(0,(gameState.security??82)-8);hit=true}
  if(hit){eventHistory.push({day:gameState.day,place:'หลุมหลบภัย',text:'ทรัพยากรไม่พอ สมาชิกได้รับผลกระทบจากการขาดแคลน'});persistGame();notify('ทรัพยากรหมด สมาชิกได้รับผลกระทบหนัก')}
  return hit;
}
const resolveWithFollowUps=window.resolveBaseEvent;
window.resolveBaseEvent=function(id,choiceIndex){
  resolveWithFollowUps(id,choiceIndex);
  if(gameState.day<4)return;
  const follow=id==='visitor'&&choiceIndex===0
    ? {id:'followup_refugees',icon:'🤝',title:'ผู้รอดชีวิตส่งสัญญาณกลับมา',text:'กลุ่มผู้รอดชีวิตที่คุณช่วยไว้ส่งพิกัดคลังเสบียงใกล้ฐานกลับมา แต่เส้นทางจะเปิดได้เพียงช่วงสั้น ๆ',choices:[['บันทึกพิกัดไว้','ปลดล็อกเบาะแสสำหรับการสำรวจครั้งถัดไป'],['ปิดสัญญาณไว้ก่อน','ลดความเสี่ยงจากการถูกติดตาม']]}
    : id==='generator'&&choiceIndex===1
      ? {id:'followup_generator',icon:'⚙️',title:'ไฟสำรองเริ่มตกลง',text:'การปล่อยเครื่องกำเนิดทำงานต่อทำให้ระบบไฟกะพริบ สมาชิกต้องตรวจห้องเครื่องในวันถัดไป',choices:[['จัดคนตรวจทันที','ใช้เวลาเตรียมงาน แต่ลดความเสี่ยง'],['รอดูอาการ','ไม่เสียเวลา แต่ระบบอาจเสียหายเพิ่ม']]}
      : null;
  if(follow&&!baseEventQueue.some(e=>e.id===follow.id)){baseEventQueue.push(follow);updateEventBadge();persistGame();render('events');notify('การตัดสินใจก่อให้เกิดเหตุการณ์ต่อเนื่อง')}
};
const summaryAdvance=window.advanceTime;
window.advanceTime=function(){const before={day:gameState.day,food:gameState.food,water:gameState.water,energy:gameState.energy,materials:gameState.materials};summaryAdvance();applyScarcityHazards();if(!endState&&typeof checkEndState==='function'&&checkEndState())return;if(gameState.day<=3)clearEarlyEvents();showDaySummary(before)};
// Give new players a quiet setup period.  Events begin after day 3 and are
// selected by the existing random event pool from day 4 onward.
const queueStoryBeatAfterGrace=queueStoryBeat;
queueStoryBeat=function(day){if(day<4)return;return queueStoryBeatAfterGrace(day)};
function clearEarlyEvents(){if(gameState.day<=3&&baseEventQueue.length){baseEventQueue=[];updateEventBadge();persistGame()}}
const advanceWithEarlyEventGuard=window.advanceTime;
window.advanceTime=function(){advanceWithEarlyEventGuard();clearEarlyEvents()};
clearEarlyEvents();
let endDayDialogOpen=false;
function requestEndDay(){
  if(endDayDialogOpen){if(document.querySelector('.end-day-dialog'))return;endDayDialogOpen=false}
  if(endState)return;
  endDayDialogOpen=true;
  const away=people.filter(p=>p.expeditionStatus).length;
  const residents=Math.max(1,people.length-away);
  const profile=difficultyProfile();
  const lines=[`อาหารประมาณ -${Math.ceil(residents*12*profile.foodUse)}`,`น้ำประมาณ -${Math.ceil(residents*8*profile.waterUse)}`,`พลังงาน -4%`];
  if(away)lines.push(`ทีมสำรวจ ${away} คนจะเดินทางต่อ`);
  if(productionQueue.length)lines.push(`งานผลิต ${productionQueue.length} งานจะเดินต่อ`);
  main.innerHTML=`<div class="confirm-backdrop"><section class="panel end-day-dialog"><span class="tag">ยืนยันการจบวัน</span><h2>จบวันที่ ${gameState.day} หรือไม่?</h2><p>การยืนยันจะใช้ทรัพยากรและประมวลผลเหตุการณ์ของวันถัดไป</p><div class="end-day-costs">${lines.map(x=>`<span>${x}</span>`).join('')}</div><div class="end-day-actions"><button class="secondary" onclick="cancelEndDay()">กลับไปวางแผน</button><button class="primary" onclick="confirmEndDay()">ยืนยันจบวัน ▶</button></div></section></div>`;
}
function cancelEndDay(){endDayDialogOpen=false;render('overview')}
function confirmEndDay(){if(!endDayDialogOpen)return;endDayDialogOpen=false;advanceWithEarlyEventGuard();clearEarlyEvents();}
window.advanceTime=requestEndDay;

// Entry screen: keep the game shell hidden until the player chooses a run.
function hasSavedRun(){try{return !!localStorage.getItem('last-light-save')}catch(e){return false}}
function leaveTitleScreen(){document.body.classList.remove('title-mode')}
function enterSavedRun(){leaveTitleScreen();endDayDialogOpen=false;render(gameState.prepDone?'overview':'prep')}
let titleConfirmAction=null;
function showTitleConfirm(title,text,action){
  titleConfirmAction=action;
  main.insertAdjacentHTML('beforeend',`<div class="title-confirm-backdrop"><section class="panel title-confirm"><span class="tag">ยืนยันการดำเนินการ</span><h2>${title}</h2><p>${text}</p><div class="title-confirm-actions"><button class="secondary" onclick="closeTitleConfirm()">ยกเลิก</button><button class="primary" onclick="acceptTitleConfirm()">ยืนยัน</button></div></section></div>`);
}
function closeTitleConfirm(){document.querySelector('.title-confirm-backdrop')?.remove();titleConfirmAction=null}
function acceptTitleConfirm(){const action=titleConfirmAction;closeTitleConfirm();if(action)action()}
function showHowToPlay(){
  main.insertAdjacentHTML('beforeend',`<div class="title-confirm-backdrop"><section class="panel howto-panel"><span class="tag">คู่มือการเอาตัวรอด</span><h2>วิธีเล่น</h2><div class="howto-list"><p><b>1 · วางแผนฐาน</b><span>จัดคนเข้าห้อง ผลิตของ และดูแลอาหาร น้ำ พลังงานกับความปลอดภัย</span></p><p><b>2 · ออกสำรวจ</b><span>เลือกสมาชิก ระยะเวลา และอุปกรณ์ ยิ่งเสี่ยงยิ่งได้ของมาก แต่มีโอกาสบาดเจ็บหรือเสียสมาชิก</span></p><p><b>3 · ตัดสินใจ</b><span>เหตุการณ์จะเริ่มสุ่มตั้งแต่วันที่ 4 ทุกทางเลือกส่งผลต่อทรัพยากรและความสัมพันธ์</span></p><p><b>4 · อยู่ให้ถึงวันที่ 100</b><span>กดจบวันเมื่อพร้อม ระบบจะสรุปผลและบันทึกเกมอัตโนมัติ</span></p></div><button class="secondary" onclick="this.closest('.title-confirm-backdrop').remove()">เข้าใจแล้ว</button></section></div>`);
}
function startNewRun(){
  const action=()=>{try{localStorage.removeItem('last-light-save');sessionStorage.setItem('last-light-start','1')}catch(e){} location.reload()};
  if(hasSavedRun())showTitleConfirm('เริ่มเกมใหม่','เซฟเดิมจะถูกลบและเริ่มการเดินทางตั้งแต่วันแรก',action);else action();
}
function deleteSavedRun(){
  if(!hasSavedRun())return;
  showTitleConfirm('ลบเซฟเกมนี้?','ความคืบหน้าทั้งหมดจะหายไปและไม่สามารถกู้คืนได้',()=>{try{localStorage.removeItem('last-light-save')}catch(e){} location.reload()});
}
function showStartScreen(){
  const freshStart=sessionStorage.getItem('last-light-start')==='1';
  if(freshStart){sessionStorage.removeItem('last-light-start');applyPendingDifficulty();setTimeout(()=>enterSavedRun(),0);return}
  document.body.classList.add('title-mode');
  const saved=hasSavedRun();let savedAt='';try{const raw=JSON.parse(localStorage.getItem('last-light-save')||'null');if(raw?.savedAt)savedAt=new Date(raw.savedAt).toLocaleString('th-TH',{dateStyle:'short',timeStyle:'short'})}catch(e){}
  main.innerHTML=`<section class="title-screen"><div class="title-backdrop"></div><div class="title-content"><div class="title-kicker">SURVIVAL MANAGEMENT SIMULATION</div><h1>วันเดือด<br><span>คืนเยือก</span></h1><p class="title-subtitle">หนึ่งร้อยวันในโลกที่อากาศสุดขั้ว · ทุกการตัดสินใจมีราคาที่ต้องจ่าย</p><div class="title-card"><div class="save-meta">${saved?`<b>พบเซฟล่าสุด</b><span>วันที่ ${gameState.day} · หลุมหลบภัยยังดำเนินต่อ</span>${savedAt?`<small>บันทึกล่าสุด ${savedAt}</small>`:''}`:'<b>ยังไม่มีเซฟเกม</b><span>เริ่มต้นการเอาตัวรอดของครอบครัวคุณ</span>'}</div><div class="title-actions"><button class="primary title-button" onclick="enterSavedRun()" ${saved?'':'disabled'}>${saved?'เล่นต่อจากเซฟ ▶':'ยังไม่มีเซฟให้เล่นต่อ'}</button><button class="secondary title-button" onclick="startNewRun()">เริ่มเกมใหม่</button></div><button class="title-help" onclick="showHowToPlay()">วิธีเล่นและระบบหลัก</button>${saved?'<button class="title-delete" onclick="deleteSavedRun()">ลบเซฟเกมนี้</button><small class="title-hint">เกมจะบันทึกอัตโนมัติในเบราว์เซอร์เครื่องนี้</small>':''}</div></div></section>`;
}

const weatherForecasts=[
  {name:'อากาศร้อนจัด',icon:'☀',temp:'42°C',risk:'ปานกลาง',effect:'ใช้น้ำเพิ่ม · ชุดกันร้อนเสื่อมเร็ว',tone:'hot'},
  {name:'พายุหิมะฉับพลัน',icon:'❄',temp:'-18°C',risk:'สูง',effect:'ทีมสำรวจเหนื่อยและบาดเจ็บง่าย · ใช้ชุดกันหนาว',tone:'cold'},
  {name:'ฝนกรดและน้ำท่วม',icon:'⚡',temp:'8°C',risk:'สูง',effect:'เส้นทางเมืองจมน้ำ · มีโอกาสพบกลุ่มโจร',tone:'storm'},
  {name:'ลมสงบชั่วคราว',icon:'◌',temp:'16°C',risk:'ต่ำ',effect:'เหมาะกับการออกสำรวจ · ใช้พลังงานน้อยลง',tone:'calm'}
];
function weatherFor(offset){return weatherForecasts[(gameState.day-1+offset)%weatherForecasts.length]}
function prepareWeather(kind){if(kind==='insulate'){if(gameState.materials<15||gameState.energy<5){notify('วัสดุหรือพลังงานไม่พอเสริมฉนวน');return}gameState.materials-=15;gameState.energy-=5;gameState.security=Math.min(100,(gameState.security||82)+5);storyFlags.weatherPrepared=true;notify('เสริมฉนวนหลุมหลบภัยแล้ว · ลดผลกระทบจากอากาศรอบถัดไป')}else if(kind==='charge'){if(gameState.battery<5){notify('แบตเตอรี่ไม่พอชาร์จอุปกรณ์');return}gameState.battery-=5;gameState.energy=Math.min(100,gameState.energy+8);notify('ชาร์จอุปกรณ์สำรวจแล้ว · พลังงานฐานเพิ่มขึ้น')}persistGame();updateResourceBar();render('weather')}
function weatherPlanningView(){const now=weatherFor(0),next=weatherFor(1),later=weatherFor(2),suit=now.tone==='cold'?`ชุดกันหนาว ${gameState.coldSuit} ชุด · ความทนทาน ${gameState.coldDurability}%`:`ชุดกันร้อน ${gameState.heatSuit} ชุด · ความทนทาน ${gameState.heatDurability}%`;const advice=now.tone==='calm'?'วันนี้เหมาะที่สุดสำหรับออกสำรวจ':now.tone==='cold'?'ควรซื้อชุดกันหนาวและชุดปฐมพยาบาลก่อนออกสำรวจ':now.tone==='storm'?'ควรเสริมฐานและเตรียมอาวุธ เพราะเส้นทางอาจเจอกลุ่มเถ้าดำ':'ควรสะสมน้ำและตรวจชุดกันร้อนก่อนจบวัน';return `<div class="view-content weather-planning"><div class="view-title"><div><h1>พยากรณ์อากาศ</h1><p>ใช้ข้อมูลนี้วางแผนซื้อของ ออกสำรวจ และป้องกันฐาน</p></div><span class="tag">วันที่ ${gameState.day}</span></div><section class="weather-hero panel"><div class="weather-hero-art"></div><div class="weather-hero-copy"><span class="tag">สภาพอากาศวันนี้ · ${now.temp}</span><h2>${now.icon} ${now.name}</h2><p>${now.effect}</p><b class="weather-risk ${now.tone}">ความเสี่ยงออกสำรวจ: ${now.risk}</b></div></section><section class="weather-section"><h2>มีผลกับเกมอย่างไร</h2><div class="weather-impact-grid"><article class="panel"><b>อุปกรณ์ป้องกัน</b><strong>🧥 ${suit}</strong><small>${now.tone==='cold'?'ไม่มีชุดกันหนาว ทีมจะบาดเจ็บง่ายขึ้น':'ชุดป้องกันจะเสื่อมเร็วขึ้นตามสภาพอากาศ'}</small></article><article class="panel"><b>ทรัพยากรฐาน</b><strong>💧 น้ำ ${formatCount(gameState.water)} · ⚡ พลังงาน ${gameState.energy}%</strong><small>${now.tone==='hot'?'อากาศร้อนทำให้น้ำถูกใช้มากขึ้น':'ตรวจพลังงานก่อนส่งทีมออกสำรวจ'}</small></article><article class="panel"><b>คำแนะนำวันนี้</b><strong>⚠ ${advice}</strong><small>การเตรียมพร้อมจะลดความเสียหายจากเหตุการณ์สุ่ม</small></article></div></section><section class="weather-section"><h2>พยากรณ์ล่วงหน้า</h2><div class="forecast-grid">${[now,next,later].map((w,i)=>`<article class="panel forecast-card ${w.tone}"><small>วันที่ ${gameState.day+i+1}</small><strong>${w.icon} ${w.name}</strong><b>${w.temp}</b><p>${w.effect}</p></article>`).join('')}</div></section><section class="weather-section weather-actions"><div class="panel"><h2>เตรียมรับมือ</h2><div class="weather-buttons"><button class="primary" onclick="prepareWeather('insulate')">เสริมฉนวนฐาน<small>ใช้วัสดุ 15 · พลังงาน 5</small></button><button class="secondary" onclick="prepareWeather('charge')">ชาร์จอุปกรณ์สำรวจ<small>ใช้แบตเตอรี่ 5 · ได้พลังงาน 8%</small></button><button class="secondary" onclick="render('expedition')">จัดทีมตามพยากรณ์ ▶</button></div></div></section></div>`}
const renderBeforeWeather=window.render;
window.render=function(view='overview'){if(view==='weather'){main.innerHTML=weatherPlanningView();document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view==='weather'));return}renderBeforeWeather(view)};

// Re-render once after all final overrides are registered so a reload uses live values.
// Combat UI polish: show the practical trade-offs before the player commits gear.
const combatControlsBase=combatControls;
combatControls=function(gear){
  const current=normalizeCombatGear({...gear});
  const ownedWeapons=Object.entries(weaponCatalog).filter(([k])=>k!=='none'&&(gameState.weapons?.[k]||0)>0);
  const w=(ownedWeapons.length?ownedWeapons.map(([k,v])=>`<option value="${k}" ${current.weapon===k?'selected':''}>${v.name} · พลัง ${v.power} · ${v.weight} กก. · มี ${gameState.weapons[k]} ชิ้น</option>`).join(''):'')+`<option value="none" ${current.weapon==='none'?'selected':''}>ไม่ใช้อาวุธ · เสี่ยงสูง</option>`;
  const ownedArmor=Object.entries(armorCatalog).filter(([k])=>k==='none'||(gameState.armor?.[k]||0)>0);
  const a=ownedArmor.map(([k,v])=>`<option value="${k}" ${current.armor===k?'selected':''}>${v.name} · ลดความเสียหาย ${v.protection}${k==='none'?'':' · มี '+(gameState.armor[k]||0)+' ตัว'}</option>`).join('');
  const ownedGrenades=Object.entries(grenadeCatalog).filter(([k])=>k==='none'||(gameState.grenades?.[k]||0)>0);
  const n=ownedGrenades.map(([k,v])=>`<option value="${k}" ${current.grenade===k?'selected':''}>${v.name}${k==='none'?'':` · พลัง ${v.power} · เหลือ ${gameState.grenades[k]||0}`}</option>`).join('');
  const ammoType=weaponCatalog[current.weapon]?.ammo,ammoAvailable=ammoType?gameState.ammo?.[ammoType]||0:0,ammo=current.weapon==='melee'||current.weapon==='none'?'ไม่ใช้กระสุน':`${ammoAvailable} นัด`;
  return `<div class="combat-loadout"><h3>อาวุธและการปะทะ</h3><label><span class="gear-label"><span class="gear-icon">${shopIcon(current.weapon,current.weapon==='melee'?'🔪':'🔫')}</span>อาวุธ</span><select onchange="setCombatLoadout('weapon',this.value)">${w}</select></label><small>กระสุนในคลัง: ${ammo}</small>${ammoType?`<label class="ammo-input">กระสุนที่จะนำไป <input type="number" min="0" max="${ammoAvailable}" value="${Math.min(ammoAvailable,Math.max(0,Math.floor(expeditionPlan.ammoCount||0)))}" onchange="setExpeditionAmmo(this.value)"><small>น้ำหนัก 0.2 กก./นัด</small></label>`:''}<label><span class="gear-label"><span class="gear-icon">${shopIcon(current.armor,'🛡️')}</span>เกราะ</span><select onchange="setCombatLoadout('armor',this.value)">${a}</select></label><label><span class="gear-label"><span class="gear-icon">${shopIcon(current.grenade,'💣')}</span>ระเบิด</span><select onchange="setCombatLoadout('grenade',this.value)">${n}</select></label><p class="loadout-tip">จะแสดงเฉพาะอุปกรณ์ที่มีในคลังเท่านั้น</p></div>`;
};
const missionResultEnhancedBase=missionResultView;
missionResultView=function(){
  const html=missionResultEnhancedBase(); const r=window.lastMissionResult;
  if(!r||!r.combat?.happened)return html;
  const tone=r.combat.delta>0?'ชนะการปะทะ · ได้เปรียบกลับฐาน':r.combat.delta<0?'ถอยจากการปะทะ · ทีมได้รับความเสียหาย':'ปะทะรุนแรง · ผลลัพธ์สูสี';
  const panel=`<div class="combat-result-panel ${r.combat.delta>0?'win':'loss'}"><b>สรุปการปะทะ</b><span>${tone}</span><small>${r.combat.text}</small></div>`;
  return html.replace('<div class="result-stats">',panel+'<div class="result-stats">');
};
const missionResultWithArt=missionResultView;
missionResultView=function(){
  let html=missionResultWithArt(); const r=window.lastMissionResult;
  if(!r)return html;
  const art=r.combat?.happened?(r.combat.delta>0?'combat-win.png':r.combat.delta<0?'combat-loss.png':'combat-retreat.png'):(r.lost?.length?'combat-loss.png':r.score>=68?'survivors-rain.png':'combat-retreat.png');
  return html.replace(/assets\/locations\/[^')"]+/,`assets/events/${art}`);
};
var difficultyProfiles={
  normal:{label:'ปกติ',budget:10000,foodUse:1,waterUse:1,combatChance:1,deathBonus:0,lootPenalty:0,lootChance:1,rareLootChance:1,description:'ทรัพยากรและความเสี่ยงสมดุล เหมาะสำหรับการเริ่มเล่น'},
  hard:{label:'ยาก',budget:7000,foodUse:1.1,waterUse:1.1,combatChance:1.18,deathBonus:.06,lootPenalty:8,lootChance:.78,rareLootChance:.65,description:'ของแพงขึ้นในความหมายของการบริหาร เสบียงลดเร็ว ศัตรูพบได้บ่อยขึ้น'},
  extreme:{label:'โคตรยาก',budget:5000,foodUse:1.25,waterUse:1.25,combatChance:1.38,deathBonus:.13,lootPenalty:17,lootChance:.55,rareLootChance:.38,description:'เริ่มต้นขาดแคลน การปะทะรุนแรง และของหายากมาก'},
  impossible:{label:'แกไม่รอดแน่',budget:2500,foodUse:1.45,waterUse:1.45,combatChance:1.65,deathBonus:.22,lootPenalty:28,lootChance:.35,rareLootChance:.18,description:'งบน้อยที่สุด ศัตรูอันตราย เสบียงหมดเร็ว และโอกาสเสียสมาชิกสูง'}
};
function difficultyProfile(){return (difficultyProfiles&&difficultyProfiles[gameState.difficulty])||{label:'ปกติ',budget:10000,foodUse:1,waterUse:1,combatChance:1,deathBonus:0,lootPenalty:0,lootChance:1,rareLootChance:1,description:'ทรัพยากรและความเสี่ยงสมดุล'}}
function applyPendingDifficulty(){try{const key=sessionStorage.getItem('pending-difficulty');if(!key||!difficultyProfiles[key])return;gameState.difficulty=key;gameState.budget=difficultyProfiles[key].budget;gameState.prepDone=false;sessionStorage.removeItem('pending-difficulty')}catch(e){}}
function chooseDifficulty(key){const profile=difficultyProfiles[key]||difficultyProfiles.normal;const begin=()=>{try{localStorage.removeItem('last-light-save');sessionStorage.setItem('pending-difficulty',key);sessionStorage.setItem('last-light-start','1')}catch(e){}location.reload()};document.querySelector('.difficulty-backdrop')?.remove();if(hasSavedRun())showTitleConfirm(`เริ่มเกมใหม่ · ${profile.label}`,`เซฟเดิมจะถูกลบและเริ่มด้วยงบ ${profile.budget.toLocaleString()} เครดิต`,begin);else begin()}
function showDifficultyPicker(){
  const cards=Object.entries(difficultyProfiles).map(([key,p])=>`<button class="difficulty-card ${key==='normal'?'selected':''}" onclick="chooseDifficulty('${key}')"><span class="difficulty-name">${p.label}</span><b>งบเริ่มต้น ${p.budget.toLocaleString()} เครดิต</b><small>${p.description}</small><em>${key==='normal'?'ความเสี่ยงมาตรฐาน':key==='hard'?'ความเสี่ยงและการใช้เสบียงเพิ่ม':key==='extreme'?'ศัตรูแรง ของหายาก และโอกาสตายสูง':'ทุกอย่างกดดันตั้งแต่วันแรก'}</em></button>`).join('');
  main.insertAdjacentHTML('beforeend',`<div class="difficulty-backdrop"><section class="panel difficulty-picker"><span class="tag">ตั้งค่าการเริ่มต้น</span><h2>เลือกระดับความยาก</h2><p class="muted">ระดับความยากมีผลตั้งแต่วันแรกต่อเงิน เสบียง การปะทะ และโอกาสเสียสมาชิก</p><div class="difficulty-grid">${cards}</div><button class="secondary" onclick="this.closest('.difficulty-backdrop').remove()">กลับ</button></section></div>`);
}
startNewRun=function(){showDifficultyPicker()};window.chooseDifficulty=chooseDifficulty;window.showDifficultyPicker=showDifficultyPicker;
const prepWithDifficulty=prep;
prep=function(){return prepWithDifficulty().replace('ก่อนวันเดือด · จัดฐานด้วยตัวเอง',`ก่อนวันเดือด · ระดับความยาก: ${difficultyProfile().label}`)};
const showEndBase=showEnd;
showEnd=function(title,desc){
  const deaths=storyFlags.losses||0; const alive=alivePeople().length;
  const extra=`<div class="ending-record"><span>สมาชิกที่รอด <b>${alive}/5</b></span><span>การสูญเสีย <b>${deaths} คน</b></span><span>วันที่ <b>${gameState.day}</b></span></div>`;
  const endingArt=endState==='win'?'evacuation-city.png':'combat-loss.png';
  main.innerHTML=`<div class="view-content"><section class="panel empty-state end-state" style="background-image:linear-gradient(180deg,#07131dcc,#07131cf2),url('assets/events/${endingArt}');background-size:cover;background-position:center"><div class="end-icon">${endState==='win'?'★':'!'}</div><h1>${title}</h1><p>${desc}</p>${extra}<p>อาหาร ${formatCount(gameState.food)} · น้ำ ${formatCount(gameState.water)}</p><button class="primary" onclick="resetGame()">เริ่มเกมใหม่</button></section></div>`;
};
showStartScreen();

// Keep navigation clickable after the layered render overrides above.
// Delegation also survives title-screen transitions and any shell re-render.
document.addEventListener('click', (event) => {
  const button = event.target.closest('.nav-item');
  if (!button || !button.dataset.view || button.disabled) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (typeof window.render === 'function') window.render(button.dataset.view);
}, true);

// Final preparation shop polish: clear totals, item effects, readiness check,
// and a review screen before the player commits the starting loadout.
function prepItemImpact(key){
  const impacts={
    food:'เพิ่มอาหาร 1 หน่วย',water:'เพิ่มน้ำ 1 หน่วย',material:'เพิ่มวัสดุ 1 หน่วย',medicine:'เพิ่มยา 1 ชุด',battery:'เพิ่มแบตเตอรี่ 1%',
    heat:'เพิ่มชุดกันร้อน 1 ชุด',cold:'เพิ่มชุดกันหนาว 1 ชุด',radio:'เพิ่มวิทยุ 1 เครื่อง',pistol:'เพิ่มปืนสั้น 1 กระบอก +กระสุน 1 นัด',
    rifle:'เพิ่มปืนยาว 1 กระบอก +กระสุน 1 นัด',sniper:'เพิ่มปืนสไนเปอร์ 1 กระบอก +กระสุน 1 นัด',machineGun:'เพิ่มปืนกลหนัก 1 กระบอก +กระสุน 1 นัด',
    shotgun:'เพิ่มปืนลูกซอง 1 กระบอก +กระสุน 1 นัด',melee:'เพิ่มอาวุธประชิด 1 ชิ้น',ammo:'เพิ่มกระสุนปืนทุกชนิดอย่างละ 1 นัด',
    frag:'เพิ่มระเบิดมือ 1 ลูก',smoke:'เพิ่มระเบิดควัน 1 ลูก',flash:'เพิ่มระเบิดแสง 1 ลูก',armor:'เพิ่มเกราะเบา 1 ตัว',heavyArmor:'เพิ่มเกราะหนัก 1 ตัว',
    storageRoom:'เพิ่มระดับคลังเก็บของถาวร',productionRoom:'เพิ่มระดับห้องผลิตถาวร',medicalRoom:'เพิ่มระดับห้องพยาบาลถาวร',generatorRoom:'เพิ่มระดับห้องเครื่องถาวร'
  };
  return impacts[key]||'อุปกรณ์สำหรับการเอาตัวรอด';
}
function addRecommendedItem(key,target){const current=shoppingCart[key]||0;const need=Math.max(0,target-current);if(!need)return;const item=shopItems[key];const cost=item.cost*need;if(gameState.budget<cost){notify('งบไม่พอสำหรับคำแนะนำนี้');return}gameState.budget-=cost;shoppingCart[key]=current+need;render('prep');notify(`เพิ่ม${item.name.replace(/ x1$/,'')} ${need} หน่วยแล้ว`)}
function prepReadiness(){
  const cart=shoppingCart||{};
  const total=Object.values(cart).reduce((sum,n)=>sum+n,0);
  const profile=difficultyProfile(),residents=Math.max(1,alivePeople().length),foodNeed=Math.ceil(residents*12*profile.foodUse),waterNeed=Math.ceil(residents*8*profile.waterUse);
  const hasFood=(cart.food||0)>=foodNeed,hasWater=(cart.water||0)>=waterNeed;
  const missing=[]; if(!hasFood)missing.push(`อาหารอย่างน้อย ${foodNeed} หน่วย`); if(!hasWater)missing.push(`น้ำอย่างน้อย ${waterNeed} หน่วย`);
  return {total,missing,ready:true};
}
function reviewPrep(){
  const state=prepReadiness();
  const rows=Object.entries(shoppingCart).filter(([,n])=>n>0).map(([key,count])=>`<div class="prep-review-row"><span>${shopIcon(key,shopItems[key].icon)}</span><div><b>${shopItems[key].name}</b><small>${prepItemImpact(key)}</small></div><strong>x${count}</strong></div>`).join('');
  const warning=state.missing.length?`<div class="prep-review-warning"><b>คำแนะนำก่อนเริ่ม · ไม่บังคับ</b><span>ถ้าเตรียม ${state.missing.join(' และ ')} จะช่วยให้ครอบครัวผ่านวันแรกได้ปลอดภัยขึ้น</span></div>`:'';
  main.insertAdjacentHTML('beforeend',`<div class="prep-review-backdrop"><section class="panel prep-review"><span class="tag">ตรวจสอบก่อนเริ่มเกม</span><h2>สรุปเสบียงและอุปกรณ์</h2><p class="muted">ของทั้งหมดจะถูกส่งเข้าคลังและอยู่กับคุณจนจบเกม</p><div class="prep-review-list">${rows}</div>${warning}<div class="prep-review-total"><span>ใช้เงิน ${difficultyProfile().budget-gameState.budget} เครดิต</span><b>เหลือ ${gameState.budget} เครดิต</b></div><div class="prep-review-actions"><button class="secondary" onclick="this.closest('.prep-review-backdrop').remove()">กลับไปแก้ไข</button><button class="primary" onclick="confirmPrep()" ${state.ready?'':'disabled'}>ยืนยันและเข้าหลุมหลบภัย ▶</button></div></section></div>`);
}
function confirmPrep(){
  document.querySelector('.prep-review-backdrop')?.remove();
  enterShelter();
}
const prepBaseFinal=prep;
prep=function(){
  let html=prepBaseFinal();
  const state=prepReadiness();
  const totalCost=difficultyProfile().budget-gameState.budget;
  const cartSummary=state.total?`เลือกแล้ว ${state.total} ชิ้น · ใช้เงิน ${totalCost} เครดิต`:'ยังไม่ได้เลือกของ';
  html=html.replace('<div class="prep-tip">',`<div class="prep-total"><span>🧾 ${cartSummary}</span><b>เหลือ ${gameState.budget} เครดิต</b></div><div class="prep-tip">`);
  html=html.replace('onclick="enterShelter()"','onclick="reviewPrep()"').replace('เข้าหลุมหลบภัย ▶','ตรวจสอบและเข้าหลุมหลบภัย ▶');
  return html;
};
const enterShelterBaseFinal=enterShelter;
enterShelter=function(){
  const state=prepReadiness();
  const purchased=Object.entries(shoppingCart).filter(([,count])=>count>0).map(([key,count])=>`${shopItems[key].name.replace(/ x1$/,'')} x${count}`);
  eventHistory.push({day:gameState.day,place:'ร้านค้าก่อนเริ่มเกม',text:`เตรียมของเข้าหลุมหลบภัย: ${purchased.join(' · ')}`});
  enterShelterBaseFinal();
};
window.enterShelter=enterShelter;window.reviewPrep=reviewPrep;window.confirmPrep=confirmPrep;

// Storage capacity is shared by the prep cart and the permanent bunker stockpile.
const prepItemWeight={backpack:0,food:1,water:1,material:1,medicine:1,battery:1,heat:2,cold:2,radio:1,pistol:2,rifle:3,sniper:4,machineGun:6,shotgun:4,melee:2,ammo:1,frag:1,smoke:1,flash:1,armor:4,heavyArmor:7,storageRoom:0,productionRoom:0,medicalRoom:0,generatorRoom:0};
function storageCapacityForCart(){return 160+((gameState.facilities?.storage||0)+(shoppingCart.storageRoom||0))*60}
function storageLoadForCart(cart=shoppingCart){return Object.entries(cart||{}).reduce((sum,[key,count])=>sum+(prepItemWeight[key]||0)*count,0)}
function storageLoad(){return storageLoadForCart({food:Math.ceil((gameState.food||0)/10),water:Math.ceil((gameState.water||0)/10),material:Math.ceil((gameState.materials||0)/10),medicine:gameState.medicine||0,battery:Math.ceil((gameState.battery||0)/10),heat:gameState.heatSuit||0,cold:gameState.coldSuit||0,radio:gameState.tools||0,pistol:gameState.weapons?.pistol||0,rifle:gameState.weapons?.rifle||0,sniper:gameState.weapons?.sniper||0,machineGun:gameState.weapons?.machineGun||0,shotgun:gameState.weapons?.shotgun||0,melee:gameState.weapons?.melee||0,ammo:Math.ceil(Object.values(gameState.ammo||{}).reduce((a,n)=>a+n,0)/5),frag:gameState.grenades?.frag||0,smoke:gameState.grenades?.smoke||0,flash:gameState.grenades?.flash||0,armor:gameState.armor?.light||0,heavyArmor:gameState.armor?.heavy||0})}
const buyItemWithCapacity=buyItem;
buyItem=function(key){
  const item=shopItems[key];if(!item)return;
  const cost=Math.max(10,Math.round(item.cost/10)*10);
  if(gameState.budget<cost){notify(`งบไม่พอ · ต้องใช้ ${cost} เครดิต`);return}
  const projected=storageLoadForCart()+((prepItemWeight[key]||0));
  if(projected>storageCapacityForCart()){notify(`คลังเต็ม · ใช้ ${storageLoadForCart()}/${storageCapacityForCart()} หน่วย · ซื้อหรืออัปเกรดคลังเพิ่ม`);return}
  buyItemWithCapacity(key);
};
window.buyItem=buyItem;
const prepWithCapacity=prep;
prep=function(){
  let html=prepWithCapacity();
  const load=storageLoadForCart(),cap=storageCapacityForCart();
  html=html.replace('</div><div class="prep-tip">',`</div><div class="prep-capacity"><span>📦 ความจุคลังเตรียมเข้า</span><b>${load}/${cap} หน่วย</b><small>${load>=cap?'คลังเต็มแล้ว · อัปเกรดคลังเพื่อเพิ่มพื้นที่':'พื้นที่เหลือ '+(cap-load)+' หน่วย'}</small></div><div class="prep-tip">`);
  return html;
};
function facilityDamageKey(key){return key==='engine'?'engine':key}
function repairFacility(key){const damageKey=facilityDamageKey(key),current=facilityCondition(damageKey);if(current>=100){notify('ห้องนี้ยังไม่ต้องซ่อม');return}if((gameState.materials||0)<10){notify('วัสดุซ่อมแซมไม่พอ');return}gameState.materials-=10;gameState.facilityDamage[damageKey]=Math.min(100,current+25);persistGame();updateResourceBar();showRoom(key);notify(`ซ่อมห้อง${roomDetails[key]?.title||''} แล้ว · สภาพห้อง ${gameState.facilityDamage[damageKey]}%`)}
function damageFacility(key,amount=10){const damageKey=facilityDamageKey(key);gameState.facilityDamage[damageKey]=Math.max(0,facilityCondition(damageKey)-amount)}
const advanceWithFacilityWear=window.advanceTime;
window.advanceTime=function(){advanceWithFacilityWear();if(endState)return;const extreme=gameState.temperature<0||gameState.temperature>40;if(extreme&&Math.random()<0.22){const key=['storage','production','medical','engine'][Math.floor(Math.random()*4)];damageFacility(key,5+Math.floor(Math.random()*11));eventHistory.push({day:gameState.day,place:'หลุมหลบภัย',text:`${roomDetails[key==='engine'?'engine':key]?.title||'ห้อง'} เสื่อมสภาพจากสภาพอากาศ · ควรซ่อมด้วยวัสดุ`});persistGame();notify('สภาพอากาศทำให้ห้องบางส่วนเสื่อมสภาพ · ตรวจสอบห้องต่าง ๆ') }};
function roomLevel(key){return key==='storage'?(gameState.facilities?.storage||0):key==='engine'?(gameState.facilities?.generator||0):key==='medical'?(gameState.facilities?.medical||0):key==='production'?(gameState.facilities?.production||0):0}
const showRoomBaseFinal=showRoom;
showRoom=function(key){
  showRoomBaseFinal(key);
  const level=roomLevel(key),stats=document.querySelector('.room-detail-stats');
  if(!stats)return;
  const detail=key==='storage'?`ระดับ ${level}/3 · คลัง ${storageLoad()}/${160+level*60} หน่วย · ถัดไป +60 หน่วย` : key==='engine'?`ระดับ ${level}/3 · พลังงาน ${gameState.energy}% · ถัดไปเพิ่มพลังงานเริ่มต้น 10%`:key==='medical'?`ระดับ ${level}/3 · ยา ${gameState.medicine} ชุด · ถัดไปลดเวลารักษา`:key==='production'?`ระดับ ${level}/3 · ผลผลิต ${Math.round(productionMultiplier(level)*100)}% · ถัดไป +25%`:`ระดับฐาน ${Math.max(1,level)}`;
  const damageKey=facilityDamageKey(key),condition=facilityCondition(damageKey);stats.insertAdjacentHTML('beforeend',`<span>สถานะห้อง <b>${detail}</b></span><span>สภาพห้อง <b>${condition}%</b></span>`);if(['storage','engine','medical','production'].includes(key)&&condition<100)stats.insertAdjacentHTML('afterend',`<button class="secondary" onclick="repairFacility('${key}')">🔧 ซ่อมห้อง · ใช้วัสดุ 10</button>`);
};
window.showRoom=showRoom;

// Holding the shop or cart plus button repeats the same one-unit purchase safely.
let buyHoldTimer=null;
document.addEventListener('pointerdown',event=>{const button=event.target.closest('.shop-item button[onclick*="buyItem"],.cart-plus');if(!button||button.disabled)return;buyHoldTimer=setTimeout(()=>{buyHoldTimer=setInterval(()=>{if(button.disabled){clearInterval(buyHoldTimer);buyHoldTimer=null;return}button.click()},180)},450)},true);
document.addEventListener('pointerup',()=>{if(buyHoldTimer){clearTimeout(buyHoldTimer);clearInterval(buyHoldTimer);buyHoldTimer=null}},true);





// Reward chips keep mission results readable at a glance.
function rewardChip(text){const t=String(text);const key=/อาหาร/.test(t)?'food':/น้ำ/.test(t)?'water':/แบตเตอรี่/.test(t)?'battery':/วัสดุ|อะไหล่|ชิ้นส่วน/.test(t)?'material':/เวชภัณฑ์/.test(t)?'medicine':/กระสุน/.test(t)?'ammo':'radio';return `<span class="reward-chip"><span>${shopIcon(key,'📦')}</span><b>${t}</b></span>`}
const missionResultWithRewardChips=missionResultView;
missionResultView=function(){let html=missionResultWithRewardChips();const r=window.lastMissionResult;if(r?.rewards?.length){const chips=r.rewards.filter(x=>!String(x).includes('ถูกทิ้ง')).map(rewardChip).join('');html=html.replace('<div class="result-stats">',`<div class="reward-chips"><small>ของที่นำกลับมา</small><div>${chips}</div></div><div class="result-stats">`)}return html}

function buyItemCount(key,value){const item=shopItems[key];let qty=Math.max(1,Math.floor(Number(value)||1));if(!item)return;let bought=0;for(let i=0;i<qty;i++){const cost=itemCost(key,shoppingCart[key]||0);if(upgradeItemKeys.has(key)&&ownedItemCount(key)+(shoppingCart[key]||0)>=3)break;if(gameState.budget<cost)break;const projected=storageLoadForCart()+((prepItemWeight[key]||0));if(projected>storageCapacityForCart())break;gameState.budget-=cost;shoppingCart[key]=(shoppingCart[key]||0)+1;bought++}if(!bought){notify('งบหรือพื้นที่คลังไม่พอสำหรับจำนวนที่กรอก');return}render('prep');notify(`ซื้อ${item.name.replace(/ x1$/,'')} ${bought} หน่วยแล้ว${bought<qty?' · ซื้อได้เท่านี้ตามงบหรือพื้นที่คลัง':''}`)}
function setCartQuantity(key,value){const item=shopItems[key];if(!item)return;const next=Math.max(0,Math.floor(Number(value)||0)),current=shoppingCart[key]||0;if(next===current)return; if(next>current){const add=next-current;const totalCost=Array.from({length:add},(_,i)=>itemCost(key,current+i)).reduce((a,n)=>a+n,0);const affordable=gameState.budget>=totalCost?add:0;const room=Math.floor((storageCapacityForCart()-storageLoadForCart())/(prepItemWeight[key]||0));const levelRoom=upgradeItemKeys.has(key)?Math.max(0,3-ownedItemCount(key)-current):add;const actual=Math.min(add,affordable,room,levelRoom);if(!actual){notify('งบหรือพื้นที่คลังไม่พอ');render('prep');return}shoppingCart[key]=current+actual;gameState.budget-=Array.from({length:actual},(_,i)=>itemCost(key,current+i)).reduce((a,n)=>a+n,0);notify(actual<add?'เพิ่มได้เท่านี้ตามงบหรือพื้นที่คลัง':'ปรับจำนวนแล้ว')}else{shoppingCart[key]=next;gameState.budget+=Array.from({length:current-next},(_,i)=>itemCost(key,next+i)).reduce((a,n)=>a+n,0);if(!next)delete shoppingCart[key];notify('ปรับจำนวนแล้ว')}render('prep')}
function exportSave(){try{persistGame();const raw=localStorage.getItem('last-light-save');const blob=new Blob([raw||'{}'],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`survival-mmo-save-day-${gameState.day}.json`;a.click();URL.revokeObjectURL(a.href);notify('ส่งออกเซฟเกมแล้ว')}catch(e){notify('ส่งออกเซฟไม่สำเร็จ')}}
function importSave(event){const file=event.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const save=JSON.parse(reader.result);if(!save.gameState)throw Error('invalid');localStorage.setItem('last-light-save',JSON.stringify(save));notify('นำเข้าเซฟแล้ว กำลังโหลดเกม');setTimeout(()=>location.reload(),500)}catch(e){notify('ไฟล์เซฟไม่ถูกต้อง')}};reader.readAsText(file)}
function filterInventoryItems(query='',category='all'){const q=query.trim().toLowerCase();document.querySelectorAll('.inventory-real-card').forEach(card=>{const text=card.textContent.toLowerCase();const cat=card.querySelector('small')?.textContent||'';card.style.display=(!q||text.includes(q))&&(category==='all'||cat===category)?'':'none'})}
const inventoryViewWithFilter=inventoryView;
inventoryView=function(){let html=inventoryViewWithFilter();html=html.replace('<span class="tag">อัปเดตตามสถานะจริง</span>',`<div class="inventory-tools"><input placeholder="ค้นหาไอเท็ม..." oninput="filterInventoryItems(this.value,document.querySelector('.inventory-filter')?.value)"><select class="inventory-filter" onchange="filterInventoryItems(document.querySelector('.inventory-tools input')?.value,this.value)"><option value="all">ทุกประเภท</option><option>เสบียง</option><option>วัสดุ</option><option>อาวุธ</option><option>ป้องกัน</option><option>พลังงาน</option></select></div>`);return html}





// Expedition supply controls: players choose exact quantities and risk-only duration.
expeditionPlan.supplyFood=expeditionPlan.supplyFood||0;expeditionPlan.supplyWater=expeditionPlan.supplyWater||0;expeditionPlan.medicalCount=expeditionPlan.medicalCount||0;expeditionPlan.scannerCount=expeditionPlan.scannerCount||0;
function setExpeditionRisk(risk){expeditionPlan.risk=risk;expeditionPlan.days=risk==='ต่ำ'?1:risk==='กลาง'?3:7;persistGame();render('expedition')}
function setExpeditionSupply(key,value){const max=key==='food'?gameState.food:key==='water'?gameState.water:key==='medicine'?gameState.medicine:gameState.battery;const v=Math.max(0,Math.min(max,Math.floor(Number(value)||0)));if(key==='food')expeditionPlan.supplyFood=v;if(key==='water')expeditionPlan.supplyWater=v;if(key==='medicine')expeditionPlan.medicalCount=v;if(key==='scanner')expeditionPlan.scannerCount=v;persistGame();render('expedition')}
function setExpeditionAmmo(value){const ammoType=weaponCatalog[normalizeCombatGear(expeditionPlan.gear).weapon]?.ammo,max=ammoType?gameState.ammo?.[ammoType]||0:0;expeditionPlan.ammoCount=Math.max(0,Math.min(max,Math.floor(Number(value)||0)));persistGame();render('expedition')}
function setExpeditionPreset(kind){const preset=kind==='one'?{risk:'ต่ำ',food:30,water:20,medicine:0,scanner:0}:kind==='three'?{risk:'กลาง',food:90,water:60,medicine:1,scanner:1}:{risk:'ต่ำ',food:0,water:0,medicine:0,scanner:0};expeditionPlan.risk=preset.risk;expeditionPlan.days=preset.risk==='ต่ำ'?1:3;expeditionPlan.supplyFood=Math.min(gameState.food,preset.food);expeditionPlan.supplyWater=Math.min(gameState.water,preset.water);expeditionPlan.medicalCount=Math.min(gameState.medicine,preset.medicine);expeditionPlan.scannerCount=Math.min(Math.floor((gameState.battery||0)/8),preset.scanner);persistGame();render('expedition')}
const expeditionWeightBase=expeditionWeight;
function expeditionAmmoCarry(){const c=combatLoadout(),weapon=c.weapon;if(!weapon?.ammo)return 0;const count=expeditionPlan._suppliesReserved?Math.max(0,Math.floor(expeditionPlan.ammoCount||0)):Math.min(gameState.ammo?.[weapon.ammo]||0,Math.max(0,Math.floor(expeditionPlan.ammoCount||0)));return count*0.2}
function expeditionWeightBreakdown(){const c=combatLoadout(),ammo=expeditionAmmoCarry(),suits=(expeditionPlan.useHeatSuit?3:0)+(expeditionPlan.useColdSuit?3:0);return `อาหาร ${expeditionPlan.supplyFood||0} · น้ำ ${expeditionPlan.supplyWater||0} · อุปกรณ์ ${(expeditionPlan.medicalCount||0)*2+(expeditionPlan.scannerCount||0)} · ปืน ${c.weapon.weight} · กระสุน ${ammo.toFixed(1)} · เกราะ ${c.armor.weight} · ระเบิด ${c.grenade.weight} · ชุด ${suits}`}
expeditionWeight=function(){const c=combatLoadout();return 2+(expeditionPlan.supplyFood||0)+(expeditionPlan.supplyWater||0)+(expeditionPlan.medicalCount||0)*2+(expeditionPlan.scannerCount||0)+(expeditionPlan.useHeatSuit?3:0)+(expeditionPlan.useColdSuit?3:0)+c.weapon.weight+c.armor.weight+c.grenade.weight+expeditionAmmoCarry()}
const launchLongExpeditionBase=launchLongExpedition;
launchLongExpedition=function(){const risk=expeditionPlan.risk||'ต่ำ';const ranges={ต่ำ:[1,3],กลาง:[3,7],สูง:[7,10]},range=ranges[risk]||ranges.ต่ำ;expeditionPlan.days=range[0]+Math.floor(Math.random()*(range[1]-range[0]+1));expeditionPlan.gear.rations=(expeditionPlan.supplyFood||0)>0||(expeditionPlan.supplyWater||0)>0;expeditionPlan.gear.medical=(expeditionPlan.medicalCount||0)>0;expeditionPlan.gear.scanner=(expeditionPlan.scannerCount||0)>0;launchLongExpeditionBase()}
expedition=function(){var roster=availablePeople(),gear=normalizeCombatGear(expeditionPlan.gear),weight=expeditionWeight(),capacity=expeditionCapacity(),risk=expeditionPlan.risk||'ต่ำ';var plans=[['ต่ำ','1–3 วัน','กลับเร็ว'],['กลาง','3–7 วัน','ของดีขึ้น'],['สูง','7–10 วัน','ของรางวัลมาก']];var warning=((expeditionPlan.supplyFood||0)<30||(expeditionPlan.supplyWater||0)<20||(!expeditionPlan.useHeatSuit&&!expeditionPlan.useColdSuit))?'⚠ เสบียงหรือชุดป้องกันไม่ครบ: ออกสำรวจได้ แต่มีโอกาสบาดเจ็บหนักหรือเสียชีวิตสูงขึ้น':'';return '<div class="view-content expedition-plan"><div class="view-title"><div><h1>จัดทีมออกสำรวจ</h1><p>เลือกคนและกรอกเสบียงที่จะนำไปเอง</p></div><span class="tag">สมาชิกพร้อม '+roster.length+' คน</span></div><div class="expedition-plan-grid"><section class="panel plan-roster"><h2>สมาชิกที่พร้อม ('+selectedMembers.length+'/2)</h2>'+roster.map(function(x){var p=x.p,i=x.i;return '<article class="roster-pick '+(selectedMembers.includes(i)?'picked':'')+'">'+avatar(p)+'<div class="roster-person"><b>'+p.name+'</b><small>'+p.role+' · สุขภาพ '+p.health+'%</small></div><button class="secondary" onclick="toggleMember('+i+')">'+(selectedMembers.includes(i)?'ถอดออก':'เลือก')+'</button></article>'}).join('')+'</section><section class="panel plan-options"><h2>ความเสี่ยง</h2><div class="duration-options">'+plans.map(function(x){return '<button class="duration-option '+(risk===x[0]?'selected':'')+'" onclick="setExpeditionRisk(\''+x[0]+'\')"><b>ความเสี่ยง '+x[0]+'</b><span>ใช้เวลาประมาณ '+x[1]+'</span><small>'+x[2]+'</small></button>'}).join('')+'</div><div class="expedition-presets"><b>เตรียมเสบียงเร็ว</b><button class="secondary" onclick="setExpeditionPreset(\'one\')">1 วัน</button><button class="secondary" onclick="setExpeditionPreset(\'three\')">3 วัน</button><button class="secondary" onclick="setExpeditionPreset(\'save\')">ประหยัด</button></div><div class="plan-gear"><h3>เสบียงและอุปกรณ์</h3><label class="supply-input">อาหาร <input type="number" min="0" max="'+gameState.food+'" value="'+(expeditionPlan.supplyFood||0)+'" onchange="setExpeditionSupply(\'food\',this.value)"><small>มี '+gameState.food+' หน่วย · น้ำหนัก '+(expeditionPlan.supplyFood||0)+' กก.</small></label><label class="supply-input">น้ำ <input type="number" min="0" max="'+gameState.water+'" value="'+(expeditionPlan.supplyWater||0)+'" onchange="setExpeditionSupply(\'water\',this.value)"><small>มี '+gameState.water+' หน่วย · น้ำหนัก '+(expeditionPlan.supplyWater||0)+' กก.</small></label><label class="supply-input">ชุดปฐมพยาบาล <input type="number" min="0" max="'+gameState.medicine+'" value="'+(expeditionPlan.medicalCount||0)+'" onchange="setExpeditionSupply(\'medicine\',this.value)"><small>มี '+gameState.medicine+' ชุด · 2 กก./ชุด</small></label><label class="supply-input">เครื่องสแกน <input type="number" min="0" max="'+Math.floor((gameState.battery||0)/8)+'" value="'+(expeditionPlan.scannerCount||0)+'" onchange="setExpeditionSupply(\'scanner\',this.value)"><small>ใช้แบตเตอรี่ 8% ต่อเครื่อง · 1 กก./เครื่อง</small></label><h3>ชุดป้องกัน</h3><button class="gear-toggle '+(expeditionPlan.useHeatSuit?'on':'')+'" onclick="toggleExpeditionSuit(\'heat\')"><b>ชุดกันร้อน</b><small>มี '+gameState.heatSuit+' ชุด · '+gameState.heatDurability+'% · 3 กก.</small><strong>'+(expeditionPlan.useHeatSuit?'ใช้':'ไม่ใช้')+'</strong></button><button class="gear-toggle '+(expeditionPlan.useColdSuit?'on':'')+'" onclick="toggleExpeditionSuit(\'cold\')"><b>ชุดกันหนาว</b><small>มี '+gameState.coldSuit+' ชุด · '+gameState.coldDurability+'% · 3 กก.</small><strong>'+(expeditionPlan.useColdSuit?'ใช้':'ไม่ใช้')+'</strong></button></div>'+(warning?'<div class="expedition-warning">'+warning+'</div>':'')+combatControls(gear)+'<div class="pack-loadout"><b>กระเป๋าระดับ '+(gameState.backpackLevel||0)+'/3 · น้ำหนักสัมภาระ '+weight+'/'+capacity+' กก.</b><span>โบนัสทีม +'+teamSynergy(selectedMembers)+' คะแนน · สมาชิกช่วย +'+expeditionCarryBonus()+' กก. · '+expeditionWeightBreakdown()+' · '+(weight>capacity?'เกินขีดจำกัด':(weight/capacity>=.8?'แบกหนัก · เหนื่อยเพิ่ม':'พื้นที่เหลือ '+(capacity-weight)+' กก.'))+(gameState.backpackLevel?' · ความเหนื่อยทีม -'+((gameState.backpackLevel>=2?(gameState.backpackLevel-1)*4:0))+'%':'')+'</span></div><button class="primary" onclick="launchLongExpedition()" '+(weight>capacity?'disabled':'')+'>ส่งทีมออกสำรวจ ▶</button></section></div></div>'};
