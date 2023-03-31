class SphereData {
    constructor(num) {
        
        this.length = document.createElement('input');
        this.length.placeholder = 'length';
        this.length.dataset.num = num;
        this.length.className = 'size';
        this.length.id = 'length';

        this.width = document.createElement('input');
        this.width.placeholder = 'width';
        this.width.dataset.num = num;
        this.width.className = 'size';
        this.width.id = 'width';

        this.height = document.createElement('input');
        this.height.placeholder = 'height';
        this.height.dataset.num = num;
        this.height.className = 'size';
        this.height.id = 'height';

        this.scale = document.createElement('input');
        this.scale.placeholder = 'scale';
        this.scale.dataset.num = num;
        this.scale.className = 'scale';
        this.scale.id = 'scale';

        this.det = document.createElement('input');
        this.det.placeholder = 'det';
        this.det.dataset.num = num;
        this.det.id = 'detalization';
        this.det.className = 'size';

        this.color = document.createElement('input');
        this.color.type = 'color';
        this.color.dataset.num = num;
        this.color.className = 'color';
        this.color.id = 'color';
        this.color.value = '#ffffff';

        this.CBPoints = document.createElement('input');
        this.CBPoints.type = 'checkbox';
        this.CBPoints.dataset.num = num;
        this.CBPoints.className = 'visibiler';
        this.CBPoints.id = 'CBPoints';
        this.CBPoints.checked = true;

        this.CBEdjes = document.createElement('input');
        this.CBEdjes.type = 'checkbox';
        this.CBEdjes.dataset.num = num;
        this.CBEdjes.className = 'visibiler';
        this.CBEdjes.id = 'CBEdjes';
        this.CBEdjes.checked = true;

        this.CBFaces = document.createElement('input');
        this.CBFaces.type = 'checkbox';
        this.CBFaces.dataset.num = num;
        this.CBFaces.className = 'visibiler';
        this.CBFaces.id = 'CBFaces';
        this.CBFaces.checked = true;

        this.table = document.createElement(`table`);

        this.tr1 = document.createElement('tr');
        this.tr2 = document.createElement('tr');
        this.tr3 = document.createElement('tr');
        this.tr4 = document.createElement('tr');
        this.tr5 = document.createElement('tr');

        this.td11 = document.createElement('td');
        this.td12 = document.createElement('td');
        this.td13 = document.createElement('td');
        this.td14 = document.createElement('td');

        this.td21 = document.createElement('td');
        this.td22 = document.createElement('td');
        this.td23 = document.createElement('td');
        this.td24 = document.createElement('td');

        this.td31 = document.createElement('td');
        this.td32 = document.createElement('td');
        this.td33 = document.createElement('td');
        this.td34 = document.createElement('td');

        this.td41 = document.createElement('td');
        this.td42 = document.createElement('td');

        this.td51 = document.createElement('td');
        this.td52 = document.createElement('td');
        this.td53 = document.createElement('td');
        this.td54 = document.createElement('td');


        this.td11.innerHTML = 'param';
        this.td12.appendChild(this.length);
        this.td13.appendChild(this.width);
        this.td14.appendChild(this.height);

        this.td21.innerHTML = 'scale';
        this.td22.appendChild(this.scale);

        this.td31.innerHTML = 'detalization';
        this.td32.appendChild(this.det);

        this.td41.innerHTML = 'color';
        this.td42.appendChild(this.color);

        this.td51.innerHTML = 'visibiler';
        this.td52.innerHTML = 'points';
        this.td53.innerHTML = 'edjes';
        this.td54.innerHTML = 'faces';
        this.td52.appendChild(this.CBPoints);
        this.td53.appendChild(this.CBEdjes);
        this.td54.appendChild(this.CBFaces);

        this.tr1.appendChild(this.td11);
        this.tr1.appendChild(this.td12);
        this.tr1.appendChild(this.td13);
        this.tr1.appendChild(this.td14);

        this.tr2.appendChild(this.td21);
        this.tr2.appendChild(this.td22);

        this.tr3.appendChild(this.td31);
        this.tr3.appendChild(this.td32);

        this.tr4.appendChild(this.td41);
        this.tr4.appendChild(this.td42);

        this.tr5.appendChild(this.td51);
        this.tr5.appendChild(this.td52);
        this.tr5.appendChild(this.td53);
        this.tr5.appendChild(this.td54);

        this.table.appendChild(this.tr1);
        this.table.appendChild(this.tr2);
        this.table.appendChild(this.tr3);
        this.table.appendChild(this.tr4);
        this.table.appendChild(this.tr5);
    }
}