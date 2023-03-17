const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    item1: cc.Node = null;
    @property(cc.Node)
    item2: cc.Node = null;
    @property(cc.Node)
    item3: cc.Node = null;
    @property(cc.Node)
    item4: cc.Node = null;
    @property(cc.Node)
    item5: cc.Node = null;
    @property(cc.Node)
    item6: cc.Node = null;
    @property(cc.Node)
    item7: cc.Node = null;
    @property(cc.Node)
    item8: cc.Node = null;
    @property(cc.Node)
    item9: cc.Node = null;

    onLoad(){
        var chose_item;
        this.item1.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            let location = event.getLocation();
            chose_item = cc.instantiate(this.item1);
            chose_item.opacity = 150;
            chose_item.parent = this.node.parent
            chose_item.getComponent("itemMgr").IsCreated = true;
            chose_item.setPosition(cc.v2(location.x-640, location.y-360));
        })
        
        this.item2.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            let location = event.getLocation();
            chose_item = cc.instantiate(this.item2);
            chose_item.opacity = 150;
            chose_item.parent = this.node.parent;
            chose_item.getComponent("itemMgr").IsCreated = true;
            chose_item.setPosition(cc.v2(location.x-640, location.y-360));
        })
        
        this.item3.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            let location = event.getLocation();
            chose_item = cc.instantiate(this.item3);
            chose_item.opacity = 150;
            chose_item.parent = this.node.parent;
            chose_item.getComponent("itemMgr").IsCreated = true;
            chose_item.setPosition(cc.v2(location.x-640, location.y-360));
        })
        
        this.item4.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            let location = event.getLocation();
            chose_item = cc.instantiate(this.item4);
            chose_item.opacity = 150;
            chose_item.parent = this.node.parent;
            chose_item.getComponent("itemMgr").IsCreated = true;
            chose_item.setPosition(cc.v2(location.x-640, location.y-360));
        })

        this.item5.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            let location = event.getLocation();
            chose_item = cc.instantiate(this.item5);
            chose_item.opacity = 150;
            chose_item.parent = this.node.parent;
            chose_item.getComponent("itemMgr").IsCreated = true;
            chose_item.setPosition(cc.v2(location.x-640, location.y-360));
        })

        this.item6.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            let location = event.getLocation();
            chose_item = cc.instantiate(this.item6);
            chose_item.opacity = 150;
            chose_item.parent = this.node.parent;
            chose_item.getComponent("itemMgr").IsCreated = true;
            chose_item.setPosition(cc.v2(location.x-640, location.y-360));
        })

        this.item7.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            let location = event.getLocation();
            chose_item = cc.instantiate(this.item7);
            chose_item.opacity = 150;
            chose_item.parent = this.node.parent;
            chose_item.getComponent("itemMgr").IsCreated = true;
            chose_item.setPosition(cc.v2(location.x-640, location.y-360));
        })

        this.item8.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            let location = event.getLocation();
            chose_item = cc.instantiate(this.item8);
            chose_item.opacity = 150;
            chose_item.parent = this.node.parent;
            chose_item.getComponent("itemMgr").IsCreated = true;
            chose_item.setPosition(cc.v2(location.x-640, location.y-360));
        })

        this.item9.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
            let location = event.getLocation();
            chose_item = cc.instantiate(this.item9);
            chose_item.opacity = 150;
            chose_item.parent = this.node.parent;
            chose_item.getComponent("itemMgr").IsCreated = true;
            chose_item.setPosition(cc.v2(location.x-640, location.y-360));
        })
    }
}
