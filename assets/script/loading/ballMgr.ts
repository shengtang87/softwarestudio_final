const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ball_1: cc.Node = null;
    @property(cc.Node)
    ball_2: cc.Node = null;
    @property(cc.Node)
    ball_3: cc.Node = null;
    @property(cc.Node)
    ball_4: cc.Node = null;
    @property(cc.Node)
    ball_5: cc.Node = null;

    onLoad(){
        let action1 = cc.repeatForever(
            cc.sequence(cc.moveBy(0.5, 0, 0), cc.fadeOut(0.5), cc.moveBy(2.5, 0, 0), cc.fadeIn(0.5))
        )
        this.ball_1.runAction(action1)

        let action2 = cc.repeatForever(
            cc.sequence(cc.moveBy(1, 0, 0), cc.fadeOut(0.5), cc.moveBy(2, 0, 0), cc.fadeIn(0.5))
        )
        this.ball_2.runAction(action2)

        let action3 = cc.repeatForever(
            cc.sequence(cc.moveBy(1.5, 0, 0), cc.fadeOut(0.5), cc.moveBy(1.5, 0, 0), cc.fadeIn(0.5))
        )
        this.ball_3.runAction(action3)

        let action4 = cc.repeatForever(
            cc.sequence(cc.moveBy(2, 0, 0), cc.fadeOut(0.5), cc.moveBy(1, 0, 0), cc.fadeIn(0.5))
        )
        this.ball_4.runAction(action4)

        let action5 = cc.repeatForever(
            cc.sequence(cc.moveBy(2.5, 0, 0), cc.fadeOut(0.5), cc.moveBy(0.5, 0, 0), cc.fadeIn(0.5))
        )
        this.ball_5.runAction(action5)
    }
}
