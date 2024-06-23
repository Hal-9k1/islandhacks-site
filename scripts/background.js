window.addEventListener('DOMContentLoaded', function() {
  const originalOuter = 'rgb(250, 150, 74)'; // peach
  const finalOuter = 'rgb(0, 0, 0)'; // to dark purple

  const originalInner = 'rgb(255, 255, 255)';
  const finalInner = 'rgb(81, 0, 81)';

  window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    let fraction = Math.min(Math.max(scrollPosition / maxScroll, 0), 1);

    let newOuter = interpolateColor(originalOuter, finalOuter, fraction);
    let newInner = interpolateColor(originalInner, finalInner, fraction);

    // url(background_temp.png) top center no-repeat,
    // document.body.style.backgroundSize = `100% auto`;

    document.body.style.background = `
      linear-gradient(to right, ${newOuter}, ${newInner}, ${newOuter})
    `;
  });

  function interpolateColor(color1, color2, fraction) {
    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    let r = Math.round(color1[0] + fraction * (color2[0] - color1[0]));
    let g = Math.round(color1[1] + fraction * (color2[1] - color1[1]));
    let b = Math.round(color1[2] + fraction * (color2[2] - color1[2]));

    return `rgb(${r}, ${g}, ${b})`;
  }
});