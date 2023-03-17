const {ccclass, property} = cc._decorator;

@ccclass
export default class magic_field extends cc.Component {

    player = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.player = cc.find('Canvas/player1');
    }

    start () {
        
    }

    update (dt) {
        //console.log(this.player);
        //this.node.x = this.player.x;
        //this.node.y = this.player.y;
        this.node.angle = this.node.angle == 360?0:this.node.angle + 1;
    }
}
