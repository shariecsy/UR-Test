var now = +(new Date());
var index = 0;
var uid=function() {
    return "ucs-upload-" + now + "-" + (++index);
};
module.exports =uid;
