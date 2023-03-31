class Canvas {
    constructor({ id, width = 500, height = 500, WIN, callbacks = {} }) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        const { wheel, mouseup, mousedown, mousemove, mouseleave } = callbacks;
        this.canvas.addEventListener('mousedown', mousedown);
        this.canvas.addEventListener('mouseup', mouseup);
        this.canvas.addEventListener('mousemove', mousemove);
        this.canvas.addEventListener('mouseleave', mouseleave);
        this.canvas.addEventListener('wheel', wheel);
    }



    xs(x) {
        return (x - this.WIN.left) / this.WIN.width * this.canvas.width;
    }
    ys(y) {
        return this.canvas.height - (y - this.WIN.bottom) / this.WIN.height * this.canvas.height;
    }

    sx(x) {
        return x * this.WIN.width / this.canvas.width;
    }
    sy(y) {
        return -y * this.WIN.height / this.canvas.height;
    }

    clear() {
        this.context.fillStyle = '#fff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, color, tolh) {
        this.context.beginPath();
        this.context.lineWidth = tolh;
        this.context.strokeStyle = color || '#000';
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
        this.context.closePath();
    }

    point(x, y, color = '#c00', size = 3) {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.fill();
    }

    polygon(points = [], color = '#f00a') {
        if (points.length >= 3) {
            this.context.beginPath();
            this.context.strokeStyle = color;
            this.context.fillStyle = color;
            this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
            }
            this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
            this.context.stroke();
            this.context.closePath();
            this.context.fill();
        }
    }

    printMouseSquare(x, y) {
        const unXs = (pxX) => pxX / canvas.width * WIN.width + WIN.left;
        const unYs = (pxY) => (canvas.height - pxY) / canvas.height * WIN.height + WIN.bottom;
        
        let oX = unXs(x);
        let oY = unYs(y);
        
        oX = Math.floor(oX) + 0.5;
        oY = Math.floor(oY) + 0.5;

        let img = document.getElementById('light-theme-image');
        let color = "green";

        if (img.src.includes('img/moon.png')) {
            color = "#e00";
        }
        else {
            color = "green";
        }

        this.line(oX - 0.45, oY + 0.45, oX + 0.45, oY + 0.45, color, 1);
        let xLT = oX - 0.5;
        let yLT = oY + 0.5;
        this.textFoSquer("(" + xLT + ", " + yLT + ")", xLT, yLT, color, "10pt Arial", "right", "bottom");

        this.line(oX + 0.45, oY + 0.45, oX + 0.45, oY - 0.45, color, 1);
        let xRT = oX + 0.5;
        let yRT = oY + 0.5;
        this.textFoSquer("(" + xRT + ", " + yRT + ")", xRT, yRT, color, "10pt Arial", "left", "bottom");

        this.line(oX - 0.45, oY - 0.45, oX + 0.45, oY - 0.45, color, 1);
        let xLB = oX - 0.5;
        let yLB = oY - 0.5;
        this.textFoSquer("(" + xLB + ", " + yLB + ")", xLB, yLB, color, "10pt Arial", "right", "top");

        this.line(oX - 0.45, oY + 0.45, oX - 0.45, oY - 0.45, color, 1);
        let xRB = oX + 0.5;
        let yRB = oY - 0.5;
        this.textFoSquer("(" + xRB + ", " + yRB + ")", xRB, yRB, color, "10pt Arial", "left", "top");
    }
}