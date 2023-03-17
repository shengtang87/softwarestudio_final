const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    map: cc.Node = null;
    
    mapInfo = {
        name: ''
    };
    
    GoFinish(){
        var map_ = this.map.getComponent("selectMgr")
        this.mapInfo.name = map_.maps[map_.index].name
        cc.sys.localStorage.setItem('map', JSON.stringify(this.mapInfo.name));
        
        if(map_.index == map_.maxindex){
            cc.director.loadScene("edit");
        } else {
            //console.log(this.mapInfo);
            cc.director.loadScene("loading");
        }
    }
    
    // 抓角色資料
    /*
    protected onLoad(): void {
        var player1 = JSON.parse(cc.sys.localStorage.getItem('playerInfo_1'));
        var player2 = JSON.parse(cc.sys.localStorage.getItem('playerInfo_2'));
        console.log(player1, player2)
    }
    */
   protected onLoad(): void {
        firebase.database().ref('/root/edit').remove()
   }
}
