const CANVAS = document.querySelector("canvas");
const CTX = CANVAS.getContext("2d");
let tilesize = 64;
let ogprefab = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
];

console.log("VERSION 1.2");

let scan = {
    angle: 0,
    x: 0,
    y: 0,
    steps: 0,
}

let coinAnims = [];

let world = [...ogprefab];

let prefabs = [
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 1, 0, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]],
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0], [0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0], [0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0], [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 2, 0, 2, 0, 2, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0], [0, 1, 2, 0, 2, 0, 2, 0, 1, 0, 0, 0], [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0], [0, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 2, 2, 1, 0, 0, 0], [0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0], [0, 1, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0], [0, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0], [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0], [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 2, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1], [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 3, 3, 3, 3, 1, 0, 0, 0], [0, 0, 0, 1, 2, 2, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 3, 3, 2, 0, 0, 2, 3, 3, 2, 0, 0, 2, 3, 3, 2, 0, 0, 2, 3, 3, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 3, 3, 2, 0, 0, 2, 3, 3, 2, 0, 0, 2, 3, 3, 2, 0, 0, 2, 3, 3, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 0, 0, 1], [0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 0, 0, 1], [0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 0, 0, 1, 2, 1, 2, 1, 0, 0, 1, 2, 2, 1, 0], [0, 1, 3, 3, 1, 0, 0, 1, 2, 1, 2, 1, 0, 0, 1, 1, 2, 1, 0], [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 2, 1, 0, 1, 1, 1, 0, 1, 2, 2, 1, 0, 1, 1, 1, 0, 0], [0, 1, 2, 1, 0, 1, 3, 1, 0, 1, 2, 2, 1, 0, 1, 3, 1, 0, 0], [0, 1, 1, 1, 0, 1, 3, 1, 0, 1, 2, 2, 1, 0, 1, 1, 1, 0, 0], [0, 0, 1, 0, 0, 1, 3, 1, 0, 1, 2, 2, 1, 0, 1, 1, 2, 0, 0], [0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 2, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 0, 0, 1, 2, 1, 2, 1, 0, 0, 1, 2, 2, 1, 0], [0, 1, 3, 3, 1, 0, 0, 1, 2, 1, 2, 1, 0, 0, 1, 1, 2, 1, 0], [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 0, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [1, 1, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 0, 3, 0, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2], [0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 2, 2, 1], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0], [0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2, 0, 0], [3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 1, 1, 1, 1, 0], [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 2, 0, 0], [0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 2, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0], [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 3, 0, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 2, 0, 0, 3, 0, 2, 0, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
];
let worldprefabs = [-1];
let transition = {
    percentage: 2,
    target: 0,
    func: () => { },
    start: (myFunc) => {
        transition.func = myFunc;
        if (!myFunc) transition.func = () => { };
        transition.target = 1;
    },
}

let secondsPlayed = 0;
let targetcolors = [173, 233, 255];
let sky = [173, 233, 255];
window.setInterval(() => {
    secondsPlayed++;
    if (secondsPlayed > 50) {
        targetcolors = [33, 38, 79];
    }
    if (secondsPlayed > 100) {
        secondsPlayed = 0;
        targetcolors = [173, 233, 255];
    }
}, 1000);

appendPrefab = (prefab) => {
    myprefab = prefabs[prefab];
    for (let row = 0; row < myprefab.length; row++) {
        for (let col = 0; col < myprefab[row].length; col++) {
            if (myprefab[row][col] === 3) {
                enemies[`${world[0].length + col},${row}`] = {
                    type: Math.floor(Math.random() * 3),
                    rotation: Math.random() * Math.PI * 2,
                    x: world[0].length + col,
                    y: row,
                }
            }
        }
    }
    for (let row = 0; row < myprefab.length; row++) {
        world[row] = world[row].concat(myprefab[row])
    }
    worldprefabs.push(prefab);
};

let clouds = {
    foreground: [],
    background: [],
}

for (let i = 0; i < 20; i++) {
    clouds.background.push({
        "x": Math.random() * window.innerWidth,
        "y": Math.random() * world.length * tilesize,
        "size": Math.random() * 3 + 1,
        "orientation": Math.round(Math.random()) === 0 ? -1 : 1,
    });
}
clouds.background.sort((a, b) => a.size - b.size);
for (let i = 0; i < 10; i++) {
    clouds.foreground.push({
        "x": Math.random() * window.innerWidth,
        "y": Math.random() * world.length * tilesize,
        "size": 4,
        "orientation": Math.round(Math.random()) === 0 ? -1 : 1,
    });
}
clouds.foreground.sort((a, b) => a.size - b.size);

