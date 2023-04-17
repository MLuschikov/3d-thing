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
        const div = document.getElementById('figureDataTable');
        div.innerHTML = '';

        const divFigure = document.createElement(`div`);
        divFigure.className = 'figure';
        divFigure.id = event.target.dataset.figure;
        divFigure.dataset.num = num;

        switch (event.target.dataset.figure) {
            case 'Cube':
                divFigure.appendChild(new CubeData(num).table);
                break;
            case 'Sphere':
                divFigure.appendChild(new SphereData(num).table);
                break;
            case 'Cylinder':
                divFigure.appendChild(new CylinderData(num).table);
                break;
            case 'Tor':
                divFigure.appendChild(new TorData(num).table);
                break;

        }

        div.appendChild(divFigure);

        if (event.target.dataset.figure === 'Cylinder')
            document.getElementById('isCap').addEventListener(
                'mousedown',
                (event) => {
                    this.changeFigure(
                        event
                    )
                }
            )

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
        document.getElementById('color').addEventListener(
            'input',
            (event) => {
                this.changeFigure(
                    event
                )
            }
        )
    }

    changeFigure(event) {
        this.callbacks.changeFigure(
            event
        )
    }
}