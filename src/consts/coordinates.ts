export type MapCoordinates = {
    longitude: number;
    latitude: number;
    name?: string;
    zoom?: number;
    color?: string;
};

const TOP_LEFT: MapCoordinates = {
    longitude: -122.519303,
    latitude: 37.817117,
};
const BOTTOM_RIGHT: MapCoordinates = {
    longitude: -122.353658,
    latitude: 37.708856,
};

const DEFAULT_VIEW_STATE: MapCoordinates = {
    longitude: -122.43,
    latitude: 37.76,
    zoom: 12,
};

const CAL_ACADEMY_AQUARIUM: MapCoordinates = {
    longitude: -122.466,
    latitude: 37.7695,
    name: "California Academy of Sciences",
};

const AQUARIUM_OF_THE_BAY: MapCoordinates = {
    longitude: -122.4095,
    latitude: 37.8085,
    name: "Aquarium of the Bay",
};

const AQUARIUMS = [CAL_ACADEMY_AQUARIUM, AQUARIUM_OF_THE_BAY];

const ROXIE: MapCoordinates = {
    longitude: -122.4224335454349,
    latitude: 37.76479182898461,
    name: "Roxie Theater",
};

const CASTRO_THEATER: MapCoordinates = {
    longitude: -122.43500790355377,
    latitude: 37.762024046641365,
    name: "Castro Theater",
};
const REGAL_STONESTOWN: MapCoordinates = {
    longitude: -122.47626728698744,
    latitude: 37.72903517519123,
    name: "Regal Stonestown Galleria",
};

const ALAMO_DRAFTHOUSE: MapCoordinates = {
    longitude: -122.41895780598324,
    latitude: 37.756256095301175,
    name: "Alamo Drafthouse Cinema",
};

const OTHER_CINEMA: MapCoordinates = {
    longitude: -122.4212752690076,
    latitude: 37.757102714450845,
    name: "Other Cinema",
};

const AMC_METREON: MapCoordinates = {
    longitude: -122.40335355601157,
    latitude: 37.78454031308038,
    name: "AMC Metreon 16",
};
const PHYLLIS_WATTIS_THEATER: MapCoordinates = {
    longitude: -122.40118761394132,
    latitude: 37.78599153680646,
    name: "Phyllis Wattis Theater",
};

const DELANCEY_STREET_THEATER: MapCoordinates = {
    longitude: -122.38835504009182,
    latitude: 37.78427781786247,
    name: "Delancey Street Screening Room",
};

const LANDMARKS_OPERA: MapCoordinates = {
    longitude: -122.42143422172956,
    latitude: 37.78116520804821,
    name: "Landmark's Opera Plaza Cinema",
};

const AMC_KABUKI: MapCoordinates = {
    longitude: -122.43250642264142,
    latitude: 37.784938355295104,
    name: "AMC Kabuki 8",
};

const VOGUE_THEATER: MapCoordinates = {
    longitude: -122.44672925936432,
    latitude: 37.78839926021185,
    name: "Vogue Theater",
};

const FOUR_STAR_THEATER: MapCoordinates = {
    longitude: -122.4829307033867,
    latitude: 37.7821569493069,
    name: "Four Star Theater",
};

const BALBOA_THEATER: MapCoordinates = {
    longitude: -122.49797712960097,
    latitude: 37.775803323272775,
    name: "Balboa Theater",
};

const COPPOLA_THEATER: MapCoordinates = {
    longitude: -122.47959902953222,
    latitude: 37.72208059639492,
    name: "Coppola Theater",
};

const PRESIDIO_THEATER: MapCoordinates = {
    longitude: -122.44195085289545,
    latitude: 37.80019768353017,
    name: "Presidio Theater",
};

const MARINA_THEATER: MapCoordinates = {
    longitude: -122.43863956051989,
    latitude: 37.80044840286924,
    name: "Marina Theater",
};

const THEATERS: MapCoordinates[] = [
    ROXIE,
    CASTRO_THEATER,
    REGAL_STONESTOWN,
    ALAMO_DRAFTHOUSE,
    OTHER_CINEMA,
    AMC_METREON,
    PHYLLIS_WATTIS_THEATER,
    DELANCEY_STREET_THEATER,
    LANDMARKS_OPERA,
    AMC_KABUKI,
    VOGUE_THEATER,
    FOUR_STAR_THEATER,
    BALBOA_THEATER,
    COPPOLA_THEATER,
    PRESIDIO_THEATER,
    MARINA_THEATER,
];

