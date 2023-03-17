const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    winner:cc.Node = null;
    @property(cc.Node)
    loser:cc.Node = null;
    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;

    private loser_role = "";
    private winner_role = "";

    private big_mode = "";
    private small_mode = "";

    GoRole(){
        if(this.big_mode == "local"){
            cc.audioEngine.stopAllEffects();//new
            cc.audioEngine.playMusic(this.bgm,true)
            cc.director.loadScene("role");
        } else if (this.big_mode == "online"){
            var UserName
            firebase.database().ref('/root/Home/player' + firebase.auth().currentUser.uid).once('value', e=>{
                UserName = e.val().UserName;
            }).then(()=>{
                firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).set({
                    uid:firebase.auth().currentUser.uid,
                    UserName:UserName,
                    Room:"Lobby",
                    IsConfirm:"false",
                    roleName1:"",
                    roleName2:"",
                    CPU_num:1
                }).then(()=>{
                    cc.director.loadScene("lobby");
                })
                firebase.database().ref('/root/Home/player' + firebase.auth().currentUser.uid).remove()
            })
        }
    }

    GoMode(){
        cc.audioEngine.stopAllEffects();//new
        cc.audioEngine.playMusic(this.bgm,true)
        cc.director.loadScene("mode");
    }

    protected onLoad(): void {
        this.loser_role = cc.sys.localStorage.getItem("loser");
        this.winner_role = cc.sys.localStorage.getItem("winner");
        this.big_mode = cc.sys.localStorage.getItem("game_mode");
        this.small_mode = cc.sys.localStorage.getItem("mode");
    }

    protected start(): void {
        console.log(this.loser_role);
        console.log(this.winner_role);
        if(this.loser_role == 'Zelda'){
            this.loser.getComponent(cc.Animation).play("Zlose");
        } else if (this.loser_role == 'Shadow Link'){
            this.loser.getComponent(cc.Animation).play("Slose");
        } else if (this.loser_role == 'Cadence'){
            this.loser.getComponent(cc.Animation).play("Close");
        } else if (this.loser_role == 'Link'){
            this.loser.getComponent(cc.Animation).play("Llose");
        }

        if(this.winner_role == 'Zelda'){
            this.winner.getComponent(cc.Animation).play("Zwin");
        } else if (this.winner_role == 'Shadow Link'){
            this.winner.getComponent(cc.Animation).play("Swin");
        } else if (this.winner_role == 'Cadence'){
            this.winner.getComponent(cc.Animation).play("Cwin");
        } else if (this.winner_role == 'Link'){
            this.winner.getComponent(cc.Animation).play("Lwin");
        }

        var UserName
        firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).once('value', e=>{
            UserName = e.val().UserName;
        }).then(()=>{
            firebase.database().ref('/root/Home/player' + firebase.auth().currentUser.uid).set({
                uid:firebase.auth().currentUser.uid,
                UserName:UserName,
                Room:"home",
                IsConfirm:"false",
                roleName1:"",
                roleName2:"",
                CPU_num:1
            })
            firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).remove()
        })
    }
}