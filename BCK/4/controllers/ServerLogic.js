const fs   = require('fs');
const http = require('http');

module.exports = function()
{
    this.server = http.createServer((request, response) =>
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