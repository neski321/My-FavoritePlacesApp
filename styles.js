import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    log_backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
      log_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      loginBox: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
        padding: 16,
        width: 250, // Adjust the width of the square as needed
        alignItems: "center",
      },
      log_headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
      },
      log_input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 16,
        width: "100%",
        borderRadius: 8,
      },
      list_container: {
        flex: 1,
        padding: 20,
      },
      list: {
        borderWidth: 1,
        borderColor: "transparent",
      },
      list_countryBox: {
        padding: 12,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        marginBottom: 12,
      },
      list_countryName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
      },
      list_capital: {
        fontSize: 16,
        color: "white"
      },
      list_divider: {
        height: 1,
        backgroundColor: "transparent",
      },
      list_viewFavoritesButton: {
        marginTop: 20,
        backgroundColor: "#4CAF50",
        color: "#fff",
      },
      fav_container: {
        flex: 1,
        padding: 20,
      },
      fav_backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        
      },
      fav_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
      },
      fav_bodyText: {
        fontSize: 20,
        fontWeight: "bold",
      },
      fav_deleteButton: {
        padding: 10,
        borderRadius: 5,
      },
      fav_buttonText: {
        color: "white",
        fontWeight: "bold",
      },
      fav_divider: {
        borderWidth: 1,
        borderColor: "#000",
      },
      fav_emptyMessage: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 20,
      },
      Det_container: {
        flex: 1,
        padding: 20,
      },
      Det_headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
      },
      Det_bodyText: {
        fontSize: 18,
        marginBottom: 10,
      },
      Det_map: {
        height: 300,
        marginVertical: 10,
      },
      Det_flag: {
        width: 50,
        height: 30,
        marginBottom: 10,
      },
});

export default styles;