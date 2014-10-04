'use strict';

function ExampleGenerator () {}

ExampleGenerator.prototype.generateBonsai = function () {
    return {
        'buses': [
            {
                'id': 's0',
                'name': 'not count',
                'max': 1
            }, {
                'id': 's1',
                'name': 'clrMPC',
                'max': 1,
                'color': 'rgb(100, 100, 255)',
                'routes': [
                    {
                        'type': 'topleft',
                        'top': '73px',
                        'left': '781px',
                        'width': '14px',
                        'height': '160px'
                    }, {
                        'type': 'bottomright',
                        'top': '202px',
                        'left': '668px',
                        'width': '113px',
                        'height': '70px'
                    }, {
                        'type': 'horizontal',
                        'top': '253px',
                        'left': '752px',
                        'width': '29px',
                        'height': '0'
                    }
                ]
            }, {
                'id': 's2',
                'name': 'readMPC',
                'max': 1,
                'color': 'rgb(100, 255, 100)',
                'routes': [
                    {
                        'type': 'topleft',
                        'top': '86px',
                        'left': '789px',
                        'width': '6px',
                        'height': '180px'
                    }, {
                        'type': 'bottomright',
                        'top': '215px',
                        'left': '646px',
                        'width': '143px',
                        'height': '70px'
                     }, {
                        'type': 'horizontal',
                        'top': '264px',
                        'left': '752px',
                        'width': '37px',
                        'height': '0'
                    }
                ]
            }, {
                'id': 's3',
                'name': 'writeMem',
                'max': 1,
                'color': 'rgb(255, 100, 100)',
                'routes': [
                    {
                        'type': 'horizontal',
                        'top': '98px',
                        'left': '210px',
                        'width': '640px',
                        'height': '0'
                    }, {
                        'type': 'bottomright',
                        'top': '126px',
                        'left': '140px',
                        'width': '47px',
                        'height': '30px'
                    }, {
                        'type': 'topleft',
                        'top': '98px',
                        'left': '187px',
                        'width': '31px',
                        'height': '28px'
                    }
                ]
            }, {
                'id': 's4',
                'name': 'readMem',
                'max': 1,
                'color': 'rgb(100, 255, 100)',
                'routes': [
                    {
                        'type': 'horizontal',
                        'top': '110px',
                        'left': '210px',
                        'width': '640px',
                        'height': '0'
                    }, {
                        'type': 'bottomright',
                        'top': '129px',
                        'left': '140px',
                        'width': '39px',
                        'height': '20px'
                    }, {
                        'type': 'topleft',
                        'top': '110px',
                        'left': '179px',
                        'width': '31px',
                        'height': '29px'
                    }
                ]
            }, {
                'id': 's5',
                'name': 'incAkku',
                'max': 1,
                'color': 'rgb(200, 200, 0)',
                'routes': [
                    {
                        'type': 'horizontal',
                        'top': '122px',
                        'left': '270px',
                        'width': '580px',
                        'height': '0'
                    }, {
                        'type': 'bottomright',
                        'top': '158px',
                        'left': '79px',
                        'width': '158px',
                        'height': '100px'
                    }, {
                        'type': 'topleft',
                        'top': '122px',
                        'left': '237px',
                        'width': '33px',
                        'height': '36px'
                    }
                ]
            }, {
                'id': 's6',
                'name': 'decAkku',
                'max': 1,
                'color': 'rgb(200, 200, 0)',
                'routes': [
                    {
                        'type': 'horizontal',
                        'top': '134px',
                        'left': '270px',
                        'width': '580px',
                        'height': '0'
                    }, {
                        'type': 'bottomright',
                        'top': '164px',
                        'left': '79px',
                        'width': '166px',
                        'height': '100px'
                    }, {
                        'type': 'topleft',
                        'top': '134px',
                        'left': '245px',
                        'width': '25px',
                        'height': '30px'
                    }
                ]
            }, {
                'id': 's7',
                'name': 'readAkku',
                'max': 1,
                'color': 'rgb(10, 255, 10)',
                'routes': [
                    {
                        'type': 'horizontal',
                        'top': '146px',
                        'left': '268px',
                        'width': '528px',
                        'height': '0'
                    }, {
                        'type': 'bottomright',
                        'top': '160px',
                        'left': '55px',
                        'width': '198px',
                        'height': '85px'
                    }, {
                        'type': 'topleft',
                        'top': '146px',
                        'left': '253px',
                        'width': '15px',
                        'height': '15px'
                    }
                ]
            }, {
                'id': 's8',
                'name': 'writeAkku',
                'max': 1,
                'color': 'rgb(255, 100, 100)',
                'routes': [
                    {
                        'type': 'horizontal',
                        'top': '158px',
                        'left': '280px',
                        'width': '560px',
                        'height': '0'
                    }, {
                        'type': 'bottomright',
                        'top': '168px',
                        'left': '55px',
                        'width': '206px',
                        'height': '70px'
                    }, {
                        'type': 'topleft',
                        'top': '158px',
                        'left': '261px',
                        'width': '20px',
                        'height': '15px'
                    }
                ]
            }, {
                'id': 's9',
                'name': 'readPC',
                'max': 1,
                'color': 'rgb(100, 255, 100)',
                'routes': [
                    {
                        'type': 'bottomleft',
                        'top': '100px',
                        'left': '279px',
                        'width': '550px',
                        'height': '70px'
                     }, {
                        'type': 'topright',
                        'top': '45px',
                        'left': '236px',
                        'width': '43px',
                        'height': '70px'

                    }
                ]
            }, {
                'id': 's10',
                'name': 'writePC',
                'max': 1,
                'color': 'rgb(255, 100, 100)',
                 'routes': [
                    {
                        'type': 'bottomleft',
                        'top': '112px',
                        'left': '285px',
                        'width': '550px',
                        'height': '70px'
                     }, {
                        'type': 'topright',
                        'top': '38px',
                        'left': '235px',
                        'width': '50px',
                        'height': '82px'

                    }
                ]
            }, {
                'id': 's11',
                'name': 'loadIR',
                'max': 1,
                'color': 'rgb(100, 255, 100)',
                'routes': [
                    {
                        'type': 'topright',
                        'top': '85px',
                        'left': '408px',
                        'width': '40px',
                        'height': '70px'
                    }, {
                        'type': 'bottomleft',
                        'top': '155px',
                        'left': '448px',
                        'width': '357px',
                        'height': '39px'

                    }
                ]
            }, {
                'id': 's12',
                'name': 'writeIR',
                'max': 1,
                'color': 'rgb(255, 100, 100)',
                'routes': [
                    {
                        'type': 'topright',
                        'top': '38px',
                        'left': '408px',
                        'width': '32px',
                        'height': '128px'
                    }, {
                        'type': 'bottomleft',
                        'top': '167px',
                        'left': '440px',
                        'width': '357px',
                        'height': '39px'

                    }
                ]
            }, {
                'id': 's13',
                'name': 'incPC',
                'max': 1,
                'color': 'rgb(200, 200, 0)',
                'routes': [
                    {
                        'type': 'topright',
                        'top': '64px',
                        'left': '292px',
                        'width': '8px',
                        'height': '100px'
                    }, {
                        'type': 'bottomleft',
                        'top': '164px',
                        'left': '300px',
                        'width': '495px',
                        'height': '54px'

                    }
                ]
            }, {
                'id': 's14',
                'name': 'incPCz',
                'max': 1,
                'color': 'rgb(200, 200, 0)',
                'routes': [
                    {
                        'type': 'topright',
                        'top': '48px',
                        'left': '323px',
                        'width': '21px',
                        'height': '100px'
                    }, {
                        'type': 'bottomleft',
                        'top': '148px',
                        'left': '344px',
                        'width': '459px',
                        'height': '82px'

                    }
                ]
            }, {
                'id': 'dataBus',
                'name': 'Datenbus',
                'max': 99999,
                'base': 10,
                'color': 'rgb(255, 0, 0)',
                'top': 170,
                'left': 175,
                'routes': [
                    {
                        'type': 'vertical',
                        'top': '164px',
                        'left': '129px',
                        'width': '0',
                        'height': '31px'
                    },
                    {
                        'type': 'bottomright',
                        'top': '100px',
                        'left': '275px',
                        'width': '120px',
                        'height': '95px'
                    },
                    {
                        'type': 'vertical',
                        'top': '195px',
                        'left': '318px',
                        'width': '0',
                        'height': '17px'
                    },
                    {
                        'type': 'topleft',
                        'top': '195px',
                        'left': '43px',
                        'width': '230px',
                        'height': '35px'
                    }
                ]
            }, {
                'id': 'addressBus',
                'name': 'Adressbus',
                'max': 9999,
                'base': 10,
                'color': 'rgb(0, 140, 0)',
                'top': -3,
                'left': 175,
                'routes': [
                    {
                        'type': 'topleft',
                        'top': '21px',
                        'left': '51px',
                        'width': '301px',
                        'height': '7px'
                    },
                    {
                        'type': 'vertical',
                        'top': '21px',
                        'left': '224px',
                        'width': '0',
                        'height': '10px'
                    }
                ]
             }, {
                'id': 'MicroAddressBus',
                'name': 'MikroAdressbus',
                'max': 99,
                'base': 10,
                'color': 'rgb(155, 100, 0)',
                'top': -3,
                'left': 610,
                'routes': [
                    {
                        'type': 'topright',
                        'top': '151px',
                        'left': '620px',
                        'width': '13px',
                        'height': '77px'
                    }, {
                        'type': 'topright',
                        'top': '21px',
                        'left': '621px',
                        'width': '20px',
                        'height': '7px'
                    }, {
                        'type': 'topleft',
                        'top': '21px',
                        'left': '590px',
                        'width': '29px',
                        'height': '17px'
                    }, {
                        'type': 'bottomleft',
                        'top': '39px',
                        'left': '590px',
                        'width': '28px',
                        'height': '112px'
                    }
                ]
            }, {
                'id': 'MicroDataBus',
                'name': 'MicroDataBus',
                'base': 10,
                'max': 32767,
                'color': 'rgb(200, 0, 200)',
                'left': 785,
                'top': -3,
                'routes': [
                    {
                        'type': 'bottomright',
                        'top': '164px',
                        'left': '748px',
                        'width': '23px',
                        'height': '7px'
                    }, {
                        'type': 'topright',
                        'top': '21px',
                        'left': '810px',
                        'width': '20px',
                        'height': '7px'
                    }, {
                        'type': 'topleft',
                        'top': '21px',
                        'left': '771px',
                        'width': '37px',
                        'height': '141px'
                    }, {
                        'type': 'bottomleft',
                        'top': '164px',
                        'left': '718px',
                        'width': '28px',
                        'height': '7px'
                    }
                ]
            }, {
                'id': 'IRout',
                'name': 'AusgangIR',
                'max': 99999,
                'base': 10,
                'color': 'rgb(0, 140, 0)',
                'top': -3,
                'left': 377,
                'routes': [
                    {
                        'type': 'topright',
                        'top': '21px',
                        'left': '384px',
                        'width': '11px',
                        'height': '7px'
                    },
                    {
                        'type': 'topleft',
                        'top': '21px',
                        'left': '396px',
                        'width': '11px',
                        'height': '7px'
                    }
                ]
            }, {
                'id': 'opcode',
                'name': 'opcode',
                'max': 99999,
                'base': 10,
                'color': 'rgb(0, 140, 0)',
                'top': -3,
                'left': 443,
                'routes': [
                    {
                        'type': 'topright',
                        'top': '21px',
                        'left': '439px',
                        'width': '23px',
                        'height': '207px'
                    }
                ]
            }, {
                'id': 'DecoderMPC',
                'name': 'BefehlsdecoderZuMPC',
                'max': 99,
                'base': 10,
                'color': 'rgb(0, 140, 140)',
                'top': 283,
                'left': 580,
                'routes': [
                    {
                        'type': 'bottomright',
                        'top': '301px',
                        'left': '583px',
                        'width': '50px',
                        'height': '7px'
                    },
                    {
                        'type': 'bottomleft',
                        'top': '293px',
                        'left': '538px',
                        'width': '63px',
                        'height': '15px'
                    }
                ]
            }, {
                'id': 'AndB',
                'name': 'And gate B wire',
                'max': 1
            }, {
                'id': 'OrA',
                'name': 'Or gate A wire',
                'max': 1

            }, {
                'id': 'clock',
                'name': 'Takt',
                'max': 1,
                'color': 'rgb(100, 100, 255)',
                'routes': [
                    {
                        'type': 'topright',
                        'top': '45px',
                        'left': '840px',
                        'width': '20px',
                        'height': '200px'
                    },
                    {
                        'type': 'topleft',
                        'top': '278px',
                        'left': '770px',
                        'width': '30px',
                        'height': '22px'
                    },
                    {
                        'type': 'horizontal',
                        'top': '300px',
                        'left': '760px',
                        'width': '19px',
                        'height': '0px'
                    },
                    {
                        'type': 'bottomright',
                        'top': '246px',
                        'left': '779px',
                        'width': '81px',
                        'height': '32px'
                    }
                ]
            }, {
                'id': 'clockdelayed',
                'name': 'verzögerter Takt',
                'max' : 1,
                'color': 'rgb(100, 100, 255)',
                'routes': [
                    {
                        'type': 'topright',
                        'top': '253px',
                        'left': '703px',
                        'width': '8px',
                        'height': '15px'
                    },
                    {
                        'type': 'bottomleft',
                        'top': '269px',
                        'left': '711px',
                        'width': '22px',
                        'height': '31px'
                    }
                ]
            }, {
                'id': 'and2A_Takt',
                'name': 'xy',
                'max': 1
            }, {
                'id': 'and2B_nor1out',
                'name': 'uv',
                'max': 1
            }, {
                'id': 'and2out_incMPC',
                'name': 'abc',
                'max': 1
            }, {
                'id': 'or1_ausgang',
                'name': 'or1_ausgang result wire',
                'max': 1
            }, {
                'id': 'compWire',
                'name': 'Zerocomparator result wire',
                'max': 1,
                'routes': [
                    {
                        'type': 'vertical',
                        'top': '239px',
                        'left': '318px',
                        'width': '0',
                        'height': '16px'
                    },
                    {
                        'type': 'topright',
                        'top': '59px',
                        'left': '321px',
                        'width': '15px',
                        'height': '140px'
                    },
                    {
                        'type': 'bottomright',
                        'top': '200px',
                        'left': '319px',
                        'width': '17px',
                        'height': '46px'
                    }
                ]
            }, {
                'id': 'SteuerwortWriteWire',
                'name': 'Steuerwort write wire',
                'max': 1
            }, {
                'id': 'SteuerwortReadWire',
                'name': 'Steuerwort read wire',
                'max': 1
            }, {
                'id': 'runClock',
                'name': 'Clock run wire',
                'max': 1
            }
        ],
        'manualswitches': [
            {
                'name': 'SteuerwortWriteWireSwitch',
                'wireId': 'SteuerwortWriteWire',
                'value': 1,
                'top': 10,
                'left': 865
            }, {
                'name': 'SteuerwortReadWireSwitch',
                'wireId': 'SteuerwortReadWire',
                'value': 0,
                'top': 30,
                'left': 865,
                'color': 'rgb(0, 100, 0)'
            }, {
                'name': 'ClockRuneSwitch',
                'wireId': 'runClock',
                'value': 0,
                'top': 297,
                'left': 865
            }
        ],
        'leds': [
            {
                'wireId': 'or1_ausgang',
                'name': 'or1_ausgang indication led',
                'top': 35,
                'left': 262
            }, {
                'wireId': 'compWire',
                'name': 'comp indication led',
                'top': 259,
                'left': 317,
                'color': 'rgb(255, 0, 112)'
            }, {
                'wireId': 's0',
                'name': 's0 led',
                'top': 62,
                'left': 782
            }, {
                'wireId': 'and2B_nor1out',
                'name': 'Nor Test LED',
                'top': 245,
                'left': 722,
                'color': 'rgb(150, 180, 255)'
            }
        ],
        'andGates': [
            {
                'name': 'and1',
                'inAId': 's14',
                'inBId': 'compWire',
                'outId': 'OrA',
                'top': 48,
                'left': 300
            },
            {
                'name': 'and2',
                'inAId': 'clockdelayed',
                'inBId': 'and2B_nor1out',
                'outId': 'and2out_incMPC',
                'top': 253,
                'left': 680
            }
        ],
        'orGates': [
            {
                'name': 'or1',
                'inAId': 'OrA',
                'inBId': 's13',
                'outId': 'or1_ausgang',
                'top': 53,
                'left': 270
            }
        ],
        'norGates': [
            {
                'name': 'nor1',
                'inAId': 's1',
                'inBId': 's2',
                'outId': 'and2B_nor1out',
                'top': 253,
                'left': 730
            }
        ],
        'registers': [
            {
                'name': 'PC',
                'value': 0,
                'base' : 10,
                'top' : 50,
                'left': 190,
                'gates': [
                    {'busId': 'addressBus',
                     'writeWireId': 's10',
                     'readWireId': 's9'
                    }
                ],
                'incWireId': 'or1_ausgang'
            }, {
                'name': 'IR',
                'value': 40008,
                'base' : 10,
                'top' : 50,
                'left': 362,
                'gates': [
                    {
                        'busId': 'IRout',
                        'writeWireId': 's12',
                        'initialState': 0
                    }, {
                        'busId': 'dataBus',
                        'readWireId': 's11'
                    }
                ],
                'incWireId': undefined,
                'decWireId': undefined,
                'clrWireId': undefined
            }, {
                'name': 'Akku',
                'value': 42,
                'base' : 10,
                'top' : 250,
                'left': 10,
                'gates': [
                    {
                        'busId': 'dataBus',
                        'writeWireId': 's8',
                        'readWireId': 's7'
                    }
                ],
                'incWireId': 's5',
                'decWireId': 's6',
                'maxValue': 255
            }, {
                'name': 'MPC',
                'value': 0,
                'base' : 10,
                'top' : 250,
                'left': 600,
                'gates': [
                    {
                        'busId': 'MicroAddressBus',
                        'writeWireId': undefined,
                        'readWireId': undefined,
                        'initialState': 1
                    },
                    {
                        'busId': 'DecoderMPC',
                        'writeWireId': undefined,
                        'readWireId': 's2'
                    }
                ],
                'incWireId': 'and2out_incMPC',
                'decWireId': undefined,
                'clrWireId': 's1'
            }
        ],
        'bitregisters': [
            {
                'name': 'Steuerwort',
                'value': 0,
                'wiresReadWireId': 'SteuerwortReadWire',
                'wiresWriteWireId': 'SteuerwortWriteWire',
                'base' : 10,
                'top' : 50,
                'left': 800,
                'widegate': {
                    'busId': 'MicroDataBus',
                    'writeWireId': undefined,
                    'readWireId': 'clock'
                },
                'wiregates': [
                    {'wireId': 's0'},
                    {'wireId': 's1'},
                    {'wireId': 's2'},
                    {'wireId': 's3'},
                    {'wireId': 's4'},
                    {'wireId': 's5'},
                    {'wireId': 's6'},
                    {'wireId': 's7'},
                    {'wireId': 's8'},
                    {'wireId': 's9'},
                    {'wireId': 's10'},
                    {'wireId': 's11'},
                    {'wireId': 's12'},
                    {'wireId': 's13'},
                    {'wireId': 's14'}
                ]
            }
        ],
        'memories': [
            {
                'name': "Datenspeicher",
                'base': 10,
                'content': "30003\n10007\n20008\n40008\n30001\n50000\n\n3\n2",
                'top': 50,
                'left': 10,
                'addressgate': {
                    'busId': 'addressBus',
                    'readWireId': undefined,
                    'initialState': -1
                },
                'datagate': {
                    'busId': 'dataBus',
                    'writeWireId': 's3',
                    'readWireId': 's4'
                },
                'undefinedString': '---',
                'showContext': true
            },
            {
                'name': "Befehlsdecoder",
                'base': 10,
                'content': "0\n10\n20\n30\n40\n50",
                'top': 250,
                'left':420,
                'addressgate': {
                    'busId': 'opcode',
                    'readWireId': undefined,
                    'initialState': -1
                },
                'datagate': {
                    'busId': 'DecoderMPC',
                    'writeWireId': undefined,
                    'readWireId': undefined,
                    'initialState': 1
                },
                'undefinedString': '',
                'showContext': false
            },
            {
                'name': "Mikroprogrammspeicher",
                'base': 10,
                'content': "1024\n3080\n1032\n4096\n4100\n\n\n\n\n\n4096\n4232\n4104\n12320\n4368\n4352\n2\n\n\n\n4096\n4232\n4104\n12352\n4368\n4352\n2\n\n\n\n4608\n4096\n2\n\n\n\n\n\n\n\n12288\n4104\n20488\n2\n\n\n\n\n\n\n4101",
                'top': 50,
                'left':600,
                'addressgate': {
                    'busId': 'MicroAddressBus',
                    'readWireId': undefined,
                    'initialState': -1
                },
                'datagate': {
                    'busId': 'MicroDataBus',
                    'writeWireId': undefined,
                    'readWireId': undefined,
                    'initialState': 1
                },
                'undefinedString': '---',
                'showContext': true
            }
        ],
        'zerocomparators': [
            {
                'name': 'Zero comparator 1',
                'busId': 'dataBus',
                'wireId': 'compWire',
                'top': 214,
                'left': 318
            }
        ],
        'delays': [
            {
                'name': 'ClockDelay',
                'delay': 50,
                'busLeftId': 'clockdelayed',
                'busRightId': 'clock',
                'top': 300,
                'left': 738,
                'direction': 'left'
            }
        ],
        'filters': [
            {
                'name': 'div10000',
                'statement': 'n/10000',
                'busLeftId': 'IRout',
                'busRightId': 'opcode',
                'top': 21,
                'left': 412,
                'direction': 'right'
            },
            {
                'name': 'mod10000',
                'statement': 'n%10000',
                'busLeftId': 'addressBus',
                'busRightId': 'IRout',
                'top': 21,
                'left': 357,
                'direction': 'left'
            }
        ],
        'clocks': [
            {
                'name': 'Takt',
                'wireId': 'clock',
                'runWireId': 'runClock',
                'frequency': 2,
                'top': 300,
                'left': 780
            }
        ],
        'labels': [
            {
                'text': 'Akku',
                'top': 230,
                'left': 10
            },
            {
                'text': 'MPC',
                'top': 230,
                'left': 600
            },
             {
                'text': 'Befehlsdecoder',
                'top': 230,
                'left': 500
            },
            {
                'text': 'PC',
                'top': 30,
                'left': 195
            },
            {
                'text': 'IR',
                'top': 30,
                'left': 372
            },
            {
                'text': 'Programmspeicher',
                'top': 30,
                'left': 70
            },
            {
                'text': 'Mikroprogrammspeicher',
                'top': 30,
                'left': 655
            }
        ]
    };
};

