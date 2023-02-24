// // Description: Color picker for the website
let colorPicker = new iro.ColorPicker(".colorPicker", {
    width: 280,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
});

const RGB_MAX = 255
const HUE_MAX = 360
const SV_MAX = 100

const curColor = document.getElementById("curColor");
curColor.addEventListener("click", () => {
    const style = window.getComputedStyle(curColor);
    const bgColor = style.backgroundColor;
    const tempInput = document.createElement("input");
    tempInput.value = bgColor;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    let messageBox = document.querySelector('.message-box');
    messageBox.style.display = 'block';
    setTimeout(function() {
        messageBox.style.display = 'none';
    }, 1500);
})

const palette = document.getElementsByClassName("color")
palette[0].style.backgroundColor = "rgb(0,0,0)";
palette[1].style.backgroundColor = "rgb(255,255,255)";
palette[2].style.backgroundColor = "rgb(255,0,0)";
palette[3].style.backgroundColor = "rgb(0,255,0)";
palette[4].style.backgroundColor = "rgb(0,0,255)";
palette[5].style.backgroundColor = "rgb(255,255,0)";
palette[6].style.backgroundColor = "rgb(255,0,255)";
palette[7].style.backgroundColor = "rgb(0,255,255)";
palette[8].style.backgroundColor = "rgb(255,140,0)";
palette[9].style.backgroundColor = "rgb(130,50,0)";

function parseRGB(colorString) {
    const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const matches = colorString.match(regex);
    if (!matches) {
        throw new Error("Invalid RGB color string");
    }
    const red = parseInt(matches[1], 10);
    const green = parseInt(matches[2], 10);
    const blue = parseInt(matches[3], 10);
    return {red, green, blue};
}

for (let i = 0; i < palette.length; i++) {
    palette[i].addEventListener("click", () => {
        let colorStr = palette[i].style.backgroundColor;
        let color = parseRGB(colorStr);
        curColor.style.backgroundColor = colorStr;
        updateInputs(color);
        colorPicker.color.red = color.red;
        colorPicker.color.green = color.green;
        colorPicker.color.blue = color.blue;
    })
}


const rInput = document.getElementById("rInput");
const gInput = document.getElementById("gInput");
const bInput = document.getElementById("bInput");
const hInput = document.getElementById("hInput");
const sInput = document.getElementById("sInput");
const vInput = document.getElementById("vInput");
const xInput = document.getElementById("xInput");
const yInput = document.getElementById("yInput");
const zInput = document.getElementById("zInput");

let rgbColor = {r: 255, g: 0, b: 0};
let hsvColor = {h: 0, s: 1, v: 1};
let xyzColor = {x: 41.24, y: 21.26, z: 1.93};

rInput.addEventListener("input", () => {
    if (rInput.value > 255) {
        rInput.value = 255;
    }
    if (rInput.value < 0) {
        rInput.value = 0;
    }
    colorPicker.color.red = rInput.value;
});
gInput.addEventListener("input", () => {
    if (gInput.value > 255) {
        gInput.value = 255;
    }
    if (gInput.value < 0) {
        gInput.value = 0;
    }
    colorPicker.color.green = gInput.value;
});
bInput.addEventListener("input", () => {
    if (bInput.value > 255) {
        bInput.value = 255;
    }
    if (bInput.value < 0) {
        bInput.value = 0;
    }
    colorPicker.color.blue = bInput.value;
});

function setFromHSV(h, s, v) {
    let rgb = hsv_to_rgb(h, s, v);
    colorPicker.color.red = rgb.r;
    colorPicker.color.green = rgb.g;
    colorPicker.color.blue = rgb.b;
}

function setFromXYZ(x, y, z) {
    let rgb = xyz_to_rgb(x, y, z);
    colorPicker.color.red = rgb.r;
    colorPicker.color.green = rgb.g;
    colorPicker.color.blue = rgb.b;
}

hInput.addEventListener("input", () => {
    hsvColor = {h: hInput.value, s: sInput.value, v: vInput.value};
    setFromHSV(hsvColor.h, hsvColor.s, hsvColor.v)
});
sInput.addEventListener("input", () => {
    hsvColor = {h: hInput.value, s: sInput.value, v: vInput.value};
    setFromHSV(hsvColor.h, hsvColor.s, hsvColor.v)
});
vInput.addEventListener("input", () => {
    hsvColor = {h: hInput.value, s: sInput.value, v: vInput.value};
    setFromHSV(hsvColor.h, hsvColor.s, hsvColor.v)
});

xInput.addEventListener("input", () => {
    xyzColor = {x: xInput.value, y: yInput.value, z: zInput.value};
    setFromXYZ(xyzColor.x, xyzColor.y, xyzColor.z)
});
yInput.addEventListener("input", () => {
    xyzColor = {x: xInput.value, y: yInput.value, z: zInput.value};
    setFromXYZ(xyzColor.x, xyzColor.y, xyzColor.z)
});
zInput.addEventListener("input", () => {
    xyzColor = {x: xInput.value, y: yInput.value, z: zInput.value};
    setFromXYZ(xyzColor.x, xyzColor.y, xyzColor.z)
});

