// Subscription.js

import React from 'react';
import {
	View,
	StyleSheet,
	Platform,
	TouchableOpacity,
	Text,
	Alert,
	NativeModules
} from 'react-native';
import RNIap, {
  Product,
  ProductPurchase,
  acknowledgePurchaseAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';

var InAppUtils = require('NativeModules').InAppUtils;
const itemSubs = Platform.select({
  ios: [
    'Com.edenroselondon.pokerdex.premium' // dooboolab
  ],
  android: [
    'test.sub1', // subscription
  ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

class Subscription extends React.Component {
	
	state = {
		productList: [],
		receipt: '',
    availableItemsMessage: '',
	}

	componentDidMount() {
		// try {
  //     const result = await RNIap.initConnection();
  //     await RNIap.consumeAllItemsAndroid();
  //     this._getSubscriptions();
  //   } catch (err) {
  //   	console.log(err.code, err.message);
  //   }
	  InAppUtils.loadProducts(itemSubs, (error, products) => {
	    if (products.length > 0) {
	    	console.log(products);
		    this.setState({ productList: products });
		  }
		});
	}

	async _getSubscriptions() {
		try {
      const products = await RNIap.getProducts(itemSubs);
      // const purchases = await RNIap.getAvailablePurchases();
      Alert.alert('Products', products.count);
      this.setState({ productList: products });
    } catch (err) {
      console.log(err.code, err.message);
    }
	}

	async _subscribe(productId) {
		if (productId === null) { return }
		try {
      RNIap.requestSubscription(productId);
    } catch (err) {
      Alert.alert(err.code, err.message);
    }
	}

	subscribe(productId) {
		InAppUtils.canMakePayments((canMakePayments) => {
		  if(!canMakePayments) {
		    Alert.alert('Not Allowed', 'This device is not allowed to make purchases. Please check restrictions on device');
		    return;
		  }
		  InAppUtils.purchaseProduct(productId, (error, response) => {
			  if(response && response.productIdentifier) {
			      Alert.alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
			      //unlock store here.
			  }
			});
		});
	}

	render() {
		const { productList } = this.state;

		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {productList.length > 0 && this.subscribe(productList[0].identifier)}}
				>
					<View style={styles.wrapper}>
						<Text style={styles.buttonTitle}>Subscribe</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    alignItems: 'center',
		justifyContent: 'center',
    backgroundColor: '#274272',
	},
	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		width: '80%',
		height: 40,
		borderRadius: 6,
		backgroundColor: '#03ADB0'
	},
	buttonTitle: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	}
});

export default Subscription;