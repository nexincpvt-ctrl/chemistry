const atomColors = {"H":14737632,"D":16766287,"O":16729943,"M":3621626,"Li":10233776,"Na":6765239,"Ca":4149685,"Mg":2201331,"C":2962486,"N":623843,"F":52937,"B":16632686,"S":15792399,"Cl":3394611};
const atomRadii = {"H":0.35,"D":0.35,"O":0.45,"M":0.65,"Li":0.6,"Na":0.65,"Ca":0.7,"Mg":0.65,"C":0.5,"N":0.45,"F":0.4,"B":0.55,"S":0.6,"Cl":0.55};
const compoundData = {
  "H2": {
    "sym": "H₂",
    "name": "DIHYDROGEN",
    "hybrid": "s-s",
    "geom": "Linear",
    "struct": "Covalent",
    "desc": "Lightest molecule.",
    "vis2D": "H-H",
    "atoms": [
      {
        "element": "H",
        "x": -0.4,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.4,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      }
    ]
  },
  "H2O": {
    "sym": "H₂O",
    "name": "WATER",
    "hybrid": "sp³",
    "geom": "Bent",
    "struct": "Covalent (Polar)",
    "desc": "Universal solvent.",
    "vis2D": "H-O-H",
    "atoms": [
      {
        "element": "O",
        "x": 0,
        "y": 0.2,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.76,
        "y": -0.38,
        "z": 0
      },
      {
        "element": "H",
        "x": -0.76,
        "y": -0.38,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      }
    ],
    "hasAngle": true,
    "angleData": {
      "nodes": [
        1,
        0,
        2
      ],
      "text": "104.5°"
    },
    "hasLP": true,
    "lps": [
      {
        "x": 0,
        "y": 0.6,
        "z": 0.4,
        "rx": 0.5,
        "rz": 0
      },
      {
        "x": 0,
        "y": 0.6,
        "z": -0.4,
        "rx": -0.5,
        "rz": 0
      }
    ]
  },
  "D2O": {
    "sym": "D₂O",
    "name": "HEAVY WATER",
    "hybrid": "sp³",
    "geom": "Bent",
    "struct": "Covalent",
    "desc": "Used in reactors.",
    "vis2D": "D-O-D",
    "atoms": [
      {
        "element": "O",
        "x": 0,
        "y": 0.2,
        "z": 0
      },
      {
        "element": "D",
        "x": 0.76,
        "y": -0.38,
        "z": 0
      },
      {
        "element": "D",
        "x": -0.76,
        "y": -0.38,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      }
    ],
    "hasAngle": true,
    "angleData": {
      "nodes": [
        1,
        0,
        2
      ],
      "text": "104.5°"
    }
  },
  "H2O2": {
    "sym": "H₂O₂",
    "name": "PEROXIDE",
    "hybrid": "sp³",
    "geom": "Open Book",
    "struct": "Non-planar",
    "desc": "Oxidizing agent.",
    "vis2D": "H-O-O-H",
    "atoms": [
      {
        "element": "O",
        "x": -0.7,
        "y": 0.4,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.7,
        "y": 0.4,
        "z": 0
      },
      {
        "element": "H",
        "x": -0.9,
        "y": -0.4,
        "z": 0.5
      },
      {
        "element": "H",
        "x": 0.9,
        "y": -0.4,
        "z": -0.5
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          3
        ],
        "order": 1
      }
    ],
    "hasAngle": true,
    "angleData": {
      "nodes": [
        2,
        0,
        1
      ],
      "text": "94.8°"
    }
  },
  "LiH": {
    "sym": "LiH",
    "name": "LITHIUM HYDRIDE",
    "hybrid": "None",
    "geom": "Linear",
    "struct": "Ionic",
    "desc": "Alkali metal hydride.",
    "vis2D": "<div style=\"display:flex; align-items:center; gap: 30px; font-family:Fraunces,serif; font-size: 32px; font-weight:600; color:var(--ink);\"><div>Li<sup style=\"color:var(--verm); font-size:20px; font-weight:bold;\">+</sup></div><div style=\"position:relative; display:flex; align-items:center;\"><div style=\"border-left: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-right:12px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center;\"><span style=\"line-height:1; letter-spacing:4px; font-size:24px; margin-bottom:-5px;\">..</span><span>H</span></div><div style=\"border-right: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-left:12px;\"></div><sup style=\"position:absolute; right:-15px; top:-5px; color:var(--verm); font-size:18px; font-weight:bold;\">-</sup></div></div>",
    "atoms": [
      {
        "element": "Li",
        "x": -0.6,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.6,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      }
    ]
  },
  "NaH": {
    "sym": "NaH",
    "name": "SODIUM HYDRIDE",
    "hybrid": "None",
    "geom": "Linear",
    "struct": "Ionic",
    "desc": "Used as a strong base.",
    "vis2D": "<div style=\"display:flex; align-items:center; gap: 30px; font-family:Fraunces,serif; font-size: 32px; font-weight:600; color:var(--ink);\"><div>Na<sup style=\"color:var(--verm); font-size:20px; font-weight:bold;\">+</sup></div><div style=\"position:relative; display:flex; align-items:center;\"><div style=\"border-left: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-right:12px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center;\"><span style=\"line-height:1; letter-spacing:4px; font-size:24px; margin-bottom:-5px;\">..</span><span>H</span></div><div style=\"border-right: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-left:12px;\"></div><sup style=\"position:absolute; right:-15px; top:-5px; color:var(--verm); font-size:18px; font-weight:bold;\">-</sup></div></div>",
    "atoms": [
      {
        "element": "Na",
        "x": -0.7,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.7,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      }
    ]
  },
  "CaH2": {
    "sym": "CaH₂",
    "name": "CALCIUM HYDRIDE",
    "hybrid": "None",
    "geom": "Linear",
    "struct": "Ionic",
    "desc": "Alkaline earth hydride.",
    "vis2D": "<div style=\"display:flex; align-items:center; gap: 30px; font-family:Fraunces,serif; font-size: 32px; font-weight:600; color:var(--ink);\"><div style=\"position:relative; display:flex; align-items:center;\"><div style=\"border-left: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-right:12px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center;\"><span style=\"line-height:1; letter-spacing:4px; font-size:24px; margin-bottom:-5px;\">..</span><span>H</span></div><div style=\"border-right: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-left:12px;\"></div><sup style=\"position:absolute; right:-15px; top:-5px; color:var(--verm); font-size:18px; font-weight:bold;\">-</sup></div><div>Ca<sup style=\"color:var(--verm); font-size:20px; font-weight:bold;\">2+</sup></div><div style=\"position:relative; display:flex; align-items:center;\"><div style=\"border-left: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-right:12px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center;\"><span style=\"line-height:1; letter-spacing:4px; font-size:24px; margin-bottom:-5px;\">..</span><span>H</span></div><div style=\"border-right: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-left:12px;\"></div><sup style=\"position:absolute; right:-15px; top:-5px; color:var(--verm); font-size:18px; font-weight:bold;\">-</sup></div></div>",
    "atoms": [
      {
        "element": "Ca",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": -1,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 1,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      }
    ]
  },
  "MgH2": {
    "sym": "MgH₂",
    "name": "MAGNESIUM HYDRIDE",
    "hybrid": "None",
    "geom": "Linear",
    "struct": "Ionic/Covalent",
    "desc": "Hydrogen storage material.",
    "vis2D": "<div style=\"display:flex; align-items:center; gap: 30px; font-family:Fraunces,serif; font-size: 32px; font-weight:600; color:var(--ink);\"><div style=\"position:relative; display:flex; align-items:center;\"><div style=\"border-left: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-right:12px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center;\"><span style=\"line-height:1; letter-spacing:4px; font-size:24px; margin-bottom:-5px;\">..</span><span>H</span></div><div style=\"border-right: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-left:12px;\"></div><sup style=\"position:absolute; right:-15px; top:-5px; color:var(--verm); font-size:18px; font-weight:bold;\">-</sup></div><div>Mg<sup style=\"color:var(--verm); font-size:20px; font-weight:bold;\">2+</sup></div><div style=\"position:relative; display:flex; align-items:center;\"><div style=\"border-left: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-right:12px;\"></div><div style=\"display:flex; flex-direction:column; align-items:center;\"><span style=\"line-height:1; letter-spacing:4px; font-size:24px; margin-bottom:-5px;\">..</span><span>H</span></div><div style=\"border-right: 2px solid var(--ink); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); width: 8px; height: 55px; margin-left:12px;\"></div><sup style=\"position:absolute; right:-15px; top:-5px; color:var(--verm); font-size:18px; font-weight:bold;\">-</sup></div></div>",
    "atoms": [
      {
        "element": "Mg",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": -1,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 1,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      }
    ]
  },
  "CH4": {
    "hasAngle": true,
    "angleData": {
      "nodes": [
        1,
        0,
        2
      ],
      "text": "109.5°"
    },
    "sym": "CH₄",
    "name": "METHANE",
    "hybrid": "sp³",
    "geom": "Tetrahedral",
    "struct": "Covalent",
    "desc": "Simplest alkane.",
    "vis2D": "CH4",
    "atoms": [
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.6,
        "y": 0.6,
        "z": 0.6
      },
      {
        "element": "H",
        "x": -0.6,
        "y": -0.6,
        "z": 0.6
      },
      {
        "element": "H",
        "x": 0.6,
        "y": -0.6,
        "z": -0.6
      },
      {
        "element": "H",
        "x": -0.6,
        "y": 0.6,
        "z": -0.6
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          3
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          4
        ],
        "order": 1
      }
    ],
    "hasLP": false
  },
  "NH3": {
    "hasAngle": true,
    "hasLP": true,
    "angleData": {
      "nodes": [
        1,
        0,
        2
      ],
      "text": "107°"
    },
    "lps": [
      {
        "x": 0,
        "y": 0.8,
        "z": 0,
        "rx": 0,
        "rz": 0
      }
    ],
    "sym": "NH₃",
    "name": "AMMONIA",
    "hybrid": "sp³",
    "geom": "Trigonal Pyramidal",
    "struct": "Covalent",
    "desc": "Pungent gas, fertilizer base.",
    "vis2D": "NH3",
    "atoms": [
      {
        "element": "N",
        "x": 0,
        "y": 0.3,
        "z": 0
      },
      {
        "element": "H",
        "x": 0,
        "y": -0.4,
        "z": 0.8
      },
      {
        "element": "H",
        "x": 0.7,
        "y": -0.4,
        "z": -0.4
      },
      {
        "element": "H",
        "x": -0.7,
        "y": -0.4,
        "z": -0.4
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          3
        ],
        "order": 1
      }
    ]
  },
  "HF": {
    "sym": "HF",
    "name": "HYDROGEN FLUORIDE",
    "hybrid": "sp³",
    "geom": "Linear",
    "struct": "Covalent (Polar)",
    "desc": "Forms strong hydrogen bonds.",
    "vis2D": "H-F",
    "atoms": [
      {
        "element": "H",
        "x": -0.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "F",
        "x": 0.5,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      }
    ],
    "hasAngle": false,
    "hasLP": true,
    "lps": [
      {
        "x": 0.8,
        "y": 0.4,
        "z": 0,
        "rx": 0,
        "rz": -0.5
      },
      {
        "x": 0.8,
        "y": -0.4,
        "z": 0,
        "rx": 0,
        "rz": 0.5
      },
      {
        "x": 0.8,
        "y": 0,
        "z": 0.4,
        "rx": 0.5,
        "rz": 0
      }
    ]
  },
  "B2H6": {
    "sym": "B₂H₆",
    "name": "DIBORANE",
    "hybrid": "sp³",
    "geom": "Bridged",
    "struct": "Electron-deficient",
    "desc": "Has 3-center-2-electron bonds.",
    "vis2D": "B2H6",
    "atoms": [
      {
        "element": "B",
        "x": -0.8,
        "y": 0,
        "z": 0
      },
      {
        "element": "B",
        "x": 0.8,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 0,
        "y": 0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": 0,
        "y": -0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": -1.4,
        "y": 0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": -1.4,
        "y": -0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": 1.4,
        "y": 0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": 1.4,
        "y": -0.8,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          3
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          3
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          4
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          5
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          6
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          7
        ],
        "order": 1
      }
    ],
    "hasAngle": true,
    "angleData": {
      "nodes": [
        2,
        0,
        3
      ],
      "text": "97°"
    }
  },
  "H3O+": {
    "sym": "H₃O⁺",
    "name": "HYDRONIUM",
    "hybrid": "sp³",
    "geom": "Trigonal Pyramidal",
    "struct": "Ion",
    "desc": "Protonated water.",
    "vis2D": "H3O+",
    "atoms": [
      {
        "element": "O",
        "x": 0,
        "y": 0.2,
        "z": 0
      },
      {
        "element": "H",
        "x": 0,
        "y": -0.5,
        "z": 0.8
      },
      {
        "element": "H",
        "x": 0.7,
        "y": -0.5,
        "z": -0.4
      },
      {
        "element": "H",
        "x": -0.7,
        "y": -0.5,
        "z": -0.4
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          3
        ],
        "order": 1
      }
    ],
    "hasAngle": true,
    "angleData": {
      "nodes": [
        1,
        0,
        2
      ],
      "text": "113°"
    }
  },
  "OH-": {
    "sym": "OH⁻",
    "name": "HYDROXIDE",
    "hybrid": "sp³",
    "geom": "Linear",
    "struct": "Ion",
    "desc": "Base ion.",
    "vis2D": "O-H",
    "atoms": [
      {
        "element": "O",
        "x": -0.4,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.4,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      }
    ]
  },
  "C2H4": {
    "hasAngle": true,
    "angleData": {
      "nodes": [
        2,
        0,
        1
      ],
      "text": "120°"
    },
    "sym": "C₂H₄",
    "name": "ETHENE",
    "hybrid": "sp²",
    "geom": "Planar",
    "struct": "Covalent",
    "desc": "Simplest alkene.",
    "vis2D": "CH2=CH2",
    "atoms": [
      {
        "element": "C",
        "x": -0.6,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0.6,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": -1.2,
        "y": 0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": -1.2,
        "y": -0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": 1.2,
        "y": 0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": 1.2,
        "y": -0.8,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 2
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          3
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          4
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          5
        ],
        "order": 1
      }
    ]
  },
  "C2H2": {
    "hasAngle": true,
    "angleData": {
      "nodes": [
        2,
        0,
        1
      ],
      "text": "180°"
    },
    "sym": "C₂H₂",
    "name": "ETHYNE",
    "hybrid": "sp",
    "geom": "Linear",
    "struct": "Covalent",
    "desc": "Simplest alkyne.",
    "vis2D": "CH≡CH",
    "atoms": [
      {
        "element": "C",
        "x": -0.6,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0.6,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": -1.4,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 1.4,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 3
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          3
        ],
        "order": 1
      }
    ]
  },
  "CH3OH": {
    "sym": "CH₃OH",
    "name": "METHANOL",
    "hybrid": "sp³",
    "geom": "Tetrahedral C",
    "struct": "Alcohol",
    "desc": "Wood alcohol.",
    "vis2D": "CH3-OH",
    "atoms": [
      {
        "element": "C",
        "x": -0.5,
        "y": -0.2,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.7,
        "y": -0.2,
        "z": 0
      },
      {
        "element": "H",
        "x": -0.5,
        "y": 0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": -1,
        "y": -0.7,
        "z": 0.7
      },
      {
        "element": "H",
        "x": -1,
        "y": -0.7,
        "z": -0.7
      },
      {
        "element": "H",
        "x": 1.2,
        "y": 0.5,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          3
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          4
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          5
        ],
        "order": 1
      }
    ],
    "hasAngle": true,
    "angleData": {
      "nodes": [
        0,
        1,
        5
      ],
      "text": "108.5°"
    }
  },
  "C2H5OH": {
    "sym": "C₂H₅OH",
    "name": "ETHANOL",
    "hybrid": "sp³",
    "geom": "Tetrahedral",
    "struct": "Alcohol",
    "desc": "Drinking alcohol.",
    "vis2D": "CH3-CH2-OH",
    "atoms": [
      {
        "element": "C",
        "x": -1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": -1.5,
        "y": 0.8,
        "z": 0.5
      },
      {
        "element": "H",
        "x": -1.5,
        "y": -0.8,
        "z": 0.5
      },
      {
        "element": "H",
        "x": -1.5,
        "y": 0,
        "z": -0.9
      },
      {
        "element": "H",
        "x": 0,
        "y": 0.9,
        "z": 0
      },
      {
        "element": "H",
        "x": 0,
        "y": -0.9,
        "z": 0
      },
      {
        "element": "H",
        "x": 1.7,
        "y": 0.6,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          3
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          4
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          5
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          6
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          7
        ],
        "order": 1
      },
      {
        "nodes": [
          2,
          8
        ],
        "order": 1
      }
    ],
    "hasAngle": true,
    "angleData": {
      "nodes": [
        1,
        2,
        8
      ],
      "text": "108.5°"
    }
  },
  "C3H8": {
    "sym": "C₃H₈",
    "name": "PROPANE",
    "hybrid": "sp³",
    "geom": "Tetrahedral",
    "struct": "Alkane",
    "desc": "LPG gas.",
    "vis2D": "C3H8",
    "atoms": [
      {
        "element": "C",
        "x": -1.2,
        "y": -0.3,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0.4,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": -0.3,
        "z": 0
      },
      {
        "element": "H",
        "x": -1.5,
        "y": -0.8,
        "z": 0.8
      },
      {
        "element": "H",
        "x": -1.5,
        "y": -0.8,
        "z": -0.8
      },
      {
        "element": "H",
        "x": -1.7,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "H",
        "x": 0,
        "y": 1,
        "z": 0.8
      },
      {
        "element": "H",
        "x": 0,
        "y": 1,
        "z": -0.8
      },
      {
        "element": "H",
        "x": 1.5,
        "y": -0.8,
        "z": 0.8
      },
      {
        "element": "H",
        "x": 1.5,
        "y": -0.8,
        "z": -0.8
      },
      {
        "element": "H",
        "x": 1.7,
        "y": 0.5,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          2
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          3
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          4
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          5
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          6
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          7
        ],
        "order": 1
      },
      {
        "nodes": [
          2,
          8
        ],
        "order": 1
      },
      {
        "nodes": [
          2,
          9
        ],
        "order": 1
      },
      {
        "nodes": [
          2,
          10
        ],
        "order": 1
      }
    ],
    "hasAngle": true,
    "angleData": {
      "nodes": [
        0,
        1,
        2
      ],
      "text": "112°"
    }
  },
  "CO": {
    "sym": "CO",
    "name": "CARBON MONOXIDE",
    "hybrid": "sp",
    "geom": "Linear",
    "struct": "Covalent",
    "desc": "Toxic gas with triple bond.",
    "vis2D": "C≡O",
    "atoms": [
      {
        "element": "C",
        "x": -0.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.5,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 3
      }
    ]
  },
  "CO2": {
    "sym": "CO₂",
    "name": "CARBON DIOXIDE",
    "hybrid": "sp",
    "geom": "Linear",
    "struct": "Covalent",
    "desc": "Greenhouse gas.",
    "vis2D": "O=C=O",
    "atoms": [
      {
        "element": "O",
        "x": -1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.2,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 2
      },
      {
        "nodes": [
          1,
          2
        ],
        "order": 2
      }
    ],
    "hasAngle": true,
    "angleData": {
      "nodes": [
        0,
        1,
        2
      ],
      "text": "180°"
    }
  },
  "H2S": {
    "sym": "H₂S",
    "name": "HYDROGEN SULFIDE",
    "hybrid": "sp³",
    "geom": "Bent",
    "struct": "Covalent",
    "desc": "Foul-smelling gas.",
    "vis2D": "H-S-H",
    "hasAngle": true,
    "angleData": {
      "nodes": [
        1,
        0,
        2
      ],
      "text": "92.1°"
    },
    "hasLP": true,
    "lps": [
      {
        "x": 0,
        "y": 0.6,
        "z": 0.4,
        "rx": 0.5,
        "rz": 0
      },
      {
        "x": 0,
        "y": 0.6,
        "z": -0.4,
        "rx": -0.5,
        "rz": 0
      }
    ],
    "atoms": [
      {
        "element": "S",
        "x": 0,
        "y": 0.2,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.8,
        "y": -0.4,
        "z": 0
      },
      {
        "element": "H",
        "x": -0.8,
        "y": -0.4,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          0,
          2
        ],
        "order": 1
      }
    ]
  },
  "HCl": {
    "sym": "HCl",
    "name": "HYDROGEN CHLORIDE",
    "hybrid": "sp³",
    "geom": "Linear",
    "struct": "Covalent (Polar)",
    "desc": "Strong acid in water.",
    "vis2D": "H-Cl",
    "hasAngle": false,
    "hasLP": true,
    "lps": [
      {
        "x": 0.9,
        "y": 0.4,
        "z": 0,
        "rx": 0,
        "rz": -0.5
      },
      {
        "x": 0.9,
        "y": -0.4,
        "z": 0,
        "rx": 0,
        "rz": 0.5
      },
      {
        "x": 0.9,
        "y": 0,
        "z": 0.4,
        "rx": 0.5,
        "rz": 0
      }
    ],
    "atoms": [
      {
        "element": "H",
        "x": -0.6,
        "y": 0,
        "z": 0
      },
      {
        "element": "Cl",
        "x": 0.4,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      }
    ]
  },
  "HCN": {
    "sym": "HCN",
    "name": "HYDROGEN CYANIDE",
    "hybrid": "sp",
    "geom": "Linear",
    "struct": "Covalent",
    "desc": "Highly toxic liquid/gas.",
    "vis2D": "H-C≡N",
    "hasAngle": true,
    "angleData": {
      "nodes": [
        0,
        1,
        2
      ],
      "text": "180°"
    },
    "hasLP": true,
    "lps": [
      {
        "x": 1.5,
        "y": 0,
        "z": 0,
        "rx": 0,
        "rz": -1.57
      }
    ],
    "atoms": [
      {
        "element": "H",
        "x": -1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "N",
        "x": 1,
        "y": 0,
        "z": 0
      }
    ],
    "bonds": [
      {
        "nodes": [
          0,
          1
        ],
        "order": 1
      },
      {
        "nodes": [
          1,
          2
        ],
        "order": 3
      }
    ]
  }
};

