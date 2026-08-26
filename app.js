(() => {
  'use strict';
  const a11yStyles = document.createElement('link');
  a11yStyles.rel = 'stylesheet';
  a11yStyles.href = 'a11y.css';
  document.head.append(a11yStyles);
  const data = window.ATLAS_DATA;
  const results = document.querySelector('#results');
  const search = document.querySelector('#search');
  const sort = document.querySelector('#sort');
  const count = document.querySelector('#result-count');
  const tabs = [...document.querySelectorAll('.tab')];
  const modal = document.querySelector('#detail-modal');
  const modalContent = document.querySelector('#modal-content');
  let view = 'campus';

  const composite = item => +(item.future * .30 + item.global * .25 + item.income * .20 + item.flex * .15 + item.eco * .10).toFixed(1);
  const labels = {future:'Gelecek', global:'Yurt dışı', income:'Gelir', flex:'Esneklik', eco:'Ekosistem'};
  const campusLabels = {learning:'Öğrenim', campus:'Yerleşke', support:'Destek', governance:'Yönetim', resources:'Kaynak', career:'Kariyer'};
  const scoreOf = item => view === 'campus' ? item.score : composite(item);

  function metrics(item) {
    if (view === 'campus') return Object.entries(campusLabels).map(([key,label]) => ({key,label,value:item[key]}));
    return Object.entries(labels).map(([key,label]) => ({key,label,value:item[key]}));
  }

  function render() {
    const q = search.value.trim().toLocaleLowerCase('tr-TR');
    let list = data[view].filter(item => `${item.name} ${item.meta}`.toLocaleLowerCase('tr-TR').includes(q));
    const criterion = sort.value;
    list.sort((a,b) => {
      if (view === 'campus' || criterion === 'score') return scoreOf(b) - scoreOf(a);
      return b[criterion] - a[criterion];
    });
    count.textContent = `${list.length} KAYIT`;
    if (!list.length) { results.innerHTML = '<div class="empty">Bu aramayla eşleşen kayıt yok.</div>'; return; }
    results.innerHTML = list.map(item => {
      const bars = metrics(item).slice(0,5).map(m => `<div class="metric"><i><span style="width:${Math.min(m.value,100)}%"></span></i><small>${m.label}</small></div>`).join('');
      return `<article class="result-row" tabindex="0" role="button" data-name="${item.name.replaceAll('"','&quot;')}" aria-label="${item.name} ayrıntılarını aç">
        <span class="rank">#${String(item.rank).padStart(2,'0')}</span>
        <div class="identity"><h3>${item.name}</h3><small>${item.meta}</small></div>
        <div class="score"><strong>${scoreOf(item).toFixed(1)}</strong><small>${view === 'campus' ? `${item.grade} · TÜMA` : 'BİLEŞİK'}</small></div>
        <div class="score-bars" aria-hidden="true">${bars}</div><span class="row-arrow" aria-hidden="true">↗</span></article>`;
    }).join('');
  }

  function openDetail(name) {
    const item = data[view].find(x => x.name === name);
    if (!item) return;
    const metricCards = metrics(item).map(m => `<div class="modal-metric"><span>${m.label.toUpperCase()}</span><b>${m.value.toFixed(1)}</b></div>`).join('');
    modalContent.innerHTML = `<span class="modal-rank">#${String(item.rank).padStart(2,'0')} · ${item.confidence.toUpperCase()} GÜVEN</span><h2 id="modal-title" class="modal-title">${item.name}</h2><div class="modal-meta">${item.meta}</div><div class="modal-score">${scoreOf(item).toFixed(1)}</div><div class="modal-metrics">${metricCards}</div><div class="modal-copy"><div><span>GÜÇLÜ YÖN</span><p>${item.advantage}</p></div><div><span>ANA RİSK</span><p>${item.risk}</p></div></div>${item.regulated ? '<span class="tag">DÜZENLEMEYE TABİ MESLEK</span>' : ''}`;
    modal.showModal();
  }

  function activateTab(tab, moveFocus = false) {
    view = tab.dataset.view;
    tabs.forEach(t => {
      const selected = t === tab;
      t.classList.toggle('active', selected);
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
    });
    search.placeholder = view === 'campus' ? 'Üniversite veya şehir ara…' : 'Alan veya tema ara…';
    sort.innerHTML = view === 'campus' ? '<option value="score">TÜMA puanı</option>' : '<option value="score">Bileşik puan</option><option value="future">Gelecek</option><option value="global">Yurt dışı</option><option value="income">Gelir</option><option value="flex">Esneklik</option>';
    search.value = '';
    if (moveFocus) tab.focus();
    render();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      const directions = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1};
      if (!(event.key in directions) && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + directions[event.key] + tabs.length) % tabs.length;
      activateTab(tabs[nextIndex], true);
    });
  });
  activateTab(tabs.find(tab => tab.classList.contains('active')) || tabs[0]);
  search.addEventListener('input', render);
  sort.addEventListener('change', render);
  results.addEventListener('click', e => { const row=e.target.closest('.result-row'); if(row) openDetail(row.dataset.name); });
  results.addEventListener('keydown', e => { const row=e.target.closest('.result-row'); if(row && (e.key==='Enter'||e.key===' ')){e.preventDefault();openDetail(row.dataset.name);} });
  document.querySelector('.modal-close').addEventListener('click',()=>modal.close());
  modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  render();
})();
