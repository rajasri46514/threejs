import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'



const raycaster = new THREE.Raycaster();
const textureLoader = new THREE.TextureLoader();
const loader = new FBXLoader();


const scene = new THREE.Scene()

/////////////////////////////////////// Camera setup //////////////////////////////////////////

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0.045,0.009,2.797);
camera.rotation.set(0,0,0);
camera.scale.set(1,1,1);
scene.add(camera);

////////////////////////////////////////Light Setup///////////////////////////////////////////

const ambientLight = new THREE.AmbientLight(0xffffff, 5); 
const hemisphereLight = new THREE.HemisphereLight(0x0092db, 0xffaa00, 5); 
hemisphereLight.position.set(0,10,0);

scene.add(hemisphereLight);
scene.add(ambientLight);
/////////////////////////////////////// Room Setup ////////////////////////////////////////////

const roomwallsprite = textureLoader.load('Textures/Roomwall.png');
const wallmat = new THREE.SpriteMaterial({ map: roomwallsprite });
wallmat.vertexColors = true;
const sprite = new THREE.Sprite(wallmat);
sprite.position.set(0, 0, 0);
sprite.scale.set(screen.width, screen.height, 5);
sprite.renderOrder = 1;
scene.add(sprite);

const leftsidewall = textureLoader.load('Textures/left.png');
const leftsidewallmat = new THREE.SpriteMaterial({ map: leftsidewall });
const sprite1 = new THREE.Sprite(leftsidewallmat);
sprite1.position.set(-3.2, 0.1, 0);
sprite1.scale.set(0.250, 3.100, 1);
sprite1.renderOrder = 2;
scene.add(sprite1);

const rightsidewall = textureLoader.load('Textures/Right.png');
const rightsidewallmat = new THREE.SpriteMaterial({ map: rightsidewall });
const sprite2 = new THREE.Sprite(rightsidewallmat);
sprite2.position.set(3.3, 0.1, 0);
sprite2.scale.set(0.250, 3.100, 1);
sprite2.renderOrder = 2;
scene.add(sprite2);

const Floor = textureLoader.load('Textures/floor.png');
const Floormat = new THREE.SpriteMaterial({ map: Floor });
const sprite3 = new THREE.Sprite(Floormat);
sprite3.position.set(0, -1.375, 0);
sprite3.scale.set(screen.width, 1, 1);
sprite3.renderOrder = 1;
scene.add(sprite3);

/////////////////////////////////////// Table model /////////////////////////////////////////

loader.load('Models/FBX/Table.fbx', (fbx) => {
    scene.add(fbx); 
    const table = fbx;
    table.position.set(-0.519,-1.051,0.801);
    table.rotation.set(0,0,0);
    table.scale.set(0.01,0.01,0.01);
  });
/////////////////////////////////////// Leftside models////////////////////////////////////////
loader.load('Models/FBX/Idle.fbx', (fbx) => {
    scene.add(fbx); 
    const table = fbx;
    table.position.set(-0.519,-1.55,0.801);
    table.rotation.set(0,0,0);
    table.scale.set(0.02,0.02,0.02);
  });
////////////////////////////////////// rendering of webgl////////////////////////////////////////////////

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
function render() {
    renderer.render(scene, camera)
}
function animate() {
    requestAnimationFrame(animate)

    render()
}
animate()

