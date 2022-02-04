import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BottomTabNavigator from "./BottomTabNavigator"
import RecipeListScreen from "./RecipeListScreen"
import RecipeDetailsScreen from "./RecipeDetailsScreen"

const Stack = createNativeStackNavigator()

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="main-navigator" component={BottomTabNavigator}/>
            <Stack.Screen name="recipe-details" component={RecipeDetailsScreen} />
            <Stack.Screen name="recipe-list" component={RecipeListScreen} />
        </Stack.Navigator>
    )
}