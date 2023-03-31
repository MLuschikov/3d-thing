class Menu extends Component {
    addEventListeners() {
        document.querySelectorAll('.menu-item')
            .forEach((event) => this.callbacks.showMenuItem(
                event.target.dataset.item)
            );

        const button = document.getElementById('light-theme');
        button.addEventListener('click', () => this.themeChanger());
    }

    themeChanger() {
        const img = document.getElementById('light-theme-image');
        const style = document.getElementById('style');
        if (img.src.includes('img/moon.png')) {
            img.src = 'img/sun.png';
            style.setAttribute("href", "css/lightStyle.css");
        } else {
            img.src = 'img/moon.png';
            style.setAttribute("href", "css/darkStyle.css");
        }
    }
}