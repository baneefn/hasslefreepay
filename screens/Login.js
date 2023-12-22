import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

GoogleSignin.configure({
  webClientId:
    '196436004994-jr25uv1n7b5tq27ntti6l1d76triac13.apps.googleusercontent.com',
});

const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const [areas, setAreas] = React.useState([]);
  const [selectedArea, setSelectedArea] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        let areaData = data.map(item => {
          return {
            code: item.alpha2Code,
            name: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`,
          };
        });

        setAreas(areaData);

        if (areaData.length > 0) {
          let defaultData = areaData.filter(a => a.code == 'US');

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.padding * 8,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => console.log('Login')}>
        {/* <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white,
          }}
        /> */}

        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.black,
            ...FONTS.h4,
          }}>
          Login
        </Text>
      </TouchableOpacity>
    );
  }

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 7,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.hassleLogo}
          resizeMode="contain"
          style={{
            width: '60%',
          }}
        />
      </View>
    );
  }

  // function renderForm() {
  //   return (
  //     <View
  //       style={{
  //         marginTop: SIZES.padding * 3,
  //         marginHorizontal: SIZES.padding * 3,
  //       }}>
  //       {/* Full Name */}
  //       <View style={{marginTop: SIZES.padding * 3}}>
  //         <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
  //           Full Name
  //         </Text>
  //         <TextInput
  //           style={{
  //             marginVertical: SIZES.padding,
  //             borderBottomColor: COLORS.white,
  //             borderBottomWidth: 1,
  //             height: 40,
  //             color: COLORS.white,
  //             ...FONTS.body3,
  //           }}
  //           placeholder="Enter Full Name"
  //           placeholderTextColor={COLORS.white}
  //           selectionColor={COLORS.white}
  //         />
  //       </View>

  //       {/* Phone Number */}
  //       <View style={{marginTop: SIZES.padding * 2}}>
  //         <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
  //           Phone Number
  //         </Text>

  //         <View style={{flexDirection: 'row'}}>
  //           {/* Country Code */}
  //           <TouchableOpacity
  //             style={{
  //               width: 100,
  //               height: 50,
  //               marginHorizontal: 5,
  //               borderBottomColor: COLORS.white,
  //               borderBottomWidth: 1,
  //               flexDirection: 'row',
  //               ...FONTS.body2,
  //             }}
  //             onPress={() => setModalVisible(true)}>
  //             <View style={{justifyContent: 'center'}}>
  //               <Image
  //                 source={icons.down}
  //                 style={{
  //                   width: 10,
  //                   height: 10,
  //                   tintColor: COLORS.white,
  //                 }}
  //               />
  //             </View>
  //             <View style={{justifyContent: 'center', marginLeft: 5}}>
  //               <Image
  //                 source={{uri: selectedArea?.flag}}
  //                 resizeMode="contain"
  //                 style={{
  //                   width: 30,
  //                   height: 30,
  //                 }}
  //               />
  //             </View>

  //             <View style={{justifyContent: 'center', marginLeft: 5}}>
  //               <Text style={{color: COLORS.white, ...FONTS.body3}}>
  //                 {selectedArea?.callingCode}
  //               </Text>
  //             </View>
  //           </TouchableOpacity>

  //           {/* Phone Number */}
  //           <TextInput
  //             style={{
  //               flex: 1,
  //               marginVertical: SIZES.padding,
  //               borderBottomColor: COLORS.white,
  //               borderBottomWidth: 1,
  //               height: 40,
  //               color: COLORS.white,
  //               ...FONTS.body3,
  //             }}
  //             placeholder="Enter Phone Number"
  //             placeholderTextColor={COLORS.white}
  //             selectionColor={COLORS.white}
  //           />
  //         </View>
  //       </View>

  //       {/* Password */}
  //       <View style={{marginTop: SIZES.padding * 2}}>
  //         <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
  //           Password
  //         </Text>
  //         <TextInput
  //           style={{
  //             marginVertical: SIZES.padding,
  //             borderBottomColor: COLORS.white,
  //             borderBottomWidth: 1,
  //             height: 40,
  //             color: COLORS.white,
  //             ...FONTS.body3,
  //           }}
  //           placeholder="Enter Password"
  //           placeholderTextColor={COLORS.white}
  //           selectionColor={COLORS.white}
  //           secureTextEntry={!showPassword}
  //         />
  //         <TouchableOpacity
  //           style={{
  //             position: 'absolute',
  //             right: 0,
  //             bottom: 10,
  //             height: 30,
  //             width: 30,
  //           }}
  //           onPress={() => setShowPassword(!showPassword)}>
  //           <Image
  //             source={showPassword ? icons.disable_eye : icons.eye}
  //             style={{
  //               height: 20,
  //               width: 20,
  //               tintColor: COLORS.white,
  //             }}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }

  // function renderButton() {
  //   return (
  //     <View style={{margin: SIZES.padding * 3}}>
  //       <TouchableOpacity
  //         style={{
  //           height: 60,
  //           backgroundColor: COLORS.black,
  //           borderRadius: SIZES.radius / 1.5,
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}
  //         onPress={() => navigation.navigate('Home')}>
  //         <Text style={{color: COLORS.white, ...FONTS.h3}}>Continue</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  function renderGoogleButton() {
    return (
      <View style={{margin: SIZES.padding * 3, marginTop: 50}}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // onPress={() => navigation.navigate('Home')}
          onPress={() =>
            onGoogleButtonPress().then(
              () => console.log('Signed in with Google!'),
              navigation.navigate('Home'),
            )
          }>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  // function renderAreaCodesModal() {
  //   const renderItem = ({item}) => {
  //     return (
  //       <TouchableOpacity
  //         style={{padding: SIZES.padding, flexDirection: 'row'}}
  //         onPress={() => {
  //           setSelectedArea(item);
  //           setModalVisible(false);
  //         }}>
  //         <Image
  //           source={{uri: item.flag}}
  //           style={{
  //             width: 30,
  //             height: 30,
  //             marginRight: 10,
  //           }}
  //         />
  //         <Text style={{...FONTS.body4}}>{item.name}</Text>
  //       </TouchableOpacity>
  //     );
  //   };

  //   return (
  //     <Modal animationType="slide" transparent={true} visible={modalVisible}>
  //       <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
  //         <View
  //           style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //           <View
  //             style={{
  //               height: 400,
  //               width: SIZES.width * 0.8,
  //               backgroundColor: COLORS.lightGreen,
  //               borderRadius: SIZES.radius,
  //             }}>
  //             <FlatList
  //               data={areas}
  //               renderItem={renderItem}
  //               keyExtractor={item => item.code}
  //               showsVerticalScrollIndicator={false}
  //               style={{
  //                 padding: SIZES.padding * 2,
  //                 marginBottom: SIZES.padding * 2,
  //               }}
  //             />
  //           </View>
  //         </View>
  //       </TouchableWithoutFeedback>
  //     </Modal>
  //   );
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient colors={[COLORS.lime, COLORS.emerald]} style={{flex: 1}}>
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {/* {renderForm()} */}
          {/* {renderButton()} */}
          {renderGoogleButton()}
        </ScrollView>
      </LinearGradient>
      {/* {renderAreaCodesModal()} */}
    </KeyboardAvoidingView>
  );
};

export default Login;