// Mountains
const GRAND_VIEW: MapCoordinates = {
    longitude: -122.4717879341264,
    latitude: 37.756354300243,
    name: "Grand View",
};

const LARSEN_PEAK: MapCoordinates = {
    longitude: -122.46976785550503,
    latitude: 37.74991362513737,
    name: "Larsen Peak",
};

const MOUNT_SUTRO: MapCoordinates = {
    longitude: -122.45719357996839,
    latitude: 37.75825144747154,
    name: "Mount Sutro",
};

const MOUNT_OLYMPUS: MapCoordinates = {
    longitude: -122.44555344559288,
    latitude: 37.76331450243748,
    name: "Mount Olympus",
};

const BUENA_VISTA_HEIGHTS: MapCoordinates = {
    longitude: -122.44153607490108,
    latitude: 37.767756309310776,
    name: "Buena Vista Heights",
};

const CORONA_HEIGHTS: MapCoordinates = {
    longitude: -122.4388622383827,
    latitude: 37.76529189903791,
    name: "Corona Heights",
};

const BERNAL_HEIGHTS: MapCoordinates = {
    longitude: -122.41428851585196,
    latitude: 37.74315109784265,
    name: "Bernal Heights",
};

const MOUNT_DAVIDSON: MapCoordinates = {
    longitude: -122.45391473040162,
    latitude: 37.73837230194142,
    name: "Mount Davidson",
};

const GOLD_MINE_HILL: MapCoordinates = {
    longitude: -122.4379047033688,
    latitude: 37.74132409518538,
    name: "Gold Mine Hill",
};

const VISTACION_KNOB: MapCoordinates = {
    longitude: -122.42194497176581,
    latitude: 37.719077723911425,
    name: "Vistacion Knob",
};

const BAYVIEW_HILL: MapCoordinates = {
    longitude: -122.39269969403246,
    latitude: 37.714650301921175,
    name: "Bayview Hill",
};

const LAKEVIEW_ASHTON_MINI_PARK: MapCoordinates = {
    longitude: -122.46259179182279,
    latitude: 37.718025078192085,
    name: "Lakeview and Ashton Mini Park",
};

const LONE_MOUNTAIN: MapCoordinates = {
    longitude: -122.45222307701565,
    latitude: 37.779246551766704,
    name: "Lone Mountain",
};

const STRAWBERRY_HILL: MapCoordinates = {
    longitude: -122.47545978591258,
    latitude: 37.768639909337836,
    name: "Strawberry Hill",
};

const TWIN_PEAKS: MapCoordinates = {
    longitude: -122.44742401960328,
    latitude: 37.75287456613608,
    name: "Twin Peaks",
};

const TANK_HILL: MapCoordinates = {
    longitude: -122.44769815484298,
    latitude: 37.75989339750374,
    name: "Tank Hill",
};

const MOUNTAINS: MapCoordinates[] = [
    GRAND_VIEW,
    LARSEN_PEAK,
    MOUNT_SUTRO,
    MOUNT_OLYMPUS,
    BUENA_VISTA_HEIGHTS,
    CORONA_HEIGHTS,
    BERNAL_HEIGHTS,
    MOUNT_DAVIDSON,
    GOLD_MINE_HILL,
    VISTACION_KNOB,
    BAYVIEW_HILL,
    LAKEVIEW_ASHTON_MINI_PARK,
    LONE_MOUNTAIN,
    STRAWBERRY_HILL,
    TWIN_PEAKS,
    TANK_HILL,
];

const LINCOLN_PARK_GOLF_COURSE: MapCoordinates = {
    longitude: -122.4944350727545,
    latitude: 37.78227642579915,
    name: "Lincoln Park Golf Course",
};

const GOLDEN_GATE_PARK_GOLF_COURSE: MapCoordinates = {
    longitude: -122.50509217707933,
    latitude: 37.76840006294823,
    name: "Golden Gate Park Golf Course",
};

const PRESIDIO_GOLF_COURSE: MapCoordinates = {
    longitude: -122.45978067334318,
    latitude: 37.79044347248328,
    name: "Presidio Golf Course",
};

