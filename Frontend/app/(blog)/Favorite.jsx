import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const CropCarePage = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Updated data with actual image URLs
  const soilTypes = [
    {
      id: 1,
      name: 'Loamy Soil',
      image: "https://miro.medium.com/v2/resize:fit:960/1*llEsGdcl5XqNliQK2db2OQ.png",
      type: 'Natural',
      season: 'All Seasons',
      crops: 'Vegetables, Wheat, Rice, Tomatoes',
      price: '₹300-600 per ton',
      description: 'The gold standard of agricultural soils, offering perfect balance of sand, silt, and clay particles.',
      downside: 'Higher transportation costs due to weight',
      composition: '40% Sand, 40% Silt, 20% Clay',
      phLevel: '6.0 - 7.0 (Slightly acidic to neutral)',
      waterRetention: 'Excellent - retains moisture while allowing drainage',
      fertility: 'Very High - rich in organic matter and nutrients',
      applications: 'Ideal for kitchen gadens, commercial farming, greenhouse cultivation',
      bestPractices: 'Regular composting, crop rotation, minimal tillage to preserve structure',
      yieldIncrease: 'Can increase crop yield by 25-40% compared to poor soils',
      environmentalImpact: 'Eco-friendly choice that promotes carbon sequestration, supports beneficial soil microorganisms, and requires minimal chemical inputs. Helps maintain natural water cycles and biodiversity in agricultural ecosystems.'
    },
    {
      id: 2,
      name: 'Black Soil',
      image: 'https://m.media-amazon.com/images/I/51ztIGI+9CL.jpg',
      type: 'Regur/Volcanic',
      season: 'Summer-Rabi',
      crops: 'Cotton, Soybean, Sugarcane, Wheat',
      price: '₹250-550 per ton',
      description: 'Volcanic origin soil with exceptional moisture retention and mineral content, perfect for cash crops.',
      downside: 'Poor drainage, becomes sticky when wet, hard when dry',
      composition: 'High clay content (60-70%), rich in montmorillonite',
      phLevel: '7.5 - 8.5 (Slightly alkaline)',
      waterRetention: 'Exceptional - can hold water for extended periods',
      fertility: 'High in potash, phosphorus, and lime',
      applications: 'Cotton cultivation, sugarcane farming, wheat production',
      bestPractices: 'Deep ploughing, drainage systems, gypsum application for structure',
      yieldIncrease: 'Increases cotton yield by 30-45% with proper management',
      environmentalImpact: 'Naturally rich in minerals, reducing need for synthetic fertilizers. Excellent water conservation properties help combat drought. However, intensive cultivation may lead to soil compaction and erosion if not managed properly.'
    },
    {
      id: 3,
      name: 'Alluvial Soil',
      image: 'https://img.freepik.com/free-photo/close-up-scraps-wood_1122-739.jpg?semt=ais_hybrid&w=740&q=80',
      type: 'River Deposited',
      season: 'Summer-Kharif',
      crops: 'Rice, Wheat, Maize, Pulses',
      price: '₹270-500 per ton',
      description: 'Fertile deposits from rivers, constantly renewed with nutrients, excellent for cereal production.',
      downside: 'Prone to waterlogging, nutrient leaching during floods',
      composition: 'Fine particles with good organic matter content',
      phLevel: '6.5 - 7.5 (Neutral)',
      waterRetention: 'Good - suitable for paddy cultivation',
      fertility: 'High in nitrogen and phosphorus, low in potash',
      applications: 'Rice paddies, wheat fields, vegetable cultivation',
      bestPractices: 'Proper drainage, balanced fertilization, crop diversification',
      yieldIncrease: 'Boosts rice production by 20-35% with proper water management',
      environmentalImpact: 'Naturally replenished by river systems, supporting sustainable agriculture. Prone to chemical runoff into water bodies, so requires careful nutrient management to protect aquatic ecosystems.'
    },
    {
      id: 4,
      name: 'Red Soil',
      image: 'https://sasyamruth.com/wp-content/uploads/2024/04/red-soil-fruit-plants-purchase.jpg',
      type: 'Weathered Rock',
      season: 'Kharif',
      crops: 'Groundnut, Millets, Tobacco, Pulses',
      price: '₹230-400 per ton',
      description: 'Iron-rich soil with excellent drainage, warms quickly in spring, ideal for drought-resistant crops.',
      downside: 'Low organic matter, requires frequent fertilization',
      composition: 'Iron oxides, quartz, feldspar with porous structure',
      phLevel: '5.5 - 6.5 (Acidic)',
      waterRetention: 'Low to moderate - quick drainage',
      fertility: 'Low in nitrogen, phosphorus, and organic matter',
      applications: 'Dryland farming, millet cultivation, cashew plantations',
      bestPractices: 'Organic matter addition, lime application, contour farming',
      yieldIncrease: 'With amendments, can improve groundnut yield by 20-30%',
      environmentalImpact: 'Requires significant organic amendments and lime application, which can increase carbon footprint. However, excellent for water conservation and preventing waterlogging. Supports drought-resistant crop varieties.'
    }
  ];

  const pesticides = [
    {
      id: 1,
      name: 'Neem Oil',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBZupzwMSuu8CAk5O4_GNqcQRI1ME_fQ8bKQ&s',
      type: 'Botanical/Organic',
      season: 'All Seasons (Peak: Summer, Rainy)',
      crops: 'Vegetables, Rice, Fruits, Ornamentals',
      price: '₹350-600 per liter',
      description: 'Natural bio-pesticide extracted from neem seeds, providing eco-friendly pest control with systemic action.',
      downside: 'Slower action against severe infestations, requires repeated applications',
      activeIngredient: 'Azadirachtin (1500-3000 ppm)',
      modeOfAction: 'Growth regulator, feeding deterrent, oviposition deterrent',
      targetPests: 'Aphids, whiteflies, thrips, caterpillars, leaf miners',
      applicationRate: '2-5 ml per liter of water',
      safetyPeriod: '0 days (no waiting period for harvest)',
      resistance: 'Very low risk of pest resistance development',
      beneficialEffect: 'Safe for bees, ladybugs, and other beneficial insects',
      environmentalImpact: 'Highly eco-friendly and biodegradable. Derived from renewable neem trees, it breaks down naturally in soil and water. Safe for beneficial insects, birds, and mammals. Promotes integrated pest management and reduces chemical pesticide dependency.'
    },
    {
      id: 2,
      name: 'Pesto Raze',
      image: 'https://5.imimg.com/data5/SELLER/Default/2023/10/352100226/IL/YJ/DD/107380926/hoof-and-horn-meal.jpg',
      type: 'Synthetic Chemical',
      season: 'Kharif Season',
      crops: 'Cotton, Pulses, Vegetables',
      price: '₹900-1200 per 100ml',
      description: 'Advanced systemic insecticide with quick knockdown effect against sucking pests and lepidopteran larvae.',
      downside: 'Chemical residue concerns, potential resistance development, costly',
      activeIngredient: 'Thiamethoxam + Lambda-cyhalothrin',
      modeOfAction: 'Nerve poison, blocks sodium channels',
      targetPests: 'Bollworm, aphids, jassids, thrips, armyworm',
      applicationRate: '0.5-1 ml per liter of water',
      safetyPeriod: '15-21 days before harvest',
      resistance: 'Moderate risk - rotate with different modes of action',
      beneficialEffect: 'Harmful to bees - avoid spraying during flowering',
      environmentalImpact: 'Moderate to high environmental concern. Persistent in soil and may contaminate groundwater. Toxic to pollinators, aquatic life, and beneficial insects. Requires careful application timing and protective equipment. Should be used as part of resistance management strategy.'
    },
    {
      id: 3,
      name: 'Altair Herbicide',
      image: 'https://www.global-agriculture.com/wp-content/uploads/2025/07/Untitled-1-copy-102.jpg',
      type: 'Selective Herbicide',
      season: 'Summer, Kharif',
      crops: 'Paddy, Maize, Wheat',
      price: '₹600-850 per 500ml',
      description: 'Post-emergence selective herbicide for controlling grasses and broad-leaf weeds in cereal crops.',
      downside: 'May affect aquatic life, drift can damage non-target crops',
      activeIngredient: '2,4-D Ethyl Ester + Metsulfuron Methyl',
      modeOfAction: 'Growth hormone disruptor, amino acid synthesis inhibitor',
      targetWeeds: 'Cyperus, Echinochloa, broad-leaf weeds',
      applicationRate: '1-1.5 ml per liter of water',
      safetyPeriod: '60 days before harvest',
      resistance: 'Low to moderate risk with proper rotation',
      beneficialEffect: 'Selective - safe for rice when used as directed',
      environmentalImpact: 'Moderate environmental risk. Can persist in water systems and affect aquatic plants. Risk of drift to non-target crops and wild plants. Biodegrades slowly in soil. Requires buffer zones near water bodies and careful application to minimize environmental exposure.'
    },
    {
      id: 4,
      name: 'Sulphur Dust',
      image: 'https://5.imimg.com/data5/SELLER/Default/2020/10/GT/PO/IO/4632151/sulphur-dust-500x500.jpg',
      type: 'Inorganic Fungicide',
      season: 'Summer, Rabi',
      crops: 'Fruits, Pulses, Oilseeds, Grapes',
      price: '₹200-350 per kg',
      description: 'Traditional mineral fungicide providing excellent control of powdery mildew and other fungal diseases.',
      downside: 'Requires frequent applications, can cause phytotoxicity in hot weather',
      activeIngredient: 'Elemental Sulphur (80-90%)',
      modeOfAction: 'Multi-site contact fungicide, sulfur metabolism disruption',
      targetDiseases: 'Powdery mildew, rust, scab, mites',
      applicationRate: '2-3 kg per hectare (dusting)',
      safetyPeriod: '0 days (GRAS - Generally Recognized As Safe)',
      resistance: 'Very low risk due to multi-site action',
      beneficialEffect: 'Also provides sulfur nutrition to plants',
      environmentalImpact: 'Generally environmentally safe as sulfur is a natural element. Minimal toxicity to mammals and birds. However, can lower soil pH over time with excessive use. May cause respiratory irritation during application. Low risk to beneficial insects when used appropriately.'
    }
  ];

  const cropMedicines = [
    {
      id: 1,
      name: 'Copper Oxychloride',
      image: 'https://m.media-amazon.com/images/I/61s8e7CpWTL.jpg',
      type: 'Bactericide/Fungicide',
      season: 'All Seasons',
      crops: 'Tomato, Potato, Citrus, Grapes',
      price: '₹180-300 per 500g',
      description: 'Broad-spectrum copper-based bactericide and fungicide for controlling bacterial and fungal diseases.',
      downside: 'Copper accumulation in soil, phytotoxicity risk in young plants',
      activeIngredient: 'Copper Oxychloride (50% metallic copper)',
      modeOfAction: 'Cell membrane damage, enzyme disruption',
      targetDiseases: 'Bacterial blight, late blight, downy mildew, canker',
      applicationRate: '2-3 g per liter of water',
      safetyPeriod: '7-14 days before harvest',
      resistance: 'Very low risk - inorganic mode of action',
      beneficialEffect: 'Also provides copper micronutrient to plants',
      environmentalImpact: 'Moderate environmental concern due to copper accumulation in soil over time. Toxic to aquatic life and soil microorganisms in high concentrations. Can affect earthworms and beneficial soil fauna. Requires rotation with other fungicides to prevent copper buildup.'
    },
    {
      id: 2,
      name: 'Streptomycin',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QImtRvw6mhr-Z2nVT89nNXVmUCZJ7Vijlg&s',
      type: 'Antibiotic Bactericide',
      season: 'Rainy Season',
      crops: 'Rice, Vegetables, Fruits',
      price: '₹400-650 per 100g',
      description: 'Systemic antibiotic for controlling bacterial diseases, especially effective against fire blight and bacterial wilt.',
      downside: 'Antibiotic resistance development, restricted use in many countries',
      activeIngredient: 'Streptomycin Sulphate (90%)',
      modeOfAction: 'Protein synthesis inhibitor in bacteria',
      targetDiseases: 'Fire blight, bacterial wilt, soft rot, leaf spots',
      applicationRate: '0.5-1 g per liter of water',
      safetyPeriod: '30 days before harvest',
      resistance: 'High risk - use only when necessary',
      beneficialEffect: 'Quick systemic action, effective at low concentrations',
      environmentalImpact: 'High environmental concern. Contributes to antibiotic resistance in environmental bacteria. Can disrupt soil microbial communities and affect beneficial bacteria. Persistent in soil and may contaminate water sources. Many countries have restrictions or bans on agricultural use.'
    },
    {
      id: 3,
      name: 'Carbendazim',
      image: 'https://www.pomais.com/wp-content/uploads/2024/08/Carbendazim-50wp-1.jpg',
      type: 'Systemic Fungicide',
      season: 'All Seasons',
      crops: 'Cotton, Soybean, Wheat, Vegetables',
      price: '₹250-400 per 250ml',
      description: 'Broad-spectrum systemic fungicide with protective, curative, and eradicant properties against fungal diseases.',
      downside: 'Resistance development, potential carcinogenic concerns',
      activeIngredient: 'Carbendazim 50% WP',
      modeOfAction: 'Microtubule assembly inhibitor, cell division disruption',
      targetDiseases: 'Anthracnose, leaf spot, root rot, wilt diseases',
      applicationRate: '1-2 g per liter of water',
      safetyPeriod: '15-20 days before harvest',
      resistance: 'High risk - rotate with different groups',
      beneficialEffect: 'Long-lasting protection, systemic movement',
      environmentalImpact: 'Moderate to high environmental concern. Classified as possible carcinogen. Persistent in soil and can leach into groundwater. Toxic to aquatic organisms and may affect soil microorganisms. Bioaccumulates in food chain. Requires careful handling and disposal.'
    },
    {
      id: 4,
      name: 'Bordeaux Mixture',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSthpTaP2S0--ivRrTKi-seuDXWry1uGBFfiQ&s',
      type: 'Contact Fungicide',
      season: 'Winter, Spring',
      crops: 'Grapes, Citrus, Coffee, Vegetables',
      price: '₹150-250 per kg',
      description: 'Traditional copper-lime fungicide mixture providing excellent protective action against fungal diseases.',
      downside: 'Labor-intensive preparation, copper buildup in soil over time',
      activeIngredient: 'Copper Sulphate + Lime (1:1 ratio)',
      modeOfAction: 'Copper ion toxicity to fungal spores and mycelium',
      targetDiseases: 'Downy mildew, leaf curl, anthracnose, scab',
      applicationRate: '5-10 g per liter of water',
      safetyPeriod: '14-21 days before harvest',
      resistance: 'Very low risk - multi-site contact action',
      beneficialEffect: 'Long history of safe use, rainfast properties',
      environmentalImpact: 'Moderate environmental impact. Copper can accumulate in soil over years of use, potentially affecting soil fertility and microbial activity. Less toxic than synthetic fungicides but still requires responsible use. Can be harmful to aquatic life if runoff occurs.'
    }
  ];

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    
    // Simple professional slide animation
    slideAnim.setValue(screenHeight);
    fadeAnim.setValue(0);
    
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start(() => {
      setModalVisible(false);
      setSelectedItem(null);
    });
  };

  const renderCard = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => openModal(item)}
      style={styles.card}
      activeOpacity={0.9}
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.cardText} numberOfLines={2}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.cardPrice}>{item.price.split(' ')[0]}</Text>
          <Text style={styles.cardPriceUnit}>{item.price.split(' ').slice(1).join(' ')}</Text>
        </View>
        <View style={styles.typeTag}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (title, data, iconImage) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconContainer}>
          <Image 
            source={{ uri: iconImage }} 
            style={styles.sectionIconImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{data.length} products available</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        {data.map((item) => renderCard(item))}
      </View>
    </View>
  );

  const InfoRow = ({ label, value, isImportant }) => (
    <View style={[styles.infoRow, isImportant && styles.importantInfoRow]}>
      <Text style={[styles.infoLabel, isImportant && styles.importantLabel]}>
        {label}
      </Text>
      <Text style={[styles.infoValue, isImportant && styles.importantValue]}>
        {value}
      </Text>
    </View>
  );

  const environmentCard = (item) => (
    <View style={styles.environmentCard}>
      <Text style={styles.cardTitle}>🌍 Environmental Impact</Text>
      <Text style={styles.environmentText}>
        {item.environmentalImpact}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>🌾 Agro Essentials</Text>
          <Text style={styles.headerSubtitle}>Professional Crop Care Solutions</Text>
          <TouchableOpacity
            style={{ position: "absolute", left: 20, top: 50 }}
            onPress={() => router.push("/(tabs)/user")}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerStats}>

            <View style={styles.statDivider} />
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderSection('Soil Management', soilTypes, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVD8xknk-tr70-o28bx-abLrtGqhD2Tyq4Q&s')}
        {renderSection('Pesticides', pesticides, 'https://static.vecteezy.com/system/resources/thumbnails/024/102/842/small_2x/farmer-sprays-a-potato-plantation-with-a-sprayer-chemical-treatment-mist-sprayer-fungicide-and-pesticide-effective-crop-protection-of-cultivated-plants-against-insects-and-fungal-field-work-photo.jpg')}
        {renderSection('Crop Medicines', cropMedicines, 'https://5.imimg.com/data5/SELLER/Default/2022/9/CF/PM/FS/128941024/crop-shield-pesticides-500x500.jpg')}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
        statusBarTranslucent={true}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={closeModal}
          />
          
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            {selectedItem && (
              <>
                <View style={styles.modalHeader}>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={closeModal}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.modalHeaderContent}>
                    <View style={styles.modalImageContainer}>
                      <Image 
                        source={{ uri: selectedItem.image }} 
                        style={styles.modalImage}
                        resizeMode="cover"
                      />
                    </View>
                    <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                    <View style={styles.modalBadge}>
                      <Text style={styles.modalBadgeText}>{selectedItem.type}</Text>
                    </View>
                  </View>
                </View>

                <ScrollView 
                  style={styles.modalBody} 
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.modalBodyContent}
                >
                  <View style={styles.descriptionCard}>
                    <Text style={styles.descriptionText}>{selectedItem.description}</Text>
                  </View>

                  <View style={styles.infoCard}>
                    <Text style={styles.cardTitle}>📋 Basic Information</Text>
                    <InfoRow label="Season" value={selectedItem.season} />
                    <InfoRow label="Best Crops" value={selectedItem.crops} />
                    <InfoRow 
                      label="Price Range" 
                      value={selectedItem.price} 
                      isImportant={true}
                    />
                  </View>

                  {(selectedItem.composition || selectedItem.activeIngredient) && (
                    <View style={styles.infoCard}>
                      <Text style={styles.cardTitle}>🔬 Technical Details</Text>
                      {selectedItem.composition && (
                        <InfoRow label="Composition" value={selectedItem.composition} />
                      )}
                      {selectedItem.phLevel && (
                        <InfoRow label="pH Level" value={selectedItem.phLevel} />
                      )}
                      {selectedItem.activeIngredient && (
                        <InfoRow label="Active Ingredient" value={selectedItem.activeIngredient} />
                      )}
                      {selectedItem.modeOfAction && (
                        <InfoRow label="Mode of Action" value={selectedItem.modeOfAction} />
                      )}
                      {selectedItem.applicationRate && (
                        <InfoRow label="Application Rate" value={selectedItem.applicationRate} />
                      )}
                    </View>
                  )}

                  <View style={styles.infoCard}>
                    <Text style={styles.cardTitle}>📈 Effectiveness</Text>
                    {selectedItem.fertility && (
                      <InfoRow label="Fertility Level" value={selectedItem.fertility} />
                    )}
                    {selectedItem.targetPests && (
                      <InfoRow label="Target Pests" value={selectedItem.targetPests} />
                    )}
                    {selectedItem.targetDiseases && (
                      <InfoRow label="Target Diseases" value={selectedItem.targetDiseases} />
                    )}
                    {selectedItem.yieldIncrease && (
                      <InfoRow 
                        label="Yield Improvement" 
                        value={selectedItem.yieldIncrease}
                        isImportant={true}
                      />
                    )}
                  </View>

                  <View style={styles.warningCard}>
                    <Text style={styles.cardTitle}>⚠️ Safety & Precautions</Text>
                    {selectedItem.safetyPeriod && (
                      <InfoRow label="Safety Period" value={selectedItem.safetyPeriod} />
                    )}
                    {selectedItem.resistance && (
                      <InfoRow label="Resistance Risk" value={selectedItem.resistance} />
                    )}
                    <InfoRow 
                      label="Limitations" 
                      value={selectedItem.downside}
                    />
                  </View>

                  {environmentCard(selectedItem)}

                  <TouchableOpacity 
                    onPress={closeModal} 
                    style={styles.actionButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionButtonText}>Got it! 👍</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  
  header: {
    height: 160,
    backgroundColor: '#2E7D32',
    paddingTop: StatusBar.currentHeight + 10,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#C8E6C9',
    marginBottom: 15,
  },
  headerStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  statLabel: {
    fontSize: 10,
    color: '#C8E6C9',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 2,
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },
  sectionIconImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1B5E20',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#66BB6A',
    marginTop: 2,
  },

  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  card: {
    width: (screenWidth - 45) / 2,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    padding: 15,
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  cardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 8,
    minHeight: 32,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
  },
  cardPriceUnit: {
    fontSize: 9,
    color: '#66BB6A',
    marginTop: 1,
  },
  typeTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 9,
    color: '#2E7D32',
    fontWeight: '500',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: screenHeight * 0.9,
    minHeight: screenHeight * 0.75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 16,
  },
  modalHeader: {
    backgroundColor: '#1B5E20',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalHeaderContent: {
    alignItems: 'center',
  },
  modalImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  modalImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  modalBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  modalBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Modal Body Styles
  modalBody: {
    flex: 1,
  },
  modalBodyContent: {
    padding: 20,
    paddingBottom: 30,
  },

  // Card Components
  descriptionCard: {
    backgroundColor: '#F1F8E9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  warningCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  environmentCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Card Headers
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 16,
  },

  // Description
  descriptionText: {
    fontSize: 16,
    color: '#2E7D32',
    lineHeight: 24,
    fontStyle: 'italic',
  },

  // Info Rows
  infoRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  importantInfoRow: {
    backgroundColor: '#F8F9FA',
    marginHorizontal: -8,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderBottomWidth: 0,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  importantLabel: {
    color: '#1B5E20',
    fontWeight: '700',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  importantValue: {
    fontWeight: '600',
    color: '#1B5E20',
  },

  // Environment Text
  environmentText: {
    fontSize: 15,
    color: '#2E7D32',
    lineHeight: 22,
  },

  // Action Button
  actionButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    paddingVertical: 18,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default CropCarePage;