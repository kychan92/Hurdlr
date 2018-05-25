export class MessageBox
{
    constructor(nameGenerator, io)
    {
        this.nameGenerator = nameGenerator;
        this.name          = name;
        this.io            = io;
        this.container     = document.createElement('div');
        this.container.id  = 'message-container';

        this.messageBox    = document.createElement('div');
        this.messageBox.id = 'message-box';

        this.inputField = document.createElement('input');
        this.inputField.setAttribute('type', 'text');

        document.body.appendChild(this.container);
        this.container.appendChild(this.messageBox);
        this.container.appendChild(this.inputField);

        this.inputField.addEventListener('keydown', (event) => this.onKey(event));

        this.io.on('message', (data) => this.addMessage(this.nameGenerator.name, data.message));

        this.addWelcomeMessage();
    }

    addMessage(name, message)
    {
        this.messageBox.innerHTML += `<div class="item"><span class="name">${name}</span>: ${message}</div>`;
        this.messageBox.scrollTo(0, this.messageBox.scrollHeight);
    }

    addWelcomeMessage()
    {
        this.messageBox.innerHTML += '<div class="item-break-word">Welcome visitor! Outplay your enemies by sliding faster and beat them. Change name with /name in chat.</div>';
    }

    onKey(event)
    {
        if (event.keyCode == 13)
        {
            this.io.emit('message', {
                name    : this.nameGenerator.name,
                message : this.inputField.value
            });

            this.inputField.value = '';
        }
    }
}