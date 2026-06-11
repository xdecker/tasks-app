import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Icon, Text, useTheme, type MD3Theme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Element {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

function ElementItem({ item, theme }: { item: Element; theme: MD3Theme }) {
  const [imageError, setImageError] = useState(false);

  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outlineVariant,
        },
      ]}
    >
      {!imageError ? (
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
          onError={() => setImageError(true)}
        />
      ) : (
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: theme.colors.surfaceVariant,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Icon source="account" size={24} color={theme.colors.onSurfaceVariant} />
        </View>
      )}
      <View style={styles.itemText}>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
          {item.name}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {item.createdAt}
        </Text>
      </View>
    </View>
  );
}

export default function ListadoScreen() {
  const theme = useTheme();
  const [elements, setElements] = useState<Element[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://6172cfe5110a740017222e2b.mockapi.io/elements')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener los datos');
        return res.json();
      })
      .then((data) => {
        setElements(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Element }) => <ElementItem item={item} theme={theme} />,
    [theme],
  );

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.centered, { backgroundColor: theme.colors.background }]}
        edges={['bottom']}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onSurfaceVariant, marginTop: 16 }}
        >
          Cargando elementos...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[styles.centered, { backgroundColor: theme.colors.background }]}
        edges={['bottom']}
      >
        <Icon source="alert-circle-outline" size={48} color={theme.colors.error} />
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.error, marginTop: 12 }}
        >
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['bottom']}
    >
      <FlatList
        data={elements}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
  },
  itemText: {
    flex: 1,
    gap: 2,
  },
});
