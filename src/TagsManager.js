class TagsManager {
    constructor() {
        this.lines = [];
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    point(x, y, z = 0) {
        this.push(10, x);
        this.push(20, y);
        this.push(30, z);
    }

    /**
     *
     * @param {string} name The name of the section
     */
    start(name) {
        this.push(0, "SECTION");
        this.push(2, name);
    }

    end() {
        this.push(0, "ENDSEC");
    }

    addHeaderVariable(name, tagsElements) {
        this.push(9, `$${name}`);
        tagsElements.forEach((tagElement) => {
            this.push(tagElement[0], tagElement[1]);
        });
    }

    push(code, value) {
        this.lines.push(code, value);
    }

    toDxfString() {
        return this.lines.join("\n");
    }
}

module.exports = TagsManager;
