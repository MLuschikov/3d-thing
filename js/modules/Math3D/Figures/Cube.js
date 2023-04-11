class Cube extends Figure {
    constructor(length = 10, width = 10, height = 10, color = '#ffffff') {
        super();

        this.name = 'Cube';

        this.length = length;
        this.width = width;
        this.height = height;
        this.points = [
            new Point(-this.length / 2, -this.width / 2, -this.height / 2),
            new Point(-this.length / 2, this.width / 2, -this.height / 2),
            new Point(-this.length / 2, this.width / 2, this.height / 2),
            new Point(-this.length / 2, -this.width / 2, this.height / 2),
            new Point(this.length / 2, -this.width / 2, -this.height / 2),
            new Point(this.length / 2, this.width / 2, -this.height / 2),
            new Point(this.length / 2, this.width / 2, this.height / 2),
            new Point(this.length / 2, -this.width / 2, this.height / 2),
        ];
        this.edges = [
            new Edge(0, 1),
            new Edge(1, 2),
            new Edge(2, 3),
            new Edge(3, 0),
            new Edge(4, 5),
            new Edge(5, 6),
            new Edge(6, 7),
            new Edge(7, 4),
            new Edge(0, 4),
            new Edge(1, 5),
            new Edge(2, 6),
            new Edge(3, 7)
        ];
        this.polygons = [
            new Poligon([0, 1, 2, 3], color),
            new Poligon([4, 5, 6, 7], color),
            new Poligon([1, 5, 6, 2], color),
            new Poligon([0, 4, 7, 3], color),
            new Poligon([0, 4, 5, 1], color),
            new Poligon([3, 7, 6, 2], color)
        ];

        this.pointsZero = [
            new Point(-10 / 2, -10 / 2, -10 / 2),
            new Point(-10 / 2, 10 / 2, -10 / 2),
            new Point(-10 / 2, 10 / 2, 10 / 2),
            new Point(-10 / 2, -10 / 2, 10 / 2),
            new Point(10 / 2, -10 / 2, -10 / 2),
            new Point(10 / 2, 10 / 2, -10 / 2),
            new Point(10 / 2, 10 / 2, 10 / 2),
            new Point(10 / 2, -10 / 2, 10 / 2),
        ];

        this.rotX = 0;
        this.rotY = 0;
        this.rotZ = 0;

        this.scale = 1;
    }
}