import { useTaskStore } from './use-task-store';

beforeEach(() => {
  useTaskStore.setState({ tasks: [] });
});

describe('useTaskStore', () => {
  it('empieza con lista vacia', () => {
    const { tasks } = useTaskStore.getState();
    expect(tasks).toEqual([]);
  });

  it('agrega una tarea', () => {
    useTaskStore.getState().addTask('Comprar pan');
    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe('Comprar pan');
  });

  it('agrega multiples tareas', () => {
    useTaskStore.getState().addTask('Tarea A');
    useTaskStore.getState().addTask('Tarea B');
    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(2);
  });

  it('elimina una tarea por id', () => {
    useTaskStore.getState().addTask('Tarea 1');
    useTaskStore.getState().addTask('Tarea 2');
    const { tasks: initial } = useTaskStore.getState();
    useTaskStore.getState().removeTask(initial[0].id);
    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe('Tarea 2');
  });

  it('no falla al eliminar un id inexistente', () => {
    useTaskStore.getState().addTask('Unica tarea');
    useTaskStore.getState().removeTask('id-inexistente');
    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(1);
  });

  it('asigna un id distinto a cada tarea', () => {
    useTaskStore.getState().addTask('A');
    useTaskStore.getState().addTask('B');
    const { tasks } = useTaskStore.getState();
    expect(tasks[0].id).not.toBe(tasks[1].id);
  });
});
