export class NameGenerator
{
    constructor()
    {
        this.generateName();
    }

    get()
    {
        if (localStorage)
        {
            let name = localStorage.getItem('name');
            if (name)
            {
                this.name = name;
                return name;
            }

            this.save(this.name);

            return this.name;
        }

        return this.name;
    }

    save(name)
    {
        if (localStorage)
        {
            localStorage.setItem('name', name);
        }

        this.name = name;
    }

    generateName()
    {
        this.name = 'player' + Math.floor(Math.random() * 100000).toString(16);

        return name;
    }
}