const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    volume: number = 0.5;

    @property(cc.AudioClip)
    firework_sound: cc.AudioClip = null;
    
    protected start(): void {
        cc.audioEngine.setEffectsVolume(this.volume)
        cc.audioEngine.playEffect(this.firework_sound,true)
    }

}
