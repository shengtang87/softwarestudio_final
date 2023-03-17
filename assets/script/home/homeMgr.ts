const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnGroup: cc.Node = null;

    @property(cc.Node)
    Signup: cc.Node = null;

    @property(cc.Node)
    Login: cc.Node = null;
    
    GoHelp(){
        window.location.href = "https://khub.nthu.edu.tw/researcherProfile?uuid=C125F738-6939-4E92-A494-4894555367FC";
    }

    GoSignUp(){
        this.btnGroup.active = false;
        this.Signup.active = true;
    }

    GoLogIn(){
        this.btnGroup.active = false;
        this.Login.active = true;
    }

    SigntoLog(){
        this.Signup.active = false;
        this.Login.active = true;
    }

    LogtoSign(){
        this.Login.active = false;
        this.Signup.active = true;
    }

    closeSign(){
        this.Signup.active = false;
        this.btnGroup.active = true;
    }

    closeLog(){
        this.Login.active = false;
        this.btnGroup.active = true;
    }

    handleSignup(){
        var UserGmail = this.Signup.getChildByName('gmail').getChildByName('TEXT_LABEL').getComponent(cc.Label).string;
        var UserName = this.Signup.getChildByName('username').getChildByName('TEXT_LABEL').getComponent(cc.Label).string;
        var UserPassword = this.Signup.getChildByName('password').getChildByName('TEXT_LABEL').getComponent(cc.Label).string;
        //console.log(UserGmail, UserName, UserPassword);
        
        firebase
            .auth()
            .createUserWithEmailAndPassword(UserGmail, UserPassword)
            .then(()=>{
                firebase.database().ref('/root/Home/player' + firebase.auth().currentUser.uid).set({
                    uid:firebase.auth().currentUser.uid,
                    UserName:UserName,
                    Room:"home",
                    IsConfirm:"false",
                    roleName1:"",
                    roleName2:"",
                    CPU_num:1
                })
                cc.director.loadScene("mode");
            })
            .then(()=>{
                cc.director.loadScene("mode");
            })
            .catch((e)=>{
                window.alert(e.message)
            })
    }

    handleLogin(){
        var UserGmail = this.Login.getChildByName('gmail').getChildByName('TEXT_LABEL').getComponent(cc.Label).string;
        var UserPassword = this.Login.getChildByName('password').getChildByName('TEXT_LABEL').getComponent(cc.Label).string;
        console.log(UserGmail, UserPassword);
        
        firebase
            .auth()
            .signInWithEmailAndPassword(UserGmail, UserPassword)
            .then(()=>{
                cc.director.loadScene("mode");
            })
            .catch((e)=>{
                window.alert(e.message)
            })
    }

    // protected start(): void {}

}
