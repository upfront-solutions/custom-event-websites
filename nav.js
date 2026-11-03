/* Mobile menu. Shared by every page that uses the site header. */
(function () {
  var btn = document.getElementById('menuBtn');
  var panel = document.getElementById('mobileNav');
  if (!btn || !panel) return;

  function setOpen(open) {
    panel.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function isOpen() { return btn.getAttribute('aria-expanded') === 'true'; }

  btn.addEventListener('click', function () { setOpen(!isOpen()); });

  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { setOpen(false); btn.focus(); }
  });

  var wide = window.matchMedia('(min-width: 981px)');
  (wide.addEventListener ? wide.addEventListener.bind(wide, 'change') : wide.addListener.bind(wide))(
    function (e) { if (e.matches && isOpen()) setOpen(false); }
  );
})();
