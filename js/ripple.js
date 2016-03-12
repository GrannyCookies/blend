window.addEventListener('load', function() {
  function potato() {
    var ripples = document.getElementsByClassName('that-ripples')

    for(var i = 0; i < ripples.length; i++) {
      var ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripples[i].appendChild(ripple)
    }
  }

  potato()

  // ripplejs
  function startRipple(type, at) {
    var holder = at.target;
    var cl = holder.classList;
    if (!cl.contains('ripple')) {
      return false;  // ignore
    }

    // Store the event use to generate this ripple on the holder: don't allow
    // further events of different types until we're done. Prevents double-
    // ripples from mousedown/touchstart.
    var prev = holder.getAttribute('data-event');
    if (prev && prev != type) {
      return false;
    }
    holder.setAttribute('data-event', type);

    // Create and position the ripple.
    var rect = holder.getBoundingClientRect();
    var x = at.offsetX;
    var y;
    if (x !== undefined) {
      y = at.offsetY;
    } else {
      x = at.clientX - rect.left;
      y = at.clientY - rect.top;
    }
    var ripple = document.createElement('div');
    var max;
    if (rect.width == rect.height) {
      max = rect.width * 1.412;
    } else {
      max = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
    }
    var dim = max*2 + 'px';
    ripple.style.width = dim;
    ripple.style.height = dim;
    ripple.style.marginLeft = -max + x + 'px';
    ripple.style.marginTop = -max + y + 'px';

    // Activate/add the element.
    ripple.className = 'rippler';
    holder.appendChild(ripple);
    window.setTimeout(function() {
      ripple.classList.add('held');
    }, 0);

    var releaseEvent = (type == 'mousedown' ? 'mouseup' : 'touchend');
    var release = function(ev) {
      // TODO: We don't check for _our_ touch here. Releasing one finger
      // releases all ripples.
      document.removeEventListener(releaseEvent, release);
      ripple.classList.add('done');

      // larger than animation: duration in css
      window.setTimeout(function() {
        holder.removeChild(ripple);
        if (!holder.children.length) {
          cl.remove('active');
          holder.removeAttribute('data-event');
        }
      }, 650);
    };
    document.addEventListener(releaseEvent, release);
  }

  document.addEventListener('mousedown', function(ev) {
    if (ev.button == 0) {
      // trigger on left click only
      startRipple(ev.type, ev);
    }
  });
  document.addEventListener('touchstart', function(ev) {
    for (var i = 0; i < ev.changedTouches.length; ++i) {
      startRipple(ev.type, ev.changedTouches[i]);
    }
  });
});
