String.prototype.ucfirst = function () {
    if (this.charAt(1).match(/[a-z]/)) {
            return this.charAt(0).toUpperCase() + this.slice(1);
    } else {
            return this;
    }
};

var pArray = {
    swap: function(array, x, y)
    {
        var b = array[x];
        array[x] = array[y];
        array[y] = b;
    }
};
var pObject = {
    emptyR: function(obj)
    {
        return JSON.parse(JSON.stringify(obj).replace(/"[A-Za-z0-9_]*":\[\]/,'').replace(/{,/,'{').replace(/,}/,'}'));
    }
};