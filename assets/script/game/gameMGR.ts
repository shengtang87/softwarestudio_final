// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameMGR extends cc.Component {
    @property(cc.Prefab)
    private zelda:cc.Prefab = null;
    @property(cc.Prefab)
    private shadow_link:cc.Prefab = null;
    @property(cc.Prefab)
    private cadence:cc.Prefab = null;
    @property(cc.Prefab)
    private link:cc.Prefab = null;
    @property(cc.Prefab)
    private ball_prefab:cc.Prefab = null;
    @property(cc.Prefab)
    private mana_prefab:cc.Prefab = null;

    private player1role;
    private player2role;
    private player3role;
    private player4role;
    private big_mode;
    private small_mode;
    private isload = false;
    private map;
    balls = 2;
    online_balls = 1;
    manas = 1;
    ball_index = 0;
    mana_index = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.find("Canvas/map_pup").zIndex = 0;
        cc.find("Canvas/map_pdown").zIndex = 20;
        cc.director.getPhysicsManager().enabled = true;
        this.player1role = JSON.parse(cc.sys.localStorage.getItem('playerInfo_1'));
        this.player2role = JSON.parse(cc.sys.localStorage.getItem('playerInfo_2'));
        this.player3role = JSON.parse(cc.sys.localStorage.getItem('playerInfo_3'));
        this.player4role = JSON.parse(cc.sys.localStorage.getItem('playerInfo_4'));
        this.map = JSON.parse(cc.sys.localStorage.getItem('map'));
        this.big_mode = cc.sys.localStorage.getItem('game_mode');
        this.small_mode = cc.sys.localStorage.getItem('mode');
    }

    start () {
        if(this.big_mode == "local"){
            cc.sys.localStorage.setItem('player1', "alive");
            cc.sys.localStorage.setItem('player2', "alive");
            if(this.player1role.name == "Zelda"){
                var zelda = cc.instantiate(this.zelda);
                zelda.name = "player1";
                if(this.map == "sky"){
                    zelda.setPosition(-475,10);
                }
                else if(this.map == 'super_dodge_ball'){
                    zelda.setPosition(-175, -50);
                }
                else{
                    zelda.setPosition(-400,-35);
                }
                zelda.zIndex = 1;
                cc.find("Canvas").addChild(zelda);
                
            }
            else if(this.player1role.name == "Shadow Link"){
                var shadow_link = cc.instantiate(this.shadow_link);
                shadow_link.name = "player1";
                if(this.map == "sky"){
                    shadow_link.setPosition(-475,10);
                }
                else if(this.map == 'super_dodge_ball'){
                    shadow_link.setPosition(-175, -50);
                }
                else{
                    shadow_link.setPosition(-400,-35);
                }
                shadow_link.zIndex = 1;
                cc.find("Canvas").addChild(shadow_link);
            }
            else if(this.player1role.name == "Cadence"){
                var cadence = cc.instantiate(this.cadence);
                cadence.name = "player1";
                if(this.map == "sky"){
                    cadence.setPosition(-475,10);
                }
                else if(this.map == 'super_dodge_ball'){
                    cadence.setPosition(-175, -50);
                }
                else{
                    cadence.setPosition(-400,-35);
                }
                cadence.zIndex = 1;
                cc.find("Canvas").addChild(cadence);
            }
            else if(this.player1role.name == "Link"){
                var link = cc.instantiate(this.link);
                link.name = "player1";
                if(this.map == "sky"){
                    link.setPosition(-475,10);
                }
                else if(this.map == 'super_dodge_ball'){
                    link.setPosition(-175, -50);
                }
                else{
                    link.setPosition(-400,-35);
                }
                link.zIndex = 1;
                cc.find("Canvas").addChild(link);
                console.log("TEST");
            }
    
    
            if(this.player2role.name == "Zelda"){
                var zelda = cc.instantiate(this.zelda);
                zelda.name = "player2";
                if(this.map == "sky"){
                    zelda.setPosition(500,10);
                }
                else if(this.map == 'super_dodge_ball'){
                    zelda.setPosition(175, -50);
                }
                else{
                    zelda.setPosition(400,-35);
                }
                zelda.zIndex = 1;
                cc.find("Canvas").addChild(zelda);
            }
            else if(this.player2role.name == "Shadow Link"){
                var shadow_link = cc.instantiate(this.shadow_link);
                shadow_link.name = "player2";
                if(this.map == "sky"){
                    shadow_link.setPosition(500,10);
                }
                else if(this.map == 'super_dodge_ball'){
                    shadow_link.setPosition(175, -50);
                }
                else{
                    shadow_link.setPosition(400,-35);
                }
                shadow_link.zIndex = 1;
                cc.find("Canvas").addChild(shadow_link);
            }
            else if(this.player2role.name == "Cadence"){
                var cadence = cc.instantiate(this.cadence);
                cadence.name = "player2";
                if(this.map == "sky"){
                    cadence.setPosition(500,10);
                }
                else if(this.map == 'super_dodge_ball'){
                    cadence.setPosition(175, -50);
                }
                else{
                    cadence.setPosition(400,-35);
                }
                cadence.zIndex = 1;
                cc.find("Canvas").addChild(cadence);
            }
            else if(this.player2role.name == "Link"){
                var link = cc.instantiate(this.link);
                link.name = "player2";
                if(this.map == "sky"){
                    link.setPosition(500,10);
                }
                else if(this.map == 'super_dodge_ball'){
                    link.setPosition(175, -50);
                }
                else{
                    link.setPosition(400,-35);
                }
                link.zIndex = 1;
                cc.find("Canvas").addChild(link);
            }
        }
        else if(this.big_mode == "online"){
            if(this.small_mode == "1"){
                cc.sys.localStorage.setItem('player1', "alive");
                cc.sys.localStorage.setItem('player3', "alive");
                if(this.player1role.name == "Zelda"){
                    var zelda = cc.instantiate(this.zelda);
                    zelda.name = "player1";
                    if(this.map == "sky"){
                        zelda.setPosition(-475,10);
                    }
                    else{
                        zelda.setPosition(-400,-35);
                    }
                    zelda.zIndex = 1;
                    cc.find("Canvas").addChild(zelda);
                }
                else if(this.player1role.name == "Shadow Link"){
                    var shadow_link = cc.instantiate(this.shadow_link);
                    shadow_link.name = "player1";
                    if(this.map == "sky"){
                        shadow_link.setPosition(-475,10);
                    }
                    else{
                        shadow_link.setPosition(-400,-35);
                    }
                    shadow_link.zIndex = 1;
                    cc.find("Canvas").addChild(shadow_link);
                }
                else if(this.player1role.name == "Cadence"){
                    var cadence = cc.instantiate(this.cadence);
                    cadence.name = "player1";
                    if(this.map == "sky"){
                        cadence.setPosition(-475,10);
                    }
                    else{
                        cadence.setPosition(-400,-35);
                    }
                    cadence.zIndex = 1;
                    cc.find("Canvas").addChild(cadence);
                }
                else if(this.player1role.name == "Link"){
                    var link = cc.instantiate(this.link);
                    link.name = "player1";
                    if(this.map == "sky"){
                        link.setPosition(-475,10);
                    }
                    else{
                        link.setPosition(-400,-35);
                    }
                    link.zIndex = 1;
                    cc.find("Canvas").addChild(link);
                }
                
                if(this.player3role.name == "Zelda"){
                    var zelda = cc.instantiate(this.zelda);
                    zelda.name = "player3";
                    if(this.map == "sky"){
                        zelda.setPosition(500,10);
                    }
                    else{
                        zelda.setPosition(400,-35);
                    }
                    zelda.zIndex = 1;
                    cc.find("Canvas").addChild(zelda);
                }
                else if(this.player3role.name == "Shadow Link"){
                    var shadow_link = cc.instantiate(this.shadow_link);
                    shadow_link.name = "player3";
                    if(this.map == "sky"){
                        shadow_link.setPosition(500,10);
                    }
                    else{
                        shadow_link.setPosition(400,-35);
                    }
                    shadow_link.zIndex = 1;
                    cc.find("Canvas").addChild(shadow_link);
                }
                else if(this.player3role.name == "Cadence"){
                    var cadence = cc.instantiate(this.cadence);
                    cadence.name = "player3";
                    if(this.map == "sky"){
                        cadence.setPosition(500,10);
                    }
                    else{
                        cadence.setPosition(400,-35);
                    }
                    cadence.zIndex = 1;
                    cc.find("Canvas").addChild(cadence);
                }
                else if(this.player3role.name == "Link"){
                    var link = cc.instantiate(this.link);
                    link.name = "player3";
                    if(this.map == "sky"){
                        link.setPosition(500,10);
                    }
                    else{
                        link.setPosition(400,-35);
                    }
                    link.zIndex = 1;
                    cc.find("Canvas").addChild(link);
                }
            }
            else if(this.small_mode == "2"){
                cc.sys.localStorage.setItem('player1', "alive");
                cc.sys.localStorage.setItem('player2', "alive");
                cc.sys.localStorage.setItem('player3', "alive");
                cc.sys.localStorage.setItem('player4', "alive");
                if(this.player1role.name == "Zelda"){
                    var zelda = cc.instantiate(this.zelda);
                    zelda.name = "player1";
                    if(this.map == "sky"){
                        zelda.setPosition(-475,40);
                    }
                    else{
                        zelda.setPosition(-400,-5);
                    }
                    zelda.zIndex = 1;
                    cc.find("Canvas").addChild(zelda);
                }
                else if(this.player1role.name == "Shadow Link"){
                    var shadow_link = cc.instantiate(this.shadow_link);
                    shadow_link.name = "player1";
                    if(this.map == "sky"){
                        shadow_link.setPosition(-475,40);
                    }
                    else{
                        shadow_link.setPosition(-400,-5);
                    }
                    shadow_link.zIndex = 1;
                    cc.find("Canvas").addChild(shadow_link);
                }
                else if(this.player1role.name == "Cadence"){
                    var cadence = cc.instantiate(this.cadence);
                    cadence.name = "player1";
                    if(this.map == "sky"){
                        cadence.setPosition(-475,40);
                    }
                    else{
                        cadence.setPosition(-400,-5);
                    }
                    cadence.zIndex = 1;
                    cc.find("Canvas").addChild(cadence);
                }
                else if(this.player1role.name == "Link"){
                    var link = cc.instantiate(this.link);
                    link.name = "player1";
                    if(this.map == "sky"){
                        link.setPosition(-475,40);
                    }
                    else{
                        link.setPosition(-400,-5);
                    }
                    link.zIndex = 1;
                    cc.find("Canvas").addChild(link);
                }
        
        
                if(this.player2role.name == "Zelda"){
                    var zelda = cc.instantiate(this.zelda);
                    zelda.name = "player2";
                    if(this.map == "sky"){
                        zelda.setPosition(-475,-20);
                    }
                    else{
                        zelda.setPosition(-400,-65);
                    }
                    zelda.zIndex = 1;
                    cc.find("Canvas").addChild(zelda);
                }
                else if(this.player2role.name == "Shadow Link"){
                    var shadow_link = cc.instantiate(this.shadow_link);
                    shadow_link.name = "player2";
                    if(this.map == "sky"){
                        shadow_link.setPosition(-475,-20);
                    }
                    else{
                        shadow_link.setPosition(-400,-65);
                    }
                    shadow_link.zIndex = 1;
                    cc.find("Canvas").addChild(shadow_link);
                }
                else if(this.player2role.name == "Cadence"){
                    var cadence = cc.instantiate(this.cadence);
                    cadence.name = "player2";
                    if(this.map == "sky"){
                        cadence.setPosition(-475,-20);
                    }
                    else{
                        cadence.setPosition(-400,-65);
                    }
                    cadence.zIndex = 1;
                    cc.find("Canvas").addChild(cadence);
                }
                else if(this.player2role.name == "Link"){
                    var link = cc.instantiate(this.link);
                    link.name = "player2";
                    if(this.map == "sky"){
                        link.setPosition(-475,-20);
                    }
                    else{
                        link.setPosition(-400,-65);
                    }
                    link.zIndex = 1;
                    cc.find("Canvas").addChild(link);
                }
        
                if(this.player3role.name == "Zelda"){
                    var zelda = cc.instantiate(this.zelda);
                    zelda.name = "player3";
                    if(this.map == "sky"){
                        zelda.setPosition(500,40);
                    }
                    else{
                        zelda.setPosition(400,-5);
                    }
                    zelda.zIndex = 1;
                    cc.find("Canvas").addChild(zelda);
                }
                else if(this.player3role.name == "Shadow Link"){
                    var shadow_link = cc.instantiate(this.shadow_link);
                    shadow_link.name = "player3";
                    if(this.map == "sky"){
                        shadow_link.setPosition(500,40);
                    }
                    else{
                        shadow_link.setPosition(400,-5);
                    }
                    shadow_link.zIndex = 1;
                    cc.find("Canvas").addChild(shadow_link);
                }
                else if(this.player3role.name == "Cadence"){
                    var cadence = cc.instantiate(this.cadence);
                    cadence.name = "player3";
                    if(this.map == "sky"){
                        cadence.setPosition(500,40);
                    }
                    else{
                        cadence.setPosition(400,-5);
                    }
                    cadence.zIndex = 1;
                    cc.find("Canvas").addChild(cadence);
                }
                else if(this.player3role.name == "Link"){
                    var link = cc.instantiate(this.link);
                    link.name = "player3";
                    if(this.map == "sky"){
                        link.setPosition(500,40);
                    }
                    else{
                        link.setPosition(400,-5);
                    }
                    link.zIndex = 1;
                    cc.find("Canvas").addChild(link);
                }
        
                if(this.player4role.name == "Zelda"){
                    var zelda = cc.instantiate(this.zelda);
                    zelda.name = "player4";
                    if(this.map == "sky"){
                        zelda.setPosition(500,-20);
                    }
                    else{
                        zelda.setPosition(400,-65);
                    }
                    zelda.zIndex = 1;
                    cc.find("Canvas").addChild(zelda);
                }
                else if(this.player4role.name == "Shadow Link"){
                    var shadow_link = cc.instantiate(this.shadow_link);
                    shadow_link.name = "player4";
                    if(this.map == "sky"){
                        shadow_link.setPosition(500,-20);
                    }
                    else{
                        shadow_link.setPosition(400,-65);
                    }
                    shadow_link.zIndex = 1;
                    cc.find("Canvas").addChild(shadow_link);
                }
                else if(this.player4role.name == "Cadence"){
                    var cadence = cc.instantiate(this.cadence);
                    cadence.name = "player4";
                    if(this.map == "sky"){
                        cadence.setPosition(500,-20);
                    }
                    else{
                        cadence.setPosition(400,-65);
                    }
                    cadence.zIndex = 1;
                    cc.find("Canvas").addChild(cadence);
                }
                else if(this.player4role.name == "Link"){
                    var link = cc.instantiate(this.link);
                    link.name = "player4";
                    if(this.map == "sky"){
                        link.setPosition(500,-20);
                    }
                    else{
                        link.setPosition(400,-65);
                    }
                    link.zIndex = 1;
                    cc.find("Canvas").addChild(link);
                }
            }
        }
    }

    update (dt) {
        if(this.big_mode == "local" && !this.isload){
            if(cc.sys.localStorage.getItem("player1") == "die"){
                cc.sys.localStorage.setItem('winner', this.player2role.name);
                cc.sys.localStorage.setItem('loser', this.player1role.name);
                this.isload = true;
                cc.director.loadScene("finish");
            }
            else if(cc.sys.localStorage.getItem("player2") == "die"){
                cc.sys.localStorage.setItem('winner', this.player1role.name);
                cc.sys.localStorage.setItem('loser', this.player2role.name);
                this.isload = true;
                cc.director.loadScene("finish");
            }
        }
        else if(this.big_mode == "online" && !this.isload){
            if(this.small_mode == 1){
                if(cc.sys.localStorage.getItem("player1") == "die"){
                    cc.sys.localStorage.setItem('winner', this.player3role.name);
                    cc.sys.localStorage.setItem('loser', this.player1role.name);
                    this.isload = true;
                    cc.director.loadScene("finish");
                }
                else if(cc.sys.localStorage.getItem("player3") == "die"){
                    cc.sys.localStorage.setItem('winner', this.player1role.name);
                    cc.sys.localStorage.setItem('loser', this.player3role.name);
                    this.isload = true;
                    cc.director.loadScene("finish");
                }
            }
            else if(this.small_mode == 2){
                if(cc.sys.localStorage.getItem("player1") == "die" && cc.sys.localStorage.getItem("player2") == "die" && cc.sys.localStorage.getItem("player3") == "die"){
                    cc.sys.localStorage.setItem('winner', this.player4role.name);
                    cc.sys.localStorage.setItem('loser', this.player1role.name);
                    this.isload = true;
                    cc.director.loadScene("finish");
                }
                else if(cc.sys.localStorage.getItem("player1") == "die" && cc.sys.localStorage.getItem("player2") == "die" && cc.sys.localStorage.getItem("player4") == "die"){
                    cc.sys.localStorage.setItem('winner', this.player3role.name);
                    cc.sys.localStorage.setItem('loser', this.player1role.name);
                    this.isload = true;
                    cc.director.loadScene("finish");
                }
                else if(cc.sys.localStorage.getItem("player1") == "die" && cc.sys.localStorage.getItem("player4") == "die" && cc.sys.localStorage.getItem("player3") == "die"){
                    cc.sys.localStorage.setItem('winner', this.player2role.name);
                    cc.sys.localStorage.setItem('loser', this.player1role.name);
                    this.isload = true;
                    cc.director.loadScene("finish");
                }
                else if(cc.sys.localStorage.getItem("player4") == "die" && cc.sys.localStorage.getItem("player2") == "die" && cc.sys.localStorage.getItem("player3") == "die"){
                    cc.sys.localStorage.setItem('winner', this.player1role.name);
                    cc.sys.localStorage.setItem('loser', this.player2role.name);
                    this.isload = true;
                    cc.director.loadScene("finish");
                }
            }
        }
        //console.log(this.balls);
        if(this.big_mode == "online"){
            if(this.online_balls < 1){
                this.online_balls++;
                this.rebornball();
            }
        }
        else{
            if(this.balls < 2){
                this.balls++;
                this.rebornball();
            }
        }
        if(this.manas < 1){
            this.manas++;
            this.scheduleOnce(this.rebornmana,2);
        }
    }
    rebornmana(){
        var m = cc.instantiate(this.mana_prefab);
        if(this.map == 'grassland')
            var pos = [cc.v2(-148, 76), cc.v2(350, 43), cc.v2(178, -228)];
        else if(this.map == 'volcano')
            var pos = [cc.v2(-30, 60), cc.v2(392, -258), cc.v2(320, 255)];
        else if(this.map == 'sky')
            var pos = [cc.v2(0,10),cc.v2(-475,10),cc.v2(500,10)];
        var ramdom = Math.floor(Math.random()*3);
        if(this.big_mode == "online"){
            m.setPosition(pos[this.mana_index]);
            if(this.mana_index == 0) this.mana_index =1;
            else if(this.mana_index == 1) this.mana_index = 2;
            else this.mana_index = 0;
        }
        else if(this.big_mode == "local"){
            m.setPosition(pos[ramdom]);
        }
        cc.find('Canvas').addChild(m);
    }
    rebornball(){
        var b = cc.instantiate(this.ball_prefab);
        if(this.map == 'grassland')
            var pos = [cc.v2(-448, -107), cc.v2(198, 89)];
        else if(this.map == 'volcano')
            var pos = [cc.v2(-279, 104), cc.v2(460, 96)];
        else if(this.map == 'sky')
            var pos = [cc.v2(0,265),cc.v2(0,-240)];
        else if(this.map == 'super_dodge_ball')
            var pos = [cc.v2(-30,-50),cc.v2(30,-50)];
        var ramdom = Math.floor(Math.random()*2);
        b.setPosition(pos[this.ball_index]);
        if(this.ball_index == 0) this.ball_index =1;
        else this.ball_index = 0;
        console.log(this.ball_index);
        cc.find('Canvas').addChild(b);
    }
}
