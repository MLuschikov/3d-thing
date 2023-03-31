class Light extends Point {
    constructor(x, y, z, lumen = 30000) {
        super(x, y, z);
        this.lumen = lumen;
    }
}