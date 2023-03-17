
const {ccclass, property} = cc._decorator;
@ccclass
export default class player_link extends cc.Component {

    @property(cc.AudioClip)//new
    pickupball_sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    throwball_sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    pickupmana_sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    hurt_sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    die_sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    catch_sound: cc.AudioClip = null;


    @property(cc.Node)
    private line: cc.Node = null;
    @property(cc.Prefab)
    private ballPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    private airwall:cc.Prefab = null;

    private speed: number = 200;
    private left_down: boolean = false;
    private right_down: boolean = false;
    private up_down: boolean = false;
    private down_down: boolean = false; 
    private anim = null;
    private animateState = null;
    private rb: cc.RigidBody = null;
    //private bodyrb: cc.RigidBody = null;
    private graphics: cc.Graphics = null;
    private lastKeyDown_LR: string = null;
    private lastKeyDown_UD: string = null;
    private balldir: number = 6;
    private catchCD:number = 1;
    private pretime:number;
    private curtime:number;
    private life:number = 3;
    private state: number = 0;// 0:noball 1:haveball 2:defend 3:throw 4:hurt 5:die 6:hold
    private holdtype: number = 0;//0:straight 1:curve 2:skill
    private mana = 0;
    //private lasttracktype:string = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        //cc.director.getPhysicsManager().debugDrawFlags = 1;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.rb = this.node.getComponent(cc.RigidBody);
        this.graphics = this.line.getComponent(cc.Graphics);

    }
    start () {
        this.anim = this.getComponent(cc.Animation);
        this.pretime = cc.director.getTotalTime()/1000;
        this.curtime = cc.director.getTotalTime()/1000;
    }
    update (dt) {
        this.playerMovement();
        this.playerAnimation();
        this.facedir();
        this.track();
    }
    onKeyDown(e){
        if(this.node.name == "player1" || this.node.name == "player3"){
            if(e.keyCode == cc.macro.KEY.a){
                this.left_down = true;
                this.lastKeyDown_LR = "left";
            }
            else if(e.keyCode == cc.macro.KEY.d){
                this.right_down = true;
                this.lastKeyDown_LR = "right";
            }
            else if(e.keyCode == cc.macro.KEY.w){
                this.up_down = true;
                this.lastKeyDown_UD = "up";
            }
            else if(e.keyCode == cc.macro.KEY.s){
                this.down_down = true;
                this.lastKeyDown_UD = "down";
            }
            else if(e.keyCode == cc.macro.KEY.j){
                if(this.state == 1 || this.state == 6){
                    this.holdtype = 0;
                    this.state = 6;         
                }
            }
            else if(e.keyCode == cc.macro.KEY.k){
                if(this.state == 1 || this.state == 6){
                    this.holdtype = 1;
                    this.state = 6;         
                }
            }
            else if(e.keyCode == cc.macro.KEY.l){
                this.curtime = cc.director.getTotalTime()/1000;
                if(this.state == 0 && this.curtime - this.pretime > this.catchCD){
                    cc.audioEngine.playEffect(this.catch_sound,false)//new
                
                    this.state = 2;
                    let block = cc.instantiate(this.airwall);
                    if(this.balldir == 0){
                        block.setPosition(this.node.width/2,0);
                    }
                    else if(this.balldir == 1){
                        block.setPosition(this.node.width/2,this.node.height/2);
                    }
                    else if(this.balldir == 2){
                        block.setPosition(0,this.node.height/2);
                    }
                    else if(this.balldir == 3){
                        block.setPosition(this.node.width/2,this.node.height/2);
                    }
                    else if(this.balldir == 4){
                        block.setPosition(this.node.width/2,0);
                    }
                    else if(this.balldir == 5){
                        block.setPosition(this.node.width/2,-this.node.height/2);
                    }
                    else if(this.balldir == 6){
                        block.setPosition(0,-this.node.height/2);
                    }
                    else if(this.balldir == 7){
                        block.setPosition(this.node.width/2,-this.node.height/2);
                    }
                    this.node.addChild(block);
                    /* console.log("x: " + block.x + "y: " + block.y); */

                    this.scheduleOnce(() => {
                        if(this.state == 2) this.state = 0;
                        block.destroy();
                        this.pretime = cc.director.getTotalTime()/1000;
                    }, 1);
                }
            }
            else if(e.keyCode == cc.macro.KEY.space){
                if(this.state == 1 || this.state == 6){
                    cc.audioEngine.playEffect(this.throwball_sound,false)//new
                    this.state = 3;
                    this.scheduleOnce(() => {if(this.state != 5) this.state = 1}, 0.7);
                }
            }
            else if(e.keyCode == cc.macro.KEY.m){
                if(this.state == 1 || this.state == 6){
                    if(this.mana < 3) return;
                    this.holdtype = 2;
                    this.state = 6;
                }
            }
        }
        else if(this.node.name == "player2" || this.node.name == "player4"){
            if(e.keyCode == cc.macro.KEY.left){
                this.left_down = true;
                this.lastKeyDown_LR = "left";
            }
            else if(e.keyCode == cc.macro.KEY.right){
                this.right_down = true;
                this.lastKeyDown_LR = "right";
            }
            else if(e.keyCode == cc.macro.KEY.up){
                this.up_down = true;
                this.lastKeyDown_UD = "up";
            }
            else if(e.keyCode == cc.macro.KEY.down){
                this.down_down = true;
                this.lastKeyDown_UD = "down";
            }
            else if(e.keyCode == cc.macro.KEY.num1){
                if(this.state == 1 || this.state == 6){
                    this.holdtype = 0;
                    this.state = 6;         
                }
            }
            else if(e.keyCode == cc.macro.KEY.num2){
                if(this.state == 1 || this.state == 6){
                    this.holdtype = 1;
                    this.state = 6;         
                }
            }
            else if(e.keyCode == cc.macro.KEY.num3){
                this.curtime = cc.director.getTotalTime()/1000;
                if(this.state == 0 && this.curtime - this.pretime > this.catchCD){
                    cc.audioEngine.playEffect(this.catch_sound,false)//new
                
                    this.state = 2;
                    let block = cc.instantiate(this.airwall);
                    if(this.balldir == 0){
                        block.setPosition(this.node.width/2,0);
                    }
                    else if(this.balldir == 1){
                        block.setPosition(this.node.width/2,this.node.height/2);
                    }
                    else if(this.balldir == 2){
                        block.setPosition(0,this.node.height/2);
                    }
                    else if(this.balldir == 3){
                        block.setPosition(this.node.width/2,this.node.height/2);
                    }
                    else if(this.balldir == 4){
                        block.setPosition(this.node.width/2,0);
                    }
                    else if(this.balldir == 5){
                        block.setPosition(this.node.width/2,-this.node.height/2);
                    }
                    else if(this.balldir == 6){
                        block.setPosition(0,-this.node.height/2);
                    }
                    else if(this.balldir == 7){
                        block.setPosition(this.node.width/2,-this.node.height/2);
                    }
                    this.node.addChild(block);
                    /* console.log("x: " + block.x + "y: " + block.y); */

                    this.scheduleOnce(() => {
                        if(this.state == 2) this.state = 0;
                        block.destroy();
                        this.pretime = cc.director.getTotalTime()/1000;
                    }, 1);
                }
            }
            else if(e.keyCode == cc.macro.KEY.num0){
                if(this.state == 1 || this.state == 6){
                    cc.audioEngine.playEffect(this.throwball_sound,false)//new
                    this.state = 3;
                    this.scheduleOnce(() => { if(this.state != 5) this.state = 1}, 0.7);
                }
            }
            else if(e.keyCode == cc.macro.KEY.numdel){
                if(this.state == 1 || this.state == 6){
                    if(this.mana < 3) return;
                    this.holdtype = 2;
                    this.state = 6;
                }
            }
        }
    }
    onKeyUp(e){
        if(this.node.name == "player1" || this.node.name == "player3"){
            if(e.keyCode == cc.macro.KEY.a){
                this.left_down = false;
            }
            else if(e.keyCode == cc.macro.KEY.d){
                this.right_down = false;
            }
            else if(e.keyCode == cc.macro.KEY.w){
                this.up_down = false;
            }
            else if(e.keyCode == cc.macro.KEY.s){
                this.down_down = false;
            }
            else if(e.keyCode == cc.macro.KEY.j){
                if(this.state == 6 && this.holdtype == 0){
                    cc.audioEngine.playEffect(this.throwball_sound,false)//new
                    var ball = cc.instantiate(this.ballPrefab);
                    if(this.balldir == 0){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y);
                    }
                    else if(this.balldir == 1){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 2){
                        ball.setPosition(this.node.x ,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 3){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 4){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y);
                    }
                    else if(this.balldir == 5){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 6){
                        ball.setPosition(this.node.x,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 7){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y - this.node.height/2 - 20);
                    }
                    cc.find("Canvas").addChild(ball);
                    ball.getComponent("ball").throw_straight(this.balldir);
                    this.state = 3;
                    this.scheduleOnce(() => {if(this.state != 5)  this.state = 0}, 0.7);
                }
            }
            else if(e.keyCode == cc.macro.KEY.k){
                if(this.state == 6 && this.holdtype == 1){
                    cc.audioEngine.playEffect(this.throwball_sound,false)//new
                    var ball = cc.instantiate(this.ballPrefab);
                    if(this.balldir == 0){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y);
                    }
                    else if(this.balldir == 1){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 2){
                        ball.setPosition(this.node.x ,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 3){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 4){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y);
                    }
                    else if(this.balldir == 5){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 6){
                        ball.setPosition(this.node.x,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 7){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y - this.node.height/2 - 20);
                    }
                    cc.find("Canvas").addChild(ball);
                    ball.getComponent("ball").throw_curve(this.balldir);
                    this.state = 3;
                    this.scheduleOnce(() => {if(this.state != 5)  this.state = 0}, 0.7);
                }
            }
            else if(e.keyCode == cc.macro.KEY.m){
                if(this.state == 6 && this.holdtype == 2){
                    if(this.mana < 3) return;                  
                    cc.audioEngine.playEffect(this.throwball_sound,false)//new  
                    var ball = cc.instantiate(this.ballPrefab);
                    if(this.balldir == 0){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y);
                    }
                    else if(this.balldir == 1){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 2){
                        ball.setPosition(this.node.x ,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 3){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 4){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y);
                    }
                    else if(this.balldir == 5){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 6){
                        ball.setPosition(this.node.x,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 7){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y - this.node.height/2 - 20);
                    }
                    cc.find("Canvas").addChild(ball);
                    ball.getComponent("ball").throw_rasengan(this.balldir);
                    this.mana -= 3;
                    if(this.node.name == "player1"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player1_mp_minus(3);
                    }
                    else if(this.node.name == "player3"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player3_mp_minus(3);
                    }
                    this.state = 3;
                    this.scheduleOnce(() => {if(this.state != 5)  this.state = 0}, 0.7);
                }
            }
        }
        else if(this.node.name == "player2" || this.node.name == "player4"){
            if(e.keyCode == cc.macro.KEY.left){
                this.left_down = false;
            }
            else if(e.keyCode == cc.macro.KEY.right){
                this.right_down = false;
            }
            else if(e.keyCode == cc.macro.KEY.up){
                this.up_down = false;
            }
            else if(e.keyCode == cc.macro.KEY.down){
                this.down_down = false;
            }
            else if(e.keyCode == cc.macro.KEY.num1){
                if(this.state == 6 && this.holdtype == 0){
                    cc.audioEngine.playEffect(this.throwball_sound,false)//new
                    var ball = cc.instantiate(this.ballPrefab);
                    if(this.balldir == 0){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y);
                    }
                    else if(this.balldir == 1){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 2){
                        ball.setPosition(this.node.x ,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 3){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 4){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y);
                    }
                    else if(this.balldir == 5){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 6){
                        ball.setPosition(this.node.x,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 7){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y - this.node.height/2 - 20);
                    }
                    cc.find("Canvas").addChild(ball);
                    ball.getComponent("ball").throw_straight(this.balldir);
                    this.state = 3;
                    this.scheduleOnce(() => {if(this.state != 5) this.state = 0}, 0.7);
                }
            }
            else if(e.keyCode == cc.macro.KEY.num2){
                if(this.state == 6 && this.holdtype == 1){
                    cc.audioEngine.playEffect(this.throwball_sound,false)//new
                    var ball = cc.instantiate(this.ballPrefab);
                    if(this.balldir == 0){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y);
                    }
                    else if(this.balldir == 1){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 2){
                        ball.setPosition(this.node.x ,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 3){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 4){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y);
                    }
                    else if(this.balldir == 5){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 6){
                        ball.setPosition(this.node.x,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 7){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y - this.node.height/2 - 20);
                    }
                    cc.find("Canvas").addChild(ball);
                    ball.getComponent("ball").throw_curve(this.balldir);
                    this.state = 3;
                    this.scheduleOnce(() => {if(this.state != 5) this.state = 0}, 0.7);
                }
            }
            else if(e.keyCode == cc.macro.KEY.numdel){
                if(this.state == 6 && this.holdtype == 2){
                    if(this.mana < 3) return;
                    cc.audioEngine.playEffect(this.throwball_sound,false)//new                    
                    var ball = cc.instantiate(this.ballPrefab);
                    if(this.balldir == 0){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y);
                    }
                    else if(this.balldir == 1){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 2){
                        ball.setPosition(this.node.x ,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 3){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y + this.node.height/2 + 20);
                    }
                    else if(this.balldir == 4){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y);
                    }
                    else if(this.balldir == 5){
                        ball.setPosition(this.node.x - this.node.width/2 - 20,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 6){
                        ball.setPosition(this.node.x,this.node.y - this.node.height/2 - 20);
                    }
                    else if(this.balldir == 7){
                        ball.setPosition(this.node.x + this.node.width/2 + 20,this.node.y - this.node.height/2 - 20);
                    }
                    cc.find("Canvas").addChild(ball);
                    ball.getComponent("ball").throw_rasengan(this.balldir);
                    this.mana-=3;
                    
                    if(this.node.name == "player2"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player2_mp_minus(3);
                    }
                    else if(this.node.name == "player4"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player4_mp_minus(3);
                    }
                    this.state = 3;
                    this.scheduleOnce(() => {if(this.state != 5)  this.state = 0}, 0.7);
                }
            }
        }
    }
    playerMovement(){
        this.rb.linearVelocity = cc.v2(0,0);
        //for left & right
        if(this.state == 0 || this.state == 1 || this.state == 6){
            if(this.left_down && this.right_down){
                if(this.lastKeyDown_LR == "left"){
                    this.rb.linearVelocity = cc.v2(this.speed*-1,this.rb.linearVelocity.y);
                }
                else if(this.lastKeyDown_LR == "right"){
                    this.rb.linearVelocity = cc.v2(this.speed,this.rb.linearVelocity.y);
                }
            }
            else if(this.left_down && !this.right_down){
                this.rb.linearVelocity = cc.v2(this.speed*-1,this.rb.linearVelocity.y);
            }
            else if(!this.left_down && this.right_down){
                this.rb.linearVelocity = cc.v2(this.speed,this.rb.linearVelocity.y);
            }
            //for up & down
            if(this.up_down && this.down_down){
                if(this.lastKeyDown_UD == "up"){
                    this.rb.linearVelocity = cc.v2(this.rb.linearVelocity.x,this.speed);
                }
                else if(this.lastKeyDown_UD == "down"){
                    this.rb.linearVelocity = cc.v2(this.rb.linearVelocity.x,this.speed * -1);
                }
            }
            else if(this.up_down && !this.down_down){
                this.rb.linearVelocity = cc.v2(this.rb.linearVelocity.x,this.speed);
            }
            else if(!this.up_down && this.down_down){
                this.rb.linearVelocity = cc.v2(this.rb.linearVelocity.x,this.speed * -1);
            }
        }
        /* this.body.x = 0;
        this.body.y = 0; */
    }
    playerAnimation(){
        //scaleX
        if(this.state == 0 || this.state == 1 || this.state == 6){
            if(this.left_down && this.right_down){
                if(this.lastKeyDown_LR == "left"){
                    this.node.scaleX = -1;
                    this.line.scaleX = -1;
                }
                else if(this.lastKeyDown_LR == "right"){
                    this.node.scaleX = 1;
                    this.line.scaleX = 1;
                }
            }
            else if(this.left_down && !this.right_down){
                this.node.scaleX = -1;
                this.line.scaleX = -1;
            }
            else if(!this.left_down && this.right_down){
                this.node.scaleX = 1;
                this.line.scaleX = 1;
            }
        }
        //animate
        if(this.state == 0){//noball
            if(this.rb.linearVelocity.x == 0 && this.rb.linearVelocity.y == 0){
                if(this.balldir == 2){
                    if(!this.animateState || this.animateState.name != 'idle_up'){
                        this.animateState = this.anim.play('idle_up');
                    }
                }
                else if(this.balldir == 6){
                    if(!this.animateState || this.animateState.name != 'idle_down'){
                        this.animateState = this.anim.play('idle_down');
                    }
                }
                else{
                    if(!this.animateState || this.animateState.name != 'idle_right'){
                        this.animateState = this.anim.play('idle_right');
                    }
                }
            }
            else{
                if(this.balldir == 2){
                    if(!this.animateState || this.animateState.name != 'move_up'){
                        this.animateState = this.anim.play('move_up');
                    }
                }
                else if(this.balldir == 6){
                    if(!this.animateState || this.animateState.name != 'move_down'){
                        this.animateState = this.anim.play('move_down');
                    }
                }
                else{
                    if(!this.animateState || this.animateState.name != 'move_right'){
                        this.animateState = this.anim.play('move_right');
                    }
                }
            }
        }
        else if(this.state == 1 || this.state == 6){//haveball
            if(this.rb.linearVelocity.x == 0 && this.rb.linearVelocity.y == 0){
                if(this.balldir == 2){
                    if(!this.animateState || this.animateState.name != 'idle_hold_up'){
                        this.animateState = this.anim.play('idle_hold_up');
                    }
                }
                else if(this.balldir == 6){
                    if(!this.animateState || this.animateState.name != 'idle_hold_down'){
                        this.animateState = this.anim.play('idle_hold_down');
                    }
                }
                else{
                    if(!this.animateState || this.animateState.name != 'idle_hold_right'){
                        this.animateState = this.anim.play('idle_hold_right');
                    }
                }
            }
            else{
                if(this.balldir == 2){
                    if(!this.animateState || this.animateState.name != 'hold_move_up'){
                        this.animateState = this.anim.play('hold_move_up');
                    }
                }
                else if(this.balldir == 6){
                    if(!this.animateState || this.animateState.name != 'hold_move_down'){
                        this.animateState = this.anim.play('hold_move_down');
                    }
                }
                else{
                    if(!this.animateState || this.animateState.name != 'hold_move_right'){
                        this.animateState = this.anim.play('hold_move_right');
                    }
                }
            }
        }
        else if(this.state == 2){//defend
            if(this.balldir == 2){
                if(!this.animateState || this.animateState.name != 'defend_up'){
                    this.animateState = this.anim.play('defend_up');
                }
            }
            else if(this.balldir == 6){
                if(!this.animateState || this.animateState.name != 'defend_down'){
                    this.animateState = this.anim.play('defend_down');
                }
            }
            else{
                if(!this.animateState || this.animateState.name != 'defend_right'){
                    this.animateState = this.anim.play('defend_right');
                }
            }
        }
        else if(this.state == 3){//throw
            if(this.balldir == 2){
                if(!this.animateState || this.animateState.name != 'throw_up'){
                    this.animateState = this.anim.play('throw_up');
                }
            }
            else if(this.balldir == 6){
                if(!this.animateState || this.animateState.name != 'throw_down'){
                    this.animateState = this.anim.play('throw_down');
                }
            }
            else{
                if(!this.animateState || this.animateState.name != 'throw_right'){
                    this.animateState = this.anim.play('throw_right');
                }
            }
        }
        else if(this.state == 4){//hurt
            if(this.balldir == 2){
                if(!this.animateState || this.animateState.name != 'hurt_up'){
                    this.animateState = this.anim.play('hurt_up');
                }
            }
            else if(this.balldir == 6){
                if(!this.animateState || this.animateState.name != 'hurt_down'){
                    this.animateState = this.anim.play('hurt_down');
                }
            }
            else{
                if(!this.animateState || this.animateState.name != 'hurt_right'){
                    this.animateState = this.anim.play('hurt_right');
                }
            }
        }
        else if(this.state == 5){//die
            if(!this.animateState || this.animateState.name != 'die'){
                this.animateState = this.anim.play('die');
            }
        }
    }
    facedir(){
        if(this.rb.linearVelocity.x < 0 && this.rb.linearVelocity.y == 0){
            this.balldir = 4;
        }
        else if(this.rb.linearVelocity.x > 0 && this.rb.linearVelocity.y == 0){
            this.balldir = 0;
        }
        else if(this.rb.linearVelocity.x == 0 && this.rb.linearVelocity.y < 0){
            this.balldir = 6;
        }
        else if(this.rb.linearVelocity.x == 0 && this.rb.linearVelocity.y > 0){
            this.balldir = 2;
        }
        else if(this.rb.linearVelocity.x < 0 && this.rb.linearVelocity.y < 0){
            this.balldir = 5;
        }
        else if(this.rb.linearVelocity.x < 0 && this.rb.linearVelocity.y > 0){
            this.balldir = 3;
        }
        else if(this.rb.linearVelocity.x > 0 && this.rb.linearVelocity.y < 0){
            this.balldir = 7;
        }
        else if(this.rb.linearVelocity.x > 0 && this.rb.linearVelocity.y > 0){
            this.balldir = 1;
        } 
    }
    track(){
        if(this.state == 6 && this.holdtype == 0){
            this.speed = 20;
            this.straightdir();
        }
        else if(this.state == 6 && this.holdtype == 2){
            this.speed = 20;
            this.straightdir();
        }
        else if(this.state == 6 && this.holdtype == 1){
            this.speed = 20;
            this.curvedir();
        }
        else{
            this.graphics.clear();
            this.speed = 150;
        }
    }
    straightdir(){
        this.graphics.clear();
        this.drawline(this.balldir); 
    }
    curvedir(){
        this.graphics.clear();
        this.drawcurve(this.balldir);
    }
    drawline(dir){
        var rad = 0.25 * dir * Math.PI;
        var x = 200 * Math.cos(rad);
        var y = 200 * Math.sin(rad);

        this.graphics.moveTo(0,0);
        
        this.graphics.lineTo(x, y);
        this.graphics.stroke();
    }
    drawcurve(dir){

        var rad = 0.25 * dir * Math.PI;
        var cx = 140 * Math.cos(rad) - (-250) * Math.sin(rad);
        var cy = 140 * Math.sin(rad) + (-250) * Math.cos(rad);
        var x = 280 * Math.cos(rad);
        var y = 280 * Math.sin(rad);

        this.graphics.moveTo(0, 0);

        this.graphics.quadraticCurveTo(cx, cy, x, y);
        this.graphics.stroke();
    }
    onBeginContact(contact,self,other){
        if(other.tag == 1){
            if(other.getComponent("ball").state == 0){
                if((this.state == 0 || this.state == 2)){
                    this.state = 1;                    
                    cc.audioEngine.playEffect(this.pickupball_sound,false)//new
                    other.node.destroy();
                }
            }
            else{
                if(this.life > 1 && this.state != 4){
                    cc.audioEngine.playEffect(this.hurt_sound,false);//new
                    if(this.node.name == "player1"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player1_hp_minus();
                    }
                    else if(this.node.name == "player2"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player2_hp_minus();
                    }
                    else if(this.node.name == "player3"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player3_hp_minus();
                    }
                    else if(this.node.name == "player4"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player4_hp_minus();
                    }
                    var prestate = this.state;
                    this.life -= 1;
                    this.state = 4;
                    this.scheduleOnce(() => {
                        if(prestate != 1 && prestate != 6) this.state = 0;
                        else this.state = 1;
                    }, 0.3)
                }
                else{
                    if(this.state == 4) return;
                    if(this.node.name == "player1"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player1_hp_minus();
                    }
                    else if(this.node.name == "player2"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player2_hp_minus();
                    }
                    else if(this.node.name == "player3"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player3_hp_minus();
                    }
                    else if(this.node.name == "player4"){
                        cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player4_hp_minus();
                    }
                    cc.audioEngine.playEffect(this.die_sound,false)//new
                    this.state = 5;
                    this.node.removeComponent(cc.PhysicsBoxCollider);
                    this.scheduleOnce(() => {
                        cc.sys.localStorage.setItem(this.node.name, "die");
                        this.node.destroy();
                    }, 0.9)
                }
            }
        }
        else if(other.tag == 7){
            if(this.life > 1 && this.state != 4){
                cc.audioEngine.playEffect(this.hurt_sound,false);//new
                if(this.node.name == "player1"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player1_hp_minus();
                }
                else if(this.node.name == "player2"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player2_hp_minus();
                }
                else if(this.node.name == "player3"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player3_hp_minus();
                }
                else if(this.node.name == "player4"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player4_hp_minus();
                }
                var prestate = this.state;
                this.life -= 1;
                this.state = 4;
                this.scheduleOnce(() => {
                    if(prestate != 1 && prestate != 6) this.state = 0;
                    else this.state = 1;
                }, 0.3)
            }
            else{
                if(this.state == 4) return;
                if(this.node.name == "player1"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player1_hp_minus();
                }
                else if(this.node.name == "player2"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player2_hp_minus();
                }
                else if(this.node.name == "player3"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player3_hp_minus();
                }
                else if(this.node.name == "player4"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player4_hp_minus();
                }
                cc.audioEngine.playEffect(this.die_sound,false)//new
                this.state = 5;
                this.node.removeComponent(cc.PhysicsBoxCollider);
                this.scheduleOnce(() => {
                    cc.sys.localStorage.setItem(this.node.name, "die");
                    this.node.destroy();
                }, 0.9)
            }
        }
        else if(other.tag == 30){
            cc.audioEngine.playEffect(this.pickupmana_sound,false)//new
            other.node.destroy();
            cc.find("GameMGR").getComponent("gameMGR").manas--;
            if(this.mana < 3){
                if(this.node.name == "player1"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player1_mp_add();
                }
                else if(this.node.name == "player2"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player2_mp_add();
                }
                else if(this.node.name == "player3"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player3_mp_add();
                }
                else if(this.node.name == "player4"){
                    cc.find("Canvas/UI/UIMgr").getComponent("UIMgr").player4_mp_add();
                }
                this.mana++;
            }
        }
    }
}
