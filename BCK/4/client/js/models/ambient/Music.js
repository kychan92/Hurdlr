export class Music
{
    constructor()
    {
        this.audio     = document.createElement('audio');
        this.audio.src = './mp3/background.mp3';

        this.audio.setAttribute('preload',  'auto');
        this.audio.setAttribute('controls', 'none');
        this.audio.setAttribute('loop',     'none');
        this.audio.style.display = 'none';

        document.body.appendChild(this.audio);

        //this.audio.play();
    }
}