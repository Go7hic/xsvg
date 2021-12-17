/* eslint-disable @typescript-eslint/no-use-before-define */
// 渐变

import { applyAttributes, createSVGElement, mount } from "./utils";
const GRADIENT_PREFIX = 'g-gradient-';
/**
 * svg -> defs | shape -> linearGradient -> stop
 * @param context 
 * @param el 
 * @param option 
 */
export function gradient(context:any, el:any, option:any) {
  const { group, node, idx } = context; // 挂载元素  svg
  const $def = createSVGElement('defs') as SVGDefsElement; // defs
  const gradientId = `${GRADIENT_PREFIX}${idx}`;
  if (option.type === 'line') {
    
    const $line = createSVGElement('linearGradient') as SVGLinearGradientElement; // linearGradient
    option.attributes && applyAttributes($line, option.attributes); // 设置属性
    $line.id = gradientId
    option.stops.map((item:any) =>  createStops($line, item))
    $def.appendChild($line);
  }
  if (option.type === 'radial') {
  
    const $radial = createSVGElement('radialGradient') as SVGRadialGradientElement; // radialGradient
    option.attributes && applyAttributes($radial, option.attributes); // 设置属性
    $radial.id = gradientId
    option.stops.map((item:any) =>  createStops($radial, item))
    $def.appendChild($radial);
  }
  mount(group, $def); // 挂载 def 
  
  el?.setAttribute('fill', `url(#${gradientId})`);
  mount(group, el); // 挂载

}

export function createStops($gradient: SVGLinearGradientElement | SVGRadialGradientElement, attr: any) {
  const $stop = createSVGElement('stop') as SVGStopElement
  applyAttributes($stop, attr); // 设置属性
  $gradient.append($stop)  // linearGradient -> stop
}
