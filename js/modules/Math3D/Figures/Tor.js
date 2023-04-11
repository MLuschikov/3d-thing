class Tor extends Figure {
    constructor(r1 = 10, r2 = 3, height = 6, RCount = 20, HCount = 20, color = '#ffffff') {
        super();

        this.name = 'Tor';

        const points = [];

        for (let j = 0; j < 2 * Math.PI; j = j + 2 * Math.PI / HCount) {
            for (let i = 0; i < RCount; i++) {
                const p = 2 * Math.PI / RCount * i;
                points.push(new Point(
                    (r1 + r2 * Math.cos(j)) * Math.cos(p),
                    (r1 + r2 * Math.cos(j)) * Math.sin(p),
                    height / 2 * Math.sin(j),
                ));
            }
        }

        const edges = [];

        for (let j = 0; j < HCount; j++) {
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
                    i + j * RCount + RCount == i + RCount * HCount ? i : i + j * RCount + RCount
                ));
            }
        }

        const polygons = [];

        for (let j = 0; j < HCount - 1; j++) {
            for (let i = 0; i < RCount; i++) {
                polygons.push(new Poligon([
                    i + RCount * j,
                    i + 1 == RCount ? 0 + RCount * j : i + 1 + RCount * j,
                    i + RCount + 1 == RCount + RCount ? RCount + RCount * j : i + RCount + 1 + RCount * j,
                    i + RCount + RCount * j
                ],
                    color));
            }
        }

        for (let i = 0; i < RCount - 1; i++) {
            polygons.push(new Poligon([
                i + RCount * (HCount - 1),
                i + 1 + RCount * (HCount - 1),
                i + 1,
                i
            ],
                color));

        }

        polygons.push(new Poligon([
            0,
            RCount * (HCount - 1),
            RCount * HCount - 1,
            RCount - 1
        ],
            color));

        const pointsZero = [];

        for (let j = 0; j < 2 * Math.PI; j = j + 2 * Math.PI / HCount) {
            for (let i = 0; i < RCount; i++) {
                const p = 2 * Math.PI / RCount * i;
                pointsZero.push(new Point(
                    (r1 + r2 * Math.cos(j)) * Math.cos(p),
                    (r1 + r2 * Math.cos(j)) * Math.sin(p),
                    height / 2 * Math.sin(j),
                ));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.pointsZero = pointsZero;
    }
}