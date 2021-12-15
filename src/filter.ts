/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { applyAttributes, createSVGElement, mount } from "./utils";

export type LengthUnit = 'px' | '%';
export type AngleUnit = 'deg' | 'rad' | 'turn';
export type Unit = LengthUnit | AngleUnit | '';
export interface ParsedElement {
  unit: Unit;
  value: number;
}

const FILTER_PREFIX = 'g-filter-';


const filterMap: Record<string, (f:any, p:any) => void> = {
  blur,
  brightness,
  dropShadow,
  grayscale,
  contrast,
  sepia,
  saturate,
  hueRotate,
  invert,
};

// 滤镜
// filter({ })
/**
 * filter 渲染： svg -> rect(shape) -> defs -> filter -> blur
 * 
 * @param context 
 * @param filters 
 */

export function filter(context: any, el:any, filters:any) {
  const { group, node } = context; // 挂载元素  svg
  
  const $def = createSVGElement('defs') as SVGDefsElement; // defs

  const filterIds = filters.map(({ name, params }: {name: any, params: any}, i: number) => {
    const filterName = FILTER_PREFIX + i;
    const $filter = createSVGElement('filter') as SVGFilterElement; // filter
    
    filterMap[name]($filter, params as ParsedElement[])

    $filter.id = filterName;
    $filter.setAttribute('name', filterName);
    $def.appendChild($filter);

    return $filter.id;
  });
  mount(group, $def); // 挂载
  el?.setAttribute('filter', filterIds.map((filterId: any) => `url(#${filterId})`).join(' '));
  mount(group, el); // 挂载
  return el; // 返回该元素
}

function convertToAbsoluteValue(param: ParsedElement) {
  return param.unit === '%' ? param.value / 100 : param.value;
}
function createFeComponentTransfer(
  $filter: SVGElement,
  {
    type,
    slope,
    intercept,
    tableValues,
  }: {
    type: string;
    slope?: number;
    intercept?: number;
    tableValues?: string;
  },
) {
  const $feComponentTransfer = createSVGElement('feComponentTransfer');
  [createSVGElement('feFuncR'), createSVGElement('feFuncG'), createSVGElement('feFuncB')].forEach(
    ($feFunc) => {
      $feFunc.setAttribute('type', type);

      if (type === 'table') {
        $feFunc.setAttribute('tableValues', `${tableValues}`);
      } else {
        $feFunc.setAttribute('slope', `${slope}`);
        $feFunc.setAttribute('intercept', `${intercept}`);
      }

      $feComponentTransfer.appendChild($feFunc);
    },
  );

  $filter.appendChild($feComponentTransfer);
}

export function blur($filter:any, params: ParsedElement[]) {
  const $feGaussianBlur = createSVGElement('feGaussianBlur');
  $feGaussianBlur.setAttribute('in', 'SourceGraphic');
  $feGaussianBlur.setAttribute('stdDeviation', `${params[0].value}`);
  $filter.appendChild($feGaussianBlur);
}

export function brightness($filter: SVGElement, params: ParsedElement[]) {
  const slope = convertToAbsoluteValue(params[0]);
  createFeComponentTransfer($filter, {
    type: 'linear',
    slope,
    intercept: 0,
  });
}

export function dropShadow($filter: SVGElement, params: ParsedElement[]) {
  const shadowOffsetX = params[0].value as number;
  const shadowOffsetY = params[1].value as number;
  const shadowBlur = params[2].value as number;
  // @ts-ignore
  const shadowColor = params[3].formatted as string;
  const $feGaussianBlur = createSVGElement('feGaussianBlur');
  $feGaussianBlur.setAttribute('in', 'SourceAlpha');
  $feGaussianBlur.setAttribute('stdDeviation', `${shadowBlur}`);
  $filter!.appendChild($feGaussianBlur);

  const $feOffset = createSVGElement('feOffset');
  $feOffset.setAttribute('dx', `${shadowOffsetX}`);
  $feOffset.setAttribute('dy', `${shadowOffsetY}`);
  $feOffset.setAttribute('result', 'offsetblur');
  $filter!.appendChild($feOffset);

  const $feFlood = createSVGElement('feFlood');
  $feFlood.setAttribute('flood-color', shadowColor);
  $filter!.appendChild($feFlood);

  const $feComposite = createSVGElement('feComposite');
  $feComposite.setAttribute('in2', 'offsetblur');
  $feComposite.setAttribute('operator', 'in');
  $filter!.appendChild($feComposite);

  const $feMerge = createSVGElement('feMerge');
  $filter!.appendChild($feMerge);

  const $feMergeNode1 = createSVGElement('feMergeNode');
  const $feMergeNode2 = createSVGElement('feMergeNode');
  $feMergeNode2.setAttribute('in', 'SourceGraphic');
  $feMerge!.appendChild($feMergeNode1);
  $feMerge!.appendChild($feMergeNode2);
}