let frameCount = 0;
const images = {
    "grass": "./images/grass.png",
    "dirt": "./images/dirt.png",
    "coin": "./images/coin.png",
    "skull": "./images/skull.png",
    "bomb": "./images/bomb.png",
    "facebook": "./images/facebook.png",
    "cloud": "./images/cloud.png",

    "green_hand": "./images/grapples/green_hand.png",
    "red_hand": "./images/grapples/red_hand.png",
    "blue_hand": "./images/grapples/blue_hand.png",
    "yellow_hand": "./images/grapples/yellow_hand.png",
    "purple_hand": "./images/grapples/purple_hand.png",
    "banana": "./images/grapples/banana.png",
    "hook": "./images/grapples/hook.png",

    "0_kidoyo": "./images/skins/0_kidoyo.png",
    "1_kidoyo": "./images/skins/1_kidoyo.png",
    "2_kidoyo": "./images/skins/2_kidoyo.png",
    "0_martian": "./images/skins/0_martian.png",
    "1_martian": "./images/skins/1_martian.png",
    "2_martian": "./images/skins/2_martian.png",
    "0_lucky": "./images/skins/0_lucky.png",
    "1_lucky": "./images/skins/1_lucky.png",
    "2_lucky": "./images/skins/2_lucky.png",
    "0_impostor": "./images/skins/0_impostor.png",
    "1_impostor": "./images/skins/1_impostor.png",
    "2_impostor": "./images/skins/2_impostor.png",
    "0_dev": "./images/skins/0_dev.png",
    "1_dev": "./images/skins/1_dev.png",
    "2_dev": "./images/skins/2_dev.png",
    "0_cowboy": "./images/skins/0_cowboy.png",
    "1_cowboy": "./images/skins/1_cowboy.png",
    "2_cowboy": "./images/skins/2_cowboy.png",
}
Object.keys(images).forEach(i => {
    images[i] = Object.assign(document.createElement("img"), {
        "src": images[i],
    });
});
let grapples = {
    "green_hand": {
        "color": [0, 255, 0],
        "end": "green_hand",
        "text": "Green Sticky Hand",
        "cost": 0,
        "unlocked": true,
    },
    "blue_hand": {
        "color": [0, 0, 255],
        "end": "blue_hand",
        "text": "Blue Sticky Hand",
        "cost": 50,
        "unlocked": false,
    },
    "red_hand": {
        "color": [255, 0, 0],
        "end": "red_hand",
        "text": "Red Sticky Hand",
        "cost": 50,
        "unlocked": false,
    },
    "yellow_hand": {
        "color": [255, 255, 0],
        "end": "yellow_hand",
        "text": "Yellow Sticky Hand",
        "cost": 50,
        "unlocked": false,
    },
    "purple_hand": {
        "color": [60, 0, 90],
        "end": "purple_hand",
        "text": "Purple Sticky Hand",
        "cost": 50,
        "unlocked": false,
    },
    "banana": {
        "color": [255, 255, 0],
        "end": "banana",
        "text": "Banana",
        "cost": 100,
        "unlocked": false,
    },
    "skull": {
        "color": [255, 255, 255],
        "end": "skull",
        "text": "Skull",
        "cost": 500,
        "unlocked": false,
    },
    "facebook": {
        "color": [0, 0, 255],
        "end": "facebook",
        "text": "Facebook",
        "cost": 500,
        "unlocked": false,
    },
    "hook": {
        "color": [0, 0, 0],
        "end": "hook",
        "text": "Grappling Hook",
        "cost": 1000,
        "unlocked": false,
    },
    "coin": {
        "color": [255, 255, 0],
        "end": "coin",
        "text": "Coin",
        "cost": 2000,
        "unlocked": false,
    },
};
let skins = {
    "kidoyo": {
        "0": "0_kidoyo",
        "1": "1_kidoyo",
        "2": "2_kidoyo",
        "text": "KidOYO Bot",
        "cost": 0,
        "unlocked": true,
    },
    "martian": {
        "0": "0_martian",
        "1": "1_martian",
        "2": "2_martian",
        "text": "KidOYO Martian",
        "cost": 100,
        "unlocked": false,
    },
    "lucky": {
        "0": "0_lucky",
        "1": "1_lucky",
        "2": "2_lucky",
        "text": "Lucky KidOYO Bot",
        "cost": 100,
        "unlocked": false,
    },
    "impostor": {
        "0": "0_impostor",
        "1": "1_impostor",
        "2": "2_impostor",
        "text": "Impostor",
        "cost": 250,
        "unlocked": false,
    },
    "cowboy": {
        "0": "0_cowboy",
        "1": "1_cowboy",
        "2": "2_cowboy",
        "text": "Space Cowboy Bezos",
        "cost": 500,
        "unlocked": false,
    },
    "dev": {
        "0": "0_dev",
        "1": "1_dev",
        "2": "2_dev",
        "text": "Dev",
        "cost": 600,
        "unlocked": false,
    },
}
const camera = {
    origX: 0,
    origY: 0,
    x: 0,
    y: 0,
    offset: 300,
    autoscroll: 0,
};
if (localStorage.getItem("edwardscamera.sticktogether.highscore") === null) localStorage.setItem("edwardscamera.sticktogether.highscore", 0)
const player = {
    x: 3,
    y: 22,
    coins: localStorage.getItem("edwardscamera.sticktogether.coin") == null ? 0 : localStorage.getItem("edwardscamera.sticktogether.coin"),
    state: 0,
    velocityY: 0,
    velocityX: 0,
    weight: 0.01,
    inverseweight: 0.01,
    onGround: false,
    rotation: 0,
    targetRotation: 0,
    lastDir: "right",
    enemies: {},
    grapple: "green_hand",
    skin: "kidoyo",
    pregrappleX: 3,
    pregrappleY: 22,
};
const mouse = {
    x: 0,
    y: 0,
    relativeX: 0,
    relativeY: 0,
    left: false,
    grappleX: 0,
    grappleY: 0,
    ropeX: 0,
    ropeY: 0,
    originalLength: 0,
    ropeAngleVelocity: 0,
    ropeAngle: 0,
    changeX: 0,
    changeY: 0,
    oldX: 0,
    oldY: 0,
    maxDistance: 800,
    animLength: 0,
    targLength: 0,
};
const keyDown = {};
let enemies = {};

