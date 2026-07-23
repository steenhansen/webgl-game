const HEX_PAIR_DIVIDER = "::fence::";

const HEIGHT_ABOVE_WALKWAY = 0.0;

const BREAD_CRUMBS_ON = "BREAD_CRUMBS_ON";

const BREAD_CRUMBS_OFF = "BREAD_CRUMBS_OFF";

const RUN_OR_TEST = "RUN_OR_TEST";
const PRINT_ALLOWED = "PRINT_ALLOWED";

const TESTINs_PRINT = "TESTINs_PRINT"; // print_moves
const RUNNINs_NO_PRINT = "RUNNINs_NO_PRINT"; // hide_moves

const DARK_COLOR = "DARK_COLOR";
const LIGHT_COLOR = "LIGHT_COLOR";

const HEXAGON_PART = "HEXAGON_PART";
const FENCE_PART = "FENCE_PART";

const ENEMY_VISIBLE = "ENEMY_VISIBLE";

const ENEMY_HIDDEN = "ENEMY_HIDDEN";

const START_X_LOOK = 3;
const START_Y_LOOK = 1; // *10 !!!!!!!!!!!!
const START_Z_LOOK = 3;

const START_X_HEX = 0;
const START_Y_HEX = 1 + HEIGHT_ABOVE_WALKWAY; //  *10  !!!!!!!!!!!!
const START_Z_HEX = 0;

const START_XYZ = `${START_X_HEX},${START_Y_HEX},${START_Z_HEX}`;

const X_INDX = 0;
const Y_INDX = 1;
const Z_INDX = 2;

//[top_left, top_rght, rght_tip, bot_rght, bot_left, left_tip];
const TOP_LEFT_HEX_IND = 0;
const TOP_RGHT_HEX_IND = 1;
const RGHT_TIP_HEX_IND = 2;
const BOT_RGHT_HEX_IND = 3;
const BOT_LEFT_HEX_IND = 4;
const LEFT_TIP_HEX_IND = 5;

const DIRECTION_NN = "DIRECTION_NN";
const DIRECTION_SS = "DIRECTION_SS";
const DIRECTION_NW = "DIRECTION_NW";
const DIRECTION_NE = "DIRECTION_NE";
const DIRECTION_SE = "DIRECTION_SE";
const DIRECTION_SW = "DIRECTION_SW";
const DIRECTION_NONE = "DIRECTION_NONE";

const TILT_NN = "TILT_NN";
const TILT_NN90 = "TILT_NN90";

const FENCE_NN = "FENCE_NN";
const FENCE_SS = "FENCE_SS";
const FENCE_NW = "FENCE_NW";
const FENCE_NE = "FENCE_NE";
const FENCE_SE = "FENCE_SE";
const FENCE_SW = "FENCE_SW";

const TILT_SS = "TILT_SS";
const TILT_NW = "TILT_NW";
const TILT_NE = "TILT_NE";
const TILT_SE = "TILT_SE";
const TILT_SW = "TILT_SW";
const TILT_NONE = "TILT_NONE";

const SLOPE_NONE = "SLOPE_NONE";
const IS_TRANSPARENT = "IS_TRANSPARENT";
const NOT_TRANSPARENT = "NOT_TRANSPARENT";

const TILT_GLASS = "TILT_GLASS";
const TILT_SE90 = "TILT_SE90";

const TEST_NN = "TEST_NN";
const TEST_SS = "TEST_SS";
const TEST_NW = "TEST_NW";
const TEST_NE = "TEST_NE";
const TEST_SE = "TEST_SE";
const TEST_SW = "TEST_SW";
const TEST_NONE = "TEST_NONE";

const HIGHEST_Y = 10;

const DROP_PER_TICK_FLOAT = 0.05;

const SQRT_3 = Math.sqrt(3);

const C______RED = "red";
const C_____BLUE = "blue";
const C____GREEN = "green";
const C___YELLOW = "yellow";
const C___PURPLE = "purple";
const C____BROWN = "brown";
const C_NONE = "pink";

