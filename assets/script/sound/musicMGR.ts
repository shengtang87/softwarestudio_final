const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    volume: number = 0.5;

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;
    
    protected start(): void {
        cc.audioEngine.setMusicVolume(this.volume)
        cc.audioEngine.playMusic(this.bgm,true)
    }

}
