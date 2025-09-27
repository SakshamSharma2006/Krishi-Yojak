import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../constant/api.js";
import { styles } from "../../assets/styles/user.js";

export default function Index() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isExistingUser, setIsExistingUser] = useState(false);

  const router = useRouter();
  const { signOut, user } = useClerk();

  // Helper function to handle contact input
  const handleContactChange = (text) => {
    if (text.length > 10) {
      Alert.alert("Error", "Contact number cannot be more than 10 digits.");
      return;
    }
    setContact(text);
  };

  // Load user data if ID exists or fetch from Clerk
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Try to get stored userId
        let storedId = await AsyncStorage.getItem("userId");

        // If no storedId, fetch from backend using Clerk email
        if (!storedId && user?.emailAddresses?.[0]?.emailAddress) {
          const email = user.emailAddresses[0].emailAddress;
          const res = await fetch(`${API_URL}/users/email/${email}`);
          if (res.ok) {
            const data = await res.json();
            if (data.id) storedId = data.id;
          }
        }

        if (storedId) {
          setUserId(storedId);
          await AsyncStorage.setItem("userId", storedId);

          const res = await fetch(`${API_URL}/users/${storedId}`);
          if (res.ok) {
            const userData = await res.json();
            setName(userData.username || "");
            setDob(userData.userbirth || "");
            setContact(userData.usercontact || "");
            setIsExistingUser(true);
          }
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    loadUser();
  }, [user]);

  // Date picker
  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = `${selectedDate.getFullYear()}-${(
        "0" +
        (selectedDate.getMonth() + 1)
      ).slice(-2)}-${("0" + selectedDate.getDate()).slice(-2)}`;
      setDob(formattedDate);
    }
  };

  // Save or Update
  const handleSave = async () => {
    if (!name || !dob || !contact) {
      Alert.alert("Error", "Please fill all the fields before saving.");
      return;
    }

    setLoading(true);

    try {
      let response;
      if (userId) {
        response = await fetch(`${API_URL}/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: name,
            userbirth: dob,
            usercontact: contact,
          }),
        });
      } else {
        response = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: name,
            userbirth: dob,
            usercontact: contact,
          }),
        });
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        Alert.alert("Error", "Invalid server response.");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to save data");
      }

      // Save userId to AsyncStorage for persistence
      if (data.id) {
        setUserId(data.id);
        await AsyncStorage.setItem("userId", String(data.id));
        setIsExistingUser(true);
      }

      Alert.alert("Success", isExistingUser ? "Data updated!" : "Data saved!");
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to sign out?")) {
        await signOut();
        await AsyncStorage.removeItem("userId");
        router.replace("/(auth)/sign-in");
      }
    } else {
      Alert.alert(
        "Sign Out",
        "Are you sure you want to sign out?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Sign Out",
            style: "destructive",
            onPress: async () => {
              await signOut();
              await AsyncStorage.removeItem("userId");
              router.replace("/(auth)/sign-in");
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to Krishi Yojak</Text>

        <Image
          source={require("../../assets/images/k.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#000"
          value={name}
          onChangeText={setName}
        />

        {/* Date of Birth */}
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.dobContainer}
          onPress={() => setShowPicker(true)}
        >
          <Text style={dob ? styles.dobText : styles.dobPlaceholder}>
            {dob || "Select Date of birth"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={onChange}
          />
        )}

        {/* Contact */}
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your contact number"
          placeholderTextColor="#000"
          keyboardType="phone-pad"
          value={contact}
          onChangeText={handleContactChange}
        />

        {/* Save/Update button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : isExistingUser ? "Update" : "Save"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signOut]}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favButton}
          onPress={() => router.push("/(blog)/Favorite")}
        >
          <Text style={styles.favText}>View Agriculture Essential</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
