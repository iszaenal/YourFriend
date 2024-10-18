const container = document.getElementById('splash');
const text = document.getElementById('title');

const distance = 30;

function setShadow(e) {
    const width = this.offsetWidth;
    const height = this.offsetHeight;

    let x = e.offsetX;
    let y = e.offsetY;

    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    const xDistance = Math.round(( x / width * distance) - (distance / 2));
    const yDistance = Math.round(( y / height * distance) - (distance / 2));

    text.style.textShadow = `${xDistance}px ${yDistance}px #EB492C`;
}

container.addEventListener('mousemove', setShadow);