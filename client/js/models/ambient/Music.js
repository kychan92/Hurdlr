export class Music
{
    constructor()
    {
        this.audio     = document.createElement('audio');
        this.audio.src = './mp3/background.mp3';

        this.audio.setAttribute('preload',  'auto');
        this.audio.setAttribute('controls', 'none');
        this.audio.setAttribute('loop',     'none');
        this.audio.volume = 0.03;
        this.audio.style.display = 'none';

        document.body.appendChild(this.audio);
        document.body.addEventListener('click', () => this.request());
    }

    request()
    {
        this.audio.play();
    }
}