import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// General const and vars
// Window Size

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const sizes = {
    width: windowWidth,
    height: windowHeight
}


// GUI
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



// Textures
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Fonts
const fontPath  = '../static/Chakra Petch_Bold.json';
const fontLoader = new FontLoader()
fontLoader.load(
    fontPath,
    (font) => {
        const textGeometry = new TextGeometry(
            'Three.js \n by André',
            {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        textGeometry.computeBoundingBox()
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture
        })
        
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
        console.log('font loaded successfully')
    }
);

// Mouse

const mouse = new THREE.Vector2()
/////////////////////////////////////////////
// Geometry
let cubeGeometry = new THREE.DodecahedronGeometry( .5, 0 ); // Adjust the radius as needed

// let cubeGeometry = new THREE.SphereGeometry(0.25, 32, 32); // Adjust the radius as needed

// Create a matrix and apply rotation and scale transformations
let transformationMatrix = new THREE.Matrix4();
transformationMatrix.makeRotationZ(Math.PI / 4);
// transformationMatrix.scale(1, 2, 1); // optional

//Apply the matrix to the geometry
cubeGeometry.applyMatrix4(transformationMatrix);

//Ensure the geometry is properly updated
cubeGeometry.verticesNeedUpdate = true;
cubeGeometry.computeBoundingSphere();

// Material
const material = new THREE.MeshMatcapMaterial( {
    normalScale: new THREE.Vector2( 0.15, 0.15 ),
    matcap: matcapTexture
} );

// Mesh
const cube = new THREE.Mesh( cubeGeometry, material );
// Add the mesh to the scene
scene.add(cube);;
// //////////////////////////////

// Particles

const particlesGeometry = new THREE.BufferGeometry()
const particlesCount = 3000
const positions = new Float32Array(particlesCount * 3)
for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
const particleTexture = textureLoader.load('/textures/5.png')

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    color: '#ffffff',//ff88cc
    transparent: true,
    alphaMap: particleTexture,
    alphaTest: 0.001,
    depthTest: false,
    vertexColors: false,
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

// LIGHTS
let particleLight;

particleLight = new THREE.Mesh(
    new THREE.SphereGeometry( .05, 8, 8 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );
scene.add( particleLight );
particleLight.add( new THREE.PointLight( 0xffffff, 2 ) );

const ambientLight = new THREE.AmbientLight(0xffffff, 10)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 10)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
camera.position.z = 5
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true
controls.update()
// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// controls.dampingFactor = 0.25; // reduce the damping factor to decrease the damping effect
// controls.screenSpacePanning = false;
// controls.maxPolarAngle = Math.PI / 2; // limit vertical rotation

// Add the controls to the scene


// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener()
const sound = new THREE.Audio(listener);
camera.add( listener );


// load a sound and set it as the Audio object's buffer
let audioLoader = new THREE.AudioLoader();


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})


// Update renderer size
renderer.setSize(sizes.width, sizes.height)

// const button = document.querySelector('button');


// const overlay = document.getElementsByClassName('overlay__inner')[0];


// // Add the click event listener

// button.addEventListener('click', () => {
//     // load a sound and set it as the Audio object's buffer
//     // Remove button
//     overlay.remove();
//     initAudio(audioLoader);
//     button.remove();
// })    


// Function to initialize audio
function initAudio(audioLoader) {
    const audioUrl = '/sound.wav'; // Append a timestamp as a cache-busting parameter
    audioLoader.load(audioUrl, function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });
}

// Update mouse coordinates on mouse move
document.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates to the range [-1, 1]
    mouse.x = -(event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    
})



// Set initial mouse position and mesh location
document.addEventListener('DOMContentLoaded', () => {
    mouse.x = 0
    mouse.y = 0
    cube.position.x = mouse.x
    cube.position.y = mouse.y
    // DOM is loaded, initialize audio
    // initAudio(audioLoader);
})



let cubitos = []
let cubotes = []
let lists = []
lists.push(cubitos)
lists.push(cubotes)
let sense =1
for (let k in lists) {

    for (let i = 0; i < 100; i++) {
        const donutMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture
        })
        const cubito = new THREE.Mesh(cubeGeometry, donutMaterial)
        cubito.position.x = ((Math.random() - 0.5) * 10) * sense
        cubito.position.y = ((Math.random() - 0.5) * 10) * sense
        cubito.position.z = ((Math.random() - 0.5) * 10) * sense
        lists[k].push(cubito)
        scene.add(cubito) 

    }
}


 
function rotateCubito(){
    for (let j = 0; j < lists.length; j++){
        const list = lists[j];
        for (let i = 0; i < list.length; i++) {
            gsap.to(list[i].rotation, { duration: 1, y: mouse.y * Math.PI * 2 , x: mouse.x * Math.PI * 2 });
        }
    }
}

function moveCubito(){
    const time = performance.now() * 0.0009; // Use time for animation
    let amplitude = 2.5; // Adjust the amplitude of the movement
    let sense =1
    for (let j = 0; j < 2; j++){
        const list = lists[j];
        for (let i = 0; i < list.length; i++) {
            const offsetX = (Math.sin(time + i * .1) * amplitude) * sense; // Adjust the speed of the movement
            const offsetY = Math.cos(time + i * .1) * amplitude;
            const offsetZ = Math.sin(time + i * .1) * amplitude;
            gsap.to(list[i].position, { duration: 1, x: offsetX, y: offsetY , z: offsetZ});
        }
        sense = -1
    }
    amplitude = .05;
    const offsetX = (Math.sin(time + Math.random() - 0.5 * 10) * amplitude) * sense; // Adjust the speed of the movement
    const offsetY = (Math.cos(time + Math.random() - 0.5 * 10) * amplitude * sense);
    const offsetZ = Math.sin(time + Math.random() - 0.5 * 10) * amplitude;
    gsap.to(particles.position , { duration: 2, x: offsetX, y: offsetY , z: offsetZ})


}
function rotate(){
    gsap.to(cube.rotation, { duration: 1, y: mouse.y * Math.PI * 2 , x: mouse.x * Math.PI * 2 })
}

function move (){
    gsap.to(cube.position, { duration: 2, x: mouse.x * 4, y: mouse.y * 4 })

}
// Clock
// const clock = new THREE.Clock();

const tick = () => {
    rotateCubito();
    moveCubito();
    rotate();
    move();

    // Render
    renderer.render(scene, camera);
    controls.update()


    window.requestAnimationFrame(tick);
};

tick();
