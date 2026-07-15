(function () {
  'use strict';

  const config = window.CAMPAIGN_CONFIG || {};
  const byId = (id) => document.getElementById(id);

  function applyCampaignConfig() {
    document.querySelectorAll('[data-config]').forEach((element) => {
      const value = config[element.dataset.config];
      if (value !== undefined && value !== null) element.textContent = value;
    });
  }

  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((element) => element.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));
  }

  function initScrollProgress() {
    const progress = byId('progress');
    if (!progress) return;
    const updateProgress = () => {
      const page = document.documentElement;
      const available = page.scrollHeight - page.clientHeight;
      progress.style.width = (available > 0 ? (page.scrollTop / available) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  function initCountdown() {
    const countdown = byId('countdown');
    if (!countdown || !config.registrationDeadline) return;
    const deadline = new Date(config.registrationDeadline).getTime();
    if (Number.isNaN(deadline)) return;
    const updateCountdown = () => {
      let diff = Math.max(0, deadline - Date.now());
      const days = Math.floor(diff / 86400000);
      diff %= 86400000;
      const hours = Math.floor(diff / 3600000);
      diff %= 3600000;
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      byId('days').textContent = String(days).padStart(2, '0');
      byId('hours').textContent = String(hours).padStart(2, '0');
      byId('minutes').textContent = String(minutes).padStart(2, '0');
      byId('seconds').textContent = String(seconds).padStart(2, '0');
    };
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  function createRegistrationCode() {
    const date = new Date();
    const stamp = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('');
    return `BRN-${stamp}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  }

  function initRegistrationForm() {
    const form = byId('registrationForm');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      data.registrationCode = createRegistrationCode();
      data.campaign = config.eventName || '';
      data.createdAt = new Date().toISOString();

      // Mode demo: data hanya disimpan di browser dan tidak dikirim ke webhook.
      try {
        localStorage.setItem('biruni_registration', JSON.stringify(data));
      } catch (error) {
        // Query string tetap membawa data utama jika localStorage dibatasi browser.
      }
      const params = new URLSearchParams({ name: data.name, code: data.registrationCode });
      window.location.href = `thanks.html?${params.toString()}`;
    });
  }

  function normalizeWhatsAppNumber(number) {
    const digits = String(number || '').replace(/\D/g, '');
    return digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
  }

  function initThanksPage() {
    const participantName = byId('participantName');
    const registrationCode = byId('registrationCode');
    if (!participantName || !registrationCode) return;
    const params = new URLSearchParams(window.location.search);
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem('biruni_registration') || '{}');
    } catch (error) {
      saved = {};
    }
    const name = params.get('name') || saved.name || 'Peserta Biruni';
    const code = params.get('code') || saved.registrationCode || '-';
    participantName.textContent = name;
    registrationCode.textContent = code;

    const confirmButton = byId('whatsappConfirmation');
    if (!confirmButton) return;
    const whatsappNumber = normalizeWhatsAppNumber(config.whatsappNumber);
    const message = [
      'Halo Biruni,',
      '',
      `Nama: *${name}*`,
      `Kode registrasi: *${code}*`,
      `Event: ${config.eventName || 'Event Biruni'}`,
      '',
      'Saya ingin melakukan konfirmasi pendaftaran.'
    ].join('\n');
    confirmButton.href = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : '#';
  }

  applyCampaignConfig();
  initRevealAnimations();
  initScrollProgress();
  initCountdown();
  initRegistrationForm();
  initThanksPage();
})();
