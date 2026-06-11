import { render, userEvent } from '@testing-library/react-native';
import { useTaskStore } from '@/store/use-task-store';
import TasksScreen from './index';

beforeEach(() => {
  useTaskStore.setState({ tasks: [] });
});

describe('TasksScreen', () => {
  it('muestra estado vacio cuando no hay tareas', async () => {
    const { getByText } = await render(<TasksScreen />);
    expect(getByText('No hay tareas aún')).toBeOnTheScreen();
    expect(getByText('Toca el botón + para agregar una')).toBeOnTheScreen();
  });

  it('muestra las tareas del store', async () => {
    useTaskStore.getState().addTask('Tarea de prueba');
    useTaskStore.getState().addTask('Otra tarea');
    const { getByText } = await render(<TasksScreen />);
    expect(getByText('Tarea de prueba')).toBeOnTheScreen();
    expect(getByText('Otra tarea')).toBeOnTheScreen();
  });

  it('abre el modal al tocar el FAB', async () => {
    const user = userEvent.setup();
    const { getByTestId, getByText } = await render(<TasksScreen />);
    await user.press(getByTestId('fab-add'));
    expect(getByText('Nueva tarea')).toBeOnTheScreen();
  });

  it('permite crear una tarea desde el modal', async () => {
    const user = userEvent.setup();
    const { getByTestId, getByPlaceholderText, findByText } = await render(<TasksScreen />);

    await user.press(getByTestId('fab-add'));

    const input = getByPlaceholderText('¿Qué necesitas hacer?');
    await user.type(input, 'Comprar leche');

    await user.press(getByTestId('btn-add'));

    expect(await findByText('Comprar leche')).toBeOnTheScreen();
    expect(useTaskStore.getState().tasks).toHaveLength(1);
    expect(useTaskStore.getState().tasks[0].description).toBe('Comprar leche');
  });

  it('no crea tarea si el campo esta vacio', async () => {
    const user = userEvent.setup();
    const { getByTestId } = await render(<TasksScreen />);

    await user.press(getByTestId('fab-add'));

    expect(getByTestId('btn-add')).toBeDisabled();
  });

  it('elimina una tarea al tocar el icono delete', async () => {
    const user = userEvent.setup();
    useTaskStore.getState().addTask('Tarea a eliminar');
    const taskId = useTaskStore.getState().tasks[0].id;
    const { getByTestId, queryByText } = await render(<TasksScreen />);
    await user.press(getByTestId('delete-' + taskId));
    expect(queryByText('Tarea a eliminar')).not.toBeOnTheScreen();
    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it('activa el modo seleccion multiple', async () => {
    const user = userEvent.setup();
    useTaskStore.getState().addTask('Tarea 1');
    useTaskStore.getState().addTask('Tarea 2');
    const { getByTestId, getByText } = await render(<TasksScreen />);

    await user.press(getByTestId('btn-select-mode'));

    expect(getByText('Todo')).toBeOnTheScreen();
    expect(getByText('Ninguno')).toBeOnTheScreen();
  });

  it('selecciona y elimina multiples tareas', async () => {
    const user = userEvent.setup();
    useTaskStore.getState().addTask('Tarea A');
    useTaskStore.getState().addTask('Tarea B');
    const { getByTestId, getByText } = await render(<TasksScreen />);

    await user.press(getByTestId('btn-select-mode'));

    await user.press(getByTestId('btn-select-all'));

    await user.press(getByTestId('btn-delete-selected'));

    expect(useTaskStore.getState().tasks).toHaveLength(0);
    expect(getByText('No hay tareas aún')).toBeOnTheScreen();
  });
});
