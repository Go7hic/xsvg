import { SVGAttributes } from 'react';
import { LineAttr, TextOptions, PathAttr, RinOptions } from './types/shape';
import { applyAttributes, createSVGElement, mount } from './utils';

function shape(type: string, context: { node?: SVGElement; group: SVGElement; }, attributes: SVGAttributes<any>) {
  const { group } = context; // 挂载元素
  const el = createSVGElement(type); // 创建对应的元素
  applyAttributes(el, attributes); // 设置属性
  console.log(context)
  mount(group, el); // 挂载
  return el; // 返回该元素

}


export function line(context: { node: SVGElement | undefined; group: SVGElement; }, attributes: SVGAttributes<any>) {
  return shape('line', context, attributes);
}

// rect 不支持 width 和 height 是负数，下面这种情况将绘制不出来
// <rect width="-60" height="-60" x="100" y="100" /> ❌
// 为了使其支持负数的 width 和 height，我们转换成如下的形式
// <rect width="60" height="60" x="40" y="40" /> ✅
export function rect(context: { node: SVGElement | undefined; group: SVGElement; }, attributes: SVGAttributes<any>) {
  const {
    width, height, x, y,
  } = attributes;

  return shape('rect', context, {
    ...attributes,
    width: Math.abs(Number(width)),
    height: Math.abs(Number(height)),
    x: Number(width) > 0 ? x : Number(x) + Number(width),
    y: Number(height) > 0 ? y : Number(y) + Number(height),
  });
}

export function circle(context: { node: SVGElement | undefined; group: SVGElement; }, attributes: SVGAttributes<any>) {
  return shape('circle', context, attributes);
}

// text 元素是将展示内容放在标签内部，而不是作为标签的属性
// <text text='content' /> ❌
// <text>content</text> ✅
export function text(context: { node: SVGElement; group: SVGElement; }, option: TextOptions) {
  const { text, ...rest } = option;
  const textElement = shape('text', context, rest);
  textElement.textContent = text; // 通过 textContent 设置标签内的内容
  return textElement;
}

// https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
// path 的属性 d （路径）是一个字符串，拼接起来比较麻烦，这里我们通过数组去生成
// [
//  ['M', 10, 10],
//  ['L', 100, 100],
//  ['L', 100, 10],
//  ['Z'],
// ];
// 上面的二维数组会被转换成如下的字符串
// 'M 10 10 L 100 100 L 100 10 Z'
export function path(context: { node: SVGElement; group: SVGElement; }, attributes: PathAttr) {
  const { d } = attributes;
  return shape('path', context, { ...attributes, d: d && d.flat().join(' ') });
}

export function ring(context: { node: SVGElement; group: SVGElement; }, attributes: RinOptions) {
  // r1 是内圆的半径，r2 是外圆的半径
  const {
    cx, cy, r1, r2, ...styles
  } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });
  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });
  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
}

/**
 * 椭圆
 * @param context 
 * @param attributes 
 * @returns 
 */
export function ellipse(context: { node: SVGElement | undefined; group: SVGElement; }, attributes: SVGAttributes<any>) {
  return shape('ellipse', context, attributes);
}