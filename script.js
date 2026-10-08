document.addEventListener('DOMContentLoaded',()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
// menú móvil
const bg=$('.burger'),ul=$('.nav ul');
bg&&bg.addEventListener('click',()=>{const o=ul.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
// carrusel del banner
const hero=$('.hero');
if(hero){const tr=$('.slides',hero),n=tr.children.length,dots=$('.dots',hero);let i=0,t;
 for(let k=0;k<n;k++){const b=document.createElement('button');b.setAttribute('aria-label','Ir al banner '+(k+1));b.onclick=()=>go(k,1);dots.append(b)}
 function go(k,reset){i=(k+n)%n;tr.style.transform=`translateX(-${i*100}%)`;$$('button',dots).forEach((b,j)=>b.classList.toggle('on',j===i));if(reset)auto()}
 function auto(){clearInterval(t);t=setInterval(()=>go(i+1),5500)}
 $('.arr.l',hero).onclick=()=>go(i-1,1);$('.arr.r',hero).onclick=()=>go(i+1,1);
 let x0=null;hero.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
 hero.addEventListener('touchend',e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(i+(d<0?1:-1),1);x0=null});
 go(0);auto()}
// carrusel de miniaturas
const tt=$('.tt');
if(tt){let p=0;const per=()=>innerWidth<700?2:5,max=()=>Math.max(0,tt.children.length-per());
 const mv=d=>{p=Math.min(max(),Math.max(0,p+d));tt.style.transform=`translateX(-${p*100/per()}%)`};
 $('.thumbs .pv').onclick=()=>mv(-1);$('.thumbs .nx').onclick=()=>mv(1);addEventListener('resize',()=>mv(0))}
// pestañas de galería
$$('.tabs button').forEach((b,k)=>b.addEventListener('click',()=>{
 $$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));$$('.gal').forEach((g,j)=>g.classList.toggle('on',j===k))}));
// preguntas frecuentes: una abierta a la vez
$$('.faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.faq details').forEach(o=>o!==d&&(o.open=false))}));
// formulario de contacto
const f=$('#cform');
f&&f.addEventListener('submit',e=>{e.preventDefault();const v=n=>f.elements[n].value.trim(),er=$('.err',f);
 if(!v('nombre')||!/^\S+@\S+\.\S+$/.test(v('correo'))||!v('mensaje')){er.textContent='Completa nombre, un correo válido y tu mensaje.';return}
 if(!f.elements.acepto.checked){er.textContent='Debes aceptar la Política de Privacidad.';return}
 er.textContent='';const body=`Nombre: ${v('nombre')}\nCorreo: ${v('correo')}\n\n${v('mensaje')}`;
 location.href=`mailto:contacto@greenlens.com?subject=${encodeURIComponent('Consulta desde la web - '+v('nombre'))}&body=${encodeURIComponent(body)}`;
 er.style.color='#27533f';er.textContent='¡Gracias! Se abrirá tu aplicación de correo para enviar el mensaje.';f.reset()});
});
