// Favorite.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Add crop to favorites
export const addCropToFavorites = async (crop) => {
  try {
    const existing = await AsyncStorage.getItem("favorites");
    const favorites = existing ? JSON.parse(existing) : [];

    // Check if crop already exists
    if (favorites.some((item) => item.id === crop.id)) {
      return false; // already exists
    }

    favorites.push(crop);
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error("Error adding favorite:", error);
    return false;
  }
};

// Check if crop is already in favorites
export const isCropInFavorites = async (cropId) => {
  try {
    const existing = await AsyncStorage.getItem("favorites");
    const favorites = existing ? JSON.parse(existing) : [];
    return favorites.some((item) => item.id === cropId);
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
};

// Remove crop from favorites
export const removeCropFromFavorites = async (cropId) => {
  try {
    console.log("Attempting to remove crop with ID:", cropId);

    // Get current favorites using the same pattern as other functions
    const existing = await AsyncStorage.getItem("favorites");
    const favorites = existing ? JSON.parse(existing) : [];

    console.log("Current favorites before removal:", favorites);

    // Filter out the crop to be removed
    const updatedFavorites = favorites.filter((crop) => crop.id !== cropId);

    console.log("Updated favorites after removal:", updatedFavorites);

    // Save back to AsyncStorage
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    console.log("Successfully removed crop from favorites");
    return true;
  } catch (error) {
    console.error("Error removing crop from favorites:", error);
    return false;
  }
};

// Get all favorites (helper function)
export const getFavorites = async () => {
  try {
    const existing = await AsyncStorage.getItem("favorites");
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

// Clear all favorites (utility function)
export const clearAllFavorites = async () => {
  try {
    await AsyncStorage.removeItem("favorites");
    return true;
  } catch (error) {
    console.error("Error clearing favorites:", error);
    return false;
  }
};