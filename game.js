// Main Game Engine & Controller for Parliament Smackdown

class GameEngine {
    constructor() {
        this.canvas = document.getElementById('battleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.frame = 0;
        this.autoFight = false;
        this.matchOver = false;

        // Canvas dimensions
        this.width = 960;
        this.height = 540;
        this.groundY = 430;

        // Fighter 1: Narendra Modi
        this.modi = {
            name: 'Narendra Modi',
            x: 260,
            y: this.groundY,
            vx: 0,
            vy: 0,
            health: 100,
            maxHealth: 100,
            superMeter: 40,
            state: 'idle',
            stateTimer: 0,
            facingRight: 1,
            tripInPothole: false
        };

        // Fighter 2: Donald Trump
        this.trump = {
            name: 'Donald Trump',
            x: 700,
            y: this.groundY,
            vx: 0,
            vy: 0,
            health: 100,
            maxHealth: 100,
            superMeter: 20,
            state: 'idle',
            stateTimer: 0,
            facingRight: -1,
            tripInPothole: false,
            isFlattened: false
        };

        // Referee: Yogi Adityanath
        this.yogi = {
            x: 480,
            y: 350,
            targetX: 480,
            state: 'idle',
            timer: 0,
            dialogue: "Rules follow karo, warna JCB garage se nikal aayegi!"
        };

        // JCB / Bulldozer Finisher Sequence
        this.jcb = {
            active: false,
            x: 1100,
            y: this.groundY,
            targetX: 680,
            speed: 5.5,
            scoopAngle: 0,
            phase: 'idle', // 'enter', 'scoop', 'bulldoze', 'dump', 'finished'
            timer: 0
        };

        // Nitin Gadkari Highway & Pothole Event
        this.gadkariEvent = {
            active: false,
            potholeX: 520,
            potholeY: this.groundY,
            timer: 0,
            dialogue: "Rukiye! Is pothole ki chinta mat kijiye! Hamara E-20 Ethanol Petrol gaadiyon ko butter jaisa smooth chalata hai!"
        };

        // Rahul Gandhi Ringside Spectator
        this.rahul = {
            x: 100,
            y: 470,
            cheering: false,
            cheerTimer: 0,
            currentQuote: "Maza Aaya! Ye fight bohot zabardast chal rahi hai!"
        };

        // Interactive Comic Floaters & Particles
        this.particles = [];
        this.floatingTexts = [];

        // Commentary Ticker
        this.commentaryList = [
            "🎙️ ROUND 1: Grand Clash in Parliament Smackdown Ring!",
            "🔥 Modi warms up his 56-inch chest power!",
            "📢 Trump promises a wall around the ring!",
            "⚖️ Referee Yogi is strictly monitoring fouls!",
            "🍿 Rahul Gandhi is enjoying his butter popcorn ringside!",
            "⚡ Nitin Gadkari is inspecting national highways nearby!"
        ];
        this.activeCommentary = "🎙️ ROUND 1: Grand Clash in Parliament Smackdown Ring!";

        // Sound Engine reference
        this.sound = window.soundEngine;
        this.charRenderer = window.characterRenderer;

        // Auto random event timers
        this.potholeCooldown = 400;

        this.initEventListeners();
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Start Loop
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resize() {
        const container = document.getElementById('canvas-wrapper');
        if (container) {
            const aspect = 960 / 540;
            const w = Math.min(container.clientWidth, 960);
            this.canvas.style.width = `${w}px`;
            this.canvas.style.height = `${w / aspect}px`;
        }
    }

    initEventListeners() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            if (this.matchOver && e.code !== 'KeyR') return;

            switch (e.code) {
                case 'KeyA':
                case 'ArrowLeft':
                    this.moveModi(-1);
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.moveModi(1);
                    break;
                case 'KeyJ':
                    this.modiAttack('punch');
                    break;
                case 'KeyK':
                    this.modiAttack('kick');
                    break;
                case 'KeyL':
                    this.modiAttack('special');
                    break;
                case 'Space':
                    this.triggerBulldozerFinisher();
                    break;
                case 'KeyP':
                    this.triggerPotholeEvent();
                    break;
                case 'KeyR':
                    this.resetMatch();
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (['KeyA', 'KeyD', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                this.modi.vx = 0;
                if (this.modi.state === 'walk') this.modi.state = 'idle';
            }
        });

        // Touch & UI Button triggers
        this.bindButton('btn-punch', () => this.modiAttack('punch'));
        this.bindButton('btn-kick', () => this.modiAttack('kick'));
        this.bindButton('btn-special', () => this.modiAttack('special'));
        this.bindButton('btn-chest56', () => this.modiAttack('chest56'));
        this.bindButton('btn-jcb', () => this.triggerBulldozerFinisher());
        this.bindButton('btn-pothole', () => this.triggerPotholeEvent());
        this.bindButton('btn-rahul', () => this.triggerRahulReaction());
        this.bindButton('btn-whistle', () => this.triggerYogiWhistle());
        this.bindButton('btn-auto', () => this.toggleAutoFight());
        this.bindButton('btn-sound', () => this.toggleSound());
        this.bindButton('btn-reset', () => this.resetMatch());
    }

    bindButton(id, handler) {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                handler();
            });
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                handler();
            }, { passive: false });
        }
    }

    toggleSound() {
        const enabled = this.sound.toggleSound();
        const btn = document.getElementById('btn-sound');
        if (btn) {
            btn.textContent = enabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
            btn.classList.toggle('active', enabled);
        }
    }

    toggleAutoFight() {
        this.autoFight = !this.autoFight;
        const btn = document.getElementById('btn-auto');
        if (btn) {
            btn.textContent = this.autoFight ? '🍿 Auto Binge: ON' : '🕹️ Auto Binge: OFF';
            btn.classList.toggle('active', this.autoFight);
        }
        this.setCommentary(this.autoFight ? "🍿 Auto Mode Activated! Grab your popcorn and enjoy the cartoon brawl!" : "🕹️ Player Mode: You are now in full control of Modi ji!");
    }

    setCommentary(text) {
        this.activeCommentary = text;
        const el = document.getElementById('live-commentary-text');
        if (el) {
            el.innerHTML = text;
            el.classList.remove('pulse-text');
            void el.offsetWidth; // Trigger reflow
            el.classList.add('pulse-text');
        }
    }

    addFloatingText(text, x, y, color = '#ffcc00', size = 28) {
        this.floatingTexts.push({
            text,
            x,
            y,
            vy: -2.5,
            alpha: 1,
            color,
            size,
            scale: 0.4
        });
    }

    addHitParticles(x, y, count = 12, color = '#ffaa00') {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 5;
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                color,
                radius: 3 + Math.random() * 4,
                alpha: 1,
                decay: 0.03
            });
        }
    }

    moveModi(dir) {
        if (this.modi.state === 'punch' || this.modi.state === 'kick' || this.modi.state === 'hurt' || this.modi.tripInPothole) return;
        this.modi.vx = dir * 4;
        this.modi.state = 'walk';
    }

    modiAttack(type) {
        if (this.matchOver || this.modi.tripInPothole) return;
        if (this.modi.state === 'punch' || this.modi.state === 'kick' || this.modi.state === 'special' || this.modi.state === 'chest56') return;

        this.modi.state = type;
        this.modi.stateTimer = 22;
        this.modi.vx = 0;

        if (type === 'punch') {
            this.sound.playHit();
            this.setCommentary("🥊 Modi strikes with 56-Inch Punch!");
            this.checkHit(this.modi, this.trump, 12, "DHISHUM!", '#ff9900');
            this.modi.superMeter = Math.min(100, this.modi.superMeter + 10);
        } else if (type === 'kick') {
            this.sound.playHit();
            this.setCommentary("🧘 Modi executes high-altitude Yoga Kick!");
            this.checkHit(this.modi, this.trump, 16, "YOGA POW!", '#ffcc00');
            this.modi.superMeter = Math.min(100, this.modi.superMeter + 15);
        } else if (type === 'special') {
            this.sound.playSpecial();
            this.setCommentary("📢 Modi releases supersonic 'MITRON' shockwave!");
            this.checkHit(this.modi, this.trump, 24, "MITRONNN!!", '#ff3300');
            this.modi.superMeter = Math.max(0, this.modi.superMeter - 30);
            this.triggerRahulReaction("Khatakhat Khatakhat!");
        } else if (type === 'chest56') {
            this.sound.playSpecial();
            this.setCommentary("🛡️ Modi expands 56-Inch Chest barrier!");
            this.addFloatingText("56-INCH POWER!", this.modi.x, this.modi.y - 100, '#ff7700', 30);
            this.modi.superMeter = Math.min(100, this.modi.superMeter + 20);
        }

        this.updateHUD();
    }

    trumpAI() {
        if (this.matchOver || this.trump.tripInPothole || this.trump.isFlattened) return;

        // Simple funny AI
        const dist = Math.abs(this.modi.x - this.trump.x);

        if (this.trump.state === 'idle') {
            if (dist > 180) {
                // Walk toward Modi
                this.trump.x -= 2;
                this.trump.state = 'idle';
            } else if (Math.random() < 0.04) {
                // Trump attacks!
                const attackType = Math.random();
                if (attackType < 0.45) {
                    this.trump.state = 'punch';
                    this.trump.stateTimer = 20;
                    this.sound.playHit();
                    this.setCommentary("🗣️ Trump unleashes 'Tariff Slap'!");
                    this.checkHit(this.trump, this.modi, 9, "FAKE NEWS!", '#3388ff');
                } else if (attackType < 0.8) {
                    this.trump.state = 'special';
                    this.trump.stateTimer = 26;
                    this.sound.playSpecial();
                    this.setCommentary("🧱 Trump tries to build a Brick Wall!");
                    this.addFloatingText("TREMENDOUS WALL!", this.trump.x, this.trump.y - 90, '#ffd700', 24);
                    this.checkHit(this.trump, this.modi, 12, "TREMENDOUS!", '#ffd700');
                } else {
                    // Trump flips toupee
                    this.addFloatingText("GOLDEN HAIR FLIP!", this.trump.x, this.trump.y - 90, '#ffd700', 22);
                    this.sound.playWhistle();
                }
            }
        }

        // If Trump health is critical, prompt Bulldozer finisher!
        if (this.trump.health <= 25 && !this.jcb.active && !this.matchOver) {
            const btnJcb = document.getElementById('btn-jcb');
            if (btnJcb) btnJcb.classList.add('btn-glow-pulse');
            this.setCommentary("🚜 TRUMP IS DIZZY! YOGI JI IS REVVING UP THE JCB BULLDOZER! HIT THE BULLDOZER BUTTON!");
        }
    }

    checkHit(attacker, defender, damage, comicWord, color) {
        const dist = Math.abs(attacker.x - defender.x);
        if (dist < 150) {
            defender.health = Math.max(0, defender.health - damage);
            defender.state = 'hurt';
            defender.stateTimer = 16;
            defender.vx = attacker.facingRight * 6;

            this.addFloatingText(comicWord, defender.x, defender.y - 80, color, 34);
            this.addHitParticles(defender.x, defender.y - 50, 16, color);

            // Yogi checks the hit
            if (Math.random() < 0.3) {
                this.triggerYogiWhistle();
            }

            // Rahul cheers
            if (damage >= 15) {
                this.triggerRahulReaction();
            }

            // Check if Trump is finished
            if (this.trump.health <= 0 && !this.matchOver) {
                this.triggerBulldozerFinisher();
            }
        }
    }

    // ==========================================
    // SPECIAL EVENT 1: JCB BULLDOZER FINISHER
    // ==========================================
    triggerBulldozerFinisher() {
        if (this.jcb.active) return;
        this.jcb.active = true;
        this.jcb.x = 1100;
        this.jcb.targetX = this.trump.x + 20;
        this.jcb.phase = 'enter';
        this.jcb.timer = 0;

        // Yogi speaks
        this.yogi.state = 'summonJcb';
        this.yogi.dialogue = "Babaji ka Bulldozer tayyar hai! Donald Trump, ab tumhari khair nahi!";
        this.sound.playWhistle();
        this.sound.playBulldozer();

        this.setCommentary("🚜 WARNING: YOGI ADITYANATH HAS ENTERED WITH THE HIGH-POWER JCB BULLDOZER!");
        this.addFloatingText("BULLDOZER ACTION!", 500, 200, '#ffcc00', 44);

        // Rahul goes wild
        this.triggerRahulReaction("Maza Aaya! Bulldozer aa gaya!");
    }

    updateJcbFinisher() {
        if (!this.jcb.active) return;
        this.jcb.timer++;

        if (this.jcb.phase === 'enter') {
            this.jcb.x -= this.jcb.speed;
            if (this.jcb.x <= this.trump.x + 80) {
                this.jcb.phase = 'scoop';
                this.jcb.timer = 0;
                this.sound.playBulldozer();
            }
        } else if (this.jcb.phase === 'scoop') {
            this.jcb.scoopAngle = Math.sin(this.jcb.timer * 0.15) * 0.6;
            // Trump gets squashed & flattened!
            this.trump.isFlattened = true;
            this.trump.state = 'flattened';
            this.trump.x = this.jcb.x - 40;
            this.trump.health = 0;

            if (this.jcb.timer > 40) {
                this.jcb.phase = 'bulldoze';
                this.jcb.timer = 0;
                this.sound.playHit();
                this.addFloatingText("FLATTENED BY JCB!", this.trump.x, this.trump.y - 60, '#ff0033', 36);
            }
        } else if (this.jcb.phase === 'bulldoze') {
            // Push Trump off the screen to the left!
            this.jcb.x -= 8;
            this.trump.x -= 8;
            if (this.jcb.x < -150) {
                this.jcb.phase = 'finished';
                this.matchOver = true;
                this.modi.state = 'victory';
                this.sound.playFanfare();
                this.setCommentary("🏆 VICTORY! YOGI JI'S BULLDOZER HAS BANISHED TRUMP! MODI JI WINS THE GRAND SMACKDOWN!");
                this.addFloatingText("MODI JI VICTORIOUS!", 480, 200, '#00ff88', 42);
                this.triggerRahulReaction("Poore Desh Ko Maza Aaya!");
            }
        }
    }

    // ==========================================
    // SPECIAL EVENT 2: NITIN GADKARI & E20 POTHOLE
    // ==========================================
    triggerPotholeEvent() {
        if (this.gadkariEvent.active) return;
        this.gadkariEvent.active = true;
        this.gadkariEvent.timer = 0;
        this.gadkariEvent.potholeX = (this.modi.x + this.trump.x) / 2;

        this.sound.playPothole();
        this.setCommentary("🚧 POTHOLE ALERT ON RING HIGHWAY! Shri Nitin Gadkari arriving with E-20 Petrol Solution!");
        this.addFloatingText("POTHOLE DETECTED!", this.gadkariEvent.potholeX, this.groundY - 60, '#ff5500', 30);

        // Make Trump trip in pothole
        this.trump.tripInPothole = true;
        this.trump.state = 'hurt';
        this.trump.stateTimer = 60;
        this.trump.health = Math.max(5, this.trump.health - 15);

        // Make Rahul laugh
        this.triggerRahulReaction("Pothole mein gir gaye! Hahaha!");
    }

    updateGadkariEvent() {
        if (!this.gadkariEvent.active) return;
        this.gadkariEvent.timer++;

        // Gadkari stays for 180 frames (approx 3 seconds)
        if (this.gadkariEvent.timer === 60) {
            // E20 Petrol heal benefit!
            this.modi.health = Math.min(100, this.modi.health + 15);
            this.modi.superMeter = 100;
            this.addFloatingText("+15 HP (E-20 GREEN BIOFUEL!)", this.modi.x, this.modi.y - 90, '#00ff66', 26);
            this.sound.playSpecial();
        }

        if (this.gadkariEvent.timer > 240) {
            this.gadkariEvent.active = false;
            this.trump.tripInPothole = false;
            this.setCommentary("🛣️ Nitin Gadkari: 'E-20 petrol makes your engine powerful & highways pothole-free!'");
        }
    }

    // ==========================================
    // SPECIAL EVENT 3: RAHUL GANDHI REACTION
    // ==========================================
    triggerRahulReaction(customQuote) {
        this.rahul.cheering = true;
        this.rahul.cheerTimer = 70;
        const quotes = [
            "Maza Aaya!",
            "Ye jo maza hai, main poore desh ko dena chahta hoon!",
            "Khatakhat Khatakhat entertainment!",
            "10 out of 10 match chal raha hai!",
            "Popcorn khatam, entertainment jari!"
        ];
        this.rahul.currentQuote = customQuote || quotes[Math.floor(Math.random() * quotes.length)];
        this.sound.playLaugh();
        this.addFloatingText(this.rahul.currentQuote, this.rahul.x + 30, this.rahul.y - 90, '#ffff33', 20);
    }

    // ==========================================
    // YOGI REFEREE ACTIONS
    // ==========================================
    triggerYogiWhistle() {
        this.yogi.state = 'whistle';
        this.yogi.timer = 50;
        const warnings = [
            "FOUL! Cheating nahi chalegi!",
            "Ring ke andar shaanti banaye rakhein!",
            "Referee ka faisla aakhri faisla hai!",
            "Dono door hato, warna JCB bulani padegi!"
        ];
        this.yogi.dialogue = warnings[Math.floor(Math.random() * warnings.length)];
        this.sound.playWhistle();
        this.addFloatingText("FWEET! FOUL!", this.yogi.x, this.yogi.y - 80, '#ffff00', 30);
    }

    resetMatch() {
        this.matchOver = false;
        this.modi.health = 100;
        this.modi.superMeter = 40;
        this.modi.state = 'idle';
        this.modi.x = 260;
        this.modi.vx = 0;
        this.modi.tripInPothole = false;

        this.trump.health = 100;
        this.trump.superMeter = 20;
        this.trump.state = 'idle';
        this.trump.x = 700;
        this.trump.vx = 0;
        this.trump.tripInPothole = false;
        this.trump.isFlattened = false;

        this.jcb.active = false;
        this.jcb.x = 1100;
        this.jcb.phase = 'idle';

        this.gadkariEvent.active = false;
        this.yogi.state = 'idle';

        const btnJcb = document.getElementById('btn-jcb');
        if (btnJcb) btnJcb.classList.remove('btn-glow-pulse');

        this.setCommentary("🔥 MATCH RESET! Narendra Modi vs Donald Trump - FIGHT!");
        this.updateHUD();
    }

    updateHUD() {
        const modiBar = document.getElementById('modi-health-bar');
        const trumpBar = document.getElementById('trump-health-bar');
        const modiMeter = document.getElementById('modi-super-bar');

        if (modiBar) modiBar.style.width = `${Math.max(0, this.modi.health)}%`;
        if (trumpBar) trumpBar.style.width = `${Math.max(0, this.trump.health)}%`;
        if (modiMeter) modiMeter.style.width = `${Math.max(0, this.modi.superMeter)}%`;

        const modiHpText = document.getElementById('modi-hp-text');
        const trumpHpText = document.getElementById('trump-hp-text');
        if (modiHpText) modiHpText.textContent = `${Math.round(this.modi.health)} HP`;
        if (trumpHpText) trumpHpText.textContent = `${Math.round(this.trump.health)} HP`;
    }

    // ==========================================
    // MAIN GAME LOOP
    // ==========================================
    loop() {
        this.frame++;

        // Update physics & timers
        this.updateState();

        // Render scene
        this.render();

        requestAnimationFrame(this.loop);
    }

    updateState() {
        // Modi State timers
        if (this.modi.stateTimer > 0) {
            this.modi.stateTimer--;
            if (this.modi.stateTimer <= 0 && this.modi.state !== 'victory') {
                this.modi.state = 'idle';
            }
        }

        // Trump State timers
        if (this.trump.stateTimer > 0) {
            this.trump.stateTimer--;
            if (this.trump.stateTimer <= 0 && !this.trump.isFlattened) {
                this.trump.state = 'idle';
            }
        }

        // Yogi timers
        if (this.yogi.timer > 0) {
            this.yogi.timer--;
            if (this.yogi.timer <= 0) {
                this.yogi.state = 'idle';
            }
        }

        // Rahul cheer timer
        if (this.rahul.cheerTimer > 0) {
            this.rahul.cheerTimer--;
            if (this.rahul.cheerTimer <= 0) {
                this.rahul.cheering = false;
            }
        }

        // Movement bounds
        this.modi.x += this.modi.vx;
        this.modi.vx *= 0.85;
        this.modi.x = Math.max(160, Math.min(this.trump.x - 40, this.modi.x));

        this.trump.x += this.trump.vx;
        this.trump.vx *= 0.85;
        this.trump.x = Math.max(this.modi.x + 40, Math.min(840, this.trump.x));

        // Yogi follows action
        this.yogi.targetX = (this.modi.x + this.trump.x) / 2;
        this.yogi.x += (this.yogi.targetX - this.yogi.x) * 0.05;

        // Auto fight AI
        if (this.autoFight && !this.matchOver) {
            if (this.modi.state === 'idle') {
                const dist = Math.abs(this.modi.x - this.trump.x);
                if (dist > 140) {
                    this.modi.x += 3;
                } else if (Math.random() < 0.07) {
                    const r = Math.random();
                    if (r < 0.4) this.modiAttack('punch');
                    else if (r < 0.75) this.modiAttack('kick');
                    else this.modiAttack('special');
                }
            }
        }

        // Trump AI
        this.trumpAI();

        // Subsystems
        this.updateJcbFinisher();
        this.updateGadkariEvent();

        // Random Pothole occurrence in long matches
        this.potholeCooldown--;
        if (this.potholeCooldown <= 0 && !this.gadkariEvent.active && !this.matchOver) {
            this.triggerPotholeEvent();
            this.potholeCooldown = 600; // Reset
        }

        this.updateHUD();
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 1. Draw Ring Background & Arena
        this.drawArena();

        // 2. Draw Rahul Gandhi in VIP Ringside lounge
        this.charRenderer.drawRahul(this.ctx, this.rahul.x, this.rahul.y, this.frame, this.rahul.cheering);
        if (this.rahul.cheering) {
            this.drawSpeechBubble(this.ctx, this.rahul.x, this.rahul.y - 95, this.rahul.currentQuote, '#ffffff', '#333');
        }

        // 3. Draw Pothole Hazard & Nitin Gadkari
        if (this.gadkariEvent.active) {
            this.drawPotholeHazard();
            this.charRenderer.drawGadkari(this.ctx, this.gadkariEvent.potholeX, this.groundY - 10, this.frame);
            this.drawSpeechBubble(this.ctx, this.gadkariEvent.potholeX, this.groundY - 110, "⚡ E-20 BIOFUEL SOLUTION! ⚡\nFarmers prosper, 0 pollution!", '#e6ffec', '#007722');
        }

        // 4. Draw Yogi Adityanath Referee (if not driving JCB)
        if (!this.jcb.active || this.jcb.phase === 'enter') {
            this.charRenderer.drawYogi(this.ctx, this.yogi.x, this.yogi.y, this.yogi.state, this.frame);
            if (this.yogi.state === 'whistle' || this.yogi.state === 'warning' || this.yogi.state === 'summonJcb') {
                this.drawSpeechBubble(this.ctx, this.yogi.x, this.yogi.y - 95, this.yogi.dialogue, '#fff4e6', '#cc5500');
            }
        }

        // 5. Draw Narendra Modi
        this.charRenderer.drawModi(this.ctx, this.modi.x, this.modi.y, this.modi.state, this.frame, this.modi.facingRight);

        // 6. Draw Donald Trump
        this.charRenderer.drawTrump(this.ctx, this.trump.x, this.trump.y, this.trump.state, this.frame, this.trump.facingRight);

        // 7. Draw JCB Bulldozer
        if (this.jcb.active) {
            this.charRenderer.drawJCB(this.ctx, this.jcb.x, this.jcb.y, this.frame, this.jcb.scoopAngle, true);
        }

        // 8. Draw Ring Ropes (Foreground)
        this.drawRingRopes();

        // 9. Draw Particles & Comic Words
        this.renderParticlesAndTexts();
    }

    drawArena() {
        const ctx = this.ctx;

        // Gradient Wall Background (Grand Parliamentary Arena)
        const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
        bgGrad.addColorStop(0, '#101528');
        bgGrad.addColorStop(0.5, '#1e284a');
        bgGrad.addColorStop(1, '#0b0e1b');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, this.width, this.height);

        // Arena Stadium Spotlights
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = '#ffeedd';
        ctx.beginPath();
        ctx.moveTo(120, 0); ctx.lineTo(0, 480); ctx.lineTo(380, 480); ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(840, 0); ctx.lineTo(580, 480); ctx.lineTo(960, 480); ctx.closePath(); ctx.fill();
        ctx.restore();

        // Stadium Audience silhouettes & flashing camera lights
        ctx.fillStyle = '#080b14';
        for (let ax = 0; ax < this.width; ax += 32) {
            const h = 40 + Math.sin(ax * 0.2 + this.frame * 0.05) * 8;
            ctx.beginPath();
            ctx.arc(ax + 16, 280 - h, 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(ax + 2, 280 - h + 10, 28, 40);
        }

        // Camera flashes
        if (Math.random() < 0.2) {
            ctx.fillStyle = '#ffffff';
            const fx = Math.random() * this.width;
            const fy = 200 + Math.random() * 80;
            ctx.beginPath();
            ctx.arc(fx, fy, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Big Grand Banner
        ctx.fillStyle = '#ff7700';
        ctx.fillRect(240, 30, 480, 42);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.strokeRect(240, 30, 480, 42);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 20px "Impact", "Arial Black", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🥊 PARLIAMENT MEGA SMACKDOWN 2026 🥊', 480, 58);

        // Canvas Ring Floor (Mat)
        ctx.fillStyle = '#1c345a';
        ctx.fillRect(140, 390, 680, 130);

        // Mat Center Circle (Tricolor & Stars fusion)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(480, 440, 140, 40, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Ring Corner Posts
        ctx.fillStyle = '#ff0033';
        ctx.fillRect(130, 240, 18, 220); // Left post
        ctx.fillStyle = '#0044ff';
        ctx.fillRect(812, 240, 18, 220); // Right post
    }

    drawRingRopes() {
        const ctx = this.ctx;
        const ropeYs = [280, 330, 380];
        const colors = ['#ff9933', '#ffffff', '#138808']; // Saffron, White, Green

        ropeYs.forEach((ry, idx) => {
            const sag = Math.sin(this.frame * 0.1 + idx) * 3;
            ctx.strokeStyle = colors[idx % 3];
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(140, ry);
            ctx.quadraticCurveTo(480, ry + 12 + sag, 820, ry);
            ctx.stroke();

            // Rope tension springs
            ctx.fillStyle = '#silver';
            ctx.fillRect(135, ry - 4, 10, 8);
            ctx.fillRect(815, ry - 4, 10, 8);
        });
    }

    drawPotholeHazard() {
        const ctx = this.ctx;
        const px = this.gadkariEvent.potholeX;
        const py = this.gadkariEvent.potholeY;

        // Big jagged road crack
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.ellipse(px, py + 2, 45, 14, 0, 0, Math.PI * 2);
        ctx.fill();

        // Broken asphalt pieces
        ctx.fillStyle = '#444';
        ctx.fillRect(px - 35, py - 4, 12, 6);
        ctx.fillRect(px + 20, py - 2, 14, 7);
        ctx.fillRect(px - 8, py + 5, 16, 5);

        // Hazard Caution Sign
        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.moveTo(px, py - 40);
        ctx.lineTo(px - 20, py - 10);
        ctx.lineTo(px + 20, py - 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#111';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚠️', px, py - 16);
    }

    drawSpeechBubble(ctx, x, y, text, bgColor = '#ffffff', textColor = '#111') {
        ctx.save();
        ctx.font = 'bold 12px "Arial", sans-serif';
        const lines = text.split('\n');
        let maxW = 0;
        lines.forEach(l => {
            const w = ctx.measureText(l).width;
            if (w > maxW) maxW = w;
        });

        const padX = 14;
        const padY = 8;
        const boxW = Math.max(80, maxW + padX * 2);
        const boxH = lines.length * 16 + padY * 2;
        const bx = x - boxW / 2;
        const by = y - boxH;

        // Bubble shape
        ctx.fillStyle = bgColor;
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 8);
        ctx.fill();
        ctx.stroke();

        // Pointer
        ctx.beginPath();
        ctx.moveTo(x - 6, by + boxH);
        ctx.lineTo(x, by + boxH + 8);
        ctx.lineTo(x + 6, by + boxH);
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        lines.forEach((l, idx) => {
            ctx.fillText(l, x, by + padY + 12 + idx * 16);
        });

        ctx.restore();
    }

    renderParticlesAndTexts() {
        const ctx = this.ctx;

        // Hit particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // Gravity
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Comic floating texts ("DHISHUM!", "POW!", "56 INCH!")
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y += ft.vy;
            ft.alpha -= 0.02;
            ft.scale = Math.min(1.2, ft.scale + 0.1);

            if (ft.alpha <= 0) {
                this.floatingTexts.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = ft.alpha;
            ctx.translate(ft.x, ft.y);
            ctx.scale(ft.scale, ft.scale);

            // Comic outline
            ctx.font = `900 ${ft.size}px "Impact", "Arial Black", sans-serif`;
            ctx.textAlign = 'center';
            ctx.strokeStyle = '#111';
            ctx.lineWidth = 6;
            ctx.strokeText(ft.text, 0, 0);

            ctx.fillStyle = ft.color;
            ctx.fillText(ft.text, 0, 0);
            ctx.restore();
        }
    }
}

// Instantiate engine when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameEngine();
});
