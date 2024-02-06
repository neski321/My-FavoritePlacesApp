// Import necessary components and libraries from React Native and other dependencies
import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Pressable, Button } from "react-native";
import { auth } from "../firebaseConfig"; // Assuming firebaseConfig contains Firebase authentication setup
import axios from "axios"; // Library for making HTTP requests
import styles from "../styles.js"; // Stylesheet for component styling

// Functional component for displaying a list of countries
const CountriesListScreen = (props) => {
  // State to manage the list of countries
  const [listData, setListData] = useState([]);

  // useEffect hook to fetch data from the REST Countries API when the component mounts
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

  // Function to handle the press event when a country row is clicked
  const rowClicked = (item) => {
    // Navigate to the "Country Details" screen with the selected country's information
    props.navigation.navigate("Country Details", { countryName: item.name.common, countryCode: item.cca2 });
  };

  // Function to handle the press event when the "LOGOUT" button is pressed
  const logoutPressed = async () => {
    try {
      // Sign out the user using Firebase authentication
      await auth.signOut();
      alert("Logged out successfully!");
      // Navigate to the "Login" screen after successful logout
      props.navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // Function to navigate to the "Favorites" screen
  const handleNavigateToFavorites = () => {
    props.navigation.navigate("Favorites");
  };

  // Render the component with FlatList displaying countries, "View Favorites" button, and "LOGOUT" button
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

// Export the component as the default export
export default CountriesListScreen;