ExampleGenerator.prototype.generateSingleRegister = function () {
    return  {
        'buses': [],
        'manualswitches': [],
        'leds': [],
              'andGates': [],
        'orGates': [],
        'norGates': [],
        'registers': [
            {
                'name': 'PC',
                'value': 7,
                'base' : 10,
                'top' : 50,
                'left': 190,
                            'gates': [],
                'maxValue': 42
            }
        ],
        'bitregisters': [],
        'memories': [],
        'zerocomparators': [],
        'delays': [],
        'filters': [],
        'clocks': [],
        'labels': []
    };
};

ExampleGenerator.prototype.generateRegisterTransfer = function () {
    return {
			  "buses": [
			    {
			      "id": "Bus 1",
			      "name": "Bus 1",
			      "max": 99999,
			      "base": 10,
			      "color": "rgb(255, 0, 0)",
			      "top": 170,
			      "left": 175,
			      "routes": [
			        {
			          "type": "bottomright",
			          "top": "100px",
			          "left": "275px",
			          "width": "120px",
			          "height": "95px"
			        },
			        {
			          "type": "topleft",
			          "top": "195px",
			          "left": "43px",
			          "width": "230px",
			          "height": "35px"
			        }
			      ]
			    },
			    {
			      "id": "Bus 0",
			      "name": "Bus 0",
			      "max": 9999,
			      "base": 10,
			      "color": "rgb(0, 140, 0)",
			      "top": -3,
			      "left": 275,
			      "routes": [
			        {
			          "type": "topleft",
			          "top": "21px",
			          "left": "43px",
			          "width": "340px",
			          "height": "7px"
			        },
			        {
			          "type": "topright",
			          "top": "21px",
			          "left": "384px",
			          "width": "11px",
			          "height": "10px"
			        },
			        {
			          "type": "vertical",
			          "top": "21px",
			          "left": "223px",
			          "width": "0px",
			          "height": "10px"
			        }
			      ]
			    }
			  ],
			  "manualswitches": [],
			  "leds": [],
			  "andGates": [],
			  "orGates": [],
			  "norGates": [],
			  "registers": [
			    {
			      "name": "A",
			      "value": 17,
			      "base": 10,
			      "top": 50,
			      "left": 10,
			      "gates": [
			        {
			          "busId": "Bus 0"
			        }
			      ]
			    },
			     {
			      "name": "B",
			      "value": 0,
			      "base": 10,
			      "top": 50,
			      "left": 190,
			      "gates": [
			        {
			          "busId": "Bus 0"
			        }
			      ]
			    },
			    {
			      "name": "C",
			      "value": 23,
			      "base": 10,
			      "top": 50,
			      "left": 362,
			      "gates": [
			        {
			          "busId": "Bus 0",
			          "initialState": 0
			        },
			        {
			          "busId": "Bus 1"
			        }
			      ]
			    },
			    {
			      "name": "D",
			      "value": 42,
			      "base": 10,
			      "top": 250,
			      "left": 10,
			      "gates": [
			        {
			          "busId": "Bus 1"
			        }
			      ]
			    }
			  ],
			  "bitregisters": [],
			  "memories": [],
			  "zerocomparators": [],
			  "delays": [],
			  "filters": [],
			  "clocks": [],
			  "labels": [
			    {
			      "text": "A",
			      "top": 30,
			      "left": 20
			    },
			    {
			      "text": "B",
			      "top": 30,
			      "left": 200
			    },
			    {
			      "text": "C",
			      "top": 30,
			      "left": 370
			    },
			    {
			      "text": "D",
			      "top": 230,
			      "left": 20
			    },
			    {
			      "text": "Bus 0",
			      "top": 25,
			      "left": 300
			    },
			    {
			      "text": "Bus 1",
			      "top": 200,
			      "left": 300
			    }
			    
			  ]
			};       
};

