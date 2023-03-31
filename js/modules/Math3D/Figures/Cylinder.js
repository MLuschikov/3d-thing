class Cylinder extends Figure {
    constructor(r1 = 10, r2 = 10, height = 20, RCount = 20, HCount = 5) {
        super();

        this.name = 'Cylinder';

        const points = [];

        for(let j = 0; j < HCount + 1; j++){
            for (let i = 0; i < RCount; i++) {
                const p = 2 * Math.PI / RCount * i;
                points.push(new Point(
                    (r1 - (r1 - r2) / HCount * j) * Math.cos(p),
                    (r1 - (r1 - r2) / HCount * j) * Math.sin(p),
                    -height / 2 + j * height / HCount,
                ));
            }
        }

        console.log(points)
        const edges = [];

        for (let j = 0; j < HCount + 1; j++) {
            for (let i = j * RCount; i < (j + 1) * RCount; i++) {
                edges.push(new Edge(
                    i,
                    i == (j + 1) * RCount - 1 ? j * RCount : i + 1
                ));
            }
        }

        for (let j = 0; j < HCount; j++) {
            for (let i = 0; i < RCount; i++) {
                edges.push(new Edge(
                    i + j * RCount,
                    i + j * RCount + RCount
                ));
            }
        }

        const polygons = [];

        for (let j = 0; j < 2; j++) {
            const cap = [];
            for (let i = j * RCount; i < (j + 1) * RCount + 1; i++) {
                cap.push(
                    i == (j + 1) * RCount ? j * RCount + j * (HCount - 1) * RCount : i + j * (HCount - 1) * RCount
                );
            }
            polygons.push(new Poligon(cap));
        }

        for(let j = 0; j < HCount; j++){
            for (let i = 0; i < RCount; i++) {
                polygons.push(new Poligon([
                    i + RCount * j,
                    i + 1 == RCount ? 0 + RCount * j : i + 1 + RCount * j,
                    i + RCount + 1 == RCount + RCount ? RCount + RCount * j : i + RCount + 1 + RCount * j,
                    i + RCount + RCount * j
                ]));
            }
        }

        const pointsZero = [];

        for(let j = 0; j < HCount + 1; j++){
            for (let i = 0; i < RCount; i++) {
                const p = 2 * Math.PI / RCount * i;
                pointsZero.push(new Point(
                    (r1 - (r1 - r2) / HCount * j) * Math.cos(p),
                    (r1 - (r1 - r2) / HCount * j) * Math.sin(p),
                    -height / 2 + j * height / HCount,
                ));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.pointsZero = pointsZero;
    }
}