// InstancedMesh in Three.js   water_hex

//object.visible = false; //Invisible
//object.visible = true;  //Visible

// ocean has no angles, just veritcal difference
// {'2~3_a' : y==-1 , mesh}     this one never hides, shows
// {'2~3_b' : y==0 , mesh }          hide hide for low
// {'2~3_c' : y==1 , mesh }   hide for normal  show for high

// waves has all directions and leans
// { '2~3,se-7' : mesh}

// ochestra
// 0 : show: '2~3,nn-7', '2~3,ss-7'...
//     hide: '19~19,se-6', `19~18,ne-6'       // the outermost ones

// 1 : show: '2~3,se-7', '2~3,ne-7'...
//     hide: '1~1,se-6', `1~2,ne-6'           // the previouse ones

//Eagle catchs salmon in the waves, and carries it back to her nest.

// const contacts = new Map();
// contacts.set("Jessie", { phone: "213-555-1234", address: "123 N 1st Ave" });

// const cars = [
//   { make: "Toyota", model: "Corolla", year: 2022 },
//   { make: "Tesla", model: "Model 3", year: 2021 },
//   { make: "Ford", model: "Mustang", year: 1969 }
// ];

/////////////////////////////////////////

// BLACK HEXAGONS
const WAVE_1_BASE = ["+00~-01,NN:", "+01~-01,NE:", "+01~+00,SE:", "+00~+01,SS:", "-01~+01,SW:", "-01~+00,NW:"];

const WAVE_1_0 = WAVE_1_BASE.map((w_name) => w_name + "0");
const WAVE_1_1 = WAVE_1_BASE.map((w_name) => w_name + "1");
const WAVE_1_2 = WAVE_1_BASE.map((w_name) => w_name + "2");
const WAVE_1_3 = WAVE_1_BASE.map((w_name) => w_name + "3");
const WAVE_1_4 = WAVE_1_BASE.map((w_name) => w_name + "4");
const WAVE_1_5 = WAVE_1_BASE.map((w_name) => w_name + "5");
const WAVE_1_6 = WAVE_1_BASE.map((w_name) => w_name + "6");
const WAVE_1_7 = WAVE_1_BASE.map((w_name) => w_name + "7");

// RED HEXAGONS
const WAVE_2_BASE = [
    "+00~-02,NN:",
    "+01~-02,NE:",
    "+02~-02,NE:",
    "+02~-01,SE:",
    "+02~+00,SE:",
    "+01~+01,SE:",
    "+00~+02,SS:",
    "-01~+02,SW:",
    "-02~+02,SW:",
    "-02~+01,NW:",
    "-02~+00,NW:",
    "-01~-01,NW:"
];

const WAVE_2_0 = WAVE_2_BASE.map((w_name) => w_name + "0");
const WAVE_2_1 = WAVE_2_BASE.map((w_name) => w_name + "1");
const WAVE_2_2 = WAVE_2_BASE.map((w_name) => w_name + "2");
const WAVE_2_3 = WAVE_2_BASE.map((w_name) => w_name + "3");
const WAVE_2_4 = WAVE_2_BASE.map((w_name) => w_name + "4");
const WAVE_2_5 = WAVE_2_BASE.map((w_name) => w_name + "5");
const WAVE_2_6 = WAVE_2_BASE.map((w_name) => w_name + "6");
const WAVE_2_7 = WAVE_2_BASE.map((w_name) => w_name + "7");

// LIGHT BLUE HEXAGONS
const WAVE_3_BASE = [
    "+00~-03,NN:",
    "+01~-03,NN:",
    "+02~-03,NE:",
    "+03~-03,NE:",
    "+03~-02,NE:",
    "+03~-01,SE:",
    "+03~+00,SE:",
    "+02~+01,SE:",
    "+01~+02,SS:",
    "+00~+03,SS:",
    "-01~+03,SS:",
    "-02~+03,SW:",
    "-03~+03,SW:",
    "-03~+02,SW:",
    "-03~+01,NW:",
    "-03~+00,NW:",
    "-02~-01,NW:",
    "-01~-02,NN:"
];

const WAVE_3_0 = WAVE_3_BASE.map((w_name) => w_name + "0");
const WAVE_3_1 = WAVE_3_BASE.map((w_name) => w_name + "1");
const WAVE_3_2 = WAVE_3_BASE.map((w_name) => w_name + "2");
const WAVE_3_3 = WAVE_3_BASE.map((w_name) => w_name + "3");
const WAVE_3_4 = WAVE_3_BASE.map((w_name) => w_name + "4");
const WAVE_3_5 = WAVE_3_BASE.map((w_name) => w_name + "5");
const WAVE_3_6 = WAVE_3_BASE.map((w_name) => w_name + "6");
const WAVE_3_7 = WAVE_3_BASE.map((w_name) => w_name + "7");

