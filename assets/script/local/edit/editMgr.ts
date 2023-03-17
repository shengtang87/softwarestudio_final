const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    GoEditGame(){
        cc.director.loadScene("loading");
    }

}
