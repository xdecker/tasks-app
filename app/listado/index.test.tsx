import { render } from '@testing-library/react-native';
import ListadoScreen from './index';

const mockElements = [
  { id: '1', name: 'Alice', avatar: 'https://example.com/alice.png', createdAt: '2024-01-15T10:30:00Z' },
  { id: '2', name: 'Bob', avatar: 'https://example.com/bob.png', createdAt: '2024-03-22T14:00:00Z' },
];

function mockFetchSuccess(data: typeof mockElements = mockElements) {
  return jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

function mockFetchError() {
  return jest.fn().mockRejectedValue(new Error('Error al obtener los datos'));
}

function mockFetchPending() {
  return jest.fn().mockReturnValue(new Promise(() => {}));
}

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('ListadoScreen', () => {
  it('muestra loading mientras se cargan los datos', async () => {
    global.fetch = mockFetchPending();
    const { getByText } = await render(<ListadoScreen />);
    expect(getByText('Cargando elementos...')).toBeOnTheScreen();
  });

  it('muestra los elementos obtenidos del API', async () => {
    global.fetch = mockFetchSuccess();
    const { findByText } = await render(<ListadoScreen />);
    expect(await findByText('Alice')).toBeOnTheScreen();
    expect(await findByText('Bob')).toBeOnTheScreen();
  });

  it('formatea la fecha en UTC', async () => {
    global.fetch = mockFetchSuccess();
    const { findByText } = await render(<ListadoScreen />);
    expect(await findByText('2024-01-15 10:30')).toBeOnTheScreen();
    expect(await findByText('2024-03-22 14:00')).toBeOnTheScreen();
  });

  it('muestra error cuando falla el fetch y no hay elementos', async () => {
    global.fetch = mockFetchError();
    const { findByText } = await render(<ListadoScreen />);
    expect(await findByText('Error al obtener los datos')).toBeOnTheScreen();
  });

  it('muestra pantalla vacia cuando el API devuelve lista vacia', async () => {
    global.fetch = mockFetchSuccess([]);
    const { queryByText } = await render(<ListadoScreen />);
    expect(queryByText('Cargando elementos...')).toBeNull();
    expect(queryByText('Error al obtener los datos')).toBeNull();
  });

  it('no muestra el loading una vez que los datos cargaron', async () => {
    global.fetch = mockFetchSuccess();
    const { queryByText, findByText } = await render(<ListadoScreen />);
    await findByText('Alice');
    expect(queryByText('Cargando elementos...')).toBeNull();
  });
});