ExampleGenerator.prototype.generateManualBonsai = function () {
    return  {
        "buses": [
            {
                "id": "dataBus",
                "name": "Datenbus",
                "max": 99999,
                "base": 10,
                "color": "rgb(255, 0, 0)",
                "top": 170,
                "left": 175,
                "routes": [
                    {
                        "type": "vertical",
                        "top": "164px",
                        "left": "129px",
                        "width": "0",
                        "height": "31px"
                    },
                    {
                        "type": "bottomright",
                        "top": "100px",
                        "left": "275px",
                        "width": "120px",
                        "height": "95px"
                    },
                    {
                        "type": "vertical",
                        "top": "195px",
                        "left": "318px",
                        "width": "0",
                        "height": "17px"
                    },
                    {
                        "type": "topleft",
                        "top": "195px",
                        "left": "43px",
                        "width": "230px",
                        "height": "35px"
                    }
                ]
            },
            {
                "id": "addressBus",
                "name": "Adressbus",
                "max": 9999,
                "base": 10,
                "color": "rgb(0, 140, 0)",
                "top": -3,
                "left": 175,
                "routes": [
                    {
                        "type": "topleft",
                        "top": "21px",
                        "left": "51px",
                        "width": "301px",
                        "height": "7px"
                    },
                    {
                        "type": "vertical",
                        "top": "21px",
                        "left": "224px",
                        "width": "0",
                        "height": "10px"
                    }
                ]
            },
            {
                "id": "IRout",
                "name": "AusgangIR",
                "max": 99999,
                "base": 10,
                "color": "rgb(0, 140, 0)",
                "top": -3,
                "left": 377,
                "routes": [
                    {
                        "type": "topright",
                        "top": "21px",
                        "left": "384px",
                        "width": "11px",
                        "height": "7px"
                    },
                    {
                        "type": "topleft",
                        "top": "21px",
                        "left": "396px",
                        "width": "11px",
                        "height": "7px"
                    }
                ]
            },
            {
                "id": "opcode",
                "name": "opcode",
                "max": 99999,
                "base": 10,
                "color": "rgb(0, 140, 0)",
                "top": -3,
                "left": 443,
                "routes": [
                    {
                        "type": "topright",
                        "top": "21px",
                        "left": "439px",
                        "width": "23px",
                        "height": "10px"
                    }
                ]
            },
            {
                "id": "AndB",
                "name": "And gate B wire",
                "max": 1
            },
            {
                "id": "OrA",
                "name": "Or gate A wire",
                "max": 1
            },
            {
                "id": "or1_ausgang",
                "name": "or1_ausgang result wire",
                "max": 1
            },
            {
                "id": "incPCBus",
                "name": "incPCBus",
                "max": 1
            },
            {
                "id": "incPCzBus",
                "name": "incPCzBus",
                "max": 1
            },
            {
                "id": "compWire",
                "name": "Zerocomparator result wire",
                "max": 1,
                "routes": [
                    {
                        "type": "vertical",
                        "top": "239px",
                        "left": "318px",
                        "width": "0",
                        "height": "16px"
                    },
                    {
                        "type": "topright",
                        "top": "59px",
                        "left": "321px",
                        "width": "15px",
                        "height": "140px"
                    },
                    {
                        "type": "bottomright",
                        "top": "200px",
                        "left": "319px",
                        "width": "17px",
                        "height": "46px"
                    }
                ]
            }
        ],
        "manualswitches": [
            {
                "name": "incPC",
                "wireId": "incPCBus",
                "value": 0,
                "top": 73,
                "left": 298
            },
            {
                "name": "incPCz",
                "wireId": "incPCzBus",
                "value": 0,
                "top": 48,
                "left": 330
            }
        ],
        "leds": [
            {
                "wireId": "or1_ausgang",
                "name": "or1_ausgang indication led",
                "top": 35,
                "left": 262,
                "value": 0
            },
            {
                "wireId": "compWire",
                "name": "comp indication led",
                "top": 259,
                "left": 317,
                "value": 0
            }
        ],
        "andGates": [
            {
                "name": "and1",
                "inAId": "incPCzBus",
                "inBId": "compWire",
                "outId": "OrA",
                "top": 48,
                "left": 300
            }
        ],
        "orGates": [
            {
                "name": "or1",
                "inAId": "OrA",
                "inBId": "incPCBus",
                "outId": "or1_ausgang",
                "top": 53,
                "left": 270
            }
        ],
        "norGates": [],
        "registers": [
            {
                "name": "PC",
                "value": 0,
                "base": 10,
                "top": 50,
                "left": 190,
                "gates": [
                    {
                        "busId": "addressBus"
                    }
                ],
                "incWireId": "or1_ausgang"
            },
            {
                "name": "IR",
                "value": 40008,
                "base": 10,
                "top": 50,
                "left": 362,
                "gates": [
                    {
                        "busId": "IRout",
                        "initialState": 0
                    },
                    {
                        "busId": "dataBus"
                    }
                ]
            },
            {
                "name": "Akku",
                "value": 42,
                "base": 10,
                "top": 250,
                "left": 10,
                "gates": [
                    {
                        "busId": "dataBus"
                    }
                ],
                "maxValue": 255
            }
        ],
        "bitregisters": [],
        "memories": [
            {
                "name": "Datenspeicher",
                "base": 10,
                "content": "30003\n10007\n20008\n40008\n30001\n50000\n\n3\n2",
                "top": 50,
                "left": 10,
                "addressgate": {
                    "busId": "addressBus",
                    "initialState": -1
                },
                "datagate": {
                    "busId": "dataBus"
                },
                "undefinedString": "---",
                "showContext": true
            }
        ],
        "zerocomparators": [
            {
                "name": "Zero comparator 1",
                "busId": "dataBus",
                "wireId": "compWire",
                "top": 214,
                "left": 318
            }
        ],
        "delays": [],
        "filters": [
            {
                "name": "div10000",
                "statement": "n/10000",
                "busLeftId": "IRout",
                "busRightId": "opcode",
                "top": 21,
                "left": 412
            },
            {
                "name": "mod10000",
                "statement": "n%10000",
                "busLeftId": "addressBus",
                "busRightId": "IRout",
                "top": 21,
                "left": 357,
                "direction": "left"
            }
        ],
        "clocks": [],
        "labels": [
            {
                "text": "Akku",
                "top": 230,
                "left": 10
            },
            {
                "text": "PC",
                "top": 30,
                "left": 195
            },
            {
                "text": "IR",
                "top": 30,
                "left": 372
            },
            {
                "text": "Programmspeicher",
                "top": 30,
                "left": 70
            }
        ]
    };
};


