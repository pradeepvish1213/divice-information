import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    deviceType,
    deviceDetect
} from "react-device-detect";
function mapStateToProps(state) {
    return {};
}
var address = require('address');

class Divice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            OsData: deviceDetect(),
            IPAddress: null
        };
        this.setStateIP();
        address(function (err, addrs) {
            console.log(addrs.ip, addrs.ipv6, addrs.mac);
            // '192.168.0.2', 'fe80::7aca:39ff:feb0:e67d', '78:ca:39:b0:e6:7d'
        });

        address('vboxnet', function (err, addrs) {
            console.log(addrs.ip, addrs.ipv6, addrs.mac);
            // '192.168.56.1', null, '0a:00:27:00:00:00'
        });
    }

    setStateIP() {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(json => this.setState({IPAddress: json.ip}))

    };

     showMacAddress =()=> {
        // var obj = new ActiveXObject("WbemScripting.SWbemLocator");
        // var s = obj.ConnectServer(".");
        // var properties = s.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration");
        // var e = new Enumerator(properties);
        // var output;
        // output = '<table border="0" cellPadding="5px" cellSpacing="1px" bgColor="#CCCCCC">';
        // output = output + '<tr bgColor="#EAEAEA"><td>Caption</td><td>MACAddress</td></tr>';
        // while (!e.atEnd()) {
        //     e.moveNext();
        //     var p = e.item();
        //     if (!p) continue;
        //     output = output + '<tr bgColor="#FFFFFF">';
        //     output = output + '<td>' + p.Caption; +'</td>';
        //     output = output + '<td>' + p.MACAddress + '</td>';
        //     output = output + '</tr>';
        // }
        // output = output + '</table>';
        // document.getElementById("box").innerHTML = output;
    }


    getData = () => {
        const {OsData} = this.state;
        let html = [];
        for (const property in OsData) {
            html.push(<div>
                <lable>{property} </lable>
                <label><b>:{OsData[property]}</b></label>
            </div>)
        }

        return <div>{html}</div>
    }


    render() {
        return (
            <div>
                {
                    this.getData()
                }
                <div>
                    <lable>deviceType:</lable>
                    <label><b>:{deviceType}</b></label>
                </div>
                <div>
                    <lable>IP Address :</lable>
                    <label><b>:{this.state.IPAddress}</b></label>
                </div>
                <div id='box'></div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Divice);