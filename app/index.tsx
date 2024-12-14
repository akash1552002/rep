import { NavigationProp } from "@react-navigation/native";
import Login from "./login";
interface Props {
  navigation: NavigationProp<any>;
}

export default function Index({ navigation }: Props) {
  return <Login navigation={navigation} />;
}
