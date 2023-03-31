class Graph3D extends Component {
    constructor(props) {
        super(props);

        this.WIN = {
            left: -5,
            bottom: -5,
            width: 10,
            height: 10,
            camera: new Point(0, 50, 0),
            focus: new Point(0, 30, 0)
        };

        this.canvas = new Canvas({
            id: 'canvas3D',
            WIN: this.WIN,
            width: 700,
            height: 700,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
                mousemove: (event) => this.mousemove(event),
                mouseleave: () => this.mouseleave()
            }
        });

        this.math3D = new Math3D({ WIN: this.WIN });

        new Graph3DUI({
            id: 'graph3DUI',
            parent: this.id,
            template: template.Graph3DUITemplate,
            callbacks: {
                addFigure: (figure) => this.addFigure(figure),
                changeFigure: (event) => this.changeFigure(event),
                delFigure: (num) => this.delFigure(num),
                elemVisibile: (id) => this.elemVisibile(id)
            }
        });

        this.LIGHT = new Light(20, 20, 20);

        this.figures = [];

        this.CBP = true;
        this.CBE = true;
        this.CBF = true;

        this.renderScene(this.figures, this.CBP, this.CBE, this.CBF);
    }

    wheel(event) {
        const delta = event.wheelDelta > 0 ? -1 : 1;
        this.WIN.camera.y += delta;
        this.WIN.focus.y += delta;
        this.renderScene(this.figures, this.CBP, this.CBE, this.CBF);
    }

    mouseup() {
        this.canRotate = false;
    }

    mousedown() {
        this.canRotate = true;
    }

    mouseleave() {
        this.canRotate = false;
    }

    mousemove(event) {
        if (this.canRotate) {
            const { movementX, movementY } = event;
            this.figures.forEach(figure => {
                figure.points.forEach(point => {
                    this.math3D.rotateX(movementY / 180, point);
                    this.math3D.rotateZ(movementX / 180, point);
                    /*
                    if (event.altKey) {
                        this.math3D.rotateY(movementY / 180, point);
                    }
                    */
                    this.figures[0].rotX += movementY / 180;
                    this.figures[0].rotZ += movementX / 180;

                });
            });
            this.renderScene(this.figures, this.CBP, this.CBE, this.CBF);
        }
    }

    clear() {
        this.canvas.clear();
    };

    renderScene(figures, CBP, CBE, CBF) {

        this.clear();

        const scene = new Figure;

        figures.forEach(figure => {

            figure.polygons.forEach(polygon => {
                const points = [];

                for (let i = 0; i < polygon.points.length; i++) {
                    points.push(figure.points[polygon.points[i]]);
                }

                scene.polygons.push(new Poligon(points, polygon.color));
            });

            figure.edges.forEach(edge => {
                const point1 = figure.points[edge.p1];
                const point2 = figure.points[edge.p2];

                scene.edges.push(new Edge(point1, point2));
            });

            figure.points.forEach(point =>
                scene.points.push(point)
            )
        });

        this.math3D.calcCenters(scene);
        this.math3D.calcDistance(scene, this.WIN.camera, 'distance');
        this.math3D.calcDistance(scene, this.LIGHT, 'lumen');
        this.math3D.sortByArtistAlgoritm(scene.polygons);

        if (CBE) {
            scene.edges.forEach(edge => {
                const point1 = edge.p1;
                const point2 = edge.p2;
                this.canvas.line(
                    this.math3D.xs(point1),
                    this.math3D.ys(point1),
                    this.math3D.xs(point2),
                    this.math3D.ys(point2),
                );
            });
        }

        if (CBP) {
            scene.points.forEach(point =>
                this.canvas.point(
                    this.math3D.xs(point),
                    this.math3D.ys(point)
                ));
        }

        if (CBF) {
            scene.polygons.forEach(polygon => {

                let { r, g, b } = polygon.color;

                const lumen = this.math3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);

                polygon.color = this.math3D.RGBToHex(Math.round(r * lumen), Math.round(g * lumen), Math.round(b * lumen));

                this.canvas.polygon(
                    polygon.points.map(point => {
                        return {
                            x: this.math3D.xs(point),
                            y: this.math3D.ys(point)
                        }
                    }),
                    polygon.color)
            });
        }
    }

    addFigure(figure) {
        switch (figure) {
            case 'Cube': this.figures[0] = new Cube; break;
            case 'Sphere': this.figures[0] = new Sphere; break;
            case 'Cylinder': this.figures[0] = new Cylinder; break;
        }
        this.renderScene(this.figures, this.CBP, this.CBE, this.CBF);
    }

    changeFigure(event) {
        switch (event.target.className) {
            case 'scale':
                for (let i = 0; i < this.figures[event.target.dataset.num].points.length; i++) {
                    this.figures[event.target.dataset.num].points[i].x = this.figures[event.target.dataset.num].pointsZero[i].x;
                    this.figures[event.target.dataset.num].points[i].y = this.figures[event.target.dataset.num].pointsZero[i].y;
                    this.figures[event.target.dataset.num].points[i].z = this.figures[event.target.dataset.num].pointsZero[i].z;
                }
                this.figures[event.target.dataset.num].points.forEach(point => {
                    if (isNaN(event.target.value) || event.target.value - 0 <= 0) {
                        this.math3D.scale(1, point)
                    }
                    else
                        this.math3D.scale((event.target.value - 0) / 100, point)
                })
                break;

            case 'size':
                const rotX = this.figures[0].rotX;
                const rotZ = this.figures[0].rotZ;

                switch (this.figures[0].name) {
                    case 'Cube':
                        this.figures[0] = new Cube(
                            document.getElementById('length').value ? document.getElementById('length').value - 0 : 10,
                            document.getElementById('width').value ? document.getElementById('width').value - 0 : 10,
                            document.getElementById('height').value ? document.getElementById('height').value - 0 : 10
                        )
                        break;
                    case 'Sphere':
                        this.figures[0] = new Sphere(
                            document.getElementById('length').value ? document.getElementById('length').value - 0 : 10,
                            document.getElementById('width').value ? document.getElementById('width').value - 0 : 10,
                            document.getElementById('height').value ? document.getElementById('height').value - 0 : 10,
                            document.getElementById('detalization').value ? document.getElementById('detalization').value - 0 : 30
                        )
                        break;
                    case 'Cylinder':
                        this.figures[0] = new Cylinder(
                            document.getElementById('RTop').value ? document.getElementById('RTop').value - 0 : 10,
                            document.getElementById('RBot').value ? document.getElementById('RBot').value - 0 : 10,
                            document.getElementById('height').value ? document.getElementById('height').value - 0 : 20,
                            document.getElementById('RDetalization').value ? document.getElementById('RDetalization').value - 0 : 20,
                            document.getElementById('HDetalization').value ? document.getElementById('HDetalization').value - 0 : 5
                        )
                        break;
                }

                /*
                this.figures[0].points.forEach(point => {
                    this.math3D.rotateX(this.figures[0].rotX, point);
                    this.math3D.rotateZ(this.figures[0].rotZ, point);
                })
                */
                this.figures[0].polygons.forEach(polygon => polygon.color = document.getElementById('color').value)
                break;

            case 'color':
                this.figures[event.target.dataset.num].polygons.forEach(polygon => polygon.color = event.target.value)
                break;
        }
        this.renderScene(this.figures, this.CBP, this.CBE, this.CBF);
    }

    delFigure(num) {
        this.figures[num] = new Figure;
        this.renderScene(this.figures, this.CBP, this.CBE, this.CBF);
    }

    elemVisibile(id) {
        switch (id) {
            case 'CBPoints': this.CBP = !this.CBP;
                this.renderScene(this.figures, this.CBP, this.CBE, this.CBF);
                break;
            case 'CBEdjes': this.CBE = !this.CBE;
                this.renderScene(this.figures, this.CBP, this.CBE, this.CBF);
                break;
            case 'CBFaces': this.CBF = !this.CBF;
                this.renderScene(this.figures, this.CBP, this.CBE, this.CBF);
                break;
        }
    }
}