if (localStorage.getItem("edwardscamera.sticktogether.coin") === null) localStorage.setItem("edwardscamera.sticktogether.coin", "0");
(() => {
    let total = "2";
    let lcl = localStorage.getItem("edwardscamera.sticktogether.grapples");
    if (lcl === null) {
        for (let i = 0; i < Object.keys(grapples).length - 1; i++) {
            total += "0";
        }
        localStorage.setItem("edwardscamera.sticktogether.grapples", total);
    } else {
        for (let i = 0; i < lcl.length; i++) {
            if (lcl[i] == 0) grapples[Object.keys(grapples)[i]].unlocked = false;
            if (lcl[i] > 0) grapples[Object.keys(grapples)[i]].unlocked = true;
            if (lcl[i] == 2) player.grapple = Object.keys(grapples)[i];
        }
        while (lcl.length < Object.keys(grapples).length) lcl += "0";
        localStorage.setItem("edwardscamera.sticktogether.grapples", lcl);
    }
})();
(() => {
    let total = "2";
    let lcl = localStorage.getItem("edwardscamera.sticktogether.skins");
    if (lcl == null || lcl.includes("null")) {
        for (let i = 0; i < Object.keys(skins).length - 1; i++) {
            total += "0";
        }
        localStorage.setItem("edwardscamera.sticktogether.skins", total);
    } else {
        try {
            for (let i = 0; i < lcl.length; i++) {
                if (lcl[i] == 0) skins[Object.keys(skins)[i]].unlocked = false;
                if (lcl[i] > 0) skins[Object.keys(skins)[i]].unlocked = true;
                if (lcl[i] == 2) player.skin = Object.keys(skins)[i];
            }
            while (lcl.length < Object.keys(skins).length) lcl += "0";
            localStorage.setItem("edwardscamera.sticktogether.skins", lcl);
        } catch (e) { }
    }
})();


const updateGrapples = () => {
    let container = document.querySelector("#grapples");
    while (container.children.length > 0) container.children[0].remove();
    Object.keys(grapples).forEach(grapple => {
        grappledata = grapples[grapple];
        let thisgrapple = document.createElement("div");
        thisgrapple.style.width = "100px";
        thisgrapple.style.height = "100%";
        thisgrapple.style.display = "inline-block";
        thisgrapple.style.whiteSpace = "normal";
        let thisimg = Object.assign(document.createElement("img"), {
            "src": "./images/grapples/" + grappledata.end + ".png",
        });
        let thistxt = Object.assign(document.createElement("div"), {
            "innerHTML": grappledata.text + "<br /><br />",
        });
        thistxt.style.height = "61.82px";
        let thisbtn = Object.assign(document.createElement("div"), {
            "innerHTML": grappledata.unlocked ? "USE" : grappledata.cost + "¢",
        });
        if (player.grapple == grapple) thisbtn.innerHTML = "Using";
        if (player.grapple != grapple) thisbtn.classList.add("buybtn");
        if (grappledata.unlocked && player.grapple != grapple) thisbtn.onclick = () => {
            player.grapple = grapple;
            let lcl = "";
            for (let i = 0; i < Object.keys(grapples).length; i++) {
                if (player.grapple == Object.keys(grapples)[i]) {
                    lcl += "2";
                } else {
                    if (grapples[Object.keys(grapples)[i]].unlocked) lcl += "1";
                    if (!grapples[Object.keys(grapples)[i]].unlocked) lcl += "0";
                }
            }
            localStorage.setItem("edwardscamera.sticktogether.grapples", lcl);
            updateGrapples();
        };
        thisbtn.grappledata = grappledata;
        if (!thisbtn.grappledata.unlocked) thisbtn.onclick = () => {
            if (player.coins >= thisbtn.grappledata.cost) {
                grapples[grapple].unlocked = true;
                player.coins -= thisbtn.grappledata.cost;
                (new Audio("./sounds/coin.wav")).play();
                localStorage.setItem("edwardscamera.sticktogether.coin", player.coins);
                player.grapple = grapple;
                let lcl = "";
                for (let i = 0; i < Object.keys(grapples).length; i++) {
                    if (player.grapple == Object.keys(grapples)[i]) {
                        lcl += "2";
                    } else {
                        if (grapples[Object.keys(grapples)[i]].unlocked) lcl += "1";
                        if (!grapples[Object.keys(grapples)[i]].unlocked) lcl += "0";
                    }
                }
                localStorage.setItem("edwardscamera.sticktogether.grapples", lcl);
                updateGrapples();
            } else {
                (new Audio("./sounds/hurt.wav")).play();
            }
        };
        thisgrapple.append(thisimg, thistxt, thisbtn);
        container.append(thisgrapple);
    });
};
updateGrapples();
const updateSkins = () => {
    let container = document.querySelector("#skins");
    while (container.children.length > 0) container.children[0].remove();
    Object.keys(skins).forEach(skin => {
        skindata = skins[skin];
        let thisskin = document.createElement("div");
        thisskin.style.width = "100px";
        thisskin.style.height = "100%";
        thisskin.style.display = "inline-block";
        thisskin.style.whiteSpace = "normal";
        let thisimg = Object.assign(document.createElement("img"), {
            "src": "./images/skins/" + skindata["0"] + ".png",
        });
        thisimg.style.marginTop = "15px";
        let thistxt = Object.assign(document.createElement("div"), {
            "innerHTML": skindata.text + "<br /><br />",
        });
        thistxt.style.height = "61.82px";
        let thisbtn = Object.assign(document.createElement("div"), {
            "innerHTML": skindata.unlocked ? "USE" : skindata.cost + "¢",
        });
        if (player.skin == skin) thisbtn.innerHTML = "Using";
        if (player.skin != skin) thisbtn.classList.add("buybtn");
        if (skindata.unlocked && player.skin != skin) thisbtn.onclick = () => {
            player.skin = skin;
            let lcl = "";
            for (let i = 0; i < Object.keys(skins).length; i++) {
                if (player.skin === Object.keys(skins)[i]) {
                    lcl += "2";
                } else {
                    if (skins[Object.keys(skins)[i]].unlocked) lcl += "1";
                    if (!skins[Object.keys(skins)[i]].unlocked) lcl += "0";
                }
                if (skins[Object.keys(skins)[i]].unlocked) lcl += "1";
                if (!skins[Object.keys(skins)[i]].unlocked) lcl += "0";
            }
            localStorage.setItem("edwardscamera.sticktogether.skins", lcl);
            updateSkins();
        };
        thisbtn.skindata = skindata;
        if (!thisbtn.skindata.unlocked) thisbtn.onclick = () => {
            if (player.coins >= thisbtn.skindata.cost) {
                skins[skin].unlocked = true;
                player.coins -= thisbtn.skindata.cost;
                (new Audio("./sounds/coin.wav")).play();
                player.skin = skin;
                localStorage.setItem("edwardscamera.sticktogether.coin", player.coins);
                let lcl = "";
                for (let i = 0; i < Object.keys(skins).length; i++) {
                    if (player.skin === Object.keys(skins)[i]) {
                        lcl += "2";
                    } else {
                        if (skins[Object.keys(skins)[i]].unlocked) lcl += "1";
                        if (!skins[Object.keys(skins)[i]].unlocked) lcl += "0";
                    }
                }
                localStorage.setItem("edwardscamera.sticktogether.skins", lcl);
                updateSkins();
            } else {
                (new Audio("./sounds/hurt.wav")).play();
            }
        };
        thisskin.append(thisimg, thistxt, thisbtn);
        container.append(thisskin);
    });
};
updateSkins();

