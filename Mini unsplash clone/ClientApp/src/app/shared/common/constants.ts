export module Generalparameters {
    export class ApiConstants {
        public static readonly BASEURL: string = 'https://api.unsplash.com';
        public static readonly APIKEY: string = '?client_id=061c51148e8b602c992064482ba158499083625ae7139aee5d6bda6e2c895c96';
        // 80c4c536403e65bc0651d0b3b116904ff9da875406e68a509c2d65346b418d65
        public static readonly PHOTOS: string = '/photos';
        public static readonly COLLECTIONS: string = '/collections';
        public static readonly SEARCH: string = '/search/photos';
        public static readonly SEARCHQEURY: string = '&query=';
        public static readonly PAGESIZE: string = '&per_page=30';
        public static readonly ORDERBY: string = '&order_by=';
        public static readonly USERS: string = '/users';
        public static readonly LOCALSTORAGE: string = 'favImages';
    }

    export class SliderConfig {
        public static readonly SLIDERPARAMS = {
            'slidesToShow': 3,
            'slidesToScroll': 3,
            'nextArrow': '<div class="nav-btn next-slide icon icon-next"></div>',
            'prevArrow': '<div class="nav-btn prev-slide icon icon-prev"></div>',
            'infinite': false,
            'responsive': [{
                'breakpoint': 768,
                'settings': {
                    'slidesToShow': 2,
                    'slidesToScroll': 1
                }
            }]
        };
    }
}
