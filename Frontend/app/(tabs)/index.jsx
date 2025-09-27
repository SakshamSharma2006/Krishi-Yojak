import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

const HomePage = () => {
  const navigation = useNavigation();
  const router = useRouter();

  // ✅ Crops data
  const topCrops = [
    {
      id: 1,
      name: "Rice",
      hindi: "चावल",
      image:
        "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop",
      description:
        "Rice is the staple food for more than half of the world's population and the most important cereal crop in India.",
    },
    {
      id: 2,
      name: "Wheat",
      hindi: "गेहूं",
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
      description:
        "Wheat is the second most important food grain in India and a major source of protein and carbohydrates.",
    },
    {
      id: 3,
      name: "Sugarcane",
      hindi: "गन्ना",
      image:
        "https://www.megawecare.com/_next/image?url=https%3A%2F%2Fcdn.megawecare.com%2Fmega-we-care-global%2F1746007468127-Health_Benefits_Of_Sugarcane_876X400.webp&w=1920&q=75",
      description:
        "Sugarcane is a major cash crop in India, used primarily for sugar production and biofuel.",
    },
    {
      id: 4,
      name: "Cotton",
      hindi: "कपास",
      image:
        "https://cdn.britannica.com/72/270772-050-9B03FF80/Cotton-plants-in-a-field.jpg",
      description:
        "Cotton is one of the most important commercial crops and a major source of natural fiber in India.",
    },
    {
      id: 5,
      name: "Tea",
      hindi: "चाय",
      image:
        "https://www.discoveringtea.com/wp-content/uploads/2019/11/blog_15_11_19.png",
      description:
        "Tea is one of India's most valuable export crops, grown primarily in Assam, West Bengal, and Tamil Nadu.",
    },
  ];

  const renderTopCrop = (crop) => (
    <View key={crop.id} style={styles.topCropCard}>
      <Image source={{ uri: crop.image }} style={styles.topCropImage} />
      <View style={styles.topCropContent}>
        <Text style={styles.topCropTitle}>{crop.name}</Text>
        <Text style={styles.topCropHindi}>({crop.hindi})</Text>
        <Text style={styles.topCropDescription}>{crop.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>Welcome to!</Text>

          {/* ✅ Logo + App Title in one row */}
          <View style={styles.logoRow}>
            <Image
              source={require("../../assets/images/k.jpg")}
              style={styles.logo}
            />
            <Text style={styles.appTitle}>Krishi Yojak</Text>
          </View>

          <Text style={styles.description}>
            A digital soil management and agriculture planner, simplifying
            modern farming. It provides integrated solutions for key challenges
            like crop selection, and disease identification to boost overall
            productivity.
          </Text>
        </View>

        {/* Top Crops Section */}
        <View style={styles.topCropsSection}>
          <Text style={styles.sectionTitle}>
            Most Cultivated Crops in India
          </Text>
          <View style={styles.topCropsContainer}>
            {topCrops.map(renderTopCrop)}
          </View>
        </View>

        {/* ✅ Start Button navigates to Season.jsx */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={()=> router.push("/(blog)/Season")}
        >
          <Text style={styles.startButtonText}>Start</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f8ff" },
  scrollView: { flex: 1 },
  headerSection: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#e8f5e8",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#2d5016",
    fontWeight: "300",
    marginBottom: 5,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    marginRight: 10,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a3d0a",
  },
  description: {
    fontSize: 16,
    color: "#4a7c59",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  topCropsSection: { padding: 20 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a3d0a",
    marginBottom: 15,
    textAlign: "center",
  },
  topCropsContainer: { gap: 15 },
  topCropCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topCropImage: { width: "100%", height: 200, resizeMode: "cover" },
  topCropContent: { padding: 15 },
  topCropTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a3d0a",
    marginBottom: 5,
  },
  topCropHindi: {
    fontSize: 16,
    color: "#4a7c59",
    marginBottom: 10,
    fontStyle: "italic",
  },
  topCropDescription: { fontSize: 14, color: "#666", lineHeight: 20 },
  startButton: {
    flexDirection: "row",
    backgroundColor: "#4a7c59",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default HomePage;