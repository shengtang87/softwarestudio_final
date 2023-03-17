const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    
    @property
    p1_name:string = "";

    @property
    p2_name:string = "";

    @property
    p3_name:string = "";

    @property
    p4_name:string = "";

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
                    this.p2_name = child_snapshot.val().roleName2;
                    //console.log("p1_name" + this.p1_name);
                    //console.log("p2_name" + this.p2_name);
                }
                if(child_snapshot.val().CPU_num == 2 ){
                    this.p3_name = child_snapshot.val().roleName1;
                    this.p4_name = child_snapshot.val().roleName2;
                    //console.log("p3_name" + this.p3_name);
                    //console.log("p4_name" + this.p4_name);
                }
                //console.log(this.Confirm_num);
            })
        }).then(()=>{
            let move1 = cc.moveTo(1,160,360);
            let move2 = cc.moveTo(1,480,360);
            let move3 = cc.moveTo(1,800,360);
            let move4 = cc.moveTo(1,1120,360);

            let move5_1 = cc.moveTo(1.5,640,360);
            let move5_2 = cc.rotateTo(0.75,180);
            let move5_3 = cc.rotateTo(0.75,360);
            let move5 = cc.spawn(move5_1,cc.sequence(move5_2,move5_3));

            //let move5 = cc.moveTo(1,750,640);
            let move6 = cc.moveTo(1,40,600);
            let move7 = cc.moveTo(1,360,600);
            let move8 = cc.moveTo(1,680,600);
            let move9 = cc.moveTo(1,1000,600);

            let move10 = cc.moveTo(1,190,600);
            let move11 = cc.moveTo(1,510,600);
            let move12 = cc.moveTo(1,840,600);
            let move13 = cc.moveTo(1,1150,600);

         
            if(this.node.name == 'zelda1' && this.p1_name == "Zelda"){
                this.node.runAction(move1);
                this.scheduleOnce(()=>{
                    cc.audioEngine.playEffect(this.boom,false);
                }, 1)
            }else if(this.node.name == 'zelda2' && this.p2_name == "Zelda"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move2);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 2)
            }else if(this.node.name == 'zelda3' && this.p3_name == "Zelda"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move3);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 4)
            }else if(this.node.name == 'zelda4' && this.p4_name == "Zelda"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move4);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 6)
            }else if(this.node.name == 'shadow1' && this.p1_name == "Shadow Link"){
                this.node.runAction(move1);
                this.scheduleOnce(()=>{
                    cc.audioEngine.playEffect(this.boom,false);
                }, 1)
            }else if(this.node.name == 'shadow2' && this.p2_name == "Shadow Link"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move2);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 2)
            }else if(this.node.name == 'shadow3' && this.p3_name == "Shadow Link"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move3);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 4)
            }else if(this.node.name == 'shadow4' && this.p4_name == "Shadow Link"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move4);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 6)
            }else if(this.node.name == 'link1' && this.p1_name == "Link"){
                this.node.runAction(move1);
                this.scheduleOnce(()=>{
                    cc.audioEngine.playEffect(this.boom,false);
                }, 1)
            }else if(this.node.name == 'link2' && this.p2_name == "Link"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move2);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 2)
            }else if(this.node.name == 'link3' && this.p3_name == "Link"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move3);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 4)
            }else if(this.node.name == 'link4' && this.p4_name == "Link"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move4);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 6)
            }else if(this.node.name == 'cadence1' && this.p1_name == "Cadence"){
                this.node.runAction(move1);
                this.scheduleOnce(()=>{
                    cc.audioEngine.playEffect(this.boom,false);
                }, 1)
            }else if(this.node.name == 'cadence2' && this.p2_name == "Cadence"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move2);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 2)
            }else if(this.node.name == 'cadence3' && this.p3_name == "Cadence"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move3);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 4)
            }else if(this.node.name == 'cadence4' && this.p4_name == "Cadence"){
                this.scheduleOnce(()=>{
                    this.node.runAction(move4);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.boom,false);
                    }, 1)
                }, 6)
            }
            
            if(this.node.name == 'p1'){
                this.scheduleOnce(()=>{
                    console.log("p1");
                    this.node.runAction(move6);
                }, 1)
            }else if(this.node.name == 'p2'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move7);
                }, 3)
            }else if(this.node.name == 'p3'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move8);
                }, 5)
            }else if(this.node.name == 'p4'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move9);
                }, 7)
            }
            
            if(this.node.name == 'p1name'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move10);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.kin,false);
                    }, 1)
                }, 1)
            }else if(this.node.name == 'p2name'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move11);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.kin,false);
                    }, 1)
                }, 3)
            }else if(this.node.name == 'p3name'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move12);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.kin,false);
                    }, 1)
                }, 5)
            }else if(this.node.name == 'p4name'){
                this.scheduleOnce(()=>{
                    this.node.runAction(move13);
                    this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.kin,false);
                    }, 1)
                }, 7)
            }
            
            
            if(this.node.name == 'vs' ){
                this.scheduleOnce(()=>{
                    this.node.runAction(move5);this.scheduleOnce(()=>{
                        cc.audioEngine.playEffect(this.vs,false);
                    }, 0.75)
                }, 8)
            }

            if(this.node.name == 'p1name' || this.node.name == 'p1name2'){
                this.getComponent(cc.Label).string = this.p1_name;
            }

            if(this.node.name == 'p2name' || this.node.name == 'p2name2'){
                this.getComponent(cc.Label).string = this.p2_name;
            }

            if(this.node.name == 'p3name' || this.node.name == 'p3name2'){
                this.getComponent(cc.Label).string = this.p3_name;
            }

            if(this.node.name == 'p4name' || this.node.name == 'p4name2'){
                this.getComponent(cc.Label).string = this.p4_name;
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
