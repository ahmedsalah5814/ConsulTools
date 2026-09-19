document.addEventListener("DOMContentLoaded", () => {
  const C=window.QONSUL_CONFIG||{};
  const header=document.querySelector('.site-header');
  const menu=document.querySelector('.menu-toggle');
  const links=document.querySelector('.nav-links');
  if(menu) menu.addEventListener('click',()=>links&&links.classList.toggle('open'));
  window.addEventListener('scroll',()=>{if(header)header.classList.toggle('scrolled',scrollY>30)},{passive:true});

  // Mobile-safe hero videos: autoplay is muted; user can replace the MP4 files.
  document.querySelectorAll('video').forEach(v=>{v.muted=true;v.autoplay=true;v.loop=true;v.playsInline=true;});

  // Reveal animation
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(x=>io.observe(x));

  // Search form
  document.querySelectorAll('[data-search-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault(); const fd=new FormData(form);
    const p=new URLSearchParams(); for(const [k,v] of fd.entries()) if(v)p.set(k,v);
    location.href='flights.html?'+p.toString();
  }));

  document.querySelectorAll('[data-book]').forEach(btn=>btn.addEventListener('click',()=>location.href='booking.html?flight='+encodeURIComponent(btn.dataset.book)));

  // WhatsApp quick actions
  document.querySelectorAll('[data-wa]').forEach(a=>{
    const n=(C.whatsapp||'').replace(/\D/g,'');
    a.href=n?'https://wa.me/'+n:'#';
    a.target='_blank'; a.rel='noopener';
  });
  document.querySelectorAll('[data-facebook]').forEach(a=>a.href=C.facebook||'#');
  document.querySelectorAll('[data-tiktok]').forEach(a=>a.href=C.tiktok||'#');
  document.querySelectorAll('[data-phone]').forEach(e=>e.textContent=C.phoneDisplay||'');
  document.querySelectorAll('[data-email]').forEach(e=>e.textContent=C.email||'');

  // Google Maps: set address once in config.js
  document.querySelectorAll('[data-map]').forEach(frame=>{
    if(C.mapQuery){frame.src='https://www.google.com/maps?q='+encodeURIComponent(C.mapQuery)+'&output=embed';}
  });
  document.querySelectorAll('[data-map-link]').forEach(a=>a.href=C.mapLink||'#');

  // Airplane music button. Browsers may block autoplay with sound until user interaction.
  const audio=document.getElementById('siteMusic'); const musicBtn=document.querySelector('.music-btn');
  if(audio&&musicBtn){
    audio.volume=.22;
    musicBtn.addEventListener('click',async()=>{try{if(audio.paused){await audio.play();musicBtn.classList.add('playing');musicBtn.textContent='⏸';}else{audio.pause();musicBtn.classList.remove('playing');musicBtn.textContent='✈';}}catch(err){alert('ضع ملف الموسيقى في assets/audio/qonsul-theme.mp3 ثم اضغط زر الطائرة.');}});
  }

  // Booking forms -> WhatsApp
  document.querySelectorAll('[data-whatsapp-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault(); const n=(C.whatsapp||'').replace(/\D/g,''); if(!n){alert('أضف رقم واتساب الشركة في assets/js/config.js');return;}
    const lines=['طلب جديد — القنصل للسفر والسياحة','----------------------------'];
    for(const [k,v] of new FormData(form).entries()) if(String(v).trim()) lines.push(k+': '+v);
    lines.push('----------------------------','أرغب في معرفة التوافر والسعر النهائي وتأكيد التفاصيل مع فريق القنصل.');
    window.open('https://wa.me/'+n+'?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener');
  }));
});
