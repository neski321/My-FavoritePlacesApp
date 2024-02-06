// Import necessary components and libraries from React Native and other dependencies
import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { db, auth } from "../firebaseConfig"; // Assuming firebaseConfig contains Firebase authentication and Firestore setup
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore methods for document operations
import styles from "../styles.js"; // Stylesheet for component styling

// Functional component for displaying details of a specific country
const CountryDetailsScreen = (props) => {
  // Extract the country code from the navigation parameters
  const countryCode = props.route.params.countryCode;

  // State to manage country details and favorite status
  const [countryDetails, setCountryDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Retrieve current user and user ID using Firebase authentication
  const user = auth.currentUser;
  const userId = user?.uid;

  // useEffect hook to fetch country details and check favorite status on component mount
  useEffect(() => {
    // Fetch country details using the REST Countries API
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        setCountryDetails(response.data[0]);
      } catch (error) {
        console.error("Error fetching country details", error);
      }
    };

    // Check the favorite status of the country for the logged-in user
    const checkFavoriteStatus = async () => {
      if (userId) {
        try {
          // Reference to the user's favorites collection in Firestore
          const favoritesRef = doc(db, "favorites", userId);
          
          // Get the current overview of the user's favorites
          const snapshot = await getDoc(favoritesRef);
          
          // Extract the current favorites array to an empty array if it exists
          const favorites = snapshot.exists() ? snapshot.data().countries || [] : [];

          // Check if the country is in the favorites and set the state accordingly
          setIsFavorite(favorites.includes(countryCode));
        } catch (error) {
          console.error("Error checking favorite status", error);
        }
      }
    };

    // Invoke the functions to fetch country details and check favorite status
    fetchCountryDetails();
    checkFavoriteStatus();
  }, [countryCode, userId]);

  // Function to handle adding/removing a country to/from favorites
  const handleAddToFavorite = async () => {
    // Check if the user is logged in
    if (userId) {
      try {
        // Reference to the user's favorites collection in Firestore
        const favoritesRef = doc(db, "favorites", userId);
        
        // Get the current overview of the user's favorites
        const snapshot = await getDoc(favoritesRef);
        
        // Extract the current favorites array to an empty array if it exists
        const favorites = snapshot.exists() ? snapshot.data().countries || [] : [];

        // Check if the country is not already in favorites
        if (!favorites.includes(countryDetails.name.common)) {
          // Add the country to favorites if not present
          const updatedFavorites = [...favorites, countryDetails.name.common];
          await setDoc(favoritesRef, { countries: updatedFavorites });
          setIsFavorite(true);
          // Show an alert indicating successful addition to favorites
          Alert.alert("Added to Favorites", `Added ${countryDetails.name.common} to your favorites!`);
        } else {
          // Remove the country from favorites if already present
          const updatedFavorites = favorites.filter((name) => name !== countryDetails.name.common);
          await setDoc(favoritesRef, { countries: updatedFavorites });
          setIsFavorite(false);
          // Show an alert indicating successful removal from favorites
          Alert.alert("Removed from Favorites", `${countryDetails.name.common} removed from your favorites!`);
        }
      } catch (error) {
        console.error("Error updating favorites", error);
      }
    }
  };

  // Render the component with country details, map, and favorite button
  return (
    <View style={styles.Det_container}>
      {countryDetails && (
        <View>
          <Text style={styles.Det_headerText}>{countryDetails.name.common}</Text>
          <Text style={styles.Det_bodyText}>Capital: {countryDetails.capital}</Text>
          {countryDetails.flags && <Image style={styles.Det_flag} source={{ uri: countryDetails.flags.svg }} />}
          <MapView
            style={styles.Det_map}
            initialRegion={{
              latitude: countryDetails.latlng[0],
              longitude: countryDetails.latlng[1],
              latitudeDelta: 8,
              longitudeDelta: 8,
            }}
          >
            <Marker
              coordinate={{
                latitude: countryDetails.latlng[0],
                longitude: countryDetails.latlng[1],
              }}
              title={countryDetails.capital.toString()}
            />
          </MapView>
          {/* Render the button to add/remove from favorites based on the current favorite status */}
          <Button
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            onPress={handleAddToFavorite}
            color={isFavorite ? "#FF0000" : "#4CAF50"}
          />
        </View>
      )}
    </View>
  );
};

// Export the component as the default export
export default CountryDetailsScreen;
