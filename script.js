(() => {
  'use strict';
  const $ = (s, scope=document) => scope.querySelector(s);
  const $$ = (s, scope=document) => [...scope.querySelectorAll(s)];
  const projectInfo = {
    wires:{title:'Wire Services',number:'01 / 07',eyebrow:'BANK OF MONTREAL · ENTERPRISE WORK · 2022—2026',subtitle:'Making everyday wire-payment workflows more usable without compromising banking reliability.',status:'PROFESSIONAL WORK · PRODUCTION APPLICATION',monogram:'WIRE<br>SERVICES',problem:'Business clients previously had to re-enter beneficiary details for each wire payment. The team introduced reusable beneficiary information across payment workflows and templates.',role:'I implemented Angular/TypeScript beneficiary-management UI features, reusable reactive forms and validation, and integrated the UI with REST API contracts. I also helped troubleshoot integration issues and supported testing and releases.',steps:['Built reusable form components with field-level validation and clear loading and error states.','Used contract-aligned mock JSON services while downstream APIs were not ready.','Switched to real service integrations and debugged payload mismatches with backend and QA teams.'],outcome:'The feature allowed customers to create, modify and reuse beneficiary details in wire payment workflows.',stack:['Angular','TypeScript','RxJS','REST','Reactive Forms','Jasmine / Karma']},
    security:{title:'Security at scale',number:'02 / 07',eyebrow:'BANK OF MONTREAL · CROSS-TEAM INITIATIVE · 2022—2026',subtitle:'Improving secure software delivery across a complex online banking environment.',status:'PROFESSIONAL WORK · CROSS-TEAM REMEDIATION',monogram:'SECURE<br>BY DESIGN',problem:'Multiple applications had a large volume of security findings that needed investigation, prioritization, fixes and validation while normal delivery work continued.',role:'I contributed technical investigation and selected dependency/configuration/code fixes, plus cross-team remediation coordination. During the SSS initiative, I also supported backlog and release planning as an interim Product Owner.',steps:['Investigated Java and web application security findings and dependency compatibility.','Troubleshot Gradle builds and SonarQube / CodeQL / CI quality gates.','Coordinated tracking and validation across development, cybersecurity and operations teams.'],outcome:'The wider initiative tracked over 1,800 vulnerability findings. That number refers to the scope of the program, not findings personally fixed by one person.',stack:['Java','Gradle','SonarQube','CodeQL','CI/CD','Security remediation']},
    olbb:{title:'OLBB Lite',number:'03 / 07',eyebrow:'BANK OF MONTREAL · ENTERPRISE WORK · 2022—2026',subtitle:'A focused online business banking experience for small and medium-sized businesses.',status:'PROFESSIONAL WORK · DIGITAL BANKING',monogram:'BANKING<br>SIMPLIFIED',problem:'Business customers needed streamlined access to common banking functionality without the complexity of the full platform.',role:'I supported Angular and TypeScript features, reusable UI components, state handling with RxJS and NgRx, REST integrations and production release work.',steps:['Structured components around maintainable, reusable UI patterns.','Used reactive state management for data-driven banking screens.','Troubleshot integration defects and supported demonstrations to stakeholders.'],outcome:'Helped deliver a lighter-weight digital banking experience for a business customer segment.',stack:['Angular','TypeScript','RxJS','NgRx','REST APIs','SQL-backed integrations']},
    agent:{title:'AI Banking Operations Agent',number:'04 / 07',eyebrow:'INDEPENDENT AI LAB · 2026',subtitle:'Exploring how an LLM can call structured tools instead of simply generating text.',status:'CODE PROTOTYPE · BUILD / CLOUD TESTING IN PROGRESS',monogram:'TOOLS<br>NOT HYPE',problem:'Banking assistants need controlled, auditable ways to work with account and support data rather than guessing answers or taking unconstrained actions.',role:'I generated and assembled a Java/Spring AI prototype with a separate MCP banking tools service. It uses synthetic data to explore account inquiries, transaction lookup and support-case flows.',steps:['Structure the agent and banking tools as separate Spring services.','Represent tool interactions as typed calls with validation and error handling.','Finish full build verification, cloud configuration and automated end-to-end tests before publishing.'],outcome:'Source-code prototype exists. Live Bedrock operation and deployment have not been validated yet. A public code/demo link will be added after verification.',stack:['Java 21','Spring Boot','Spring AI','MCP','Amazon Bedrock','REST']},
    rag:{title:'Enterprise Security & Banking RAG',number:'05 / 07',eyebrow:'INDEPENDENT AI LAB · ARCHITECTURE EXPLORATION · 2026',subtitle:'Finding the source, not just generating a confident-sounding answer.',status:'ARCHITECTURE DESIGN · IMPLEMENTATION UPCOMING',monogram:'GROUND<br>THE ANSWER',problem:'Regulated organizations need search and knowledge systems that can point to original evidence rather than relying on unsupported AI responses.',role:'I designed the proposed flow for document ingestion, chunking and embedding, semantic retrieval, grounded generation and answer citations.',steps:['Design a document ingestion pipeline for synthetic banking and security materials.','Plan vector-based retrieval, relevance evaluation and source citations.','Add access controls and human evaluation of answers as the prototype is implemented.'],outcome:'Architecture and implementation goals are defined. The working system, demo and public repository are next steps.',stack:['Python','RAG','AWS Bedrock','S3','OpenSearch','Embeddings']},
    incident:{title:'AI Incident & Production Support Agent',number:'06 / 07',eyebrow:'INDEPENDENT AI LAB · ARCHITECTURE EXPLORATION · 2026',subtitle:'A more structured way to investigate production incidents, with humans in control.',status:'ARCHITECTURE DESIGN · IMPLEMENTATION UPCOMING',monogram:'FIND<br>THE CAUSE',problem:'Production incidents create noisy logs and scattered knowledge. An investigation assistant should be able to collect clues without automatically executing unsafe actions.',role:'I mapped a Python-based agent workflow for log analysis, root-cause hypotheses, runbook lookup, investigation history and human review.',steps:['Model ingestion of synthetic traces, errors and incident metadata.','Use retrieval from runbooks to ground suggested next steps.','Require explicit human approval before any remediation action; retain investigation history.'],outcome:'Conceptual architecture defined. Full implementation and validation are still upcoming.',stack:['Python','FastAPI','LangGraph','ChromaDB','SQLAlchemy','Human-in-loop']}
    ,
    bobal:{
      title:'Bobal Language Learning App',
      number:'07 / 07',
      eyebrow:'PERSONAL MOBILE PROJECT · ANDROID · 2020—2021',
      subtitle:'IELTS study tools with vocabulary discovery through real news articles.',
      status:'ORIGINAL ANDROID PROJECT · HISTORICAL PLAY STORE RELEASE',
      monogram:'BOBAL<br>LANGUAGE',
      image:'assets/bobal-app.png',
      imageAlt:'Bobal Android app screenshot showing results from the vocabulary and news article search',
      problem:'Language learners need both structured IELTS practice and ways to discover vocabulary in real-world context.',
      role:'I contributed to an Android language-learning application with vocabulary flashcards, Solr-backed searches for words in news articles, and recording and playback for IELTS-style speaking practice.',
      steps:[
        'Built vocabulary flashcards to support English language examination practice.',
        'Integrated Apache Solr search so learners could find and explore new words through recent news content.',
        'Worked with the Android media recorder/player and speaking practice scoring workflow.',
        'Used Android Studio, RxJava / RxAndroid, Python, Scrapy and Volley as part of the wider project.'
      ],
      outcome:'The original portfolio documented a Google Play Store release. This screenshot comes from the original Android app. The historical app listing is not independently verified as currently available.',
      stack:['Android','Apache Solr','Python','Scrapy','RxJava','RxAndroid','Volley'],
      links:[
        {label:'ORIGINAL PROJECT WRITE-UP ↗',url:'https://github.com/raghavbobal1/myWebsite/blob/main/projects.html'},
        {label:'VIEW ORIGINAL SCREENSHOT ↗',url:'https://github.com/raghavbobal1/myWebsite/blob/main/bobal-app.png'}
      ]
    }
  };
  const systemModes = {
    banking:{name:'SECURE DIGITAL BANKING',desc:'From customer workflows to dependable integrations.',nodes:['Digital banking UI','REST API contracts','Validation + logic','Secure delivery']},
    security:{name:'APPLICATION SECURITY',desc:'Reduce risk with layers of validation and observable delivery.',nodes:['Application code','Static analysis','Remediation flow','Verified release']},
    ai:{name:'TOOL-USING AI AGENTS',desc:'Grounded, controlled tools with human oversight.',nodes:['User request','LLM reasoning','MCP tool calls','Reviewed outcome']}
  };
  let activeSystem = 'banking';
  $$('#schematic [data-node]').forEach(node => {const handler=()=>{const idx=+node.dataset.node; const names=systemModes[activeSystem].nodes; $('#mode-desc').textContent=names[idx]+'. '+systemModes[activeSystem].desc;};node.addEventListener('click',handler);node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();handler();}});});
  $$('.schematic-modes button').forEach(btn=>btn.addEventListener('click',()=>{activeSystem=btn.dataset.mode;$$('.schematic-modes button').forEach(b=>b.classList.toggle('active',b===btn));const data=systemModes[activeSystem];$('#mode-name').textContent=data.name;$('#mode-desc').textContent=data.desc;data.nodes.forEach((s,i)=>$('#node-label-'+i).textContent=s);}));
  const overlay=$('#project-overlay'),drawer=$('#project-drawer'),drawerContent=$('#drawer-content');let lastFocused=null,currentId='wires',drawerTimer;
  const order=['wires','security','olbb','agent','rag','incident','bobal'];
  function openProject(id){if(!projectInfo[id])return;currentId=id;const p=projectInfo[id];lastFocused=document.activeElement;$('#drawer-counter').textContent=p.number;drawerContent.replaceChildren();const fragment=document.createElement('div');const tagItems=p.stack.map(s=>`<span>${s}</span>`).join('');const stepItems=p.steps.map(s=>`<li>${s}</li>`).join('');const imageMarkup=p.image?`<div class="drawer-image is-screenshot"><img src="${p.image}" alt="${p.imageAlt||p.title}" loading="lazy"><small>ORIGINAL APP SCREENSHOT</small></div>`:`<div class="drawer-image"><span>${p.monogram}</span><small>PROJECT / ${p.number}</small></div>`;const linksMarkup=p.links?`<div class="drawer-project-links">${p.links.map(l=>`<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join('')}</div>`:'';fragment.innerHTML=`<span class="drawer-kicker">${p.eyebrow}</span><h2>${p.title}</h2><p class="drawer-subtitle">${p.subtitle}</p><span class="drawer-status">${p.status}</span>${imageMarkup}<h3>THE PROBLEM</h3><p>${p.problem}</p><h3>MY CONTRIBUTION</h3><p>${p.role}</p><h3>TECHNICAL APPROACH</h3><ul>${stepItems}</ul><h3>OUTCOME + CURRENT STATUS</h3><p>${p.outcome}</p><div class="drawer-tech">${tagItems}</div>${linksMarkup}<a class="drawer-link" href="mailto:raghavbobal10@gmail.com?subject=Question%20about%20${encodeURIComponent(p.title)}">ASK ME ABOUT THIS PROJECT ↗</a>`;drawerContent.append(fragment);overlay.hidden=false;drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');clearTimeout(drawerTimer);$('#drawer-close').focus();drawerContent.scrollTop=0;}
  function closeProject(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');clearTimeout(drawerTimer);drawerTimer=setTimeout(()=>{overlay.hidden=true;},370);lastFocused?.focus?.();}
  $$('.project-card').forEach(card=>card.addEventListener('click',()=>openProject(card.dataset.project)));$('#drawer-close').addEventListener('click',closeProject);overlay.addEventListener('click',closeProject);$('#drawer-next').addEventListener('click',()=>openProject(order[(order.indexOf(currentId)+1)%order.length]));
  $$('.filter').forEach(btn=>btn.addEventListener('click',()=>{const filter=btn.dataset.filter;$$('.filter').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',b===btn?'true':'false');});$$('.project-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.type!==filter;});}));
  // Challenge UI: randomized cases and options are supplied by the testable quiz engine.
  const quiz=window.PortfolioQuiz;
  const ROUND_SIZE=5;
  let category='mixed', deck=[], round=0, score=0, streak=0, solved=0, answered=false, finished=false;
  const gameButton=$('#next-case'), feedback=$('#challenge-feedback');
  const categoryButtons=$$('.challenge-category');
  function updateGameStats(){
    $('#challenge-score').textContent=String(score).padStart(4,'0');
    $('#challenge-streak').innerHTML=String(streak)+' <small>×</small>';
    $('#challenge-solved').textContent=solved+' / '+ROUND_SIZE;
  }
  function updateGameProgress(completed){
    const track=$('.challenge-track');
    track.setAttribute('aria-valuenow',String(completed));
    $('#challenge-progress-fill').style.width=(completed/ROUND_SIZE*100)+'%';
  }
  function renderChallenge(){
    answered=false;finished=false;
    const q=deck[round];
    $('#challenge-count').textContent='CASE '+String(round+1).padStart(2,'0')+' / 0'+ROUND_SIZE;
    $('#challenge-topic').textContent=quiz.CATEGORY_NAMES[category].toUpperCase();
    $('#challenge-level').textContent=q.level;
    $('#challenge-description').textContent=q.question;
    const snippet=$('#challenge-snippet');
    snippet.hidden=!q.snippet;
    snippet.textContent=q.snippet;
    feedback.textContent='';
    feedback.classList.remove('error','success');
    $('#challenge-result').hidden=true;
    gameButton.disabled=true;
    gameButton.textContent=round===ROUND_SIZE-1?'SEE YOUR RESULTS →':'CONTINUE TO NEXT CASE →';
    const options=$('#challenge-options');
    options.replaceChildren();
    q.options.forEach((label,i)=>{
      const b=document.createElement('button');
      b.type='button';
      b.className='challenge-option';
      b.innerHTML='<b>0'+(i+1)+'</b><span></span>';
      b.querySelector('span').textContent=label;
      b.setAttribute('aria-label','Option '+(i+1)+': '+label);
      b.addEventListener('click',()=>answer(i));
      options.append(b);
    });
    updateGameStats();
    updateGameProgress(round);
  }
  function answer(i){
    if(answered||finished||i<0||i>=4)return;
    answered=true;
    const q=deck[round],correct=i===q.correct;
    const points=quiz.scoreAnswer(streak,correct);
    score+=points.points;
    streak=points.nextStreak;
    if(correct)solved++;
    $$('.challenge-option').forEach((b,j)=>{
      b.disabled=true;
      if(j===q.correct)b.classList.add('correct');
      else if(j===i)b.classList.add('incorrect');
    });
    feedback.classList.toggle('error',!correct);
    feedback.classList.toggle('success',correct);
    feedback.textContent=(correct?'✓ GOOD CALL · +'+points.points+' PTS. ':'↳ NOT THIS TIME. ')+q.why;
    updateGameStats();
    updateGameProgress(round+1);
    gameButton.disabled=false;
  }
  function finishRound(){
    finished=true;answered=true;
    $('#challenge-count').textContent='SESSION COMPLETE';
    $('#challenge-topic').textContent=quiz.CATEGORY_NAMES[category].toUpperCase();
    $('#challenge-level').textContent='ROUND FINISHED';
    $('#challenge-description').textContent=solved===ROUND_SIZE?'Clean sweep. All systems green.':'Incident review complete.';
    $('#challenge-snippet').hidden=true;
    $('#challenge-options').replaceChildren();
    feedback.classList.remove('error','success');
    feedback.textContent='Five incidents reviewed. Want a different mix? Start another round.';
    const result=$('#challenge-result');
    result.hidden=false;
    $('#challenge-rank').textContent=quiz.resultLabel(solved,ROUND_SIZE);
    $('#challenge-result-note').textContent=solved+' / '+ROUND_SIZE+' solved · '+score+' points · '+quiz.CATEGORY_NAMES[category]+'. These are just practice scenarios, not a technical assessment.';
    gameButton.textContent='PLAY ANOTHER ROUND ↻';
    gameButton.disabled=false;
  }
  function startRound(){
    deck=quiz.makeRound(category,ROUND_SIZE);
    if(deck.length!==ROUND_SIZE)throw new Error('Unable to construct a complete debugging round');
    round=0;score=0;streak=0;solved=0;answered=false;finished=false;
    categoryButtons.forEach(b=>{
      const active=b.dataset.category===category;
      b.classList.toggle('active',active);
      b.setAttribute('aria-pressed',String(active));
    });
    renderChallenge();
  }
  categoryButtons.forEach(btn=>btn.addEventListener('click',()=>{
    category=btn.dataset.category;
    startRound();
  }));
  gameButton.addEventListener('click',()=>{
    if(finished){startRound();return;}
    if(!answered)return;
    if(round>=ROUND_SIZE-1){finishRound();return;}
    round++;renderChallenge();
  });
  $('#challenge-restart').addEventListener('click',startRound);
  startRound();
  let paletteResults=[],paletteSelected=0;const palette=$('#command-palette'),backdrop=$('#palette-backdrop'),searchInput=$('#palette-input');const locations=[{text:'Selected work',description:'View all projects',target:'#work'},{text:'Debugging challenge',description:'Interactive game',target:'#playground'},{text:'My story',description:'About and experience',target:'#about'},{text:'Technology stack',description:'Tools and skills',target:'.stack-section'},{text:'Contact me',description:'Email and socials',target:'#contact'},{text:'Resume PDF',description:'Download',target:'resume-download'},{text:'GitHub',description:'Browse repositories',target:'https://github.com/raghavbobal1'},{text:'LinkedIn',description:'Connect with Raghav',target:'https://www.linkedin.com/in/raghavbobal1/'},...order.map(id=>({text:projectInfo[id].title,description:'Project case study',project:id}))];
  function renderPalette(q=''){const matches=locations.filter(x=>(x.text+' '+x.description).toLowerCase().includes(q.toLowerCase()));paletteResults=matches;paletteSelected=Math.min(paletteSelected,Math.max(0,matches.length-1));const el=$('#palette-results');el.replaceChildren();matches.forEach((m,i)=>{const b=document.createElement('button');b.type='button';b.className=i===paletteSelected?'active':'';b.innerHTML='<span></span><small></small>';b.querySelector('span').textContent=m.text;b.querySelector('small').textContent=m.description;b.addEventListener('click',()=>activatePalette(i));b.addEventListener('mouseenter',()=>{paletteSelected=i;$$('.palette-results button').forEach((x,j)=>x.classList.toggle('active',j===i));});el.append(b);});if(!matches.length)el.innerHTML='<button type="button" disabled>No matching destinations</button>';}
  function openPalette(){palette.hidden=false;backdrop.hidden=false;document.body.classList.add('modal-open');searchInput.value='';paletteSelected=0;renderPalette();searchInput.focus();}
  function closePalette(){palette.hidden=true;backdrop.hidden=true;document.body.classList.remove('modal-open');}
  function activatePalette(i){const entry=paletteResults[i];if(!entry)return;closePalette();if(entry.project){openProject(entry.project);return;}if(entry.target.startsWith('http')){window.open(entry.target,'_blank','noopener,noreferrer');return;}if(entry.target==='resume-download'){document.querySelector('.pill-outline')?.click();return;}if(entry.target.endsWith('.pdf')){window.open(entry.target,'_blank');return;}const target=document.querySelector(entry.target);target?.scrollIntoView({behavior:'smooth'});}
  $('#cmd-open').addEventListener('click',openPalette);backdrop.addEventListener('click',closePalette);searchInput.addEventListener('input',()=>{paletteSelected=0;renderPalette(searchInput.value);});searchInput.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();paletteSelected=Math.min(paletteSelected+1,paletteResults.length-1);renderPalette(searchInput.value);}if(e.key==='ArrowUp'){e.preventDefault();paletteSelected=Math.max(0,paletteSelected-1);renderPalette(searchInput.value);}if(e.key==='Enter'){e.preventDefault();activatePalette(paletteSelected);}});
  function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('visible');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('visible'),2200);}
  $('#copy-email').addEventListener('click',async()=>{const value='raghavbobal10@gmail.com';try{await navigator.clipboard.writeText(value);toast('EMAIL COPIED ✓');}catch(e){const t=document.createElement('textarea');t.value=value;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();try{document.execCommand('copy');toast('EMAIL COPIED ✓');}catch(e){toast(value);}t.remove();}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!palette.hidden)closePalette();else if(drawer.classList.contains('open'))closeProject();}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(palette.hidden)openPalette();else closePalette();}if(e.key==='/'&& !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&palette.hidden&&!drawer.classList.contains('open')){e.preventDefault();openPalette();}const inGame=(()=>{const r=$('#playground').getBoundingClientRect();return r.top<innerHeight*0.9&&r.bottom>innerHeight*0.15;})();const typing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)||document.activeElement.isContentEditable;if(inGame&&!typing&&!e.altKey&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&palette.hidden&&!drawer.classList.contains('open')){if(['1','2','3','4'].includes(e.key)){e.preventDefault();answer(Number(e.key)-1);}else if(e.key==='Enter'&&answered&&document.activeElement.tagName!=='BUTTON'){e.preventDefault();gameButton.click();}}});
  const mobToggle=$('#mobile-toggle'),mobMenu=$('#mobile-menu');mobToggle.addEventListener('click',()=>{mobMenu.hidden=!mobMenu.hidden;mobToggle.setAttribute('aria-expanded',String(!mobMenu.hidden));});$$('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>{mobMenu.hidden=true;mobToggle.setAttribute('aria-expanded','false');}));
  function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;$('#reading-progress').style.width=(max>0?window.scrollY/max*100:0)+'%';}addEventListener('scroll',updateScroll,{passive:true});updateScroll();$('#year').textContent=new Date().getFullYear();
  if(matchMedia('(pointer:fine)').matches){document.body.classList.add('pointer-present');let movePending=false,xx=0,yy=0;addEventListener('pointermove',e=>{xx=e.clientX;yy=e.clientY;if(!movePending){movePending=true;requestAnimationFrame(()=>{const cur=$('.cursor-light');cur.style.left=xx+'px';cur.style.top=yy+'px';movePending=false;});}},{passive:true});}
  // Keep focus in a project drawer while it is active.
  drawer.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const focusables=$$('a[href],button:not([disabled])',drawer);if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
})();

