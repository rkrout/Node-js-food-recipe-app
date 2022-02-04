import { StyleSheet, View, Text } from "react-native";

export default function PageError({ error }) {
    return <>
        <View style={styles.container}>
            <Text style={styles.error}>{error}</Text>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    error: {
        color: "red",
        fontSize: 18,
        fontWeight: 600
    }
})