class Handle {
    static seed = 0;

    static next() {
        return (++Handle.seed).toString(16).toUpperCase();
    }

    static peek() {
        return (Handle.seed + 1).toString(16).toUpperCase();
    }
}

module.exports = Handle;