let scene, camera, renderer, animationId;
let moleculeGroup = null;
let currentComp = 'H2O';
let is3D = true;
let showAngle = false;
let showLP = false;
let autoRotate = true;

function initThreeJS() {
  const container = document.getElementById('renderArea');
  if (!container) return;

  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 4.5;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  window.addEventListener('resize', () => {
    if(!renderer) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  animate();
}

function animate() {
  animationId = requestAnimationFrame(animate);
  if (moleculeGroup) {
    if (autoRotate) {
      moleculeGroup.rotation.y += 0.01;
      moleculeGroup.rotation.x += 0.005;
    }
    // Bobbing animation
    moleculeGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.15;
    moleculeGroup.children.forEach(child => {
      if (child.userData && child.userData.radius && child.children.length > 0) {
        const sprite = child.children[0];
        const localCamPos = camera.position.clone();
        child.worldToLocal(localCamPos);
        localCamPos.normalize().multiplyScalar(child.userData.radius + 0.02);
        sprite.position.copy(localCamPos);
      }
    });
  }
  renderer.render(scene, camera);
}

function createTextSprite(message) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  context.font = "Bold 70px 'Space Grotesk', sans-serif";
  context.fillStyle = "rgba(0,0,0,0.85)";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(message, 64, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, sizeAttenuation: false });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(0.12, 0.12, 0.12);
  
  return sprite;
}