// LIGHT GREEN HEXAGONS
const WAVE_4_BASE = [
    "+00~-04,NN:",
    "+01~-04,NN:",
    "+02~-04,NN:",

    "+03~-04,NE:",
    "+04~-04,NE:",
    "+04~-03,NE:",
    "+04~-02,NE:",

    "+04~-01,SE:",
    "+04~+00,SE:",
    "+03~+01,SE:",

    "+02~+02,SS:",
    "+01~+03,SS:",
    "+00~+04,SS:",
    "-01~+04,SS:",
    "-02~+04,SS:",

    "-03~+04,SW:",
    "-04~+04,SW:",
    "-04~+03,SW:",
    "-04~+02,SW:",

    "-04~+01,NW:",
    "-04~+00,NW:",
    "-03~-01,NW:",

    "-02~-02,NW:",
    "-01~-03,NW:"
];

const WAVE_4_0 = WAVE_4_BASE.map((w_name) => w_name + "0");
const WAVE_4_1 = WAVE_4_BASE.map((w_name) => w_name + "1");
const WAVE_4_2 = WAVE_4_BASE.map((w_name) => w_name + "2");
const WAVE_4_3 = WAVE_4_BASE.map((w_name) => w_name + "3");
const WAVE_4_4 = WAVE_4_BASE.map((w_name) => w_name + "4");
const WAVE_4_5 = WAVE_4_BASE.map((w_name) => w_name + "5");
const WAVE_4_6 = WAVE_4_BASE.map((w_name) => w_name + "6");
const WAVE_4_7 = WAVE_4_BASE.map((w_name) => w_name + "7");

// PURPLE HEXAGONS
const WAVE_5_BASE = [
    "+00~-05,NN:",
    "+01~-05,NN:",
    "+02~-05,NN:",

    "+03~-05,NE:",
    "+04~-05,NE:",
    "+05~-05,NE:",
    "+05~-04,NE:",
    "+05~-03,NE:",

    "+05~-02,SE:",
    "+05~-01,SE:",
    "+05~+00,SE:",
    "+04~+01,SE:",
    "+03~+02,SE:",

    "+02~+03,SS:",
    "+01~+04,SS:",
    "+00~+05,SS:",
    "-01~+05,SS:",
    "-02~+05,SS:",

    "-03~+05,SW:",
    "-04~+05,SW:",
    "-05~+05,SW:",
    "-05~+04,SW:",
    "-05~+03,SW:",

    "-05~+02,NW:",
    "-05~+01,NW:",
    "-05~+00,NW:",
    "-04~-01,NW:",
    "-03~-02,NW:",

    "-02~-03,NN:",
    "-01~-04,NN:"
];

const WAVE_5_0 = WAVE_5_BASE.map((w_name) => w_name + "0");
const WAVE_5_1 = WAVE_5_BASE.map((w_name) => w_name + "1");
const WAVE_5_2 = WAVE_5_BASE.map((w_name) => w_name + "2");
const WAVE_5_3 = WAVE_5_BASE.map((w_name) => w_name + "3");
const WAVE_5_4 = WAVE_5_BASE.map((w_name) => w_name + "4");
const WAVE_5_5 = WAVE_5_BASE.map((w_name) => w_name + "5");
const WAVE_5_6 = WAVE_5_BASE.map((w_name) => w_name + "6");
const WAVE_5_7 = WAVE_5_BASE.map((w_name) => w_name + "7");

// yellow HEXAGONS
const WAVE_6_BASE = [
    "+00~-06,NN:",
    "+01~-06,NN:",
    "+02~-06,NN:",
    "+03~-06,NN:",

    "+04~-06,NE:",
    "+05~-06,NE:",
    "+06~-06,NE:",
    "+06~-05,NE:",
    "+06~-04,NE:",
    "+06~-03,NE:",

    "+06~-02,SE:",
    "+06~-01,SE:",
    "+06~+00,SE:",
    "+05~+01,SE:",
    "+04~+02,SE:",
    "+03~+03,SE:",

    "+02~+04,SS:",
    "+01~+05,SS:",
    "+00~+06,SS:",
    "-01~+06,SS:",
    "-02~+06,SS:",
    "-03~+06,SS:",

    "-04~+06,SW:",
    "-05~+06,SW:",
    "-06~+06,SW:",
    "-06~+05,SW:",
    "-06~+04,SW:",
    "-06~+03,SW:",

    "-06~+02,NW:",
    "-06~+01,NW:",
    "-06~+00,NW:",
    "-05~-01,NW:",
    "-04~-02,NW:",
    "-03~-03,NW:",

    "-02~-04,NN:",
    "-01~-05,NN:"
];

