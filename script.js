document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP with all plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);
  
    // Enhanced Cursor Effect with 3D perspective
    const cursor = document.querySelector('.cursor');
    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    cursor.appendChild(cursorInner);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // 3D tilt effect based on mouse velocity
        const velocityX = Math.min(Math.max(e.movementX / 10, -10), 10);
        const velocityY = Math.min(Math.max(e.movementY / 10, -10), 10);
        
        gsap.to(cursorInner, {
            rotationX: velocityY * -1,
            rotationY: velocityX,
            transformPerspective: 1000,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        });
    });
  
    // Enhanced hover effect for interactive elements
    document.querySelectorAll('a, button, .clickable').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2.5,
                backgroundColor: "rgba(255,255,255,0.7)",
                duration: 0.3
            });
            gsap.to(cursorInner, {
                scale: 0.5,
                backgroundColor: "rgba(255,255,255,0.9)",
                duration: 0.3
            });
            
            // Add 3D pop effect to the hovered element
            gsap.to(el, {
                z: 50,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "back.out(2)"
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "rgba(255,255,255,0.2)",
                duration: 0.3
            });
            gsap.to(cursorInner, {
                scale: 1,
                backgroundColor: "rgba(255,255,255,0.5)",
                duration: 0.3
            });
            
            // Reset 3D effect
            gsap.to(el, {
                z: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });
  
    // Advanced Parallax Effect with Depth Layers
    const parallaxLayers = gsap.utils.toArray('.parallax-layer');
    parallaxLayers.forEach((layer, i) => {
        const depth = i * 100; // Deeper layers move more
        gsap.to(layer, {
            y: depth,
            scrollTrigger: {
                trigger: 'body',
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });
        
        // Add subtle 3D rotation on scroll
        gsap.to(layer, {
            rotationX: i * 0.5,
            rotationY: i * 0.3,
            scrollTrigger: {
                trigger: 'body',
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });
    });
  
    // 3D Header Animation with Perspective
    gsap.from('.logo', {
        opacity: 0,
        y: -100,
        z: -200,
        rotationX: 45,
        transformPerspective: 1000,
        duration: 1.5,
        ease: "back.out(2)"
    });
  
    gsap.from('.nav-link', {
        opacity: 0,
        y: -80,
        z: -150,
        rotationY: 30,
        transformPerspective: 800,
        duration: 1,
        stagger: 0.15,
        delay: 0.5,
        ease: "back.out(1.7)"
    });
  
    // 3D About Us Section with Depth
    gsap.from('.about-us img', {
        scrollTrigger: {
            trigger: '.about-us',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        x: -200,
        z: -300,
        rotationY: -30,
        opacity: 0,
        duration: 1.2,
        transformPerspective: 1000,
        ease: "power3.out"
    });
  
    gsap.from('.about-us h2, .about-us p', {
        scrollTrigger: {
            trigger: '.about-us',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        x: 200,
        z: -300,
        rotationY: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        transformPerspective: 1000,
        ease: "power3.out"
    });
  
    // Advanced 3D Service Cards with Parallax
    const serviceCards = gsap.utils.toArray('.service-card');
    serviceCards.forEach((card, i) => {
        // Initial animation
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 150,
            z: -300,
            rotationX: 20,
            opacity: 0,
            duration: 1,
            transformPerspective: 1000,
            ease: "back.out(1.5)",
            delay: i * 0.1
        });
        
        // Parallax effect on scroll
        gsap.to(card, {
            y: i % 2 === 0 ? -50 : -30,
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Enhanced 3D hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 15;
            const angleY = (centerX - x) / 15;
            
            const posX = (x - centerX) / 20;
            const posY = (y - centerY) / 20;
            
            gsap.to(card, {
                rotationX: angleX,
                rotationY: angleY,
                x: posX,
                y: posY,
                z: 50,
                transformPerspective: 800,
                ease: "power2.out",
                duration: 0.5
            });
            
            // Add light reflection effect
            gsap.to(card.querySelector('.card-reflection'), {
                opacity: 0.8,
                x: posX * 2,
                y: posY * 2,
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                x: 0,
                y: 0,
                z: 0,
                ease: "elastic.out(1, 0.3)",
                duration: 1.2
            });
            
            gsap.to(card.querySelector('.card-reflection'), {
                opacity: 0,
                duration: 0.5
            });
        });
    });
  
    // 3D Carousel with Depth Animation
    gsap.from('.carousel-item', {
        scrollTrigger: {
            trigger: '#our-team',
            start: "top 75%",
            toggleActions: "play none none none"
        },
        y: 100,
        z: -400,
        rotationY: (i) => i % 2 === 0 ? -30 : 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        transformPerspective: 1000,
        ease: "back.out(1.5)"
    });
    
    // Add continuous subtle rotation on hover
    document.querySelectorAll('.carousel-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                rotationY: 5,
                y: -10,
                z: 20,
                duration: 0.5,
                transformPerspective: 1000,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.killTweensOf(item);
            gsap.to(item, {
                rotationY: 0,
                y: 0,
                z: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });
  
    // 3D Timeline with Depth Effect
    const timelineItems = gsap.utils.toArray('.timeline-item');
    timelineItems.forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            x: i % 2 === 0 ? -200 : 200,
            z: -500,
            rotationY: i % 2 === 0 ? -45 : 45,
            opacity: 0,
            duration: 1.2,
            transformPerspective: 1000,
            ease: "back.out(1.7)"
        });
        
        // Add continuous floating animation
        gsap.to(item, {
            y: 10,
            duration: 3 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
  
    // Video Section with 3D Perspective
    gsap.from('.video-container', {
        scrollTrigger: {
            trigger: '#our-video',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        scale: 0.5,
        z: -600,
        rotationX: 20,
        opacity: 0,
        duration: 1.5,
        transformPerspective: 1200,
        ease: "elastic.out(1, 0.5)"
    });
    
    // Add hover effect to make video pop out
    document.querySelector('.video-container').addEventListener('mouseenter', () => {
        gsap.to('.video-container', {
            z: 100,
            scale: 1.05,
            duration: 0.5,
            transformPerspective: 1200,
            ease: "power2.out"
        });
    });
    
    document.querySelector('.video-container').addEventListener('mouseleave', () => {
        gsap.to('.video-container', {
            z: 0,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        });
    });
  
    // 3D Footer Animation
    gsap.from('.footer h4, .footer p, .social-icons', {
        scrollTrigger: {
            trigger: '.footer',
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 100,
        z: -300,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        transformPerspective: 1000,
        ease: "back.out(1.2)"
    });
    
    // Add floating animation to social icons
    gsap.utils.toArray('.social-icons a').forEach((icon, i) => {
        gsap.to(icon, {
            y: 15,
            duration: 2 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
  
    // Enhanced Gender Toggle with 3D Flip
    const menBtn = document.getElementById('menBtn');
    const womenBtn = document.getElementById('womenBtn');
    const menServices = document.querySelectorAll('.service-card.men');
    const womenServices = document.querySelectorAll('.service-card.women');
  
    function toggleServices(show, hide, activeBtn, inactiveBtn) {
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
        
        // 3D flip out animation for hiding elements
        gsap.to(hide, {
            rotationY: 90,
            opacity: 0,
            duration: 0.5,
            transformPerspective: 1000,
            ease: "power2.in",
            onComplete: () => {
                hide.forEach(service => service.classList.add('hidden'));
            }
        });
        
        // 3D flip in animation for showing elements
        show.forEach(service => service.classList.remove('hidden'));
        gsap.fromTo(show, 
            { rotationY: -90, opacity: 0 },
            { 
                rotationY: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                transformPerspective: 1000,
                ease: "back.out(1.5)"
            }
        );
    }
  
    menBtn.addEventListener('click', () => toggleServices(menServices, womenServices, menBtn, womenBtn));
    womenBtn.addEventListener('click', () => toggleServices(womenServices, menServices, womenBtn, menBtn));
  
    // Advanced Floating Animation with 3D Waves
    function floatAnimation() {
        serviceCards.forEach((card, index) => {
            const duration = 3 + Math.random() * 2;
            const y = 15 + Math.random() * 15;
            const x = 5 + Math.random() * 10;
            const rot = 2 + Math.random() * 5;
            
            gsap.to(card, {
                y: y,
                x: index % 2 === 0 ? x : -x,
                rotationZ: index % 2 === 0 ? rot : -rot,
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.2
            });
        });
    }
    floatAnimation();
  
    // Add 3D tilt effect to the whole page on scroll
    // gsap.to("body", {
    //     rotationX: -2,
    //     rotationY: 1,
    //     scrollTrigger: {
    //         trigger: "body",
    //         start: "top top",
    //         end: "bottom bottom",
    //         scrub: 1
    //     },
    //     transformPerspective: 2000,
    //     ease: "none"
    // });
    
    // Add depth to scrollbar
    gsap.to(".scrollbar-thumb", {
        scaleX: 1.5,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        },
        transformOrigin: "left center",
        transformPerspective: 1000
    });
  });