function createCylinder(pos1, pos2, material, radius = 0.06) {
  const distance = pos1.distanceTo(pos2);
  const geometry = new THREE.CylinderGeometry(radius, radius, distance, 16);
  const cylinder = new THREE.Mesh(geometry, material);
  const midPoint = new THREE.Vector3().addVectors(pos1, pos2).multiplyScalar(0.5);
  cylinder.position.copy(midPoint);
  cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(pos2, pos1).normalize());
  return cylinder;
}

function createBond(pos1, pos2, order) {
  const group = new THREE.Group();
  const solidMat = new THREE.MeshPhongMaterial({ color: 0x95a5a6 });
  
  const bondAxis = new THREE.Vector3().subVectors(pos2, pos1).normalize();
  let perp = new THREE.Vector3(0,1,0).cross(bondAxis);
  if (perp.lengthSq() < 0.01) {
    perp = new THREE.Vector3(1,0,0).cross(bondAxis);
  }
  perp.normalize().multiplyScalar(0.12);

  if (order === 1) {
    group.add(createCylinder(pos1, pos2, solidMat));
  } 
  else if (order === 2) {
    group.add(createCylinder(pos1.clone().add(perp), pos2.clone().add(perp), solidMat));
    group.add(createCylinder(pos1.clone().sub(perp), pos2.clone().sub(perp), solidMat));
  }
  else if (order === 3) {
    group.add(createCylinder(pos1, pos2, solidMat));
    group.add(createCylinder(pos1.clone().add(perp), pos2.clone().add(perp), solidMat));
    group.add(createCylinder(pos1.clone().sub(perp), pos2.clone().sub(perp), solidMat));
  }
  else if (order === 1.5) {
    group.add(createCylinder(pos1, pos2, solidMat));
    const dashedMat = new THREE.LineDashedMaterial({ color: 0x95a5a6, dashSize: 0.08, gapSize: 0.08, linewidth: 3 });
    const p1Offset = pos1.clone().add(perp);
    const p2Offset = pos2.clone().add(perp);
    const geometry = new THREE.BufferGeometry().setFromPoints([p1Offset, p2Offset]);
    const line = new THREE.Line(geometry, dashedMat);
    line.computeLineDistances();
    group.add(line);
  }
  return group;
}
function drawMolecule() {
  if (moleculeGroup) {
    scene.remove(moleculeGroup);
    moleculeGroup = null;
  }

  const data = compoundData[currentComp];
  moleculeGroup = new THREE.Group();

  const atomMeshes = [];

  data.atoms.forEach(atom => {
    const color = atomColors[atom.element] || 0xaaaaaa;
    const radius = atomRadii[atom.element] || 0.4;
    const geo = new THREE.SphereGeometry(radius, 32, 32);
    const mat = new THREE.MeshPhongMaterial({ 
      color: color, 
      shininess: 80 
    });
    const sphere = new THREE.Mesh(geo, mat);
    sphere.userData.radius = radius;
    sphere.position.set(atom.x, atom.y, atom.z);
    
    const label = createTextSprite(atom.element);
    sphere.add(label);
    
    moleculeGroup.add(sphere);
    atomMeshes.push(sphere.position);
  });

  if(data.bonds) {
    data.bonds.forEach(bond => {
      const p1 = atomMeshes[bond.nodes[0]];
      const p2 = atomMeshes[bond.nodes[1]];
      moleculeGroup.add(createBond(p1, p2, bond.order));
    });
  }

  if (data.hasLP && showLP && data.lps) {
    data.lps.forEach(lp => {
      const geo = new THREE.CapsuleGeometry(0.18, 0.4, 4, 16);
      const mat = new THREE.MeshPhongMaterial({ color: 0x2ed573, transparent: true, opacity: 0.7 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(lp.x, lp.y, lp.z);
      mesh.rotation.x = lp.rx;
      mesh.rotation.z = lp.rz;
      moleculeGroup.add(mesh);
    });
  }

    if (showAngle && data.angleData) {
    if (data.angleData.nodes) {
      const pCenter = atomMeshes[data.angleData.nodes[1]];
      const p1 = atomMeshes[data.angleData.nodes[0]];
      const p2 = atomMeshes[data.angleData.nodes[2]];
      
      const v1 = new THREE.Vector3().subVectors(p1, pCenter).normalize();
      const v2 = new THREE.Vector3().subVectors(p2, pCenter).normalize();
      
      // Calculate bisector for label position
      let bisector = new THREE.Vector3().addVectors(v1, v2).normalize();
      
      // Handle 180 degree angles (Linear) where bisector would be 0
      if (bisector.lengthSq() < 0.001) {
          bisector = new THREE.Vector3(0, 1, 0).cross(v1).normalize();
          if (bisector.lengthSq() < 0.001) {
              bisector = new THREE.Vector3(1, 0, 0).cross(v1).normalize();
          }
      }
      
      const arcRadius = 0.6;
      
      // Draw Arc (only if not 180 degrees)
      const angle = v1.angleTo(v2);
      if (angle < Math.PI - 0.01) {
          const curve = new THREE.EllipseCurve(
            0, 0, arcRadius, arcRadius,
            0, angle, false, 0
          );
          const points = curve.getPoints(20);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, linewidth: 2 });
          const arcLine = new THREE.Line(geometry, material);
          
          // Align arc with the vectors
          const normal = new THREE.Vector3().crossVectors(v1, v2).normalize();
          // We need to construct a rotation matrix from the XY plane to the v1,v2 plane
          const xAxis = v1.clone();
          const yAxis = new THREE.Vector3().crossVectors(normal, xAxis).normalize();
          const matrix = new THREE.Matrix4().makeBasis(xAxis, yAxis, normal);
          
          arcLine.applyMatrix4(matrix);
          arcLine.position.copy(pCenter);
          moleculeGroup.add(arcLine);
      }
      
      // Add label
      const lbl = createTextSprite(data.angleData.text);
      lbl.position.copy(pCenter).add(bisector.multiplyScalar(arcRadius + 0.3));;
      lbl.scale.set(0.3, 0.3, 0.3);
      moleculeGroup.add(lbl);
    } else {
      // Fallback if no nodes defined
      const lbl = createTextSprite(data.angleData.text);
      lbl.position.set(0, 1.0, 0);;
      lbl.scale.set(0.3, 0.3, 0.3);;
      lbl.scale.set(0.3, 0.3, 0.3);
      moleculeGroup.add(lbl);
    }
  }
scene.add(moleculeGroup);
}

