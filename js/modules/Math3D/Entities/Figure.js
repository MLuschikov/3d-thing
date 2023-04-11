class Figure {
    constructor(points = [], edges = [], polygons = [], center = new Point) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
        this.animations = [];
    }

    dropAnimation() {
        this.animations = [];
    }

    setAnimation(method, value, center) {
        this.animations.push({
            [method]: value,
            center: center ? center : this.center
        });
    }

    doAnimation(math3D) {
        this.animations.forEach(anim => {
            this.points.forEach(point => {
                point.x -= this.center.x;
                point.y -= this.center.y;
                point.z -= this.center.z;
                math3D[anim.method](anim.value[0] / 50, point);
            })
            math3D[anim.method](anim.value[1] / 50, this.center);
            this.points.forEach(point => {
                point.x += this.center.x;
                point.y += this.center.y;
                point.z += this.center.z;
            })
            /*
            const cenX = this.center.x;
            const cenY = this.center.y;
            const cenZ = this.center.z;
            this.center.x = 0;
            this.center.y = 0;
            this.center.z = 0;
            this.center.x = cenX;
            this.center.y = cenY;
            this.center.z = cenZ;
            */
        })
    }
}