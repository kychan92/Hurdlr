export class Music2
{
    constructor()
    {
        this.audioContext    = new (AudioContext || webkitAudioContext)();
        this.gain            = this.audioContext.createGain();
        this.gain.gain.value = 0.1;
        this.gain.connect(this.audioContext.destination);

        this.notes = [
            this.createOscillator(261.6),
            this.createOscillator(293.7),
            this.createOscillator(329.6),
            this.createOscillator(349.2),
            this.createOscillator(392),
            this.createOscillator(440),
            this.createOscillator(493.9),
            this.createOscillator(523.3),
            this.createOscillator(587.3)
        ];

        this.current = 0;
        this.start   = 0;

        setInterval(() => this.tick(), 800);
    }

    getNote()
    {
        return this.notes[ this.start + (this.current*2) ];
    }

    tick()
    {
        this.notes.forEach(x => x.disconnect());

        if (this.current == 4)
        {
            this.start   = Math.floor(Math.random() * 3);
            this.current = 0;
        }

        this.getNote().connect(this.gain);
        this.current++;
    }

    createOscillator(frequency)
    {
        let osc = this.audioContext.createOscillator();
        osc.frequency.value = frequency;
        osc.type = 'triangle';
        osc.start(0);

        return osc;
    };
}