const COL_1 = C___YELLOW;
const COL_2 = C___PURPLE;

const TEST_PASSED = "pass";
const TEST_FAILED = "FAIL !";
const MOVE_GO = "Go";
const MOVE_STOP = "Stop";

const TEST_TILE_MOVE = "TEST_TILE_MOVE";
const PHYS_TILE_MOVE = "PHYS_TILE_MOVE";

const MV_TILE_SAME = "MV_TILE_SAME";
const MV_TILE_NEW = "MV_TILE_NEW";
const MV_FENCE_BLOCKED = "MV_FENCE_BLOCKED";
const MV_FALL_JUMP_STRAIGHT = "MV_FALL_JUMP_STRAIGHT";
const MV_RISE_JUMP_STRAIGHT = "MV_RISE_JUMP_STRAIGHT";

const MV_FALL_TRAMPOLINE = "MV_FALL_TRAMPOLINE";
const MV_RISE_TRAMPOLINE = "MV_RISE_TRAMPOLINE";
const MV_START_TRAMPOLINE = "MV_START_TRAMPOLINE";

const MV_FALL_STEP_OFF = "MV_FALL_STEP_OFF";

const HEIGHT_Y____0 = "000";
const HEIGHT_Y__0_5 = "050";
const HEIGHT_Y____1 = "100";
const HEIGHT_Y__1_5 = "150";
const HEIGHT_Y____2 = "200";
const HEIGHT_Y__2_5 = "250";
const HEIGHT_Y____3 = "300";
const HEIGHT_Y__3_5 = "350";
const HEIGHT_Y____4 = "400";
const HEIGHT_Y__4_5 = "450";
const HEIGHT_Y____5 = "500";
const HEIGHT_Y__5_5 = "550";
const HEIGHT_Y____6 = "600";
const HEIGHT_Y__6_5 = "650";
const HEIGHT_Y____7 = "700";
const HEIGHT_Y__7_5 = "750";
const HEIGHT_Y____8 = "800";
const HEIGHT_Y__8_5 = "850";
const HEIGHT_Y____9 = "900";
const HEIGHT_Y__9_5 = "950";
const HEIGHT_Y___10 = "1000";

const HEIGHT_Y_10_5 = "1050";
const HEIGHT_Y___11 = "1100";
const HEIGHT_Y___12 = "1200";
const HEIGHT_Y___13 = "1300";
const HEIGHT_Y___14 = "1400";
const HEIGHT_Y___15 = "1500";
const HEIGHT_Y___16 = "1600";
const HEIGHT_Y___17 = "1700";
const HEIGHT_Y___18 = "1800";
const HEIGHT_Y___19 = "1900";
const HEIGHT_Y___20 = "2000";

const HEIGHT_Y___21 = "2100";
const HEIGHT_Y___22 = "2200";
const HEIGHT_Y___23 = "2300";
const HEIGHT_Y___24 = "2400";
const HEIGHT_Y___25 = "2500";
const HEIGHT_Y___26 = "2600";
const HEIGHT_Y___27 = "2700";
const HEIGHT_Y___28 = "2800";
const HEIGHT_Y___29 = "2900";

const HEIGHT_Y___30 = "3000";

const INCLINE___0 = 0.0;
const INCLINE_0_5 = 0.5;
const INCLINE___1 = 1.0;
const INCLINE_1_5 = 1.5;
const INCLINE___2 = 2.0;
const INCLINE_2_5 = 2.5;
const INCLINE___3 = 3.0;

const GET_ABOVE_TILES = 1;

const RECORD_ENEMY_POINTS = "RECORD_ENEMY_POINTS";
const TEST_ENVIRONMENT = "TEST_ENVIRONMENT";
const PROD_ENVIRONMENT = "PROD_ENVIRONMENT";

