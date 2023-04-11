class Sphere extends Figure {
    constructor(rx = 10, ry = 10, rz = 10, count = 20, color = '#ffffff') {
        super();

        this.name = 'Sphere';

        const points = [];
        // x = r * sin(T) * cos(p)
        // y = r * sin(T) * sin(p)
        // z = r * cos(T)
        for (let j = 0; j <= count; j++) {
            const T = Math.PI / count * j;
            for (let i = 0; i < count; i++) {
                const p = 2 * Math.PI / count * i;
                points.push(new Point(
                    rx * Math.sin(T) * Math.cos(p),
                    ry * Math.sin(T) * Math.sin(p),
                    rz * Math.cos(T)
                ));
            }
        }

        const edges = [];

        for (let j = 0; j <= count; j++) {
            for (let i = j * count; i < (j + 1) * count; i++) {
                edges.push(new Edge(
                    i,
                    i == (j + 1) * count - 1 ? j * count : i + 1
                ));
            }
        }

        for (let j = 0; j < count; j++) {
            for (let i = j; i < (count) * count; i += count) {
                edges.push(new Edge(
                    i,
                    i == (j + 1) * count - 1 ? j * count : i + count
                ));
            }
        }

        const polygons = [];

        for (let j = 0; j <= count; j++) {
            for (let i = j == 0 ? 0 : (j - 1) * count; i < j * count; i++) {
                polygons.push(new Poligon([
                    i,
                    i + 1 == j * count ? (j == 0 ? 0 : (j - 1) * count) : i + 1,
                    i + 1 == j * count ? i + 1 : i + count + 1,
                    i + count],
                color));
            }
        }

        const pointsZero = [];

        for (let j = 0; j <= count; j++) {
            const T = Math.PI / count * j;
            for (let i = 0; i < count; i++) {
                const p = 2 * Math.PI / count * i;
                pointsZero.push(new Point(
                    rx * Math.sin(T) * Math.cos(p),
                    ry * Math.sin(T) * Math.sin(p),
                    rz * Math.cos(T),
                ));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.pointsZero = pointsZero;
    }
}