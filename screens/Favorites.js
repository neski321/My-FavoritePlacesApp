import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Pressable, Alert, ImageBackground } from "react-native";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import styles from "../styles.js";

const FavoritesListScreen = () => {
  const [favorites, setFavorites] = useState([]);

  const user = auth.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userId) {
          const favoritesRef = doc(db, "favorites", userId);
          const snapshot = await getDoc(favoritesRef);

          if (snapshot.exists()) {
            setFavorites(snapshot.data().countries || []);
          }
        }
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleDeleteFavorite = async (countryCode) => {
    try {
      if (userId) {
        const favoritesRef = doc(db, "favorites", userId);
        await updateDoc(favoritesRef, {
          countries: arrayRemove(countryCode),
        });
        setFavorites((prevFavorites) => prevFavorites.filter((code) => code !== countryCode));
      }
    } catch (error) {
      console.error("Error deleting favorite", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.fav_row}>
      <Text style={styles.fav_bodyText}>Country Name: {item}</Text>
      <Pressable
        onPress={() => {
          Alert.alert(
            "Remove from Favorites",
            `Are you sure you want to remove ${item} from your favorites?`,
            [
              { text: "Cancel", style: "cancel" },
              { text: "OK", onPress: () => handleDeleteFavorite(item) },
            ]
          );
        }}
        style={({ pressed }) => [
          styles.fav_deleteButton,
          { backgroundColor: pressed ? "#ff4500" : "#dc143c" },
        ]}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </View>
  );

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

export default FavoritesListScreen;
