//jshint esversion:6
exports.getDay = () => {
    let optionsForDay = { weekday: 'long', month: 'long', day: 'numeric'};
    const today = new Date();
    let day = today.toLocaleString("en-US", optionsForDay);
    return day;
}

exports.getTime = () => {
    let optionsForTime ={ hour: "2-digit", minute: "2-digit" }
    const today = new Date();
    today.toLocaleString();       // -> "2/1/2013 7:37:08 AM"
    let time = today.toLocaleTimeString("en-US", optionsForTime);  // -> "7:38:05 AM"
    return time;
}