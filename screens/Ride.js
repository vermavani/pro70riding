import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewPagerAndroidBase } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
  
    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState === "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (

      <View style={styles.container}>
      
      <View>
      <Text style = {styles.head}>
      KEEP RIDING!!
      </Text>
      </View>
        <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Request for Camera Permission"}
        </Text>
        
       
        
          <TouchableOpacity
            style={[styles.button, { marginTop: 60 }]}
            onPress={() => this.getCameraPermissions("scanner")}
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity> 
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink"
  },
head:{

fontSize:50,
color:"white",
fontWeight:"bold",
marginTop:10
},


  text: {
    color: "purple",
    fontWeight:"bold",
    fontSize: 40
  

  },
  button: {
    width: "50%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 20,
    borderWidth: 5
  },
  buttonText: {
    fontSize: 30,
    fontStyle:"Display",
    color: "white"
  }
});
