import { Text, StyleSheet, View} from "react-native";
import { colors, fontSize, radius, spacing} from "../styles/theme";

type HeaderProps ={
    titulo: string;
    subtitulo?: string;
};

export default function Header({titulo, subtitulo}: HeaderProps){
    return (
        <View style = {styles.container}>
            <Text style = {styles.titulo}>{titulo} </Text>
            {subtitulo ? <Text style = {styles.subtitulo}>{subtitulo}
            </Text> : null}
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        marginBottom: spacing.lg,
        alignItems: 'center'
    },
    titulo:{
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center'
    },
    subtitulo:{
        fontSize: fontSize.md,
        color: colors.textlight,
        marginTop: spacing.xs,
        textAlign: 'center',
        lineHeight: 22
    }
})