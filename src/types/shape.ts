export interface CommonAttributes {
  [s: string]: unknown;
}
export interface RectAttr extends CommonAttributes {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
}

export interface LineAttr extends CommonAttributes {
  x1?:  string | number;
  x2?: string | number;
  y1?: string | number;
  y2?: string | number;
}

export interface EllipseAttr extends CommonAttributes {
  cx?: string | number;
  cy?: string | number;
  rx?: string | number;
  ry?: string | number;
}

export interface CircleAttr extends CommonAttributes {
  cx?: string | number;
  cy?: string | number;
  r?: string | number;
}

export interface TextAttr extends CommonAttributes {
  x
  y
  dx
  dy
  
}