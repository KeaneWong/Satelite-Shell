export interface StarType{
    x: number,  y: number
}
export type StarListType = {
    [key: string]: StarType
}

export const starList = {
  // THRENODY: {
    "T1": { x: 45, y: 15 },
    "T2": { x: 65, y: 25 },
    "T3": { x: 85, y: 35 },
    "T4": { x: 55, y: 45 },
    "T5": { x: 75, y: 55 },
    "T6": { x: 95, y: 45 },
    "T7": { x: 85, y: 65 },
  // },

  // TALN: {
    "S1": { x: 175, y: 20 },
    "S2": { x: 185, y: 35 },
    "S3": { x: 195, y: 25 },
    "S4": { x: 205, y: 45 },
    "S5": { x: 195, y: 55 },
    "S6": { x: 185, y: 65 },
    "S7": { x: 175, y: 75 },
    "S8": { x: 165, y: 85 },
    "S9": { x: 155, y: 95 },
  // },

  // TALDAIN: {
    "TA1": { x: 25, y: 85 },
    "TA2": { x: 35, y: 95 },
    "TA3": { x: 45, y: 105 },
    "TA4": { x: 55, y: 115 },
    "TA5": { x: 65, y: 125 },
    "TA6": { x: 75, y: 135 },
    "TA7": { x: 85, y: 145 },
    "TA8": { x: 95, y: 135 },
    "TA9": { x: 105, y: 125 },
    "TA10": { x: 115, y: 115 },
  // },

  // SCADRIAL: {
    "SC1": { x: 125, y: 95 },
    "SC2": { x: 135, y: 105 },
    "SC3": { x: 145, y: 115 },
    "SC4": { x: 155, y: 125 },
    "SC5": { x: 165, y: 135 },
  // },

  // ROSHAR: {
    "R1": { x: 45, y: 155 },
    "R2": { x: 55, y: 165 },
    "R3": { x: 65, y: 155 },
    "R4": { x: 75, y: 165 },
    "R5": { x: 85, y: 155 },
  // },

  // NALTHIS: {
    "N1": { x: 115, y: 145 },
    "N2": { x: 125, y: 155 },
    "N3": { x: 135, y: 145 },
    "N4": { x: 145, y: 155 },
    "N5": { x: 155, y: 145 },
  // },

  // FIRST_OF_THE_SUN: {
    "F1": { x: 175, y: 135 },
    "F2": { x: 185, y: 145 },
    "F3": { x: 195, y: 135 },
    "F4": { x: 205, y: 145 },
    "F5": { x: 215, y: 135 },
    "F6": { x: 225, y: 145 },
  // }
};

export type StarPair = [keyof starList, keyof starlist]
export type StarMapType = {
    [key: string]: Array<StarPair>
}

export const starMap = {
  THRENODY: [
    ["T1", "T2"], ["T2", "T3"], ["T3", "T6"], ["T6", "T5"],
    ["T5", "T7"], ["T7", "T4"], ["T4", "T2"], ["T2", "T5"]
  ],

  TALN: [
    ["S1", "S2"], ["S2", "S3"], ["S3", "S4"], ["S4", "S5"],
    ["S5", "S6"], ["S6", "S7"], ["S7", "S8"], ["S8", "S9"],
    ["S2", "S5"], ["S3", "S6"]
  ],

  TALDAIN: [
    ["TA1", "TA2"], ["TA2", "TA3"], ["TA3", "TA4"], ["TA4", "TA5"],
    ["TA5", "TA6"], ["TA6", "TA7"], ["TA7", "TA8"], ["TA8", "TA9"],
    ["TA9", "TA10"], ["TA5", "TA8"], ["TA4", "TA9"]
  ],

  SCADRIAL: [
    ["SC1", "SC2"], ["SC2", "SC3"], ["SC3", "SC4"], ["SC4", "SC5"]
  ],

  ROSHAR: [
    ["R1", "R2"], ["R2", "R3"], ["R3", "R4"], ["R4", "R5"], ["R5", "R1"] // closed loop
  ],

  NALTHIS: [
    ["N1", "N2"], ["N2", "N3"], ["N3", "N4"], ["N4", "N5"],
    ["N1", "N3"], ["N2", "N4"]
  ],

  FIRST_OF_THE_SUN: [
    ["F1", "F2"], ["F2", "F3"], ["F3", "F4"], ["F4", "F5"],
    ["F5", "F6"], ["F1", "F3"], ["F2", "F4"]
  ]
};

