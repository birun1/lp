const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById('progress').style.width = scrolled + '%';
});

const deadline = new Date('2026-07-15T23:59:59+07:00').getTime();
function updateCountdown() {
  const now = Date.now();
  let diff = Math.max(0, deadline - now);
  const d = Math.floor(diff / 86400000);
  diff %= 86400000;
  const h = Math.floor(diff / 3600000);
  diff %= 3600000;
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('days').textContent = String(d).padStart(2,'0');
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.getElementById('registrationForm');
const message = document.getElementById('formMessage');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  // Hubungkan ke endpoint Anda di sini, misalnya Google Apps Script, n8n, atau backend.
  // Contoh:
  // await fetch('URL_WEBHOOK_ANDA', {
  //   method: 'POST',
  //   headers: {'Content-Type':'application/json'},
  //   body: JSON.stringify(data)
  // });

  localStorage.setItem('tka_registration', JSON.stringify(data));
  message.className = 'form-message success';
  message.textContent = 'Data berhasil disimpan di perangkat ini. Hubungkan form ke webhook/Google Sheet agar pendaftaran masuk ke database.';
  form.reset();
});