import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { resizeEventListener, addCubes, addCamera, addText } from "./utils";
import gui from "./gui";
import gsap from "gsap";
import "./index.css";

export default function init() {
  console.time("scene");
  const canvas = document.querySelector(".scene");
  const size = { width: window.innerWidth, height: window.innerHeight };

  const scene = new THREE.Scene();

  const axes = new THREE.AxesHelper(5);
  axes.visible = false;
  scene.add(axes);

  const material = new THREE.MeshNormalMaterial();

  addText(scene, material);

  const cubes = addCubes(scene, material);

  const camera = addCamera(scene, size);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(size.width, size.height);

  console.timeEnd("scene");

  gui({ material, axes });

  resizeEventListener({ size, camera, renderer });

  let lastTime = performance.now();
  const tick = (currTime) => {
    const delta = currTime - lastTime;
    if (delta >= 16) {
      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });

      controls.update();
      renderer.render(scene, camera);
    }

    requestAnimationFrame(tick);
  };

  tick();
}
