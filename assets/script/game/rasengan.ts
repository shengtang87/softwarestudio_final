const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.scheduleOnce(()=>{
            this.node.destroy();
        }, 2)
    }

    // update (dt) {}
}
