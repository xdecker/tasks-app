import { useTaskStore } from '@/store/use-task-store';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  Button,
  FAB,
  Icon,
  IconButton,
  Modal,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TasksScreen() {
  const theme = useTheme();
  const { tasks, addTask, removeTask } = useTaskStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const isEmpty = newTaskDescription.trim().length === 0;

  const handleAdd = () => {
    if (isEmpty) return;
    addTask(newTaskDescription.trim());
    setNewTaskDescription('');
    setModalVisible(false);
    setSnackbarVisible(true);
  };

  const handleDismiss = () => {
    setModalVisible(false);
    setNewTaskDescription('');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['bottom']}
    >
      {tasks.length === 0 ? (
        <View style={styles.empty}>
          <Icon source="clipboard-text-outline" size={48} color={theme.colors.outline} />
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 16 }}
          >
            No hay tareas aún
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.outline, marginTop: 4 }}
          >
            Toca el botón + para agregar una
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View
              style={[
                styles.taskItem,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.outlineVariant,
                },
              ]}
            >
              <Text
                variant="bodyLarge"
                style={{
                  color: theme.colors.onSurface,
                  flex: 1,
                }}
              >
                {item.description}
              </Text>
              <IconButton
                icon="delete-outline"
                size={20}
                iconColor={theme.colors.onSurfaceVariant}
                onPress={() => removeTask(item.id)}
              />
            </View>
          )}
        />
      )}

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.colors.onPrimary}
        onPress={() => setModalVisible(true)}
      />

      <Modal
        visible={modalVisible}
        onDismiss={handleDismiss}
        contentContainerStyle={[
          styles.modal,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Text
          variant="titleLarge"
          style={{
            color: theme.colors.onSurface,
            fontWeight: '600',
            marginBottom: 20,
          }}
        >
          Nueva tarea
        </Text>
        <TextInput
          mode="outlined"
          label="Descripción"
          placeholder="¿Qué necesitas hacer?"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
          autoFocus
        />
        <View style={styles.modalActions}>
          <Button mode="text" onPress={handleDismiss} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button mode="contained" onPress={handleAdd} disabled={isEmpty}>
            Agregar
          </Button>
        </View>
      </Modal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        action={{ label: 'Cerrar', onPress: () => setSnackbarVisible(false) }}
        theme={{
          ...theme,
          colors: { ...theme.colors, inverseOnSurface: '#16A34A', },
        }}
      >
        Tarea agregada correctamente
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  modal: {
    margin: 24,
    padding: 24,
    borderRadius: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
});
