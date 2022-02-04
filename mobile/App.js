import { NavigationContainer } from "@react-navigation/native"
import BottomTabNavigator from './src/screens/BottomTabNavigator'
import StackNavigator from "./src/screens/StackNavigator"

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}
