import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#ffe4ec', // rosa claro
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  // Título da tela
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#ff69b4',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Lista principal
  lista: {
    marginTop: 10,
  },

  // Linha de cada item
  linha: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Texto do nome do produto
  produto: {
    fontSize: 18,
    color: '#333',
  },

  // Botão padrão (opcional)
  button: {
    backgroundColor: '#ff69b4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
