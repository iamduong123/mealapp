import { Pressable,Text,Image } from "react-native";
export default function Button(props){
    return(
        <Pressable style={props.style} onPress={props.onPress}>
            <Text>{props.title}</Text>
            <Image source={{ uri: props.imageUrl }} style={props.style.image} />
        </Pressable>
    )
}