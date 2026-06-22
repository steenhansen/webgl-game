import { ee, tt, EE, TT } from "../misc/console-short.js";

const JUMP_RISE_STEP_SIZE = 25;
const JUMP_FALL_STEP_SIZE = 25;
const JUMP_ITERATIONS = 21; /// must be in 10s

const TRAMPOLINE_RISE_SPEED = 5;
const TRAMPOLINE_FALL_SPEED = 5;
const TRAMPOLINE_ITERATIONS = 51;

const X_Z_2D_INCREMENT = 4; // 10 FAST, 2 SLOW

const VERTICAL_INCREMENT = 5; // Y_VERITCAL_INCREMENT

const RISE_Y_ADD = VERTICAL_INCREMENT * 1;

const FALL_Y_SUB = VERTICAL_INCREMENT * 1;

const RISE_XZ_SPEED_SLOW = 25;

const RISE_NN_Z_DIFF = +1 / RISE_XZ_SPEED_SLOW; ///0.25;
const RISE_SS_Z_DIFF = -1 / RISE_XZ_SPEED_SLOW; ///0.25;

if (JUMP_RISE_STEP_SIZE % 5 != 0) {
    ee("JUMP RISE size must be in units of 5, not ", JUMP_RISE_STEP_SIZE);
}
if (JUMP_FALL_STEP_SIZE % 5 != 0) {
    ee("JUMP FALL size must be in units of 5, not ", JUMP_FALL_STEP_SIZE);
}

if (TRAMPOLINE_RISE_SPEED % 5 != 0) {
    ee("TRAMPOLINE RISE size must be in units of 5, not ", TRAMPOLINE_RISE_SPEED);
}
if (TRAMPOLINE_FALL_SPEED % 5 != 0) {
    ee("TRAMPOLINE FALL size must be in units of 5, not ", TRAMPOLINE_FALL_SPEED);
}

const HOR_JUMP_MULTIPLIER = 2;
export {
    HOR_JUMP_MULTIPLIER,
    TRAMPOLINE_ITERATIONS,
    RISE_XZ_SPEED_SLOW,
    RISE_NN_Z_DIFF,
    RISE_SS_Z_DIFF,
    X_Z_2D_INCREMENT,
    RISE_Y_ADD,
    FALL_Y_SUB,
    JUMP_ITERATIONS,
    JUMP_RISE_STEP_SIZE,
    JUMP_FALL_STEP_SIZE,
    TRAMPOLINE_RISE_SPEED,
    TRAMPOLINE_FALL_SPEED
};
