import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button, Dialog} from '@rneui/themed';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import styles from '../styles/Style';

function QRscanner() {
  const [qrValue, setQrValue] = useState('');
  const [light, setLight] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const scannerRef = useRef(null);

  const copyToClipboard = () => {
    Clipboard.setString(qrValue);
    // Do not hide the dialog after copying
  };

  const openLink = () => {
    Linking.openURL(qrValue);
  };

  const reactivateScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.reactivate();
    }
    setShowDialog(false);
  };

  const onDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        ref={scannerRef}
        onRead={e => {
          setQrValue(e.data);
          setShowDialog(true);
        }}
        flashMode={
          light
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.auto
        }
        topContent={<></>}
        bottomContent={
          <Button
            title={`Flash ${light ? 'OFF' : 'ON'}`}
            // icon={{
            //   ...styles.iconButtonHome,
            //   size: 20,
            //   name: 'qr-code-scanner',
            // }}
            iconContainerStyle={styles.iconButtonHomeContainer}
            titleStyle={{...styles.titleButtonHome, fontSize: 20}}
            buttonStyle={{...styles.buttonHome, height: 50}}
            containerStyle={{
              ...styles.buttonHomeContainer,
              marginTop: 50,
              marginBottom: 10,
            }}
            onPress={() => {
              setLight(!light);
            }}
          />
        }
      />
      <Dialog
        isVisible={showDialog}
        onBackdropPress={onDialogClose}
        onBackButtonPress={onDialogClose}>
        <Dialog.Title
          titleStyle={{color: '#000', fontSize: 25}}
          title="Scanned QR:"
        />
        <Text style={{color: '#000', fontSize: 25}}>{qrValue}</Text>
        <Dialog.Actions style={{marginTop: 20}}>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={[styles.actionButton, {marginRight: 15}]}>
            <Text style={{color: COLORS.primary}}>Copy</Text>
          </TouchableOpacity>
          {qrValue.startsWith('http') && (
            <TouchableOpacity
              onPress={openLink}
              style={[styles.actionButton, {marginRight: 30}]}>
              <Text style={{color: COLORS.primary}}>Open Link</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={reactivateScanner}
            style={[styles.actionButton, {marginRight: 30}]}>
            <Text style={{color: COLORS.primary}}>Scan Again</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

export default QRscanner;