document.addEventListener('DOMContentLoaded', () => {
  const compItems = document.querySelectorAll('.comp-item');
  const renderArea = document.getElementById('renderArea');
  const infoSym = document.getElementById('infoSym');
  const infoHybrid = document.getElementById('infoHybrid');
  const infoGeom = document.getElementById('infoGeom');
  const infoStruct = document.getElementById('infoStruct');
  const infoDesc = document.getElementById('infoDesc');

  const btn2D3D = document.getElementById('btn2D3D');
  const btnAngle = document.getElementById('btnAngle');
  const btnLP = document.getElementById('btnLP');
  const btnFS = document.getElementById('btnFS');
  const btnFSClose = document.getElementById('btnFSClose');

  initThreeJS();

  function renderVisual() {
    const data = compoundData[currentComp];
    if (!data) return;

    infoSym.textContent = data.sym;
    infoHybrid.textContent = data.hybrid;
    infoGeom.textContent = data.geom;
    infoStruct.textContent = data.struct;
    infoDesc.textContent = data.desc;

    btnAngle.style.display = is3D ? 'flex' : 'none';
    btnLP.style.display = is3D ? 'flex' : 'none';

    if (is3D) {
      btn2D3D.innerHTML = '<i data-lucide="cuboid"></i> 3D MODE';
      const canvas = renderer.domElement;
      canvas.style.display = 'block';
      
      const existing2D = renderArea.querySelector('.lewis-text');
      if(existing2D) existing2D.remove();
      
      drawMolecule();
    } else {
      btn2D3D.innerHTML = '<i data-lucide="square"></i> 2D LEWIS';
      renderer.domElement.style.display = 'none';
      if(moleculeGroup) {
        scene.remove(moleculeGroup);
        moleculeGroup = null;
      }
      
      const existing2D = renderArea.querySelector('.lewis-text');
      if(existing2D) existing2D.remove();
      
      const div2d = document.createElement('div');
      div2d.innerHTML = data.vis2D;
      div2d.style.position = 'absolute';
      renderArea.appendChild(div2d);
    }
    
    if(window.lucide) lucide.createIcons();
  }

  compItems.forEach(item => {
    item.addEventListener('click', () => {
      compItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentComp = item.dataset.comp;
      
      if(moleculeGroup) moleculeGroup.rotation.set(0,0,0);
      renderVisual();
    });
  });

  btn2D3D.addEventListener('click', () => {
    is3D = !is3D;
    renderVisual();
  });

  btnAngle.addEventListener('click', () => {
    showAngle = !showAngle;
    btnAngle.classList.toggle('active', showAngle);
    if(showAngle) {
      
    }
    renderVisual();
  });

  btnLP.addEventListener('click', () => {
    showLP = !showLP;
    btnLP.classList.toggle('active', showLP);
    renderVisual();
  });

  const labWrapper = document.getElementById('labWrapper');
  
  function toggleFullscreen() {
    labWrapper.classList.toggle('is-fullscreen');
    document.body.classList.toggle('fullscreen-active');
    
    if(labWrapper.classList.contains('is-fullscreen')) {
      btnFS.style.display = 'none';
    } else {
      btnFS.style.display = 'flex';
    }
    
    setTimeout(() => {
      if(renderer) {
        camera.aspect = renderArea.clientWidth / renderArea.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(renderArea.clientWidth, renderArea.clientHeight);
      }
    }, 300);
    if(window.lucide) lucide.createIcons();
  }

  btnFS.addEventListener('click', toggleFullscreen);
  if(btnFSClose) btnFSClose.addEventListener('click', toggleFullscreen);

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  
  renderArea.addEventListener('mousedown', () => isDragging = true);
  document.addEventListener('mouseup', () => isDragging = false);
  renderArea.addEventListener('mousemove', (e) => {
    if (isDragging && moleculeGroup) {
      autoRotate = false;
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };
      moleculeGroup.rotation.y += deltaMove.x * 0.01;
      moleculeGroup.rotation.x += deltaMove.y * 0.01;
    }
    previousMousePosition = { x: e.offsetX, y: e.offsetY };
  });

  renderArea.addEventListener('mouseleave', () => autoRotate = true);
  renderArea.addEventListener('mouseenter', () => autoRotate = false);

  renderVisual();
});
