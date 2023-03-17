const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    illustration:cc.Node = null;
    @property(cc.Node)
    Group:cc.Node = null;

    Logout(){
        firebase.auth().signOut().then(()=>{
            cc.director.loadScene("home");
        });
    }

    GoLocal(){
        cc.sys.localStorage.setItem('game_mode', "local");
        cc.director.loadScene("role");
    }

    close(){
        this.illustration.active = false;
        this.Group.active = true;
    }

    open(){
        this.illustration.active = true;
        this.Group.active = false;
    }

    GoOnline(){
        cc.sys.localStorage.setItem('game_mode', "online");
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
                firebase.database().ref('/root/Home/player' + firebase.auth().currentUser.uid).remove().then(()=>{
                    cc.director.loadScene("lobby");
                })
            })
        })
    }
}