export {
    ENEMY_VISIBLE,
    ENEMY_HIDDEN,
    MV_START_TRAMPOLINE,
    MV_FALL_TRAMPOLINE,
    MV_RISE_TRAMPOLINE,
    MV_FALL_STEP_OFF,
    HEX_PAIR_DIVIDER,
    RECORD_ENEMY_POINTS,
    TEST_ENVIRONMENT,
    PROD_ENVIRONMENT,
    BREAD_CRUMBS_ON,
    BREAD_CRUMBS_OFF,
    PRINT_ALLOWED,
    RUN_OR_TEST,
    DARK_COLOR,
    LIGHT_COLOR,
    HEXAGON_PART,
    FENCE_PART,
    IS_TRANSPARENT,
    INCLINE___0,
    INCLINE_0_5,
    INCLINE___1,
    INCLINE_1_5,
    INCLINE___2,
    INCLINE_2_5,
    INCLINE___3,
    HEIGHT_Y____0,
    HEIGHT_Y__0_5,
    HEIGHT_Y____1,
    HEIGHT_Y__1_5,
    HEIGHT_Y____2,
    HEIGHT_Y__2_5,
    HEIGHT_Y____3,
    HEIGHT_Y__3_5,
    HEIGHT_Y____4,
    HEIGHT_Y__4_5,
    HEIGHT_Y____5,
    HEIGHT_Y__5_5,
    HEIGHT_Y____6,
    HEIGHT_Y__6_5,
    HEIGHT_Y____7,
    HEIGHT_Y__7_5,
    HEIGHT_Y____8,
    HEIGHT_Y__8_5,
    HEIGHT_Y____9,
    HEIGHT_Y__9_5,
    HEIGHT_Y___10,
    HEIGHT_Y_10_5,
    HEIGHT_Y___11,
    HEIGHT_Y___12,
    HEIGHT_Y___13,
    HEIGHT_Y___14,
    HEIGHT_Y___15,
    HEIGHT_Y___16,
    HEIGHT_Y___17,
    HEIGHT_Y___18,
    HEIGHT_Y___19,
    HEIGHT_Y___20,
    HEIGHT_Y___21,
    HEIGHT_Y___22,
    HEIGHT_Y___23,
    HEIGHT_Y___24,
    HEIGHT_Y___25,
    HEIGHT_Y___26,
    HEIGHT_Y___27,
    HEIGHT_Y___28,
    HEIGHT_Y___29,
    HEIGHT_Y___30,
    MV_FENCE_BLOCKED,
    COL_1,
    COL_2,
    MV_FALL_JUMP_STRAIGHT,
    MV_RISE_JUMP_STRAIGHT,
    MV_TILE_SAME,
    MV_TILE_NEW,
    TEST_TILE_MOVE,
    PHYS_TILE_MOVE,
    FENCE_NN,
    FENCE_SS,
    FENCE_NW,
    FENCE_NE,
    FENCE_SE,
    FENCE_SW,
    TEST_SS,
    TEST_NN,
    TEST_SE,
    TEST_SW,
    TEST_NW,
    TEST_NE,
    TILT_NN90,
    TILT_GLASS,
    TILT_SE90,
    TESTINs_PRINT,
    RUNNINs_NO_PRINT,
    TEST_PASSED,
    TEST_FAILED,
    MOVE_GO,
    MOVE_STOP,
    C______RED,
    C_____BLUE,
    C____GREEN,
    C___YELLOW,
    C___PURPLE,
    C____BROWN,
    C_NONE,
    SQRT_3,
    HEIGHT_ABOVE_WALKWAY,
    DROP_PER_TICK_FLOAT,
    START_XYZ,
    X_INDX,
    Y_INDX,
    Z_INDX,
    TILT_NN,
    TILT_SS,
    TILT_NW,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NONE,
    DIRECTION_NN,
    DIRECTION_SS,
    DIRECTION_NW,
    DIRECTION_NE,
    DIRECTION_SE,
    DIRECTION_SW,
    DIRECTION_NONE,
    START_X_HEX,
    START_Y_HEX,
    START_Z_HEX,
    START_X_LOOK,
    START_Y_LOOK,
    START_Z_LOOK,
    GET_ABOVE_TILES,
    SLOPE_NONE,
    NOT_TRANSPARENT
};
