import { Platform } from 'react-native';
const JSON5 = require('json5');
import DeviceInfo from 'react-native-device-info';

// export const RNFS = require('react-native-fs');
// import AsyncStorage from "@react-native-community/async-storage";

export const app_Name = DeviceInfo.getApplicationName();

export const dev_info = {
    dev_id: DeviceInfo.getUniqueId(),
    dev_model: DeviceInfo.getModel(),
    dev_brand: DeviceInfo.getBrand()
  };
export const uuid = DeviceInfo.getUniqueId();
export const app_info = {
    app_Name: DeviceInfo.getApplicationName(),
    app_version: DeviceInfo.getVersion()
  };
export const appversionname = app_info.app_Name + "1dot";

// export const dirHome = Platform.select({
//     android: `${RNFS.ExternalStorageDirectoryPath}/BhuvanApps/${app_Name}`,
//     ios: `${RNFS.DocumentDirectoryPath}/${app_Name}`,
//   });

export const plusPrint = (n) => {
    // console.log("print valueis::" + n);
  }