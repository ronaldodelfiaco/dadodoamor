import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. Configuração da Cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Controles de Órbita (para mover a câmera)
const controls = new OrbitControls(camera, renderer.domElement);

// 3. Posição da câmera
camera.position.z = 5;
controls.update();

// 4. Texturas
const textureLoader = new THREE.TextureLoader();
const textures = [
    textureLoader.load('./images/face1.png'),
    textureLoader.load('./images/face2.png'),
    textureLoader.load('./images/face3.png'),
    textureLoader.load('./images/face4.png'),
    textureLoader.load('./images/face5.png'),
    textureLoader.load('./images/face6.png')
];

// 5. Geometria e Material do Dado
const geometry = new THREE.BoxGeometry(2, 2, 2);
const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
const dice = new THREE.Mesh(geometry, materials);
scene.add(dice);

// 6. Variáveis de Animação
let isRolling = false;
let rotationSpeedX = 0;
let rotationSpeedY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;

// 7. Função para gerar um número aleatório
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 8. Função para lançar o dado
function rollDice() {
    if (!isRolling) {
        isRolling = true;
        rotationSpeedX = (Math.random() * 0.2) + 0.1;
        rotationSpeedY = (Math.random() * 0.2) + 0.1;

        targetRotationX = (Math.random() * 2 + 2) * Math.PI;
        targetRotationY = (Math.random() * 2 + 2) * Math.PI;

        currentRotationX = dice.rotation.x;
        currentRotationY = dice.rotation.y;

        // Aqui você poderia verificar qual número do dado foi sorteado com base no targetRotation
        // Se necessario, chame aqui a lógica para ativar o texto ou a parte da interface que precisa
        // Se o targetRotationX for 1 volta = a 6 ou a 1, por exemplo, ai você faria uma regra
    }
    //document.getElementById('roll-button').disabled = true;
}

// 9. Evento de Clique para Lançar o Dado (no botão)
const rollButton = document.getElementById('roll-button');
rollButton.addEventListener('click', rollDice);

// 10. Evento de redimensionamento da janela
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// 11. Animação
function animate() {
    requestAnimationFrame(animate);

    if (isRolling) {
        dice.rotation.x += rotationSpeedX;
        dice.rotation.y += rotationSpeedY;

        if (dice.rotation.x >= currentRotationX + targetRotationX) {
            dice.rotation.x = currentRotationX + targetRotationX;
            rotationSpeedX = 0;
        }

        if (dice.rotation.y >= currentRotationY + targetRotationY) {
            dice.rotation.y = currentRotationY + targetRotationY;
            rotationSpeedY = 0;
        }

        if (rotationSpeedX === 0 && rotationSpeedY === 0) {
            isRolling = false;
        }
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

/*

referencias:
https://tympanus.net/codrops/2023/01/25/crafting-a-dice-roller-with-three-js-and-cannon-es/



const textures = [
    textureLoader.load('face1.png'),
    textureLoader.load('face2.png'),
    textureLoader.load('face3.png'),
    textureLoader.load('face4.png'),
    textureLoader.load('face5.png'),
    textureLoader.load('face6.png')
];


*/


