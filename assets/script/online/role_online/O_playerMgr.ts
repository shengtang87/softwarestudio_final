const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    role: cc.Node = null;
    @property([cc.AnimationClip])
    public roles: cc.AnimationClip[] = [];
    @property
    index:number = 0;
    @property
    maxindex:number = 1;

    change_next(){
        if(this.index <= this.maxindex - 1){
            this.index += 1;
            this.role.parent.getChildByName('role').getComponent(cc.Animation).play(this.roles[this.index].name);
            this.role.parent.getChildByName('roleName').getComponent(cc.Label).string = this.roles[this.index].name;
        } else {
            this.index = 0;
            this.role.parent.getChildByName('role').getComponent(cc.Animation).play(this.roles[this.index].name);
            this.role.parent.getChildByName('roleName').getComponent(cc.Label).string = this.roles[this.index].name;
        }
    }

    change_previous(){
        if(this.index >= 1){
            this.index -= 1;
            this.role.parent.getChildByName('role').getComponent(cc.Animation).play(this.roles[this.index].name);
            this.role.parent.getChildByName('roleName').getComponent(cc.Label).string = this.roles[this.index].name;
        } else {
            this.index = this.maxindex;
            this.role.parent.getChildByName('role').getComponent(cc.Animation).play(this.roles[this.index].name);
            this.role.parent.getChildByName('roleName').getComponent(cc.Label).string = this.roles[this.index].name;
        }
    }

    protected onLoad(): void {
        this.role.parent.getChildByName('role').getComponent(cc.Animation).play(this.roles[this.index].name);
        this.role.parent.getChildByName('roleName').getComponent(cc.Label).string = this.roles[this.index].name;
    }
}
