class Graph3DUI extends Component {
    addEventListeners() {
        let num = 0;
        document.querySelectorAll('.figurePlus').forEach((button) => {
            button.addEventListener(
                'click',
                (event) => {
                    this.addFigure(event, 0);
                }
            )
        })

        document.querySelectorAll('.changeData').forEach((input) => {
            input.addEventListener(
                'keyup',
                (event) => {
                    this.changeFigure(event);
                }
            )
        })
    }

    addFigure(event, num) {
        this.callbacks.addFigure(
            event.target.dataset.figure
        )
        const div = document.getElementById('graph3DUI');

        const divFigure = document.createElement(`div`);
        divFigure.className = 'figure';
        divFigure.id = event.target.dataset.figure;
        divFigure.dataset.num = num;

        const cubeData = new CubeData(num);
        const sphereData = new SphereData(num);
        const cylinderData = new CylinderData(num);

        switch (event.target.dataset.figure) {
            case 'Cube':
                divFigure.appendChild(cubeData.table);
                div.appendChild(divFigure);
                cubeData.color.addEventListener(
                    'mouseover',
                    (event) => {
                        this.changeFigure(
                            event
                        )
                    }
                )
                break;

            case 'Sphere':
                divFigure.appendChild(sphereData.table);
                div.appendChild(divFigure);
                sphereData.color.addEventListener(
                    'mouseover',
                    (event) => {
                        this.changeFigure(
                            event
                        )
                    }
                )
                break;
            case 'Cylinder':
                divFigure.appendChild(cylinderData.table);
                div.appendChild(divFigure);
                cylinderData.color.addEventListener(
                    'mouseover',
                    (event) => {
                        this.changeFigure(
                            event
                        )
                    }
                )
                break;
        }

        for (let i = 0; i < document.getElementsByClassName('figure').length; i++) {
            document.getElementsByClassName('figure')[i].addEventListener(
                'keyup',
                (event) => {
                    this.changeFigure(event);
                }
            )
        }

        for (let i = 0; i < document.getElementsByClassName('visibiler').length; i++) {
            document.getElementsByClassName('visibiler')[i].addEventListener(
                'mousedown',
                (event) => {
                    this.callbacks.elemVisibile(event.target.id)
                }
            )
        }
    }

    changeFigure(event) {
        this.callbacks.changeFigure(
            event
        )
    }
}