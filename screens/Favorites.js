// Import necessary components and libraries from React Native and other dependencies
import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Pressable, Alert, ImageBackground } from "react-native";
import { auth, db } from "../firebaseConfig"; // Assuming firebaseConfig contains Firebase authentication and Firestore setup
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore"; // Firestore methods for document operations
import styles from "../styles.js"; // Stylesheet for component styling

// Functional component for displaying the list of user's favorite countries
const FavoritesListScreen = () => {
  // State to manage the list of favorite countries
  const [favorites, setFavorites] = useState([]);

  // Retrieve current user and user ID using Firebase authentication
  const user = auth.currentUser;
  const userId = user?.uid;

  // useEffect hook to fetch user's favorite countries on component mount
  useEffect(() => {
    // Function to fetch user's favorite countries from Firestore
    const fetchFavorites = async () => {
      try {
        if (userId) {
          // Reference to the user's favorites collection in Firestore
          const favoritesRef = doc(db, "favorites", userId);
          
          // Get the current overview of the user's favorites
          const snapshot = await getDoc(favoritesRef);

          // Set the state with the user's favorite countries if they exist
          if (snapshot.exists()) {
            setFavorites(snapshot.data().countries || []);
          }
        }
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };

    // Invoke the function to fetch user's favorite countries
    fetchFavorites();
  }, [userId]);

  // Function to handle the deletion of a country from favorites
  const handleDeleteFavorite = async (countryCode) => {
    try {
      if (userId) {
        // Reference to the user's favorites collection in Firestore
        const favoritesRef = doc(db, "favorites", userId);
        
        // Update the user's favorites by removing the specified country code
        await updateDoc(favoritesRef, {
          countries: arrayRemove(countryCode),
        });

        // Update the state by filtering out the deleted country code
        setFavorites((prevFavorites) => prevFavorites.filter((code) => code !== countryCode));
      }
    } catch (error) {
      console.error("Error deleting favorite", error);
    }
  };

  // Render each item in the FlatList with country name and delete button
  const renderItem = ({ item }) => (
    <View style={styles.fav_row}>
      <Text style={styles.fav_bodyText}>Country Name: {item}</Text>
      <Pressable
        onPress={() => {
          // Show an alert to confirm the deletion of the country from favorites
          Alert.alert(
            "Remove from Favorites",
            `Are you sure you want to remove ${item} from your favorites?`,
            [
              { text: "Cancel", style: "cancel" },
              { text: "OK", onPress: () => handleDeleteFavorite(item) },
            ]
          );
        }}
        // Apply styles to the delete button, changing background color on press
        style={({ pressed }) => [
          styles.fav_deleteButton,
          { backgroundColor: pressed ? "#ff4500" : "#dc143c" },
        ]}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </View>
  );

  // Render the component with a background image, displaying favorites or an empty message
  return (
    <ImageBackground
      source={require("../bucket.jpg")} 
      style={styles.fav_backgroundImage}
      resizeMode="cover"
      blurRadius={9} 
    >
      <View style={styles.fav_container}>
        {favorites.length === 0 ? (
          <Text style={styles.fav_emptyMessage}>No favorites yet.</Text>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => <View style={styles.fav_divider} />}
          />
        )}
      </View>
    </ImageBackground>
  );
};

// Export the component as the default export
export default FavoritesListScreen;
