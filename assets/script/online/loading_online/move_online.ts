const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    
    @property
    p1_name:string = "";

    @property
    p2_name:string = "";

    @property(cc.AudioClip)
    boom:cc.AudioClip = null;

    @property(cc.AudioClip)
    kin:cc.AudioClip = null;

    @property(cc.AudioClip)
    fire:cc.AudioClip = null;

    @property(cc.AudioClip)
    vs:cc.AudioClip = null;


    protected onLoad(): void {
        firebase.database().ref('/root/Lobby').once('value', (snapshot)=>{
            snapshot.forEach((child_snapshot)=>{
                if(child_snapshot.val().CPU_num == 1 ){
                    this.p1_name = child_snapshot.val().roleName1;
                    console.log(this.p1_name);
                }else if(child_snapshot.val().CPU_num == 2 ){
                    this.p2_name = child_snapshot.val().roleName1;
                    console.log(this.p2_name);
                }
                //console.log(this.Confirm_num);
            })
        }).then(()=>{
            let move1 = cc.moveTo(1,80,360);
            let move2 = cc.moveTo(1,1200,360);
            let move3_1 = cc.moveTo(1.5,640,360);
            let move3_2 = cc.rotateTo(0.75,180);
            let move3_3 = cc.rotateTo(0.75,360);
            let move3 = cc.spawn(move3_1,cc.sequence(move3_2,move3_3));
            let move4 = cc.moveTo(1,50,80);
            let move5 = cc.moveTo(1,750,640);
            let move6 = cc.moveTo(1,350,80);
            let move7 = cc.moveTo(1,1050,640);

            console.log(this.p1_name);
            console.log(this.p2_name);

            

            if(this.node.name == 'zelda_left' && this.p1_name == "Zelda"){
                this.node.runAction(move1);
                this.scheduleOnce(()=>{
                    cc.audioEngine.playEffect(this.boom,false);
                }, 1)
            }else if(this.node.name == 'zelda_right' && this.p2_name == "Zelda"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move2);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 2)
            }else if(this.node.name == 'shadow_left' && this.p1_name == "Shadow Link"){
                this.node.runAction(move1);
                this.scheduleOnce(()=>{
                    cc.audioEngine.playEffect(this.boom,false);
                }, 1)
            }else if(this.node.name == 'shadow_right' && this.p2_name == "Shadow Link"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move2);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 2)
            }else if(this.node.name == 'link_left' && this.p1_name == "Link"){
                this.node.runAction(move1);
                this.scheduleOnce(()=>{
                    cc.audioEngine.playEffect(this.boom,false);
                }, 1)
            }else if(this.node.name == 'link_right' && this.p2_name == "Link"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move2);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 2)
            }else if(this.node.name == 'cadence_left' && this.p1_name == "Cadence"){
                this.node.runAction(move1);
                this.scheduleOnce(()=>{
                    cc.audioEngine.playEffect(this.boom,false);
                }, 1)
            }else if(this.node.name == 'cadence_right' && this.p2_name == "Cadence"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move2);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 2)
            }else if(this.node.name == 'p1'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move4);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.kin,false);
                    }, 1)
                }, 1)
            }else if(this.node.name == 'p2'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move5);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.kin,false);
                    }, 1)
                }, 3)
            }else if(this.node.name == 'p1name'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move6);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.kin,false);
                    }, 1)
                }, 1)
            }else if(this.node.name == 'p2name'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move7);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.kin,false);
                    }, 1)
                }, 3)
            }
            
            if(this.node.name == 'vs' ){
                this.scheduleOnce(()=>{
                    this.node.runAction(move3);this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.vs,false);
                    }, 0.75)
                }, 4)
            }

            if(this.node.name == 'p1name' || this.node.name == 'p1name2'){
                this.getComponent(cc.Label).string = this.p1_name;
            }

            if(this.node.name == 'p2name' || this.node.name == 'p2name2'){
                this.getComponent(cc.Label).string = this.p2_name;
            }
        
        })
    }

        /*
    protected start(): void {
        let move1 = cc.moveTo(1,80,360);
        let move2 = cc.moveTo(1,1200,360);
        let move3_1 = cc.moveTo(1.5,640,360);
        let move3_2 = cc.rotateTo(0.75,180);
        let move3_3 = cc.rotateTo(0.75,360);
        let move3 = cc.spawn(move3_1,cc.sequence(move3_2,move3_3));
        let move4 = cc.moveTo(1,50,80);
        let move5 = cc.moveTo(1,750,640);
        let move6 = cc.moveTo(1,350,80);
        let move7 = cc.moveTo(1,1050,640);

        console.log(this.p1_name);
        console.log(this.p2_name);

        if(this.node.name == 'zelda_left' && this.p1_name == "Zelda"){
            this.node.runAction(move1);
        }else if(this.node.name == 'zelda_right' && this.p2_name == "Zelda"){
            this.scheduleOnce(()=>{
                this.node.runAction(move2);
            }, 2)
        }else if(this.node.name == 'shadow_left' && this.p1_name == "Shadow Link"){
            this.node.runAction(move1);
        }else if(this.node.name == 'shadow_right' && this.p2_name == "Shadow Link"){
            this.scheduleOnce(()=>{
                this.node.runAction(move2);
            }, 2)
        }else if(this.node.name == 'link_left' && this.p1_name == "Link"){
            this.node.runAction(move1);
        }else if(this.node.name == 'link_right' && this.p2_name == "Link"){
            this.scheduleOnce(()=>{
                this.node.runAction(move2);
            }, 2)
        }else if(this.node.name == 'cadence_left' && this.p1_name == "Cadence"){
            this.node.runAction(move1);
        }else if(this.node.name == 'cadence_right' && this.p2_name == "Cadence"){
            this.scheduleOnce(()=>{
                this.node.runAction(move2);
            }, 2)
        }else if(this.node.name == 'p1'){
            this.scheduleOnce(()=>{
                this.node.runAction(move4);
            }, 1)
        }else if(this.node.name == 'p2'){
            this.scheduleOnce(()=>{
                this.node.runAction(move5);
            }, 3)
        }else if(this.node.name == 'p1name'){
            this.scheduleOnce(()=>{
                this.node.runAction(move6);
            }, 1)
        }else if(this.node.name == 'p2name'){
            this.scheduleOnce(()=>{
                this.node.runAction(move7);
            }, 3)
        }
        
        if(this.node.name == 'vs' ){
            this.scheduleOnce(()=>{
                this.node.runAction(move3);
            }, 4)
        }

        if(this.node.name == 'p1name' || this.node.name == 'p1name2'){
            this.getComponent(cc.Label).string = this.p1_name;
        }

        if(this.node.name == 'p2name' || this.node.name == 'p2name2'){
            this.getComponent(cc.Label).string = this.p2_name;
        }
        
        
    }
    */
}
