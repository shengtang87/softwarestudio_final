const {ccclass, property} = cc._decorator;

@ccclass
export default class button extends cc.Component {
    @property(cc.AudioClip)
    clicksound: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {        
    }

    start () {
        this.node.on('mouseenter', function ( event ) {
            document.body.style.cursor = "pointer";
        });
        this.node.on('mouseleave', function ( event ) {
            document.body.style.cursor = "auto";
        });        
        this.node.on('click', this.clicked, this);
    }

    // update (dt) {}

    clicked(){
        cc.audioEngine.playEffect(this.clicksound,false)
    }

}
