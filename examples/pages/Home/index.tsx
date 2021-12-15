import React, { useEffect } from 'react';
import { createRenderer } from '../../../src';
import './style.less';

export function createDiv() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}

export function getAttributes(node, attributes) {
  return attributes.reduce((total: { [x: string]: any; }, cur: string | number) => (total[cur] = node.getAttribute(cur), total), {});
}

const HomePage: React.FC = () => {

  useEffect(() => {
    // 创建渲染器
    const renderer = createRenderer(600, 400);

    // 绘制基本图形 
    const a = renderer.rect({
      x: 10, 
      y: 10, 
      width: 50, 
      height: 50, 
      fill: 'red', 
    });

    console.log(a)
    renderer.filter(a, [{ name: 'blur', params:[{ unit: '', value: 15}] }])
    // // 坐标变换 
    renderer.save(); 
    // renderer.scale(2, 2); 
    // renderer.rect({ 
    //   x: 10, 
    //   y: 10, 
    //   width: 50, 
    //   height: 50 
    // }); 
    // renderer.restore();
    document.body.appendChild(renderer.node())
  }, [])
    
  useEffect(() => {
    const renderer = createRenderer(600, 400);
    const ring = renderer.ring({
      cx: 100,
      cy: 100,
      r1: 30,
      r2: 60,
      strokeWidth: 10,
      stroke: 'red',
      fill: 'blue',
    });
    const [c0, c1, c2] = ring;

    mount(createDiv(), renderer.node());
  }, [])

  useEffect(() => {
    const renderer = createRenderer(600, 400);

    renderer.save();
    renderer.translate(200, 100);
    renderer.rotate(60);
    renderer.scale(2, 3);
    const r1 = renderer.rect({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });
    renderer.restore();

    const r2 = renderer.rect({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });

    mount(createDiv(), renderer.node());
  }, [])
  useEffect(() => {
    const renderer = createRenderer(600, 400);

    // renderer.save();
    // renderer.translate(200, 100);
    // renderer.rotate(60);
    renderer.skewX(60);
    renderer.skewY(60);
    // renderer.scale(2, 3);
    const r1 = renderer.rect({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });
    renderer.restore();

    const r2 = renderer.rect({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });

    mount(createDiv(), renderer.node());
  }, [])
  return (
    <div className="home-wrapper">

    </div>
  );
};

export default HomePage;
