let p = document.querySelector('p'),
		p_width = p.getBoundingClientRect().width

function addBubbles() {
	for(var i=0;i<p_width/3;i++) {
		let b = document.createElement('div')
		b.className = 'bubble'
		b.style.width = Math.random() < .5 ? '30px' : '50px'
		b.style.left = Math.random() * (p_width - 50) + 'px'
		b.style.bottom = 10 * Math.random() + 'px'
		b.style.animationDelay = 4 * Math.random() + 's'
		p.appendChild(b)
	}	
}
addBubbles()