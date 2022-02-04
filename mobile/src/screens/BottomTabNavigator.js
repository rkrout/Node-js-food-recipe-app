import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./HomeScreen"
import BottomTab from "../components/BottomTab"
import CategoryListScreen from "./CategoryListScreen"
import SearchRecipeScreen from "./SearchRecipeScreeen"

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator tabBar={props => <BottomTab {...props} />} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="category-list" component={CategoryListScreen} />
            <Tab.Screen name="search-recipe" component={SearchRecipeScreen} />
        </Tab.Navigator>
    )
}