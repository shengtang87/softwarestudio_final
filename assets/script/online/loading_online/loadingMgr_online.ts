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

    @property(cc.AudioClip)
    bgm_grassland:cc.AudioClip = null;

    @property(cc.AudioClip)
    bgm_sky:cc.AudioClip = null;

    @property(cc.AudioClip)
    bgm_volcano:cc.AudioClip = null;

    @property(cc.AudioClip)
    bgm_dodgeball:cc.AudioClip = null;

    protected start(): void {

        // 抓地圖資料(選擇要loag哪個map)
        
        var mapName = JSON.parse(cc.sys.localStorage.getItem('map'));
        //console.log(mapName)
        
        if(mapName == 'grassland'){
            this.scheduleOnce(()=>{
                cc.director.loadScene("grassland_online");
            }, 5)
        } else if (mapName == 'volcano') {
            this.scheduleOnce(()=>{
                cc.director.loadScene("volcano_online");
            }, 5)
        } else if (mapName == 'sky') {
            this.scheduleOnce(()=>{
                cc.director.loadScene("sky_online");
            }, 5)
        } else if (mapName == 'super_dodge_ball') {
            this.scheduleOnce(()=>{
                cc.director.loadScene("super_online");
            }, 5)
        }
        
        
        cc.audioEngine.playMusic(this.fire,true);

         /*   
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
        */
    }
}
