import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#03C04A",
    marginBottom: 5,
    textAlign: "center",
  },
  email: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#03C04A",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#03C04A",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    color:"#000",
    
  },
  dobContainer: {
    borderWidth: 1,
    borderColor: "#03C04A",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    minHeight: 50, // iOS compatibility
  },
  dobText: {
    fontSize: 16,
    color: "#000",
  },
  dobPlaceholder: {
    fontSize: 14,
    color: "#000",
  },
  button: {
    backgroundColor: "#03C04A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signOut: {
    backgroundColor: "#03C04A",
  },
  favButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#03C04A",
    alignItems: "center",
  },
  favText: {
    color: "#03C04A",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    height: 60,
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#03C04A",
    marginTop: 2,
  },
});