const TPC_FLEMING_GOLF_COURSE: MapCoordinates = {
    longitude: -122.49106041984149,
    latitude: 37.725579412616376,
    name: "TPC Fleming Golf Course",
};

const TPC_HARDING_GOLF_COURSE: MapCoordinates = {
    longitude: -122.49319786089983,
    latitude: 37.72479372930749,
    name: "TPC Harding Golf Course",
};

const THE_OLYMPIC_CLUB: MapCoordinates = {
    longitude: -122.49325393370552,
    latitude: 37.708571380148314,
    name: "The Olympic Club",
};

const SAN_FRANCISCO_GOLF_CLUB: MapCoordinates = {
    longitude: -122.47744201684212,
    latitude: 37.71219264812866,
    name: "San Francisco Golf Club",
};

const GLENEAGLES_GOLF_COURSE: MapCoordinates = {
    longitude: -122.42438357214981,
    latitude: 37.715854069565516,
    name: "Gleneagles Golf Course",
};

const GOLF_COURSES: MapCoordinates[] = [
    LINCOLN_PARK_GOLF_COURSE,
    GOLDEN_GATE_PARK_GOLF_COURSE,
    PRESIDIO_GOLF_COURSE,
    TPC_FLEMING_GOLF_COURSE,
    TPC_HARDING_GOLF_COURSE,
    THE_OLYMPIC_CLUB,
    SAN_FRANCISCO_GOLF_CLUB,
    GLENEAGLES_GOLF_COURSE,
];

const HOSPITALS: MapCoordinates[] = [
    {
        longitude: -122.4091568,
        latitude: 37.79543194,
        name: "Chinese Hospital",
    },
    {
        longitude: -122.4562381,
        latitude: 37.78644473,
        name: "CPMC California Campus",
    },
    {
        longitude: -122.4344964,
        latitude: 37.76829443,
        name: "CPMC Davies Campus",
    },
    {
        longitude: -122.4316986,
        latitude: 37.79074118,
        name: "CPMC Pacific Heights",
    },
    {
        longitude: -122.4211267,
        latitude: 37.74755265,
        name: "CPMC Saint Luke's",
    },
    {
        longitude: -122.4222954,
        latitude: 37.7860309,
        name: "CPMC Van Ness",
    },
    {
        longitude: -122.4640179,
        latitude: 37.78029359,
        name: "KP French Campus",
    },
    {
        longitude: -122.4432386,
        latitude: 37.78264613,
        name: "KP San Francisco Medical Center",
    },
    {
        longitude: -122.4568888,
        latitude: 37.74908001,
        name: "Laguna Honda Hospital and Rehabilitation Center",
    },
    {
        longitude: -122.405468,
        latitude: 37.7554007,
        name: "San Francisco General",
    },
    {
        longitude: -122.5052857,
        latitude: 37.78235469,
        name: "San Francisco VA Medical Center",
    },
    {
        longitude: -122.4168379,
        latitude: 37.78957366,
        name: "UCSF Health St Francis Hospital",
    },
    {
        longitude: -122.3921667,
        latitude: 37.76778493,
        name: "UCSF Medical Center Mission Bay",
    },
    {
        longitude: -122.4391042,
        latitude: 37.78498813,
        name: "UCSF Medical Center Mount Zion",
    },
    {
        longitude: -122.4580066,
        latitude: 37.76280568,
        name: "UCSF Medical Center Parnassus",
    },
    {
        longitude: -122.4538094,
        latitude: 37.77393444,
        name: "UCSF Saint Mary's Medical Center",
    },
];

