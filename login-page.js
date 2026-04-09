const ROOT = document.documentElement;
    const lamp = document.getElementById('lamp');
    const card = document.getElementById('card');
    const hint = document.getElementById('hint');
    let lightOn = false;

    function toggleLight() {
      lightOn = !lightOn;
      ROOT.style.setProperty('--on', lightOn ? '1' : '0');
      card.classList.toggle('is-active', lightOn);
      hint.classList.add('hidden');
      lamp.classList.add('swinging');
      setTimeout(() => lamp.classList.remove('swinging'), 600);
    }