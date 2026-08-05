// Simple EN / 中文 toggle for interface text.
// Elements with data-en / data-zh get their textContent swapped.
// Preference is remembered in localStorage and applied on every page.
(function () {
  var STORAGE_KEY = 'site-lang';

  function getLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-en]').forEach(function (el) {
      var text = lang === 'zh' ? (el.getAttribute('data-zh') || el.getAttribute('data-en')) : el.getAttribute('data-en');
      if (text !== null) el.textContent = text;
    });

    document.querySelectorAll('[data-en-placeholder]').forEach(function (el) {
      var text = lang === 'zh' ? (el.getAttribute('data-zh-placeholder') || el.getAttribute('data-en-placeholder')) : el.getAttribute('data-en-placeholder');
      if (text !== null) el.setAttribute('placeholder', text);
    });

    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中文';

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function init() {
    var lang = getLang();
    applyLang(lang);
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = getLang() === 'zh' ? 'en' : 'zh';
        setLang(next);
        applyLang(next);
      });
    }
  }

  window.siteLang = { get: getLang, set: setLang, apply: applyLang };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
