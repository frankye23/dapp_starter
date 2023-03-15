import { createVNode, render } from "vue";
import message from './Message.vue'

// define a div and add it to the dom
const div = document.createElement("div");
document.body.appendChild(div);

// define a timer
let timer = null as any

type msg = {
  str: string;
  type: string;
}

export default ({ str, type}: msg) => {
  // invoking vnode
  const vnode = createVNode(message, { str, type });
  // render vnode into dom
  render(vnode, div);
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, div);
  }, 3000);

}