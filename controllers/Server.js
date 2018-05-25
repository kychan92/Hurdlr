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
        
                response.writeHead(200);
                response.end(data);
            });
        });
    }
}