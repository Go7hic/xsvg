import { ParsedElement } from "./filter";

export function createSVGElement(type: string) {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

// 将 child 节点挂载到 parent 节点上面
export function mount(parent: SVGElement, child: SVGElement) {
  if (parent) {
    parent.appendChild(child);
  }
}

export function applyAttributes(element: SVGElement, attributes: any) {
  for (const [key, value] of Object.entries(attributes)) {
    // 这里需要把类似 strokeWidth 的属性转换成 stroke-width 的形式
    // 思路就是将大写字母替成 - + 对应的小写字母的形式
    // 下面涉及到正则匹配，不太了解的同学可以去下面的链接学习：
    // https://juejin.cn/post/6844903487155732494
    const kebabCaseKey = key.replace(/[A-Z]/g, (d) => `-${d.toLocaleLowerCase()}`);
    
    element.setAttribute(kebabCaseKey, value as string);
  }
}

export function applyTransform(element: { getAttribute: (arg0: string) => string; setAttribute: (arg0: string, arg1: string) => void; }, transform: string) {
  const oldTransform = element.getAttribute('transform') || '';
  // 将新的变换指定到后面的变换后，这里需要字符串拼接
  const prefix = oldTransform ? `${oldTransform} ` : '';
  element.setAttribute('transform', `${prefix}${transform}`);
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


export function createFeColorMatrix($filter: SVGElement, matrix: number[]) {
  const $feColorMatrix = createSVGElement('feColorMatrix');
  $feColorMatrix.setAttribute('type', 'matrix');
  $feColorMatrix.setAttribute('values', matrix.join(' '));
  $filter.appendChild($feColorMatrix);
}

export function convertToAbsoluteValue(param: ParsedElement) {
  return param.unit === '%' ? param.value / 100 : param.value;
}
export function createFeComponentTransfer(
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