const restartGame = () => {
    (new Audio("./sounds/hurt.wav")).play();
    enemies = {};
    player.enemies = {};
    camera.x = 32;
    player.x = 3;
    player.y = 13;
    player.state = 2;
    player.lastDir = "right";
    player.velocityY = 0;
    player.velocityX = 0;
    player.weight = 0.01;
    player.rotation = 0;
    player.targetRotation = 0;
    mouse.left = false;
    camera.autoscroll = 0;
    world = [...ogprefab];

    document.querySelector("#die").classList.remove("boxSlide");
    window.setTimeout(() => {
        document.querySelector("#die").classList.add("boxSlide");
        if (document.querySelector("#shopcontainer").classList.contains("boxSlide")) player.state = 0;
    }, 3000);

    for (let i = 0; i < clouds.background.length; i++) {
        clouds.background[i].x %= CANVAS.width;
    }
    for (let i = 0; i < clouds.foreground.length; i++) {
        clouds.background[i].x %= CANVAS.width;
    }
}

let chungus = document.querySelector("#shopBtn");
let chungus2 = document.querySelector("#howtoplaybtn");
chungus.onclick = () => {
    if (camera.autoscroll !== 0) return;
    player.state = 2;
    chungus.classList.add("hide");
    chungus2.classList.add("hide");
    document.querySelector("#shopcontainer").classList.remove("boxSlide");
    updateGrapples();
    updateSkins();
}
chungus2.onclick = () => {
    if (camera.autoscroll !== 0) return;
    player.state = 2;
    chungus.classList.add("hide");
    chungus2.classList.add("hide");
    document.querySelector("#howtoplaycontainer").classList.remove("boxSlide");
    updateGrapples();
}
const exitmenus = () => {
    player.state = 0;
    document.querySelector("#shopcontainer").classList.add("boxSlide");
    document.querySelector("#howtoplaycontainer").classList.add("boxSlide");
    chungus.classList.remove("hide");
    chungus2.classList.remove("hide");
};

