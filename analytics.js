/* Opt-in Google Analytics 4. Does not load Google scripts before visitor consent. */
(function () {
  'use strict';
  const id = String(window.PORTFOLIO_ANALYTICS_ID || '').trim();
  const configured = /^G-[A-Z0-9]{6,20}$/.test(id);
  const choiceKey = 'rb_portfolio_analytics_consent_v1';
  let enabled = false;
  let prompt = null;

  function readChoice() {
    try { return window.localStorage.getItem(choiceKey); } catch (_) { return null; }
  }
  function storeChoice(value) {
    try { window.localStorage.setItem(choiceKey, value); } catch (_) { /* storage unavailable */ }
  }
  function markStatus() {
    const status = !configured ? 'Analytics is not configured on this website.'
      : enabled ? 'Analytics is enabled with your consent.'
      : readChoice() === 'declined' ? 'Analytics is disabled by your choice.'
      : 'Analytics is disabled unless you choose to allow it.';
    document.querySelectorAll('[data-analytics-status]').forEach(node => node.textContent = status);
  }
  function loadAnalytics() {
    if (!configured || enabled) return;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    s.referrerPolicy = 'strict-origin-when-cross-origin';
    document.head.appendChild(s);
    markStatus();
  }
  function save(choice) {
    storeChoice(choice);
    if (prompt) prompt.hidden = true;
    if (choice === 'accepted') loadAnalytics();
    else if (enabled) window.location.reload(); // stop previously loaded analytics
    else markStatus();
  }
  function showPrompt() {
    if (!configured) return;
    if (!prompt) {
      prompt = document.createElement('aside');
      prompt.className = 'analytics-consent';
      prompt.setAttribute('role', 'region');
      prompt.setAttribute('aria-label', 'Analytics privacy choice');
      const heading = document.createElement('h2');
      heading.textContent = 'Allow visitor analytics?';
      const p = document.createElement('p');
      p.append('May I use Google Analytics to understand page visits, referral sources and approximate visitor locations? It may use cookies. I do not collect visitors\' names. ');
      const link = document.createElement('a');
      link.href = 'privacy.html';
      link.textContent = 'Privacy details';
      p.append(link, '.');
      const actions = document.createElement('div');
      actions.className = 'analytics-consent-actions';
      const accept = document.createElement('button');
      accept.type = 'button';
      accept.dataset.analyticsAccept = '';
      accept.textContent = 'Allow analytics';
      accept.addEventListener('click', () => save('accepted'));
      const decline = document.createElement('button');
      decline.type = 'button';
      decline.textContent = 'No thanks';
      decline.addEventListener('click', () => save('declined'));
      actions.append(accept, decline);
      prompt.append(heading, p, actions);
      document.body.append(prompt);
    }
    prompt.hidden = false;
    markStatus();
  }
  function track(name, params) {
    if (!enabled || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  }
  window.portfolioTrack = track;
  window.portfolioAnalyticsPreferences = showPrompt;

  document.addEventListener('click', e => {
    if (e.target.closest('[data-analytics-preferences]')) {
      e.preventDefault();
      showPrompt();
      return;
    }
    if (!enabled) return;
    const project = e.target.closest('[data-project]');
    if (project) {
      track('portfolio_project_open', { project_key: String(project.dataset.project || '').slice(0, 40) });
    }
    const outbound = e.target.closest('a[href^="https://github.com/"], a[href^="https://www.linkedin.com/"]');
    if (outbound) {
      const host = outbound.hostname === 'github.com' ? 'github' : 'linkedin';
      track('portfolio_external_link', { destination: host });
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    markStatus();
    document.querySelectorAll('[data-analytics-preferences]').forEach(button => { button.hidden = !configured; });
    if (!configured) return;
    const choice = readChoice();
    if (choice === 'accepted') loadAnalytics();
    else if (choice !== 'declined') showPrompt();
  });
})();
