const width = window.innerWidth - (window.innerWidth*0.20);
const height = window.innerHeight - (window.innerHeight*0.10);

const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

function GetRandomID() {
    return Math.floor(Math.random() * 1000000) + 1000000;
}

function createGroupWithText(shape, input_text = "Default"){
    var x_centered = 25;
    var y_centered = 25;
    if (shape.getClassName() == 'Rect') {
        x_centered = shape.attrs.x - shape.attrs.width/2.0;
        y_centered = shape.attrs.y + shape.attrs.height;
    }
    else if (shape.getClassName() == 'Ellipse') {
        x_centered = shape.attrs.x - shape.attrs.radiusX/2.0;
        y_centered = shape.attrs.y + shape.attrs.radiusY;
    }
    else {
        x_centered = shape.attrs.x - shape.attrs.radius/2.0;
        y_centered = shape.attrs.y + shape.attrs.radius; 
    }
    var textNode = new Konva.Text({
        text: input_text,
        x: x_centered,
        y: y_centered,
        fontSize: 20,
        name: 'Text',
      });
    var text_shape_group = new Konva.Group({
        draggable: true,
        name: 'Group',
        height,
        width,
        id: GetRandomID(),
    });
    text_shape_group.add(shape, textNode);
    return text_shape_group;
}

function addRect() {
    const randomColor = Konva.Util.getRandomColor();
    let newShape;
    newShape = new Konva.Rect({
        x: Math.random() * (width - 100),
        y: Math.random() * (height - 100),
        width: 50,
        height: 50,
        fill: randomColor,
        stroke: 'black',
        strokeWidth: 2,
    });
    var listdiv = document.getElementById("shape-list");
    var newitem = document.createElement('div');
    listdiv.appendChild(newitem);
    var RectTextGroup = createGroupWithText(newShape, "Rect");
    newitem.innerHTML = "Rectangle Id: "+ RectTextGroup.attrs.id;
    layer.add(RectTextGroup);
    layer.batchDraw();
}

function addCircle() {
    const randomColor = Konva.Util.getRandomColor();
    let newShape;
    newShape = new Konva.Circle({
        x: Math.random() * (width - 100),
        y: Math.random() * (height - 100),
        radius: 30,
        fill: randomColor,
        stroke: 'black',
        strokeWidth: 2,
    });
    var listdiv = document.getElementById("shape-list");
    var newitem = document.createElement('div');
    listdiv.appendChild(newitem);
    var CircTextGroup = createGroupWithText(newShape, 'Circle')
    newitem.innerHTML = "Circle Id: "+ CircTextGroup.attrs.id;
    layer.add(CircTextGroup);
    layer.batchDraw();
}


function addEllipse() {
    const randomColor = Konva.Util.getRandomColor();
    let newShape;
    newShape = new Konva.Ellipse({
        x: Math.random() * (width - 100),
        y: Math.random() * (height - 100),
        radiusX: 80,
        radiusY: 40,
        fill: randomColor,
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
    });
    //newShape.id(GetRandomID());
    var listdiv = document.getElementById("shape-list");
    var newitem = document.createElement('div');
    listdiv.appendChild(newitem);
    var ElipTextGroup = createGroupWithText(newShape, 'Ellipse')
    newitem.innerHTML = "Ellipse Id: "+ ElipTextGroup.attrs.id;
    layer.add(ElipTextGroup);
    layer.batchDraw();
}

function addTriangle() {
    const randomColor = Konva.Util.getRandomColor();
    let newShape;
    newShape = new Konva.RegularPolygon({
        x: Math.random() * (width - 100),
        y: Math.random() * (height - 100),
        sides: 3,
        radius : 30,
        fill: randomColor,
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
    });
    var listdiv = document.getElementById("shape-list");
    var newitem = document.createElement('div');
    listdiv.appendChild(newitem);
    var TriTextGroup = createGroupWithText(newShape, 'Triangle')
    newitem.innerHTML = "Triangle Id: "+ TriTextGroup.attrs.id;
    layer.add(TriTextGroup);
    layer.batchDraw();
}

document.getElementById('add-rect').addEventListener('click', () => {
    addRect();
});

document.getElementById('add-circ').addEventListener('click', () => {
    addCircle();
});

document.getElementById('add-ellipse').addEventListener('click', () => {
    addEllipse();
});

document.getElementById('add-triangle').addEventListener('click', () => {
    addTriangle();
});

function AddText(x, y, height) {
    var textNode = new Konva.Text({
        text: 'Some text here',
        x: x,
        y: y+height,
        fontSize: 20,
      });
      layer.add(textNode);
}

let currentGroup;
var menuNode = document.getElementById('menu');
document.getElementById('add-text-button').addEventListener('click', () => {
  AddText(currentShape.attrs.x, currentShape.attrs.y, currentShape.attrs.height);
});

document.getElementById('delete-button').addEventListener('click', () => {
  console.log(currentGroup);
  currentGroup.destroy();
  //document.getElementById(currentShape.id()).remove();
    //if ()
});

window.addEventListener('click', () => {
  // hide menu
  menuNode.style.display = 'none';
});

stage.on('contextmenu', function (e) {
  // prevent default behavior
  e.evt.preventDefault();
  if (e.target === stage) {
    // if we are on empty place of the stage we will do nothing
    return;
  }
  currentGroup = e.target.getParent();
  // show menu
  menuNode.style.display = 'initial';
  var containerRect = stage.container().getBoundingClientRect();
  menuNode.style.top =
    containerRect.top + stage.getPointerPosition().y + 4 + 'px';
  menuNode.style.left =
    containerRect.left + stage.getPointerPosition().x + 4 + 'px';
});

function addArrow(x1, y1, x2, y2) {
    var arrow = new Konva.Arrow({
        points: [x1, y1, x2, y2],
        pointerLength: 10,
        pointerWidth: 10,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4
      });
}


stage.draw();
