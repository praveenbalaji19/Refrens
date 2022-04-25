import React from 'react'
import { View, Text, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters'
import { colors } from '../Themes';

const ListCard = props => {

    const { name, gender, image, location, origin, species, status } = props.item

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.flexerRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.nameTxt}>{name}</Text>
                        <Text style={styles.mildBoldTxt}>{species} - {gender}</Text>
                        <Text style={styles.regularTxt}>{status}</Text>
                    </View>
                    <View style={styles.imageView}>
                        <Image source={{ uri: image }} style={styles.imageSize} resizeMode={'contain'} />
                    </View>
                </View>
                <View style={styles.mT6}>
                    <Text style={styles.labelTxt}>Location: <Text style={styles.valueTxt}>{location.name}</Text></Text>
                    <Text style={styles.labelTxt}>Origin: <Text style={styles.valueTxt}>{origin.name}</Text></Text>
                </View>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        marginTop: '10@ms',
        marginBottom: '6@ms',
        width: '92%',
        marginLeft: '4%',
        borderRadius: '10@ms',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: colors.white,
        elevation: 1,
        borderColor: colors.appThemeColor,
        borderWidth: 1,
        alignItems: 'flex-end',
    },
    subContainer: {
        padding: "10@s",
        width: '100%',
    },
    flexerRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageView: {
        width: "80@ms",
        height: "80@ms",
        borderRadius: "40@ms",
        overflow: "hidden",
        backgroundColor: "#AEAEAE"
    },
    imageSize: {
        width: "80@ms",
        height: "80@ms",
        borderRadius: "40@ms"
    },
    nameTxt: {
        fontSize: "22@ms",
        fontWeight: "bold",
        color: colors.appThemeColor
    },
    mildBoldTxt: {
        fontSize: "16@ms", fontWeight: "500"
    },
    regularTxt: {
        fontSize: "15@ms",
        color: colors.grayColor
    },
    mT6: {
        margin: "6@ms"
    },
    valueTxt: {
        fontSize: "15@ms",
        color: "#9000ff"
    },
    labelTxt: {
        fontSize: "12@ms",
        color: "#1c0130"
    }
})

export default ListCard;
