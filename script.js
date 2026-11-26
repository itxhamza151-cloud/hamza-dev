
const menuButton=document.querySelector('.menu-toggle');const navLinks=document.querySelector('.nav-links');if(menuButton&&navLinks){menuButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const revealItems=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});revealItems.forEach(item=>observer.observe(item));}else{revealItems.forEach(item=>item.classList.add('is-visible'));}
const filterButtons=document.querySelectorAll('.filter-btn');const projectCards=document.querySelectorAll('.project-detail-card');const count=document.getElementById('project-count');const empty=document.getElementById('projects-empty');
if(filterButtons.length){filterButtons.forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;let visible=0;filterButtons.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});projectCards.forEach(card=>{const categories=(card.dataset.category||'').split(' ');const show=filter==='all'||categories.includes(filter);card.hidden=!show;if(show)visible++;});if(count)count.textContent=visible;if(empty)empty.hidden=visible!==0;}));}

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

