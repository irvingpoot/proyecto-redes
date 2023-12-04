import { gsap } from 'gsap';
import { lerp, getMousePos } from './utils';

// Track the mouse position
let mouse = {x: 0, y: 0};
window.addEventListener('mousemove', ev => mouse = getMousePos(ev));

export class Cursor {
    enter() {
        this.renderedStyles['scale'].current = 1.5;
        //this.renderedStyles['opacity'].current = 0.5;
    }
    leave() {
        this.renderedStyles['scale'].current = 1;
        //this.renderedStyles['opacity'].current = 1;
    }
    render() {
        this.renderedStyles['tx'].current = mouse.x - this.bounds.width/2;
        this.renderedStyles['ty'].current = mouse.y - this.bounds.height/2;

        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
        }
                    
        this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px) scale(${this.renderedStyles['scale'].previous})`;
        //this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;

        requestAnimationFrame(() => this.render());
    }
}