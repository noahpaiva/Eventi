let tstSliderImages = document.querySelectorAll('.tst'),
  tstArrowLeft = document.querySelector("#arrow-tst-left"),
  tstArrowRight = document.querySelector("#arrow-tst-right"),
  tstCurrent = 0;

console.log(tstSliderImages.length);

// Clear all images
function tstReset() {
  for (let i = 0; i < tstSliderImages.length; i++) {
    tstSliderImages[i].style.display = "none";
  }
}

// Init slider
function tstStartSlide() {
  tstReset();
  tstSliderImages[0].style.display = "block";
}

// Show prev
function tstSlideLeft() {
  tstReset();
  tstSliderImages[tstCurrent - 1].style.display = "block";
  tstCurrent--;
}

// Show next
function tstSlideRight() {
  tstReset();
  tstSliderImages[tstCurrent + 1].style.display = "block";
  tstCurrent++;
}

// Left arrow click
tstArrowLeft.addEventListener("click", function () {
  if (tstCurrent === 0) {
    tstCurrent = tstSliderImages.length;
  }
  tstSlideLeft();
});

// Right arrow click
tstArrowRight.addEventListener("click", function () {
  if (tstCurrent === tstSliderImages.length - 1) {
    tstCurrent = -1;
  }
  tstSlideRight();
});

tstStartSlide();
