const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImagLoading() {}

// TODO: 이미지를 오픈 API 통해서 무작위로 가져오는 것도 구현해보자
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  //   image.addEventListener("loadend", handleImagLoading);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
