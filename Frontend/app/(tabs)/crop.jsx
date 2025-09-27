// Progress.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';

// Data arrays for each category
const diseases = [
  {
    id: '1',
    name: 'Fusarium Wilt',
    description: `Soil-borne fungal disease affecting tomatoes, bananas, eggplants, peppers. Symptoms: wilting, yellowing leaves, vascular browning.`,
    image: require('../../assets/images/f1.jpg'),
  },
  {
    id: '2',
    name: 'Powdery Mildew',
    description: `Fungal disease causing white powdery spots on leaves and stems, leaf curling, yellowing, reduced growth.`,
    image: require('../../assets/images/f2.jpg'),
  },
  {
    id: '3',
    name: 'Bacterial Blight',
    description: `Caused by Xanthomonas bacteria. Water-soaked lesions on leaves, stems, pods, leaf drop, reduced yield.`,
    image: require('../../assets/images/f3.jpg'),
  },
  {
    id: '4',
    name: 'Rusts',
    description: `Fungal infection producing orange, yellow, or brown pustules on leaves/stems, causing leaf drop and stunted growth.`,
    image: require('../../assets/images/f4.jpg'),
  },
];

const fertilizers = [
  {
    id: 'f1',
    name: 'Nitrogen Fertilizers',
    description:
      'Nitrogen fertilizers (like Urea, Ammonium Nitrate) promote vegetative growth, leaf development, and chlorophyll formation. 40–80 kg N per hectare (adjusted by crop and soil test).',
    image: require('../../assets/images/f5.jpg'),
  },
  {
    id: 'f2',
    name: 'Phosphorus Fertilizers',
    description:
      'Boost root growth, flowering, and seed/fruit development, crucial in early crop stages. 20–40 kg P₂O₅ per acre (≈ 50–100 kg of fertilizer like DAP, MAP, or TSP, depending on soil and crop).',
    image: require('../../assets/images/f6.jpg'),
  },
  {
    id: 'f3',
    name: 'Potassium Fertilizers',
    description:
      'Potassium fertilizers supply potassium (K), an essential nutrient that enhances root strength, improves water regulation, increases disease resistance, and boosts crop yield and quality. 40–80 kg K₂O per hectare (varies by crop, soil test results, and local agronomy guidelines).',
    image: require('../../assets/images/f7.jpg'),
  },
];

const chemicals = [
  {
    id: 'c1',
    name: 'Glyphosate',
    description: 'A widely used herbicide to control weeds.',
    priceRange: '₹500 – ₹1200 per liter',
    buyLink: 'https://www.amazon.in/s?k=Glyphosate',
    image: require('../../assets/images/f8.jpg'),
  },
  {
    id: 'c2',
    name: 'Permethrin',
    description: 'Synthetic insecticide used to control pests.',
    priceRange: '₹300 – ₹800 per liter',
    buyLink: 'https://www.amazon.in/s?k=Permethrin',
    image: require('../../assets/images/f9.jpg'),
  },
  {
    id: 'c3',
    name: 'Atrazine',
    description:
      'Atrazine is a selective herbicide primarily used in agriculture to control broadleaf and grassy weeds in crops like corn and sugarcane.',
    priceRange: '₹400 – ₹1000 per kg',
    buyLink: 'https://www.amazon.in/s?k=Atrazine',
    image: require('../../assets/images/f15.jpg'),
  },
];

const soilTypes = [
  {
    id: 's1',
    name: 'Loam',
    description: 'Balanced texture, suitable for most crops.',
    image: require('../../assets/images/f10.jpg'),
  },
  {
    id: 's2',
    name: 'Clay',
    description: 'High water retention, ideal for paddy and sugarcane.',
    image: require('../../assets/images/f11.jpg'),
  },
  {
    id: 's3',
    name: 'Sandy',
    description: 'Fast drainage, warms quickly, suitable for nuts and potatoes.',
    image: require('../../assets/images/f12.jpg'),
  },
  {
    id: 's4',
    name: 'Silt',
    description: 'Smooth texture, high moisture retention, fertile.',
    image: require('../../assets/images/f13.jpg'),
  },
  {
    id: 's5',
    name: 'Alluvial',
    description:
      'Fertile river deposits ideal for wheat, rice, and other food crops.',
    image: require('../../assets/images/f14.jpg'),
  },
];

// Section descriptions
const sectionDescriptions = {
  diseases:
    'Common plant diseases that affect growth and yield. Learn symptoms and how to identify them.',
  fertilizers:
    'Fertilizers provide essential nutrients like Nitrogen, Phosphorus, and Potassium to boost crop productivity.',
  chemicals:
    'Herbicides and chemicals help farmers manage weeds and pests effectively for healthier crops.',
  soilTypes:
    'Different soil types support different crops. Knowing your soil helps choose the right farming practices.',
};

const Progress = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderSection = (title, data, key) => (
    <View style={{ marginBottom: 30 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>
        {sectionDescriptions[key]}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item)}
          >
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderSection('Plant Diseases', diseases, 'diseases')}
      {renderSection('Fertilizers & Nutrients', fertilizers, 'fertilizers')}
      {renderSection('Herbicides & Chemicals', chemicals, 'chemicals')}
      {renderSection('Soil Types', soilTypes, 'soilTypes')}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Image
                  source={selectedItem.image}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <Text style={styles.modalDescription}>
                  {selectedItem.description}
                </Text>

                {/* Price Range */}
                {selectedItem.priceRange && (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#444',
                      marginBottom: 10,
                    }}
                  >
                    Price Range: {selectedItem.priceRange}
                  </Text>
                )}

                {/* Amazon Buy Link */}
                {selectedItem.buyLink && (
                  <TouchableOpacity
                    style={[
                      styles.closeButton,
                      { backgroundColor: '#FF9800', marginBottom: 15 },
                    ]}
                    onPress={() => Linking.openURL(selectedItem.buyLink)}
                  >
                    <Text style={styles.closeText}>Buy on Amazon</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 5,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    width: 140,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  cardImage: { width: 100, height: 100, marginBottom: 10, borderRadius: 10 },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#388E3C',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  modalDescription: { fontSize: 16, color: '#212121', marginBottom: 20 },
  closeButton: {
    backgroundColor: '#388E3C',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
