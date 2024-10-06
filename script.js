class ButtonEffect {
  constructor(effect) {
    if (effect.config.random) {
      this.randomizeArray(effect.textNodes.chars);
      this.matchArraySort(effect.textNodes.chars, effect.activeTextNodes.chars);
    }

    effect.element.addEventListener("click", (e) => {
      let reverse = effect.element.classList.contains("active") ? true : false;
      effect.element.classList.toggle("active");
      effect.handler(
        effect.element,
        effect.textNodes,
        effect.activeTextNodes,
        effect.nodes,
        effect.config,
        reverse
      );
      e.preventDefault();
    });
  }

  randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  matchArraySort(referenceArr, arr) {
    const referenceMap = new Map(
      referenceArr.map((el, index) => [el.textContent, index])
    );
    arr.sort(
      (a, b) =>
        referenceMap.get(a.textContent) - referenceMap.get(b.textContent)
    );
  }
}

const svgBounceEffect = (
  element,
  textNodes,
  activeTextNodes,
  nodes,
  config,
  reverse
) => {
  const {
    duration,
    ease,
    y1,
    y2,
    scale1,
    scale2,
    elementDuration1,
    elementDuration2,
    textNodeDuration,
    textNodeY1,
    textNodeY2,
    stagger,
    confettiConfig,
    confettiActive
  } = config;
  const tl = gsap.timeline();

  if (confettiActive) {
    confetti(element.id, confettiConfig);
  }

  tl.add("start")
    .to(element, {
      scale: scale1,
      y: y1,
      duration: elementDuration1
    })
    .to(element, {
      scale: scale2,
      y: y2,
      duration: elementDuration2
    })
    .to(
      textNodes.chars,
      {
        duration: textNodeDuration,
        y: reverse ? textNodeY2 : textNodeY1,
        stagger: stagger,
        ease: ease
      },
      "start"
    )
    .to(
      activeTextNodes.chars,
      {
        duration: textNodeDuration,
        y: reverse ? textNodeY1 * -1 : textNodeY2,
        stagger: stagger,
        ease: ease
      },
      "start"
    );
};

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(SplitText);

  const config = {
    stagger: 0.05,
    duration: 1,
    random: true,
    ease: "elastic.out(0.8, 0.3)",
    y1: 12,
    y2: 0,
    scale1: 0.9,
    scale2: 1,
    elementDuration1: 0.1,
    elementDuration2: 0.2,
    textNodeDuration: 1,
    textNodeY1: 60,
    textNodeY2: 0,
    confettiActive: true,
    confettiConfig: {
      particleCount: 50,
      spread: 40,
      origin: { y: 0.5 },
      scalar: 1,
      zIndex: -1
    }
  };

  const button1 = document.getElementById("button1");
  const button1Config = {
    random: false
  };
  const button1Effect = {
    element: button1,
    handler: svgBounceEffect,
    textNodes: new SplitText([button1.querySelector(".inactive-text")], {
      type: "chars"
    }),
    activeTextNodes: new SplitText([button1.querySelector(".active-text")], {
      type: "chars"
    }),
    config: { ...config, ...button1Config }
  };

  const button2 = document.getElementById("button2");
  const button2Effect = {
    element: button2,
    handler: svgBounceEffect,
    textNodes: new SplitText([button2.querySelector(".inactive-text")], {
      type: "chars"
    }),
    activeTextNodes: new SplitText([button2.querySelector(".active-text")], {
      type: "chars"
    }),
    config: config
  };

  const button3 = document.getElementById("button3");
  const button3Config = {
    ease: "steps(4)",
    random: false,
    textNodeDuration: 0.3,
    confettiActive: true
  };

  const button3Effect = {
    element: button3,
    handler: svgBounceEffect,
    textNodes: new SplitText([button3.querySelector(".inactive-text")], {
      type: "chars"
    }),
    activeTextNodes: new SplitText([button3.querySelector(".active-text")], {
      type: "chars"
    }),
    config: { ...config, ...button3Config }
  };

  const button4 = document.getElementById("button4");
  const button4Config = {
    ease: "steps(4)",
    random: true,
    textNodeDuration: 0.3,
    confettiActive: true
  };

  const button4Effect = {
    element: button4,
    handler: svgBounceEffect,
    textNodes: new SplitText([button4.querySelector(".inactive-text")], {
      type: "chars"
    }),
    activeTextNodes: new SplitText([button4.querySelector(".active-text")], {
      type: "chars"
    }),
    config: { ...config, ...button4Config }
  };

  const button5 = document.getElementById("button5");
  const button5Config = {
    ease: "circ.out",
    random: false,
    textNodeDuration: 0.3,
    confettiActive: true
  };

  const button5Effect = {
    element: button5,
    handler: svgBounceEffect,
    textNodes: new SplitText([button5.querySelector(".inactive-text")], {
      type: "chars"
    }),
    activeTextNodes: new SplitText([button5.querySelector(".active-text")], {
      type: "chars"
    }),
    config: { ...config, ...button5Config }
  };

  const button6 = document.getElementById("button6");
  const button6Config = {
    ease: "circ.out",
    random: true,
    textNodeDuration: 0.3,
    confettiActive: true
  };

  const button6Effect = {
    element: button6,
    handler: svgBounceEffect,
    textNodes: new SplitText([button6.querySelector(".inactive-text")], {
      type: "chars"
    }),
    activeTextNodes: new SplitText([button6.querySelector(".active-text")], {
      type: "chars"
    }),
    config: { ...config, ...button6Config }
  };

  new ButtonEffect(button1Effect);
  new ButtonEffect(button2Effect);
  new ButtonEffect(button3Effect);
  new ButtonEffect(button4Effect);
  new ButtonEffect(button5Effect);
  new ButtonEffect(button6Effect);
});
