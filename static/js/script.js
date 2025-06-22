document.addEventListener('DOMContentLoaded', function() {
    function initHeroAnimation() {
        if (typeof THREE === 'undefined' || typeof THREE.EffectComposer === 'undefined') return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        camera.position.z = 70;
        
        const composer = new THREE.EffectComposer(renderer);
        composer.addPass(new THREE.RenderPass(scene, camera));
        const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.5, 0);
        composer.addPass(bloomPass);

        const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending });
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(15, 5), coreMaterial);
        scene.add(core);

        const particles = [];
        for (let i = 0; i < 1500; i++) {
            const radius = Math.random() * 50 + 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const particle = new THREE.Vector3();
            particle.x = radius * Math.sin(phi) * Math.cos(theta);
            particle.y = radius * Math.sin(phi) * Math.sin(theta);
            particle.z = radius * Math.cos(phi);
            particles.push(particle);
        }
        const particleGeometry = new THREE.BufferGeometry().setFromPoints(particles);
        const particleMaterial = new THREE.PointsMaterial({ color: 0x0ea5e9, size: 0.3, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.5 });
        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particleSystem);

        const mouse = new THREE.Vector2();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = Date.now() * 0.0001;
            core.rotation.y = elapsedTime * 0.2;
            core.rotation.x = elapsedTime * 0.1;
            particleSystem.rotation.y = -elapsedTime * 0.04;
            camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            composer.render();
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        }, false);
        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }, false);
        
        animate();
    }
    
    initHeroAnimation();

    const animatedElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
    
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});
