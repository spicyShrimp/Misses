import { 
    Dimensions, 
    Platform, 
    StatusBar 
} from 'react-native';

export const { width, height } = Dimensions.get('window');
export const statusBarHeight = StatusBar.currentHeight;

export const OS = Platform.OS;
export const ios = (OS == 'ios');
export const android = (OS == 'android');
export const isIPhoneX = (OS == 'ios' && height == 812 && width == 375)
