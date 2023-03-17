const {ccclass, property} = cc._decorator;

@ccclass
export default class damage_effect extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.scheduleOnce(()=>{
            this.node.destroy();
        }, 0.25);
    }

    // update (dt) {}
}
