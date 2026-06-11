import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Text, Card, Icon, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text
          variant="headlineLarge"
          style={{ color: theme.colors.onBackground, fontWeight: '800', letterSpacing: -0.5 }}
        >
          Coderland
        </Text>
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
        >
          Prueba técnica
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}
          onPress={() => router.push('/tasks')}
        >
          <Card.Content style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
              <Icon source="checkbox-marked-outline" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.cardText}>
              <Text variant="titleMedium" style={{ color: theme.colors.onBackground, fontWeight: '600' }}>
                Tareas
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Gestiona tu lista de tareas
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card
          style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}
          onPress={() => router.push('/listado')}
        >
          <Card.Content style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.secondaryContainer }]}>
              <Icon source="view-list-outline" size={24} color={theme.colors.secondary} />
            </View>
            <View style={styles.cardText}>
              <Text variant="titleMedium" style={{ color: theme.colors.onBackground, fontWeight: '600' }}>
                Listado
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Explora datos remotos
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    elevation: 0,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
});
