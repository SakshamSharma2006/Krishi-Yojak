import { StatusBar } from "expo-status-bar"; // ✅ StatusBar import
import { useState } from "react";
import {
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// 6 Main Schemes with details + benefits + links
const SCHEMES = [
  {
    id: "s1",
    title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyOu82Mkenw_sNatbPg6kLwuNr412FHqrnoQ&s",
    details:
      "The PMKSY was launched in 2015 to provide end-to-end solutions for irrigation. It focuses on efficient water use and aims to expand cultivable land under assured irrigation.\n\nBenefits:\n- More crop per drop initiative (efficient water use).\n- Financial support for micro-irrigation.\n- Improved access to irrigation infrastructure.",
    link: "https://mahadbt.maharashtra.gov.in/",
  },
  {
    id: "s2",
    title: "Ayushman Sahakar Scheme",
    image:
      "https://blogmedia.testbook.com/blog/wp-content/uploads/2023/07/ayushman-sahakar-scheme-21b7b189.webp",
    details:
      "This scheme is implemented by the National Cooperative Development Corporation (NCDC) to fund cooperative healthcare facilities.\n\nBenefits:\n- Financial assistance for hospitals and healthcare infrastructure.\n- Encourages cooperatives to set up healthcare units.\n- Affordable health facilities for rural areas.",
    link: "https://www.ncdc.in",
  },
  {
    id: "s3",
    title: "eNAM (National Agriculture Market)",
    image:
      "https://iasgyan.in/ig-uploads/images/NATIONAL_AGRICULTURE_MARKET_(E-NAM)_PORTAL.jpg",
    details:
      "eNAM is a pan-India electronic trading portal launched in 2016. It networks existing APMC mandis to create a unified national market for agricultural commodities.\n\nBenefits:\n- Transparency in agricultural trading.\n- Better price discovery for farmers.\n- Eliminates middlemen and ensures direct trade.",
    link: "https://enam.gov.in/web/Enam_ctrl/enam_registration",
  },
  {
    id: "s4",
    title: "Pradhan Mantri Kisan Maan-Dhan Yojana (PM-KMY)",
    image:
      "https://img-cdn.krishijagran.com/104991/pradhan-mantri-kisan-maandhan-yojana-pm-kmy.jpg",
    details:
      "Launched in 2019, PM-KMY is a pension scheme for small and marginal farmers.\n\nBenefits:\n- Farmers above 60 years get ₹3000 per month as pension.\n- Voluntary and contributory scheme.\n- Ensures financial security for elderly farmers.",
    link: "https://www.pib.gov.in/PressReleseDetail.aspx?PRID=2053142",
  },
  {
    id: "s5",
    title: "Soil Health Cards (SHC) Scheme",
    image:
      "https://launchpadeducation.in/wp-content/uploads/2024/08/Blog-Pictures-2-1-1.png",
    details:
      "Introduced in 2015, this scheme provides soil health cards to farmers every 2 years to assess nutrient status.\n\nBenefits:\n- Farmers get information on soil fertility.\n- Promotes balanced use of fertilizers.\n- Helps in reducing input costs and increasing productivity.",
    link: "https://soilhealth.dac.gov.in",
  },
  {
    id: "s6",
    title: "National Bamboo Mission (NBM)",
    image: "https://i.ytimg.com/vi/9YdT61jJAjE/mqdefault.jpg",
    details:
      "Revamped under the National Mission on Sustainable Agriculture in 2018, it focuses on the holistic growth of the bamboo sector.\n\nBenefits:\n- Promotes bamboo-based industries.\n- Provides employment opportunities in rural areas.\n- Supports farmers in bamboo plantation.",
    link: "https://intranet.mahaforest.gov.in/forestportal/index.php?option=bambooapp",
  },
];

// Currently New Schemes (same structure as main schemes)
const NEW_SCHEMES = [
  {
    id: "ns1",
    title: "Climate Smart Agriculture Initiative",
    image:
      "https://cdn.agclassroom.org/media/uploads/lp703/climate_smart_ag.jpg",
    details:
      "Promotes eco-friendly farming practices to reduce the impact of climate change.\n\nBenefits:\n- Supports climate-resilient crops\n- Encourages sustainable agriculture\n- Reduces carbon footprint",
    link: "https://www.fao.org/climate-smart-agriculture/en/",
  },
  {
    id: "ns2",
    title: "Agri-Tech Startup Support",
    image:
      "https://knnindia.co.in/uploads/newsfiles/AGRI-TECH-30-1-202.jpg",
    details:
      "Funding support for innovative agri-tech startups.\n\nBenefits:\n- Provides financial aid\n- Mentorship opportunities\n- Encourages technology in farming",
    link: "https://www.startupindia.gov.in/",
  },
  {
    id: "ns3",
    title: "Organic Farming Promotion Scheme",
    image:
      "https://greenstories.co.in/wp-content/uploads/2020/12/3-300x180.png",
    details:
      "Encourages farmers to adopt organic farming practices.\n\nBenefits:\n- Healthier soil\n- Chemical-free produce\n- Better market prices",
    link: "https://pgsindia-ncof.gov.in/",
  },
  {
    id: "ns4",
    title: "Smart Irrigation Development",
    image:
      "https://mobitechwireless.in/wp-content/uploads/2024/07/THE-RISE-OF.jpg",
    details:
      "Supports modern irrigation systems like drip and sprinkler irrigation.\n\nBenefits:\n- Saves water\n- Increases crop yield\n- Reduces cost of irrigation",
    link: "https://pmksy.gov.in/",
  },
];

export default function SchemePage() {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [error, setError] = useState(null);

  const handleLinkPress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        setError("Cannot open link. Please check the URL.");
      }
    } catch (e) {
      setError(`Failed to open link: ${e.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {typeof StatusBar !== "undefined" && <StatusBar style="auto" />}

      {/* Navbar */}
      <View style={[styles.navbar, styles.navbarWithPadding]}>
        <Text style={styles.navbarTitle}>Government Schemes</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Schemes */}
        {SCHEMES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => setSelectedScheme(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        {/* New Schemes */}
        <View style={styles.newSchemeSection}>
          <Text style={styles.newSchemeHeading}>Currently New Schemes</Text>
          {NEW_SCHEMES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => setSelectedScheme(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Scheme Details Modal */}
      <Modal
        visible={!!selectedScheme}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedScheme(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ScrollView>
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : selectedScheme ? (
                <>
                  <Image
                    source={{ uri: selectedScheme.image }}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.modalTitle}>{selectedScheme.title}</Text>
                  <Text style={styles.modalDetails}>
                    {selectedScheme.details}
                  </Text>
                </>
              ) : null}
            </ScrollView>

            {/* Buttons Row */}
            <View style={styles.modalButtonsRow}>
              <Pressable
                style={[styles.modalButton, styles.applyButton]}
                onPress={() => handleLinkPress(selectedScheme?.link)}
                disabled={!selectedScheme}
              >
                <Text style={styles.buttonText}>Apply</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.closeButton]}
                onPress={() => {
                  setSelectedScheme(null);
                  setError(null);
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Bar */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  navbar: {
    backgroundColor: "#03C04A",
    padding: 16,
    alignItems: "center",
  },
  navbarWithPadding: {
    paddingTop: 40,
  },
  navbarTitle: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF" },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  cardImage: { width: 150, height: 150, borderRadius: 8, marginRight: 12 }, // Increased size
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937", flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "85%",
  },
  modalImage: {
    width: "100%",
    height: 250, // Increased size
    borderRadius: 12,
    marginBottom: 15,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  modalDetails: {
    marginTop: 12,
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: "#DC2626",
  },
  applyButton: {
    backgroundColor: "#16A34A",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  newSchemeSection: {
    marginTop: 20,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  newSchemeHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1F2937",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    height: 60,
  },
  tab: { alignItems: "center" },
  tabText: { fontSize: 12, color: "#03C04A", marginTop: 2 },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});