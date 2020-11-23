import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    header: {
        paddingTop: 5,
        backgroundColor: '#e1e8eb',
    },
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#228B22',
        padding: 2.5,
        margin: 1.25,
    },
    vBoldText: {
        color: '#228B22',
        padding: 2.5,
        margin: 1.25,
        fontWeight: "900",
    },
    boldText: {
        color: '#228B22',
        padding: 2.5,
        margin: 1.25,
        fontWeight: "700",
    },
    card: {
        borderColor: '#D3D3D3',
        borderWidth: 1,
        backgroundColor: '#e1e8eb',
        padding: 10,
        margin: 1.25,
    },
    category: {
        borderColor: '#D3D3D3',
        backgroundColor: '#e1e8eb',
        borderWidth: 1,
        padding: 10,
        margin: 1.25,
    }
});


export default styles;