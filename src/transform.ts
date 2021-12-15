
// 坐标系变换
import { applyTransform, createSVGElement, mount } from './utils';

export function transform(type: string, context: { group: any; }, ...params: any[]) {
  // type 是希望的变换种类：scale，translate，rotate 等
  const { group } = context;
  applyTransform(group, `${type}(${params.join(', ')})`);
}

// 平移
export function translate(context: { node?: SVGElement; group: any; }, tx: any, ty: undefined) {
  transform('translate', context, tx, ty);
}

// 旋转
export function rotate(context: { node?: SVGElement; group: any; }, theta: any) {
  transform('rotate', context, theta);
}

// 伸缩
export function scale(context: { node?: SVGElement; group: any; }, sx: any, sy?: undefined) {
  transform('scale', context, sx, sy);
}

// 斜切
export function skewX(context: { node?: SVGElement; group: any; }, X: number) {
  transform('skewX', context, X);
}
// 斜切
export function skewY(context: { node?: SVGElement; group: any; }, Y: number) {
  transform('skewY', context, Y);
}


export function save(context: { node?: SVGElement; group: any; }) {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
}


export function restore(context: { node?: SVGElement; group: any; }) {
  const { group } = context;
  const { parentNode } = group;
  context.group = parentNode;
}