ExampleGenerator.prototype.generateGates = function () {
    return    {
        "buses": [
            {
                "id": "a0",
                "name": "a0",
                "max": 1
            },
            {
                "id": "b0",
                "name": "b0",
                "max": 1
            },
            {
                "id": "c0",
                "name": "c0",
                "max": 1
            },
            {
                "id": "a1",
                "name": "a1",
                "max": 1
            },
            {
                "id": "b1",
                "name": "b1",
                "max": 1
            },
            {
                "id": "c1",
                "name": "c1",
                "max": 1
            },
            {
                "id": "a2",
                "name": "a2",
                "max": 1
            },
            {
                "id": "b2",
                "name": "b2",
                "max": 1
            },
            {
                "id": "c2",
                "name": "c2",
                "max": 1
            }
        ],
        "manualswitches": [
            {
                "name": "A0",
                "wireId": "a0",
                "value": 0,
                "top": 40,
                "left": 340
            },
            {
                "name": "B0",
                "wireId": "b0",
                "value": 0,
                "top": 70,
                "left": 340
            },
            {
                "name": "A1",
                "wireId": "a1",
                "value": 0,
                "top": 140,
                "left": 340
            },
            {
                "name": "B1",
                "wireId": "b1",
                "value": 0,
                "top": 170,
                "left": 340
            },
            {
                "name": "A2",
                "wireId": "a2",
                "value": 0,
                "top": 240,
                "left": 340
            },
            {
                "name": "B2",
                "wireId": "b2",
                "value": 0,
                "top": 270,
                "left": 340
            }
        ],
        "leds": [
            {
                "name": "C0",
                "wireId": "c0",
                "top": 55,
                "left": 270,
                "value": 0
            },
            {
                "name": "C1",
                "wireId": "c1",
                "top": 155,
                "left": 270,
                "value": 0
            },
            {
                "name": "C2",
                "wireId": "c2",
                "top": 255,
                "left": 270,
                "value": 0
            }
        ],
        "andGates": [
            {
                "name": "and",
                "inAId": "a0",
                "inBId": "b0",
                "outId": "c0",
                "top": 50,
                "left": 300
            }
        ],
        "orGates": [
            {
                "name": "or",
                "inAId": "a1",
                "inBId": "b1",
                "outId": "c1",
                "top": 150,
                "left": 300
            }
        ],
        "norGates": [
            {
                "name": "nor",
                "inAId": "a2",
                "inBId": "b2",
                "outId": "c2",
                "top": 250,
                "left": 300
            }
        ],
        "registers": [],
        "bitregisters": [],
        "memories": [],
        "zerocomparators": [],
        "delays": [],
        "filters": [],
        "clocks": [],
        "labels": []
    }
};

