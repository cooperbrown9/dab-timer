import React from 'react';
import {
  View,
   Text,
   Image,
   StyleSheet,
   TouchableOpacity,
   ScrollView
} from 'react-native';
import PropTypes from 'prop-types';

const Menu = (props) => (

  <View style={{backgroundColor: 'white', flex:1}} >

    <ScrollView style={styles.container} >
      <View style={{height: 40, backgroundColor: 'transparent'}}></View>
        { (props.options) ? props.options.map((menuItem) => {
          return(
            <TouchableOpacity style={styles.menuItem} onPress={() => { props.navigateFunc(menuItem.name, menuItem.sec, menuItem.min) } }>
              <View style={styles.imageContainer}>
                <Text>{menuItem.name}</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.menuItemName}>{menuItem.min}:{menuItem.sec}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      ): null
    }


    </ScrollView>
  </View>
)

Menu.propTypes = {
  navigateFunc: PropTypes.func,
  options: PropTypes.array
}
Menu.defaultPropTypes = {
  options: [
    {name: "Gary", min: 12, sec:44 }
  ]
}

const styles = StyleSheet.create({
  container:{
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',

  },
  menuItem: {
    height: 70,
    flexDirection: 'row',

  },
  iconStyle: {
    height: 42,
    width: 40
  },
  menuItemName: {
    fontSize: 15,
    marginLeft: 14,
    color: 'gray'
  },
  imageContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  nameContainer: {
    flex: 5,
    justifyContent: 'center',
  },
});

export default Menu;
