import { createContext } from './context';
import { filter } from './filter';
import {
  line, circle, text, rect, path, ring, ellipse,
} from './shape';
import {
  restore, save, scale, translate, rotate, skewX, skewY
} from './transform';


export function createRenderer(width: any, height: any) {
  const context = createContext(width, height);
  return {
    line: (options: any) => line(context, options), 
    circle: (options: any) => circle(context, options),
    text: (options: any) => text(context, options),
    rect: (options: any) => rect(context, options),
    path: (options: any) => path(context, options),
    ring: (options: any) => ring(context, options),
    ellipse: (options:any) => ellipse(context, options),
    restore: () => restore(context),
    save: () => save(context),
    scale: (x: any, y: any) => scale(context, x, y),
    rotate: (theta: any) => rotate(context, theta),
    translate: (x: any, y: any) => translate(context, x ,y),
    skewX: (x: number) => skewX(context, x),
    skewY: (y: number) => skewY(context, y),
    node: () => context.node,
    group: () => context.group,
    filter: (el:any, params:any) => filter(context, el, params)
  };
}