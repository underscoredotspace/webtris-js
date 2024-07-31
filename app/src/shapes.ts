import { ShapeGrid, Vector } from "./types";

interface ShapeData {
  type: string;
  start: number;
  grid: ShapeGrid;
  rotateFix: Vector[];
}

const shapes: ShapeData[] = [
  {
    type: "l",
    start: 3,
    grid: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    rotateFix: [
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  },
  {
    type: "j",
    start: 3,
    grid: [
      [1, 1, 1],
      [0, 0, 1],
    ],
    rotateFix: [
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  },
  {
    type: "s",
    start: 3,
    grid: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    rotateFix: [
      { x: -1, y: 1 },
      { x: 1, y: -1 },
    ],
  },
  {
    type: "z",
    start: 3,
    grid: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    rotateFix: [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ],
  },
  {
    type: "t",
    start: 3,
    grid: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    rotateFix: [
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  },
  {
    type: "i",
    start: 3,
    grid: [[1, 1, 1, 1]],
    rotateFix: [
      { x: -2, y: 2 },
      { x: 2, y: -2 },
    ],
  },
  {
    type: "o",
    start: 4,
    grid: [
      [1, 1],
      [1, 1],
    ],
    rotateFix: [],
  },
];

export default shapes;
