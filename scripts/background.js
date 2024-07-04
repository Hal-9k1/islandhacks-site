window.addEventListener('DOMContentLoaded', function() {
  const originalOuter = [250, 150, 74]; // peach
  const finalOuter = [20, 0, 20];
  const originalInner = [255, 255, 255];
  const finalInner = [81, 0, 81]; // to dark purple

  let lastKnownScrollPosition = 0;
  let ticking = false;

  function updateBackground(scrollPos) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
    const newOuter = interpolateColor(originalOuter, finalOuter, fraction);
    const newInner = interpolateColor(originalInner, finalInner, fraction);

    document.body.style.background = `
      linear-gradient(to right, rgb(${newOuter.join(',')}), rgb(${newInner.join(',')}), rgb(${newOuter.join(',')}))
    `;
  }

  function interpolateColor(color1, color2, fraction) {
    return color1.map((c, i) => Math.round(c + fraction * (color2[i] - c)));
  }

  document.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateBackground(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });
});