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
