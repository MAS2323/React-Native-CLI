import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const categories = [
  { id: '1', icon: '👜', name: 'Retirado' },
  { id: '2', icon: '🚗', name: 'Enviado' },
  { id: '3', icon: '➖', name: 'Pendiente' },
  { id: '4', icon: '↩️', name: 'Error' },
  { id: '5', icon: '🔗', name: 'Explorar' },
  { id: '6', icon: '❤️', name: 'Favoritos' },
  { id: '7', icon: '🎧', name: 'Asistencia' },
  { id: '8', icon: 'ℹ️', name: 'Aviso Legal' },
];

const ProfileMenu = () => {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.menuContainer}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  settingsButton: {
    alignSelf: 'flex-end',
  },
  gearIcon: {
    fontSize: 24,
    color: 'black',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#FF6F00',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    elevation: 3,
    maxHeight: 300, 
  },
  categoriesList: {
    justifyContent: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ProfileMenu;