ExampleGenerator.prototype.generateMemory = function () {
    return    {
        "buses": [
            {
                "id": "databus",
                "name": "Datenbus",
                "max": 99999,
                "base": 10,
                "color": "rgb(255, 0, 0)",
                "top": 170,
                "left": 150,
                "routes": [
                    {
                        "type": "bottomleft",
                        "top": "164px",
                        "left": "129px",
                        "width": "71px",
                        "height": "32px"
                    },
                    {
                        "type": "topright",
                        "top": "196px",
                        "left": "201px",
                        "width": "122px",
                        "height": "32px"
                    }
                ]
            },
            {
                "id": "addressbus",
                "name": "Adressbus",
                "max": 9999,
                "base": 10,
                "color": "rgb(0, 140, 0)",
                "top": -3,
                "left": 150,
                "routes": [
                    {
                        "type": "topleft",
                        "top": "21px",
                        "left": "52px",
                        "width": "48px",
                        "height": "7px"
                    },
                    {
                        "type": "topright",
                        "top": "21px",
                        "left": "100px",
                        "width": "224px",
                        "height": "7px"
                    }
                ]
            }
        ],
        "manualswitches": [],
        "leds": [],
        "andGates": [],
        "orGates": [],
        "norGates": [],
        "registers": [
            {
                "name": "Adresse",
                "value": 0,
                "base": 10,
                "top": 50,
                "left": 290,
                "gates": [
                    {
                        "busId": "addressbus",
                        "initialState": "1"
                    }
                ]
            },
            {
                "name": "Datum",
                "value": 42,
                "base": 10,
                "top": 250,
                "left": 290,
                "gates": [
                    {
                        "busId": "databus"
                    }
                ]
            }
        ],
        "bitregisters": [],
        "memories": [
            {
                "name": "Datenspeicher",
                "base": 10,
                "content": "17\n23\n0\n42",
                "top": 50,
                "left": 10,
                "addressgate": {
                    "busId": "addressbus",
                    "initialState": -1
                },
                "datagate": {
                    "busId": "databus"
                },
                "undefinedString": "",
                "showContext": true
            }
        ],
        "zerocomparators": [],
        "delays": [],
        "filters": [],
        "clocks": [],
        "labels": [
            {
                "text": "A",
                "top": 30,
                "left": 300
            },
            {
                "text": "D",
                "top": 230,
                "left": 300
            },
            {
                "text": "Adressbus",
                "top": 25,
                "left": 200
            },
            {
                "text": "Datenbus",
                "top": 200,
                "left": 200
            }
        ]
    }
};

