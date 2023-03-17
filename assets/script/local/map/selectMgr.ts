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

    change_next(){
        if(this.index <= this.maxindex - 1){
            this.index += 1;
            this.map.parent.getChildByName('map').getComponent(cc.Sprite).spriteFrame = this.maps[this.index];
            this.map.parent.getChildByName('mapName').getComponent(cc.Label).string = this.maps[this.index].name;
        } else {
            this.index = 0;
            this.map.parent.getChildByName('map').getComponent(cc.Sprite).spriteFrame = this.maps[this.index];
            this.map.parent.getChildByName('mapName').getComponent(cc.Label).string = this.maps[this.index].name;
        }
    }

    change_previous(){
        if(this.index >= 1){
            this.index -= 1;
            this.map.parent.getChildByName('map').getComponent(cc.Sprite).spriteFrame = this.maps[this.index];
            this.map.parent.getChildByName('mapName').getComponent(cc.Label).string = this.maps[this.index].name;
        } else {
            this.index = this.maxindex;
            this.map.parent.getChildByName('map').getComponent(cc.Sprite).spriteFrame = this.maps[this.index];
            this.map.parent.getChildByName('mapName').getComponent(cc.Label).string = this.maps[this.index].name;
        }
    }
    protected onLoad(): void {
        this.map.parent.getChildByName('mapName').getComponent(cc.Label).string = this.maps[this.index].name;
    }
}