const DOG_PARKS: MapCoordinates[] = [
    {
        longitude: -122.4354808,
        latitude: 37.77614736,
        name: "Alamo Square",
    },
    {
        longitude: -122.4365923,
        latitude: 37.79072071,
        name: "Alta Plaza",
    },
    {
        longitude: -122.4436231,
        latitude: 37.7265651,
        name: "Balboa Park",
    },
    {
        longitude: -122.4119278,
        latitude: 37.74291415,
        name: "Bernal Heights",
    },
    {
        longitude: -122.3992632,
        latitude: 37.77080379,
        name: "Berry Street",
    },
    {
        longitude: -122.4427066,
        latitude: 37.76876819,
        name: "Buena Vista",
    },
    {
        longitude: -122.3934942,
        latitude: 37.77238596,
        name: "Channel Street",
    },
    {
        longitude: -122.440161,
        latitude: 37.76537452,
        name: "Corona Heights",
    },
    {
        longitude: -122.4305453,
        latitude: 37.71453742,
        name: "Crocker Amazon",
    },
    {
        longitude: -122.4324871,
        latitude: 37.76966968,
        name: "Duboce Park",
    },
    {
        longitude: -122.4363311,
        latitude: 37.7598002,
        name: "Eureka Valley",
    },
    {
        longitude: -122.4209884,
        latitude: 37.80442691,
        name: "Francisco Park",
    },
    {
        longitude: -122.4604707,
        latitude: 37.76716417,
        name: "GGP #1",
    },
    {
        longitude: -122.4570864,
        latitude: 37.77394854,
        name: "GGP #2",
    },
    {
        longitude: -122.49523,
        latitude: 37.76618709,
        name: "GGP #3",
    },
    {
        longitude: -122.4993059,
        latitude: 37.77112095,
        name: "GGP Training Area",
    },
    {
        longitude: -122.426812,
        latitude: 37.78166829,
        name: "Jefferson Square",
    },
    {
        longitude: -122.4273265,
        latitude: 37.79110728,
        name: "Lafayette Park",
    },
    {
        longitude: -122.4048677,
        latitude: 37.75905717,
        name: "McKinley Square",
    },
    {
        longitude: -122.4189682,
        latitude: 37.71959195,
        name: "McLaren Shelley",
    },
    {
        longitude: -122.4273544,
        latitude: 37.71502009,
        name: "McLaren Geneva",
    },
    {
        longitude: -122.4264088,
        latitude: 37.76036902,
        name: "Mission Dolores N",
    },
    {
        longitude: -122.4273326,
        latitude: 37.75935059,
        name: "Mission Dolores S",
    },
    {
        longitude: -122.4345456,
        latitude: 37.80167666,
        name: "Moscone",
    },
    {
        longitude: -122.4668902,
        latitude: 37.78739448,
        name: "Mountain Lake Park",
    },
    {
        longitude: -122.4859688,
        latitude: 37.73595577,
        name: "Pine Lake Park",
    },
    {
        longitude: -122.3963822,
        latitude: 37.75710508,
        name: "Potrero Hill",
    },
    {
        longitude: -122.4217602,
        latitude: 37.77019987,
        name: "SoMa West",
    },
    {
        longitude: -122.4763043,
        latitude: 37.73500273,
        name: "Stern Grove",
    },
    {
        longitude: -122.4137024,
        latitude: 37.7806792,
        name: "UN Plaza",
    },
    {
        longitude: -122.4384444,
        latitude: 37.74647078,
        name: "Upper Douglass",
    },
    {
        longitude: -122.4271052,
        latitude: 37.74261523,
        name: "Upper Noe",
    },
    {
        longitude: -122.4354972,
        latitude: 37.74029001,
        name: "Walter Haas",
    },
];