ExampleGenerator.prototype.generateFilter = function () {
    return {
        "buses": [
            {
                "id": "bus0",
                "name": "Bus links",
                "max": 9999,
                "base": 10,
                "color": "rgb(0, 140, 0)",
                "top": -3,
                "left": 250,
                "routes": [
                    {
                        "type": "topleft",
                        "top": "21px",
                        "left": "224px",
                        "width": "70px",
                        "height": "7px"
                    }
                ]
            },
            {
                "id": "bus1",
                "name": "Bus rechts",
                "max": 99999,
                "base": 10,
                "color": "rgb(0, 140, 0)",
                "top": -3,
                "left": 350,
                "routes": [
                    {
                        "type": "topright",
                        "top": "21px",
                        "left": "326px",
                        "width": "69px",
                        "height": "7px"
                    }
                ]
            }
        ],
        "registers": [
            {
                "name": "A",
                "value": 0,
                "base": 10,
                "top": 50,
                "left": 190,
                "gates": [
                    {
                        "busId": "bus0"
                    }
                ]
            },
            {
                "name": "B",
                "value": 1234,
                "base": 10,
                "top": 50,
                "left": 362,
                "gates": [
                    {
                        "busId": "bus1",
                        "initialState": 1
                    }
                ]
            }
        ],
        "filters": [
            {
                "name": "filter",
                "statement": "n%100",
                "busLeftId": "bus0",
                "busRightId": "bus1",
                "top": 21,
                "left": 299,
                "direction": "left"
            }
        ]
    }
};

