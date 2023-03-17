const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    CPU_num:number = 0;
    @property
    Confirm_num_1:number = 0;
    @property
    Confirm_num_2:number = 0;
    @property
    p1_name: string = "";
    @property
    p2_name: string = "";
    @property
    IsLoad: boolean = false;
    @property
    p1_IsSet: boolean = false;
    @property
    p2_IsSet: boolean = false;

    @property(cc.Node)
    wait: cc.Node = null;
    @property(cc.Node)
    CPU1_name: cc.Node = null;
    @property(cc.Node)
    CPU2_name: cc.Node = null;

    GoRole1(){
        
        firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).update({
            IsConfirm:"chose_1"
        })
        this.wait.getComponent(cc.Label).string = "...Waiting for another CPU...";
        
        cc.sys.localStorage.setItem('mode', "1");
        //cc.director.loadScene("role_online1");
    }

    GoRole2(){
        
        firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).update({
            IsConfirm:"chose_2"
        })
        this.wait.getComponent(cc.Label).string = "...Waiting for another CPU...";
        
        cc.sys.localStorage.setItem('mode', "2");
        //c.director.loadScene("role_online2");
    }


    protected onLoad(): void {
        
        firebase.database().ref('/root/Lobby').once('value', (snapshot)=>{
            this.CPU_num = 0;
            snapshot.forEach((child_snapshot)=>{
                //console.log("test")
                if(this.CPU_num == 0){
                    this.p1_name = child_snapshot.val().UserName;
                    this.CPU_num += 1;
                } else if(this.CPU_num == 1){
                    this.p2_name = child_snapshot.val().UserName;
                    this.CPU_num += 1;
                    firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).update({
                        CPU_num:2
                    })
                }
                
            })
        }).then(()=>{
            this.CPU1_name.getComponent(cc.Label).string = this.p1_name;
            this.CPU2_name.getComponent(cc.Label).string = this.p2_name;
        })
    }

    start(){
        
        firebase.database().ref('/root/Lobby').on('value', (snapshot)=>{
            this.CPU_num = 0;
            snapshot.forEach((child_snapshot)=>{
                
                if(this.CPU_num == 0){
                    this.p1_name = child_snapshot.val().UserName;
                    this.CPU_num += 1;
                } else if(this.CPU_num == 1){
                    this.p2_name = child_snapshot.val().UserName;
                    this.CPU_num += 1;
                }
            })
        })

        firebase.database().ref('/root/Lobby').on('value', (snapshot)=>{
            this.Confirm_num_1 = 0;
            this.Confirm_num_2 = 0;
            snapshot.forEach((child_snapshot)=>{
                if(child_snapshot.val().IsConfirm == "chose_1" && this.Confirm_num_1 < 2){
                    this.Confirm_num_1 += 1;
                } else if(child_snapshot.val().IsConfirm == "chose_2" && this.Confirm_num_2 < 2){
                    this.Confirm_num_2 += 1;
                }
                //console.log(this.Confirm_num);
            })
        })
    }
    protected update(dt: number): void {
        if(this.Confirm_num_1 == 2 && !this.IsLoad){
            this.IsLoad = true;
            cc.director.loadScene("role_online1");
        }
        if(this.Confirm_num_2 == 2 && !this.IsLoad){
            this.IsLoad = true;
            cc.director.loadScene("role_online2");
        }
        if(!this.p1_IsSet && this.p1_name != ''){
            this.CPU1_name.getComponent(cc.Label).string = this.p1_name;
            this.p1_IsSet = true;
        }
        if(!this.p2_IsSet && this.p2_name != ''){
            this.CPU2_name.getComponent(cc.Label).string = this.p2_name;
            this.p2_IsSet = true;
        }
    }
}