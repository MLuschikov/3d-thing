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

    doAnimation(math3D){
        this.animations.forEach(anim => {
            
        })
    }
}