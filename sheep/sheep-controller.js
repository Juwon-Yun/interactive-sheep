import{
    sheep
} from "./sheep.js";

export class SheepController{
    // constructor(){
    constructor(img){
        this.img = new Image();
        this.img.onload = () =>{
            this.loaded();
        };
        // this.img.src = 'juwon_sheep.png';
        this.img.src = img;
        this.items = [];

        this.cur = 0;

        this.isLoaded = false;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded(){
        this.isLoaded = true;
        this.addSheep();
    }

    addSheep(){
        this.items.push(
            new sheep(this.img, this.stageWidth),
        );
    }

    draw(ctx, t, dots){
        if(this.isLoaded){
            this.cur += 1;
            if(this.cur > 200){
                this.cur = 0;
                this.addSheep();
            }

            for(let i = this.items.length - 1; i >= 0; i--){
                const item = this.items[i];
                if(item.x < -item.width){
                    this.items.splice(i, 1);
                } else {
                    item.draw(ctx, t, dots);
                }
            }
        }
    }

}