class App extends Component {
    constructor(props) {
        super(props);

        this.menu = new Menu({
            id: 'menu', 
            parent: this.id, 
            template: template.MenuTemplate, 
            callbacks: {
                showMenuItem: (name) => this.showMenuItem(name)
            }
        });

        this.graph3D = new Graph3D({
            id: 'graph3D',
            parent: this.id, 
            template: template.Graph3DTemplate
        })

        this.showMenuItem('graph3D');
    }

    showMenuItem(name) {
        this.graph3D.hide();
        this[name].show();
    }
}