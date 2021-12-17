## XSVG

a lightweight svg render library


### API

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

filter: (el:any, params:any) => filter(context, el, params),

gradient: (el:any, params:any) => gradient(context, el, params)

group: () => context.group,

node: () => context.node,