export function contrast($filter: SVGElement, params: ParsedElement[]) {
  const slope = convertToAbsoluteValue(params[0]);
  createFeComponentTransfer($filter, {
    type: 'linear',
    slope,
    intercept: -(0.5 * slope) + 0.5,
  });
}

function createFeColorMatrix($filter: SVGElement, matrix: number[]) {
  const $feColorMatrix = createSVGElement('feColorMatrix');
  $feColorMatrix.setAttribute('type', 'matrix');
  $feColorMatrix.setAttribute('values', matrix.join(' '));
  $filter.appendChild($feColorMatrix);
}
export function grayscale($filter: SVGElement, params: ParsedElement[]) {
  const amount = convertToAbsoluteValue(params[0]);
  createFeColorMatrix($filter, [
    0.2126 + 0.7874 * (1 - amount),
    0.7152 - 0.7152 * (1 - amount),
    0.0722 - 0.0722 * (1 - amount),
    0,
    0,
    0.2126 - 0.2126 * (1 - amount),
    0.7152 + 0.2848 * (1 - amount),
    0.0722 - 0.0722 * (1 - amount),
    0,
    0,
    0.2126 - 0.2126 * (1 - amount),
    0.7152 - 0.7152 * (1 - amount),
    0.0722 + 0.9278 * (1 - amount),
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ]);
}
export function sepia($filter: SVGElement, params: ParsedElement[]) {
  const amount = convertToAbsoluteValue(params[0]);
  createFeColorMatrix($filter, [
    0.393 + 0.607 * (1 - amount),
    0.769 - 0.769 * (1 - amount),
    0.189 - 0.189 * (1 - amount),
    0,
    0,
    0.349 - 0.349 * (1 - amount),
    0.686 + 0.314 * (1 - amount),
    0.168 - 0.168 * (1 - amount),
    0,
    0,
    0.272 - 0.272 * (1 - amount),
    0.534 - 0.534 * (1 - amount),
    0.131 + 0.869 * (1 - amount),
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ]);
}

export function saturate($filter: SVGElement, params: ParsedElement[]) {
  const amount = convertToAbsoluteValue(params[0]);
  const $feColorMatrix = createSVGElement('feColorMatrix');
  $feColorMatrix.setAttribute('type', 'saturate');
  $feColorMatrix.setAttribute('values', `${amount}`);
  $filter.appendChild($feColorMatrix);
}

export function rad2deg(rad: number) {
  return rad * (180 / Math.PI);
}
export function convertAngleUnit(valueWithUnit: ParsedElement) {
  let deg = 0;
  if (valueWithUnit.unit === 'deg') {
    deg = Number(valueWithUnit.value);
  } else if (valueWithUnit.unit === 'rad') {
    deg = rad2deg(Number(valueWithUnit.value));
  } else if (valueWithUnit.unit === 'turn') {
    deg = 360 * Number(valueWithUnit.value);
  }
  return deg;
}
export function hueRotate($filter: SVGElement, params: ParsedElement[]) {
  const $feColorMatrix = createSVGElement('feColorMatrix');
  $feColorMatrix.setAttribute('type', 'hueRotate');
  $feColorMatrix.setAttribute('values', `${convertAngleUnit(params[0])}`);
  $filter.appendChild($feColorMatrix);
}

export function invert($filter: SVGElement, params: ParsedElement[]) {
  const amount = convertToAbsoluteValue(params[0]);
  createFeComponentTransfer($filter, {
    type: 'table',
    tableValues: `${amount} ${1 - amount}`,
  });
}