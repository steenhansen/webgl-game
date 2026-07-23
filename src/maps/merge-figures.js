import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

function combineFigures(zee_name, figure_list) {
    const all_figures = {
        FIGURE__NAME: zee_name,
        WALKWAY__LOCS: [],
        FENCE__LOCS: [],
        TRAMPOLINE__LOCS: [],
        ENEMY__LOCS: {}
    };
    for (const a_figure of figure_list) {
        let { FIGURE__NAME, WALKWAY__LOCS, FENCE__LOCS, TRAMPOLINE__LOCS, ENEMY__LOCS } = a_figure;
        if (WALKWAY__LOCS) {
            for (const a_tile of WALKWAY__LOCS) {
                a_tile[0] = parseInt(a_tile[0]);
                a_tile[1] = parseInt(a_tile[1]);
                a_tile[2] = parseInt(a_tile[2]);
                all_figures.WALKWAY__LOCS.push(a_tile);
            }
        }
        if (FENCE__LOCS) {
            all_figures.FENCE__LOCS.push(...FENCE__LOCS);
        }
        if (TRAMPOLINE__LOCS) {
            all_figures.TRAMPOLINE__LOCS.push(...TRAMPOLINE__LOCS);
        }
        if (ENEMY__LOCS) {
            for (const [key, value] of Object.entries(ENEMY__LOCS)) {
                all_figures.ENEMY__LOCS[key] = value;
            }
        }
    }
    return all_figures;
}

export { combineFigures };
