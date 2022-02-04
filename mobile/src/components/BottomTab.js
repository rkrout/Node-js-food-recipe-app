import { Text, StyleSheet, View, Pressable } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'

export default function BottomTab({ state, navigation }) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.item} onPress={() => navigation.navigate("home")}>
                <MaterialIcons name="home" size={24} color={0 === state.index ? "red" : "#444"} />
                <Text style={0 === state.index ? styles.activeText : styles.inactiveText}>Home</Text>
            </Pressable>

            <Pressable style={styles.item} onPress={() => navigation.navigate("category")}>
                <MaterialIcons name="sort" size={24} color={1 === state.index ? "red" : "#444"} />
                <Text style={1 === state.index ? styles.activeText : styles.inactiveText}>Category</Text>
            </Pressable>

            <Pressable style={styles.item} onPress={() => navigation.navigate("search")}>
                <MaterialIcons name="search" size={24} color={2 === state.index ? "red" : "#444"} />
                <Text style={2 === state.index ? styles.activeText : styles.inactiveText}>Search</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 15
    },
    item: {
        textAlign: "center"
    },
    activeText: {
        fontSize: 16,
        marginTop: 5,
        color: "red"
    },
    inactiveText: {
        fontSize: 16,
        marginTop: 5,
        color: "#444"
    }
})
