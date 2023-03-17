const {ccclass, property} = cc._decorator;

@ccclass
export default class Ball_online extends cc.Component {
    
    // @property(cc.AudioClip)
    // felloff: cc.AudioClip = null;
    @property(cc.AudioClip)
    hitwall_sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    hit_sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    lasanwan_sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    longpow_sound: cc.AudioClip = null;

    @property(cc.Prefab)
    shock_prefab = null;
    @property(cc.Prefab)
    wave_prefab = null;
    @property(cc.Prefab)
    rasengan_prefab = null;
    @property(cc.SpriteFrame)
    damage_sprite = null;
    @property(cc.Prefab)
    damage_effect = null;
    @property(cc.Prefab)
    catch_effect = null;

    private rb: cc.RigidBody = null;

    state = 0; //0:onground, 1:straight, 2:spinning, 3:spark, 4:rasengan, 5:prerasengan, 6:prespark

    private idleFrame: cc.SpriteFrame = null;
    private anim = null;
    private animateState = null;
    private spark_anim = null;

    private speed_x: number = 350;
    private speed_y: number = -700;
    private speed_len: number = 500;
    
    private spin_speed: number = 40;
    private spin_dir: number = -1;
    private spin_cnt: number = 0;

    private dir = 0;

    private isdestroyed = 0;
    private set_done = false;
    isspark = false;
    israsengan = false;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 ();
        this.rb = this.node.getComponent(cc.RigidBody);
        firebase.database().ref("/root/game/ball").set({
            posX: this.node.x,
            posY: this.node.y
        }).then(()=>{
            this.set_done =true;
        })
        //this.speed_len = Math.sqrt(this.speed_x**2 + this.speed_y**2);
        //console.log(this.speed_len);
    }

    start () {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim = this.getComponent(cc.Animation);
        this.spark_anim = this.node.getChildByName('spark_sprite').getComponent(cc.Animation);
        this.node.getChildByName('spark_sprite').active = false;
        firebase.database().ref("/root/game/ball").on("value", (snapshot)=>{
            if(this.set_done && snapshot.val().posX && snapshot.val().posY){
                if(!this.node) return;
                this.node.x = snapshot.val().posX;
                this.node.y = snapshot.val().posY;
            }
        }
    }

    update (dt) {
        this.ballAnimation();
        firebase.database().ref("/root/game/ball").update({
            posX: this.node.x,
            posY: this.node.y
        }).then(()=>{
            this.set_done = true;
        });
    }

    onBeginContact(contact, self, other){
        /*this.unschedule(this.spin);*/

        if(other.tag == 50 && (this.rb.linearVelocity.x != 0 || this.rb.linearVelocity.y != 0)){
            contact.disabled = true;
            return;
        }

        if(other.tag == 2 && this.state != 5){//new
            cc.audioEngine.playEffect(this.hitwall_sound,false) 
        }

        if(other.tag == 4 && this.state != 3){
            this.state = 0;
            contact.disabled = true;
            this.catchEff();            
            cc.audioEngine.playEffect(this.hitwall_sound,false) 
            return;
        }
        
        if(other.tag == 3 && this.state != 0 && this.state != 4){
            this.damageEff();
            cc.audioEngine.playEffect(this.hit_sound,false)    
        }
        else if(other.tag == 3 && this.state == 0){
            this.init_brake();       
        }
        if(other.tag == 1 && this.state == 0){
            this.scheduleOnce(this.init_brake, 0.3);
        }

        if(this.state == 1){
            this.state = 0;
            
            this.init_brake();
            this.unschedule(this.burst);
            this.unschedule(this.boost);
        }
        else if(this.state == 5){
            if(other.tag == 3){
                this.state = 0;
                this.init_brake();
                this.unschedule(this.burst);
                this.unschedule(this.boost);
            }
            else if(other.tag == 2){
                this.state = 4;
                this.unschedule(this.burst);
                this.burst();
            }
        }
        else if(this.state == 3 && other.tag != 4){
            this.state = 0;
            var vx = this.rb.linearVelocity.x * 0.2;
            var vy = this.rb.linearVelocity.y * 0.2;
            this.rb.linearVelocity = cc.v2(vx, vy);

            this.unschedule(this.boost);
            this.init_brake();
            this.node.getChildByName('spark_sprite').active = false;
        }
        else if(this.state == 2){
            this.state = 0;
            
            this.unschedule(this.spin);
            this.spin_dir = -1;
            this.init_brake();
        }
        else if(this.state == 4){
            contact.disabled = true;
        }
        if(other.tag != 4){
            var direction = contact.getWorldManifold().normal;

            if(direction.x >= 0.999 || direction.x <= -0.999){
                this.rb.linearVelocity = cc.v2(-1 * this.rb.linearVelocity.x, this.rb.linearVelocity.y);
            }
            if(direction.y >= 0.999 || direction.y <= -0.999){
                this.rb.linearVelocity = cc.v2(this.rb.linearVelocity.x, -1 * this.rb.linearVelocity.y);
            }
        }

        if(this.state == 6){
            if(direction.x >= 0.999 || direction.x <= -0.999){
                if(this.dir >= 0 && this.dir <= 4){
                    this.dir = 4 - this.dir;
                }     
                else if(this.dir == 5) this.dir = 7;
                else if(this.dir == 6) this.dir = 6;
                else if(this.dir == 7) this.dir = 5;
            }
            else if(direction.y >= 0.999 || direction.y <= -0.999){
                if(this.dir == 0) this.dir = 0;
                else this.dir = 8 - this.dir;
            }
            else{
                this.state = 0;
                this.init_brake();
                this.unschedule(this.burst);
                this.unschedule(this.boost);
            }
        }
    }
    onPreSolve(contact, self, other){
        if(other.tag == 50){
            contact.disabled = true;
            if(this.rb.linearVelocity.x == 0 && this.rb.linearVelocity.y == 0 && !this.isdestroyed){
                this.isdestroyed = 1; 
                cc.find('GameMGR').getComponent('gameMGR').online_balls -= 1;
                this.node.destroy();
            }
            return;
        }
    }

    ballAnimation(){
        if(this.state == 0){
            this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
            this.spark_anim.stop();
        }
        else if(this.state == 1 || this.state == 2 || this.state == 5 || this.state == 6){
            this.getComponent(cc.Sprite).spriteFrame = this.damage_sprite;
            this.spark_anim.stop();
        }
        else if(this.state == 3){
            this.getComponent(cc.Sprite).spriteFrame = null;
            if(this.animateState == null || this.animateState.name != 'spark')
                this.animateState = this.spark_anim.play('spark');
        }
        else if(this.state == 4){
            this.getComponent(cc.Sprite).spriteFrame = null;
        }
    }

    init_brake(){
        this.schedule(this.brake, 0.1);
    }
    brake(){
        var vx = this.rb.linearVelocity.x, vy = this.rb.linearVelocity.y;

        if(Math.abs(vx) <= 100 && Math.abs(vy) <= 100){
            this.rb.linearVelocity = cc.v2();
            this.unschedule(this.brake);
            this.rb.angularVelocity = 0;

            this.state = 0;
            this.isspark = false;

            return;
        }
        else if(Math.abs(vx) <= 200 && Math.abs(vy) <= 200){
            this.state = 0;
        }

        this.rb.linearVelocity = cc.v2(vx * 0.5, vy * 0.5);
    }

    throw_straight(dir: number){
        this.state = 1;

        var rad = 0.25 * dir * Math.PI;
        var vx = this.speed_len * Math.cos(rad);
        var vy = this.speed_len * Math.sin(rad);
        
        this.rb.linearVelocity = cc.v2(vx, vy);

        this.rb.angularVelocity = 500;
        this.scheduleOnce(this.init_brake, 0.5);
    }

    throw_curve(dir: number){
        this.state = 2;

        var rad = 0.25 * dir * Math.PI;
        var vx = this.speed_x * Math.cos(rad) - this.speed_y * Math.sin(rad);
        var vy = this.speed_x * Math.sin(rad) + this.speed_y * Math.cos(rad);

        this.rb.linearVelocity = cc.v2(vx, vy);

        this.rb.angularVelocity = -2000;
        this.spin_dir = dir;
        this.spin_cnt = 0;
        
        this.schedule(this.spin, 0);
    }
    spin(){
        if(this.spin_cnt == 35 && this.state == 2){
            this.spin_dir = -1;
            this.state = 1;

            this.unschedule(this.spin);
            this.init_brake();
            return;
        }

        var rad = 0.25 * this.spin_dir * Math.PI;
        var vx = -this.spin_speed * Math.sin(rad);
        var vy = this.spin_speed * Math.cos(rad);

        this.rb.linearVelocity = cc.v2(this.rb.linearVelocity.x + vx, this.rb.linearVelocity.y + vy)

        this.spin_cnt ++;
    }

    throw_hidden(dir: number){
        this.state = 1;

        var rad = 0.25 * dir * Math.PI;
        var vx = this.speed_len * Math.cos(rad);
        var vy = this.speed_len * Math.sin(rad);

        this.rb.linearVelocity = cc.v2(vx, vy);

        this.rb.angularVelocity = 500;
        this.scheduleOnce(this.hide, 0.15);
        this.scheduleOnce(this.init_brake, 0.5);
    }

    hide(){
        this.node.opacity = 0;
        this.scheduleOnce(this.appear, 0.3);
        
        var shock = cc.instantiate(this.shock_prefab);
        shock.x = this.node.x;
        shock.y = this.node.y;
        let state = shock.getComponent(cc.Animation).play();
        state.wrapMode = cc.WrapMode.Reverse;
        cc.find('Canvas').addChild(shock);
        this.scheduleOnce(()=>{shock.destroy();}, 0.3);
    }
    appear(){
        this.node.opacity = 255;

        var shock = cc.instantiate(this.shock_prefab);
        shock.x = this.node.x;
        shock.y = this.node.y;
        shock.scaleX *= -1;
        shock.scaleY *= -1;
        cc.find('Canvas').addChild(shock);
        this.scheduleOnce(()=>{shock.destroy();}, 0.3);
    }

    throw_spark(dir: number){
        this.state = 6;

        this.dir = dir;

        var rad = 0.25 * dir * Math.PI;
        var vx = 0.4 * this.speed_len * Math.cos(rad);
        var vy = 0.4 * this.speed_len * Math.sin(rad);
        
        this.rb.linearVelocity = cc.v2(vx, vy);

        this.node.rotation = -180 * dir * 0.25;
        this.rb.angularVelocity = 0;
        this.scheduleOnce(this.boost, 0.3);
    }
    boost(){
        cc.audioEngine.playEffect(this.longpow_sound,false)//new
        this.state = 3;        
        var wave = cc.instantiate(this.wave_prefab);
        wave.x = this.node.x;
        wave.y = this.node.y;
        cc.find('Canvas').addChild(wave);
        this.node.rotation = wave.rotation = -180 * this.dir * 0.25;
        this.scheduleOnce(()=>{wave.destroy();}, 0.35);

        this.node.getChildByName('spark_sprite').active = true;

        var vx = this.rb.linearVelocity.x * 4;
        var vy = this.rb.linearVelocity.y * 4;
        this.rb.linearVelocity = cc.v2(vx, vy);
    }

    throw_rasengan(dir: number){
        this.state = 5;

        this.dir = dir;

        var rad = 0.25 * dir * Math.PI;
        var vx = this.speed_len * Math.cos(rad);
        var vy = this.speed_len * Math.sin(rad);
        
        this.rb.linearVelocity = cc.v2(vx, vy);

        this.scheduleOnce(this.burst, 0.5);
    }
    burst(){
        cc.audioEngine.playEffect(this.lasanwan_sound,false)//new
        this.state = 4;
        this.israsengan = true;

        this.rb.linearVelocity = cc.v2();

        var rasengan = cc.instantiate(this.rasengan_prefab);
        rasengan.x = this.node.x;
        rasengan.y = this.node.y;
        rasengan.zIndex = 80;
        cc.find('Canvas').addChild(rasengan);
        this.scheduleOnce(()=>{
            this.state = 0;
            this.israsengan = false;

            this.rb.angularVelocity = 3000;
        }, 2);
    }

    damageEff(){
        var effect = cc.instantiate(this.damage_effect);
        effect.setPosition(this.node.x, this.node.y);
        cc.find('Canvas').addChild(effect);
    }  
    catchEff(){
        var effect = cc.instantiate(this.catch_effect);
        effect.setPosition(this.node.x, this.node.y);
        cc.find('Canvas').addChild(effect);
    }
}