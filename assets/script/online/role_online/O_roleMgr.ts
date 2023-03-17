const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    player_1: cc.Node = null;
    @property(cc.Node)
    wait: cc.Node = null;
    @property
    Confirm_num:number = 0;
    @property
    IsLoad: boolean = false;

    playerInfo = {
        name: '',
        hp: 0,
        mp: 0
    };
    
    // change and send role name
    GotoMap(){
        var playerA = this.player_1.getComponent("playerMgr");
        var name_temp = playerA.roles[playerA.index].name;
        firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).update({
            roleName1:name_temp,
            roleName2:"",
            IsConfirm:"true"
        })
        this.wait.getComponent(cc.Label).string = "...Waiting for another CPU..."
    }
    protected onLoad(): void {
        firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).update({
            IsConfirm:"false"
        })
    }
    
    start(){
        firebase.database().ref('/root/Lobby').on('value', (snapshot)=>{
            this.Confirm_num = 0;
            snapshot.forEach((child_snapshot)=>{
                if(child_snapshot.val().IsConfirm == "true" && this.Confirm_num < 2){
                    this.Confirm_num += 1;
                }
            })
        })
    }
    protected update(dt: number): void {
        if(this.Confirm_num == 2 && !this.IsLoad){
            this.IsLoad = true;
            firebase.database().ref('/root/Lobby').once('value', (snapshot)=>{
                snapshot.forEach((child_snapshot)=>{
                    if(child_snapshot.val().CPU_num == 1){
                        this.playerInfo.name = child_snapshot.val().roleName1;
                        cc.sys.localStorage.setItem('playerInfo_1', JSON.stringify(this.playerInfo));
                        console.log("p1 is : " + this.playerInfo.name)
                    } else if (child_snapshot.val().CPU_num == 2) {
                        this.playerInfo.name = child_snapshot.val().roleName1;
                        cc.sys.localStorage.setItem('playerInfo_3', JSON.stringify(this.playerInfo));
                        console.log("p3 is : " + this.playerInfo.name)
                    }
                })
            }).then(()=>{
                cc.director.loadScene("map_online");
            })
        }
    }
    
}
