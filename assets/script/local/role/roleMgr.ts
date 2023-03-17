const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    player_1: cc.Node = null;
    @property(cc.Node)
    player_2: cc.Node = null;

    playerInfo_1 = {
        name: '',
        hp: 0,
        mp: 0
    };
    playerInfo_2 = {
        name: '',
        hp: 0,
        mp: 0
    };
    
    // change and send role name
    GotoMap(){
        var playerA = this.player_1.getComponent("playerMgr");
        this.playerInfo_1.name = playerA.roles[playerA.index].name;
        cc.sys.localStorage.setItem('playerInfo_1', JSON.stringify(this.playerInfo_1));
        var playerB = this.player_2.getComponent("playerMgr")
        this.playerInfo_2.name = playerB.roles[playerB.index].name;
        cc.sys.localStorage.setItem('playerInfo_2', JSON.stringify(this.playerInfo_2));



        cc.director.loadScene("map");
    }
    
}
