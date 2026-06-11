import { useTaskStore } from '@/store/use-task-store';
import { useCallback, useState } from 'react';
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

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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

  const toggleSelectionMode = () => {
    setSelectionMode((prev) => !prev);
    setSelectedIds(new Set());
  };

  const toggleItem = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = () => setSelectedIds(new Set(tasks.map((t) => t.id)));
  const deselectAll = () => setSelectedIds(new Set());

  const deleteSelected = () => {
    selectedIds.forEach((id) => removeTask(id));
    setSelectedIds(new Set());
    setSelectionMode(false);
  };

  const selectedCount = selectedIds.size;

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
        <>
          {selectionMode ? (
            <View
              style={[
                styles.toolbar,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                },
              ]}
            >
              <IconButton
                icon="close"
                size={20}
                iconColor={theme.colors.onSurfaceVariant}
                onPress={toggleSelectionMode}
              />
              <Button
                mode="text"
                compact
                onPress={selectAll}
                textColor={theme.colors.primary}
                labelStyle={styles.toolbarLabel}
              >
                Todo
              </Button>
              <Button
                mode="text"
                compact
                onPress={deselectAll}
                textColor={theme.colors.onSurfaceVariant}
                labelStyle={styles.toolbarLabel}
              >
                Ninguno
              </Button>
              <View style={{ flex: 1 }} />
              {selectedCount > 0 && (
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.error, marginRight: 4, fontWeight: '600' }}
                >
                  {selectedCount}
                </Text>
              )}
              <IconButton
                icon="delete-outline"
                size={20}
                iconColor={selectedCount > 0 ? theme.colors.error : theme.colors.outline}
                disabled={selectedCount === 0}
                onPress={deleteSelected}
              />
            </View>
          ) : (
            <View
              style={[
                styles.toolbar,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                },
              ]}
            >
              <View style={{ flex: 1 }} />
              <IconButton
                icon="checkbox-multiple-outline"
                size={20}
                iconColor={theme.colors.onSurfaceVariant}
                onPress={toggleSelectionMode}
              />
            </View>
          )}

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.taskItem,
                  {
                    backgroundColor: selectionMode && selectedIds.has(item.id)
                      ? theme.colors.primaryContainer
                      : theme.colors.surface,
                    borderColor: selectionMode && selectedIds.has(item.id)
                      ? theme.colors.primary
                      : theme.colors.outlineVariant,
                  },
                ]}
              >
                {selectionMode && (
                  <IconButton
                    icon={selectedIds.has(item.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={22}
                    iconColor={
                      selectedIds.has(item.id) ? theme.colors.primary : theme.colors.outline
                    }
                    onPress={() => toggleItem(item.id)}
                  />
                )}
                <Text
                  variant="bodyLarge"
                  style={{
                    color: theme.colors.onSurface,
                    flex: 1,
                    marginLeft: selectionMode ? 0 : 16,
                  }}
                  onPress={selectionMode ? () => toggleItem(item.id) : undefined}
                >
                  {item.description}
                </Text>
                {!selectionMode && (
                  <IconButton
                    icon="delete-outline"
                    size={20}
                    iconColor={theme.colors.onSurfaceVariant}
                    onPress={() => removeTask(item.id)}
                  />
                )}
              </View>
            )}
          />
        </>
      )}

      {!selectionMode && (
        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          color={theme.colors.onPrimary}
          onPress={() => setModalVisible(true)}
        />
      )}

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
          colors: { ...theme.colors, inverseOnSurface: '#16A34A' },
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
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  toolbarLabel: {
    fontSize: 13,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
