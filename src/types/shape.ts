import { SVGAttributes } from 'react';

export interface RectAttr extends SVGAttributes<any> {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
}

export interface LineAttr extends  SVGAttributes<any> {
  x1?:  string | number;
  x2?: string | number;
  y1?: string | number;
  y2?: string | number;
}

export interface EllipseAttr extends SVGAttributes<any> {
  cx?: string | number;
  cy?: string | number;
  rx?: string | number;
  ry?: string | number;
}

export interface CircleAttr extends SVGAttributes<any> {
  cx?: string | number;
  cy?: string | number;
  r?: string | number;
}

export interface TextOptions extends SVGAttributes<any> {
  text: any; 
  // attr
  x?: number;
  y?: number;
  dx?: string;
  dy?: string;
  textAnchor?: string;
  rotate?: string;
  textLength?: number | string;
  lengthAdjust?: string; 
}


export type PathAttr = Omit<SVGAttributes<any>, 'd>'> & {
  d?: string[];
}

export interface RinOptions extends SVGAttributes<any> {
  r1?: number;
  r2?: number;
}