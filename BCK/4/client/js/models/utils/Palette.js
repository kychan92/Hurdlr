export class Palette
{
    constructor()
    {
        this.palettes = [
            {
                BACKGROUND : '#bdeda8',
                HILLS      : '#57ab8270',
                FLOOR      : '#3c9179',
                USER       : '#0025409a',
                STARS      : '#FFF',
                TEXT       : '#FFF'
            },
            {
                BACKGROUND : '#90a9b7',
                HILLS      : '#27272788',
                FLOOR      : '#4e5283',
                USER       : '#cca7a29a',
                STARS      : '#d9bbf9',
                TEXT       : '#FFF'
            },
            {
                BACKGROUND : '#832161',
                HILLS      : '#da416788',
                FLOOR      : '#f0eff4',
                USER       : '#3d2645',
                STARS      : '#d9bbf9',
                TEXT       : '#FFF'
            },
            {
                BACKGROUND : '#718f94',
                HILLS      : '#90b49488',
                FLOOR      : '#dbcfb0',
                USER       : '#545775',
                STARS      : '#d9bbf9',
                TEXT       : '#FFF'
            }
        ];
    }

    next()
    {
        return this.palettes[ Math.floor(Math.random() * this.palettes.length) ];
    }
}