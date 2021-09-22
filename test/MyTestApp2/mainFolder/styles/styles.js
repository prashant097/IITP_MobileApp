import { StyleSheet, Dimensions, PixelRatio } from "react-native";
export const window = Dimensions.get("window");
export const { height, width } = Dimensions.get("window");
// import {  marker } from "../src/images/index";

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;
export const IMAGE_HEIGHT_SMALL1 = window.width / 6;

export const IMAGE_WIDTH = window.width / 5;
export const IMAGE_HEIGHT_WIDTH = window.width / 10;
export const TEXT_WIDTH = window.width / 1;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#34A853",
    paddingTop: 55 - 55 * 0.75,
    alignItems: "center",
    justifyContent: "center"
  },
  FacebookStyle2: {
    flexDirection: 'row',

    // backgroundColor: '#d9f9b1',
    // paddingTop: 15,
    // paddingBottom: 5,
    
    padding: 15,
  
  },
  list_container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#34A853",
    paddingTop: 55 - 55 * 0.75,
    alignItems: "center"
  },
  calendar_container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  MainContainer_header: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 1,
    height: 20,
  },


  p_container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#34A853",
    paddingTop: 55 - 55 * 0.75,
    alignItems: "center",
    justifyContent: "center"
  },
  listview_container: {
    padding: 10,
    marginTop: 3,
    color: '#ff00ff',

    backgroundColor: '#d9f9b1',
  },
  listview_text: {
    color: '#4f603c', fontWeight: "bold",
    margin: 1,
    padding: 10
  },
  profile_Container: {
    textDecorationColor: "#0E1D5C",
    textTransform: 'capitalize',
    margin: 1,

    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
    color: "#0E1D5C",
    justifyContent: "center",
    alignItems: "center"


  },
  profileview_Container: {
    textDecorationColor: "#0E1D5C",
    textTransform: 'capitalize',
    margin: 0.5,

    lineHeight: 35 * 0.75,
    color: "#0E1D5C",
    justifyContent: "center",
    alignItems: "center"


  },
  profilevalue_Container: {
    textDecorationColor: "#0E1D5C",
    alignItems: 'baseline',
    margin: 1,
  },
  MainContainer_1: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 100 - 100 * 0.40,
  },

  loginContainer_1: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 100 - 100 * 0.40,
  },
  home_container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    width: 130,
    height: 130,
    borderRadius: 5,
    margin: 8,
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  TextIconStyle: {
    padding: 10,
    margin: 5,
  
    alignItems: 'center',

    // resizeMode: 'stretch',
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
    alignItems: 'center',

    resizeMode: 'stretch',
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  home_button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    width: 300,
    marginTop: 16
  },
  login_container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: "center",
    alignContent: "center"

  },
  login_textInput: {
    fontSize: 16,
    height: 40
  },
  login_inputLayout: {
    marginTop: 16,
    marginHorizontal: 36
  },
  loc_container: {
    flex: 1,
    color: "#34A853",
    alignItems: "center",
    justifyContent: "center"
  },
  stylOld: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  styleNew: {
    flex: 1
  },
  WebViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 40
  },
  ActivityIndicatorStyle: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  absoluteView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  },
  view: {
    position: "absolute",
    backgroundColor: "transparent"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }, touchable: {
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    // color: "#sfff",
    fontSize: 18,
    textAlign: "center",
    alignItems: "center",
    padding: 35 - 35 * 0.75,
    justifyContent: "center"

  },
  text_m: {
    color: "#0E1D5C",
    fontSize: 18,
    textAlign: "center",
    alignItems: "center",
    padding: 35 - 35 * 0.75,
    // paddingLeft: 35 - 35 * 0.75,
    // paddingBottom: 35 - 35 * 0.75,

    justifyContent: "center"

  },
  img_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1"
  },
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    // backgroundImage: marker,

    height: 250,
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
  },
  safe_container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 5,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "#0E1D5C",
    resizeMode: "cover" // or 'stretch'
  },

  inputLayout: {
    marginHorizontal: 36,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center"

  },
  input_line: {
    marginHorizontal: 36,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",

    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  input: {
    marginRight: 29,
    marginTop: 10,
    fontSize: 18,
    color: "#fff",
    borderColor: "gray"

  },
  view_container: {

    flexDirection: "row",
    justifyContent: "center",
  },
  buttonviewcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 45 - 45 * 0.75
  },
  buttonviewcontainer_locw: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 15 - 15 * 0.75
  },

  buttonviewcontainer_form: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // padding: 55 - 55 * 0.75

  },
  buttonviewcontainer_send: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center", backgroundColor: "#0E1D5C",
    textAlign: "center", color: "#fff",

    paddingTop: 45 - 45 * 0.75
  },
  buttonviewcontainer_1: {
    flex: 1,
    alignItems: 'center',

    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 2,

  },
  formButtonStyle: {
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 5,
    color: "#fff"
  },
  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 5,
    marginLeft: 30,
    marginRight: 30

  },

  heading_ButtonStyle: {

    marginLeft: 30,
    marginRight: 30

  },
  loginButton: {
    // backgroundColor: "#34A853",
    backgroundColor: "#0E1D5C",
    flex: 2,
    textAlign: "center", color: "#fff",
    padding: 10
  },
  loginButton_Send: {
    // backgroundColor: "#34A853",
    backgroundColor: "#0E1D5C",
    textAlign: "center", color: "#fff",
    alignContent: "center",
    alignItems: "center"
  },

  viewButton_Send: {
    // backgroundColor: "#34A853",
    backgroundColor: "#0E1D5C",
    textAlign: "center", color: "#fff",
    alignContent: "center",
    alignItems: "center",
    fontWeight: "bold"

  },
  viewStyle: {
    justifyContent: 'center', flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS == 'ios' ? 29 : 0,
  },
  textStyle: {
    padding: 11,
  },
  buttontext: {
    color: "#C7C7CD",
    backgroundColor: "#ffffff"
  },
  header_TextColor: {
    backgroundColor: "#064D81"
  },

  header_TitleStyle: {
    backgroundColor: "#064D81",
    color: "#ffffff"
  },
  search_text_bg: { backgroundColor: 'white' },
  search_container_bg: { backgroundColor: '#064D81', borderWidth: 1, borderRadius: 5 },
  app_color_code: {
    backgroundColor: "#064D81",
    color: "#ffffff"
  },

  textInput: {
    fontSize: 16,
    height: 40,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75
  },

  splashcontainer: {

    height: window.height,
    width: window.width
  },
  logo: {
    height: IMAGE_HEIGHT,

    resizeMode: "contain",
    padding: 5
  },
  progress_container: {
    flex: 1,    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  form_logo: {
    height: IMAGE_HEIGHT_SMALL1,
    resizeMode: "contain",
    width: IMAGE_WIDTH,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  register: {
    marginBottom: 20,
    width: window.width - 100,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#ffae"
  },

  containerView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffebcd",
    borderStyle: "solid",
    borderColor: "#000000"
  },
  loginText: {
    fontSize: 20,
    marginBottom: 10
  },
  inputFields: {
    fontSize: 20,
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 30,
    marginBottom: 10
  },
  buttonContainer: {
    flex: 1
  },
  wrapper: {
    flex: 1
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20
  },
  footerView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.05,
    textAlign: "center",

    backgroundColor: "#064D81"
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 25,
    height: 25,
    margin: 5,
    // borderRadius: 100 / 2,
    // alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButton: {
    backgroundColor: "#064D81",
    color: "white",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center"
  }
});