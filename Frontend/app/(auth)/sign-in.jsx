import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import {authStyles} from "../../assets/styles/auth.styles"
import { Image } from "react-native";
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { COLORS } from '../../constant/color';
import { Ionicons} from "@expo/vector-icons"
import { Alert } from 'react-native';


const SignInscreen= () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password){
        Alert.alert("Error", "Fill in all the fields")
        return
    }

    if(!isLoaded) return;
    setLoading(true)
    try{
         const signInAttempt = await signIn.create({
        identifier: email,
        password})

        if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        } else {
        Alert.alert("Error", "Sign-in failed. Try again");
        }
    }catch(error){
        Alert.alert("Error", "Sign-in failed. Try again");
       console.error(JSON.stringify(error, null, 2));
    }finally{
        setLoading(false);
    }
  }

  
  return (
    <View style={authStyles.container}>
        <KeyboardAvoidingView
            style={authStyles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios"? 64:0}
          >
            <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
         >
            <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/k.jpg")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Welcome to Krishi Yojak </Text>
          <Text style={authStyles.subtitle}>Krishi Yojak – Empowering Farmers, Cultivating the Future.</Text>
         

          <View style={authStyles.inputContainer}>
            <TextInput
            style={authStyles.textInput}
            placeholder="Enter Email"
            placeholderTextColor={COLORS.textLight}
            value={email}
            onChangeText={setEmail}
            KeyboardType="email-address"
            autoCapitalize="none"
            />
            
          </View>

          <View style={authStyles.inputContainer}>
            <TextInput
            style={authStyles.textInput}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            />
            <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={()=>setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword?"eye-outline":"eye-off-outline"}
                      size={20}
                      color={COLORS.textLight}
                    />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
          style={[authStyles.authButton , loading && authStyles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={loading}
          activeOpacity={0.8}
          >
            <Text style={authStyles.buttonText}>{loading ? "Signing In...":"Sign In"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={authStyles.linkContainer}
            onPress={()=> router.push("/(auth)/sign-up")}
          >
            <Text style={authStyles.linkText}>
                Don&apos;t have an account? <Text style={authStyles.link}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
       
         </ScrollView>
        </KeyboardAvoidingView>
        
       

    </View>
  )
}

export default SignInscreen;