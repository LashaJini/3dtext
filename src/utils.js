import * as THREE from "three";
import gsap from "gsap";
import * as font from "../public/fonts/helvetiker_regular.typeface.json";

export function resizeEventListener({ size, camera, renderer }) {
  window.addEventListener("resize", function (event) {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
  });
}

/**
 * Adds differently sized and positioned cubes to the scene.
 *
 * @param scene is THREE.Scene
 * @param material is instance of THREE.Material
 * @param numberOfCubes is number
 *
 * @returns Array of cube meshes
 */
export function addCubes(scene, material, numberOfCubes = 200, perf = true) {
  if (
    scene === undefined ||
    material === undefined ||
    !isNumber(numberOfCubes)
  ) {
    throw new Error("Invalid arguments passed to addCubes");
  }

  perf && console.time("cubes");

  const cubes = Array(numberOfCubes);
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

  perf && console.timeEnd("cubes");

  return cubes;
}

export function addCamera(scene, size, fov = 45) {
  if (
    scene === undefined ||
    !size.hasOwnProperty("width") ||
    !size.hasOwnProperty("height") ||
    !isNumber(size.width) ||
    !isNumber(size.height) ||
    !isNumber(fov)
  ) {
    throw new Error("Invalid arguments passed to addCamera");
  }

  const aspectRatio = size.width / size.height;
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.01, 100);
  camera.position.set(-50, 30, 30);
  gsap.to(camera.position, { duration: 2, x: -5.54, y: 0.07, z: 6.85 });
  scene.add(camera);

  return camera;
}

/**
 * Adds 3D text in the center of the scene.
 *
 * @param scene is THREE.Scene.
 * @param material is instance of THREE.Material.
 * @param text is string to to add to the scene.
 */
export function addText(scene, material, text = "109149") {
  const fontLoader = new THREE.FontLoader();
  const textGeometry = new THREE.TextGeometry(text, {
    font: new THREE.Font(font),
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
  scene.add(textMesh);
}

function isNumber(n) {
  return typeof n === "number" && !Number.isNaN(n);
}
