/* ============================================================
   PORTFOLIO JAVASCRIPT
   ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* 1. NAVBAR */
const navbar = $('#navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  const sections = $$('section[id]');
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 90) current = sec.id; });
  $$('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* 2. HAMBURGER */
const hamburger = $('#hamburger');
const mobileMenu = $('#mobileMenu');
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
});
$$('.mobile-link').forEach(l => l.addEventListener('click', () => {
  mobileMenu.classList.remove('open'); hamburger.classList.remove('open');
}));

/* 3. TYPED TEXT */
const phrases = ['Data Scientist','AI & Machine Learning','Research & Data Analytics','Business Intelligence'];
let phraseIndex=0, charIndex=0, isDeleting=false;
const typedEl = $('#typedText');
function typeLoop() {
  if (!typedEl) return;
  const cur = phrases[phraseIndex];
  typedEl.textContent = isDeleting ? cur.substring(0,--charIndex) : cur.substring(0,++charIndex);
  let delay = isDeleting ? 55 : 90;
  if (!isDeleting && charIndex === cur.length) { delay=1800; isDeleting=true; }
  else if (isDeleting && charIndex===0) { isDeleting=false; phraseIndex=(phraseIndex+1)%phrases.length; delay=400; }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* 4. PARTICLES */
(function() {
  const c = $('#particles'); if(!c) return;
  for(let i=0;i<35;i++){
    const p=document.createElement('div'); p.className='particle';
    p.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${3+Math.random()*5}s;--delay:${Math.random()*5}s;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px;`;
    c.appendChild(p);
  }
})();

/* 5. AOS */
(function() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){
      const d = e.target.getAttribute('data-aos-delay')||0;
      setTimeout(()=>e.target.classList.add('aos-animate'), Number(d));
      io.unobserve(e.target);
    }});
  }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });
  $$('[data-aos]').forEach(el=>io.observe(el));
})();

/* 6. CERTIFICATIONS GALLERY */
const CERTS = [
  { title:'Business Analyst Professional', org:'Microsoft',desc:'', img:'assets/images/certificate1.jpeg' },
  { title:'Advance Data Analytics',        org:'Strategist Data Analytics',desc:'',img:'assets/images/certificate2.jpeg' },
  { title:'Microsoft Power BI Training',   org:'Strategist Data Analytics',desc:'',img:'assets/images/certificate3.jpeg' },
  { title:'Data Science Methodolodgy ',    org:'IBM ', desc:'', img:'assets/images/certificate4.jpeg' },
  { title:'Financial Analysis and Valuation', org:'Illinois Unversity', desc:'',img:'assets/images/certificate5.jpeg' },
  { title:'Financial Markets',    org:'Yale University',desc:'', img:'assets/images/certificate6.jpeg' },
 
];

let currentPage = 0;
let currentCertIndex = 0;

function colsPerPage() { return window.innerWidth<=580?1:window.innerWidth<=900?3:3; }
function totalPages()  { return Math.ceil(CERTS.length / colsPerPage()); }

function buildDots() {
  const dotsWrap = $('#certDots'); if(!dotsWrap) return;
  dotsWrap.innerHTML='';
  for(let i=0;i<totalPages();i++){
    const dot=document.createElement('button');
    dot.className='cert-dot'+(i===currentPage?' active':'');
    dot.setAttribute('aria-label',`Page ${i+1}`);
    dot.addEventListener('click',()=>goToPage(i));
    dotsWrap.appendChild(dot);
  }
}

function goToPage(page) {
  currentPage = Math.max(0, Math.min(page, totalPages()-1));
  const thumbs = $$('.cert-thumb');
  const cols = colsPerPage();
  const start = currentPage*cols, end=start+cols;
  thumbs.forEach((t,i) => { t.style.display=(i>=start&&i<end)?'':'none'; });
  const prev=$('#certPrev'), next=$('#certNext');
  if(prev) prev.disabled = currentPage===0;
  if(next) next.disabled = currentPage>=totalPages()-1;
  $$('.cert-dot').forEach((d,i)=>d.classList.toggle('active',i===currentPage));
}

(function initGallery(){
  const prev=$('#certPrev'), next=$('#certNext'); if(!prev) return;
  prev.addEventListener('click',()=>goToPage(currentPage-1));
  next.addEventListener('click',()=>goToPage(currentPage+1));
  let t; window.addEventListener('resize',()=>{ clearTimeout(t); t=setTimeout(()=>{ currentPage=0; buildDots(); goToPage(0); },200); });
  buildDots(); goToPage(0);
})();

$$('.cert-thumb').forEach(thumb=>{
  thumb.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openCertModal(Number(thumb.dataset.index)); }
  });
});

/* Cert modal */
function renderCertModal(index) {
  const cert = CERTS[index]; if(!cert) return;
  const wrap = $('#certModalImgWrap');
  if(!wrap) return;
  wrap.innerHTML='';
  const img = new Image();
  img.src=cert.img; img.alt=cert.title; img.className='cert-modal-img-real';
  img.onerror=()=>{ wrap.innerHTML=`<div class="cert-modal-img-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="48" height="48"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg><span>Add: assets/images/cert${index+1}.png</span></div>`; };
  wrap.appendChild(img);
  if($('#certModalTitle')) $('#certModalTitle').textContent=cert.title;
  if($('#certModalOrg'))   $('#certModalOrg').textContent=cert.org;
  if($('#certModalDesc'))  $('#certModalDesc').textContent=cert.desc;
  const pb=$('#certModalPrev'),nb=$('#certModalNext');
  if(pb) pb.disabled=index===0;
  if(nb) nb.disabled=index>=CERTS.length-1;
}

function openCertModal(index) {
  currentCertIndex=index; renderCertModal(index);
  const m=$('#certDetailModal'); if(!m) return;
  m.classList.add('active'); document.body.style.overflow='hidden';
}
function navigateCertModal(dir) {
  const n=currentCertIndex+dir;
  if(n>=0&&n<CERTS.length){ currentCertIndex=n; renderCertModal(n); }
}
function closeCertModal(e) { if(e.target.id==='certDetailModal') closeCertModalBtn(); }
function closeCertModalBtn() {
  const m=$('#certDetailModal'); if(m) m.classList.remove('active');
  document.body.style.overflow='';
}

document.addEventListener('DOMContentLoaded',()=>{
  const pb=$('#certModalPrev'),nb=$('#certModalNext');
  if(pb) pb.addEventListener('click',()=>navigateCertModal(-1));
  if(nb) nb.addEventListener('click',()=>navigateCertModal(1));
});

window.openCertModal=openCertModal;
window.closeCertModal=closeCertModal;
window.closeCertModalBtn=closeCertModalBtn;

/* 7. PROJECT MODALS */
function openModal(id){ const m=document.getElementById(id); if(!m) return; m.classList.add('active'); document.body.style.overflow='hidden'; }
function closeModal(id){ const m=document.getElementById(id); if(!m) return; m.classList.remove('active'); document.body.style.overflow=''; }
function closeModalOutside(e,id){ if(e.target.classList.contains('modal-overlay')) closeModal(id); }
document.addEventListener('keydown',e=>{ if(e.key==='Escape') $$('.modal-overlay.active').forEach(m=>{ m.classList.remove('active'); document.body.style.overflow=''; }); });
window.openModal=openModal; window.closeModal=closeModal; window.closeModalOutside=closeModalOutside;

/* 8. FOOTER YEAR */
const yearEl=$('#year'); if(yearEl) yearEl.textContent=new Date().getFullYear();

/* 9. SMOOTH SCROLL */
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){
  const t=document.querySelector(this.getAttribute('href'));
  if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
}));
