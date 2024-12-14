import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CameraIcon } from "react-native-heroicons/solid";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
    Login: undefined;
    About: undefined;
    Profile: { userName?: string,profileImage?: string  };
  };
  
  type ProfileProps = {
    route: RouteProp<RootStackParamList, "Profile">;
    navigation: StackNavigationProp<RootStackParamList, "Profile">;
  };

export default function Profile({ route, navigation }: ProfileProps) {
    const { userName } = route.params || {};
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
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
  
    const pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });
      
          if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImageUri = result.assets[0].uri;
            setImage(selectedImageUri);
            
            navigation.setParams({ profileImage: selectedImageUri });
          }
        } catch (error) {
          Alert.alert("Image Picker Error", "There was an error selecting the image.");
        }
      };
  
    const handleLogout = async () => {
      setLoading(true);
      try {
        await signOut(auth);
        Alert.alert("Logout Successful", "You have been logged out.");
        navigation.replace("Login");
      } catch (error: any) {
        Alert.alert("Logout Failed", error.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No profile image selected</Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
        <CameraIcon size={30} color="#000" />
        <Text style={styles.imagePickerText}>Choose Image</Text>
      </TouchableOpacity>

      <Text style={styles.userName}>Username: {userName || "Guest"}</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.logoutButtonText}>Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

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