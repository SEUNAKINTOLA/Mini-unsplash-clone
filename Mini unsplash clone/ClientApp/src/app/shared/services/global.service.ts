import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class GlobalService {
    public baseApiUrl2 = 'https://localhost:44347';
    public baseApiUrl = this.baseApiUrl2+'/api';
    public selectedHeaderMenuTab: any = '';

    public paging: any = {
        PageNumber: 1,
        RowsPerPage: 10
    };

    public countriesFlag: any = [
        {
            icon: 'algeria-icon'
        },
        {
            icon: 'angola-icon'
        },
        {
            icon: 'argentina-icon'
        },
        {
            icon: 'australia-icon'
        },
        {
            icon: 'austria-icon'
        },
        {
            icon: 'azerbaijan-icon'
        },
        {
            icon: 'bangladesh-icon'
        },
        {
            icon: 'barbados-icon'
        },
        {
            icon: 'bavarian-icon'
        },
        {
            icon: 'belarus-icon'
        },
        {
            icon: 'benin-icon'
        },
        {
            icon: 'bolivia-icon'
        },
        {
            icon: 'bosnia-and-herzegovina-icon'
        },
        {
            icon: 'botswana-icon'
        },
        {
            icon: 'brazil-icon'
        },
        {
            icon: 'bulgaria-icon'
        },
        {
            icon: 'burkina-faso-icon'
        },
        {
            icon: 'burundi-icon'
        },
        {
            icon: 'cameroon-icon'
        },
        {
            icon: 'canada-icon'
        },
        {
            icon: 'chad-icon'
        },
        {
            icon: 'chile-icon'
        },
        {
            icon: 'colombia-icon'
        },
        {
            icon: 'congo-icon'
        },
        {
            icon: 'costa-rica-icon'
        },
        {
            icon: 'djibouti-icon'
        },
        {
            icon: 'dominican-republic-icon'
        },
        {
            icon: 'ecuador-icon'
        },
        {
            icon: 'el-salvador-icon'
        },
        {
            icon: 'england-icon'
        },
        {
            icon: 'eritrea-icon'
        },
        {
            icon: 'estonia-icon'
        },
        {
            icon: 'ethiopia-icon'
        },
        {
            icon: 'france-icon'
        },
        {
            icon: 'gabon-icon'
        },
        {
            icon: 'germany-icon'
        },
        {
            icon: 'guatemala-icon'
        },
        {
            icon: 'guinea-bissau-icon'
        },
        {
            icon: 'guyana-icon'
        },
        {
            icon: 'haiti-icon'
        },
        {
            icon: 'honduras-icon'
        },
        {
            icon: 'hongkong-icon'
        },
        {
            icon: 'hungary-icon'
        },
        {
            icon: 'iran-icon'
        },
        {
            icon: 'iraq-icon'
        },
        {
            icon: 'ivory-coast-icon'
        },
        {
            icon: 'jordan-icon'
        },
        {
            icon: 'kazakhstan-icon'
        },
        {
            icon: 'kenya-icon'
        },
        {
            icon: 'kurdistan-icon'
        },
        {
            icon: 'kuwait-icon'
        },
        {
            icon: 'kyrgyzstan-icon'
        },
        {
            icon: 'laos-icon'
        },
        {
            icon: 'latvia-icon'
        },
        {
            icon: 'lebanon-icon'
        },
        {
            icon: 'lesotho-icon'
        },
        {
            icon: 'liberia-icon'
        },
        {
            icon: 'libya-icon'
        },
        {
            icon: 'lithuania-icon'
        },
        {
            icon: 'luxembourg-icon'
        },
        {
            icon: 'macedonia-icon'
        },
        {
            icon: 'malawi-icon'
        },
        {
            icon: 'malaysia-icon'
        },
        {
            icon: 'mali-icon'
        },
        {
            icon: 'mauritania-icon'
        },
        {
            icon: 'mexico-icon'
        },
        {
            icon: 'monaco-icon'
        },
        {
            icon: 'mongolia-icon'
        },
        {
            icon: 'netherlands-icon'
        },
        {
            icon: 'nigeria-icon'
        },
        {
            icon: 'north-korea-icon'
        },
        {
            icon: 'norway-icon'
        },
        {
            icon: 'pakistan-icon'
        },
        {
            icon: 'palestine-icon'
        },
        {
            icon: 'panama-icon'
        },
        {
            icon: 'peru-icon'
        },
        {
            icon: 'philippines-icon'
        },
        {
            icon: 'puerto-rico-icon'
        },
        {
            icon: 'qatar-icon'
        },
        {
            icon: 'russia-icon'
        },
        {
            icon: 'saudi-arabia-icon'
        },
        {
            icon: 'scandinavian-icon'
        },
        {
            icon: 'scotland-icon'
        },
        {
            icon: 'sierra-leone-icon'
        },
        {
            icon: 'singapore-icon'
        },
        {
            icon: 'slovakia-icon'
        },
        {
            icon: 'slovenia-icon'
        },
        {
            icon: 'somalia-icon'
        },
        {
            icon: 'south-africa-icon'
        },
        {
            icon: 'south-sudan-icon'
        },
        {
            icon: 'spain-icon'
        },
        {
            icon: 'sri-lanka-icon'
        },
        {
            icon: 'swaziland-icon'
        },
        {
            icon: 'sweden-icon'
        },
        {
            icon: 'taiwan-icon'
        },
        {
            icon: 'tajikistan-icon'
        },
        {
            icon: 'thuringia-icon'
        },
        {
            icon: 'timor-leste-icon'
        },
        {
            icon: 'togo-icon'
        },
        {
            icon: 'tunisia-icon'
        },
        {
            icon: 'uganda-icon'
        },
        {
            icon: 'ukraine-icon'
        },
        {
            icon: 'united-kingdom-icon'
        },
        {
            icon: 'uruguay-icon'
        },
        {
            icon: 'usa-icon'
        },
        {
            icon: 'uzbekistan-icon'
        },
        {
            icon: 'venezuela-icon'
        },
        {
            icon: 'vietnam-icon'
        },
        {
            icon: 'yemen-icon'
        }
    ];

    // app auth knob drop down menu
    public calloutDiscoverMenuItems: any = [
        {
            text: 'Profile Details',
            icon: 'globe-black-icon',
            value: 'favorites'
        },
        {
            text: 'My Appraisal Reports',
            icon: 'dashboard-black-icon',
            value: 'discover',
        },
        {
            text: 'Credit Score Reports',
            icon: 'dashboard-black-icon',
            value: 'discover',
        },
        {
            text: 'My Search History',
            icon: 'dashboard-black-icon',
            value: 'discover',
        },
        {
            text: 'Reviews Timeline',
            icon: 'dashboard-black-icon',
            value: 'discover',
        }
    ];

    // Ads
    public isAdsAvailable: boolean;

    initGlobals(): void {
        this.isAdsAvailable = false;
    }
}