ExampleGenerator.prototype.generateControl = function () {
    return {
			  "buses": [
			    {
			      "id": "s0",
			      "name": "not count",
			      "max": 1
			    },
			    {
			      "id": "s1",
			      "name": "clrMPC",
			      "max": 1,
			      "color": "rgb(100, 100, 255)"
			    },
			    {
			      "id": "s2",
			      "name": "readMPC",
			      "max": 1,
			      "color": "rgb(100, 255, 100)"
			    },
			    {
			      "id": "s3",
			      "name": "writeMem",
			      "max": 1,
			      "color": "rgb(255, 100, 100)",
			      "routes": [
			        {
			          "type": "horizontal",
			          "top": "98px",
			          "left": "210px",
			          "width": "540px",
			          "height": "0"
			        },
			        {
			          "type": "bottomright",
			          "top": "126px",
			          "left": "140px",
			          "width": "47px",
			          "height": "30px"
			        },
			        {
			          "type": "topleft",
			          "top": "98px",
			          "left": "187px",
			          "width": "31px",
			          "height": "28px"
			        }
			      ]
			    },
			    {
			      "id": "s4",
			      "name": "readMem",
			      "max": 1,
			      "color": "rgb(100, 255, 100)",
			      "routes": [
			        {
			          "type": "horizontal",
			          "top": "110px",
			          "left": "210px",
			          "width": "540px",
			          "height": "0"
			        },
			        {
			          "type": "bottomright",
			          "top": "129px",
			          "left": "140px",
			          "width": "39px",
			          "height": "20px"
			        },
			        {
			          "type": "topleft",
			          "top": "110px",
			          "left": "179px",
			          "width": "31px",
			          "height": "29px"
			        }
			      ]
			    },
			    {
			      "id": "s5",
			      "name": "incAkku",
			      "max": 1,
			      "color": "rgb(200, 200, 0)",
			      "routes": [
			        {
			          "type": "horizontal",
			          "top": "122px",
			          "left": "270px",
			          "width": "480px",
			          "height": "0"
			        },
			        {
			          "type": "bottomright",
			          "top": "158px",
			          "left": "79px",
			          "width": "158px",
			          "height": "100px"
			        },
			        {
			          "type": "topleft",
			          "top": "122px",
			          "left": "237px",
			          "width": "33px",
			          "height": "36px"
			        }
			      ]
			    },
			    {
			      "id": "s6",
			      "name": "decAkku",
			      "max": 1,
			      "color": "rgb(200, 200, 0)",
			      "routes": [
			        {
			          "type": "horizontal",
			          "top": "134px",
			          "left": "270px",
			          "width": "480px",
			          "height": "0"
			        },
			        {
			          "type": "bottomright",
			          "top": "164px",
			          "left": "79px",
			          "width": "166px",
			          "height": "100px"
			        },
			        {
			          "type": "topleft",
			          "top": "134px",
			          "left": "245px",
			          "width": "25px",
			          "height": "30px"
			        }
			      ]
			    },
			    {
			      "id": "s7",
			      "name": "readAkku",
			      "max": 1,
			      "color": "rgb(10, 255, 10)",
			      "routes": [
			        {
			          "type": "horizontal",
			          "top": "146px",
			          "left": "268px",
			          "width": "428px",
			          "height": "0"
			        },
			        {
			          "type": "bottomright",
			          "top": "160px",
			          "left": "55px",
			          "width": "198px",
			          "height": "85px"
			        },
			        {
			          "type": "topleft",
			          "top": "146px",
			          "left": "253px",
			          "width": "15px",
			          "height": "15px"
			        }
			      ]
			    },
			    {
			      "id": "s8",
			      "name": "writeAkku",
			      "max": 1,
			      "color": "rgb(255, 100, 100)",
			      "routes": [
			        {
			          "type": "horizontal",
			          "top": "158px",
			          "left": "280px",
			          "width": "460px",
			          "height": "0"
			        },
			        {
			          "type": "bottomright",
			          "top": "168px",
			          "left": "55px",
			          "width": "206px",
			          "height": "70px"
			        },
			        {
			          "type": "topleft",
			          "top": "158px",
			          "left": "261px",
			          "width": "20px",
			          "height": "15px"
			        }
			      ]
			    },
			    {
			      "id": "s9",
			      "name": "readPC",
			      "max": 1,
			      "color": "rgb(100, 255, 100)",
			      "routes": [
			        {
			          "type": "bottomleft",
			          "top": "100px",
			          "left": "279px",
			          "width": "450px",
			          "height": "70px"
			        },
			        {
			          "type": "topright",
			          "top": "45px",
			          "left": "236px",
			          "width": "43px",
			          "height": "70px"
			        }
			      ]
			    },
			    {
			      "id": "s10",
			      "name": "writePC",
			      "max": 1,
			      "color": "rgb(255, 100, 100)",
			      "routes": [
			        {
			          "type": "bottomleft",
			          "top": "112px",
			          "left": "285px",
			          "width": "450px",
			          "height": "70px"
			        },
			        {
			          "type": "topright",
			          "top": "38px",
			          "left": "235px",
			          "width": "50px",
			          "height": "82px"
			        }
			      ]
			    },
			    {
			      "id": "s11",
			      "name": "loadIR",
			      "max": 1,
			      "color": "rgb(100, 255, 100)",
			      "routes": [
			        {
			          "type": "topright",
			          "top": "85px",
			          "left": "408px",
			          "width": "40px",
			          "height": "70px"
			        },
			        {
			          "type": "bottomleft",
			          "top": "155px",
			          "left": "448px",
			          "width": "257px",
			          "height": "39px"
			        }
			      ]
			    },
			    {
			      "id": "s12",
			      "name": "writeIR",
			      "max": 1,
			      "color": "rgb(255, 100, 100)",
			      "routes": [
			        {
			          "type": "topright",
			          "top": "38px",
			          "left": "408px",
			          "width": "32px",
			          "height": "128px"
			        },
			        {
			          "type": "bottomleft",
			          "top": "167px",
			          "left": "440px",
			          "width": "257px",
			          "height": "39px"
			        }
			      ]
			    },
			    {
			      "id": "s13",
			      "name": "incPC",
			      "max": 1,
			      "color": "rgb(200, 200, 0)",
			      "routes": [
			        {
			          "type": "topright",
			          "top": "64px",
			          "left": "292px",
			          "width": "8px",
			          "height": "100px"
			        },
			        {
			          "type": "bottomleft",
			          "top": "164px",
			          "left": "300px",
			          "width": "395px",
			          "height": "54px"
			        }
			      ]
			    },
			    {
			      "id": "s14",
			      "name": "incPCz",
			      "max": 1,
			      "color": "rgb(200, 200, 0)",
			      "routes": [
			        {
			          "type": "topright",
			          "top": "48px",
			          "left": "323px",
			          "width": "21px",
			          "height": "100px"
			        },
			        {
			          "type": "bottomleft",
			          "top": "148px",
			          "left": "344px",
			          "width": "359px",
			          "height": "82px"
			        }
			      ]
			    },
			    {
			      "id": "dataBus",
			      "name": "Datenbus",
			      "max": 99999,
			      "base": 10,
			      "color": "rgb(255, 0, 0)",
			      "top": 170,
			      "left": 175,
			      "routes": [
			        {
			          "type": "vertical",
			          "top": "164px",
			          "left": "129px",
			          "width": "0",
			          "height": "31px"
			        },
			        {
			          "type": "bottomright",
			          "top": "100px",
			          "left": "275px",
			          "width": "120px",
			          "height": "95px"
			        },
			        {
			          "type": "vertical",
			          "top": "195px",
			          "left": "318px",
			          "width": "0",
			          "height": "17px"
			        },
			        {
			          "type": "topleft",
			          "top": "195px",
			          "left": "43px",
			          "width": "230px",
			          "height": "35px"
			        }
			      ]
			    },
			    {
			      "id": "addressBus",
			      "name": "Adressbus",
			      "max": 9999,
			      "base": 10,
			      "color": "rgb(0, 140, 0)",
			      "top": -3,
			      "left": 175,
			      "routes": [
			        {
			          "type": "topleft",
			          "top": "21px",
			          "left": "51px",
			          "width": "301px",
			          "height": "7px"
			        },
			        {
			          "type": "vertical",
			          "top": "21px",
			          "left": "224px",
			          "width": "0",
			          "height": "10px"
			        }
			      ]
			    },
			    {
			      "id": "MicroDataBus",
			      "name": "MicroDataBus",
			      "base": 10,
			      "max": 32767,
			      "color": "rgb(200, 0, 200)",
			      "left": 685,
			      "top": -3,
			      "routes": [
			        {
			          "type": "topright",
			          "top": "21px",
			          "left": "710px",
			          "width": "20px",
			          "height": "7px"
			        }
			      ]
			    },
			    {
			      "id": "IRout",
			      "name": "AusgangIR",
			      "max": 99999,
			      "base": 10,
			      "color": "rgb(0, 140, 0)",
			      "top": -3,
			      "left": 377,
			      "routes": [
			        {
			          "type": "topright",
			          "top": "21px",
			          "left": "384px",
			          "width": "11px",
			          "height": "7px"
			        },
			        {
			          "type": "topleft",
			          "top": "21px",
			          "left": "396px",
			          "width": "11px",
			          "height": "7px"
			        }
			      ]
			    },
			    {
			      "id": "opcode",
			      "name": "opcode",
			      "max": 99999,
			      "base": 10,
			      "color": "rgb(0, 140, 0)",
			      "top": -3,
			      "left": 443,
			      "routes": [
			        {
			          "type": "topright",
			          "top": "21px",
			          "left": "439px",
			          "width": "23px",
			          "height": "7px"
			        }
			      ]
			    },
			    {
			      "id": "AndB",
			      "name": "And gate B wire",
			      "max": 1
			    },
			    {
			      "id": "OrA",
			      "name": "Or gate A wire",
			      "max": 1
			    },
			    {
			      "id": "or1_ausgang",
			      "name": "or1_ausgang result wire",
			      "max": 1
			    },
			    {
			      "id": "compWire",
			      "name": "Zerocomparator result wire",
			      "max": 1,
			      "routes": [
			        {
			          "type": "vertical",
			          "top": "239px",
			          "left": "318px",
			          "width": "0",
			          "height": "16px"
			        },
			        {
			          "type": "topright",
			          "top": "59px",
			          "left": "321px",
			          "width": "15px",
			          "height": "140px"
			        },
			        {
			          "type": "bottomright",
			          "top": "200px",
			          "left": "319px",
			          "width": "17px",
			          "height": "46px"
			        }
			      ]
			    },
			    {
			      "id": "SteuerwortWriteWire",
			      "name": "Steuerwort write wire",
			      "max": 1
			    },
			    {
			      "id": "SteuerwortReadWire",
			      "name": "Steuerwort read wire",
			      "max": 1
			    }
			  ],
			  "manualswitches": [
			    {
			      "name": "SteuerwortWriteWireSwitch",
			      "wireId": "SteuerwortWriteWire",
			      "value": 1,
			      "top": 10,
			      "left": 765
			    },
			    {
			      "name": "SteuerwortReadWireSwitch",
			      "wireId": "SteuerwortReadWire",
			      "value": 0,
			      "top": 26,
			      "left": 765
			    }
			  ],
			  "leds": [
			    {
			      "wireId": "or1_ausgang",
			      "name": "or1_ausgang indication led",
			      "top": 35,
			      "left": 262,
			      "value": 0
			    },
			    {
			      "wireId": "compWire",
			      "name": "comp indication led",
			      "top": 259,
			      "left": 317,
			      "value": 0
			    },
			    {
			      "wireId": "s0",
			      "name": "s0 led",
			      "top": 62,
			      "left": 682,
			      "value": 0
			    },
			    {
			      "wireId": "s1",
			      "name": "s1 led",
			      "top": 74,
			      "left": 682,
			      "value": 0
			    },
			    {
			      "wireId": "s2",
			      "name": "s2 led",
			      "top": 86,
			      "left": 682,
			      "value": 0
			    }
			  ],
			  "andGates": [
			    {
			      "name": "and1",
			      "inAId": "s14",
			      "inBId": "compWire",
			      "outId": "OrA",
			      "top": 48,
			      "left": 300
			    }
			  ],
			  "orGates": [
			    {
			      "name": "or1",
			      "inAId": "OrA",
			      "inBId": "s13",
			      "outId": "or1_ausgang",
			      "top": 53,
			      "left": 270
			    }
			  ],
			  "norGates": [
			    
			  ],
			  "registers": [
			    {
			      "name": "PC",
			      "value": 0,
			      "base": 10,
			      "top": 50,
			      "left": 190,
			      "gates": [
			        {
			          "busId": "addressBus",
			          "writeWireId": "s10",
			          "readWireId": "s9"
			        }
			      ],
			      "incWireId": "or1_ausgang"
			    },
			    {
			      "name": "IR",
			      "value": 40008,
			      "base": 10,
			      "top": 50,
			      "left": 362,
			      "gates": [
			        {
			          "busId": "IRout",
			          "writeWireId": "s12",
			          "initialState": 0
			        },
			        {
			          "busId": "dataBus",
			          "readWireId": "s11"
			        }
			      ]
			    },
			    {
			      "name": "Akku",
			      "value": 42,
			      "base": 10,
			      "top": 250,
			      "left": 10,
			      "gates": [
			        {
			          "busId": "dataBus",
			          "writeWireId": "s8",
			          "readWireId": "s7"
			        }
			      ],
			      "incWireId": "s5",
			      "decWireId": "s6",
			      "maxValue": 255
			    }
			  ],
			  "bitregisters": [
			    {
			      "name": "Steuerwort",
			      "value": 0,
			      "wiresReadWireId": "SteuerwortReadWire",
			      "wiresWriteWireId": "SteuerwortWriteWire",
			      "base": 10,
			      "top": 50,
			      "left": 700,
			      "widegate": {
			        "busId": "MicroDataBus"
			      },
			      "wiregates": [
			        {
			          "wireId": "s0"
			        },
			        {
			          "wireId": "s1"
			        },
			        {
			          "wireId": "s2"
			        },
			        {
			          "wireId": "s3"
			        },
			        {
			          "wireId": "s4"
			        },
			        {
			          "wireId": "s5"
			        },
			        {
			          "wireId": "s6"
			        },
			        {
			          "wireId": "s7"
			        },
			        {
			          "wireId": "s8"
			        },
			        {
			          "wireId": "s9"
			        },
			        {
			          "wireId": "s10"
			        },
			        {
			          "wireId": "s11"
			        },
			        {
			          "wireId": "s12"
			        },
			        {
			          "wireId": "s13"
			        },
			        {
			          "wireId": "s14"
			        }
			      ]
			    }
			  ],
			  "memories": [
			    {
			      "name": "Datenspeicher",
			      "base": 10,
			      "content": "30003\n10007\n20008\n40008\n30001\n50000\n\n3\n2",
			      "top": 50,
			      "left": 10,
			      "addressgate": {
			        "busId": "addressBus",
			        "initialState": -1
			      },
			      "datagate": {
			        "busId": "dataBus",
			        "writeWireId": "s3",
			        "readWireId": "s4"
			      },
			      "undefinedString": "---",
			      "showContext": true
			    }
			  ],
			  "zerocomparators": [
			    {
			      "name": "Zero comparator 1",
			      "busId": "dataBus",
			      "wireId": "compWire",
			      "top": 214,
			      "left": 318
			    }
			  ],
			  "delays": [],
			  "filters": [
			    {
			      "name": "div10000",
			      "statement": "n/10000",
			      "busLeftId": "IRout",
			      "busRightId": "opcode",
			      "top": 21,
			      "left": 412
			    },
			    {
			      "name": "mod10000",
			      "statement": "n%10000",
			      "busLeftId": "addressBus",
			      "busRightId": "IRout",
			      "top": 21,
			      "left": 357
			    }
			  ],
			  "clocks": [],
			  "labels": [
			    {
			      "text": "Akku",
			      "top": 230,
			      "left": 10
			    },
			    {
			      "text": "PC",
			      "top": 30,
			      "left": 195
			    },
			    {
			      "text": "IR",
			      "top": 30,
			      "left": 372
			    },
			    {
			      "text": "Programmspeicher",
			      "top": 30,
			      "left": 70
			    }
			  ]
			}       		    
};