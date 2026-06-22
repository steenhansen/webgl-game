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
cons ole.log(`TEST allowed NW :: ${RUN_OR_TEST} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
t t(`allowed NW :: ${RUN_OR_TEST} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
*/
const tt = (...args) => {
    let max_prints = 100;
    if (window.HEX_VARS == undefined) {
        max_prints = 100;
    } else {
        max_prints = window.HEX_VARS.MAX_PRINTS;
        max_prints--;
        window.HEX_VARS.MAX_PRINTS = max_prints;
    }

    if (max_prints > 0) {
        //        const tt_prefix = `TT ${max_prints} \\`;
        const tt_prefix = `TT \\`;
        if (typeof args[0] === "string") {
            args[0] = `${tt_prefix} ${args[0]}`;
        } else {
            args.unshift(tt_prefix);
        }
        window["con" + "sole"].log(...args);
    }
};

const TT = tt;
const EE = ee;
export { ee, tt, EE, TT };
