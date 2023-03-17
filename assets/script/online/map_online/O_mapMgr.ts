const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    map: cc.Node = null;
    @property
    Confirm_num:number = 0;
    @property
    IsLoad: boolean = false;
    @property(cc.Node)
    wait: cc.Node = null;
    @property
    mode: string = '';

    mapInfo = {
        name: ''
    };
    
    GoGame(){
        var map_ = this.map.getComponent("O_selectMgr")
        this.mapInfo.name = map_.maps[map_.online_index].name
        cc.sys.localStorage.setItem('map', JSON.stringify(this.mapInfo.name));

        firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).update({
            IsConfirm:"true"
        })
        this.wait.getComponent(cc.Label).string = "...Waiting for another CPU...";
    }
    protected onLoad(): void {
        this.mode = cc.sys.localStorage.getItem('mode')
        //console.log(JSON.parse(cc.sys.localStorage.getItem('playerInfo_1')).name)
        //console.log(JSON.parse(cc.sys.localStorage.getItem('playerInfo_2')).name)
        //console.log(JSON.parse(cc.sys.localStorage.getItem('playerInfo_3')).name)
        //console.log(JSON.parse(cc.sys.localStorage.getItem('playerInfo_4')).name)
        //console.log(this.mode);
    }

    start(){
        firebase.database().ref('/root/Lobby').on('value', (snapshot)=>{
            this.Confirm_num = 0;
            snapshot.forEach((child_snapshot)=>{
                if(child_snapshot.val().IsConfirm == "true" && this.Confirm_num < 2){
                    this.Confirm_num += 1;
                }
                //console.log(this.Confirm_num);
            })
        })
    }
    protected update(dt: number): void {
        if(this.Confirm_num == 2 && !this.IsLoad){
            this.IsLoad = true;
            if(this.mode == '1'){
                cc.director.loadScene("loading_online");
            } else if (this.mode == '2'){
                cc.director.loadScene("loading_online2");
            }
            
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
}
