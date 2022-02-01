const Ellipse = require("./Ellipse");
const Line = require("./Line");
const Circle = require("./Circle");

class BoundingBox {
    /**
     * Get the bounding box of the given ellipse.
     *
     * @see [Ellipse bounding box](https://iquilezles.org/www/articles/ellipses/ellipses.htm)
     * @param {Ellipse} ellipse
     * @returns
     */
    static ellipseBBox(ellipse) {
        // v => major axis.
        // u => minor axis.
        // d => distance.
        const vx = ellipse.x + ellipse.majorAxisX;
        const vy = ellipse.y + ellipse.majorAxisY;

        const dv = Math.sqrt(
            Math.pow(ellipse.majorAxisX, 2) + Math.pow(ellipse.majorAxisY, 2)
        );

        const du = dv * ellipse.axisRatio;

        const alpha = Math.acos(ellipse.majorAxisX / dv);
        const beta = alpha + Math.PI / 2;

        const ux = ellipse.x + du * Math.cos(beta);
        const uy = ellipse.y + du * Math.sin(beta);

        const minX = ellipse.x + Math.sqrt(Math.pow(ux, 2) + Math.pow(vx, 2));
        const maxY = ellipse.y + Math.sqrt(Math.pow(uy, 2) + Math.pow(vy, 2));

        const maxX = ellipse.x - Math.sqrt(Math.pow(ux, 2) + Math.pow(vx, 2));
        const minY = ellipse.y - Math.sqrt(Math.pow(uy, 2) + Math.pow(vy, 2));

        return {
            max: {
                x: maxX,
                y: maxY,
            },
            min: {
                x: minX,
                y: minY,
            },
        };
    }

    /**
     * Get the bounding box of the given line.
     *
     * @param {Line} line
     * @returns
     */
    static lineBBox(line) {
        return {
            max: {
                x: Math.max(line.x1, line.x2),
                y: Math.max(line.y1, line.y2),
            },
            min: {
                x: Math.min(line.x1, line.x2),
                y: Math.min(line.y1, line.y2),
            },
        };
    }

    /**
     * Get the bounding box of the given circle.
     *
     * @param {Circle} circle
     * @returns
     */
    static circleBBox(circle) {
        return {
            min: { x: circle.x - circle.r, y: circle.y - circle.r },
            max: { x: circle.x + circle.r, y: circle.y + circle.r },
        };
    }

    /**
     * Get the bounding box of all entities.
     *
     * @param {(Ellipse | Line | Circle)[]} entities
     * @returns
     */
    static computeGlobalBBox(entities) {
        const bBoxes = [];

        entities.forEach((entity) => {
            switch (entity.constructor) {
                case Ellipse:
                    bBoxes.push(BoundingBox.ellipseBBox(entity));
                    break;
                case Line:
                    bBoxes.push(BoundingBox.lineBBox(entity));
                    break;
                case Circle:
                    bBoxes.push(BoundingBox.circleBBox(entity));
                    break;
            }
        });

        // TODO More logic for an empty entities.

        const xCoordinates = [];
        const yCoordinates = [];

        bBoxes.forEach((bBox) => {
            xCoordinates.push(bBox.max.x, bBox.min.x);
            yCoordinates.push(bBox.max.y, bBox.min.y);
        });

        const maxX = Math.max(...xCoordinates);
        const minX = Math.min(...xCoordinates);
        const maxY = Math.max(...yCoordinates);
        const minY = Math.min(...yCoordinates);

        return {
            max: { x: maxX, y: maxY },
            min: { x: minX, y: minY },
        };
    }
}

module.exports = BoundingBox;
