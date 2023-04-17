class Graph3D extends Component {
    constructor(props) {
        super(props);

        this.WIN = {
            left: -5,
            bottom: -5,
            width: 10,
            height: 10,
            camera: new Camera(0, 50, 0, 20, 10, 10)
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
        this.SolSysRotate = true;

        this.backColor = '#ffffff';

        /*setInterval(() => {
            this.figures.forEach(figure => figure.doAnimation(this.math3D))
            this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
        }, 50);*/

        this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
    }

    wheel(event) {
        const delta = event.wheelDelta > 0 ? -1 : 1;
        this.WIN.camera.center.y += delta;
        this.WIN.camera.points[0].y += delta;
        this.WIN.camera.points[1].y += delta;
        this.WIN.camera.points[2].y += delta;
        this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
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
        if (event.buttons == 2) {
            const { movementX, movementY } = event;
            if (this.SolSysRotate) {
                this.WIN.camera.points.forEach(point => {
                    point.x - this.WIN.camera.center.x;
                    point.y - this.WIN.camera.center.y;
                    point.z - this.WIN.camera.center.z;
                    this.math3D.rotateX(movementY / 180, point);
                    this.math3D.rotateZ(movementX / 180, point);
                    point.x + this.WIN.camera.center.x;
                    point.y + this.WIN.camera.center.y;
                    point.z + this.WIN.camera.center.z;
                });
            }
            this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
        }
        if (event.buttons == 4) {
            const { movementX, movementY } = event;
            this.WIN.camera.points.forEach(point => {
                point.x -= movementX / 30;
                point.y -= 0;
                point.z += movementY / 30;
            });
            this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
        }
        if (event.buttons == 1) {
            const { movementX, movementY } = event;
            this.figures[0].points.forEach(point => {
                this.math3D.rotateX(movementY / 180, point);
                this.math3D.rotateZ(movementX / 180, point);
            });
            this.math3D.rotateX(movementY / 180, this.figures[0].angleChecker);
            this.math3D.rotateZ(movementX / 180, this.figures[0].angleChecker);
            this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
        }
    }

    clear(color) {
        this.canvas.clear(color);
    };

    renderScene(figures, CBP, CBE, CBF, backColor) {

        this.clear(backColor);

        const angle = this.figures[0].checkAngle();
        console.log(angle.xA / Math.PI * 180, angle.yA / Math.PI * 180, angle.zA / Math.PI * 180)

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

            figure.points.forEach(point => {
                scene.points.push(point)
            }
            )
        });

        this.math3D.calcCenters(scene);
        this.math3D.calcDistance(scene, this.WIN.camera.center, 'distance');
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
            scene.points.forEach(point => {
                this.canvas.point(
                    this.math3D.xs(point),
                    this.math3D.ys(point)
                )
            });
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
            case 'Cube':
                this.figures = [];
                this.figures[0] = new Cube;
                break;
            case 'Sphere':
                this.figures = [];
                this.figures[0] = new Sphere;
                break;
            case 'Cylinder':
                this.figures = [];
                this.figures[0] = new Cylinder;
                break;
            case 'Tor':
                this.figures = [];
                this.figures[0] = new Tor;
                break;
            case 'HypPor':
                this.figures = [];
                this.figures[0] = new HyperbolicParaboloid;
                break;
            case 'ElPor':
                this.figures = [];
                this.figures[0] = new ElepticParaboloid;
                break;
            case 'TRSolSys':
                this.figures = [];
                this.figures = TRSolS.figures;
                break;
            case 'SolSys':
                this.figures = [];
                this.figures = SolS.figures;
                break;
        }
        if (figure === 'TRSolSys' || figure === 'SolSys') {
            this.SolSysRotate = false;
            this.CBP = false;
            this.CBE = false;
            this.backColor = '#111111';
            this.LIGHT = new Light(0, 0, 0, 3.828 * Math.pow(10, 26));

            const AE = new TheRealSolarSystem.AE;
            const NRAE = new SolarSystem.NRAE;
            if (figure === 'TRSolSys')
                this.WIN.camera = new Camera(0, AE * 80, 0, 20, 10, 10);
            else
                this.WIN.camera = new Camera(0, NRAE * 80, 0, 20, 10, 10);
        }
        else {
            this.SolSysRotate = true;
            this.backColor = '#ffffff';
            this.LIGHT = new Light(20, 20, 20);
            this.WIN.camera = new Camera(0, 50, 0, 20, 10, 10);
            this.CBP = true;
            this.CBE = true;
        }
        this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
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
                switch (this.figures[0].name) {
                    case 'Cube':
                        const angle = this.figures[0].checkAngle();
                        const angleChecker = this.figures[0].angleChecker;
                        this.figures[0] = new Cube(
                            document.getElementById('length').value ? document.getElementById('length').value - 0 : 10,
                            document.getElementById('width').value ? document.getElementById('width').value - 0 : 10,
                            document.getElementById('height').value ? document.getElementById('height').value - 0 : 10
                        )
                        this.figures[0].points.forEach(point => {
                            this.math3D.rotateX(angle.xA, point);
                            this.math3D.rotateX(angle.yA, point);
                            this.math3D.rotateZ(angle.zA, point);
                        });
                        this.figures[0].angleChecker = angleChecker;
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
                        let isCap = this.figures[0].isCap;
                        this.figures[0] = new Cylinder(
                            document.getElementById('RTop').value ? document.getElementById('RTop').value - 0 : 10,
                            document.getElementById('RBot').value ? document.getElementById('RBot').value - 0 : 10,
                            document.getElementById('height').value ? document.getElementById('height').value - 0 : 20,
                            document.getElementById('RDetalization').value ? document.getElementById('RDetalization').value - 0 : 20,
                            document.getElementById('HDetalization').value ? document.getElementById('HDetalization').value - 0 : 5,
                            event.target.id == 'isCap' ? !isCap : isCap
                        )
                        break;
                    case 'Tor':
                        this.figures[0] = new Tor(
                            document.getElementById('RTop').value ? document.getElementById('RTop').value - 0 : 10,
                            document.getElementById('RBot').value ? document.getElementById('RBot').value - 0 : 6,
                            document.getElementById('height').value ? document.getElementById('height').value - 0 : 6,
                            document.getElementById('RDetalization').value ? document.getElementById('RDetalization').value - 0 : 20,
                            document.getElementById('HDetalization').value ? document.getElementById('HDetalization').value - 0 : 20
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
        this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
    }

    elemVisibile(id) {
        switch (id) {
            case 'CBPoints': this.CBP = !this.CBP;
                this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
                break;
            case 'CBEdjes': this.CBE = !this.CBE;
                this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
                break;
            case 'CBFaces': this.CBF = !this.CBF;
                this.renderScene(this.figures, this.CBP, this.CBE, this.CBF, this.backColor);
                break;
        }
    }
}