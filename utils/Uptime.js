let date = new Date();

let prepend = (val) => {
    return val < 10 ? '0' + val : val;
};

process.env.UPTIME = date.toLocaleDateString('nl-NL') + ` ${prepend(date.getHours())}:${prepend(date.getMinutes())}:${prepend(date.getSeconds())}`;
console.log(`Starting server at ${process.env.UPTIME}`);