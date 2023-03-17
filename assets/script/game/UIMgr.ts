const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    hp: number = 3;
    @property
    mp: number = 3;

    @property(cc.Node)
    player1_hp:cc.Node = null;
    @property(cc.Node)
    player1_mp:cc.Node = null;
    @property
    hp1: number = 3;
    @property
    mp1: number = 0;

    @property(cc.Node)
    player2_hp:cc.Node = null;
    @property(cc.Node)
    player2_mp:cc.Node = null;
    @property
    hp2: number = 3;
    @property
    mp2: number = 0;

    @property(cc.Node)
    player3_hp:cc.Node = null;
    @property(cc.Node)
    player3_mp:cc.Node = null;
    @property
    hp3: number = 3;
    @property
    mp3: number = 0;


    @property(cc.Node)
    player4_hp:cc.Node = null;
    @property(cc.Node)
    player4_mp:cc.Node = null;
    @property
    hp4: number = 3;
    @property
    mp4: number = 0;

    @property(cc.Node)
    Group1:cc.Node = null;
    @property(cc.Node)
    Group2:cc.Node = null;

    private big_mode;
    private small_mode;

    player1_hp_minus(){
        this.hp1 -= 1;
        this.player1_hp.scaleX = 1 * (this.hp1/this.hp);
    }
    player1_mp_add(){
        this.mp1 += 1;
        this.player1_mp.scaleX = 1 * (this.mp1/this.mp);
    }
    player1_mp_minus(num){
        this.mp1 -= num;
        this.player1_mp.scaleX = 1 * (this.mp1/this.mp);
    }

    player2_hp_minus(){
        this.hp2 -= 1;
        this.player2_hp.scaleX = 1 * (this.hp2/this.hp);
    }
    player2_mp_add(){
        this.mp2 += 1;
        this.player2_mp.scaleX = 1 * (this.mp2/this.mp);
    }
    player2_mp_minus(num){
        this.mp2 -= num;
        this.player2_mp.scaleX = 1 * (this.mp2/this.mp);
    }
    
    player3_hp_minus(){
        this.hp3 -= 1;
        this.player3_hp.scaleX = 1 * (this.hp3/this.hp);
    }
    player3_mp_add(){
        this.mp3 += 1;
        this.player3_mp.scaleX = 1 * (this.mp3/this.mp);
    }
    player3_mp_minus(num){
        this.mp3 -= num;
        this.player3_mp.scaleX = 1 * (this.mp3/this.mp);
    }

    player4_hp_minus(){
        this.hp4 -= 1;
        this.player4_hp.scaleX = 1 * (this.hp4/this.hp);
    }
    player4_mp_add(){
        this.mp4 += 1;
        this.player4_mp.scaleX = 1 * (this.mp4/this.mp);
    }
    player4_mp_minus(num){
        this.mp4 -= num;
        this.player4_mp.scaleX = 1 * (this.mp4/this.mp);
    }

    protected onLoad(): void {
        this.big_mode = cc.sys.localStorage.getItem("game_mode");   // online or local
        this.small_mode = cc.sys.localStorage.getItem("mode");      // 1 or 2
        if(this.big_mode == 'online' && this.small_mode == '2'){
            this.Group1.active = true;
            this.Group2.active = true;
        } else {
            this.Group1.active = true;
            this.Group2.active = false;
        }
    }
}