const LIBRARIES: MapCoordinates[] = [
    {
        longitude: -122.4972182,
        latitude: 37.77874605,
        name: "Anza",
    },
    {
        longitude: -122.391282,
        latitude: 37.73272623,
        name: "Bayview",
    },
    {
        longitude: -122.416134,
        latitude: 37.73896564,
        name: "Bernal",
    },
    {
        longitude: -122.4101716,
        latitude: 37.79528053,
        name: "Chinatown",
    },
    {
        longitude: -122.4319964,
        latitude: 37.76422128,
        name: "Eureka Valley",
    },
    {
        longitude: -122.4332047,
        latitude: 37.72716637,
        name: "Excelsior",
    },
    {
        longitude: -122.4337485,
        latitude: 37.73395364,
        name: "Glen Park",
    },
    {
        longitude: -122.4289945,
        latitude: 37.79719676,
        name: "Golden Gate Valley",
    },
    {
        longitude: -122.4562648,
        latitude: 37.7241157,
        name: "Ingleside",
    },
    {
        longitude: -122.4157857,
        latitude: 37.77921253,
        name: "Main Branch",
    },
    {
        longitude: -122.4340975,
        latitude: 37.80148902,
        name: "Marina",
    },
    {
        longitude: -122.4743514,
        latitude: 37.72669378,
        name: "Merced",
    },
    {
        longitude: -122.420938,
        latitude: 37.7531744,
        name: "Mission",
    },
    {
        longitude: -122.3930971,
        latitude: 37.77552937,
        name: "Mission Bay",
    },
    {
        longitude: -122.4350912,
        latitude: 37.75046438,
        name: "Noe Valley",
    },
    {
        longitude: -122.4132528,
        latitude: 37.80266519,
        name: "North Beach",
    },
    {
        longitude: -122.4659948,
        latitude: 37.71421793,
        name: "Ocean View",
    },
    {
        longitude: -122.4980482,
        latitude: 37.75138453,
        name: "Ortega",
    },
    {
        longitude: -122.4510285,
        latitude: 37.77033774,
        name: "Park",
    },
    {
        longitude: -122.4793719,
        latitude: 37.7431039,
        name: "Parkside",
    },
    {
        longitude: -122.4065137,
        latitude: 37.72710674,
        name: "Portola",
    },
    {
        longitude: -122.3976771,
        latitude: 37.76016647,
        name: "Potrero",
    },
    {
        longitude: -122.4448495,
        latitude: 37.78895273,
        name: "Presidio",
    },
    {
        longitude: -122.4681607,
        latitude: 37.78186652,
        name: "Richmond",
    },
    {
        longitude: -122.4761833,
        latitude: 37.76345365,
        name: "Sunset",
    },
    {
        longitude: -122.4078408,
        latitude: 37.7127045,
        name: "Visitacion Valley",
    },
    {
        longitude: -122.4660668,
        latitude: 37.74137126,
        name: "West Portal",
    },
    {
        longitude: -122.4377666,
        latitude: 37.78415465,
        name: "Western Addition",
    },
    {
        longitude: -122.3707525,
        latitude: 37.82701496,
        name: "Treasure Island",
    },
];

const FARMERS_MARKETS: MapCoordinates[] = [
    {
        longitude: -122.4098459,
        latitude: 37.73577285,
        name: "Alemany Farmers Market",
    },
    {
        longitude: -122.4330627,
        latitude: 37.7833252,
        name: "Fillmore Farmers Market",
    },
    {
        longitude: -122.3935994,
        latitude: 37.7953472,
        name: "Ferry Plaza Farmers Market",
    },
    {
        longitude: -122.428925,
        latitude: 37.75146749,
        name: "Noe Valley Farmers Market",
    },
    {
        longitude: -122.4116359,
        latitude: 37.8017981,
        name: "North Beach Farmers Market",
    },
    {
        longitude: -122.4618747,
        latitude: 37.78323237,
        name: "Clement St Farmers Market",
    },
    {
        longitude: -122.4402903,
        latitude: 37.77341061,
        name: "Divisadero Farmers Market",
    },
    {
        longitude: -122.4312927,
        latitude: 37.80615617,
        name: "Fort Mason Farmers Market",
    },
    {
        longitude: -122.4159245,
        latitude: 37.77974182,
        name: "Heart of the City Farmers Market",
    },
    {
        longitude: -122.4657233,
        latitude: 37.7636214,
        name: "Inner Sunset Farmers Market",
    },
    {
        longitude: -122.4956179,
        latitude: 37.75094528,
        name: "Outer Sunset Farmers Market & Mercantile",
    },
    {
        longitude: -122.4792651,
        latitude: 37.72987636,
        name: "Stonestown Farmers Market",
    },
    {
        longitude: -122.4333148,
        latitude: 37.76456399,
        name: "Castro Farmers Market",
    },
    {
        longitude: -122.4805217,
        latitude: 37.72229958,
        name: "Associated Students Farmers Market",
    },
    {
        longitude: -122.5038209,
        latitude: 37.78172086,
        name: "VA San Francisco Farmers Market",
    },
    {
        longitude: -122.4197452,
        latitude: 37.75567515,
        name: "Mission Community Market",
    },
    {
        longitude: -122.4029241,
        latitude: 37.78961677,
        name: "San Francisco Farmers Market at Crocker Galleria",
    },
];

