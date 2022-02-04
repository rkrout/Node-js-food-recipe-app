import { Text, StyleSheet } from "react-native"

export default function TitleText({ title, style }) {
    return <>
        <Text style={[styles.text, style]}>{title}</Text>
    </>
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 888,
        fontSize: 22,
        marginBottom: 20
    }
})