class TheRealSolarSystem{
    constructor() {
        this.figures = [];

        this.AE = 234630 + 1090;

        this.figures[0] = new Sphere(1090, 1090, 1090, 20, '#dd9900');
        this.figures[0].center = new Point(0, 0, 0);
        this.figures[0].animations = [{
            method: 'rotateY',
            value: [0, 0]
        }];

        this.figures[1] = new Sphere(3.8, 3.8, 3.8, 20, '#d6d4c7');
        this.figures[1].center = new Point(0.4 * this.AE, 0, 0);
        this.figures[1].animations = [{
            method: 'rotateY',
            value: [2.4 / 365, 0.26]
        }];

        this.figures[2] = new Sphere(9.5, 10, 10, 20, '#e8e8e8');
        this.figures[2].center = new Point(0.7 * this.AE, 0, 0);
        this.figures[2].animations = [{
            method: 'rotateY',
            value: [10 / 365, 0.61]
        }];

        this.figures[3] = new Sphere(10, 10, 10, 20, '#6e7fd8');
        this.figures[3].center = new Point(this.AE, 0, 0);
        this.figures[3].animations = [{
            method: 'rotateY',
            value: [1 / 365, 1]
        }];

        this.figures[4] = new Sphere(5, 5, 5, 20, '#d3a07e');
        this.figures[4].center = new Point(1.5 * this.AE, 0, 0);
        this.figures[4].animations = [{
            method: 'rotateY',
            value: [1 / 365, 2.1]
        }];

        this.figures[5] = new Sphere(190, 190, 190, 20, '#b9a45b');
        this.figures[5].center = new Point(5.2 * this.AE, 0, 0);
        this.figures[5].animations = [{
            method: 'rotateY',
            value: [0.4 / 365, 1.09]
        }];

        this.figures[6] = new Sphere(85, 85, 85, 20, '#9adeb3');
        this.figures[6].center = new Point(9.5 * this.AE, 0, 0);
        this.figures[6].animations = [{
            method: 'rotateY',
            value: [0.43 / 365, 29.4]
        }];
        this.figures[7] = new Tor(127.5, 42.5, 2, 20, 20, '#9adeb3');
        this.figures[7].center = new Point(9.5 * this.AE, 0, 0);
        this.figures[7].animations = [{
            method: 'rotateY',
            value: [0.43 / 365, 29.4]
        }];

        this.figures[8] = new Sphere(39, 39, 39, 20, '#cfdcec');
        this.figures[8].center = new Point(19 * this.AE, 0, 0);
        this.figures[8].animations = [{
            method: 'rotateY',
            value: [0.72 / 365, 84.01]
        }];

        this.figures[9] = new Sphere(380, 380, 380, 20, '#91b5e3');
        this.figures[9].center = new Point(30.1 * this.AE, 0, 0);
        this.figures[9].animations = [{
            method: 'rotateY',
            value: [0.67 / 365, 164.8]
        }];

        this.figures.forEach(figure => {
            figure.points.forEach(point => {
                point.x += figure.center.x;
                point.y += figure.center.y;
                point.z += figure.center.z;
            })
        })
    }
}