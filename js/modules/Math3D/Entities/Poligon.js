class Poligon {
    constructor(points = [], color = '#ffffff') {
        this.points = points;
        this.center = new Point;
        this.distance = 0;
        this.lumen = 1;
        if (typeof color === 'string' || color instanceof String)
            this.color = this.hexToRGB(color)
        else
            this.color = color;
    }

    hexToRGB(color) {
        color = color.split('');
        color.shift();
        for (let i = 0; i < color.length; i++)
            color[i] = parseInt(color[i], 16);

        return {
            r: color[0] * 16 + color[1],
            g: color[2] * 16 + color[3],
            b: color[4] * 16 + color[5],
        }
    }
}