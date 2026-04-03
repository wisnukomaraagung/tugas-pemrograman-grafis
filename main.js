// ==============================
// SETUP SCENE
// ==============================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load texture
const loader = new THREE.TextureLoader();

// ==============================
// CLASS (Constructor)
// ==============================
class Shape3D {
    constructor(geometry, texturePath, posX) {
        // Load texture
        const texture = loader.load(texturePath);

        // Material beda tiap objek
        const material = new THREE.MeshBasicMaterial({ map: texture });

        // Mesh
        this.mesh = new THREE.Mesh(geometry, material);

        // Posisi
        this.mesh.position.x = posX;

        // Tambahkan ke scene
        scene.add(this.mesh);
    }
}

// ==============================
// 6 BENTUK PRIMITIF
// ==============================

// 1. Sphere
new Shape3D(
    new THREE.SphereGeometry(0.8, 32, 32),
    'texture1.jpg',
    -5
);

// 2. Cone
new Shape3D(
    new THREE.ConeGeometry(0.7, 1.5, 32),
    'texture2.jpg',
    -3
);

// 3. Cylinder
new Shape3D(
    new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
    'texture3.jpg',
    -1
);

// 4. Lathe (BUTUH POINTS)
const points = [];
for (let i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 0.5 + 0.5, (i - 5) * 0.2));
}

new Shape3D(
    new THREE.LatheGeometry(points),
    'texture4.jpg',
    1
);

// 5. Octahedron
new Shape3D(
    new THREE.OctahedronGeometry(0.8),
    'texture5.jpg',
    3
);

// 6. TorusKnot
new Shape3D(
    new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16),
    'texture6.jpg',
    5
);

// Posisi kamera
camera.position.z = 6;

// ==============================
// ANIMASI
// ==============================
function animate() {
    requestAnimationFrame(animate);

    scene.children.forEach(obj => {
        if (obj instanceof THREE.Mesh) {
            obj.rotation.x += 0.01;
            obj.rotation.y += 0.01;
        }
    });

    renderer.render(scene, camera);
}

animate();

// ==============================
// RESPONSIVE
// ==============================
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});