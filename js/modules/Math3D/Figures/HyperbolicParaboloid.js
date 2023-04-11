class HyperbolicParaboloid extends Figure {
    constructor(length = 20, width = 20, p = 3, q = 4, count = 20, color = "#ffffff") {
        super();

        const points = [];
        for (let i = 0; i <= length; i += length / count) {
            for (let j = 0; j <= width; j += width / count) {
                const x = - length / 2 + i;
                const y = - width / 2 + j;
                points.push(new Point(
                    x,
                    y,
                    x * x / 2 / p - y * y / 2 / q
                ))
            }
        }


        const edges = [];

        for (let i = 0; i < points.length - 1; i++)
            if ((i + 1) % (count + 1) !== 0)
                edges.push(new Edge(i, i + 1))
        for (let i = 0; i < points.length - count; i++)
            if ((i + count + 1) !== (i + 1) * count && (i + count + 1) !== (count + 1) * (count + 1))
                edges.push(new Edge(i, i + count + 1))

        const polygons = [];

        for (let j = 0; j < count; j++)
            for (let i = 0; i < count; i++)
                polygons.push(new Poligon([
                    j * (count + 1) + i,
                    j * (count + 1) + i + 1,
                    j * (count + 1) + i + count + 2,
                    j * (count + 1) + i + count + 1,
                ], color));


        console.log(points)
        console.log(polygons)
        const pointsZero = [];

        for (let i = 0; i <= length; i += length / count) {
            for (let j = 0; j <= width; j += width / count) {
                const x = - length / 2 + i;
                const y = - width / 2 + j;
                pointsZero.push(new Point(
                    x,
                    y,
                    x * x / 2 / p - y * y / 2 / q
                ))
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.pointsZero = pointsZero;
    }
}