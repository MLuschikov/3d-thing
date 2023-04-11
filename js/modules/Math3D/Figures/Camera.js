class Camera extends Figure {
    constructor(x = 0, y = 50, z = 0, FLenght = 20, SWidth = 10, SHeight = 10) {
        super();
        this.center = new Point(x, y, z);
        this.points = [
            new Point(this.center.x, this.center.y - FLenght, this.center.z),
            new Point(this.center.x - SWidth / 2, this.center.y - FLenght, this.center.z),
            new Point(this.center.x, this.center.y - FLenght, this.center.z - SHeight / 2)
        ];
    }
}