class Math3D {
    constructor({ WIN }) {
        this.WIN = WIN;
    }

    xs(point) {
        const ScreenPlane = this.calcPlaneFormulaWIN(this.WIN);
        const LineToPoint = this.calcLineFormula(this.WIN.camera.center, point);
        const ScreenPoint = this.calcCrossLandP(ScreenPlane, LineToPoint);
        const Ox = this.calcLineFormula(this.WIN.camera.points[0], this.WIN.camera.points[1]);
        const OnOxPoint = this.calcCrossLandP(this.calcPlaneFormula(ScreenPoint, Ox), Ox);
        const XPLenght = Math.sqrt(
            (this.WIN.camera.points[1].x - OnOxPoint.x) * (this.WIN.camera.points[1].x - OnOxPoint.x) +
            (this.WIN.camera.points[1].y - OnOxPoint.y) * (this.WIN.camera.points[1].y - OnOxPoint.y) +
            (this.WIN.camera.points[1].z - OnOxPoint.z) * (this.WIN.camera.points[1].z - OnOxPoint.z));
        const OPLenght = Math.sqrt(
            (this.WIN.camera.points[1].x - this.WIN.camera.points[0].x) * (this.WIN.camera.points[1].x - this.WIN.camera.points[0].x) +
            (this.WIN.camera.points[1].y - this.WIN.camera.points[0].y) * (this.WIN.camera.points[1].y - this.WIN.camera.points[0].y) +
            (this.WIN.camera.points[1].z - this.WIN.camera.points[0].z) * (this.WIN.camera.points[1].z - this.WIN.camera.points[0].z));
        let cof = 1;
        if (XPLenght < OPLenght)
            cof = -1;
        else
            cof = 1;
        return (cof * Math.sqrt(
            (this.WIN.camera.points[0].x - OnOxPoint.x) * (this.WIN.camera.points[0].x - OnOxPoint.x) +
            (this.WIN.camera.points[0].y - OnOxPoint.y) * (this.WIN.camera.points[0].y - OnOxPoint.y) +
            (this.WIN.camera.points[0].z - OnOxPoint.z) * (this.WIN.camera.points[0].z - OnOxPoint.z)
        ));
    }
    ys(point) {
        const ScreenPlane = this.calcPlaneFormulaWIN(this.WIN);
        const LineToPoint = this.calcLineFormula(this.WIN.camera.center, point);
        const ScreenPoint = this.calcCrossLandP(ScreenPlane, LineToPoint);
        const Oy = this.calcLineFormula(this.WIN.camera.points[0], this.WIN.camera.points[2]);
        const OnOyPoint = this.calcCrossLandP(this.calcPlaneFormula(ScreenPoint, Oy), Oy);
        const YPLenght = Math.sqrt(
            (this.WIN.camera.points[2].x - OnOyPoint.x) * (this.WIN.camera.points[2].x - OnOyPoint.x) +
            (this.WIN.camera.points[2].y - OnOyPoint.y) * (this.WIN.camera.points[2].y - OnOyPoint.y) +
            (this.WIN.camera.points[2].z - OnOyPoint.z) * (this.WIN.camera.points[2].z - OnOyPoint.z));
        const OPLenght = Math.sqrt(
            (this.WIN.camera.points[2].x - this.WIN.camera.points[0].x) * (this.WIN.camera.points[2].x - this.WIN.camera.points[0].x) +
            (this.WIN.camera.points[2].y - this.WIN.camera.points[0].y) * (this.WIN.camera.points[2].y - this.WIN.camera.points[0].y) +
            (this.WIN.camera.points[2].z - this.WIN.camera.points[0].z) * (this.WIN.camera.points[2].z - this.WIN.camera.points[0].z));
        let cof = 1;
        if (YPLenght < OPLenght)
            cof = -1;
        else
            cof = 1;
        return (cof * Math.sqrt(
            (this.WIN.camera.points[0].x - OnOyPoint.x) * (this.WIN.camera.points[0].x - OnOyPoint.x) +
            (this.WIN.camera.points[0].y - OnOyPoint.y) * (this.WIN.camera.points[0].y - OnOyPoint.y) +
            (this.WIN.camera.points[0].z - OnOyPoint.z) * (this.WIN.camera.points[0].z - OnOyPoint.z)
        ));
    }

    calcPlaneFormulaWIN(WIN) {
        const MM1 = [WIN.camera.points[1].x - WIN.camera.points[0].x, WIN.camera.points[1].y - WIN.camera.points[0].y, WIN.camera.points[1].z - WIN.camera.points[0].z];
        const MM2 = [WIN.camera.points[2].x - WIN.camera.points[0].x, WIN.camera.points[2].y - WIN.camera.points[0].y, WIN.camera.points[2].z - WIN.camera.points[0].z];
        const MMMM = [MM1[1] * MM2[2] - MM1[2] * MM2[1], MM1[0] * MM2[2] - MM1[2] * MM2[0], MM1[0] * MM2[1] - MM1[1] * MM2[0]];
        return ({
            A: MMMM[0],
            B: MMMM[1],
            C: MMMM[2],
            D: MMMM[0] * -WIN.camera.points[2].x + MMMM[1] * -WIN.camera.points[2].y + MMMM[2] * -WIN.camera.points[2].z
        })
    }

    calcPlaneFormula(point, line) {
        return ({
            A: line.m,
            B: line.n,
            C: line.p,
            D: line.m * -point.x + line.n * -point.y + line.p * -point.z
        })
    }

    calcLineFormula(point1, point2) {
        return ({
            x0: point1.x,
            y0: point1.y,
            z0: point1.z,
            m: point2.x - point1.x,
            n: point2.y - point1.y,
            p: point2.z - point1.z
        })
    }

    calcCrossLandP(plane, line) {
        const t0 = -1 * (plane.A * line.x0 + plane.B * line.y0 + plane.C * line.z0 + plane.D) / (plane.A * line.m + plane.B * line.n + plane.C * line.p);
        return ({
            x: line.m * t0 + line.x0,
            y: line.n * t0 + line.y0,
            z: line.p * t0 + line.z0
        })
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

    rotate(a, b, y, point) {
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
        return ('rgb(' + r + ', ' + g + ', ' + b + ')')
    }
}