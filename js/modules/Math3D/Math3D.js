class Math3D {
    constructor({ WIN }) {
        this.WIN = WIN;
        this.matrixCalc = new MatrixCalculator;
    }
    xs(point) {
        const yc = this.WIN.camera.y;
        const yf = this.WIN.focus.y;
        return (point.x * (yc - yf) / (yc - point.y));
    }
    ys(point) {
        const yc = this.WIN.camera.y;
        const yf = this.WIN.focus.y;
        return (point.z * (yc - yf) / (yc - point.y));
    }

    calcCenters(figure) {
        figure.polygons.forEach(polygon => {
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let j = 0; j < points.length; j++) {
                x += points[j].x;
                y += points[j].y;
                z += points[j].z;
            }
            polygon.center.x = x / points.length;
            polygon.center.y = y / points.length;
            polygon.center.z = z / points.length;
        });
    }

    calcDistance(figure, endPoint, name) {
        figure.polygons.forEach(polygon => {
            polygon[name] = Math.sqrt(
                Math.pow(endPoint.x - polygon.center.x, 2) +
                Math.pow(endPoint.y - polygon.center.y, 2) +
                Math.pow(endPoint.z - polygon.center.z, 2)
            );
        });
    }

    sortByArtistAlgoritm(polygons) {
        polygons.sort((a, b) => b.distance - a.distance);
    }

    mult(T, m) {
        const C = [];
        for (let i = 0; i < m.length; i++) {
            let s = 0;
            for (let j = 0; j < m.length; j++) {
                s += T[j][i] * m[j];
            }
            C.push(s);
        }
        return C;
    }

    scale(delta, point) {
        const array = this.mult(
            [[delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateX(corner, point) {
        const array = this.mult(
            [[1, 0, 0],
            [0, Math.cos(corner), -Math.sin(corner)],
            [0, Math.sin(corner), Math.cos(corner)]],
            [point.x, point.y, point.z]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateY(corner, point) {
        const array = this.mult(
            [[Math.cos(corner), 0, Math.sin(corner)],
            [0, 1, 0],
            [-Math.sin(corner), 0, Math.cos(corner)]],
            [point.x, point.y, point.z]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateZ(corner, point) {
        const array = this.mult(
            [[Math.cos(corner), -Math.sin(corner), 0],
            [Math.sin(corner), Math.cos(corner), 0],
            [0, 0, 1]],
            [point.x, point.y, point.z]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotate(a, b, y, point){
        const array = this.mult(
            [[Math.cos(b) * Math.cos(y), -Math.sin(y) * Math.cos(b), Math.sin(b)],
            [Math.sin(a) * Math.sin(b) * Math.cos(y) + Math.sin(y) * Math.cos(a), -Math.sin(a) * Math.sin(b) * Math.sin(y) + Math.cos(a) * Math.cos(y), -Math.sin(a) * Math.cos(b)],
            [Math.sin(a) * Math.sin(y) - Math.sin(b) * Math.cos(a) * Math.cos(y), Math.sin(a) * Math.cos(y) + Math.sin(b) * Math.sin(y) * Math.cos(a), Math.cos(a) * Math.cos(b)]],
            [point.x, point.y, point.z]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    calcIllumination(distance, lumen) {
        const res = distance ? lumen / Math.pow(distance, 3) : 1;
        return (res > 1 ? 1 : res);
    }

    RGBToHex(r, g, b) {
        return('rgb(' + r + ', ' + g + ', ' + b + ')')
    }
}