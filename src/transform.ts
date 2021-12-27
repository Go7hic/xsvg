
// 坐标系变换
import { applyTransform, createSVGElement, mount } from './utils';

export function transform(type: string, context: { group: SVGElement; }, ...params: any[]) {
  // type 是希望的变换种类：scale，translate，rotate 等
  const { group } = context;
  applyTransform(group, `${type}(${params.join(', ')})`);
}

// 平移
export function translate(context: { node?: SVGElement; group: SVGElement; }, tx: number | string, ty: number | string) {
  transform('translate', context, tx, ty);
}

// 旋转
export function rotate(context: { node?: SVGElement; group: SVGElement; }, theta: number | string) {
  transform('rotate', context, theta);
}

// 伸缩
export function scale(context: { node?: SVGElement; group: SVGElement; }, sx: number | string, sy?: number | string) {
  transform('scale', context, sx, sy);
}

// 斜切
export function skewX(context: { node?: SVGElement; group: SVGElement; }, X: number) {
  transform('skewX', context, X);
}
// 斜切
export function skewY(context: { node?: SVGElement; group: SVGElement; }, Y: number) {
  transform('skewY', context, Y);
}


export function save(context: { node?: SVGElement; group: SVGElement; }) {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
}


export function restore(context: { node: SVGElement; group: SVGElement; }) {
  const { group } = context;
  const { parentNode } = group;
  if (parentNode) {
    context.group = parentNode as SVGAElement;
  }
}