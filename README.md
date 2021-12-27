## XSVG

a lightweight svg render library


### API

```
// 直线
line: (options: LineAttr) => line(context, options), 
// 圆
circle: (options: CircleAttr) => circle(context, options),
// 文字
text: (options: TextOptions) => text(context, options),
// 矩形
rect: (options: RectAttr) => rect(context, options),
// 路径
path: (options: PathAttr) => path(context, options),
// 环形
ring: (options: RinOptions) => ring(context, options),
// 椭圆
ellipse: (options:SVGAttributes<any>) => ellipse(context, options),
// 重置画布
restore: () => restore(context),
// 保存画布
save: () => save(context),
// 伸缩
scale: (x:number | string , y: number | string) => scale(context, x, y),
// 旋转
rotate: (theta: number | string) => rotate(context, theta),
// 平移
translate: (x: number | string, y: number | string) => translate(context, x ,y),
//斜切
skewX: (x: number) => skewX(context, x),
skewY: (y: number) => skewY(context, y),

// 滤镜
filter: (el:any, params:any[]) => filter(context, el, params),
// 渐变
gradient: (el:any, params:any) => gradient(context, el, params)

node: () => context.node,
group: () => context.group,
```