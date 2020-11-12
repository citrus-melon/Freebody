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

const getMousePosition = (evt) => {
    var CTM = svg.getScreenCTM();
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

const constrain = (value, min, max) => Math.min(Math.max(value, min), max);

const startDrag = (evt) => {
    if (evt.target.classList.contains('arrow')) {
        selectedElement = evt.target;
    }
}

const flip = (e) => {
    if (!e.target.classList.contains('arrow')) return;
    if (e.target.style.markerEnd)
    switch (e.target.id) {
        case "leftArrow":
            if (leftNegative) {
                e.target.style.markerEnd = "";
                e.target.style.markerStart = "url(#arrowHead)";
            } else {
                e.target.style.markerEnd = "url(#arrowHead)";
                e.target.style.markerStart = "";
            }
            break;
        case "rightArrow":
            if (rightNegative) {
                e.target.style.markerEnd = "";
                e.target.style.markerStart = "url(#arrowHead)";
            } else {
                e.target.style.markerEnd = "url(#arrowHead)";
                e.target.style.markerStart = "";
            }
            break;
        case "topArrow":
            if (upNegative) {
                e.target.style.markerEnd = "";
                e.target.style.markerStart = "url(#arrowHead)";
            } else {
                e.target.style.markerEnd = "url(#arrowHead)";
                e.target.style.markerStart = "";
            }
            break;
        case "bottomArrow":
            if (downNegative) {
                e.target.style.markerEnd = "";
                e.target.style.markerStart = "url(#arrowHead)";
            } else {
                e.target.style.markerEnd = "url(#arrowHead)";
                e.target.style.markerStart = "";
            }
            break;
    }
}

const drag = (evt) => {
    if (!selectedElement) return;
    evt.preventDefault();
    let coord = getMousePosition(evt);
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
const endDrag = (evt) => {
    selectedElement = null;
}

svg.addEventListener('mousedown', (e) => {
    if (e.button == 2) {
        flip(e)
    } else {
        startDrag(e)
    }
});
document.body.addEventListener('mousemove', drag);
document.body.addEventListener('mouseup', endDrag);
document.body.addEventListener('mouseleave', endDrag);