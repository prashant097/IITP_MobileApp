import React from "react";
import { View, PermissionsAndroid, Alert, Text, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { LogBox } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

LogBox.ignoreAllLogs();
export async function GetAllPermissions() {
  try {
    if (Platform.OS === "android") {
      const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);
      return userResponse;
    }
  } catch (err) {
    plusPrint(err);
  }
  return null;
}