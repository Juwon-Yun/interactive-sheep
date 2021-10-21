import{
    Hill
} from './hill.js';

import{
    SheepController
}from './sheep-controller.js';

import{
    Sun
} from './sun.js';

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.sun = new Sun();

        this.hills = [
            // new Hill('16진수색상', 언덕의 속도, 언덕의 경사)
            new Hill('#ff6bea', 0.2, 12),
            new Hill('#ff59c2', 0.5, 9),
            new Hill('#ff4674', 1.0, 6)
        ];

        this.SheepController = new SheepController('sheep.png');
        // this.SheepController = [
        //     new SheepController('sheep.png'),
        //     new SheepController('juwon_sheep.png'),
        // ];
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.sun.resize(this.stageWidth, this.stageHeight);

        for(let i = 0; i < this.hills.length; i++){
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        
        this.SheepController.resize(this.stageWidth, this.stageHeight);
        // for(let i = 0; i < this.SheepController.length; i++){
        //     this.SheepController[i].resize(this.stageWidth, this.stageHeight);
        // }
    }

    animate(t){
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.sun.draw(this.ctx, t);

        let dots;
        for(let i = 0; i < this.hills.length; i++){
            dots = this.hills[i].draw(this.ctx);
        }

        this.SheepController.draw(this.ctx, t, dots);
        // for(let i = 0; i < this.SheepController.length; i++){
        //     this.SheepController[i].draw(this.ctx);
        // }
    }
}

window.onload = () =>{
    new App();
};