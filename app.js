(function(){
  'use strict';

  /* --- gallery cross-fade slider --- */
  var slider = document.getElementById('slider');
  if (slider){
    var slides = slider.querySelectorAll('img');
    var dotsWrap = document.getElementById('sliderDots');
    var idx = 0, timer = null;
    slides.forEach(function(_, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role','tab');
      b.setAttribute('aria-label','Фото ' + (i+1));
      if (i === 0) b.classList.add('on');
      b.addEventListener('click', function(){ go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    var dots = dotsWrap.querySelectorAll('button');
    function go(n){
      slides[idx].classList.remove('show');
      dots[idx].classList.remove('on');
      idx = n % slides.length;
      slides[idx].classList.add('show');
      dots[idx].classList.add('on');
    }
    function restart(){
      if (timer) clearInterval(timer);
      timer = setInterval(function(){ go(idx + 1); }, 4200);
    }
    restart();
    slider.addEventListener('mouseenter', function(){ if(timer) clearInterval(timer); });
    slider.addEventListener('mouseleave', restart);
  }

  /* --- accordion --- */
  document.querySelectorAll('.acc-head').forEach(function(head){
    head.addEventListener('click', function(){
      var item = head.parentElement;
      var body = item.querySelector('.acc-body');
      var open = item.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
    });
  });

  /* --- scroll reveal --- */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.fade-up').forEach(function(el){
    if (io) io.observe(el); else el.classList.add('in');
  });

  /* --- active nav link --- */
  var navLinks = document.querySelectorAll('#mainNav a');
  var sections = [];
  navLinks.forEach(function(a){
    var s = document.querySelector(a.getAttribute('href'));
    if (s) sections.push({ a: a, s: s });
  });
  function onScroll(){
    var pos = window.scrollY + window.innerHeight * 0.35;
    var current = null;
    sections.forEach(function(p){ if (p.s.offsetTop <= pos) current = p.a; });
    navLinks.forEach(function(a){ a.classList.remove('active'); });
    if (current) current.classList.add('active');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
