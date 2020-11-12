const svg = document.getElementById("svgCanvas");
const netForcePara = document.getElementById("netForce");

let selected = null;

const up = {
    force:5,
    negative:false,
    arrow: document.getElementById("topArrow"),
    label: document.getElementById("topLabel"),
    lowerLimit: 0,
    upperLimit: 100,
    axis: "y"
}
const down = {
    force:5,
    negative:false,
    arrow : document.getElementById("bottomArrow"),
    label : document.getElementById("bottomLabel"),
    lowerLimit : 200,
    upperLimit : 300,
    axis : "y"
}
const left = {
    force:5,
    negative:false,
    arrow : document.getElementById("leftArrow"),
    label : document.getElementById("leftLabel"),
    lowerLimit : 0,
    upperLimit : 100,
    axis : "x"
}
const right = {
    force:5,
    negative:false,
    arrow : document.getElementById("rightArrow"),
    label : document.getElementById("rightLabel"),
    lowerLimit : 200,
    upperLimit : 300,
    axis : "x"
}

const getMousePosition = (e) => {
    var CTM = svg.getScreenCTM();
    return {
        x: (e.clientX - CTM.e) / CTM.a,
        y: (e.clientY - CTM.f) / CTM.d
    };
}

const constrain = (value, min, max) => Math.min(Math.max(value, min), max);

const raycast = (e) => {
    coords = getMousePosition(e);
    let target = null;
    if (coords.x >= 100 && coords.x <= 200) {
        if (coords.y <= 100) {
            target = up;
        }
        if (coords.y >= 200) {
            target = down;
        }
    } else if (coords.y >= 100 && coords.y <= 200) {
        if (coords.x <= 100) {
            target = left;
        }
        if (coords.x >= 200) {
            target = right;
        }
    }
    return target;
}

const startDrag = (e) => {
    selected = raycast(e);
}

const flip = (e) => {
    target = raycast(e);
    e.preventDefault();
    if (!target) return;
    if (target.negative) {
        target.negative = false;
        target.arrow.classList.remove("negative");
    } else {
        target.negative = true;
        target.arrow.classList.add("negative");
    }
}

const calculateNet = () => {
    let netX = 0;
    let netY = 0;
    let statement = "Net force: ";
    if (up.negative) netY-=up.force; else netY+=up.force;
    if (down.negative) netY+=down.force; else netY-=down.force;
    if (left.negative) netX+=left.force; else netX-=left.force;
    if (right.negative) netX-=right.force; else netX+=right.force;
    if(netX > 0) {
        statement += netX + "N to the right and "
    } else if (netX < 0) {
        statement += (0-netX) + "N to the left and "
    } else {
        statement += "0N horizontally and "
    }
    if(netY > 0) {
        statement += netY + "N up"
    } else if (netY < 0) {
        statement += (0-netY) + "N down"
    } else {
        statement += "0N vertically"
    }
    netForcePara.innerText=statement;
}

const drag = (e) => {
    if (!selected) return;
    e.preventDefault();
    let coords = getMousePosition(e)
    let constrainedAxis = constrain(selected.axis == "x" ? coords.x : coords.y, selected.lowerLimit, selected.upperLimit);
    selected.arrow.setAttribute(selected.axis+"2", constrainedAxis);
    let value = constrainedAxis - selected.lowerLimit;
    if (selected == up || selected == left) value = selected.upperLimit - value;
    selected.force = Math.round(value/10);
    selected.label.textContent = selected.force+"N"
    calculateNet();
}

const endDrag = (e) => {
    selected = null;
}

svg.addEventListener('mousedown', startDrag);
svg.addEventListener('contextmenu', flip)
document.body.addEventListener('mousemove', drag);
document.body.addEventListener('mouseup', endDrag);
document.body.addEventListener('mouseleave', endDrag);