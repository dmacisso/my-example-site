document.addEventListener('DOMContentLoaded', () => {
  const prince = document.querySelector('.character');

  let bottom = 0;
  let gravity = 0.9;
  let isJumping = false;
  let isGoingLeft = false;
  let isGoingRight = false;
  let left = 0;
  let rightTimerId;
  let leftTimerId;

  function jump() {
    prince.classList.remove('character-slide');
    prince.classList.add('character');
    if (isJumping) return;
    let upTimerId = setInterval(() => {
      if (bottom > 250) {
        clearInterval(upTimerId);
        let downTimerId = setInterval(() => {
          if (bottom < 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          bottom -= 5;
          prince.style.bottom = bottom + 'px';
        }, 20);
      }
      isJumping = true;
      bottom += 30;
      bottom = bottom * gravity;
      console.log(bottom);
      prince.style.bottom = bottom + 'px';
    }, 20);
  }

  function slideLeft() {
    prince.classList.add('character-slide');
    prince.classList.remove('character');
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(() => {
      left -= 5;
      console.log('going left');
      prince.style.left = left + 'px';
    }, 20);
  }

  function slideRight() {
    prince.classList.add('character-slide');
    prince.classList.remove('character');
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(() => {
      left += 5;
      console.log('going right');
      prince.style.left = left + 'px';
    }, 20);
  }

  //assign functions to keycodes
  function control(e) {
    if (e.keyCode === 38) {
      jump();
    } else if (e.keyCode === 37) {
      slideLeft();
    } else if (e.keyCode === 39) {
      slideRight();
    }
  }

  document.addEventListener('keydown', control);
});
