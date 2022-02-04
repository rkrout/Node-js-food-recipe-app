import { StyleSheet, View, ActivityIndicator } from "react-native"

export default function PageLoader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="red" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})