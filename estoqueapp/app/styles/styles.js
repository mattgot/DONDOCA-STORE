import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#fff88', 
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  text: {
    color: 'white',
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

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff69b4",
    padding: 15,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  updateButton: {
    backgroundColor: "#ff69b4",
    borderWidth: 1,
    borderColor: "#ff69b4",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  updateText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default styles;
