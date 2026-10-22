(() => {
  'use strict';
  const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');
  const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');};
  menu.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=nav.classList.contains('open');close();if(open)menu.focus();}});
  window.addEventListener('resize',()=>{if(window.innerWidth>760)close();});
  document.querySelectorAll('[data-equipment]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#equipment').value=link.dataset.equipment;}));
  const output=document.querySelector('#prepared-message'),status=document.querySelector('#form-status');
  document.querySelector('#request-form').addEventListener('submit',event=>{
    event.preventDefault();const value=id=>document.getElementById(id).value.trim();
    output.value=['Olá, AM Refrigeração! Meu nome é '+value('name')+'.','Equipamento: '+value('equipment'),'Minha necessidade: '+value('details')].join('\n');
    document.querySelector('#message-result').hidden=false;status.textContent='Resumo pronto. Você pode revisar e copiar o texto. Nenhuma mensagem foi enviada.';output.focus();
  });
  document.querySelector('#copy-message').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(output.value);status.textContent='Mensagem copiada. O contato será ativado após confirmação do número.';}
    catch{output.focus();output.select();status.textContent='Selecione e copie o texto preparado acima.';}
  });
  if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}}),{threshold:.06});
    document.querySelectorAll('.section h2,.section h3,.section p,.section figure,.footer-top h2').forEach((element,index)=>{if(element.getBoundingClientRect().top>window.innerHeight){element.classList.add('reveal','pending');element.style.setProperty('--delay',(index%3)*60+'ms');observer.observe(element);}});
  }
})();
