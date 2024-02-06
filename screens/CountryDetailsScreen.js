import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, setDoc} from "firebase/firestore";
import styles from "../styles.js";

const CountryDetailsScreen = (props) => {
  const countryCode = props.route.params.countryCode;

  const [countryDetails, setCountryDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const user = auth.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        setCountryDetails(response.data[0]);
      } catch (error) {
        console.error("Error fetching country details", error);
      }
    };

    const checkFavoriteStatus = async () => {
      if (userId) {
        try {
          const favoritesRef = doc(db, "favorites", userId);
          const snapshot = await getDoc(favoritesRef);
          if (snapshot.exists()) {
            const favorites = snapshot.data().countries || [];
            setIsFavorite(favorites.includes(countryCode));
          }
        } catch (error) {
          console.error("Error checking favorite status", error);
        }
      }
    };

    fetchCountryDetails();
    checkFavoriteStatus();
  }, [countryCode, userId]);

  const handleAddToFavorite = async () => {
  // Checking user logged in
  if (userId) {
    try {
      // Reference to the user's favorites collection in the Firestore data base
      const favoritesRef = doc(db, "favorites", userId);
      
      // Get the current overview of the user's favorites
      const snapshot = await getDoc(favoritesRef);
      
      // Extract the current favorites array to an empty array
      const favorites = snapshot.exists() ? snapshot.data().countries || [] : [];

      // Check if country is not already in favorites
      if (!favorites.includes(countryDetails.name.common)) {
        // Add country to favorites if not there
        const updatedFavorites = [...favorites, countryDetails.name.common];
        await setDoc(favoritesRef, { countries: updatedFavorites });
        setIsFavorite(true);
        Alert.alert("Added to Favorites", `Added ${countryDetails.name.common} to your favorites!`);
      } else {
        // Remove the country from favorites if already present
        const updatedFavorites = favorites.filter((name) => name !== countryDetails.name.common);
        await setDoc(favoritesRef, { countries: updatedFavorites });
        setIsFavorite(false);
        Alert.alert("Removed from Favorites", `${countryDetails.name.common} removed from your favorites!`);
      }
    } catch (error) {
      console.error("Error updating favorites", error);
    }
    }
  };

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

export default CountryDetailsScreen;