// Function to update color values
function updateInputs(color) {
    rInput.value = color.red;
    gInput.value = color.green;
    bInput.value = color.blue;

    let hsv = rgb_to_hsv(color.red, color.green, color.blue);
    hInput.value = hsv.h;
    sInput.value = hsv.s;
    vInput.value = hsv.v;

    let xyz = rgb_to_xyz(color.red, color.green, color.blue);
    xInput.value = xyz.x;
    yInput.value = xyz.y;
    zInput.value = xyz.z;
}

colorPicker.on(["color:init", "color:change"], function(color){
    curColor.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;
    updateInputs(color);
});

function rgb_to_hsv(r, g, b) {
    if (typeof r === 'object') {
        const args = r
        r = args.r; g = args.g; b = args.b;
    }

    // It converts [0,255] format, to [0,1]
    r = (r == RGB_MAX) ? 1 : (r % RGB_MAX / parseFloat(RGB_MAX))
    g = (g == RGB_MAX) ? 1 : (g % RGB_MAX / parseFloat(RGB_MAX))
    b = (b == RGB_MAX) ? 1 : (b % RGB_MAX / parseFloat(RGB_MAX))

    var max = Math.max(r, g, b)
    var min = Math.min(r, g, b)
    var h, s, v = max

    var d = max - min

    s = max === 0 ? 0 : d / max

    if (max === min) {
        h = 0 // achromatic
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return {
        h: Math.round(h * HUE_MAX),
        s: Math.round(s * SV_MAX),
        v: Math.round(v * SV_MAX)
    }
}

function normalizeAngle (degrees) {
    return (degrees % 360 + 360) % 360;
}

function hsv_to_rgb(h, s, v) {
    if (typeof h === 'object') {
        const args = h
        h = args.h; s = args.s; v = args.v;
    }

    h = normalizeAngle(h)
    h = (h == HUE_MAX) ? 1 : (h % HUE_MAX / parseFloat(HUE_MAX) * 6)
    s = (s == SV_MAX) ? 1 : (s % SV_MAX / parseFloat(SV_MAX))
    v = (v == SV_MAX) ? 1 : (v % SV_MAX / parseFloat(SV_MAX))

    var i = Math.floor(h)
    var f = h - i
    var p = v * (1 - s)
    var q = v * (1 - f * s)
    var t = v * (1 - (1 - f) * s)
    var mod = i % 6
    var r = [v, q, p, p, t, v][mod]
    var g = [t, v, v, q, p, p][mod]
    var b = [p, p, t, v, v, q][mod]

    return {
        r: Math.floor(r * RGB_MAX),
        g: Math.floor(g * RGB_MAX),
        b: Math.floor(b * RGB_MAX),
    }
}

// Function to convert rgb to xyz
function rgb_to_xyz(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    // sRGB is a gamma corrected format (a method of adjusting color
    // to match non-linear human perception of light) gamma correction
    // must be undone. The inverse function is linear below a corrected
    // value of 0.04045 since gamma correction is linear at 0.0031308
    const invCompand = (c) => (c <= 0.04045) ?
        c / 12.92 :
        Math.pow((c + 0.055) / 1.055, 2.4);
    const invR = invCompand(r);
    const invG = invCompand(g);
    const invB = invCompand(b);
    // Linear rgb is then undergoes a forward transformation to xyz
    const x = 0.4124 * invR + 0.3576 * invG + 0.1805 * invB;
    const y = 0.2126 * invR + 0.7152 * invG + 0.0722 * invB;
    const z = 0.0193 * invR + 0.1192 * invG + 0.9505 * invB;

    return {
        x: Math.round(x * 100 + 0),
        y: Math.round(y * 100 + 0),
        z: Math.round(z * 100 + 0),
    };
}

// Function to convert xyz to rgb
function xyz_to_rgb(x, y, z) {
    x /= 100, y /= 100, z /= 100;

    // xyz is multiplied by the reverse transformation matrix to linear rgb
    const invR = 3.2406254773200533 * x - 1.5372079722103187 * y -
        0.4986285986982479 * z;
    const invG = -0.9689307147293197 * x + 1.8757560608852415 * y +
        0.041517523842953964 * z;
    const invB = 0.055710120445510616 * x + -0.2040210505984867 * y +
        1.0569959422543882 * z;
    // Linear rgb must be gamma corrected to normalized srgb. Gamma correction
    // is linear for values <= 0.0031308 to avoid infinite log slope near zero
    const compand = (c) => c <= 0.0031308 ?
        12.92 * c :
        1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    const cR = compand(invR);
    const cG = compand(invG);
    const cB = compand(invB);
    // srgb is scaled to [0,255]
    // Add zero to prevent signed zeros (force 0 rather than -0)
    return {
        r: Math.round(255 * cR + 0),
        g: Math.round(255 * cG + 0),
        b: Math.round(255 * cB + 0),
    }
}
