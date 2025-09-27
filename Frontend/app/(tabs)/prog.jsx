import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const { cropData } = useLocalSearchParams();
  const newCrop = cropData ? JSON.parse(cropData) : null;

  const [activeCrops, setActiveCrops] = useState([]);
  const [selectedCropForPicker, setSelectedCropForPicker] = useState("");
  const [reminderTime, setReminderTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempTime, setTempTime] = useState(new Date());

  // Custom handler to show picker repeatedly
  const handleReminderButtonPress = () => {
    setTempTime(new Date());
    setShowTimePicker(true); // show the picker immediately
  };

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Notification permissions not granted!");
      }
    })();

    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedCrops = await AsyncStorage.getItem("activeCrops");
      if (storedCrops) {
        const crops = JSON.parse(storedCrops);
        setActiveCrops(crops);
        if (crops.length > 0) setSelectedCropForPicker(crops[0].id);
      }

      const storedReminder = await AsyncStorage.getItem("reminderTime");
      if (storedReminder) {
        const parsedTime = new Date(JSON.parse(storedReminder));
        if (parsedTime > new Date()) {
          setReminderTime(parsedTime);
          scheduleNotificationsForAllCrops(parsedTime);
        } else {
          await AsyncStorage.removeItem("reminderTime");
        }
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    if (newCrop) addNewCrop(newCrop);
  }, [cropData]);

  const addNewCrop = async (crop) => {
    try {
      const existingCrops = await AsyncStorage.getItem("activeCrops");
      let crops = existingCrops ? JSON.parse(existingCrops) : [];

      if (crops.find((c) => c.id === crop.id)) {
        Alert.alert("Info", `${crop.name} is already being cultivated!`);
        return;
      }

      const newCropData = {
        ...crop,
        startTime: Date.now(),
        growthMs: crop.durationDays
          ? crop.durationDays * 24 * 60 * 60 * 1000
          : 10 * 60 * 1000,
      };

      crops.push(newCropData);
      await AsyncStorage.setItem("activeCrops", JSON.stringify(crops));
      setActiveCrops(crops);
      setSelectedCropForPicker(newCropData.id);

      if (reminderTime) scheduleNotificationsForAllCrops(reminderTime);

      Alert.alert("Success", `${crop.name} cultivation started!`);
    } catch (error) {
      console.error("Failed to add crop:", error);
    }
  };

  const calculateGrowthPercentage = (crop) => {
    if (crop.startTime > 0) {
      const timePassed = Date.now() - crop.startTime;
      return Math.min(100, (timePassed / crop.growthMs) * 100);
    }
    return 0;
  };

  const removeCrop = async (cropId) => {
    try {
      const updatedCrops = activeCrops.filter((crop) => crop.id !== cropId);
      await AsyncStorage.setItem("activeCrops", JSON.stringify(updatedCrops));
      setActiveCrops(updatedCrops);

      if (selectedCropForPicker === cropId && updatedCrops.length > 0) {
        setSelectedCropForPicker(updatedCrops[0].id);
      } else if (updatedCrops.length === 0) {
        setSelectedCropForPicker("");
      }

      if (reminderTime) scheduleNotificationsForAllCrops(reminderTime);
    } catch (error) {
      console.error("Failed to remove crop:", error);
    }
  };

  const scheduleNotificationsForAllCrops = async (time) => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const crop of activeCrops) {
      const growthPercentage = calculateGrowthPercentage(crop);
      const shouldIrrigate = [20, 40, 60, 80].includes(
        Math.floor(growthPercentage)
      );

      if (shouldIrrigate) {
        const now = new Date();
        let triggerTime = new Date(time);

        if (triggerTime <= now) triggerTime.setDate(triggerTime.getDate() + 1);

        try {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Water Your Crops!",
              body: `It's time to water your ${crop.name} crop.`,
            },
            trigger: {
              hour: triggerTime.getHours(),
              minute: triggerTime.getMinutes(),
              repeats: true,
            },
          });
        } catch (error) {
          console.error(
            `Failed to schedule notification for ${crop.name}:`,
            error
          );
        }
      }
    }
  };

  useEffect(() => {
    if (reminderTime && activeCrops.length > 0) {
      scheduleNotificationsForAllCrops(reminderTime);
      AsyncStorage.setItem("reminderTime", JSON.stringify(reminderTime)).catch(
        console.error
      );
    }
  }, [reminderTime, activeCrops]);

  const handleTimeChange = (event, selected) => {
    const current = selected || tempTime;
    const now = new Date();
    if (current < now) {
      alert("Cannot set a past time! Please choose a future time.");
      return;
    }
    setShowTimePicker(Platform.OS === "ios");
    setTempTime(current);
    if (Platform.OS !== "ios") setReminderTime(current);
  };

  const confirmTime = () => {
    setReminderTime(tempTime);
    setShowTimePicker(false);
  };

  const selectedCrop = activeCrops.find(
    (crop) => crop.id === selectedCropForPicker
  );
  const selectedCropGrowth = selectedCrop
    ? calculateGrowthPercentage(selectedCrop)
    : 0;
  const shouldIrrigateSelected = selectedCrop
    ? [20, 40, 60, 80].includes(Math.floor(selectedCropGrowth))
    : false;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/k.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.reportTitle}>Progress Report</Text>
        </View>

        {/* Active Crops Overview */}
        {activeCrops.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Active Crops ({activeCrops.length})
            </Text>
            {activeCrops.map((crop) => {
              const growth = calculateGrowthPercentage(crop);
              return (
                <View key={crop.id} style={styles.cropOverviewItem}>
                  <View style={styles.cropOverviewHeader}>
                    <Text style={styles.cropOverviewName}>{crop.name}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Remove Crop",
                          `Are you sure you want to stop cultivating ${crop.name}?`,
                          [
                            { text: "Cancel", style: "cancel" },
                            {
                              text: "Remove",
                              onPress: () => removeCrop(crop.id),
                            },
                          ]
                        );
                      }}
                      style={styles.removeButton}
                    >
                      <Ionicons name="close-circle" size={20} color="#e74c3c" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.miniProgressContainer}>
                    <View style={styles.miniProgressBar}>
                      <View
                        style={[styles.miniProgressFill, { width: `${growth}%` }]}
                      />
                    </View>
                    <Text style={styles.miniProgressText}>
                      {Math.floor(growth)}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Crop Selection Dropdown */}
        {activeCrops.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Select Crop for Details</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCropForPicker}
                onValueChange={(itemValue) =>
                  setSelectedCropForPicker(itemValue)
                }
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {activeCrops.map((crop) => (
                  <Picker.Item
                    key={crop.id}
                    label={`${crop.name} (${crop.hindi})`}
                    value={crop.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}

        {/* Selected Crop Details */}
        {selectedCrop && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Crop Information</Text>
              <Text style={styles.cropDetailText}>
                <Text style={{ fontWeight: "bold" }}>Name:</Text> {selectedCrop.name} ({selectedCrop.hindi})
              </Text>
              <Text style={styles.cropDetailText}>
                <Text style={{ fontWeight: "bold" }}>Description:</Text> {selectedCrop.description}
              </Text>
              <Text style={styles.cropDetailText}>
                <Text style={{ fontWeight: "bold" }}>Expected Duration:</Text> {selectedCrop.duration}
              </Text>
              <Text style={styles.cropDetailText}>
                <Text style={{ fontWeight: "bold" }}>Soil Type:</Text> {selectedCrop.soilType}
              </Text>
              <Text style={styles.cropDetailText}>
                <Text style={{ fontWeight: "bold" }}>Temperature:</Text> {selectedCrop.temperature}
              </Text>
              <Text style={styles.cropDetailText}>
                <Text style={{ fontWeight: "bold" }}>Rainfall:</Text> {selectedCrop.rainfall}
              </Text>
            </View>

            {/* Growth Progress */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{selectedCrop.name} Growth Progress</Text>
              <Text style={styles.progressText}>{Math.floor(selectedCropGrowth)}%</Text>
              <View style={styles.progressBarContainer}>
                <View
                  style={[styles.progressBarFill, { width: `${selectedCropGrowth}%` }]}
                />
              </View>
              <Text style={{ color: "#666" }}>Target: {selectedCrop.durationDays} days</Text>
              <Text style={{ color: "#666", marginTop: 5 }}>
                Started: {new Date(selectedCrop.startTime).toLocaleDateString()}
              </Text>
            </View>

            {/* Irrigation Status */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Irrigation Status</Text>
              {shouldIrrigateSelected ? (
                <Text style={styles.reminderText}>
                  💧 It is recommended to irrigate your {selectedCrop.name} crop today.
                </Text>
              ) : (
                <Text style={styles.reminderText}>
                  ✅ No irrigation needed for {selectedCrop.name} today.
                </Text>
              )}
            </View>
          </>
        )}

        {/* Global Reminder Settings */}
        {activeCrops.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Daily Irrigation Reminder</Text>
            <Text style={styles.reminderDescription}>
              Set a daily reminder time for all your crops that need irrigation.
            </Text>
            <View style={styles.timeSection}>
              <Text style={styles.timeText}>
                Reminder Time:{" "}
                {reminderTime
                  ? reminderTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "Not set"}
              </Text>

              {/* Green button with repeated pop-up */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#4CAF50",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                  alignItems: "center",
                  marginVertical: 5,
                }}
                onPress={handleReminderButtonPress}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Set Reminder Time</Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={tempTime}
                  mode="time"
                  is24Hour={false} // <-- changed here for 12-hour format
                  display="spinner"
                  minimumDate={new Date()}
                  onChange={handleTimeChange}
                />
              )}
              {Platform.OS === "ios" && showTimePicker && (
                <Button title="Confirm" onPress={confirmTime} />
              )}
            </View>
          </View>
        )}

        {/* No crops message */}
        {activeCrops.length === 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>No Active Crops</Text>
            <Text style={styles.noCropsText}>
              Start cultivating crops from the Season page to track their progress here.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Your existing styles remain unchanged
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3FFF6" },
  scrollContainer: { flex: 1, padding: 20 },
  logoContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  logo: { width: 50, height: 50 },
  reportTitle: { fontSize: 22, fontWeight: "bold", color: "#388E3C", marginLeft: 10 },
  card: { backgroundColor: "#FFFFFF", padding: 24, borderRadius: 16, marginBottom: 24, elevation: 3 },
  cardTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16, color: "#388E3C" },
  pickerContainer: { borderWidth: 2, borderColor: "#388E3C", borderRadius: 8, backgroundColor: "#F3FFF6" },
  picker: { height: 50, color: "#222" },
  pickerItem: { fontSize: 16, height: 50, color: "#222" },
  progressText: { fontSize: 18, marginBottom: 8, textAlign: "center", color: "#388E3C", fontWeight: "bold" },
  progressBarContainer: { height: 22, backgroundColor: "#C8E6C9", borderRadius: 11, overflow: "hidden", marginBottom: 8, borderWidth: 1, borderColor: "#388E3C" },
  progressBarFill: { height: "100%", backgroundColor: "#66BB6A" },
  reminderText: { fontSize: 16, textAlign: "center", color: "#212121", marginBottom: 10 },
  reminderDescription: { fontSize: 14, color: "#666", marginBottom: 15, textAlign: "center" },
  timeSection: { marginTop: 10 },
  timeText: { fontSize: 16, marginBottom: 10 },
  cropOverviewItem: { backgroundColor: "#F3FFF6", padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: "#C8E6C9" },
  cropOverviewHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  cropOverviewName: { fontSize: 16, fontWeight: "bold", color: "#388E3C" },
  removeButton: { padding: 5 },
  miniProgressContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  miniProgressBar: { flex: 1, height: 8, backgroundColor: "#C8E6C9", borderRadius: 4, overflow: "hidden" },
  miniProgressFill: { height: "100%", backgroundColor: "#66BB6A" },
  miniProgressText: { fontSize: 14, color: "#388E3C", fontWeight: "bold", minWidth: 35 },
  cropDetailText: { fontSize: 14, color: "#666", marginBottom: 8, lineHeight: 20 },
  noCropsText: { fontSize: 16, color: "#666", textAlign: "center", fontStyle: "italic" },
});
