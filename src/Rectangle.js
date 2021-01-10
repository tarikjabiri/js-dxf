/**
 * Class Rectangle
 * To Draw a Closed Rectangle
 * The Drawing.drawRect(x1, y1, x2, y2) draws 4 lines separated
 * I added Drawing.drawRectClosed(x1, y1, x2, y2)
 * 
 * I did'nt implement the toDxfString() function because I'll use the class Polyline
 * in the Drawing.drawRectClosed(x1, y1, x2, y2) function
 * 
 * finally it will be just a closed Polyline xD
 */
class Rectangle
{
    constructor(x1, y1, x2, y2)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    getCornersPoints()
    {
        let corners = [];

        corners.push([this.x1, this.y1]);
        corners.push([this.x1, this.y2]);
        corners.push([this.x2, this.y2]);
        corners.push([this.x2, this.y1]);

        return corners;
    }

}

module.exports = Rectangle;