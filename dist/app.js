const projects={rag:{repository:'https://github.com/gvemuru1/animated-octo-disco',category:'AI ENGINEERING / PERSONAL PROJECT',title:'Production RAG & Agentic Retrieval',description:'Grounded answers from documents, powered by hybrid retrieval.',points:['Document ingestion, recursive chunking, embeddings, and persistent vector storage.','ChromaDB and PostgreSQL/pgvector retrieval paths, combining semantic search and BM25 with Reciprocal Rank Fusion.','LangGraph and FastAPI coordinate multi-step retrieval and generation.','Metadata filtering, similarity scoring, and source attribution help make answers easier to evaluate and debug.'],tags:['Python','LangChain','LangGraph','FastAPI','ChromaDB','pgvector']},doodle:{repository:'https://github.com/gvemuru1/quickdraw-dataset',category:'AI / ML / PERSONAL PROJECT',title:'Doodle Recognition Web App',description:'An interactive drawing canvas connected to a trained neural network.',points:['Trained a seven-layer convolutional neural network on more than 414,000 vector images.','Converted the model to TensorFlow Lite.','Integrated model processing with a FastAPI backend and an interactive browser canvas.','The gallery sketch illustrates the project; it is not a live model prediction.'],tags:['Python','TensorFlow / Keras','TensorFlow Lite','FastAPI','Canvas']}};
const dialog=document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const p=projects[button.dataset.project];document.querySelector('#dialog-category').textContent=p.category;document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-description').textContent=p.description;document.querySelector('#dialog-points').replaceChildren(...p.points.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));document.querySelector('#dialog-tags').replaceChildren(...p.tags.map(t=>{const span=document.createElement('span');span.textContent=t;return span}));document.querySelector('#dialog-repository').href=p.repository;dialog.showModal()}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
document.querySelector('#contact-form').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget;const button=form.querySelector('button[type=submit]');const status=document.querySelector('#form-status');button.disabled=true;button.textContent='Sending...';status.textContent='';try{const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});const result=await response.json();if(!response.ok)throw new Error(result.error||'Message could not be sent.');form.reset();status.textContent='Thanks! Your message has been sent.';}catch(error){status.textContent=error.message+' You can also email gurucharanvemuru@gmail.com.';}finally{button.disabled=false;button.textContent='Send message ↗';}});

const navLinks=[...document.querySelectorAll('nav a')];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>{const active=a.getAttribute('href')==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}})},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));

// Animate only transform and opacity; no scroll-event rendering loop.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.hero-copy, .portrait, .about > div, .section-head, .project, .experience > div, .education > div, .stack > div, .contact-grid > div, .contact form');
const easeIn = 'cubic-bezier(0.42, 0, 1, 1)';
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!motionPreference.matches) entry.target.animate(
        [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 420, easing: easeIn }
      );
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  revealTargets.forEach(target => revealObserver.observe(target));
}
document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open && !motionPreference.matches) detail.querySelector('.experience-content').animate(
    [{ opacity: 0, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 240, easing: easeIn }
  );
}));
motionPreference.addEventListener('change', event => {
  if (event.matches) document.getAnimations().forEach(animation => animation.cancel());
});
