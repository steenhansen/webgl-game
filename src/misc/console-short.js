// 2 hex-routines.js  and console-short.js

/*
cons ole.log("hexPoints unknown  up_direction==", up_direction);
 ee("hexPoints unknown  up_direction==", up_direction);
 */

const ee = (...args) => {
    const prefix = `SYSTEM ERROR :`;
    if (typeof args[0] === "string") {
        args[0] = `${prefix} ${args[0]}`;
    } else {
        args.unshift(prefix);
    }
    window["con" + "sole"].log(...args);
};

/*
cons ole.log(`TEST allowed NW :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
tt(`allowed NW :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
*/
const tt = (...args) => {
    const prefix = `TEST `;
    if (typeof args[0] === "string") {
        args[0] = `${prefix} ${args[0]}`;
    } else {
        args.unshift(prefix);
    }
    window["con" + "sole"].log(...args);
};

const TT = tt;
const EE = ee;
export { ee, tt, EE, TT };
