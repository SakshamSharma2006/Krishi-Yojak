import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Animated,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  addCropToFavorites,
  isCropInFavorites,
  removeCropFromFavorites,
} from "../../utils/Favorite";

const Season = () => {
  const router = useRouter();
  const [selectedSeason, setSelectedSeason] = useState("summer");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showCropDetail, setShowCropDetail] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [favoriteStates, setFavoriteStates] = useState({});

  const slideAnim = useRef(new Animated.Value(1000)).current;
  const popAnim = useRef(new Animated.Value(0)).current;

  const seasons = [
    {
      id: "summer",
      name: "Summer",
      hindi: "गर्मी",
      icon: "sunny",
      color: "#f39c12",
      description: "Hot and dry season crops",
    },
    {
      id: "monsoon",
      name: "Monsoon",
      hindi: "मानसून",
      icon: "rainy",
      color: "#3498db",
      description: "Rainy season crops",
    },
    {
      id: "winter",
      name: "Winter",
      hindi: "सर्दी",
      icon: "snow",
      color: "#9b59b6",
      description: "Cold season crops",
    },
  ];

  const cropsData = {
    summer: [
      {
        id: "s1",
        name: "Watermelon",
        hindi: "तरबूज",
        image:
          "https://images.stockcake.com/public/1/8/b/18bc662b-17b0-45e9-a39f-7602d72985de_large/watermelon-field-harvest-stockcake.jpg",
        soilType: "Well-drained sandy loam soil",
        description:
          "Watermelon is a refreshing summer fruit with high water content, perfect for hot weather.",
        duration: "70-100 days",
        durationDays: 85,
        temperature: "25-35°C",
        rainfall: "400-600mm",
      },
      {
        id: "s2",
        name: "Cucumber",
        hindi: "खीरा",
        image:
          "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=300&fit=crop",
        soilType: "Rich, well-drained loamy soil",
        description:
          "Cucumber is a cooling vegetable ideal for summer cultivation with high nutritional value.",
        duration: "50-70 days",
        durationDays: 60,
        temperature: "20-30°C",
        rainfall: "300-400mm",
      },
      {
        id: "s3",
        name: "Okra",
        hindi: "भिंडी",
        image:
          "https://thefarmersjournal.com/wp-content/uploads/2023/05/Okra-Production-Guide-Step-by-Step-1.jpg",
        soilType: "Well-drained fertile loam soil",
        description:
          "Okra is a warm-season vegetable rich in vitamins and minerals.",
        duration: "55-65 days",
        durationDays: 60,
        temperature: "24-27°C",
        rainfall: "500-800mm",
      },
      {
        id: "s4",
        name: "Bitter Gourd",
        hindi: "लौकी",
        image:
          "https://www.shutterstock.com/image-photo/close-bitter-gourd-melon-hanging-600nw-2231683001.jpg",
        soilType: "Rich, well-drained sandy loam",
        description:
          "Bottle gourd is a nutritious summer vegetable with medicinal properties.",
        duration: "60-80 days",
        durationDays: 70,
        temperature: "25-35°C",
        rainfall: "400-600mm",
      },
      {
        id: "s5",
        name: "Ridge Gourd",
        hindi: "तोरी",
        image:
          "https://culturalrootsnursery.com/wp-content/uploads/2023/03/IMG_5478-scaled-e1679366442934.jpeg",
        soilType: "Well-drained loamy soil",
        description:
          "Ridge gourd is a popular summer vegetable with high fiber content.",
        duration: "45-60 days",
        durationDays: 52,
        temperature: "25-30°C",
        rainfall: "400-500mm",
      },
    ],
    monsoon: [
      {
        id: "m1",
        name: "Rice",
        hindi: "चावल",
        image:
          "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop",
        soilType: "Clay or clay loam soil",
        description:
          "Rice is the main kharif crop grown extensively during monsoon season.",
        duration: "100-130 days",
        durationDays: 115,
        temperature: "20-27°C",
        rainfall: "1000-2000mm",
      },
      {
        id: "m2",
        name: "Maize",
        hindi: "मक्का",
        image:
          "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
        soilType: "Well-drained fertile loam soil",
        description:
          "Maize is an important cereal crop grown during the rainy season.",
        duration: "80-110 days",
        durationDays: 95,
        temperature: "21-27°C",
        rainfall: "600-1200mm",
      },
      {
        id: "m3",
        name: "Cotton",
        hindi: "कपास",
        image:
          "https://cdn.britannica.com/72/270772-050-9B03FF80/Cotton-plants-in-a-field.jpg",
        soilType: "Deep, well-drained black soil",
        description:
          "Cotton is a major cash crop cultivated during the monsoon season.",
        duration: "160-200 days",
        durationDays: 180,
        temperature: "21-27°C",
        rainfall: "600-800mm",
      },
      {
        id: "m4",
        name: "Sugarcane",
        hindi: "गन्ना",
        image:
          "https://www.megawecare.com/_next/image?url=https%3A%2F%2Fcdn.megawecare.com%2Fmega-we-care-global%2F1746007468127-Health_Benefits_Of_Sugarcane_876X400.webp&w=1920&q=75",
        soilType: "Rich, well-drained loamy soil",
        description:
          "Sugarcane thrives in monsoon conditions with adequate water supply.",
        duration: "300-365 days",
        durationDays: 330,
        temperature: "20-26°C",
        rainfall: "750-1200mm",
      },
      {
        id: "m5",
        name: "Sesame",
        hindi: "तिल",
        image:
          "https://img.khetivyapar.com/images/news/1703067886-sesame-seed-flower-tree-field.jpg",
        soilType: "Well-drained sandy loam soil",
        description:
          "Sesame is an important oilseed crop grown during kharif season.",
        duration: "85-95 days",
        durationDays: 90,
        temperature: "25-27°C",
        rainfall: "400-600mm",
      },
    ],
    winter: [
      {
        id: "w1",
        name: "Wheat",
        hindi: "गेहूं",
        image:
          "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
        soilType: "Well-drained loamy soil",
        description:
          "Wheat is the primary winter crop and staple food grain in North India.",
        duration: "120-150 days",
        durationDays: 135,
        temperature: "15-25°C",
        rainfall: "300-400mm",
      },
      {
        id: "w2",
        name: "Mustard",
        hindi: "सरसों",
        image: "https://kj1bcdn.b-cdn.net/media/56232/mustard2.jpg",
        soilType: "Well-drained fertile loam soil",
        description:
          "Mustard is an important oilseed crop grown during winter season.",
        duration: "90-120 days",
        durationDays: 105,
        temperature: "10-25°C",
        rainfall: "200-400mm",
      },
      {
        id: "w3",
        name: "Pea",
        hindi: "मटर",
        image:
          "https://img.khetivyapar.com/images/news/1704445775-pea-farming-becomes-profitable-for-farmers.jpg",
        soilType: "Well-drained sandy loam soil",
        description:
          "Pea is a cool-season legume rich in protein and essential nutrients.",
        duration: "60-90 days",
        durationDays: 75,
        temperature: "10-20°C",
        rainfall: "300-500mm",
      },
      {
        id: "w4",
        name: "Spinach",
        hindi: "पालक",
        image:
          "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
        soilType: "Rich, well-drained loamy soil",
        description:
          "Spinach is a nutritious leafy green vegetable ideal for winter cultivation.",
        duration: "40-50 days",
        durationDays: 45,
        temperature: "15-20°C",
        rainfall: "200-300mm",
      },
      {
        id: "w5",
        name: "Carrot",
        hindi: "गाजर",
        image:
          "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
        soilType: "Deep, well-drained sandy loam",
        description:
          "Carrot is a root vegetable rich in beta-carotene and vitamins.",
        duration: "70-100 days",
        durationDays: 85,
        temperature: "16-20°C",
        rainfall: "300-400mm",
      },
    ],
  };

  useEffect(() => {
    checkFavoriteStates();
  }, [selectedSeason]);

  const checkFavoriteStates = async () => {
    const currentCrops = cropsData[selectedSeason];
    const states = {};
    for (const crop of currentCrops) {
      const isFavorite = await isCropInFavorites(crop.id);
      states[crop.id] = isFavorite;
    }
    setFavoriteStates(states);
  };

  const toggleFavorite = async (crop) => {
    const isCurrentlyFavorite = favoriteStates[crop.id];
    if (!isCurrentlyFavorite) {
      const success = await addCropToFavorites(crop);
      if (success) {
        setFavoriteStates((prev) => ({ ...prev, [crop.id]: true }));
        showConfirmationPopup("favorite");
      } else {
        Alert.alert("Info", "This crop is already in your favorites!");
      }
    } else {
      const success = await removeCropFromFavorites(crop.id);
      if (success) {
        setFavoriteStates((prev) => ({ ...prev, [crop.id]: false }));
        showConfirmationPopup("removed");
      } else {
        Alert.alert("Error", "Failed to remove crop from favorites!");
      }
    }
  };

  const openCropDetail = (crop) => {
    setSelectedCrop(crop);
    setShowCropDetail(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeCropDetail = () => {
    Animated.timing(slideAnim, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowCropDetail(false);
      setSelectedCrop(null);
    });
  };

  const showConfirmationPopup = (type) => {
    setConfirmationType(type);
    setShowConfirmation(true);
    Animated.spring(popAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const hideConfirmationPopup = () => {
    Animated.spring(popAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setShowConfirmation(false);
    });
  };

  const renderSeasonTab = (season) => (
    <TouchableOpacity
      key={season.id}
      style={[
        styles.seasonTab,
        selectedSeason === season.id && styles.selectedSeasonTab,
        { borderBottomColor: season.color },
      ]}
      onPress={() => setSelectedSeason(season.id)}
    >
      <Ionicons
        name={season.icon}
        size={24}
        color={selectedSeason === season.id ? season.color : "#666"}
      />
      <Text
        style={[
          styles.seasonTabText,
          selectedSeason === season.id && { color: season.color },
        ]}
      >
        {season.name}
      </Text>
      <Text
        style={[
          styles.seasonTabHindi,
          selectedSeason === season.id && { color: season.color },
        ]}
      >
        {season.hindi}
      </Text>
    </TouchableOpacity>
  );

  const renderCropCard = (crop) => (
    <TouchableOpacity
      key={crop.id}
      style={styles.cropCard}
      onPress={() => openCropDetail(crop)}
    >
      <Image source={{ uri: crop.image }} style={styles.cropImage} />
      <View style={styles.cropContent}>
        <View style={styles.cropHeader}>
          <View style={styles.cropTitleContainer}>
            <Text style={styles.cropTitle}>{crop.name}</Text>
            <Text style={styles.cropHindi}>({crop.hindi})</Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(crop);
            }}
          >
            <Ionicons
              name={favoriteStates[crop.id] ? "heart" : "heart-outline"}
              size={24}
              color={favoriteStates[crop.id] ? "#e74c3c" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.cropDescription} numberOfLines={2}>
          {crop.description}
        </Text>
        <View style={styles.cropDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>Duration: {crop.duration}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="thermometer-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              Temperature: {crop.temperature}
            </Text>
          </View>
        </View>
        <View style={styles.tapHint}>
          <Text style={styles.tapHintText}>Tap for more details</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const currentSeason = seasons.find((s) => s.id === selectedSeason);
  const currentCrops = cropsData[selectedSeason];

  return (
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.header}>
          {/* ✅ Back Button */}
          <TouchableOpacity
            style={{ position: "absolute", left: 20, top: 50 }}
            onPress={() => router.push("/")}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>Season Crops</Text>
        <Text style={styles.headerSubtitle}>
          Choose the right crop for each season
        </Text>
      </View>
      <View style={styles.seasonTabs}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.seasonTabsContainer}
        >
          {seasons.map(renderSeasonTab)}
        </ScrollView>
      </View>
      <View
        style={[
          styles.seasonInfo,
          { backgroundColor: currentSeason.color + "20" },
        ]}
      >
        <Ionicons
          name={currentSeason.icon}
          size={30}
          color={currentSeason.color}
        />
        <Text style={[styles.seasonInfoText, { color: currentSeason.color }]}>
          {currentSeason.description}
        </Text>
      </View>
      <ScrollView
        style={styles.cropsContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          Recommended crops for {currentSeason.name} season:
        </Text>
        {currentCrops.map(renderCropCard)}
      </ScrollView>
      {/* Crop Detail Modal */}
      <Modal
        visible={showCropDetail}
        transparent={true}
        animationType="none"
        onRequestClose={closeCropDetail}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.cropDetailContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.cropDetailHeader}>
              <TouchableOpacity onPress={closeCropDetail}>
                <Ionicons name="close" size={24} color="#2d5016" />
              </TouchableOpacity>
            </View>
            {selectedCrop && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                  source={{ uri: selectedCrop.image }}
                  style={styles.cropDetailImage}
                />
                <View style={styles.cropDetailContent}>
                  <Text style={styles.cropDetailTitle}>
                    {selectedCrop.name}
                  </Text>
                  <Text style={styles.cropDetailHindi}>
                    ({selectedCrop.hindi})
                  </Text>
                  <View style={styles.cropDetailSection}>
                    <Text style={styles.cropDetailLabel}>Best Soil Type:</Text>
                    <Text style={styles.cropDetailText}>
                      {selectedCrop.soilType}
                    </Text>
                  </View>
                  <View style={styles.cropDetailSection}>
                    <Text style={styles.cropDetailLabel}>Description:</Text>
                    <Text style={styles.cropDetailText}>
                      {selectedCrop.description}
                    </Text>
                  </View>
                  <View style={styles.cropDetailSection}>
                    <Text style={styles.cropDetailLabel}>Duration:</Text>
                    <Text style={styles.cropDetailText}>
                      {selectedCrop.duration}
                    </Text>
                  </View>
                  <View style={styles.cropDetailSection}>
                    <Text style={styles.cropDetailLabel}>Temperature:</Text>
                    <Text style={styles.cropDetailText}>
                      {selectedCrop.temperature}
                    </Text>
                  </View>
                  <View style={styles.cropDetailSection}>
                    <Text style={styles.cropDetailLabel}>Rainfall:</Text>
                    <Text style={styles.cropDetailText}>
                      {selectedCrop.rainfall}
                    </Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.favButton]}
                      onPress={() => {
                        toggleFavorite(selectedCrop);
                        closeCropDetail();
                      }}
                    >
                      <Ionicons
                        name={
                          favoriteStates[selectedCrop.id]
                            ? "heart"
                            : "heart-outline"
                        }
                        size={20}
                        color="#fff"
                      />
                      <Text style={styles.buttonText}>
                        {favoriteStates[selectedCrop.id]
                          ? "Remove from Favorites"
                          : "Add to Favorites"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.startButton]}
                      onPress={() => {
                        closeCropDetail();
                        setTimeout(() => {
                          router.push({
                            pathname: "../(tabs)/prog",
                            params: {
                              cropData: JSON.stringify(selectedCrop),
                            },
                          });
                        }, 300);
                      }}
                    >
                      <Ionicons name="play" size={20} color="#fff" />
                      <Text style={styles.buttonText}>Start Cultivation</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </Animated.View>
        </View>
      </Modal>
      {/* Confirmation Popup */}
      <Modal visible={showConfirmation} transparent={true} animationType="none">
        <View style={styles.popupOverlay}>
          <Animated.View
            style={[
              styles.confirmationPopup,
              {
                transform: [
                  {
                    scale: popAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 1],
                    }),
                  },
                ],
                opacity: popAnim,
              },
            ]}
          >
            <Ionicons
              name={
                confirmationType === "favorite"
                  ? "heart"
                  : confirmationType === "removed"
                  ? "heart-dislike"
                  : confirmationType === "start"
                  ? "checkmark-circle"
                  : "checkmark-circle"
              }
              size={50}
              color={
                confirmationType === "favorite"
                  ? "#e74c3c"
                  : confirmationType === "removed"
                  ? "#95a5a6"
                  : "#4a7c59"
              }
            />
            <Text style={styles.confirmationText}>
              {confirmationType === "favorite"
                ? "Added to Favorites!"
                : confirmationType === "removed"
                ? "Removed from Favorites!"
                : confirmationType === "start"
                ? "Cultivation Started!"
                : "Success!"}
            </Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={hideConfirmationPopup}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  header: {
    backgroundColor: "#4a7c59",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e8f5e8",
    textAlign: "center",
  },
  seasonTabs: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  seasonTab: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  selectedSeasonTab: {
    borderBottomWidth: 3,
  },
  seasonTabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginTop: 5,
  },
  seasonTabHindi: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  seasonInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
  },
  seasonInfoText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  cropsContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a3d0a",
    marginBottom: 20,
  },
  cropCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  cropImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  cropContent: {
    padding: 15,
  },
  cropHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  cropTitleContainer: {
    flex: 1,
  },
  cropTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a3d0a",
  },
  cropHindi: {
    fontSize: 14,
    color: "#4a7c59",
    fontStyle: "italic",
    marginTop: 2,
  },
  favoriteButton: {
    padding: 5,
  },
  cropDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 15,
  },
  cropDetails: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
    fontWeight: "500",
  },
  tapHint: {
    alignItems: "center",
    paddingTop: 5,
  },
  tapHintText: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cropDetailContainer: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cropDetailHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  cropDetailImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  cropDetailContent: {
    padding: 20,
  },
  cropDetailTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a3d0a",
    marginBottom: 5,
  },
  cropDetailHindi: {
    fontSize: 20,
    color: "#4a7c59",
    fontStyle: "italic",
    marginBottom: 20,
  },
  cropDetailSection: {
    marginBottom: 15,
  },
  cropDetailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d5016",
    marginBottom: 5,
  },
  cropDetailText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  favButton: {
    backgroundColor: "#e74c3c",
  },
  startButton: {
    backgroundColor: "#4a7c59",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmationPopup: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    margin: 20,
    minWidth: 250,
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a3d0a",
    marginVertical: 15,
    textAlign: "center",
  },
  okButton: {
    backgroundColor: "#4a7c59",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  okButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  seasonTabsContainer: {
    flexGrow: 1,
    justifyContent: "center", // centers the tabs horizontally
    alignItems: "center", // keeps them aligned in the middle
  },
});

export default Season;