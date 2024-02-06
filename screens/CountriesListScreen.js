import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Pressable, Button } from "react-native";
import { auth } from "../firebaseConfig";
import axios from "axios";
import styles from "../styles.js";


const CountriesListScreen = (props) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    // Fetch countries data from the REST Countries API
    axios
      .get("https://restcountries.com/v3.1/independent?status=true&fields=name,capital,cca2")
      .then((response) => {
        setListData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const rowClicked = (item) => {
    props.navigation.navigate("Country Details", { countryName: item.name.common, countryCode: item.cca2 });
  };

  const logoutPressed = async () => {
    try {
      await auth.signOut(); 
      alert("Logged out successfully!");
      props.navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleNavigateToFavorites = () => {
    props.navigation.navigate("Favorites");
  };

  return (
    <View style={styles.list_container}>
      <FlatList
        style={styles.list}
        data={listData}
        renderItem={({ item }) => (
          <Pressable onPress={() => rowClicked(item)}>
            <View style={styles.list_countryBox}>
              <Text style={styles.list_countryName}>{item.name.common}</Text>
              <Text style={styles.list_capital}>Capital: {item.capital}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.list_divider} />}
      />
      <Button title="View Favorites" onPress={handleNavigateToFavorites} style={styles.list_viewFavoritesButton} />
      <Button title="LOGOUT" onPress={logoutPressed} color="#FF0000" />
    </View>
  );
};

export default CountriesListScreen;
