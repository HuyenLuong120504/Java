import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Cần cài đặt thư viện này

const ProductDetails = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' }} style={styles.logo} />
        <View style={styles.iconsContainer}>
          <Icon name="search" size={20} color="#000" style={styles.icon} />
          <Icon name="user" size={20} color="#000" style={styles.icon} />
          <Icon name="shopping-cart" size={20} color="#000" style={styles.icon} />
          <Icon name="bars" size={20} color="#000" style={styles.icon} />
        </View>
      </View>

      {/* Promotional Banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>New Styles On Sale: Up To 40% Off</Text>
        <Text style={styles.promoText}>Shop All Our New Markdowns</Text>
      </View>

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>Nike Air Force 1 LE</Text>
        <Text style={styles.productType}>Older Kids' Shoes</Text>
        <Text style={styles.productPrice}>2,419,000 Đ</Text>

        {/* Highly Rated Badge */}
        <View style={styles.badge}>
          <Icon name="star" size={12} color="#000" />
          <Text style={styles.badgeText}>Highly Rated</Text>
        </View>

        {/* Product Image */}
        <Image
          source={{ uri: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/AIR+FORCE+1+%2707.png' }}
          style={styles.productImage}
        />
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logo: {
    width: 50,
    height: 25,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  promoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  promoText: {
    fontSize: 12,
    color: '#555',
  },
  productDetails: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productType: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 20,
  },
  badgeText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#000',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});
