## Overview:
The FavoritesListApp is a mobile application that allows users to explore information about various countries, view their details, and manage their favorites. The app utilizes the React Native framework for cross-platform development, providing a seamless experience on both iOS and Android devices. It integrates with Firebase for user authentication and Firestore for storing user-specific data such as favorites. Users can log in, view a list of independent countries, access detailed information about each country, and manage their favorite countries.

## Features:

### User Authentication:
        Users can register and log in to the application.
        Firebase authentication is employed for secure user registration and login.

### Country Listing:
        The app fetches country data from the REST Countries API to provide a comprehensive list of independent countries.
        Users can view country names, capitals, and other basic information.

### Country Details:
        Selecting a country from the list navigates the user to a detailed view.
        Country details include the common name, capital, flag, and location on a map.

### Favorites Management:
        Users can add and remove countries from their favorites list.
        Firebase Firestore is utilized to store and retrieve user-specific favorites data.

### Navigation:
        The app utilizes React Navigation for seamless navigation between screens.
        Users can easily switch between the country list, country details, favorites, and login screens.

### Tech Stack:

    React Native
    Firebase: Firebase is used for user authentication (Firebase Auth) and real-time database (Firestore) to store user-specific data.
    React Navigation.
    Axios.