const FOREIGN_CONSULATES: MapCoordinates[] = [
    {
        longitude: -122.4004088,
        latitude: 37.78971752,
        name: "Australia",
    },
    {
        longitude: -122.4024676,
        latitude: 37.79243908,
        name: "Brazil",
    },
    {
        longitude: -122.4042171,
        latitude: 37.79296546,
        name: "Canada",
    },
    {
        longitude: -122.4076377,
        latitude: 37.78517352,
        name: "Chile",
    },
    {
        longitude: -122.427787,
        latitude: 37.78471413,
        name: "China",
    },
    {
        longitude: -122.4026842,
        latitude: 37.79371853,
        name: "Colombia",
    },
    {
        longitude: -122.4189996,
        latitude: 37.78157586,
        name: "El Salvador",
    },
    {
        longitude: -122.3989645,
        latitude: 37.78704969,
        name: "Estonia",
    },
    {
        longitude: -122.4019216,
        latitude: 37.78978874,
        name: "France",
    },
    {
        longitude: -122.403652,
        latitude: 37.79788347,
        name: "Georgia",
    },
    {
        longitude: -122.4271532,
        latitude: 37.79373486,
        name: "Germany",
    },
    {
        longitude: -122.4269882,
        latitude: 37.79598921,
        name: "Greece",
    },
    {
        longitude: -122.4042371,
        latitude: 37.79468183,
        name: "Guatemala",
    },
    {
        longitude: -122.3999566,
        latitude: 37.78940148,
        name: "India",
    },
    {
        longitude: -122.4165236,
        latitude: 37.80463581,
        name: "Indonesia",
    },
    {
        longitude: -122.4027465,
        latitude: 37.78882027,
        name: "Ireland",
    },
    {
        longitude: -122.4025251,
        latitude: 37.7935371,
        name: "Israel",
    },
    {
        longitude: -122.4330077,
        latitude: 37.79448711,
        name: "Italy",
    },
    {
        longitude: -122.4004358,
        latitude: 37.7938812,
        name: "Japan",
    },
    {
        longitude: -122.4026075,
        latitude: 37.7936494,
        name: "Kazakhstan",
    },
    {
        longitude: -122.4012663,
        latitude: 37.79052036,
        name: "Luxembourg",
    },
    {
        longitude: -122.3956757,
        latitude: 37.78688444,
        name: "Mexico",
    },
    {
        longitude: -122.4021321,
        latitude: 37.7928992,
        name: "Mongolia",
    },
    {
        longitude: -122.4034095,
        latitude: 37.78931879,
        name: "Netherlands",
    },
    {
        longitude: -122.4004807,
        latitude: 37.78971087,
        name: "Norway",
    },
    {
        longitude: -122.4072603,
        latitude: 37.7852397,
        name: "Peru",
    },
    {
        longitude: -122.407929,
        latitude: 37.78912321,
        name: "Philippines",
    },
    {
        longitude: -122.4471062,
        latitude: 37.79033432,
        name: "Portugal",
    },
    {
        longitude: -122.4007259,
        latitude: 37.7893966,
        name: "Singapore",
    },
    {
        longitude: -122.4506616,
        latitude: 37.78891204,
        name: "South Korea",
    },
    {
        longitude: -122.423669,
        latitude: 37.78729146,
        name: "Spain",
    },
    {
        longitude: -122.4007447,
        latitude: 37.78943394,
        name: "Sweden",
    },
    {
        longitude: -122.39817,
        latitude: 37.80220548,
        name: "Switzerland",
    },
    {
        longitude: -122.4003475,
        latitude: 37.78168196,
        name: "Taiwan",
    },
    {
        longitude: -122.40602,
        latitude: 37.7910026,
        name: "Ukraine",
    },
    {
        longitude: -122.4012621,
        latitude: 37.79046325,
        name: "United Kingdom",
    },
    {
        longitude: -122.3989743,
        latitude: 37.79215139,
        name: "Uruguay",
    },
    {
        longitude: -122.4230827,
        latitude: 37.7906127,
        name: "Vietnam",
    },
];

export {
    FOREIGN_CONSULATES,
    FARMERS_MARKETS,
    LIBRARIES,
    DOG_PARKS,
    HOSPITALS,
    GOLF_COURSES,
    MOUNTAINS,
    TOP_LEFT,
    BOTTOM_RIGHT,
    DEFAULT_VIEW_STATE,
    CAL_ACADEMY_AQUARIUM,
    AQUARIUM_OF_THE_BAY,
    AQUARIUMS,
    ROXIE,
    THEATERS,
};
