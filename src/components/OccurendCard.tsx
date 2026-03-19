import { View, Text, StyleSheet} from "react-native";
import { colors, fontSize, radius, spacing} from "../styles/theme";

type OccurenceCardProps ={
    titulo: string;
    descricao: string;
    local: string;
}

export default function OccurenceCardProps ({
    titulo,
    local,
    descricao
}: OccurenceCardProps){
    return(
        <View style = {styles.card}>
            <View style = {styles.topo}>
                <Ionicons name ="alert-circle-outlie" size {22} color={colors.primary}/>
                <Text style = {styles.titulo}>{titulo}</Text>
            </View>
            <Text style = {styles.descricao}>{descricao}</Text>
            <View style = {styles.rodape}>
                <Ionicons name ="location-outlie" size {18} color={colors.textlight}/>
                <Text style = {styles.local}>{local}</Text>
            </View>
        </View>
    );
}