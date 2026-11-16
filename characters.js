// Character Renderers for Narendra Modi, Donald Trump, Yogi Adityanath (Ref & JCB), Nitin Gadkari, and Rahul Gandhi

class CharacterRenderer {
    constructor() {}

    // ==========================================
    // NARENDRA MODI (Fighter 1)
    // ==========================================
    drawModi(ctx, x, y, state, frame, facingRight = 1) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(facingRight, 1);

        const bob = Math.sin(frame * 0.1) * 3;
        const breath = Math.cos(frame * 0.08) * 2;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.ellipse(0, 5, 38, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Special Aura if in special or 56-inch mode
        if (state === 'special' || state === 'chest56') {
            ctx.save();
            const glow = (Math.sin(frame * 0.3) + 1) * 0.5;
            const grad = ctx.createRadialGradient(0, -50 + bob, 10, 0, -50 + bob, 70);
            grad.addColorStop(0, `rgba(255, 153, 51, ${0.8 * glow})`);
            grad.addColorStop(0.6, `rgba(255, 220, 100, ${0.4 * glow})`);
            grad.addColorStop(1, 'rgba(255, 153, 51, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, -50 + bob, 75, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Legs / Pyjama (Off-white)
        ctx.fillStyle = '#f5eedb';
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2.5;

        // Left leg
        ctx.beginPath();
        ctx.roundRect(-22, -25, 14, 28, 5);
        ctx.fill();
        ctx.stroke();

        // Right leg
        ctx.beginPath();
        ctx.roundRect(8, -25, 14, 28, 5);
        ctx.fill();
        ctx.stroke();

        // Black/Brown formal shoes
        ctx.fillStyle = '#2c221e';
        ctx.beginPath();
        ctx.roundRect(-25, 0, 19, 9, 4);
        ctx.roundRect(6, 0, 19, 9, 4);
        ctx.fill();
        ctx.stroke();

        // Torso / Kurta (Cream) + Modi Vest (Saffron)
        const chestExpand = state === 'chest56' ? 14 : 0;
        const torsoY = -68 + bob;

        // Kurta base
        ctx.fillStyle = '#fff9eb';
        ctx.beginPath();
        ctx.roundRect(-26 - chestExpand / 2, torsoY, 52 + chestExpand, 46, 10);
        ctx.fill();
        ctx.stroke();

        // Saffron Modi Jacket / Vest
        ctx.fillStyle = '#ff7722';
        ctx.beginPath();
        ctx.roundRect(-25 - chestExpand / 2, torsoY - 2, 50 + chestExpand, 40, 8);
        ctx.fill();
        ctx.stroke();

        // Jacket pocket with folded handkerchief
        ctx.fillStyle = '#dd5500';
        ctx.fillRect(-18, torsoY + 12, 11, 10);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-18, torsoY + 12);
        ctx.lineTo(-12, torsoY + 7);
        ctx.lineTo(-7, torsoY + 12);
        ctx.fill();

        // Jacket buttons
        ctx.fillStyle = '#ffd700';
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(0, torsoY + 7 + i * 8, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        // 56-Inch Chest Badge if triggered
        if (state === 'chest56') {
            ctx.fillStyle = '#ff0055';
            ctx.beginPath();
            ctx.roundRect(-20, torsoY + 2, 40, 14, 4);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 9px "Impact", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('56 INCH!', 0, torsoY + 12);
        }

        // Head Base (Skin)
        const headY = torsoY - 26 + breath;
        ctx.fillStyle = '#fcd0a1';
        ctx.beginPath();
        ctx.ellipse(0, headY, 20, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Signature White Hair (Side & Back)
        ctx.fillStyle = '#f0f0f5';
        ctx.beginPath();
        ctx.arc(-16, headY - 8, 10, 0, Math.PI * 2);
        ctx.arc(-8, headY - 18, 13, 0, Math.PI * 2);
        ctx.arc(8, headY - 18, 13, 0, Math.PI * 2);
        ctx.arc(16, headY - 8, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Signature White Beard & Mustache (Carefully groomed)
        ctx.fillStyle = '#f5f5fa';
        ctx.beginPath();
        ctx.moveTo(-18, headY + 2);
        ctx.quadraticCurveTo(-14, headY + 25, 0, headY + 27);
        ctx.quadraticCurveTo(14, headY + 25, 18, headY + 2);
        ctx.quadraticCurveTo(10, headY + 12, 0, headY + 14);
        ctx.quadraticCurveTo(-10, headY + 12, -18, headY + 2);
        ctx.fill();
        ctx.stroke();

        // Mustache
        ctx.fillStyle = '#e5e5ea';
        ctx.beginPath();
        ctx.moveTo(-12, headY + 5);
        ctx.quadraticCurveTo(0, headY + 2, 12, headY + 5);
        ctx.quadraticCurveTo(0, headY + 10, -12, headY + 5);
        ctx.fill();

        // Eyes / Glasses
        // Rimless square glasses
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(-14, headY - 8, 11, 9);
        ctx.strokeRect(3, headY - 8, 11, 9);
        ctx.beginPath();
        ctx.moveTo(-3, headY - 4);
        ctx.lineTo(3, headY - 4);
        ctx.stroke();

        // Eyes behind glasses
        ctx.fillStyle = '#222';
        if (state === 'hurt') {
            // Dizzy X eyes
            ctx.strokeStyle = '#222';
            ctx.beginPath();
            ctx.moveTo(-11, headY - 6); ctx.lineTo(-6, headY - 1);
            ctx.moveTo(-6, headY - 6); ctx.lineTo(-11, headY - 1);
            ctx.moveTo(6, headY - 6); ctx.lineTo(11, headY - 1);
            ctx.moveTo(11, headY - 6); ctx.lineTo(6, headY - 1);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(-8.5, headY - 3.5, 2.2, 0, Math.PI * 2);
            ctx.arc(8.5, headY - 3.5, 2.2, 0, Math.PI * 2);
            ctx.fill();
            // Glasses reflection gleam
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(-6.5, headY - 5.5, 1.5, 0, Math.PI * 2);
            ctx.arc(10.5, headY - 5.5, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Arms & Hands based on state
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2.5;
        ctx.fillStyle = '#ff7722';

        if (state === 'punch') {
            // Extended punch forward
            ctx.beginPath();
            ctx.roundRect(10, torsoY + 5, 38, 12, 6);
            ctx.fill();
            ctx.stroke();
            // Glowing Fist
            ctx.fillStyle = '#fcd0a1';
            ctx.beginPath();
            ctx.arc(48, torsoY + 11, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Fist trail / hit burst
            ctx.fillStyle = '#ffcc00';
            ctx.beginPath();
            ctx.arc(52, torsoY + 11, 14, 0, Math.PI * 2);
            ctx.globalAlpha = 0.4;
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // Back arm ready
            ctx.fillStyle = '#ff7722';
            ctx.beginPath();
            ctx.roundRect(-26, torsoY + 6, 14, 20, 6);
            ctx.fill();
            ctx.stroke();
        } else if (state === 'kick') {
            // Flying Yoga Kick
            ctx.fillStyle = '#ff7722';
            ctx.beginPath();
            ctx.roundRect(-24, torsoY + 2, 14, 22, 6);
            ctx.roundRect(10, torsoY + 2, 14, 22, 6);
            ctx.fill();
            ctx.stroke();

            // Right leg extended out in kick
            ctx.fillStyle = '#f5eedb';
            ctx.beginPath();
            ctx.roundRect(5, torsoY + 25, 42, 13, 6);
            ctx.fill();
            ctx.stroke();
            // Shoe
            ctx.fillStyle = '#2c221e';
            ctx.beginPath();
            ctx.roundRect(42, torsoY + 23, 14, 16, 4);
            ctx.fill();
            ctx.stroke();
        } else if (state === 'victory') {
            // Hands raised with victory garland!
            ctx.fillStyle = '#ff7722';
            ctx.beginPath();
            ctx.roundRect(-34, torsoY - 14, 14, 26, 6);
            ctx.roundRect(20, torsoY - 14, 14, 26, 6);
            ctx.fill();
            ctx.stroke();

            // Hands (V sign)
            ctx.fillStyle = '#fcd0a1';
            ctx.beginPath();
            ctx.arc(-27, torsoY - 18, 7, 0, Math.PI * 2);
            ctx.arc(27, torsoY - 18, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Marigold Victory Garland
            const flowerColors = ['#ff9900', '#ffcc00', '#ff3300'];
            for (let i = 0; i < 9; i++) {
                const angle = (i / 8) * Math.PI;
                const gx = Math.cos(angle) * 22;
                const gy = headY + 16 + Math.sin(angle) * 22;
                ctx.fillStyle = flowerColors[i % 3];
                ctx.beginPath();
                ctx.arc(gx, gy, 5.5, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Idle / Stance
            ctx.beginPath();
            ctx.roundRect(-26, torsoY + 8 + bob, 14, 24, 6);
            ctx.roundRect(12, torsoY + 8 - bob, 14, 24, 6);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fcd0a1';
            ctx.beginPath();
            ctx.arc(-19, torsoY + 30 + bob, 7, 0, Math.PI * 2);
            ctx.arc(19, torsoY + 30 - bob, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    }

    // ==========================================
    // DONALD TRUMP (Fighter 2)
    // ==========================================
    drawTrump(ctx, x, y, state, frame, facingRight = -1) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(facingRight, 1);

        const bob = Math.sin(frame * 0.12) * 3;
        const tieWave = Math.sin(frame * 0.2) * 5;

        // Flattened state (when bulldozed by Yogi's JCB!)
        if (state === 'flattened') {
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.ellipse(0, 5, 55, 14, 0, 0, Math.PI * 2);
            ctx.fill();

            // Flattened Accordion Trump
            ctx.fillStyle = '#0a1d37';
            ctx.beginPath();
            ctx.roundRect(-45, -12, 90, 16, 4);
            ctx.fill();
            ctx.stroke();

            // Flattened Head
            ctx.fillStyle = '#ffb366';
            ctx.beginPath();
            ctx.ellipse(0, -18, 25, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Smashed Yellow Hair
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.ellipse(5, -24, 35, 6, 0, 0, Math.PI * 2);
            ctx.fill();

            // Red tie squashed
            ctx.fillStyle = '#e60000';
            ctx.fillRect(-6, -10, 12, 18);

            // Dizzy stars floating
            for (let i = 0; i < 4; i++) {
                const sx = Math.cos(frame * 0.2 + i * 1.5) * 30;
                const sy = -32 + Math.sin(frame * 0.2 + i * 1.5) * 8;
                ctx.fillStyle = '#ffff00';
                ctx.font = '14px sans-serif';
                ctx.fillText('⭐', sx, sy);
            }
            ctx.restore();
            ctx.restore();
            return;
        }

        // Normal Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.ellipse(0, 5, 42, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs / Dark Suit Pants
        ctx.fillStyle = '#0f2444';
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.roundRect(-24, -25, 15, 28, 4);
        ctx.roundRect(9, -25, 15, 28, 4);
        ctx.fill();
        ctx.stroke();

        // Shiny Black Shoes
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.roundRect(-28, 0, 20, 9, 4);
        ctx.roundRect(7, 0, 20, 9, 4);
        ctx.fill();
        ctx.stroke();

        // Torso / Navy Blue Suit Jacket
        const torsoY = -72 + bob;
        ctx.fillStyle = '#0f2444';
        ctx.beginPath();
        ctx.roundRect(-30, torsoY, 60, 48, 10);
        ctx.fill();
        ctx.stroke();

        // White Shirt Collar / V-neck
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-16, torsoY);
        ctx.lineTo(0, torsoY + 22);
        ctx.lineTo(16, torsoY);
        ctx.fill();

        // Signature Ridiculously Long Bright Red Tie
        ctx.fillStyle = '#e60000';
        ctx.strokeStyle = '#990000';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-4, torsoY + 6);
        ctx.lineTo(4, torsoY + 6);
        ctx.lineTo(7 + tieWave * 0.4, torsoY + 44);
        ctx.lineTo(0 + tieWave * 0.6, torsoY + 54); // Hangs way below belt!
        ctx.lineTo(-7 + tieWave * 0.4, torsoY + 44);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Lapel Pin (Tiny USA Flag)
        ctx.fillStyle = '#ff2222';
        ctx.fillRect(-22, torsoY + 12, 7, 5);
        ctx.fillStyle = '#0033aa';
        ctx.fillRect(-22, torsoY + 12, 3, 3);

        // Head Base (Warm Golden Orange Tan)
        const headY = torsoY - 26;
        ctx.fillStyle = '#ffaa66';
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(0, headY, 21, 23, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // White eye circles (Goggle tan effect!)
        ctx.fillStyle = '#ffd1aa';
        ctx.beginPath();
        ctx.ellipse(-8, headY - 4, 8, 7, 0, 0, Math.PI * 2);
        ctx.ellipse(8, headY - 4, 8, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#111';
        if (state === 'hurt') {
            // Hurt eyes
            ctx.strokeStyle = '#111';
            ctx.beginPath();
            ctx.moveTo(-11, headY - 6); ctx.lineTo(-5, headY - 1);
            ctx.moveTo(-5, headY - 6); ctx.lineTo(-11, headY - 1);
            ctx.moveTo(5, headY - 6); ctx.lineTo(11, headY - 1);
            ctx.moveTo(11, headY - 6); ctx.lineTo(5, headY - 1);
            ctx.stroke();
        } else {
            // Squinty intense eyes
            ctx.beginPath();
            ctx.arc(-8, headY - 3, 2.5, 0, Math.PI * 2);
            ctx.arc(8, headY - 3, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Puckered / Shouting Mouth
        if (state === 'punch' || state === 'special') {
            // Big open shout "FAKE NEWS!"
            ctx.fillStyle = '#8b0000';
            ctx.beginPath();
            ctx.ellipse(0, headY + 10, 8, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            // Teeth
            ctx.fillStyle = '#fff';
            ctx.fillRect(-5, headY + 5, 10, 3);
        } else {
            // Iconic puckered lips
            ctx.fillStyle = '#e07050';
            ctx.beginPath();
            ctx.ellipse(0, headY + 11, 6, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        // Iconic Swirling Blonde Pompadour / Golden Toupee
        // Hair flaps dynamically when moving or getting punched
        const hairFlap = state === 'hurt' ? Math.sin(frame * 0.4) * 15 - 15 : Math.sin(frame * 0.15) * 4;
        ctx.fillStyle = '#ffd533';
        ctx.strokeStyle = '#b8860b';
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(-24, headY - 6 + hairFlap);
        ctx.bezierCurveTo(-30, headY - 26 + hairFlap, -10, headY - 42 + hairFlap, 18, headY - 38 + hairFlap);
        ctx.bezierCurveTo(34, headY - 34 + hairFlap, 36, headY - 14, 22, headY - 8);
        ctx.bezierCurveTo(15, headY - 22, -10, headY - 25, -24, headY - 6 + hairFlap);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Hair front swoosh
        ctx.fillStyle = '#ffe066';
        ctx.beginPath();
        ctx.moveTo(-18, headY - 16);
        ctx.quadraticCurveTo(0, headY - 28, 26, headY - 14);
        ctx.quadraticCurveTo(10, headY - 18, -18, headY - 16);
        ctx.fill();

        // Arms & Tiny Hands
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2.5;
        ctx.fillStyle = '#0f2444';

        if (state === 'punch') {
            // Tiny hand slap forward
            ctx.beginPath();
            ctx.roundRect(14, torsoY + 8, 32, 12, 6);
            ctx.fill();
            ctx.stroke();

            // Tiny Hand
            ctx.fillStyle = '#ffaa66';
            ctx.beginPath();
            ctx.arc(48, torsoY + 14, 6, 0, Math.PI * 2); // Noticeably small!
            ctx.fill();
            ctx.stroke();

            // Comic "SLAP!"
            ctx.fillStyle = '#ff0033';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText('SLAP!', 35, torsoY);
        } else if (state === 'special') {
            // Wall build gesture: both hands raised
            ctx.beginPath();
            ctx.roundRect(-35, torsoY - 12, 14, 25, 6);
            ctx.roundRect(22, torsoY - 12, 14, 25, 6);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#ffaa66';
            ctx.beginPath();
            ctx.arc(-28, torsoY - 15, 6, 0, Math.PI * 2);
            ctx.arc(29, torsoY - 15, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        } else {
            // Idle stance with iconic open hand gestures
            ctx.beginPath();
            ctx.roundRect(-30, torsoY + 10 + bob, 14, 22, 6);
            ctx.roundRect(16, torsoY + 10 - bob, 14, 22, 6);
            ctx.fill();
            ctx.stroke();

            // Tiny expressive hands
            ctx.fillStyle = '#ffaa66';
            ctx.beginPath();
            ctx.arc(-23, torsoY + 34 + bob, 6, 0, Math.PI * 2);
            ctx.arc(23, torsoY + 34 - bob, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    }

    // ==========================================
    // YOGI ADITYANATH (The Stern Referee)
    // ==========================================
    drawYogi(ctx, x, y, state, frame) {
        ctx.save();
        ctx.translate(x, y);

        const bob = Math.sin(frame * 0.15) * 4;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(0, 5, 30, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Saffron Robes / Dhoti
        ctx.fillStyle = '#ff7700';
        ctx.strokeStyle = '#b34700';
        ctx.lineWidth = 2;

        // Lower robe
        ctx.beginPath();
        ctx.roundRect(-20, -30 + bob, 40, 32, [4, 4, 10, 10]);
        ctx.fill();
        ctx.stroke();

        // Upper Angavastram / Saffron Shawl draped over shoulder
        ctx.fillStyle = '#ff8800';
        ctx.beginPath();
        ctx.roundRect(-22, -62 + bob, 44, 36, 8);
        ctx.fill();
        ctx.stroke();

        // Diagonal Referee Sash across chest
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-18, -62 + bob);
        ctx.lineTo(-12, -62 + bob);
        ctx.lineTo(18, -32 + bob);
        ctx.lineTo(12, -32 + bob);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#111';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('REF', 0, -44 + bob);

        // Head (Shaved head with sacred tilak)
        const headY = -74 + bob;
        ctx.fillStyle = '#f5c69b';
        ctx.strokeStyle = '#8a4b16';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, headY, 17, 19, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Sacred Tilak (Red & White)
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(-4, headY - 14, 8, 4);
        ctx.fillStyle = '#cc0000';
        ctx.beginPath();
        ctx.arc(0, headY - 12, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Gold Kundal earrings
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(-18, headY + 2, 3.5, 0, Math.PI * 2);
        ctx.arc(18, headY + 2, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Stern referee eyes & thick eyebrows
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-12, headY - 6); ctx.lineTo(-4, headY - 3);
        ctx.moveTo(12, headY - 6); ctx.lineTo(4, headY - 3);
        ctx.stroke();

        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.arc(-7, headY - 2, 2.2, 0, Math.PI * 2);
        ctx.arc(7, headY - 2, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Golden Referee Whistle in mouth
        ctx.fillStyle = '#ffd700';
        ctx.strokeStyle = '#aa8800';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-3, headY + 6, 12, 6, 2);
        ctx.arc(9, headY + 9, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Whistle Sound waves if blowing
        if (state === 'whistle' || state === 'warning') {
            ctx.strokeStyle = '#ffcc00';
            ctx.lineWidth = 2;
            for (let i = 1; i <= 3; i++) {
                ctx.beginPath();
                ctx.arc(14, headY + 9, i * 6, -Math.PI / 4, Math.PI / 4);
                ctx.stroke();
            }

            // Yellow / Red Card in raised hand!
            ctx.fillStyle = state === 'warning' ? '#ff3300' : '#ffff00';
            ctx.strokeStyle = '#111';
            ctx.lineWidth = 1.5;
            ctx.fillRect(18, headY - 26, 14, 20);
            ctx.strokeRect(18, headY - 26, 14, 20);

            // Arm raising card
            ctx.fillStyle = '#ff8800';
            ctx.beginPath();
            ctx.roundRect(14, -58 + bob, 10, 22, 4);
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    }

    // ==========================================
    // THE LEGENDARY JCB / BULLDOZER FINISHER
    // ==========================================
    drawJCB(ctx, x, y, frame, scoopAngle = 0, yogiDriving = true) {
        ctx.save();
        ctx.translate(x, y);

        const vroom = Math.sin(frame * 0.4) * 2;

        // Exhaust Smoke puffs
        ctx.fillStyle = 'rgba(100, 100, 100, 0.4)';
        for (let i = 0; i < 3; i++) {
            const smokeX = -45 - i * 16 - (frame % 20);
            const smokeY = -70 - i * 12 - vroom;
            ctx.beginPath();
            ctx.arc(smokeX, smokeY, 8 + i * 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Caterpillar Treads / Heavy Tracks (Black)
        ctx.fillStyle = '#222';
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(-80, -20, 160, 24, 12);
        ctx.fill();
        ctx.stroke();

        // Wheels inside tracks
        ctx.fillStyle = '#666';
        for (let wx = -60; wx <= 60; wx += 30) {
            ctx.beginPath();
            ctx.arc(wx, -8, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            // Spokes rotating
            ctx.strokeStyle = '#333';
            ctx.beginPath();
            ctx.moveTo(wx - 7, -8); ctx.lineTo(wx + 7, -8);
            ctx.moveTo(wx, -15); ctx.lineTo(wx, -1);
            ctx.stroke();
        }

        // Heavy JCB Yellow Body Chassis
        ctx.fillStyle = '#ffcc00';
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(-75, -60 + vroom, 130, 42, 6);
        ctx.fill();
        ctx.stroke();

        // Big Black "JCB" Bold Logo on side
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.roundRect(-60, -48 + vroom, 42, 22, 4);
        ctx.fill();
        ctx.fillStyle = '#ffcc00';
        ctx.font = '900 16px "Arial Black", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('JCB', -39, -32 + vroom);

        // Cabin with glass windows
        ctx.fillStyle = '#ffbb00';
        ctx.beginPath();
        ctx.roundRect(-20, -100 + vroom, 70, 44, [10, 10, 0, 0]);
        ctx.fill();
        ctx.stroke();

        // Glass window (Cyan tint)
        ctx.fillStyle = 'rgba(120, 220, 255, 0.7)';
        ctx.beginPath();
        ctx.roundRect(-14, -94 + vroom, 58, 32, 6);
        ctx.fill();
        ctx.stroke();

        // Yogi Adityanath visible driving inside cabin!
        if (yogiDriving) {
            ctx.save();
            ctx.translate(14, -75 + vroom);
            // Saffron attire
            ctx.fillStyle = '#ff7700';
            ctx.beginPath();
            ctx.roundRect(-10, 0, 20, 16, 4);
            ctx.fill();
            // Head
            ctx.fillStyle = '#f5c69b';
            ctx.beginPath();
            ctx.arc(0, -7, 9, 0, Math.PI * 2);
            ctx.fill();
            // Tilak
            ctx.fillStyle = '#cc0000';
            ctx.fillRect(-2, -12, 4, 3);
            // Hands on steering levers
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-6, 4); ctx.lineTo(-12, 10);
            ctx.moveTo(6, 4); ctx.lineTo(12, 10);
            ctx.stroke();
            ctx.restore();
        }

        // Flashing Emergency Siren on Cabin Roof
        const flash = Math.floor(frame / 6) % 2 === 0;
        ctx.fillStyle = flash ? '#ff0033' : '#ff9900';
        ctx.beginPath();
        ctx.roundRect(8, -110 + vroom, 16, 12, 4);
        ctx.fill();
        ctx.stroke();
        // Light glow beam
        ctx.fillStyle = flash ? 'rgba(255, 0, 50, 0.4)' : 'rgba(255, 180, 0, 0.4)';
        ctx.beginPath();
        ctx.arc(16, -104 + vroom, 24, 0, Math.PI * 2);
        ctx.fill();

        // Exhaust pipe
        ctx.fillStyle = '#444';
        ctx.fillRect(-48, -80 + vroom, 8, 22);
        ctx.strokeRect(-48, -80 + vroom, 8, 22);

        // Front Excavator Boom & Hydraulic Arm
        ctx.save();
        ctx.translate(50, -45 + vroom);
        ctx.rotate(-0.2 + Math.sin(frame * 0.15) * 0.08);

        // Arm 1
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(0, -8, 60, 16);
        ctx.strokeRect(0, -8, 60, 16);

        // Joint & Hydraulic Piston
        ctx.fillStyle = '#silver';
        ctx.beginPath();
        ctx.arc(60, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Arm 2 (Forearm)
        ctx.save();
        ctx.translate(60, 0);
        ctx.rotate(0.5 + scoopAngle);
        ctx.fillStyle = '#ffaa00';
        ctx.fillRect(0, -7, 45, 14);
        ctx.strokeRect(0, -7, 45, 14);

        // Heavy Bulldozer Scoop / Bucket with steel teeth!
        ctx.save();
        ctx.translate(45, 0);
        ctx.rotate(0.3);
        ctx.fillStyle = '#444';
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(24, -12);
        ctx.lineTo(32, 14);
        ctx.lineTo(10, 24);
        ctx.lineTo(-5, 15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Sharp Scoop Teeth
        ctx.fillStyle = '#silver';
        for (let t = -10; t <= 18; t += 7) {
            ctx.beginPath();
            ctx.moveTo(25, t);
            ctx.lineTo(36, t + 3);
            ctx.lineTo(26, t + 6);
            ctx.fill();
        }

        ctx.restore();
        ctx.restore();
        ctx.restore();

        ctx.restore();
    }

    // ==========================================
    // NITIN GADKARI (Highway & E20 Petrol Special)
    // ==========================================
    drawGadkari(ctx, x, y, frame) {
        ctx.save();
        ctx.translate(x, y);

        const bob = Math.sin(frame * 0.15) * 3;

        // Miniature Green Highway base
        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.roundRect(-70, 0, 140, 16, 6);
        ctx.fill();

        // White road dash
        ctx.fillStyle = '#fff';
        for (let rx = -55; rx < 60; rx += 28) {
            ctx.fillRect(rx, 6, 16, 4);
        }

        // Cheerful round body in Cream / Safari Suit
        const torsoY = -48 + bob;
        ctx.fillStyle = '#e8d8be';
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(-24, torsoY, 48, 42, 12);
        ctx.fill();
        ctx.stroke();

        // Head (Warm round cheerful face)
        const headY = torsoY - 20;
        ctx.fillStyle = '#f7c59f';
        ctx.beginPath();
        ctx.ellipse(0, headY, 18, 19, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Hair (Trimmed dark hair)
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(0, headY - 12, 16, Math.PI, Math.PI * 2);
        ctx.fill();

        // Spectacles
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(-12, headY - 5, 10, 8);
        ctx.strokeRect(2, headY - 5, 10, 8);
        ctx.beginPath();
        ctx.moveTo(-2, headY - 1); ctx.lineTo(2, headY - 1);
        ctx.stroke();

        // Broad warm smiling mouth
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(0, headY + 7, 7, 0, Math.PI);
        ctx.fill();
        ctx.stroke();

        // Holding Green E20 Petrol Pump Nozzle in one hand
        ctx.fillStyle = '#00aa44';
        ctx.beginPath();
        ctx.roundRect(26, torsoY + 2, 12, 22, 4);
        ctx.fill();
        ctx.stroke();

        // Nozzle pipe
        ctx.strokeStyle = '#008833';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(32, torsoY + 2);
        ctx.lineTo(44, torsoY - 12);
        ctx.lineTo(52, torsoY - 8);
        ctx.stroke();

        // Flying Green Eco Leaves / Biofuel Drops
        for (let i = 0; i < 3; i++) {
            const lx = 42 + Math.cos(frame * 0.2 + i * 2) * 16;
            const ly = torsoY - 20 + Math.sin(frame * 0.2 + i * 2) * 12;
            ctx.fillStyle = '#22cc55';
            ctx.beginPath();
            ctx.ellipse(lx, ly, 6, 3, 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Green Highway Signboard held in other hand
        ctx.fillStyle = '#007733';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-85, torsoY - 35, 62, 34, 5);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('NHAI EXPRESS', -54, torsoY - 22);
        ctx.fillStyle = '#ffff00';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('⚡ E-20 ⚡', -54, torsoY - 8);

        ctx.restore();
    }

    // ==========================================
    // RAHUL GANDHI (Ringside VIP Spectator)
    // ==========================================
    drawRahul(ctx, x, y, frame, cheering = false) {
        ctx.save();
        ctx.translate(x, y);

        const bob = Math.sin(frame * 0.14) * 3;

        // VIP Lounge Sofa / Chair
        ctx.fillStyle = '#7a1c1c';
        ctx.strokeStyle = '#3a0c0c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(-35, -20, 70, 32, 10);
        ctx.fill();
        ctx.stroke();

        // Chair backrest
        ctx.beginPath();
        ctx.roundRect(-38, -65, 76, 48, 12);
        ctx.fill();
        ctx.stroke();

        // Body (White Kurta)
        const torsoY = -46 + bob;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-20, torsoY, 40, 38, 8);
        ctx.fill();
        ctx.stroke();

        // Head (Youthful, dimpled smile, light stubble)
        const headY = torsoY - 22;
        ctx.fillStyle = '#fcd5b4';
        ctx.strokeStyle = '#996633';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, headY, 17, 19, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Hair (Short stylish dark brown hair)
        ctx.fillStyle = '#2d1e12';
        ctx.beginPath();
        ctx.arc(0, headY - 10, 16, Math.PI, Math.PI * 2);
        ctx.fill();

        // Eyes (Playful wink or wide happy smile)
        ctx.fillStyle = '#222';
        if (cheering) {
            // Cheeky Wink! Left eye closed ;)
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-9, headY - 2); ctx.quadraticCurveTo(-6, headY - 6, -3, headY - 2);
            ctx.stroke();
            // Right eye wide
            ctx.beginPath();
            ctx.arc(6, headY - 3, 2.5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(-6, headY - 3, 2.2, 0, Math.PI * 2);
            ctx.arc(6, headY - 3, 2.2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Broad cheerful dimple smile
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(0, headY + 6, 6.5, 0, Math.PI);
        ctx.fill();
        ctx.stroke();

        // Giant Tub of Popcorn in lap!
        const popcornY = torsoY + 12;
        ctx.fillStyle = '#dd2222';
        ctx.beginPath();
        ctx.roundRect(-16, popcornY, 32, 22, [2, 2, 6, 6]);
        ctx.fill();

        // White stripes on popcorn bucket
        ctx.fillStyle = '#fff';
        ctx.fillRect(-11, popcornY, 5, 22);
        ctx.fillRect(0, popcornY, 5, 22);
        ctx.fillRect(11, popcornY, 5, 22);

        // Fluffy Yellow Popcorn bursting out
        ctx.fillStyle = '#ffe066';
        for (let px = -14; px <= 14; px += 7) {
            ctx.beginPath();
            ctx.arc(px, popcornY - 2, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Hands clapping or throwing popcorn
        if (cheering) {
            // Throwing popcorn in excitement!
            ctx.fillStyle = '#fcd5b4';
            ctx.beginPath();
            ctx.arc(-18, torsoY - 8, 6, 0, Math.PI * 2);
            ctx.arc(18, torsoY - 8, 6, 0, Math.PI * 2);
            ctx.fill();

            // Flying popcorn pieces
            ctx.fillStyle = '#ffe066';
            for (let i = 0; i < 4; i++) {
                const fx = -25 + Math.sin(frame * 0.3 + i) * 20;
                const fy = torsoY - 25 - i * 8;
                ctx.beginPath();
                ctx.arc(fx, fy, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }
}

window.characterRenderer = new CharacterRenderer();
