
// Synthesizer for Retro Hacker Sounds using Web Audio API

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private processingInterval: number | null = null;

  constructor() {
    // Initialize on first user interaction
  }

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      // INCREASED VOLUME: 0.05 -> 0.25
      this.masterGain.gain.value = 1; 
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // "Hacker Feel" Mechanical Keyboard Click
  public playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    // 1. The "Thud" (Low frequency impact)
    const oscLow = this.ctx.createOscillator();
    const gainLow = this.ctx.createGain();
    
    oscLow.type = 'square';
    oscLow.frequency.setValueAtTime(150, t);
    oscLow.frequency.exponentialRampToValueAtTime(40, t + 0.05);
    
    gainLow.gain.setValueAtTime(0.3, t);
    gainLow.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

    oscLow.connect(gainLow);
    gainLow.connect(this.masterGain);
    
    oscLow.start(t);
    oscLow.stop(t + 0.05);

    // 2. The "Click" (High frequency tick)
    const oscHigh = this.ctx.createOscillator();
    const gainHigh = this.ctx.createGain();

    oscHigh.type = 'triangle';
    oscHigh.frequency.setValueAtTime(2000, t);
    oscHigh.frequency.exponentialRampToValueAtTime(4000, t + 0.02);

    gainHigh.gain.setValueAtTime(0.1, t);
    gainHigh.gain.exponentialRampToValueAtTime(0.01, t + 0.02);

    oscHigh.connect(gainHigh);
    gainHigh.connect(this.masterGain);

    oscHigh.start(t);
    oscHigh.stop(t + 0.02);
  }

  // Short, cool data sweep sound for initiation
  public playProcessStart() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.linearRampToValueAtTime(800, t + 0.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, t);
    filter.frequency.linearRampToValueAtTime(3000, t + 0.2);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // "Access Granted" Success Chime
  public playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Major Triad Arpeggio (Fast)
    osc.frequency.setValueAtTime(523.25, t); // C5
    osc.frequency.setValueAtTime(659.25, t + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, t + 0.16); // G5
    osc.frequency.setValueAtTime(1046.50, t + 0.24); // C6

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.linearRampToValueAtTime(0.1, t + 0.24);
    gain.gain.linearRampToValueAtTime(0, t + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.6);
  }

  public playError() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(100, t + 0.3);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // --- PROCESSING LOOP (The "Cool Loading Sound") ---
  // Plays random data chirps while loading
  public startProcessingLoop() {
    if (this.processingInterval) return;
    this.init();
    
    // Play one sound every 100-200ms
    this.processingInterval = window.setInterval(() => {
        if (!this.ctx || !this.masterGain) return;
        
        // Randomly play a blip
        if (Math.random() > 0.3) {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            // Randomize tone
            const freq = 800 + Math.random() * 1000;
            const type = Math.random() > 0.5 ? 'square' : 'sine';
            const duration = 0.05 + Math.random() * 0.05;

            osc.type = type;
            osc.frequency.setValueAtTime(freq, t);
            
            gain.gain.setValueAtTime(0.05, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

            osc.connect(gain);
            gain.connect(this.masterGain);
            
            osc.start(t);
            osc.stop(t + duration);
        }
    }, 120);
  }

  public stopProcessingLoop() {
    if (this.processingInterval) {
        clearInterval(this.processingInterval);
        this.processingInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
