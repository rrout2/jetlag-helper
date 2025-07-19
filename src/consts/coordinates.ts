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

export {
    TOP_LEFT,
    BOTTOM_RIGHT,
    DEFAULT_VIEW_STATE,
    CAL_ACADEMY_AQUARIUM,
    AQUARIUM_OF_THE_BAY,
    AQUARIUMS,
    ROXIE,
    THEATERS,
};
