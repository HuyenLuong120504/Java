import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const AccountScreen = () => {
  const [isLogoutPressed, setIsLogoutPressed] = useState(false); // Trạng thái để thay đổi màu khi nhấn

  const handleLogout = () => {
    // Xử lý sự kiện đăng xuất
    console.log('User logged out');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "../../assets/images/logoshoes.jpg" }} // Placeholder profile image URL
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.tabButton}>
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text>Favourites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Information */}
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: "https://cdn2.cellphones.com.vn/insecure/rs:fill:100:100/q:90/plain/https://cellphones.com.vn/media/wysiwyg/HI.gif" }} // Placeholder profile image URL
          style={styles.avatar} // Sử dụng style mới cho avatar
        />
        <Text style={styles.userName}>Huyền Lương</Text>
        <Text style={styles.memberSince}>Nike Member Since October 2024</Text>
        <TouchableOpacity style={styles.memberPassButton}>
          <Text style={styles.memberPassText}>View Member Pass</Text>
        </TouchableOpacity>
      </View>

      {/* Interests Section */}
      <View style={styles.interestsSection}>
        <Text style={styles.sectionTitle}>Interests</Text>
        
        {/* Tabs Section */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.activeTab}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tab}>Sports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tab}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tab}>Teams</Text>
          </TouchableOpacity>
        </View>

        {/* Add Interests Button */}
        <TouchableOpacity style={styles.addInterestButton}>
          <Text style={styles.addInterestText}>+ Add Interests</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[
          styles.logoutButton,
          isLogoutPressed ? styles.logoutButtonPressed : null, // Thay đổi màu khi nhấn
        ]}
        onPress={handleLogout}
        onPressIn={() => setIsLogoutPressed(true)} // Đặt trạng thái nhấn
        onPressOut={() => setIsLogoutPressed(false)} // Đặt trạng thái không nhấn
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 25,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120, // Kích thước lớn hơn cho avatar
    height: 120, // Kích thước lớn hơn cho avatar
    borderRadius: 60, // Giữ nguyên góc bo
    marginBottom: 10, // Thêm khoảng cách giữa avatar và tên
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  memberSince: {
    color: '#777',
    marginTop: 5,
  },
  memberPassButton: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  memberPassText: {
    fontWeight: 'bold',
  },
  interestsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    marginRight: 20,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1, // Viền cho các tab button
    borderColor: '#ddd', // Màu viền
  },
  tab: {
    color: '#777',
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#000',
  },
  addInterestButton: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1, // Thêm viền cho nút Add Interests
    borderColor: '#ddd', // Màu viền
  },
  addInterestText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#FF3B30', // Màu đỏ cho nút đăng xuất
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1, // Viền cho nút đăng xuất
    borderColor: '#ddd', // Màu viền
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButtonPressed: {
    backgroundColor: '#d32f2f', // Màu tối hơn khi nhấn nút đăng xuất
  },
});
