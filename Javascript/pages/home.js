/* global dataManager */

import { Profile } from "../components/profile";

export class Home{

    /**
     * [constructor description]
     *
     * @param   {Array}  [tags]  la liste des filtres
     *
     * @constructor
     */
    constructor(tags=null){
        this.tags = tags;
    }

    async html(){
        const data = await dataManager.getData();
        let html="";
        let profile;
        for (let i = 0; i < data.photographers.length; i++) {
            console.log(i);
            profile = new Profile(data.photographers[i]);
            html += profile.render();
         }
    }
}