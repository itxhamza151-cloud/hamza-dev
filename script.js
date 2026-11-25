
const menuButton=document.querySelector('.menu-toggle');const navLinks=document.querySelector('.nav-links');if(menuButton&&navLinks){menuButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const revealItems=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});revealItems.forEach(item=>observer.observe(item));}else{revealItems.forEach(item=>item.classList.add('is-visible'));}
const filterButtons=document.querySelectorAll('.filter-btn');const projectCards=document.querySelectorAll('.project-detail-card');const count=document.getElementById('project-count');const empty=document.getElementById('projects-empty');
if(filterButtons.length){filterButtons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;let visible=0;filterButtons.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});projectCards.forEach(card=>{const categories=(card.dataset.category||'').split(' ');const show=filter==='all'||categories.includes(filter);card.hidden=!show;if(show)visible++;});if(count)count.textContent=visible;if(empty)empty.hidden=visible!==0;}));}

const projectInquiryForm=document.getElementById('projectInquiryForm');
if(projectInquiryForm){
  projectInquiryForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!projectInquiryForm.reportValidity()) return;
    const data=new FormData(projectInquiryForm);
    const message=[
      'Assalam-o-Alaikum Hamza! I would like to discuss a project.',
      '',
      'Client Name: '+data.get('clientName'),
      'Email Address: '+data.get('email'),
      'Project Type: '+data.get('projectType'),
      'Project Budget: '+data.get('projectBudget'),
      'Project Details: '+data.get('projectDetails')
    ].join('\n');
    const requests=JSON.parse(localStorage.getItem('hd-admin-messages')||'[]');requests.unshift({id:'msg-'+Date.now(),title:'Project inquiry — '+data.get('clientName'),name:data.get('clientName'),email:data.get('email'),category:data.get('projectType'),value:data.get('projectBudget'),date:new Date().toLocaleString(),description:data.get('projectDetails'),read:false});localStorage.setItem('hd-admin-messages',JSON.stringify(requests));
    const whatsappUrl='https://wa.me/923166301493?text='+encodeURIComponent(message);
    window.open(whatsappUrl,'_blank','noopener,noreferrer');
  });
}


/* Theme switcher: saved locally in this browser */
const themeButton=document.querySelector('.theme-toggle');
const savedTheme=localStorage.getItem('hamza-dev-theme')||'dark';
document.documentElement.dataset.theme=savedTheme;
if(themeButton){const syncThemeButton=()=>{themeButton.textContent=document.documentElement.dataset.theme==='dark'?'☀':'☾';themeButton.setAttribute('aria-label',document.documentElement.dataset.theme==='dark'?'Switch to light mode':'Switch to dark mode');};syncThemeButton();themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('hamza-dev-theme',next);syncThemeButton();});}
/* Animated role typing */
const typedRole=document.querySelector('.typed-role');
if(typedRole){const roles=(typedRole.dataset.roles||'Front-End Developer|Web Designer').split('|');let roleIndex=0,charIndex=roles[0].length,deleting=false;setInterval(()=>{const role=roles[roleIndex];if(!deleting){charIndex++;typedRole.textContent=role.slice(0,charIndex);if(charIndex>=role.length){deleting=true;setTimeout(()=>{},700);}}else{charIndex--;typedRole.textContent=role.slice(0,charIndex);if(charIndex<=0){deleting=false;roleIndex=(roleIndex+1)%roles.length;}}if(!deleting&&charIndex===role.length){deleting=true;}},105);}
/* Reveal page content as it enters the viewport */
const animatedSections=document.querySelectorAll('main section,.service-card,.project-card,.price-card,.faq-list details,.blog-card,.testimonial-card');
animatedSections.forEach((item,index)=>{if(!item.classList.contains('hero'))item.classList.add('reveal');item.style.transitionDelay=(index%4)*70+'ms';});
const allReveal=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window){const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});allReveal.forEach(item=>revealObserver.observe(item));}else{allReveal.forEach(item=>item.classList.add('is-visible'));}


/* Live project search */
const projectSearch=document.getElementById('project-search');
if(projectSearch){projectSearch.addEventListener('input',()=>{const term=projectSearch.value.trim().toLowerCase();let visible=0;document.querySelectorAll('.project-detail-card').forEach(card=>{const match=(card.textContent+' '+(card.dataset.category||'')).toLowerCase().includes(term);card.hidden=!match;if(match)visible++;});if(count)count.textContent=visible;if(empty)empty.hidden=visible!==0;});}

/* Site hardening: client-side validation, honeypot, lazy images and safe runtime feedback.
   Client-side checks improve UX only; server-side security requires a backend. */
(()=>{
  'use strict';
  const forms=[...document.querySelectorAll('form')];
  forms.forEach((form,index)=>{
    if(!form.querySelector('[name="website_url"]')){
      const trap=document.createElement('div');trap.setAttribute('aria-hidden','true');
      trap.style.cssText='position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important;';
      trap.innerHTML='<label>Leave this field empty<input type="text" name="website_url" tabindex="-1" autocomplete="off"></label>';
      form.appendChild(trap);
    }
    form.querySelectorAll('input,textarea').forEach(field=>{
      if(field.type==='email')field.setAttribute('autocomplete','email');
      if(field.required)field.setAttribute('aria-required','true');
      if(field.tagName==='TEXTAREA')field.maxLength=field.maxLength>0?Math.min(field.maxLength,5000):5000;
    });
    form.addEventListener('submit',event=>{
      const trap=form.querySelector('[name="website_url"]');
      if(trap&&trap.value.trim()){event.preventDefault();event.stopImmediatePropagation();return;}
      if(!form.checkValidity()){event.preventDefault();form.reportValidity();}
    },true);
  });
  document.querySelectorAll('img').forEach((img,index)=>{
    if(!img.hasAttribute('loading'))img.loading=index<2?'eager':'lazy';
    img.decoding='async';
    if(index===0&&!img.hasAttribute('fetchpriority'))img.fetchPriority='high';
  });
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{
    const rel=(a.getAttribute('rel')||'').split(/\s+/).filter(Boolean);
    ['noopener','noreferrer'].forEach(x=>{if(!rel.includes(x))rel.push(x)});
    a.setAttribute('rel',rel.join(' '));
  });
  let toast;
  function showError(){
    if(!toast){
      toast=document.createElement('div');toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');
      toast.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:9999;max-width:90vw;padding:10px 16px;border:1px solid #d99b45;border-radius:9px;background:#17243a;color:#fff;font:12px sans-serif;box-shadow:0 8px 30px #0005';
      document.body.appendChild(toast);
    }
    toast.textContent='Something went wrong. Please refresh the page or contact us on WhatsApp.';
  }
  window.addEventListener('error',event=>{if(event.target&&event.target!==window)return;showError();});
  window.addEventListener('unhandledrejection',()=>showError());
})();
