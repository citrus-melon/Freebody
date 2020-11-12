const svg = document.getElementById("svgCanvas");
const topText = document.getElementById("topLabel");
const bottomText = document.getElementById("bottomLabel");
const leftText = document.getElementById("leftLabel");
const rightText = document.getElementById("rightLabel");
let selectedElement = null;
let forceLeft = 0;
let forceRight = 0;
let forceUp = 0;
let forceDown = 0;
let leftNegative = false;
let rightNegative = false;
let upNegative = false;
let downNegative = false;

const getMousePosition = (e) => {
    var CTM = svg.getScreenCTM();
    return {
        x: (e.clientX - CTM.e) / CTM.a,
        y: (e.clientY - CTM.f) / CTM.d
    };
}

const constrain = (value, min, max) => Math.min(Math.max(value, min), max);

const startDrag = (e) => {
    if (e.target.classList.contains('arrow')) {
        selectedElement = e.target;
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