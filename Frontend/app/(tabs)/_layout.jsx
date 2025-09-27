import { useAuth } from '@clerk/clerk-expo';
import { AntDesign, Ionicons , Entypo , FontAwesome5} from '@expo/vector-icons';
import { Redirect, Stack } from 'expo-router';
import {Tabs} from 'expo-router';
import { COLORS } from '../../constant/color';

const _layout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  return <Tabs
    screenOptions={{
      headerShown:false,
      tabBarActiveTintColor: COLORS.primary, 
      tabBarInactiveTintColor: COLORS.textLight,
      tabBarStyle:{
        backgroundColor:COLORS.white,
        borderTopColor:COLORS.border,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingTop: 8,
        height: 80,
      },
      tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "600",
      },
    }}
  >
    <Tabs.Screen
    name="index"
    options={{
      title:"Home",
      tabBarIcon:({color,size})=> <AntDesign name="home" size={size} color={color}/>,
    }}
    />

    <Tabs.Screen
    name="crop"
    options={{
      title:"Crop-Care",
      tabBarIcon:({color,size})=> <Entypo name="newsletter" size={size} color={color}/>,
    }}
    />

    <Tabs.Screen
    name="prog"
    options={{
      title:"Record",
      tabBarIcon:({color,size})=> <FontAwesome5 name="circle-notch" size={size} color={color}/>,
    }}
    />

    <Tabs.Screen
    name="scheme"
    options={{
      title:"Scheme",
      tabBarIcon:({color,size})=> <FontAwesome5 name="heart" size={size} color={color}/>,
    }}
    />

    <Tabs.Screen
    name="user"
    options={{
      title:"User",
      tabBarIcon:({color,size})=> <FontAwesome5 name="user-circle" size={size} color={color}/>,
    }}
    />
  </Tabs>;
};

export default _layout;