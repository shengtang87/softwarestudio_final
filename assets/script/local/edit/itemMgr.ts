const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    pup: cc.Node = null;
    @property(cc.Node)
    pdown: cc.Node = null;

    @property
    PupOrPdown: number = 0;
    @property
    itemName: string = '';

    @property
    IsCreated: boolean = false;
    @property
    IsSet: boolean = false;

    
    onLoad(){
        
        this.node.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            if(this.IsCreated){
                console.log("test")
                this.node.destroy();
            }
        })
        

        this.node.on(cc.Node.EventType.MOUSE_MOVE, (event)=>{
            if(this.IsCreated && !this.IsSet){
                let delta = event.getDelta();
                this.node.x = this.node.x + delta.x;
                this.node.y = this.node.y + delta.y;
            }
        })
        /*
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, (event)=>{
            if(this.IsCreated){
                this.node.destroy();
            }
        })
        */
        this.node.on(cc.Node.EventType.MOUSE_UP, (event)=>{

            let location = event.getLocation();
            
            if( (2*(location.x-640+250) >= 640 || 2*(location.x-640+250) <= -640 ) || (2*(location.y-360+50) >= 360 || 2*(location.y-360+50) <= -360)){
                if(this.itemName != '') this.node.destroy();
                console.log("test")
                return;
            }
            
            this.node.opacity = 255;
            var onMapPos_x = 2*(this.node.x + 250);
            var onMapPos_y = 2*(this.node.y + 50);
            if(this.PupOrPdown == 0){
                this.node.parent = this.pup;
            } else if (this.PupOrPdown == 1) {
                this.node.parent = this.pdown;
            }

            // onMapPos and chose_sname update to databse but need to *2
            this.IsCreated = true;
            this.IsSet = true;
            this.node.scaleX = 1;
            this.node.scaleY = 1;
            this.node.setPosition(onMapPos_x, onMapPos_y);
            console.log(this.itemName, this.PupOrPdown, onMapPos_x, onMapPos_y);
            
            firebase.database().ref('/root/edit').push({
                itemName:this.itemName,
                PupOrPdown:this.PupOrPdown,
                Pos_x:onMapPos_x,
                Pos_y:onMapPos_y
            })
        })
        
    }
    
    
}
