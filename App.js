import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import About from "./components/About";
import Recipe from "./components/Recipe";
import RecipeDetail from "./components/RecipeDetail";
import LoginScreen from "./components/Login";
import SignupScreen from "./components/Signup";
import Profile from "./components/Profile";
import Loader from "./components/Loader";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="Loader" component={Loader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
