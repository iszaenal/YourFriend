// Modernized version of the 3D head particle effect with Three.js r169 without jQuery
import * as THREE from "https://esm.sh/three";
import { OBJLoader } from "https://esm.sh/three/examples/jsm/loaders/OBJLoader.js";

const Background = {};

function init() {
  // Set dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;

  let camera,
    scene,
    renderer,
    mouseX = 0,
    mouseY = 0,
    p;
  let windowHalfX = width / 2;
  let windowHalfY = height / 2;

  // Camera
  camera = new THREE.PerspectiveCamera(35, width / height, 1, 2000);
  camera.position.z = 300;

  // Scene
  scene = new THREE.Scene();

  // Texture Manager
  const manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };

  // Particles
  const p_geom = new THREE.BufferGeometry();
  const p_material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.5
  });

  // Load model
  const loader = new OBJLoader(manager);
  loader.load(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/40480/head.obj",
    function (object) {
      const vertices = [];
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          const scale = 8;
          child.geometry.attributes.position.array.forEach((value, index) => {
            if (index % 3 === 0) {
              vertices.push(value * scale);
            } else if (index % 3 === 1) {
              vertices.push(value * scale);
            } else {
              vertices.push(value * scale);
            }
          });
        }
      });

      p_geom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      p = new THREE.Points(p_geom, p_material);
      scene.add(p);
    }
  );

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  document.querySelector(".particlehead").appendChild(renderer.domElement);

  // Event listeners
  document
    .querySelector(".particlehead")
    .addEventListener("mousemove", onDocumentMouseMove);
  window.addEventListener("resize", onWindowResize);

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    camera.position.x += (-(mouseX * 0.5) - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  animate();
}

Background.headparticle = init;

// Initialize
Background.headparticle();