const WAVE_6_0 = WAVE_6_BASE.map((w_name) => w_name + "0");
const WAVE_6_1 = WAVE_6_BASE.map((w_name) => w_name + "1");
const WAVE_6_2 = WAVE_6_BASE.map((w_name) => w_name + "2");
const WAVE_6_3 = WAVE_6_BASE.map((w_name) => w_name + "3");
const WAVE_6_4 = WAVE_6_BASE.map((w_name) => w_name + "4");
const WAVE_6_5 = WAVE_6_BASE.map((w_name) => w_name + "5");
const WAVE_6_6 = WAVE_6_BASE.map((w_name) => w_name + "6");
const WAVE_6_7 = WAVE_6_BASE.map((w_name) => w_name + "7");

const WAVES_1 = [WAVE_1_0, WAVE_1_1, WAVE_1_2, WAVE_1_3, WAVE_1_4, WAVE_1_5, WAVE_1_6, WAVE_1_7];
const WAVES_2 = [WAVE_2_0, WAVE_2_1, WAVE_2_2, WAVE_2_3, WAVE_2_4, WAVE_2_5, WAVE_2_6, WAVE_2_7];
const WAVES_3 = [WAVE_2_0, WAVE_2_1, WAVE_2_2, WAVE_2_3, WAVE_2_4, WAVE_2_5, WAVE_2_6, WAVE_2_7];
const WAVES_4 = [WAVE_3_0, WAVE_3_1, WAVE_3_2, WAVE_3_3, WAVE_3_4, WAVE_3_5, WAVE_3_6, WAVE_3_7];
const WAVES_5 = [WAVE_4_0, WAVE_4_1, WAVE_4_2, WAVE_4_3, WAVE_4_4, WAVE_4_5, WAVE_4_6, WAVE_4_7];
const WAVES_6 = [WAVE_5_0, WAVE_5_1, WAVE_5_2, WAVE_5_3, WAVE_5_4, WAVE_5_5, WAVE_5_6, WAVE_5_7];
const WAVES_7 = [WAVE_6_0, WAVE_6_1, WAVE_6_2, WAVE_6_3, WAVE_6_4, WAVE_6_5, WAVE_6_6, WAVE_6_7];

const WAVES_SHOW = [...WAVES_1, ...WAVES_2, ...WAVES_3, ...WAVES_4, ...WAVES_5, ...WAVES_6, ...WAVES_7];

//      '+00~-01,NN:0'

// function offsetWaves(x_offset, z_offset) {
//     var moved_waves = [];
//     for (let i = 0; i < WAVES_SHOW.length; i++) {
//         // for (let i = 0; i < 2; i++) {
//         const a_wave = WAVES_SHOW[i];
//         var wave_set = [];
//         for (let j = 0; j < a_wave.length; j++) {
//             //for (let j = 0; j < 2; j++) {
//             const w_name = a_wave[j];
//             const [xz_coord, tilt_angle] = w_name.split(",");
//             const [x_origin_str, z_origin_str] = xz_coord.split("~");
//             const x_int = parseInt(x_origin_str);
//             const z_int = parseInt(z_origin_str);
//             const x_moved = x_int + x_offset;
//             const z_moved = z_int + z_offset;
//             const moved_zx = `${x_moved}~${z_moved}`;
//             const new_wave = moved_zx + "," + tilt_angle;
//             wave_set.push(new_wave);
//         }
//         moved_waves.push(wave_set);
//     }
//     return moved_waves;
// }

// function makeWave(x_offset, z_offset) {
//     var wave_index = 0;
//     var last_waves = [];
//     const WAVES_MOVED = offsetWaves(x_offset, z_offset);

//     function doWaves() {
//         //console.log("turn off these waves", last_waves);
//         last_waves = WAVES_MOVED[wave_index];
//         let current_waves = WAVES_MOVED[wave_index];
//         if (wave_index >= WAVES_MOVED.length) {
//             wave_index = 0;
//         } else {
//             wave_index++;
//         }
//         // console.log("turn on these waves", current_waves);
//         // console.log("new index", wave_index);
//     }

//     return doWaves;
// }

//export { makeWave };
