import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap";
import "./index.css";

export default function init() {
  console.time("scene");
  const canvas = document.querySelector(".scene");
  const size = { width: window.innerWidth, height: window.innerHeight };

  const gui = new dat.GUI();

  window.addEventListener("resize", function (event) {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
  });

  const scene = new THREE.Scene();
  window.scene = scene;

  const axes = new THREE.AxesHelper(5);
  axes.visible = false;
  scene.add(axes);

  const material = new THREE.MeshNormalMaterial();

  const fontLoader = new THREE.FontLoader();
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new THREE.TextGeometry("109149", {
      font,
      size: 1,
      height: 0.01,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    textGeometry.center();

    const textMesh = new THREE.Mesh(textGeometry, material);
    window.textMesh = textMesh;
    scene.add(textMesh);
  });

  console.time("cubes");
  const numberOfCubes = 200;
  const cubes = Array(200);
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  for (let i = 0; i < numberOfCubes; i++) {
    const cubeMesh = new THREE.Mesh(cubeGeometry, material);

    cubeMesh.position.x = (Math.random() - 0.5) * 20;
    cubeMesh.position.y = (Math.random() - 0.5) * 20;
    cubeMesh.position.z = (Math.random() - 0.5) * 20;

    const scale = Math.random();
    cubeMesh.scale.set(scale, scale, scale);

    cubeMesh.rotation.x = Math.random() * Math.PI;
    cubeMesh.rotation.y = Math.random() * Math.PI;

    cubes[i] = cubeMesh;
    scene.add(cubeMesh);
  }
  console.timeEnd("cubes");

  const fov = 45;
  const aspectRatio = size.width / size.height;
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.01, 100);
  camera.position.set(-50, 30, 30);
  gsap.to(camera.position, { duration: 2, x: -5.54, y: 0.07, z: 6.85 });
  window.camera = camera;
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(size.width, size.height);

  console.timeEnd("scene");

  gui.add(material, "wireframe");
  gui.add(axes, "visible").name("Enables Axes");

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
