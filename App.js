import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const initialItems = [
  { id: '1', title: 'Marvel Movies', category: 'MOVIES', done: false },
  { id: '2', title: 'Never let me go', category: 'BL SERIES', done: false },
  { id: '3', title: 'My School President', category: 'BL SERIES', done: false },
  { id: '4', title: 'True Beauty', category: 'K-DRAMA', done: false },
  { id: '5', title: 'Dragon Ball', category: 'ANIME', done: false },
  { id: '6', title: 'Spaghetti, cakes & breads', category: 'FAVORITE FOOD', done: false },
  { id: '7', title: 'Watching movies, BL series, K-drama & anime', category: 'HOBBIES', done: false },
  { id: '8', title: 'Mobile Legends, Clash of Clans & strategy games', category: 'GAMES', done: false },
  { id: '9', title: 'Kagura & Odette', category: 'MLBB HEROES', done: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [inputText, setInputText] = useState('');

  const addItem = () => {
    const title = inputText.trim();
    if (!title) return;

    setItems((currentItems) => [
      { id: `${Date.now()}-${Math.random()}`, title, category: 'ON MY LIST', done: false },
      ...currentItems,
    ]);
    setInputText('');
  };

  const toggleItem = (id) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const deleteItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const completedCount = items.filter((item) => item.done).length;

  const renderItem = ({ item, index }) => (
    <View style={[styles.listRow, index === items.length - 1 && styles.lastRow]}>
      <TouchableOpacity
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.done }}
        accessibilityLabel={`${item.done ? 'Unmark' : 'Mark'} ${item.title} as enjoyed`}
        onPress={() => toggleItem(item.id)}
        style={[styles.checkButton, item.done && styles.checkButtonDone]}
      >
        {item.done ? <Text style={styles.checkMark}>✓</Text> : null}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => toggleItem(item.id)}
        style={styles.itemCopy}
      >
        <Text style={[styles.itemTitle, item.done && styles.itemTitleDone]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Delete ${item.title}`}
        onPress={() => deleteItem(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const listHeader = (
    <View>
      <View style={styles.topline}>
        <Text style={styles.brand}>JOVEN'S JOURNAL</Text>
        <View style={styles.liveDot} />
        <Text style={styles.toplineNote}>PERSONAL EDITION</Text>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroAccent} />
        <Text style={styles.eyebrow}>A LITTLE ABOUT ME</Text>
        <Text style={styles.name}>Joven V.{ '\n' }Coranes</Text>
        <Text style={styles.bio}>19 · 3rd year BSIT</Text>
        <Text style={styles.location}>Brgy. Cagsalaosao, Calbayog City, Samar</Text>
        <View style={styles.heroFooter}>
          <View style={styles.colorPair}>
            <View style={[styles.colorDot, styles.orangeDot]} />
            <View style={[styles.colorDot, styles.blueDot]} />
          </View>
          <Text style={styles.colorCaption}>ORANGE + BLUE</Text>
          <Text style={styles.heroMark}>JV / 03</Text>
        </View>
      </View>

      <View style={styles.interestStrip}>
        <Text style={styles.stripLabel}>CURRENT ROTATION</Text>
        <Text style={styles.stripText}>Movies · K-drama · Anime · Strategy games</Text>
        <Text style={styles.stripSubtext}>Featuring Pond & Phuwin</Text>
      </View>

      <View style={styles.sectionHeading}>
        <View>
          <Text style={styles.sectionEyebrow}>THE GOOD STUFF</Text>
          <Text style={styles.sectionTitle}>Things I love</Text>
        </View>
        <Text style={styles.progressCount}>{completedCount} / {items.length} enjoyed</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          accessibilityLabel="New favorite"
          placeholder="Add a favorite, food, or hobby..."
          placeholderTextColor="#7C8589"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addItem}
          returnKeyType="done"
          style={styles.input}
        />
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Add to list"
          activeOpacity={0.8}
          onPress={addItem}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.listHint}>TAP AN ITEM TO MARK IT AS ENJOYED</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F5F0" />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <Text style={styles.emptyState}>Your list is ready for a new favorite.</Text>
        }
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.bottomNote}>
        <Text style={styles.bottomNoteText}>GOOD TASTE, GOOD STORIES.</Text>
        <Text style={styles.bottomNoteMark}>✳</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F5F0',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 20,
  },
  topline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 18,
  },
  brand: {
    color: '#183D4C',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EC713F',
    marginHorizontal: 9,
  },
  toplineNote: {
    color: '#7C8589',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  hero: {
    backgroundColor: '#173C4B',
    minHeight: 265,
    padding: 23,
    overflow: 'hidden',
  },
  heroAccent: {
    position: 'absolute',
    right: -28,
    top: -46,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#235367',
  },
  eyebrow: {
    color: '#F2A879',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.7,
  },
  name: {
    color: '#FFFDF8',
    fontSize: 39,
    lineHeight: 42,
    fontWeight: '800',
    marginTop: 13,
  },
  bio: {
    color: '#F7F5EE',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 11,
  },
  location: {
    color: '#C4D4D7',
    fontSize: 11,
    marginTop: 5,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#41616C',
  },
  colorPair: {
    flexDirection: 'row',
    marginRight: 8,
  },
  colorDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#173C4B',
  },
  orangeDot: {
    backgroundColor: '#F07842',
    marginRight: -3,
  },
  blueDot: {
    backgroundColor: '#5DA6C1',
  },
  colorCaption: {
    color: '#D9E0DD',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  heroMark: {
    color: '#F2A879',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginLeft: 'auto',
  },
  interestStrip: {
    backgroundColor: '#E6ECE9',
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#EC713F',
  },
  stripLabel: {
    color: '#41616B',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  stripText: {
    color: '#183D4C',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
  },
  stripSubtext: {
    color: '#68777A',
    fontSize: 11,
    marginTop: 3,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 26,
    marginBottom: 13,
  },
  sectionEyebrow: {
    color: '#EC713F',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  sectionTitle: {
    color: '#183D4C',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 3,
  },
  progressCount: {
    color: '#68777A',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    minHeight: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DFDC',
    paddingHorizontal: 13,
    color: '#183D4C',
    fontSize: 13,
  },
  addButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EC713F',
    marginLeft: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 27,
    lineHeight: 30,
    fontWeight: '400',
  },
  listHint: {
    color: '#818B8C',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: 5,
  },
  listRow: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E3DF',
    paddingVertical: 10,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  checkButton: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#7D9699',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonDone: {
    backgroundColor: '#EC713F',
    borderColor: '#EC713F',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 16,
  },
  itemCopy: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  itemTitle: {
    color: '#183D4C',
    fontSize: 14,
    fontWeight: '700',
  },
  itemTitleDone: {
    color: '#899394',
    textDecorationLine: 'line-through',
  },
  itemCategory: {
    color: '#798587',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginTop: 4,
  },
  deleteButton: {
    width: 34,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#A2AAA8',
    fontSize: 24,
    fontWeight: '300',
  },
  emptyState: {
    color: '#68777A',
    fontSize: 13,
    paddingVertical: 22,
    textAlign: 'center',
  },
  bottomNote: {
    height: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F5F0',
    borderTopWidth: 1,
    borderTopColor: '#E1E4DF',
  },
  bottomNoteText: {
    color: '#748083',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  bottomNoteMark: {
    color: '#EC713F',
    fontSize: 14,
    marginLeft: 7,
  },
});
