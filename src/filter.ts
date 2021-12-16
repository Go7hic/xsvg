/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { applyAttributes, convertAngleUnit, convertToAbsoluteValue, createFeColorMatrix, createFeComponentTransfer, createSVGElement, mount } from "./utils";

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


/**
 * 滤镜
 * filter 渲染： svg -> rect(shape) -> defs -> filter -> blur
 * 
 * @param context 
 * @param filters 
 */

export function filter(context: any, el:any, filters:any) {
  const { group, node, idx } = context; // 挂载元素  svg
  
  const $def = createSVGElement('defs') as SVGDefsElement; // defs
  console.log(idx)
  const filterIds = filters.map(({ name, params }: {name: any, params: any}, i: number) => {
    const filterName = `${FILTER_PREFIX}${idx}-${i}`;
    const $filter = createSVGElement('filter') as SVGFilterElement; // filter
    
    filterMap[name]($filter, params as ParsedElement[])

    $filter.id = filterName;
    $filter.setAttribute('name', filterName);
    $def.appendChild($filter);
    return $filter.id;
  });
  mount(group, $def); // 挂载 def 
  
  el?.setAttribute('filter', filterIds.map((filterId: any) => `url(#${filterId})`).join(' '));
  mount(group, el); // 挂载
  return el; // 返回该元素
}


// feGaussianBlur filter
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