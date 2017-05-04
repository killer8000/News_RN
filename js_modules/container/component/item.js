import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
export default class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textColor: "#000000"

        }
    }
    setTextColor(color) {
        this.setState({textColor: color})
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.root, {marginTop: this.props.marginTop, marginBottom: this.props.marginBottom}]}>
                <Image resizeMode='center' source={this.props.leftImg }
                       style={[styles.img, this.props.leftImgStyle]}></Image>
                <Text
                    style={[styles.description, {color: this.state.textColor},this.props.descriptionStyle, ]}>{this.props.description}
                    </Text>
                <Image resizeMode='center' source={this.props.rightImg}
                       style={[styles.img, this.props.rightImgStyle]}></Image>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create(
    {
        img: {

            flex: 1, width: 20, height: 20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        description: {
            flex: 6,
            alignItems: 'center',
            justifyContent: 'center',
        },
        root: {
            flexDirection: 'row',
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: '#ffffff'
        }

    }
);