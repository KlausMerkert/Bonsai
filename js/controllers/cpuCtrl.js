'use strict';

bonsaiApp.controller('bonsaiCpuCtrl',
    function ($scope, $routeParams) {
        $scope.base = 10;

        $scope.cpu = {
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
                            'left': '446px',
                            'width': '132px',
                            'height': '70px'
                         }, {
                            'type': 'bottomleft',
                            'top': '155px',
                            'left': '578px',
                            'width': '217px',
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
                            'left': '446px',
                            'width': '124px',
                            'height': '128px'
                         }, {
                            'type': 'bottomleft',
                            'top': '167px',
                            'left': '570px',
                            'width': '225px',
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
                            'width': '70px',
                            'height': '100px'
                         }, {
                            'type': 'bottomleft',
                            'top': '164px',
                            'left': '362px',
                            'width': '433px',
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
                            'width': '47px',
                            'height': '100px'
                         }, {
                            'type': 'bottomleft',
                            'top': '148px',
                            'left': '370px',
                            'width': '433px',
                            'height': '82px'
                                        
                        }
                    ]
                }, {
                    'id': 'dataBus',
                    'name': 'Datenbus',
                    'max': 99999,
                    'base': 10,
                    'color': 'rgb(255, 0, 0)',
                    'top': 160,
                    'left': 175,
                    'routes': [
                        {
                            'type': 'vertical',
                            'top': '164px',
                            'left': '129px',
                            'width': '0',
                            'height': '21px'
                        },
                        {
                            'type': 'bottomright',
                            'top': '100px',
                            'left': '313px',
                            'width': '120px',
                            'height': '21px'
                        },
                        {
                            'type': 'topleft',
                            'top': '121px',
                            'left': '273px',
                            'width': '38px',
                            'height': '42px'
                        },
                        {
                            'type': 'vertical',
                            'top': '122px',
                            'left': '300px',
                            'width': '0',
                            'height': '7px'
                        },
                        {
                            'type': 'topleft',
                            'top': '185px',
                            'left': '43px',
                            'width': '210px',
                            'height': '45px'
                        },
                        {
                            'type': 'bottomright',
                            'top': '165px',
                            'left': '253px',
                            'width': '20px',
                            'height': '20px'
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
                            'width': '339px',
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
                            'height': '17px',
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
                            'top': '103px',
                            'left': '748px',
                            'width': '23px',
                            'height': '69px'
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
                            'height': '80px',
                         }, {
                            'type': 'bottomleft',
                            'top': '165px',
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
                    'left': 415,
                    'routes': [
                        {
                            'type': 'topright',
                            'top': '21px',
                            'left': '422px',
                            'width': '11px',
                            'height': '7px'
                        },
                        {
                            'type': 'topleft',
                            'top': '21px',
                            'left': '434px',
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
                    'left': 476,
                    'routes': [
                        {
                            'type': 'topright',
                            'top': '21px',
                            'left': '477px',
                            'width': '11px',
                            'height': '50px'
                        },
                        {
                            'type': 'topleft',
                            'top': '121px',
                            'left': '442px',
                            'width': '30px',
                            'height': '7px'
                        },
                        {
                            'type': 'bottomright',
                            'top': '73px',
                            'left': '474px',
                            'width': '14px',
                            'height': '48px'
                        }
                    ] 
                }, {
                    'id': 'DecoderMPC',
                    'name': 'BefehlsdecoderZuMPC',
                    'max': 99,
                    'base': 10,
                    'color': 'rgb(0, 140, 140)',
                    'top': 283,
                    'left': 570,
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
                            'top': '265px',
                            'left': '518px',
                            'width': '63px',
                            'height': '43px'
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
                            'top': '150px',
                            'left': '300px',
                            'width': '0',
                            'height': '16px'
                        },
                        {
                            'type': 'topright',
                            'top': '59px',
                            'left': '321px',
                            'width': '7px',
                            'height': '50px'
                        },
                        {
                            'type': 'bottomright',
                            'top': '110px',
                            'left': '301px',
                            'width': '27px',
                            'height': '50px'
                        }
                    ]
                }
            ],
            'manualswitches': [
                /*{
                    'name': 'DatenspeicherAddressReadWireSwitch',
                    'wireId': 'DatenspeicherAddressReadWire',
                    'value': 1,
                    'top': 40,
                    'left': 80
                }*/
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
                    'top': 170,
                    'left': 300
                }, {
                    'wireId': 's0',
                    'name': 's0 led',
                    'top': 62,
                    'left': 782
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
                    'incWireId': 'or1_ausgang',
                }, {
                    'name': 'IR',
                    'value': 40008,
                    'base' : 10,
                    'top' : 50,
                    'left': 400,
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
                    'decWireId': 's6'
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
                    }
                },
                {
                    'name': "Befehlsdecoder",
                    'base': 10,
                    'content': "0\n10\n20\n30\n40\n50",
                    'top': 150,
                    'left':400,
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
                    }
                },
                {
                    'name': "Mikroprogrammspeicher",
                    'base': 10,
                    'content': "1024\n3080\n1032\n4096\n4100\n4096\n\n\n\n\n4096\n4232\n4104\n12320\n4368\n4352\n2\n\n\n\n4096\n4232\n4160\n4104\n12352\n4368\n4352\n2\n\n\n4608\n2\n\n\n\n\n\n\n\n\n4096\n4104\n20488\n8192\n2\n\n\n\n\n\n4096\n4101",
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
                    }
                }
            ],
            'zerocomparators': [
                {
                    'name': 'Zero comparator 1',
                    'busId': 'dataBus',
                    'wireId': 'compWire',
                    'top': 130,
                    'left': 300
                }
            ],
            'delays': [
                {
                    'name': 'ClockDelay',
                    'delay': 50,
                    'busLeftId': 'clockdelayed',
                    'busRightId': 'clock',
                    'top': 300,
                    'left': 738
                }
            ],
            'filters': [
                {
                    'name': 'div10000',
                    'statement': 'n/10000',                 
                    'busLeftId': 'IRout',
                    'busRightId': 'opcode',
                    'top': 21,
                    'left': 450
                 },
                 {
                    'name': 'mod10000',
                    'statement': 'n%10000',                 
                    'busLeftId': 'addressBus',
                    'busRightId': 'IRout',
                    'top': 21,
                    'left': 395
                 }
            ],
            'clocks': [
                {
                    'name': 'Takt',
                    'wireId': 'clock',
                    'frequency': 0,
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
                    'top': 130,
                    'left': 475
                },
                {
                    'text': 'PC',
                    'top': 30,
                    'left': 195
                },
                {
                    'text': 'IR',
                    'top': 30,
                    'left': 410
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

        var i, j;
        for (i = 0; i < $scope.cpu.buses.length; i++) {
            $scope.cpu.buses[i].object = new Bus();
        }
        $scope.findBus = function (id) {
            for (var i = 0; i < $scope.cpu.buses.length; i++) {
                if ($scope.cpu.buses[i].id == id) {
                    return $scope.cpu.buses[i].object;
                }
            }
            throw BusNotFound(
                "The bus with id " + id + " was not found.",
                id
            );1
        };
        for (i = 0; i < $scope.cpu.manualswitches.length; i++) {
            $scope.cpu.manualswitches[i].wire = $scope.findBus($scope.cpu.manualswitches[i].wireId);
        }
        for (i = 0; i < $scope.cpu.clocks.length; i++) {
            $scope.cpu.clocks[i].wire = $scope.findBus($scope.cpu.clocks[i].wireId);
        }
        for (i = 0; i < $scope.cpu.leds.length; i++) {
            $scope.cpu.leds[i].wire = $scope.findBus($scope.cpu.leds[i].wireId);
        }
        for (i = 0; i < $scope.cpu.andGates.length; i++) {
            if ($scope.cpu.andGates[i].inAId) {
                $scope.cpu.andGates[i].inA = $scope.findBus($scope.cpu.andGates[i].inAId);
            }
            if ($scope.cpu.andGates[i].inBId) {
                $scope.cpu.andGates[i].inB = $scope.findBus($scope.cpu.andGates[i].inBId);
            }
            if ($scope.cpu.andGates[i].outId) {
                $scope.cpu.andGates[i].out = $scope.findBus($scope.cpu.andGates[i].outId);
            }
        }
        for (i = 0; i < $scope.cpu.orGates.length; i++) {
            if ($scope.cpu.orGates[i].inAId) {
                $scope.cpu.orGates[i].inA = $scope.findBus($scope.cpu.orGates[i].inAId);
            }
            if ($scope.cpu.orGates[i].inBId) {
                $scope.cpu.orGates[i].inB = $scope.findBus($scope.cpu.orGates[i].inBId);
            }
            if ($scope.cpu.orGates[i].outId) {
                $scope.cpu.orGates[i].out = $scope.findBus($scope.cpu.orGates[i].outId);
            }
        }
        for (i = 0; i < $scope.cpu.norGates.length; i++) {
            if ($scope.cpu.norGates[i].inAId) {
                $scope.cpu.norGates[i].inA = $scope.findBus($scope.cpu.norGates[i].inAId);
            }
            if ($scope.cpu.norGates[i].inBId) {
                $scope.cpu.norGates[i].inB = $scope.findBus($scope.cpu.norGates[i].inBId);
            }
            if ($scope.cpu.norGates[i].outId) {
                $scope.cpu.norGates[i].out = $scope.findBus($scope.cpu.norGates[i].outId);
            }
        }
        for (i = 0; i < $scope.cpu.registers.length; i++) {
            if ($scope.cpu.registers[i].incWireId) {
                $scope.cpu.registers[i].incWire = $scope.findBus($scope.cpu.registers[i].incWireId);
            }
            if ($scope.cpu.registers[i].decWireId) {
                $scope.cpu.registers[i].decWire = $scope.findBus($scope.cpu.registers[i].decWireId);
            }
            if ($scope.cpu.registers[i].clrWireId) {
                $scope.cpu.registers[i].clrWire = $scope.findBus($scope.cpu.registers[i].clrWireId);
            }
            for (j = 0; j < $scope.cpu.registers[i].gates.length; j++) {
                $scope.cpu.registers[i].gates[j].bus = $scope.findBus($scope.cpu.registers[i].gates[j].busId);
                if ($scope.cpu.registers[i].gates[j].writeWireId) {
                    $scope.cpu.registers[i].gates[j].writeWire = $scope.findBus($scope.cpu.registers[i].gates[j].writeWireId);
                }
                if ($scope.cpu.registers[i].gates[j].readWireId) {
                    $scope.cpu.registers[i].gates[j].readWire = $scope.findBus($scope.cpu.registers[i].gates[j].readWireId);
                }
            }
        }
        for (i = 0; i < $scope.cpu.bitregisters.length; i++) {
            $scope.cpu.bitregisters[i].widegate.bus = $scope.findBus($scope.cpu.bitregisters[i].widegate.busId);
            if ($scope.cpu.bitregisters[i].widegate.writeWireId) {
                $scope.cpu.bitregisters[i].widegate.writeWire = $scope.findBus($scope.cpu.bitregisters[i].widegate.writeWireId);
            }
            if ($scope.cpu.bitregisters[i].widegate.readWireId) {
                $scope.cpu.bitregisters[i].widegate.readWire = $scope.findBus($scope.cpu.bitregisters[i].widegate.readWireId);
            }
            for (j = 0; j < $scope.cpu.bitregisters[i].wiregates.length; j++) {
                $scope.cpu.bitregisters[i].wiregates[j].wire = $scope.findBus($scope.cpu.bitregisters[i].wiregates[j].wireId);
            }
        }
        for (i = 0; i < $scope.cpu.memories.length; i++) {
            $scope.cpu.memories[i].addressgate.bus = $scope.findBus($scope.cpu.memories[i].addressgate.busId);
            if ($scope.cpu.memories[i].addressgate.readWireId) {
                $scope.cpu.memories[i].addressgate.readWire = $scope.findBus($scope.cpu.memories[i].addressgate.readWireId);
            }
            $scope.cpu.memories[i].datagate.bus = $scope.findBus($scope.cpu.memories[i].datagate.busId);
            if ($scope.cpu.memories[i].datagate.writeWireId) {
                $scope.cpu.memories[i].datagate.writeWire = $scope.findBus($scope.cpu.memories[i].datagate.writeWireId);
            }
            if ($scope.cpu.memories[i].datagate.readWireId) {
                $scope.cpu.memories[i].datagate.readWire = $scope.findBus($scope.cpu.memories[i].datagate.readWireId);
            }
        }
        for (i = 0; i < $scope.cpu.zerocomparators.length; i++) {
            $scope.cpu.zerocomparators[i].bus = $scope.findBus($scope.cpu.zerocomparators[i].busId);
            if ($scope.cpu.zerocomparators[i].wireId) {
                $scope.cpu.zerocomparators[i].wire = $scope.findBus($scope.cpu.zerocomparators[i].wireId);
            }
        }
        for (i = 0; i < $scope.cpu.delays.length; i++) {
            if ($scope.cpu.delays[i].busLeftId) {
                $scope.cpu.delays[i].busLeft = $scope.findBus($scope.cpu.delays[i].busLeftId);
            }
            if ($scope.cpu.delays[i].busRightId) {
                $scope.cpu.delays[i].busRight = $scope.findBus($scope.cpu.delays[i].busRightId);
            }
        }
        for (i = 0; i < $scope.cpu.filters.length; i++) {
            if ($scope.cpu.filters[i].busLeftId) {
                $scope.cpu.filters[i].busLeft = $scope.findBus($scope.cpu.filters[i].busLeftId);
            }
            if ($scope.cpu.filters[i].busRightId) {
                $scope.cpu.filters[i].busRight = $scope.findBus($scope.cpu.filters[i].busRightId);
            }
        }

        $scope.selectedEditor = undefined;
        $scope.selectEditor = function (index) {
            $scope.selectedEditor = index;
        };

        $scope.splitLines = function (string) {
            return string.replace(/\r\n|\n\r|\n|\r/g,"\n").split("\n")
        };
        $scope.readFile = function (memoryNumber) {
            var input = document.getElementById('filename-' + $scope.cpu.memories[memoryNumber].name);
            var file = input.files[0];
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                $scope.$apply(function () {
                    $scope.cpu.memories[memoryNumber].content = reader.result;
                    $scope.cpu.memories[memoryNumber].fileName = file.name;
                });
            });
            console.log(file);
            reader.readAsText(file);
        };
        $scope.saveFile = function (memoryNumber) {
            var url;
            var blob = new Blob([$scope.cpu.memories[memoryNumber].content], {type : 'application/bonsai'});
            if (window.webkitURL) {
                url = window.webkitURL.createObjectURL(blob);
            } else {
                url = window.URL.createObjectURL(blob);
            }
            // initiate download by adding a <a> element and invoking a click on it
            var downloadLink = document.createElement("a");
            downloadLink.href = url;
            if ($scope.cpu.memories[memoryNumber].fileName) {
                downloadLink.download = $scope.cpu.memories[memoryNumber].fileName
            } else {
                downloadLink.download = $scope.cpu.memories[memoryNumber].name + ".bonsai";
            }
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };

        $scope.errors = [];
        $scope.$on('error', function (event, message) {
            $scope.errors.push(message)
        });
    }
);