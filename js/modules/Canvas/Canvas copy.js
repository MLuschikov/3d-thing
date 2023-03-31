class Canvas {
    constructor({ id, width = 500, height = 500, WIN, callbacks = [] }) {

        const unXs = (pxX) => pxX / canvas.width * WIN.width + WIN.left;
        const unYs = (pxY) => (canvas.height - pxY) / canvas.height * WIN.height + WIN.bottom;

        this.text = function (text, x, y, color, size) {
            context.font = size || "15pt Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = color || "#000";
            context.fillText(text, xs(x), ys(y));
        }

        this.textFoSquer = function (text, x, y, color, size, align, baseline) {
            context.font = size || "15pt Arial";
            context.textAlign = align;
            context.textBaseline = baseline;
            context.fillStyle = color || "#000";
            context.fillText(text, xs(x), ys(y));
        }

        this.printMouseSquare = function (x, y) {
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
}