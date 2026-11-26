(() => {
 const wheel=document.getElementById('spin-wheel');
 const button=document.getElementById('spin-button');
 const count=document.getElementById('spin-count');
 const result=document.getElementById('spin-result');
 if(!wheel||!button||!count||!result)return;
 const KEY='hamzaDevDailySpins';
 const rewards=[{label:'7% OFF',code:'HAMZA7',win:true},{label:'5% OFF',code:'HAMZA5',win:true},{label:'2% OFF',code:'HAMZA2',win:true},{label:'Try again',win:false},{label:'5% OFF',code:'HAMZA5',win:true},{label:'Try again',win:false}];
 const today=()=>new Date().toISOString().slice(0,10);
 const load=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&v.date===today()?v:{date:today(),used:0};}catch(e){return{date:today(),used:0};}};
 let state=load(),rotation=0,busy=false;
 const render=()=>{const remaining=Math.max(0,3-state.used);count.textContent=remaining+' spin'+(remaining===1?'':'s')+' remaining today';button.disabled=remaining===0||busy;button.textContent=remaining===0?'Come back tomorrow':'Spin the wheel ↻';};
 render();
 button.addEventListener('click',()=>{
  if(busy||state.used>=3)return;
  busy=true;state.used++;try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}
  const index=Math.floor(Math.random()*rewards.length);
  const reward=rewards[index];
  const target=rotation+(6*360)+(360-index*60);
  rotation=target;wheel.style.transform='rotate('+target+'deg)';
  button.disabled=true;count.textContent='Spinning...';
  result.textContent='The wheel is spinning. Good luck!';
  window.setTimeout(()=>{
   busy=false;
   if(reward.win){result.innerHTML='Congratulations! You won <strong>'+reward.label+'</strong>. Reward code: <strong>'+reward.code+'</strong>. Contact Hamza to confirm it with your package.';}
   else{result.textContent='Not this time! You can try again with your remaining daily spins.';}
   render();
  },4300);
 });
})();