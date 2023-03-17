const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    map: cc.Node = null;
    @property([cc.SpriteFrame])
    public maps: cc.SpriteFrame[] = [];
    @property
    index:number = 0;
    @property
    maxindex:number = 1;
    @property
    online_index:number = 0;

    change_next(){
        if(this.index <= this.maxindex - 1){
            this.index += 1;
            firebase.database().ref('/root/Map').update({
                MapIndex:this.index
            })
        } else {
            this.index = 0;
            firebase.database().ref('/root/Map').update({
                MapIndex:this.index
            })
        }
    }

    change_previous(){
        if(this.index >= 1){
            this.index -= 1;
            firebase.database().ref('/root/Map').update({
                MapIndex:this.index
            })
        } else {
            this.index = this.maxindex;
            firebase.database().ref('/root/Map').update({
                MapIndex:this.index
            })
        }
    }
    onLoad(){
        //console.log("test")
        firebase.database().ref('/root/Map').update({
            MapIndex:0
        })
        this.map.parent.getChildByName('mapName').getComponent(cc.Label).string = this.maps[this.index].name;
        firebase.database().ref('/root/Lobby/player' + firebase.auth().currentUser.uid).update({
            IsConfirm:"false"
        })
    }
    protected start(): void {
        firebase.database().ref('/root/Map').on('value', (snapshot)=>{
            this.online_index = snapshot.val().MapIndex;
            //console.log(this.online_index);
        })
        
    }
    protected update(dt: number): void {
        this.map.parent.getChildByName('map').getComponent(cc.Sprite).spriteFrame = this.maps[this.online_index];
        this.map.parent.getChildByName('mapName').getComponent(cc.Label).string = this.maps[this.online_index].name;
    }
}
