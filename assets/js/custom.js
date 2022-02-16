let zoneCreate = document.getElementById('zoneCreate');
let zoneGrid = document.getElementById('zoneGrid');
let zoneNotGrid = document.getElementById('zoneNotGrid');
let zoneGridCoords = {
    'top': zoneGrid.getBoundingClientRect().y,
    'bottom': zoneGrid.getBoundingClientRect().y + zoneGrid.getBoundingClientRect().height,
    'left': zoneGrid.getBoundingClientRect().x,
    'right': zoneGrid.getBoundingClientRect().x + zoneGrid.getBoundingClientRect().width
};
let zoneNotGridCoords = {
    'top': zoneNotGrid.getBoundingClientRect().y,
    'bottom': zoneNotGrid.getBoundingClientRect().y + zoneNotGrid.getBoundingClientRect().height,
    'left': zoneNotGrid.getBoundingClientRect().x,
    'right': zoneNotGrid.getBoundingClientRect().x + zoneNotGrid.getBoundingClientRect().width
};

zoneCreate.onmousedown = function(event) {
    let dragged = document.createElement('div');

    dragged.classList.add('dragged');
    dragged.style.backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    dragged.style.position = 'absolute';
    dragged.style.zIndex = 1000;

    document.body.append(dragged);
    moveAt(event.pageX, event.pageY);

    // передвинуть под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(pageX, pageY) {
        dragged.style.left = pageX - dragged.offsetWidth / 2 + 'px';
        dragged.style.top = pageY - dragged.offsetHeight / 2 + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    dragged.onmouseup = function(event) {
        let draggedCoords = {
            'top': dragged.getBoundingClientRect().y,
            'bottom': dragged.getBoundingClientRect().y + dragged.getBoundingClientRect().height,
            'left': dragged.getBoundingClientRect().x,
            'right': dragged.getBoundingClientRect().x + dragged.getBoundingClientRect().width
        };

        if ( // если элемент внутри "зоны с сеткой"
            (draggedCoords.top >= zoneGridCoords.top) &&
            (draggedCoords.bottom <= zoneGridCoords.bottom) &&
            (draggedCoords.left >= zoneGridCoords.left) &&
            (draggedCoords.right <= zoneGridCoords.right)
        ) {
            dragged.style.position = 'static';
            dragged.style.display = 'inline-block';
            zoneGrid.append(dragged);
        } else if ( // если элемент внутри "зоны без сетки"
            (draggedCoords.top >= zoneNotGridCoords.top) &&
            (draggedCoords.bottom <= zoneNotGridCoords.bottom) &&
            (draggedCoords.left >= zoneNotGridCoords.left) &&
            (draggedCoords.right <= zoneNotGridCoords.right)
        ) {
            zoneNotGrid.append(dragged);
        } else {
            dragged.remove();
        }

        document.removeEventListener('mousemove', onMouseMove);
        dragged.onmouseup = null;
    };
};