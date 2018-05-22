let date = new Date();

let prepend = (val) => {
    return val < 10 ? '0' + val : val;
};

module.exports = date.toLocaleDateString('nl-NL') + ` ${prepend(date.getHours())}:${prepend(date.getMinutes())}:${prepend(date.getSeconds())}`;