const HEIGHT_ABOVE_WALKWAY = 0.0;

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

const MOVE_NN = "MOVE_NN";
const MOVE_SS = "MOVE_SS";
const MOVE_NW = "MOVE_NW";
const MOVE_NE = "MOVE_NE";
const MOVE_SE = "MOVE_SE";

const MOVE_SW = "MOVE_SW";
const MOVE_NO = "MOVE_NO";

const TILT_NN = "TILT_NN";
const TILT_NN90 = "TILT_NN90";

const WALL_NN = "WALL_NN";
const WALL_SS = "WALL_SS";
const WALL_NW = "WALL_NW";
const WALL_NE = "WALL_NE";
const WALL_SE = "WALL_SE";
const WALL_SW = "WALL_SW";

const TILT_SS = "TILT_SS";
const TILT_NW = "TILT_NW";
const TILT_NE = "TILT_NE";
const TILT_SE = "TILT_SE";
const TILT_SW = "TILT_SW";
const TILT_NONE = "TILT_NONE";
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

const TESTING_PRINT = "TESTING_PRINT"; // print_moves
const RUNNING_NO_PRINT = "RUNNING_NO_PRINT"; // hide_moves

const ON_NO_TILE = "ON_NO_TILE"; //  kill
const ON_OLD_TILE = "ON_OLD_TILE"; // kill tile_blocked
const ON_NEW_TILE = "ON_NEW_TILE"; // kill tile_allowed

const TEST_TILE_MOVE = "TEST_TILE_MOVE";
const PHYS_TILE_MOVE = "PHYS_TILE_MOVE";

const MOVE_SAME_TILE = "MOVE_SAME_TILE";
const MOVE_NEW_TILE = "MOVE_NEW_TILE";
const MOVE_BLOCKED = "MOVE_BLOCKED";

const MOVE_FALLING = "MOVE_FALLING";
const MOVE_RISING = "MOVE_RISING";

export {
    MOVE_BLOCKED,
    COL_1,
    COL_2,
    MOVE_FALLING,
    MOVE_SAME_TILE,
    MOVE_NEW_TILE,
    TEST_TILE_MOVE,
    PHYS_TILE_MOVE,
    ON_NO_TILE,
    ON_OLD_TILE,
    ON_NEW_TILE,
    WALL_NN,
    WALL_SS,
    WALL_NW,
    WALL_NE,
    WALL_SE,
    WALL_SW,
    TEST_SS,
    TEST_NN,
    TEST_SE,
    TEST_SW,
    TEST_NW,
    TEST_NE,
    TILT_NN90,
    TILT_SE90,
    TESTING_PRINT,
    RUNNING_NO_PRINT,
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
    MOVE_NN,
    MOVE_SS,
    MOVE_NW,
    MOVE_NE,
    MOVE_SE,
    MOVE_SW,
    MOVE_NO,
    START_X_HEX,
    START_Y_HEX,
    START_Z_HEX,
    START_X_LOOK,
    START_Y_LOOK,
    START_Z_LOOK
};
