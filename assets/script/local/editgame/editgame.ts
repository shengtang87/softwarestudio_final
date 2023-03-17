const {ccclass, property} = cc._decorator;

@ccclass
export default class editgame extends cc.Component {

    @property(cc.Prefab)
    private bush:cc.Prefab = null;

    @property(cc.Prefab)
    private bush_ugly:cc.Prefab = null;

    @property(cc.Prefab)
    private coral_big:cc.Prefab = null;

    @property(cc.Prefab)
    private coral_small:cc.Prefab = null;

    @property(cc.Prefab)
    private fence_horizon:cc.Prefab = null;

    @property(cc.Prefab)
    private fence_vertical:cc.Prefab = null;

    @property(cc.Prefab)
    private rock:cc.Prefab = null;

    @property(cc.Prefab)
    private rock_ugly:cc.Prefab = null;

    @property(cc.Prefab)
    private tree_ugly:cc.Prefab = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.buildmap();
        cc.find("Canvas/map_pup").zIndex = 0;
        cc.find("Canvas/map_pdown").zIndex = 2;
    }

    start () {

    }

    update (dt) {}

    buildmap(){
        var db=firebase.database();


        let itemname;
        let pupordown;
        let posx;
        let posy;
        let t=this;

        db.ref("/root/edit").once('value', function(snapshot){
            snapshot.forEach(function (item) {      

                pupordown=item.child("/PupOrPdown").val()          
                posx=item.child("/Pos_x").val()
                posy=item.child("/Pos_y").val()
                itemname=item.child("/itemName").val()      

                console.log(itemname)
                console.log(posx)
                console.log(posy)
                console.log(pupordown)

                var object;
                if(itemname=="bush"){
                    object = cc.instantiate(t.bush);
                }
                else if(itemname=="bush_ugly"){
                    object = cc.instantiate(t.bush_ugly);
                }
                
                else if(itemname=="coral_big"){
                    object = cc.instantiate(t.coral_big);
                }
                
                else if(itemname=="coral_small"){
                    object = cc.instantiate(t.coral_small);
                }
                
                else if(itemname=="fence_horizon"){
                    object = cc.instantiate(t.fence_horizon);
                }
                
                else if(itemname=="fence_vertical"){
                    object = cc.instantiate(t.fence_vertical);
                }
                
                else if(itemname=="rock"){
                    object = cc.instantiate(t.rock);
                }
                
                else if(itemname=="rock_ugly"){
                    object = cc.instantiate(t.rock_ugly);
                }
                
                else if(itemname=="tree_ugly"){
                    object = cc.instantiate(t.tree_ugly);
                }

                object.setPosition(posx,posy);
                if(pupordown){
                    cc.find("Canvas/map_pdown").addChild(object);
                }
                else{
                    cc.find("Canvas/map_pup").addChild(object);
                }


            })
        });
    }
}
