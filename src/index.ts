import { SVGAttributes } from 'react';
import { createContext } from './context';
import { filter } from './filter';
import { gradient } from './gradient';
import {
  line, circle, text, rect, path, ring, ellipse,
} from './shape';
import {
  restore, save, scale, translate, rotate, skewX, skewY
} from './transform';
import { CircleAttr, LineAttr, PathAttr, RectAttr, RinOptions, TextOptions } from './types/shape';


export function createRenderer(width: any, height: any) {
  const context = createContext(width, height);
  return {
    line: (options: LineAttr) => line(context, options), 
    circle: (options: CircleAttr) => circle(context, options),
    text: (options: TextOptions) => text(context, options),
    rect: (options: RectAttr) => rect(context, options),
    path: (options: PathAttr) => path(context, options),
    ring: (options: RinOptions) => ring(context, options),
    ellipse: (options:SVGAttributes<any>) => ellipse(context, options),
    restore: () => restore(context),
    save: () => save(context),
    scale: (x:number | string , y: number | string) => scale(context, x, y),
    rotate: (theta: number | string) => rotate(context, theta),
    translate: (x: number | string, y: number | string) => translate(context, x ,y),
    skewX: (x: number) => skewX(context, x),
    skewY: (y: number) => skewY(context, y),
    node: () => context.node,
    group: () => context.group,
    filter: (el:any, params:any[]) => filter(context, el, params),
    gradient: (el:any, params:any) => gradient(context, el, params)
  };
}