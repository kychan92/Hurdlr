import fs   from 'fs';
import http from 'http';

export class Server
{
    constructor()
    {
        return this.server = http.createServer((request, response) =>
        {
            if (!request.url || request.url == '/')
            {
                request.url = '/index.html';
            }

            fs.readFile('./client' + request.url, (error, data) => {
                if (error)
                {
                    response.writeHead(500);
                    response.end(JSON.stringify(error));
                    return;
                }

                response.setHeader('Content-Type', this.getMimeType(request.url));
                response.writeHead(200);
                response.end(data);
            });
        });
    }

    getMimeType(file)
    {
        if (file.endsWith('.css')) return 'text/css';
        if (file.endsWith('.html')) return 'text/html';
        if (file.endsWith('.js'))  return 'application/javascript';

        return 'text/plain';
    }
}