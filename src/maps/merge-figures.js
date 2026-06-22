import { ee, tt, EE, TT } from "../misc/console-short.js";

function translateAllFigures(maps_figures) {
    const trie_map = {
        walkway_locs: [],
        fence_locs: [],
        trampoline_locs: [],
        pentagon_locs: []
    };

    for (const a_trie of maps_figures) {
        let { walkway_locs, fence_locs, trampoline_locs, pentagon_locs } = a_trie;
        if (walkway_locs) {
            trie_map.walkway_locs.push(...walkway_locs);
        }
        if (fence_locs) {
            trie_map.fence_locs.push(...fence_locs);
        }
        if (trampoline_locs) {
            trie_map.trampoline_locs.push(...trampoline_locs);
        }
        if (pentagon_locs) {
            trie_map.pentagon_locs.push(...pentagon_locs);
        }
    }
    return trie_map;
}

export { translateAllFigures };
