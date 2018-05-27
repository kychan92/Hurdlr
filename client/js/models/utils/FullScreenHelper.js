export class FullScreenHelper
{
    constructor()
    {
        document.body.addEventListener('click', () => this.request());
    }

    request()
    {
        // Supports most browsers and their versions.
        var requestMethod = document.body.requestFullScreen       ||
                            document.body.webkitRequestFullScreen ||
                            document.body.mozRequestFullScreen    ||
                            document.body.msRequestFullScreen;
        if (requestMethod)
        {
            requestMethod.call(document.body);
        }
        else if (typeof window.ActiveXObject !== "undefined")
        {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null)
            {
                wscript.SendKeys("{F11}");
            }
        }
    }
}