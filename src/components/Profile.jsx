import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import expo-image-picker
import { CameraIcon } from "react-native-heroicons/solid"; // Import camera icon from heroicons
import { signOut } from "firebase/auth"; // Import signOut from Firebase Auth
import { auth } from "../../firebaseConfig"; // Adjust path to your Firebase config
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const Profile = ({ route }) => {
  const { userName } = route.params || {}; // Get the userName passed via navigation
  const navigation = useNavigation(); // Initialize navigation hook

  const [image, setImage] = useState(null); // State to store the selected image

  // Request permission for media library and camera on component mount
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "You need to grant permission to access media library.");
      }
    };

    getPermissions();
  }, []);

  // Function to open the image picker
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
//       allowsEditing: true, // Allow cropping of the image
//       aspect: [4, 4], // Set the aspect ratio to square
//       quality: 1, // High quality image
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri); // Set the selected image URI to state
//     }
//   };
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
    allowsEditing: true, // Allow cropping of the image
    aspect: [4, 4], // Set the aspect ratio to square
    quality: 1, // High quality image
  });

  if (!result.canceled) {
    const selectedImageUri = result.assets[0].uri;
    setImage(selectedImageUri); // Set the selected image URI to state

    // Update the About screen with the new profile image
    navigation.setParams({ profileImage: selectedImageUri });
  }
};


  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      Alert.alert("Logout Successful", "You have been logged out.");
      navigation.replace("Login"); // Navigate to Login screen
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Display profile image if available */}
      <View style={styles.profileImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Text>No profile image selected</Text>
        )}
      </View>

      {/* Button to choose an image */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
        <CameraIcon size={30} color="#000" />
        <Text style={styles.imagePickerText}>Choose Image</Text>
      </TouchableOpacity>

      <Text style={styles.userName}>Username: {userName || "Guest"}</Text>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  imagePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  userName: {
    fontSize: 18,
    color: "#555",
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#FF5C5C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