const update = () => {
    CTX.imageSmoothingEnabled = false;
    CTX.fillStyle = `rgb(${sky[0]},${sky[1]},${sky[2]})`;
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    player.weight = 0.01 + Object.keys(player.enemies).length / 1000;
    player.inverseweight = 0.01 - Object.keys(player.enemies).length / 1200;

    sky[0] += (targetcolors[0] - sky[0]) / 500;
    sky[1] += (targetcolors[1] - sky[1]) / 500;
    sky[2] += (targetcolors[2] - sky[2]) / 500;

    chungus.style.left = `${5 - (camera.x - 64)}px`;
    chungus.style.transition = `.3s ease-out`;
    chungus2.style.left = `${5 - (camera.x - 64)}px`;
    chungus2.style.transition = `.3s ease-out`;

    document.body.style.cursor = "default";
    document.querySelector("#highscore").innerText = localStorage.getItem("edwardscamera.sticktogether.highscore");
    if (player.x > 5.5) {
        camera.autoscroll = 3;
        if (localStorage.getItem("edwardscamera.sticktogether.highscore") < Math.floor(player.x)) localStorage.setItem("edwardscamera.sticktogether.highscore", Math.floor(player.x))
        document.querySelector("#meter").innerText = Math.floor(player.x);
        chungus.style.transition = `none`;
        chungus2.style.transition = `none`;

        if (player.state === 0) {
            if (Math.sqrt(
                (mouse.y - ((player.y + 3 / 32) * tilesize - camera.y)) ** 2 +
                (mouse.x - (player.x * tilesize - camera.x)) ** 2
            ) < mouse.maxDistance) {
                document.body.style.cursor = "default";
            } else {
                document.body.style.cursor = "not-allowed";
            }
        } else {
            document.body.style.cursor = "default";
        }
    }
    if (transition.target === 1) camera.autoscroll = 0;
    if (camera.x > world[0].length * tilesize - CANVAS.width) {
        let num;
        do {
            num = Math.floor(Math.random() * prefabs.length);
        } while (worldprefabs[worldprefabs.length - 1] === num);
        appendPrefab(num);
    }
    if (player.x + 2 < camera.x / tilesize) transition.start(restartGame);

    // Draw Background Clouds
    for (let i = 0; i < clouds.background.length; i++) {
        mycloud = clouds.background[i];
        if (mycloud.x + mycloud.size * 64 < camera.x) clouds.background[i].x = camera.x + CANVAS.width;
        CTX.save();
        CTX.translate(mycloud.x - camera.x, mycloud.y - camera.y);
        if (mycloud.orientation === -1) CTX.scale(-1, 1);
        if (mycloud.orientation === 1) CTX.drawImage(images["cloud"], 0, 0, mycloud.size * 64, mycloud.size * 32);
        if (mycloud.orientation === -1) CTX.drawImage(images["cloud"], -mycloud.size * 64, 0, mycloud.size * 64, mycloud.size * 32);
        CTX.restore();
        clouds.background[i].x -= mycloud.size;
    }

    // Draw Player
    switch (player.state) {
        case 0:
            CTX.save();
            CTX.translate(player.x * tilesize - camera.x + (player.lastDir === "left" ? tilesize : 0), (player.y + 3 / 32) * tilesize - camera.y);
            CTX.rotate(player.rotation);
            if (player.lastDir === "left") CTX.scale(-1, 1);
            if (!player.onGround) {
                CTX.drawImage(images[skins[player.skin]["1"]], 0, 0, tilesize, tilesize);
            } else {
                if (keyDown["a"] || keyDown["d"] || keyDown["ArrowLeft"] || keyDown["ArrowRight"]) {
                    CTX.drawImage(images[skins[player.skin][(Math.floor(frameCount / 10) % 2 + 1).toString()]], 0, 0, tilesize, tilesize);
                } else {
                    CTX.drawImage(images[skins[player.skin]["0"]], 0, 0, tilesize, tilesize);
                }
            }

            CTX.restore();
            player.targetRotation = 0;
            break;
        case 1:
            CTX.save();
            CTX.translate(mouse.grappleX - camera.x, mouse.grappleY - camera.y);
            let myscale = 1;
            if (mouse.ropeAngleVelocity < 0) myscale = -1;
            if (mouse.ropeAngleVelocity < 0.004 && mouse.ropeAngleVelocity > -0.004) myscale = 1
            CTX.scale(1, myscale);
            CTX.rotate(mouse.ropeAngle * Math.sign(myscale));
            CTX.drawImage(images[skins[player.skin]["2"]], tilesize / -2 - mouse.ropeLength, tilesize / -2, tilesize, tilesize);
            CTX.restore();
            player.rotation = mouse.ropeAngle;
            player.targetRotation = mouse.ropeAngle % (Math.PI * 2);
            break;
        case 2:
            CTX.drawImage(images[skins[player.skin]["0"]], player.x * tilesize - camera.x, (player.y + 3 / 32) * tilesize - camera.y, tilesize, tilesize);
            break;
    }
    player.rotation += (player.targetRotation - player.rotation) / 10;

    // Player Logic
    switch (player.state) {
        case 0:
            player.state = mouse.left ? 1 : 0;
            try {
                player.onGround = false;
                player.velocityX *= 0.98;
                if (
                    world[Math.floor(player.y)][Math.floor(player.x + player.velocityX) + 1] === 1 ||
                    world[Math.floor(player.y + 0.99)][Math.floor(player.x + player.velocityX) + 1] === 1 ||
                    world[Math.floor(player.y)][Math.floor(player.x + player.velocityX)] === 1 ||
                    world[Math.floor(player.y + 0.99)][Math.floor(player.x + player.velocityX)] === 1 ||
                    player.velocityX > -0.001 && player.velocityX < 0.001
                ) player.velocityX = 0;
                player.x += player.velocityX;

                player.y += player.velocityY;
                if (Math.floor(player.y + 1 + player.velocityY) > world.length) {
                    player.x = 1;
                    player.y = 1;
                    player.velocityY = 0;
                }
                if (world[Math.floor(player.y)][Math.floor(player.x)] === 1) {
                    player.y -= player.velocityY;
                    player.velocityY = 0;
                }
                if (world[Math.floor(player.y)][Math.ceil(player.x)] === 1) {
                    player.y -= player.velocityY;
                    player.velocityY = 0;
                }
                player.velocityY += player.weight;

                if (world[Math.floor(player.y) + 1][Math.floor(player.x)] === 1) {
                    while (world[Math.floor(player.y) + 1][Math.floor(player.x)] === 1) {
                        player.y -= 0.01;
                        player.velocityY = 0;
                        player.velocityX = 0;
                        player.onGround = true;
                    }
                    player.y += 0.01;
                }
                if (world[Math.floor(player.y) + 1][Math.ceil(player.x)] === 1) {
                    while (world[Math.floor(player.y) + 1][Math.ceil(player.x)] === 1) {
                        player.y -= 0.01;
                        player.velocityY = 0;
                        player.velocityX = 0;
                        player.onGround = true;
                    }
                    player.y += 0.01;
                }

                if (keyDown["d"] || keyDown["ArrowRight"]) {
                    player.x += player.inverseweight * 10;
                    player.lastDir = "right";

                    if (player.y + player.velocityY + 1 > world.length) {

                        transition.start(restartGame);
                    }
                    while (world[Math.floor(player.y)][Math.floor(player.x) + 1] === 1) {
                        player.x -= 0.01;
                    }
                    while (world[Math.floor(player.y + 0.99)][Math.floor(player.x) + 1] === 1) {
                        player.x -= 0.01;
                    }


                    player.x = Math.round(player.x * 10) / 10;
                }
                if (keyDown["a"] || keyDown["ArrowLeft"]) {
                    player.x -= player.inverseweight * 10;
                    player.lastDir = "left";


                    while (world[Math.floor(player.y)][Math.floor(player.x)] === 1) {
                        player.x += 0.01;
                    }
                    while (world[Math.floor(player.y + 0.99)][Math.floor(player.x)] === 1) {
                        player.x += 0.01;
                    }


                    player.x = Math.round(player.x * 10) / 10;
                }

                if (keyDown["w"] || keyDown[" "] || keyDown["ArrowUp"]) {
                    if (
                        world[Math.floor(player.y) + 1][Math.floor(player.x)] === 1
                        || world[Math.floor(player.y) + 1][Math.ceil(player.x)] === 1) {
                        player.velocityY -= 0.25;
                    }
                }
            } catch (e) {
                if (player.y + player.velocityY + 1 > world.length) {

                    transition.start(restartGame);
                }
            }
            break;
        case 1:
            player.state = mouse.left ? 1 : 0;

            let ropeAngleAcceleration = -0.002 * Math.cos(mouse.ropeAngle);
            mouse.ropeAngleVelocity += ropeAngleAcceleration;
            mouse.ropeAngle += mouse.ropeAngleVelocity;

            let updatePhys = () => {
                mouse.ropeAngleVelocity *= 0.99;

                mouse.ropeX = mouse.grappleX + Math.cos(mouse.ropeAngle + Math.PI) * mouse.ropeLength;
                mouse.ropeY = mouse.grappleY + Math.sin(mouse.ropeAngle + Math.PI) * mouse.ropeLength;

                player.x = mouse.ropeX / tilesize - 0.5;
                player.y = mouse.ropeY / tilesize - 0.5;

                mouse.changeX = player.x - mouse.oldX;
                mouse.changeY = player.y - mouse.oldY;

                mouse.oldX = player.x;
                mouse.oldY = player.y;

                player.velocityY = 0;
            };

            try {
                let whilesteps = 0;
                let tempx = (mouse.grappleX + Math.cos(mouse.ropeAngle + Math.PI) * mouse.ropeLength) / tilesize;
                let tempy = mouse.ropeY / tilesize;
                while (
                    world[Math.min(Math.floor(tempy - 0.5), world.length - 1)][Math.floor(tempx + 0.5)] === 1 ||
                    world[Math.min(Math.floor(tempy + 0.5), world.length - 1)][Math.floor(tempx + 0.5)] === 1 ||
                    world[Math.min(Math.floor(tempy - 0.5), world.length - 1)][Math.floor(tempx - 0.5)] === 1 ||
                    world[Math.min(Math.floor(tempy + 0.5), world.length - 1)][Math.floor(tempx - 0.5)] === 1
                ) {
                    if (whilesteps > 100) {
                        console.log("WHILE LOOP EXCEPTION", mouse, player);
                        player.x = player.pregrappleX;
                        player.velocityX = 0;
                        player.y = player.pregrappleY;
                        player.velocityY = 0;
                        window.setTimeout(() => {
                            player.x = player.pregrappleX;
                            player.velocityX = 0;
                            player.y = player.pregrappleY;
                            player.velocityY = 0;
                        }, 10);
                        mouse.left = false;
                        break;
                    }
                    whilesteps++;
                    mouse.ropeAngle -= mouse.ropeAngleVelocity * 2;
                    mouse.ropeAngleVelocity *= -1;
                    tempx = (mouse.grappleX + Math.cos(mouse.ropeAngle + Math.PI) * mouse.ropeLength) / tilesize;
                    tempy = mouse.ropeY / tilesize;
                    updatePhys();
                }

                tempx = mouse.ropeX / tilesize;
                tempy = (mouse.grappleY + Math.sin(mouse.ropeAngle + Math.PI) * mouse.ropeLength) / tilesize;
                whilesteps = 0;
                while (
                    world[Math.min(Math.floor(tempy - 0.5), world.length - 1)][Math.floor(tempx + 0.5)] === 1 ||
                    world[Math.min(Math.floor(tempy + 0.5), world.length - 1)][Math.floor(tempx + 0.5)] === 1 ||
                    world[Math.min(Math.floor(tempy - 0.5), world.length - 1)][Math.floor(tempx - 0.5)] === 1 ||
                    world[Math.min(Math.floor(tempy + 0.5), world.length - 1)][Math.floor(tempx - 0.5)] === 1
                ) {
                    if (whilesteps > 100) {
                        console.log("WHILE LOOP EXCEPTION", mouse, player);

                        player.x = player.pregrappleX;
                        player.velocityX = 0;
                        player.y = player.pregrappleY;
                        player.velocityY = 0;
                        window.setTimeout(() => {
                            player.x = player.pregrappleX;
                            player.velocityX = 0;
                            player.y = player.pregrappleY;
                            player.velocityY = 0;
                        }, 10);
                        mouse.left = false;
                        break;
                    }
                    whilesteps++;
                    mouse.ropeAngle -= mouse.ropeAngleVelocity * 2;
                    mouse.ropeAngleVelocity = 0;
                    tempx = mouse.ropeX / tilesize;
                    tempy = (mouse.grappleY + Math.sin(mouse.ropeAngle + Math.PI) * mouse.ropeLength) / tilesize;
                    updatePhys();
                }
            } catch (e) {

            }

            updatePhys();

            tempx = mouse.ropeX / tilesize;
            tempy = (mouse.grappleY + Math.sin(mouse.ropeAngle + Math.PI) * mouse.ropeLength) / tilesize;
            if (keyDown["d"] || keyDown["ArrowRight"]) mouse.ropeAngleVelocity -= 0.001;
            if (keyDown["a"] || keyDown["ArrowLeft"]) mouse.ropeAngleVelocity += 0.001;
            mouse.ropeLength = Math.max(30, Math.min(mouse.ropeLength, mouse.originalLength));

            break;
    }
    player.x = Math.min(Math.max(1, player.x), world[0].length - 2);
    player.y = Math.max(1, player.y);

    try {
        if (world[Math.floor(player.y + .5)][Math.floor(player.x + .5)] === 2) {
            world[Math.floor(player.y + .5)][Math.floor(player.x + .5)] = 0;
            player.coins++;
            (new Audio("./sounds/coin.wav")).play();
            localStorage.setItem("edwardscamera.sticktogether.coin", player.coins);
            coinAnims.push({
                "x": Math.floor(player.x + .5),
                "y": Math.floor(player.y + .5),
                "opacity": 1,
            });
        }
        if (world[Math.floor(player.y + .5)][Math.floor(player.x + .5)] === 3) {
            world[Math.floor(player.y + .5)][Math.floor(player.x + .5)] = 0;
            (new Audio("./sounds/hurt.wav")).play();
            let z = Math.random().toString()
            player.enemies[z] = {
                type: enemies[`${Math.floor(player.x + .5)},${Math.floor(player.y + .5)}`].type,
                rev: Math.random() * 2 * Math.PI,
                rot: Math.random() * 2 * Math.PI,
                revSpeed: (Math.random() - 0.5) / 2,
                rotSpeed: (Math.random() - 0.5) / 2,
            };
            window.setTimeout(() => {
                delete player.enemies[z];
            }, 5000);
            delete enemies[`${Math.floor(player.x + .5)},${Math.floor(player.y + .5)}`];
        }
    } catch (e) {

    }

    // Draw Map
    for (let row = Math.floor(camera.y / tilesize); row < Math.min(Math.floor((camera.y + CANVAS.height) / tilesize) + 1, world.length); row++) {
        for (let col = Math.floor(camera.x / tilesize); col < Math.floor((camera.x + CANVAS.width) / tilesize) + 1; col++) {
            switch (world[row][col]) {
                case 1:
                    if (row === 0 || world[row - 1][col] !== 1) {
                        CTX.drawImage(images["grass"], col * tilesize - camera.x, row * tilesize - camera.y, tilesize, tilesize);
                    } else {
                        CTX.drawImage(images["dirt"], col * tilesize - camera.x, row * tilesize - camera.y, tilesize, tilesize);
                    }
                    break;
                case 2:
                    CTX.drawImage(images["coin"], col * tilesize - camera.x, row * tilesize - camera.y, tilesize, tilesize);
                    break;
            }
        }
    }

    // Draw Coin Animations
    for (let i = 0; i < coinAnims.length; i++) {
        CTX.globalAlpha = coinAnims[i].opacity;
        CTX.drawImage(images["coin"], coinAnims[i].x * tilesize - camera.x, (coinAnims[i].y - (1 - coinAnims[i].opacity)) * tilesize - camera.y, tilesize, tilesize);
        coinAnims[i].opacity -= 0.05;
        CTX.globalAlpha = 1;
        if (coinAnims[i].opacity < 0) {
            coinAnims.splice(i, 1);
            break;
        }
    }

    // Draw Grapple
    if (player.state === 1) {
        CTX.strokeStyle = `rgb(${grapples[player.grapple].color[0]},${grapples[player.grapple].color[1]},${grapples[player.grapple].color[2]})`;

        CTX.beginPath();
        CTX.moveTo(
            mouse.grappleX - camera.x - Math.cos(mouse.ropeAngle) * (mouse.targLength - mouse.animLength),
            mouse.grappleY - camera.y - Math.sin(mouse.ropeAngle) * (mouse.targLength - mouse.animLength)
        );
        CTX.lineTo(
            mouse.grappleX - Math.cos(mouse.ropeAngle) * mouse.originalLength - camera.x + (0.0 * tilesize),
            mouse.grappleY - Math.sin(mouse.ropeAngle) * mouse.originalLength - camera.y + (0.0 * tilesize)
        );
        CTX.stroke();

        CTX.save();
        CTX.translate(
            mouse.grappleX - camera.x - Math.cos(mouse.ropeAngle) * (mouse.targLength - mouse.animLength),
            mouse.grappleY - camera.y - Math.sin(mouse.ropeAngle) * (mouse.targLength - mouse.animLength)
        );
        CTX.rotate(mouse.ropeAngle + Math.PI / 2);
        CTX.drawImage(images[grapples[player.grapple].end], tilesize / -4, tilesize / -4, tilesize / 2, tilesize / 2);
        CTX.restore();
    }
    mouse.animLength += (mouse.targLength - mouse.animLength) / 5;

    // Draw Enemies
    Object.keys(enemies).forEach(key => {

        CTX.save();
        CTX.translate((enemies[key].x + .5) * tilesize - camera.x, (enemies[key].y + .5) * tilesize - camera.y);
        CTX.rotate(enemies[key].rotation);
        enemies[key].rotation += 0.1;
        img = images["skull"];
        if (enemies[key].type === 1) img = images["bomb"];
        if (enemies[key].type === 2) img = images["facebook"];
        CTX.drawImage(img, tilesize / -2, tilesize / -2, tilesize, tilesize);
        CTX.restore();

        if ((enemies[key].x + 2) * tilesize < camera.x) delete enemies[key];
    });

    // Draw Player's Enemies
    Object.keys(player.enemies).forEach(key => {
        let enemy = player.enemies[key];
        CTX.save();
        CTX.translate(player.x * tilesize - camera.x + (tilesize / 2), (player.y + 3 / 32) * tilesize - camera.y + (tilesize / 2));
        CTX.rotate(enemy.rot);
        img = images["skull"];
        if (enemy.type === 1) img = images["bomb"];
        if (enemy.type === 2) img = images["facebook"];
        CTX.drawImage(img, tilesize / 4 - Math.cos(enemy.rev), tilesize / 4 - Math.sin(enemy.rev), tilesize / 2, tilesize / 2);
        CTX.restore();
    });

    // Camera Logic
    camera.origX = (player.x * tilesize) - (CANVAS.width / 2) + (tilesize / 2);
    camera.origY = (player.y * tilesize) - (CANVAS.height / 2) + (tilesize / 2);
    if (camera.autoscroll === 0 && transition.target !== 1) camera.x = camera.origX + (mouse.relativeX - .5) * camera.offset;
    else camera.x += camera.autoscroll;
    camera.y = camera.origY;// + (mouse.relativeY - .5) * camera.offset;
    camera.x = Math.max(tilesize, camera.x);
    camera.y = Math.max(tilesize, Math.min(camera.y, world.length * tilesize - CANVAS.height));

    // GUI
    CTX.font = "48px VCROSD";
    CTX.fillStyle = "#000000";
    CTX.textBaseline = "top";
    CTX.fillText(`${Math.floor(player.x)}m`, 12, 49);
    CTX.fillStyle = "#ffff00";
    CTX.lineWidth = 3;
    CTX.strokeStyle = "#000000";
    CTX.strokeText(`${player.coins}¢`, 12, 1);
    CTX.fillText(`${player.coins}¢`, 12, 1);

    // Transition Logic
    transition.percentage += (transition.target - transition.percentage) / 5;

    CTX.fillStyle = "#000000";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height / 2 * transition.percentage + 1);
    CTX.fillRect(0, CANVAS.height - (CANVAS.height / 2 * transition.percentage), CANVAS.width, CANVAS.height / 2);
    if (transition.percentage > .999) {
        transition.func();
        transition.target = 0;
    }

    // Other Stuff
    if (player.state === 0) {
        mouse.ropeX = player.x * tilesize;
        mouse.ropeY = player.y * tilesize;
    }

    frameCount++;
};
window.onmousedown = (evt) => {
    player.pregrappleX = player.x;
    player.pregrappleY = player.y;

    if (![0, 2].includes(evt.button)) return;

    mouse.grappleX = camera.x + mouse.x;
    mouse.grappleY = camera.y + mouse.y;
    mouse.ropeX = (player.x + 0.5) * tilesize;
    mouse.ropeY = (player.y + 0.5) * tilesize;
    mouse.ropeAngleVelocity = (player.velocityY + player.velocityX) * 0.1;
    if (mouse.ropeX < mouse.grappleX) mouse.ropeAngleVelocity *= -1;
    mouse.ropeAngle = Math.atan2(mouse.grappleY - mouse.ropeY, mouse.grappleX - mouse.ropeX);
    mouse.ropeLength = Math.sqrt(
        (mouse.grappleY - mouse.ropeY) ** 2 +
        (mouse.grappleX - mouse.ropeX) ** 2
    );
    mouse.originalLength = mouse.ropeLength;

    scan.angle = mouse.ropeAngle;
    scan.x = (player.x + .5) * tilesize;
    scan.y = (player.y + .5) * tilesize;
    scan.steps = 0;
    while (scan.steps < mouse.maxDistance) {
        scan.x += Math.cos(scan.angle);
        scan.y += Math.sin(scan.angle);
        if (world[Math.floor(scan.y / tilesize)][Math.floor(scan.x / tilesize)] === 1) {
            scan.x += Math.cos(scan.angle) * 10;
            scan.y += Math.sin(scan.angle) * 10;
            break;
        }
        scan.steps++;
    }

    if (player.onGround) return;
    if (world[Math.floor(scan.y / tilesize)][Math.floor(scan.x / tilesize)] !== 1) return;
    if (mouse.ropeLength > mouse.maxDistance) return;
    if (Math.floor(scan.y / tilesize) === 0) return;
    if (player.state !== 0) return;
    //if (scan.steps < tilesize) return;
    (new Audio("./sounds/grapple.wav")).play();

    mouse.left = true;
    mouse.grappleX = scan.x;
    mouse.grappleY = scan.y;
    mouse.ropeX = (player.x + 0.5) * tilesize;
    mouse.ropeY = (player.y + 0.5) * tilesize;
    mouse.ropeAngleVelocity = (player.velocityY + player.velocityX) * 0.1;
    if (mouse.ropeX < mouse.grappleX) mouse.ropeAngleVelocity *= -1;
    mouse.ropeAngle = Math.atan2(mouse.grappleY - mouse.ropeY, mouse.grappleX - mouse.ropeX);
    mouse.ropeLength = Math.sqrt(
        (mouse.grappleY - mouse.ropeY) ** 2 +
        (mouse.grappleX - mouse.ropeX) ** 2
    );
    mouse.originalLength = mouse.ropeLength;
    mouse.targLength = mouse.originalLength;
}
window.onmouseup = () => {
    if (mouse.left) {
        mouse.targLength = 0;
        mouse.left = false;
        player.velocityY = mouse.changeY;
        player.velocityX = mouse.changeX;
    }
}
window.onmousemove = (evt) => {
    Object.assign(mouse, {
        x: evt.clientX,
        y: evt.clientY,
        relativeX: evt.clientX / CANVAS.width,
        relativeY: evt.clientY / CANVAS.height,
    });
}
window.onkeydown = (evt) => keyDown[evt.key] = true;
window.onkeyup = (evt) => keyDown[evt.key] = false;
window.oncontextmenu = (evt) => evt.preventDefault();
window.onresize = () => {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight + 5;
};
window.onload = () => {
    window.onresize();
    window.setInterval(update, 1000 / 60);
    if (localStorage.getItem("edwardscamera.sticktogether.coin") === null) {
        localStorage.setItem("edwardscamera.sticktogether.coin", "0");
        player.coins = 0;
    }
};