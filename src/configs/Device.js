import { 
    Dimensions, 
    Platform, 
    StatusBar 
} from 'react-native';

export const { width, height } = Dimensions.get('window');

export const OS = Platform.OS;
export const ios = (OS == 'ios');
export const android = (OS == 'android');
export const isIPhoneX = (ios && height == 812 && width == 375)
export const statusBarHeight = (ios ? (isIPhoneX ? 44 : 20) : StatusBar.currentHeight);
