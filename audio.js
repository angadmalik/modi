// Web Audio API Synthesizer for Arcade Sounds and Chiptune Music
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.musicPlaying = false;
        this.musicTimer = null;
        this.noteIndex = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSound() {
        this.enabled = !this.enabled;
        if (!this.enabled && this.musicPlaying) {
            this.stopMusic();
        }
        return this.enabled;
    }

    // Play a punch/hit sound
    playHit() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

        // White noise burst for impact
        const bufferSize = this.ctx.sampleRate * 0.08;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.7;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.5, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        noise.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        noise.start(now);
        osc.stop(now + 0.15);
    }

    // Play Yogi referee whistle
    playWhistle() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        
        [2200, 2400].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);
            
            // Rapid vibrato for pea whistle effect
            const lfo = this.ctx.createOscillator();
            lfo.frequency.setValueAtTime(35, now);
            const lfoGain = this.ctx.createGain();
            lfoGain.gain.setValueAtTime(150, now);
            lfo.connect(osc.frequency);
            lfo.start(now);
            lfo.stop(now + 0.45);

            gain.gain.setValueAtTime(0.3, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.08);
            osc.stop(now + 0.45);
        });
    }

    // Super move sound
    playSpecial() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.3);
        osc.frequency.linearRampToValueAtTime(440, now + 0.5);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);
    }

    // Pothole crash sound
    playPothole() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
    }

    // JCB Bulldozer roaring engine & horn
    playBulldozer() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        // Heavy low engine rumble
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, now);
        osc.frequency.linearRampToValueAtTime(110, now + 1.2);

        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.02, now + 1.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.5);

        // Loud truck horn
        [320, 390].forEach(freq => {
            const horn = this.ctx.createOscillator();
            const hGain = this.ctx.createGain();
            horn.type = 'triangle';
            horn.frequency.setValueAtTime(freq, now + 0.3);
            hGain.gain.setValueAtTime(0.5, now + 0.3);
            hGain.gain.exponentialRampToValueAtTime(0.01, now + 1.1);

            horn.connect(hGain);
            hGain.connect(this.ctx.destination);
            horn.start(now + 0.3);
            horn.stop(now + 1.1);
        });
    }

    // Cheer / Laugh sound
    playLaugh() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const pitches = [520, 650, 520, 650, 780];
        pitches.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const t = now + idx * 0.08;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.25, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.07);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.07);
        });
    }

    // Victory fanfare
    playFanfare() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const notes = [
            { f: 392, d: 0.15 }, // G4
            { f: 523.25, d: 0.15 }, // C5
            { f: 659.25, d: 0.15 }, // E5
            { f: 783.99, d: 0.4 }  // G5
        ];
        let offset = 0;
        notes.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const t = now + offset;
            osc.type = 'square';
            osc.frequency.setValueAtTime(note.f, t);

            gain.gain.setValueAtTime(0.4, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + note.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + note.d);
            offset += note.d;
        });
    }

    // Background arcade music loop
    startMusic() {
        if (!this.enabled || this.musicPlaying) return;
        this.init();
        this.musicPlaying = true;

        const bassline = [
            130.81, 130.81, 164.81, 196.00,
            130.81, 130.81, 174.61, 164.81,
            110.00, 110.00, 146.83, 164.81,
            123.47, 123.47, 146.83, 196.00
        ];
        
        let step = 0;
        const playBeat = () => {
            if (!this.musicPlaying || !this.enabled) return;
            const now = this.ctx.currentTime;
            
            // Bass synth
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(bassline[step % bassline.length], now);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.2);

            step++;
            this.musicTimer = setTimeout(playBeat, 220);
        };
        playBeat();
    }

    stopMusic() {
        this.musicPlaying = false;
        if (this.musicTimer) {
            clearTimeout(this.musicTimer);
            this.musicTimer = null;
        }
    }
}

window.soundEngine = new SoundEngine();
