const svg = document.getElementById("svgCanvas");

const topArrow = document.getElementById("topArrow");
const bottomArrow = document.getElementById("bottomArrow");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let selectedElement = null;

topArrow.labelElement = document.getElementById("topLabel");
bottomArrow.labelElement  = document.getElementById("bottomLabel");
leftArrow.labelElement  = document.getElementById("leftLabel");
rightArrow.labelElement  = document.getElementById("rightLabel");

let forces = {
    up:0,
    down:0,
    left:0,
    right:0
}

const getMousePosition = (e) => {
    var CTM = svg.getScreenCTM();
    return {
        x: (e.clientX - CTM.e) / CTM.a,
        y: (e.clientY - CTM.f) / CTM.d
    };
}

const constrain = (value, min, max) => Math.min(Math.max(value, min), max);

const startDrag = (e) => {
    coord = getMousePosition(e);
    if (coord.x >= 100 && coord.x <= 200) {
        if (coord.y <= 100) {
            selectedElement = topArrow;
        }
        if (coord.y >= 200) {
            selectedElement = bottomArrow;
        }
    } else if (coord.y >= 100 && coord.y <= 200) {
        if (coord.x <= 100) {
            selectedElement = leftArrow;
        }
        if (coord.x >= 200) {
            selectedElement = rightArrow;
        }
    }
}

const flip = (e) => {
    if (!e.target.classList.contains('arrow')) return;
    e.preventDefault();
    if (e.target.classList.contains('negative')) {
        e.target.classList.remove("negative");
    } else {
        e.target.classList.add("negative");
    }
}

const drag = (e) => {
    if (!selectedElement) return;
    e.preventDefault();
    let coord = getMousePosition(e);
    switch (selectedElement.id) {
        case "leftArrow":
            forceLeft = Math.round(10-constrain(coord.x, 0, 100)/10);
            selectedElement.setAttribute("x2", constrain(coord.x, 0, 100));
            leftText.textContent = forceLeft+"N";
            break;
        case "rightArrow":
            forceRight = Math.round(constrain(coord.x, 200, 300)/10-20);
            selectedElement.setAttribute("x2", constrain(coord.x, 200, 300));
            rightText.textContent = forceRight+"N";
            break;
        case "topArrow":
            forceUp = Math.round(10-constrain(coord.y, 0, 100)/10);
            selectedElement.setAttribute("y2", constrain(coord.y, 0, 100));
            topText.textContent = forceUp+"N";
            break;
        case "bottomArrow":
            forceDown = Math.round(constrain(coord.y, 200, 300)/10-20)
            selectedElement.setAttribute("y2", constrain(coord.y, 200, 300));
            bottomText.textContent = forceDown+"N";
            break;
    }
}
const endDrag = (e) => {
    selectedElement = null;
}

svg.addEventListener('mousedown', startDrag);
svg.addEventListener('contextmenu', flip)
document.body.addEventListener('mousemove', drag);
document.body.addEventListener('mouseup', endDrag);
document.body.addEventListener('mouseleave', endDrag);