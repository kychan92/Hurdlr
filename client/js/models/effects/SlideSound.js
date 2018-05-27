export class SlideSound
{
    constructor()
    {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.noise        = this.getNoise();
        this.gainNode     = this.audioContext.createGain();
        this.volume       = this.gainNode.gain;
        this.volume.value = 0;

        this.noise.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
    }

    set(player)
    {
        this.volume.value  = 0;

        if (player.isJumping) return;

        if (player.velocityX > 150)
        {
            this.volume.value = 0.005;
        }
    }

    getNoise()
    {
        let bufferSize = 4096;
        let lastOut    = 0.0;
        let node       = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
        node.onaudioprocess = function(e)
        {
            let output = e.outputBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++)
            {
                let white = Math.random() * 2 - 1;
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                output[i] *= 3.5; // (roughly) compensate for gain
            }
        }

        return node;
    }
}