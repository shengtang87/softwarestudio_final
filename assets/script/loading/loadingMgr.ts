const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.AudioClip)
    boom:cc.AudioClip = null;

    @property(cc.AudioClip)
    kin:cc.AudioClip = null;

    @property(cc.AudioClip)
    fire:cc.AudioClip = null;

    @property(cc.AudioClip)
    vs:cc.AudioClip = null;

    protected start(): void {

        // 抓地圖資料(選擇要loag哪個map)
        
        var mapName = JSON.parse(cc.sys.localStorage.getItem('map'));
        //console.log(mapName)
        
        if(mapName == 'grassland'){
            this.scheduleOnce(()=>{
                cc.director.loadScene("grassland");
                //cc.audioEngine.playMusic(this.bgm_grassland,true);
            }, 5)
        } else if (mapName == 'volcano') {
            this.scheduleOnce(()=>{
                cc.director.loadScene("volcano");
                //cc.audioEngine.playMusic(this.bgm_volcano,true);
            }, 5)
        } else if (mapName == 'sky') {
            this.scheduleOnce(()=>{
                cc.director.loadScene("sky");
                //cc.audioEngine.playMusic(this.bgm_sky,true);
            }, 5)
        } else if (mapName == 'super_dodge_ball') {
            this.scheduleOnce(()=>{
                cc.director.loadScene("super");
                //cc.audioEngine.playMusic(this.bgm_dodgeball,true);
            }, 5)
        } else if (mapName == 'mapeditor') {
            this.scheduleOnce(()=>{
                cc.director.loadScene("editgame");
                //cc.audioEngine.playMusic(this.bgm_dodgeball,true);
            }, 5)
        }
        
        
        cc.audioEngine.playMusic(this.fire,true);

        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.boom,false);
        }, 1)

        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.kin,false);
        }, 2)

        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.boom,false);
        }, 3)

        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.kin,false);
        }, 4)

        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.vs,false);
        }, 4.75)
        
    }
}
