const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    player1 = null;
    player2 = null;
    player3 = null;
    player4 = null;

    game_type = 0; //0:p1p2, 1:p1p3, 2:p1p2p3p4

    @property(cc.Camera)
    camera = null;

    onLoad () {
        this.game_type = -1;
    }

    start () {
        this.player1 = cc.find('Canvas/player1');
        this.player2 = cc.find('Canvas/player2');
        this.player3 = cc.find('Canvas/player3');
        this.player4 = cc.find('Canvas/player4');
        console.log(this.player1,this.player2,this.player3,this.player4);
        if(this.player1 != null && this.player2 != null && this.player3 != null && this.player4 != null){
            this.game_type = 2;
        }
        else if(this.player1 != null && this.player3 != null){
            this.game_type = 1;
        }
        else if(this.player1 != null && this.player2 != null){
            this.game_type = 0;
        }
        console.log(this.game_type);
    }

    update (dt) {
        if(this.game_type == -1) return;
        if(this.game_type == 0){
            if(!this.player1.active && !this.player2.active) this.zeroP();
            else if(!this.player1.active) this.oneP(this.player2);
            else if(!this.player2.active) this.oneP(this.player1);
            else this.twoP(this.player1, this.player2);
        }
        else if(this.game_type == 1){
            if(!this.player1.active && !this.player3.active) this.zeroP()
            else if(!this.player1.active) this.oneP(this.player3);
            else if(!this.player3.active) this.oneP(this.player1);
            else this.twoP(this.player1, this.player3);
        }
        else if(this.game_type == 2){
            if(!this.player1.active && !this.player2.active && !this.player3.active && !this.player4.active)
                this.zeroP();

            else if(this.player1.active && !this.player2.active && !this.player3.active && !this.player4.active)
                this.oneP(this.player1);
            else if(!this.player1.active && this.player2.active && !this.player3.active && !this.player4.active)
                this.oneP(this.player2);
            else if(!this.player1.active && !this.player2.active && this.player3.active && !this.player4.active)
                this.oneP(this.player3);
            else if(!this.player1.active && !this.player2.active && !this.player3.active && this.player4.active)
                this.oneP(this.player4);

            else if(this.player1.active && this.player2.active && !this.player3.active && !this.player4.active)
                this.twoP(this.player1, this.player2);
            else if(this.player1.active && !this.player2.active && this.player3.active && !this.player4.active)
                this.twoP(this.player1, this.player3);
            else if(this.player1.active && !this.player2.active && !this.player3.active && this.player4.active)
                this.twoP(this.player1, this.player4);
            else if(!this.player1.active && this.player2.active && this.player3.active && !this.player4.active)
                this.twoP(this.player2, this.player3);
            else if(!this.player1.active && this.player2.active && !this.player3.active && this.player4.active)
                this.twoP(this.player2, this.player4);
            else if(!this.player1.active && !this.player2.active && this.player3.active && this.player4.active)
                this.twoP(this.player3, this.player4);
            
            else if(this.player1.active && this.player2.active && this.player3.active && !this.player4.active)
                this.threeP(this.player1, this.player2, this.player3);
            else if(this.player1.active && this.player2.active && !this.player3.active && this.player4.active)
                this.threeP(this.player1, this.player2, this.player4);
            else if(this.player1.active && !this.player2.active && this.player3.active && this.player4.active)
                this.threeP(this.player1, this.player3, this.player4);
            else if(!this.player1.active && this.player2.active && this.player3.active && this.player4.active)
                this.threeP(this.player2, this.player3, this.player4);

            else this.fourP(this.player1, this.player2, this.player3, this.player4);
        }
    }
    zeroP(){
        this.camera.zoomRatio = 1;
        this.camera.node.x = this.camera.node.y = 0;
    }
    oneP(first){
        this.camera.zoomRatio = 2;
    
        var height = 720 / 2;
        var width = 1280 / 2;
    
        if(first.x + width / 2 >= 640) this.camera.node.x = 640 - width / 2;
        else if(first.x - width / 2 <= -640) this.camera.node.x = -640 + width / 2;
        else this.camera.node.x = first.x;
    
        if(first.y + height / 2 >= 360) this.camera.node.y = 360 - height / 2;
        else if(first.y - height / 2 <= -360) this.camera.node.y = -360 + height / 2;
        else this.camera.node.y = first.y;
    }
    twoP(first, second){
        var zoomX = 1280 / (Math.abs(first.x - second.x) + 300);
        var zoomY = 720 / (Math.abs(first.y - second.y) + 300);
            
        var zoom = zoomX < zoomY ? zoomX:zoomY;
        if(zoom <= 1) zoom = 1;
        else if(zoom >= 2) zoom = 2;
        this.camera.zoomRatio = zoom;
    
        var height = 720 / zoom;
        var width = 1280 / zoom;
    
        var midX = (first.x + second.x) / 2;
        var midY = (first.y + second.y) / 2;
    
        if(midX + width / 2 >= 640) this.camera.node.x = 640 - width / 2;
        else if(midX - width / 2 <= -640) this.camera.node.x = -640 + width / 2;
        else this.camera.node.x = midX;
    
        if(midY + height / 2 >= 360) this.camera.node.y = 360 - height / 2;
        else if(midY - height / 2 <= -360) this.camera.node.y = -360 + height / 2;
        else this.camera.node.y = midY;
    }
    threeP(first, second, third){
        var dx1 = Math.abs(first.x - second.x);
        var dx2 = Math.abs(first.x - third.x);
        var dx3 = Math.abs(second.x - third.x);
        var arr = [dx1, dx2, dx3];
        var midX = 0.5 * (first.x + second.x);
        var ind = 0;
        for(var i = 1; i < 3; i ++){
            if(arr[i] > arr[ind]){
                ind = i;          

                if(i == 1) midX = 0.5 * (first.x + third.x);
                else if(i == 2) midX = 0.5 * (second.x + third.x);
            }
        }
        var zoomX = 1280 / (arr[ind] + 300);

        var dy1 = Math.abs(first.y - second.y);
        var dy2 = Math.abs(first.y - third.y);
        var dy3 = Math.abs(second.y - third.y);
        var arr = [dy1, dy2, dy3];
        var midY = (first.y + second.y) / 2;
        var ind = 0;
        for(var i = 1; i < 3; i ++){
            if(arr[i] > arr[ind]){
                ind = i;
                
                if(i == 1) midY = 0.5 * (first.y + third.y);
                else if(i == 2) midY = 0.5 * (second.y + third.y);
            }
        }
        var zoomY = 720 / (arr[ind] + 300);

        var zoom = zoomX < zoomY ? zoomX:zoomY;
        if(zoom <= 1) zoom = 1;
        else if(zoom >= 2) zoom = 2;
        this.camera.zoomRatio = zoom;
    
        var height = 720 / zoom;
        var width = 1280 / zoom;

        if(midX + width / 2 >= 640) this.camera.node.x = 640 - width / 2;
        else if(midX - width / 2 <= -640) this.camera.node.x = -640 + width / 2;
        else this.camera.node.x = midX;
    
        if(midY + height / 2 >= 360) this.camera.node.y = 360 - height / 2;
        else if(midY - height / 2 <= -360) this.camera.node.y = -360 + height / 2;
        else this.camera.node.y = midY;
    }
    fourP(first, second, third, fourth){
        var dx1 = Math.abs(first.x - second.x);
        var dx2 = Math.abs(first.x - third.x);
        var dx3 = Math.abs(first.x - fourth.x);
        var dx4 = Math.abs(second.x - third.x);
        var dx5 = Math.abs(second.x - fourth.x);
        var dx6 = Math.abs(third.x - fourth.x);
        var arr = [dx1, dx2, dx3, dx4, dx5, dx6];
        var midX = 0.5 * (first.x + second.x);
        var ind = 0;
        for(var i = 1; i < 6; i ++){
            if(arr[i] > arr[ind]){
                ind = i;
                
                if(i == 1) midX = 0.5 * (first.x + third.x);
                else if(i == 2) midX = 0.5 * (first.x + fourth.x);
                else if(i == 3) midX = 0.5 * (second.x + third.x);
                else if(i == 4) midX = 0.5 * (second.x + fourth.x);
                else if(i == 5) midX = 0.5 * (third.x + fourth.x);
            }
        }
        var zoomX = 1280 / (arr[ind] + 300);

        var dy1 = Math.abs(first.y - second.y);
        var dy2 = Math.abs(first.y - third.y);
        var dy3 = Math.abs(first.y - fourth.y);
        var dy4 = Math.abs(second.y - third.y);
        var dy5 = Math.abs(second.y - fourth.y);
        var dy6 = Math.abs(third.y - fourth.y);
        var arr = [dy1, dy2, dy3, dy4, dy5, dy6];
        var midY = (first.y + second.y) / 2;
        var ind = 0;
        for(var i = 1; i < 6; i ++){
            if(arr[i] > arr[ind]){
                ind = i;
                
                if(i == 1) midY = 0.5 * (first.y + third.y);
                else if(i == 2) midY = 0.5 * (first.y + fourth.y);
                else if(i == 3) midY = 0.5 * (second.y + third.y);
                else if(i == 4) midY = 0.5 * (second.y + fourth.y);
                else if(i == 5) midY = 0.5 * (third.y + fourth.y);
            }
        }
        var zoomY = 720 / (arr[ind] + 300);

        var zoom = zoomX < zoomY ? zoomX:zoomY;
        if(zoom <= 1) zoom = 1;
        else if(zoom >= 2) zoom = 2;
        this.camera.zoomRatio = zoom;
    
        var height = 720 / zoom;
        var width = 1280 / zoom;

        if(midX + width / 2 >= 640) this.camera.node.x = 640 - width / 2;
        else if(midX - width / 2 <= -640) this.camera.node.x = -640 + width / 2;
        else this.camera.node.x = midX;
    
        if(midY + height / 2 >= 360) this.camera.node.y = 360 - height / 2;
        else if(midY - height / 2 <= -360) this.camera.node.y = -360 + height / 2;
        else this.camera.node.y = midY;
    }
}
