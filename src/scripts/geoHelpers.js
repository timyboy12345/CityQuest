export function pointInCircle(x, y, cx, cy, radius) {
    const distanceSquare = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distanceSquare <= radius * radius;
}

export function pointInPoly(point, polygon) {
    // Making sure start and end points are the same.
    if (polygon[0] !== polygon[polygon.length - 1]) {
        polygon[polygon.length] = polygon[0];
    }
    let j = 0;
    let oddNodes = false;
    let x = point[1]; // Input Lat
    let y = point[0]; // Input Long
    let n = polygon.length;
    for (let i = 0; i < n; i++) {
        j++;
        if (j === n) {
            j = 0;
        }
        if (((polygon[i][0] < y) && (polygon[j][0] >= y)) || ((polygon[j][0] < y) && (polygon[i][0] >= y))) {
            if (polygon[i][1] + (y - polygon[i][0]) / (polygon[j][0] - polygon[i][0]) * (polygon[j][1] - polygon[i][1]) < x) {
                oddNodes = !oddNodes;
            }
        }
    }
    return oddNodes;
}

export function findPolyCenter(poly) {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    function Region(points) {
        this.points = points || [];
        this.length = points.length;
    }

    Region.prototype.area = function () {
        var area = 0,
            i,
            j,
            point1,
            point2;

        for (i = 0, j = this.length - 1; i < this.length; j = i, i++) {
            point1 = this.points[i];
            point2 = this.points[j];
            area += point1.x * point2.y;
            area -= point1.y * point2.x;
        }
        area /= 2;

        return area;
    };

    Region.prototype.centroid = function () {
        var x = 0,
            y = 0,
            i,
            j,
            f,
            point1,
            point2;

        for (i = 0, j = this.length - 1; i < this.length; j = i, i++) {
            point1 = this.points[i];
            point2 = this.points[j];
            f = point1.x * point2.y - point2.x * point1.y;
            x += (point1.x + point2.x) * f;
            y += (point1.y + point2.y) * f;
        }

        f = this.area() * 6;

        return new Point(x / f, y / f);
    };

    const polygon = poly.map(p => {
        return {x: p[0], y: p[1]}
    });
    const region = new Region(polygon);

    const center = region.centroid();
    return [center.x, center.y]
}
