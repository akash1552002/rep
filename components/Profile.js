import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import expo-image-picker
import { CameraIcon } from "react-native-heroicons/solid"; // Import camera icon from heroicons
import { signOut } from "firebase/auth"; // Import signOut from Firebase Auth
import { auth } from "../firebaseConfig"; // Adjust path to your Firebase config
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const Profile = ({ route }) => {
  const { userName } = route.params || {}; // Get the userName passed via navigation
  const navigation = useNavigation(); // Initialize navigation hook

  const [image, setImage] = useState(null); // State to store the selected image
  const [loading, setLoading] = useState(false); // State to handle loading during logout

  // Request permission for media library and camera on component mount
  useEffect(() => {
    const getPermissions = async () => {
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (mediaLibraryStatus !== "granted" || cameraStatus !== "granted") {
        Alert.alert("Permission required", "You need to grant permission to access media library and camera.");
      }
    };

    getPermissions();
  }, []);

  // Function to open the image picker
  const pickImage = async () => {
    try {
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
    } catch (error) {
      Alert.alert("Image Picker Error", "There was an error selecting the image.");
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth); // Sign out the user
      Alert.alert("Logout Successful", "You have been logged out.");
      navigation.replace("Login"); // Navigate to Login screen
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    } finally {
      setLoading(false);
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
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No profile image selected</Text>
          </View>
        )}
      </View>

      {/* Button to choose an image */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
        <CameraIcon size={30} color="#000" />
        <Text style={styles.imagePickerText}>Choose Image</Text>
      </TouchableOpacity>

      <Text style={styles.userName}>Username: {userName || "Guest"}</Text>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.logoutButtonText}>Logout</Text>
        )}
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
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#aaa",
    fontSize: 14,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
